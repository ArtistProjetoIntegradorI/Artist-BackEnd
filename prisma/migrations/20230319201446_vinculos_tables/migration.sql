-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_category" (
    "user_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    PRIMARY KEY ("user_id", "category_id"),
    CONSTRAINT "user_category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_category" ("category_id", "user_id") SELECT "category_id", "user_id" FROM "user_category";
DROP TABLE "user_category";
ALTER TABLE "new_user_category" RENAME TO "user_category";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
