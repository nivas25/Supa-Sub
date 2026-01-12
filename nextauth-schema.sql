-- NextAuth.js Tables
-- https://authjs.dev/reference/adapter/supabase

CREATE TABLE IF NOT EXISTS "next_auth"."users" (
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  "emailVerified" timestamp with time zone,
  image text,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "next_auth"."accounts" (
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" uuid NOT NULL,
  type text NOT NULL,
  provider text NOT NULL,
  "providerAccountId" text NOT NULL,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES "next_auth"."users"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "next_auth"."sessions" (
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" uuid NOT NULL,
  expires timestamp with time zone NOT NULL,
  "sessionToken" text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES "next_auth"."users"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "next_auth"."verification_tokens" (
  identifier text,
  token text,
  expires timestamp with time zone,
  PRIMARY KEY (identifier, token)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON "next_auth"."accounts"("userId");
CREATE INDEX IF NOT EXISTS idx_accounts_provider ON "next_auth"."accounts"(provider, "providerAccountId");
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON "next_auth"."sessions"("userId");
CREATE INDEX IF NOT EXISTS idx_sessions_token ON "next_auth"."sessions"("sessionToken");
