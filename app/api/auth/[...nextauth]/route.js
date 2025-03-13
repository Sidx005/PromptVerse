import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectToDB } from '@utils/db';
import User from "@models/user";
import { use } from "react";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      const sessionUser=await User.findOne({email:session.user.email})
      session.user.id=sessionUser._id.toString()
      // Always return the session
      return session;
      
    },
    
    async signIn({ profile }) {
      try {
        await connectToDB();
        let user = await User.findOne({ email: profile.email });
        
        if (!user) {
          user = await User.create({
            email: profile.email,
            username: profile.name.replace(" ","").toLowerCase(),
            image: profile.picture
          });
        }
   
        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
   }
   
  },
  debug: true
});

export { handler as GET, handler as POST };