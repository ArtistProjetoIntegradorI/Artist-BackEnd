/*
  Warnings:

  - You are about to alter the column `status` on the `user` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - Made the column `zip_code` on table `address` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "contry" TEXT NOT NULL,
    "lat" TEXT,
    "long" TEXT,
    "zip_code" TEXT NOT NULL
);
INSERT INTO "new_address" ("contry", "id", "lat", "long", "neighborhood", "number", "street", "zip_code") SELECT "contry", "id", "lat", "long", "neighborhood", "number", "street", "zip_code" FROM "address";
DROP TABLE "address";
ALTER TABLE "new_address" RENAME TO "address";
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "user_type" TEXT NOT NULL,
    "document" TEXT,
    "email" TEXT,
    "profile_image" TEXT,
    "cel_phone" TEXT,
    "address_id" TEXT,
    CONSTRAINT "user_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_user" ("address_id", "cel_phone", "document", "email", "id", "name", "password", "profile_image", "status", "user_type", "username") SELECT "address_id", "cel_phone", "document", "email", "id", "name", "password", "profile_image", "status", "user_type", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_document_key" ON "user"("document");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
