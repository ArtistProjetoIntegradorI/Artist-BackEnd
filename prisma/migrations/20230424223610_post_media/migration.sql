-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "post_id" TEXT,
    CONSTRAINT "media_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "dh_create" DATETIME NOT NULL,
    "user_owner_id" TEXT,
    "event" TEXT,
    CONSTRAINT "post_user_owner_id_fkey" FOREIGN KEY ("user_owner_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "post_event_fkey" FOREIGN KEY ("event") REFERENCES "event" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
