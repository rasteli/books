CREATE TABLE "bookBookshelves" (
	"bookId" uuid NOT NULL,
	"bookshelfId" uuid NOT NULL,
	"assignedBy" uuid NOT NULL,
	"assignedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bookBookshelves_bookId_bookshelfId_pk" PRIMARY KEY("bookId","bookshelfId")
);
--> statement-breakpoint
CREATE TABLE "bookCategories" (
	"bookId" uuid NOT NULL,
	"categoryId" uuid NOT NULL,
	"assignedBy" uuid NOT NULL,
	"assignedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bookCategories_bookId_categoryId_pk" PRIMARY KEY("bookId","categoryId")
);
--> statement-breakpoint
CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"authors" text[] DEFAULT ARRAY[]::text[],
	"tags" text[] DEFAULT ARRAY[]::text[],
	"summary" text,
	"key" text,
	"size" integer,
	"mimeType" text,
	"numOfPages" integer,
	"currentPage" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookshelves" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"createdBy" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"createdBy" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "highlights" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bookId" uuid NOT NULL,
	"body" text,
	"tags" text[] DEFAULT ARRAY[]::text[],
	"color" text DEFAULT '#fff85b' NOT NULL,
	"createdBy" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "bookBookshelves" ADD CONSTRAINT "bookBookshelves_bookId_books_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookBookshelves" ADD CONSTRAINT "bookBookshelves_bookshelfId_bookshelves_id_fk" FOREIGN KEY ("bookshelfId") REFERENCES "public"."bookshelves"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookBookshelves" ADD CONSTRAINT "bookBookshelves_assignedBy_users_id_fk" FOREIGN KEY ("assignedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookCategories" ADD CONSTRAINT "bookCategories_bookId_books_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookCategories" ADD CONSTRAINT "bookCategories_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookCategories" ADD CONSTRAINT "bookCategories_assignedBy_users_id_fk" FOREIGN KEY ("assignedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookshelves" ADD CONSTRAINT "bookshelves_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "highlights" ADD CONSTRAINT "highlights_bookId_books_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "highlights" ADD CONSTRAINT "highlights_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;