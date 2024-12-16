// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Magic Link",
      credentials: {
        email: { label: "Email", type: "email" },
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        // Call your FastAPI endpoint to validate the token
        const res = await fetch(`${process.env.FASTAPI_BASE_URL}/verify?token=${credentials.token}`);
        if (!res.ok) throw new Error("Invalid token");

        const data = await res.json();

        // log the user in console
        console.log(data);
        // Return user data for session, including a dummy image
        return {
          email: data.email,
          name: data.name || "User", // Default name if not provided
          image: '/user.svg', // Path to your dummy user image
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  callbacks: {
    async session({ session, token }) {
      // Include user information in the session
      if (token) {
        session.user.email = token.email;
        session.user.name = token.name || "User"; // Default name if not provided
        session.user.image = token.image || '/user.svg'; // Ensure image is set
      }
      return session;
    },
    async jwt({ token, user }) {
      // Store user information in the token
      if (user) {
        token.email = user.email;
        token.name = user.name || "User"; // Default name if not provided
        token.image = user.image; // Store user image in the token
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
