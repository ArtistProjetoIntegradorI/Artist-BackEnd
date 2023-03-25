-- CreateTable
CREATE TABLE "Social" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user_social" (
    "user_id" TEXT NOT NULL,
    "social_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    PRIMARY KEY ("user_id", "social_id"),
    CONSTRAINT "user_social_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_social_social_id_fkey" FOREIGN KEY ("social_id") REFERENCES "Social" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
