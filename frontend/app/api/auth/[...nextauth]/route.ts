import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 3,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = (user as any).id ?? token.sub;
        token.onboarded = (user as any).onboarded ?? false;
        token.role = (user as any).role ?? null;
      }

      if (trigger === "update" && session) {
        token.onboarded = (session as any).onboarded ?? token.onboarded;
        token.role = (session as any).role ?? token.role;
      }

      if (
        token.id &&
        (token.onboarded === undefined || token.role === undefined)
      ) {
        const { data, error } = await supabaseAdmin
          .from("profiles")
          .select("onboarded, role")
          .eq("id", token.id as string)
          .single();

        if (!error && data) {
          token.onboarded = data.onboarded ?? false;
          token.role = data.role ?? null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) ?? (token.sub as string);
        session.user.onboarded = (token as any).onboarded ?? false;
        session.user.role = (token as any).role ?? null;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
