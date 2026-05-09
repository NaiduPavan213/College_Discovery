-- CreateTable
CREATE TABLE "College" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "fees_per_year" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "placement_pct" DOUBLE PRECISION NOT NULL,
    "overview" TEXT NOT NULL,
    "established" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "image_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "college_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "duration_yrs" INTEGER NOT NULL,
    "fees" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;
