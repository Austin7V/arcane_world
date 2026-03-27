import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/lib/db/connectToDatabase";
import User from "@/lib/db/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (!user?.email || !user?.name) return false;

      await connectToDatabase();
      const existingUser = await User.findOne({ googleId: user.email });

      if (!existingUser) {
        await User.create({
          googleId: user.email,
          name: user.name,
          email: user.email,
          image: user.image || "",
          nickname: user.name,
        });
      }

      return true;
    },
  },
};

export default NextAuth(authOptions);
