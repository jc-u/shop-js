import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Nodemailer from "next-auth/providers/nodemailer";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: MongoDBAdapter(client),
	providers: [
		GitHub,
		Nodemailer({
			// If your environment variable is named differently than default
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		}),
	],
});
