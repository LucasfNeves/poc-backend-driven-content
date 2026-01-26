-- CreateTable
CREATE TABLE "screens" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "theme_name" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "screens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "screen_versions" (
    "id" TEXT NOT NULL,
    "screen_name" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "config" JSONB NOT NULL,
    "theme_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "screen_versions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "screens_name_key" ON "screens"("name");

-- CreateIndex
CREATE UNIQUE INDEX "screen_versions_screen_name_version_key" ON "screen_versions"("screen_name", "version");

-- AddForeignKey
ALTER TABLE "screen_versions" ADD CONSTRAINT "screen_versions_screen_name_fkey" FOREIGN KEY ("screen_name") REFERENCES "screens"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
