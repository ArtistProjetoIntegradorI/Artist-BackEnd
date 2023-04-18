-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dh_event" DATETIME NOT NULL,
    "dh_expiration" DATETIME NOT NULL,
    "user_owner_id" TEXT,
    "address_id" TEXT,
    CONSTRAINT "event_user_owner_id_fkey" FOREIGN KEY ("user_owner_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "event_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_event" ("description", "dh_event", "dh_expiration", "id", "name", "user_owner_id") SELECT "description", "dh_event", "dh_expiration", "id", "name", "user_owner_id" FROM "event";
DROP TABLE "event";
ALTER TABLE "new_event" RENAME TO "event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
