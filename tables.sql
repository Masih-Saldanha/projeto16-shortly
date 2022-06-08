CREATE TABLE "users" (
    "id" serial NOT NULL PRIMARY KEY,
    "name" text NOT NULL,
    "email" text NOT NULL UNIQUE,
    "password" text NOT NULL
);

CREATE TABLE "sessios" (
    "id" serial NOT NULL PRIMARY KEY,
    "token" text NOT NULL UNIQUE,
    "userId" integer NOT NULL REFERENCES "users"("id")
);

CREATE TABLE "urls" (
    "id" serial NOT NULL,
    "shortUrl" text NOT NULL,
    "url" text NOT NULL,
    "visitCount" integer NOT NULL DEFAULT '0',
    "sessionId" integer NOT NULL REFERENCES "sessions"("id")
);