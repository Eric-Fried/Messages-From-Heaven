set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


CREATE TABLE "plans" (
  "planId" serial PRIMARY KEY,
  "name" text,
  "description" text,
  "planType" text,
  "pricePerMonth" integer
);

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "username" text,
  "planId" integer,
  "created_at" timestamptz,
  "hashedPassword" text
);

CREATE TABLE "planInfo" (
  "id" serial PRIMARY KEY,
  "planId" integer,
  "message" text,
  "purchasedBy" integer,
  "giftIncluded" text,
  "toBeDeliveredOn" date,
  "addressedTo" text
);

COMMENT ON COLUMN "planInfo"."message" IS 'Content of the message';

ALTER TABLE "users" ADD FOREIGN KEY ("planId") REFERENCES "plans" ("planId");

ALTER TABLE "planInfo" ADD FOREIGN KEY ("planId") REFERENCES "plans" ("planId");

ALTER TABLE "planInfo" ADD FOREIGN KEY ("purchasedBy") REFERENCES "users" ("userId");
