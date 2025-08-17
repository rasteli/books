ALTER TABLE "books" ALTER COLUMN "size" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "mimeType" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "numOfPages" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "currentPage" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "highlights" ALTER COLUMN "body" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "readingTime" integer DEFAULT 0;