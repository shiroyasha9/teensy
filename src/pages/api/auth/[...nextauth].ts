import NextAuth, { type NextAuthOptions } from "next-auth";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { readFileSync } from "fs";
import Handlebars from "handlebars";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import nodemailer from "nodemailer";
import path from "path";
import { prisma } from "../../../server/db";

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
  void transporter.sendMail({
    from: `"Teensy 🤏" ${process.env.EMAIL_FROM || ""}`,
    to: identifier,
    subject: "Your sign-in link for Teensy",
    html: emailTemplate({
      base_url: process.env.NEXTAUTH_URL,
      signin_url: url,
      email: identifier,
    }),
  });
};

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
  },
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    EmailProvider({
      maxAge: 10 * 60,
      sendVerificationRequest,
    }),
    /**
     * ...add more providers here
     *
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

export default NextAuth(authOptions);
