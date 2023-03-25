/*
  Warnings:

  - You are about to drop the column `icon` on the `Social` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Social" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Social" ("id", "name") SELECT "id", "name" FROM "Social";
DROP TABLE "Social";
ALTER TABLE "new_Social" RENAME TO "Social";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
