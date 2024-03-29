import { db } from "@/server/db";
import { isDevEnvironment } from "@/utils";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return new Response("Please pass a slug", { status: 404 });
  }

  const data = await db.teensy.findFirst({
    where: {
      slug,
    },
    include: {
      visits: true,
    },
  });

  if (!data) {
    const expiredTeensy = await db.expiredTeensy.findFirst({
      where: {
        slug,
      },
    });
    if (expiredTeensy) {
      return new Response("Slug has expired", { status: 498 });
    }
    return new Response("Slug not found", { status: 404 });
  }

  if (data.expiresAt && new Date(data.expiresAt) < new Date()) {
    await db.expiredTeensy.create({
      data: {
        slug: data.slug,
        url: data.url,
        visitCount: data.visits.length,
        password: data.password,
        ownerId: data.ownerId,
      },
    });
    await db.teensy.delete({
      where: {
        id: data.id,
      },
    });
    return new Response("Slug has expired", { status: 498 });
  }
  if (!isDevEnvironment) {
    await db.visit.create({
      data: {
        teensyId: data.id,
      },
    });
    await db.globalVisits.create({
      data: {},
    });
  }

  return new Response(JSON.stringify(data));
}
