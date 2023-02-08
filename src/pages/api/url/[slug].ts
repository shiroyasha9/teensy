import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "$server/db";
import { isDevEnvironment } from "$utils/functions";

const fetchSlug = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "pls use with a slug" }));

    return;
  }

  const data = await prisma.teensy.findFirst({
    where: {
      slug,
    },
    include: {
      visits: true,
    },
  });

  if (!data) {
    const expiredTeensy = await prisma.expiredTeensy.findFirst({
      where: {
        slug,
      },
    });
    if (expiredTeensy) {
      res.statusCode = 498;
      res.send(JSON.stringify({ message: "expired" }));
      return;
    }
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "slug not found" }));

    return;
  }

  if (data.expiresAt && new Date(data.expiresAt) < new Date()) {
    await prisma.expiredTeensy.create({
      data: {
        slug: data.slug,
        url: data.url,
        visitCount: data.visits.length,
        password: data.password,
        ownerId: data.ownerId,
      },
    });
    await prisma.teensy.delete({
      where: {
        id: data.id,
      },
    });
    res.statusCode = 498;
    res.send(JSON.stringify({ message: "slug has expired" }));

    return;
  }

  await prisma.visit.create({
    data: {
      teensyId: data.id,
    },
  });

  if (!isDevEnvironment) {
    await prisma.globalVisits.create({
      data: {},
    });
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=1000000000, stale-while-revalidate");

  return res.json(data);
};

export default fetchSlug;
