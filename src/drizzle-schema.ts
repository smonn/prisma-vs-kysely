import {
  boolean,
  char,
  date,
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const mpaaRating = pgEnum("mpaa_rating", [
  "NC-17",
  "R",
  "PG-13",
  "PG",
  "G",
]);

export const actor = pgTable(
  "actor",
  {
    actorId: serial("actor_id").primaryKey().notNull(),
    firstName: varchar("first_name", { length: 45 }).notNull(),
    lastName: varchar("last_name", { length: 45 }).notNull(),
    lastUpdate: timestamp("last_update", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      idxActorLastName: index("idx_actor_last_name").on(table.lastName),
    };
  }
);

export const actorInfo = pgTable("actor_info", {
  actorId: integer("actor_id"),
  firstName: varchar("first_name", { length: 45 }),
  lastName: varchar("last_name", { length: 45 }),
  filmInfo: text("film_info"),
});

export const customerList = pgTable("customer_list", {
  id: integer("id"),
  name: text("name"),
  address: varchar("address", { length: 50 }),
  zipCode: varchar("zip code", { length: 10 }),
  phone: varchar("phone", { length: 20 }),
  city: varchar("city", { length: 50 }),
  country: varchar("country", { length: 50 }),
  notes: text("notes"),
  sid: smallint("sid"),
});

export const filmList = pgTable("film_list", {
  fid: integer("fid"),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  category: varchar("category", { length: 25 }),
  price: numeric("price", { precision: 4, scale: 2 }),
  length: smallint("length"),
  rating: mpaaRating("rating"),
  actors: text("actors"),
});

export const nicerButSlowerFilmList = pgTable("nicer_but_slower_film_list", {
  fid: integer("fid"),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  category: varchar("category", { length: 25 }),
  price: numeric("price", { precision: 4, scale: 2 }),
  length: smallint("length"),
  rating: mpaaRating("rating"),
  actors: text("actors"),
});

export const salesByFilmCategory = pgTable("sales_by_film_category", {
  category: varchar("category", { length: 25 }),
  totalSales: numeric("total_sales"),
});

export const store = pgTable(
  "store",
  {
    storeId: serial("store_id").primaryKey().notNull(),
    managerStaffId: smallint("manager_staff_id")
      .notNull()
      .references(() => staff.staffId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    addressId: smallint("address_id")
      .notNull()
      .references(() => address.addressId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    lastUpdate: timestamp("last_update", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      idxUnqManagerStaffId: uniqueIndex("idx_unq_manager_staff_id").on(
        table.managerStaffId
      ),
    };
  }
);

export const salesByStore = pgTable("sales_by_store", {
  store: text("store"),
  manager: text("manager"),
  totalSales: numeric("total_sales"),
});

export const staffList = pgTable("staff_list", {
  id: integer("id"),
  name: text("name"),
  address: varchar("address", { length: 50 }),
  zipCode: varchar("zip code", { length: 10 }),
  phone: varchar("phone", { length: 20 }),
  city: varchar("city", { length: 50 }),
  country: varchar("country", { length: 50 }),
  sid: smallint("sid"),
});

export const address = pgTable(
  "address",
  {
    addressId: serial("address_id").primaryKey().notNull(),
    address: varchar("address", { length: 50 }).notNull(),
    address2: varchar("address2", { length: 50 }),
    district: varchar("district", { length: 20 }).notNull(),
    cityId: smallint("city_id")
      .notNull()
      .references(() => city.cityId),
    postalCode: varchar("postal_code", { length: 10 }),
    phone: varchar("phone", { length: 20 }).notNull(),
    lastUpdate: timestamp("last_update", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      idxFkCityId: index("idx_fk_city_id").on(table.cityId),
    };
  }
);

export const category = pgTable("category", {
  categoryId: serial("category_id").primaryKey().notNull(),
  name: varchar("name", { length: 25 }).notNull(),
  lastUpdate: timestamp("last_update", { mode: "string" })
    .defaultNow()
    .notNull(),
});

export const city = pgTable(
  "city",
  {
    cityId: serial("city_id").primaryKey().notNull(),
    city: varchar("city", { length: 50 }).notNull(),
    countryId: smallint("country_id")
      .notNull()
      .references(() => country.countryId),
    lastUpdate: timestamp("last_update", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      idxFkCountryId: index("idx_fk_country_id").on(table.countryId),
    };
  }
);

export const country = pgTable("country", {
  countryId: serial("country_id").primaryKey().notNull(),
  country: varchar("country", { length: 50 }).notNull(),
  lastUpdate: timestamp("last_update", { mode: "string" })
    .defaultNow()
    .notNull(),
});

export const customer = pgTable(
  "customer",
  {
    customerId: serial("customer_id").primaryKey().notNull(),
    storeId: smallint("store_id").notNull(),
    firstName: varchar("first_name", { length: 45 }).notNull(),
    lastName: varchar("last_name", { length: 45 }).notNull(),
    email: varchar("email", { length: 50 }),
    addressId: smallint("address_id")
      .notNull()
      .references(() => address.addressId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    activebool: boolean("activebool").default(true).notNull(),
    createDate: date("create_date").default(`'now'::text`).notNull(),
    lastUpdate: timestamp("last_update", { mode: "string" }).defaultNow(),
    active: integer("active"),
  },
  (table) => {
    return {
      idxFkAddressId: index("idx_fk_address_id").on(table.addressId),
      idxFkStoreId: index("idx_fk_store_id").on(table.storeId),
      idxLastName: index("idx_last_name").on(table.lastName),
    };
  }
);

export const inventory = pgTable(
  "inventory",
  {
    inventoryId: serial("inventory_id").primaryKey().notNull(),
    filmId: smallint("film_id")
      .notNull()
      .references(() => film.filmId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    storeId: smallint("store_id").notNull(),
    lastUpdate: timestamp("last_update", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      idxStoreIdFilmId: index("idx_store_id_film_id").on(
        table.filmId,
        table.storeId
      ),
    };
  }
);

export const language = pgTable("language", {
  languageId: serial("language_id").primaryKey().notNull(),
  name: char("name", { length: 20 }).notNull(),
  lastUpdate: timestamp("last_update", { mode: "string" })
    .defaultNow()
    .notNull(),
});

export const rental = pgTable(
  "rental",
  {
    rentalId: serial("rental_id").primaryKey().notNull(),
    rentalDate: timestamp("rental_date", { mode: "string" }).notNull(),
    inventoryId: integer("inventory_id")
      .notNull()
      .references(() => inventory.inventoryId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    customerId: smallint("customer_id")
      .notNull()
      .references(() => customer.customerId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    returnDate: timestamp("return_date", { mode: "string" }),
    staffId: smallint("staff_id")
      .notNull()
      .references(() => staff.staffId),
    lastUpdate: timestamp("last_update", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      idxFkInventoryId: index("idx_fk_inventory_id").on(table.inventoryId),
      idxUnqRentalRentalDateInventoryIdCustomerId: uniqueIndex(
        "idx_unq_rental_rental_date_inventory_id_customer_id"
      ).on(table.rentalDate, table.inventoryId, table.customerId),
    };
  }
);

export const staff = pgTable("staff", {
  staffId: serial("staff_id").primaryKey().notNull(),
  firstName: varchar("first_name", { length: 45 }).notNull(),
  lastName: varchar("last_name", { length: 45 }).notNull(),
  addressId: smallint("address_id")
    .notNull()
    .references(() => address.addressId, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  email: varchar("email", { length: 50 }),
  storeId: smallint("store_id").notNull(),
  active: boolean("active").default(true).notNull(),
  username: varchar("username", { length: 16 }).notNull(),
  password: varchar("password", { length: 40 }),
  lastUpdate: timestamp("last_update", { mode: "string" })
    .defaultNow()
    .notNull(),
  // TODO: failed to parse database type 'bytea'
  picture: text("picture"),
});

export const payment = pgTable(
  "payment",
  {
    paymentId: serial("payment_id").primaryKey().notNull(),
    customerId: smallint("customer_id")
      .notNull()
      .references(() => customer.customerId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    staffId: smallint("staff_id")
      .notNull()
      .references(() => staff.staffId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    rentalId: integer("rental_id")
      .notNull()
      .references(() => rental.rentalId, {
        onDelete: "set null",
        onUpdate: "cascade",
      }),
    amount: numeric("amount", { precision: 5, scale: 2 }).notNull(),
    paymentDate: timestamp("payment_date", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      idxFkCustomerId: index("idx_fk_customer_id").on(table.customerId),
      idxFkRentalId: index("idx_fk_rental_id").on(table.rentalId),
      idxFkStaffId: index("idx_fk_staff_id").on(table.staffId),
    };
  }
);

export const film = pgTable(
  "film",
  {
    filmId: serial("film_id").primaryKey().notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    // TODO: failed to parse database type 'year'
    releaseYear: integer("release_year"),
    languageId: smallint("language_id")
      .notNull()
      .references(() => language.languageId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    rentalDuration: smallint("rental_duration").default(3).notNull(),
    rentalRate: numeric("rental_rate", { precision: 4, scale: 2 })
      .default("4.99")
      .notNull(),
    length: smallint("length"),
    replacementCost: numeric("replacement_cost", { precision: 5, scale: 2 })
      .default("19.99")
      .notNull(),
    rating: mpaaRating("rating").default("G"),
    lastUpdate: timestamp("last_update", { mode: "string" })
      .defaultNow()
      .notNull(),
    specialFeatures: text("special_features").array(),
    // TODO: failed to parse database type 'tsvector'
    fulltext: text("fulltext").notNull(),
  },
  (table) => {
    return {
      fulltextIdx: index("film_fulltext_idx").on(table.fulltext),
      idxFkLanguageId: index("idx_fk_language_id").on(table.languageId),
      idxTitle: index("idx_title").on(table.title),
    };
  }
);

export const filmActor = pgTable(
  "film_actor",
  {
    actorId: smallint("actor_id")
      .notNull()
      .references(() => actor.actorId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    filmId: smallint("film_id")
      .notNull()
      .references(() => film.filmId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    lastUpdate: timestamp("last_update", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      idxFkFilmId: index("idx_fk_film_id").on(table.filmId),
      filmActorPkey: primaryKey({
        columns: [table.actorId, table.filmId],
        name: "film_actor_pkey",
      }),
    };
  }
);

export const filmCategory = pgTable(
  "film_category",
  {
    filmId: smallint("film_id")
      .notNull()
      .references(() => film.filmId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    categoryId: smallint("category_id")
      .notNull()
      .references(() => category.categoryId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    lastUpdate: timestamp("last_update", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      filmCategoryPkey: primaryKey({
        columns: [table.filmId, table.categoryId],
        name: "film_category_pkey",
      }),
    };
  }
);

export const filmCategoryRelations = relations(filmCategory, ({ one }) => ({
  category: one(category, {
    fields: [filmCategory.categoryId],
    references: [category.categoryId],
  }),
  film: one(film, {
    fields: [filmCategory.filmId],
    references: [film.filmId],
  }),
}));

export const filmActorRelations = relations(filmActor, ({ one }) => ({
  actor: one(actor, {
    fields: [filmActor.actorId],
    references: [actor.actorId],
  }),
  film: one(film, {
    fields: [filmActor.filmId],
    references: [film.filmId],
  }),
}));

export const filmRelations = relations(film, ({ many }) => ({
  filmActor: many(filmActor),
  filmCategory: many(filmCategory),
}));
