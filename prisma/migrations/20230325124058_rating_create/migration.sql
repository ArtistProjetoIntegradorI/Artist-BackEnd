-- CreateTable
CREATE TABLE "rating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" INTEGER NOT NULL,
    "userRate" TEXT NOT NULL,
    "user_id" TEXT,
    CONSTRAINT "rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
