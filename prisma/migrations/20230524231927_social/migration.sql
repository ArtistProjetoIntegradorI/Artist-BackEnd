/*
  Warnings:

  - You are about to drop the `Social` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Social";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "social" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_social" (
    "user_id" TEXT NOT NULL,
    "social_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    PRIMARY KEY ("user_id", "social_id"),
    CONSTRAINT "user_social_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_social_social_id_fkey" FOREIGN KEY ("social_id") REFERENCES "social" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_social" ("social_id", "url", "user_id") SELECT "social_id", "url", "user_id" FROM "user_social";
DROP TABLE "user_social";
ALTER TABLE "new_user_social" RENAME TO "user_social";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
