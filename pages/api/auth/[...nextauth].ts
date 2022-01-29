import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import EmailProvider from "next-auth/providers/email";

const uri = process.env.MONGODB_URI as string;
const secret = process.env.JWT_SECRET as string;
const client = new MongoClient(uri);
const clientPromise = client.connect();
clientPromise.then(() => console.log("Connected to MongoDB"));

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: secret,
});
