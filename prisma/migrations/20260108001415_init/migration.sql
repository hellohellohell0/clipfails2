-- CreateTable
CREATE TABLE "Clip" (
    "id" TEXT NOT NULL,
    "twitchUrl" TEXT NOT NULL,
    "embedId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "streamer" TEXT NOT NULL,
    "views" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Clip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "redirectUrl" TEXT,

    CONSTRAINT "SystemSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clip_embedId_key" ON "Clip"("embedId");
