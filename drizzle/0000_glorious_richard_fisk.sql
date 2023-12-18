-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations

/*

DO $$ BEGIN
 CREATE TYPE "mpaa_rating" AS ENUM('NC-17', 'R', 'PG-13', 'PG', 'G');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "actor" (
	"actor_id" INTEGER PRIMARY KEY DEFAULT nextval('actor_actor_id_seq' :: regclass) NOT NULL,
	"first_name" VARCHAR(45) NOT NULL,
	"last_name" VARCHAR(45) NOT NULL,
	"last_update" TIMESTAMP DEFAULT now() NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "actor_info" (
	"actor_id" INTEGER,
	"first_name" VARCHAR(45),
	"last_name" VARCHAR(45),
	"film_info" TEXT
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer_list" (
	"id" INTEGER,
	"name" TEXT,
	"address" VARCHAR(50),
	"zip code" VARCHAR(10),
	"phone" VARCHAR(20),
	"city" VARCHAR(50),
	"country" VARCHAR(50),
	"notes" TEXT,
	"sid" SMALLINT
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "film_list" (
	"fid" INTEGER,
	"title" VARCHAR(255),
	"description" TEXT,
	"category" VARCHAR(25),
	"price" NUMERIC(4, 2),
	"length" SMALLINT,
	"rating" "mpaa_rating",
	"actors" TEXT
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nicer_but_slower_film_list" (
	"fid" INTEGER,
	"title" VARCHAR(255),
	"description" TEXT,
	"category" VARCHAR(25),
	"price" NUMERIC(4, 2),
	"length" SMALLINT,
	"rating" "mpaa_rating",
	"actors" TEXT
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sales_by_film_category" ("category" VARCHAR(25), "total_sales" NUMERIC);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "store" (
	"store_id" INTEGER PRIMARY KEY DEFAULT nextval('store_store_id_seq' :: regclass) NOT NULL,
	"manager_staff_id" SMALLINT NOT NULL,
	"address_id" SMALLINT NOT NULL,
	"last_update" TIMESTAMP DEFAULT now() NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sales_by_store" ("store" TEXT, "manager" TEXT, "total_sales" NUMERIC);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staff_list" (
	"id" INTEGER,
	"name" TEXT,
	"address" VARCHAR(50),
	"zip code" VARCHAR(10),
	"phone" VARCHAR(20),
	"city" VARCHAR(50),
	"country" VARCHAR(50),
	"sid" SMALLINT
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"address_id" INTEGER PRIMARY KEY DEFAULT nextval('address_address_id_seq' :: regclass) NOT NULL,
	"address" VARCHAR(50) NOT NULL,
	"address2" VARCHAR(50),
	"district" VARCHAR(20) NOT NULL,
	"city_id" SMALLINT NOT NULL,
	"postal_code" VARCHAR(10),
	"phone" VARCHAR(20) NOT NULL,
	"last_update" TIMESTAMP DEFAULT now() NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"category_id" INTEGER PRIMARY KEY DEFAULT nextval('category_category_id_seq' :: regclass) NOT NULL,
	"name" VARCHAR(25) NOT NULL,
	"last_update" TIMESTAMP DEFAULT now() NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "city" (
	"city_id" INTEGER PRIMARY KEY DEFAULT nextval('city_city_id_seq' :: regclass) NOT NULL,
	"city" VARCHAR(50) NOT NULL,
	"country_id" SMALLINT NOT NULL,
	"last_update" TIMESTAMP DEFAULT now() NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "country" (
	"country_id" INTEGER PRIMARY KEY DEFAULT nextval('country_country_id_seq' :: regclass) NOT NULL,
	"country" VARCHAR(50) NOT NULL,
	"last_update" TIMESTAMP DEFAULT now() NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer" (
	"customer_id" INTEGER PRIMARY KEY DEFAULT nextval('customer_customer_id_seq' :: regclass) NOT NULL,
	"store_id" SMALLINT NOT NULL,
	"first_name" VARCHAR(45) NOT NULL,
	"last_name" VARCHAR(45) NOT NULL,
	"email" VARCHAR(50),
	"address_id" SMALLINT NOT NULL,
	"activebool" BOOLEAN DEFAULT TRUE NOT NULL,
	"create_date" date DEFAULT '' now '::text' NOT NULL,
	"last_update" TIMESTAMP DEFAULT now(),
	"active" INTEGER
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inventory" (
	"inventory_id" INTEGER PRIMARY KEY DEFAULT nextval('inventory_inventory_id_seq' :: regclass) NOT NULL,
	"film_id" SMALLINT NOT NULL,
	"store_id" SMALLINT NOT NULL,
	"last_update" TIMESTAMP DEFAULT now() NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "language" (
	"language_id" INTEGER PRIMARY KEY DEFAULT nextval('language_language_id_seq' :: regclass) NOT NULL,
	"name" CHAR(20) NOT NULL,
	"last_update" TIMESTAMP DEFAULT now() NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rental" (
	"rental_id" INTEGER PRIMARY KEY DEFAULT nextval('rental_rental_id_seq' :: regclass) NOT NULL,
	"rental_date" TIMESTAMP NOT NULL,
	"inventory_id" INTEGER NOT NULL,
	"customer_id" SMALLINT NOT NULL,
	"return_date" TIMESTAMP,
	"staff_id" SMALLINT NOT NULL,
	"last_update" TIMESTAMP DEFAULT now() NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staff" (
	"staff_id" INTEGER PRIMARY KEY DEFAULT nextval('staff_staff_id_seq' :: regclass) NOT NULL,
	"first_name" VARCHAR(45) NOT NULL,
	"last_name" VARCHAR(45) NOT NULL,
	"address_id" SMALLINT NOT NULL,
	"email" VARCHAR(50),
	"store_id" SMALLINT NOT NULL,
	"active" BOOLEAN DEFAULT TRUE NOT NULL,
	"username" VARCHAR(16) NOT NULL,
	"password" VARCHAR(40),
	"last_update" TIMESTAMP DEFAULT now() NOT NULL,
	"picture" "bytea"
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment" (
	"payment_id" INTEGER PRIMARY KEY DEFAULT nextval('payment_payment_id_seq' :: regclass) NOT NULL,
	"customer_id" SMALLINT NOT NULL,
	"staff_id" SMALLINT NOT NULL,
	"rental_id" INTEGER NOT NULL,
	"amount" NUMERIC(5, 2) NOT NULL,
	"payment_date" TIMESTAMP NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "film" (
	"film_id" INTEGER PRIMARY KEY DEFAULT nextval('film_film_id_seq' :: regclass) NOT NULL,
	"title" VARCHAR(255) NOT NULL,
	"description" TEXT,
	"release_year" "year",
	"language_id" SMALLINT NOT NULL,
	"rental_duration" SMALLINT DEFAULT 3 NOT NULL,
	"rental_rate" NUMERIC(4, 2) DEFAULT 4.99 NOT NULL,
	"length" SMALLINT,
	"replacement_cost" NUMERIC(5, 2) DEFAULT 19.99 NOT NULL,
	"rating" "mpaa_rating" DEFAULT 'G',
	"last_update" TIMESTAMP DEFAULT now() NOT NULL,
	"special_features" TEXT [ ],
	"fulltext" "tsvector" NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "film_actor" (
	"actor_id" SMALLINT NOT NULL,
	"film_id" SMALLINT NOT NULL,
	"last_update" TIMESTAMP DEFAULT now() NOT NULL,
	CONSTRAINT film_actor_pkey PRIMARY KEY ("actor_id", "film_id")
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "film_category" (
	"film_id" SMALLINT NOT NULL,
	"category_id" SMALLINT NOT NULL,
	"last_update" TIMESTAMP DEFAULT now() NOT NULL,
	CONSTRAINT film_category_pkey PRIMARY KEY ("film_id", "category_id")
);

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_actor_last_name" ON "actor" ("last_name");

--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_unq_manager_staff_id" ON "store" ("manager_staff_id");

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_city_id" ON "address" ("city_id");

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_country_id" ON "city" ("country_id");

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_address_id" ON "customer" ("address_id");

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_store_id" ON "customer" ("store_id");

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_last_name" ON "customer" ("last_name");

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_store_id_film_id" ON "inventory" ("film_id", "store_id");

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_inventory_id" ON "rental" ("inventory_id");

--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_unq_rental_rental_date_inventory_id_customer_id" ON "rental" ("rental_date", "inventory_id", "customer_id");

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_customer_id" ON "payment" ("customer_id");

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_rental_id" ON "payment" ("rental_id");

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_staff_id" ON "payment" ("staff_id");

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "film_fulltext_idx" ON "film" ("fulltext");

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_language_id" ON "film" ("language_id");

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_title" ON "film" ("title");

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_film_id" ON "film_actor" ("film_id");

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "store" ADD CONSTRAINT "store_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "store" ADD CONSTRAINT "store_manager_staff_id_fkey" FOREIGN KEY ("manager_staff_id") REFERENCES "staff"("staff_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "fk_address_city" FOREIGN KEY ("city_id") REFERENCES "city"("city_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "city" ADD CONSTRAINT "fk_city" FOREIGN KEY ("country_id") REFERENCES "country"("country_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customer" ADD CONSTRAINT "customer_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "film"("film_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rental" ADD CONSTRAINT "rental_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rental" ADD CONSTRAINT "rental_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("inventory_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rental" ADD CONSTRAINT "rental_staff_id_key" FOREIGN KEY ("staff_id") REFERENCES "staff"("staff_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "staff" ADD CONSTRAINT "staff_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment" ADD CONSTRAINT "payment_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment" ADD CONSTRAINT "payment_rental_id_fkey" FOREIGN KEY ("rental_id") REFERENCES "rental"("rental_id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment" ADD CONSTRAINT "payment_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("staff_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "film" ADD CONSTRAINT "film_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("language_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "film_actor" ADD CONSTRAINT "film_actor_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "actor"("actor_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "film_actor" ADD CONSTRAINT "film_actor_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "film"("film_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "film_category" ADD CONSTRAINT "film_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "film_category" ADD CONSTRAINT "film_category_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "film"("film_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/
