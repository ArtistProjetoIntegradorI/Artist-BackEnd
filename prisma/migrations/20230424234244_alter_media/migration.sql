/*
  Warnings:

  - You are about to drop the column `url` on the `media` table. All the data in the column will be lost.
  - Added the required column `name` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "post_id" TEXT,
    CONSTRAINT "media_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_media" ("id", "post_id") SELECT "id", "post_id" FROM "media";
DROP TABLE "media";
ALTER TABLE "new_media" RENAME TO "media";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
