-- CreateTable
CREATE TABLE "event_category" (
    "event_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    PRIMARY KEY ("event_id", "category_id"),
    CONSTRAINT "event_category_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "event_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "event_artist" (
    "event_id" TEXT NOT NULL,
    "artist_id" TEXT NOT NULL,

    PRIMARY KEY ("event_id", "artist_id"),
    CONSTRAINT "event_artist_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "event_artist_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dh_event" DATETIME NOT NULL,
    "dh_expiration" DATETIME NOT NULL,
    "user_owner_id" TEXT,
    CONSTRAINT "event_user_owner_id_fkey" FOREIGN KEY ("user_owner_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
