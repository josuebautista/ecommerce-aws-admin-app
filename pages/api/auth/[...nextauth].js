import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

const adminEmails = [process.env.GOOGLE_ADMIN_EMAIL];

export const authConfig = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  }
};

export default NextAuth(authConfig);

export const isAdminRequest = async (req, res) => {
  const session = await getServerSession(req, res, authConfig);
  if ( !adminEmails.includes(session?.user?.email)){
    res.status(401);
    res.end();
    throw 'You do not have the credencials to access'
  }
}