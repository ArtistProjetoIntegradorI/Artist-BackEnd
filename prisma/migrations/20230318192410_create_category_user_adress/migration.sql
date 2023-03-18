-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user_category" (
    "user_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    PRIMARY KEY ("user_id", "category_id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "user_type" TEXT NOT NULL,
    "document" TEXT,
    "email" TEXT,
    "profile_image" TEXT,
    "cel_phone" TEXT,
    "address_id" TEXT NOT NULL,
    CONSTRAINT "user_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "contry" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "long" TEXT,
    "zip_code" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "user_document_key" ON "user"("document");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
