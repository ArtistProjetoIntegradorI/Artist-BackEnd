-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "dh_create" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "user_owner_id" TEXT,
    "event" TEXT,
    CONSTRAINT "post_user_owner_id_fkey" FOREIGN KEY ("user_owner_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "post_event_fkey" FOREIGN KEY ("event") REFERENCES "event" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_post" ("description", "dh_create", "event", "id", "user_owner_id") SELECT "description", "dh_create", "event", "id", "user_owner_id" FROM "post";
DROP TABLE "post";
ALTER TABLE "new_post" RENAME TO "post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
