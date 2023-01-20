import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { readFileSync } from "fs";
import Handlebars from "handlebars";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import nodemailer from "nodemailer";
import path from "path";
import { prisma } from "../../../db/client";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: true,
});

// ...

const emailsDir = path.resolve(process.cwd(), "src/emails");

const sendVerificationRequest = ({
  identifier,
  url,
}: {
  identifier: string;
  url: string;
}) => {
  const emailFile = readFileSync(path.join(emailsDir, "confirm-email.html"), {
    encoding: "utf8",
  });
  const emailTemplate = Handlebars.compile(emailFile);
  transporter.sendMail({
    from: `"Teensy 🤏" ${process.env.EMAIL_FROM}`,
    to: identifier,
    subject: "Your sign-in link for Teensy",
    html: emailTemplate({
      base_url: process.env.NEXTAUTH_URL,
      signin_url: url,
      email: identifier,
    }),
  });
};

export default NextAuth({
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    EmailProvider({
      maxAge: 10 * 60,
      sendVerificationRequest,
    }),
  ],
  adapter: PrismaAdapter(prisma),
});
