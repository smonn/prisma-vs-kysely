import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type MpaaRating = "G" | "NC-17" | "PG" | "PG-13" | "R";

export type Numeric = ColumnType<string, number | string, number | string>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Actor {
  actorId: Generated<number>;
  firstName: string;
  lastName: string;
  lastUpdate: Generated<Timestamp>;
}

export interface ActorInfo {
  actorId: number | null;
  filmInfo: string | null;
  firstName: string | null;
  lastName: string | null;
}

export interface Address {
  address: string;
  address2: string | null;
  addressId: Generated<number>;
  cityId: number;
  district: string;
  lastUpdate: Generated<Timestamp>;
  phone: string;
  postalCode: string | null;
}

export interface Category {
  categoryId: Generated<number>;
  lastUpdate: Generated<Timestamp>;
  name: string;
}

export interface City {
  city: string;
  cityId: Generated<number>;
  countryId: number;
  lastUpdate: Generated<Timestamp>;
}

export interface Country {
  country: string;
  countryId: Generated<number>;
  lastUpdate: Generated<Timestamp>;
}

export interface Customer {
  active: number | null;
  activebool: Generated<boolean>;
  addressId: number;
  createDate: Generated<Timestamp>;
  customerId: Generated<number>;
  email: string | null;
  firstName: string;
  lastName: string;
  lastUpdate: Generated<Timestamp | null>;
  storeId: number;
}

export interface CustomerList {
  address: string | null;
  city: string | null;
  country: string | null;
  id: number | null;
  name: string | null;
  notes: string | null;
  phone: string | null;
  sid: number | null;
  "zip code": string | null;
}

export interface Film {
  description: string | null;
  filmId: Generated<number>;
  fulltext: string;
  languageId: number;
  lastUpdate: Generated<Timestamp>;
  length: number | null;
  rating: Generated<MpaaRating | null>;
  releaseYear: number | null;
  rentalDuration: Generated<number>;
  rentalRate: Generated<Numeric>;
  replacementCost: Generated<Numeric>;
  specialFeatures: string[] | null;
  title: string;
}

export interface FilmActor {
  actorId: number;
  filmId: number;
  lastUpdate: Generated<Timestamp>;
}

export interface FilmCategory {
  categoryId: number;
  filmId: number;
  lastUpdate: Generated<Timestamp>;
}

export interface FilmList {
  actors: string | null;
  category: string | null;
  description: string | null;
  fid: number | null;
  length: number | null;
  price: Numeric | null;
  rating: MpaaRating | null;
  title: string | null;
}

export interface Inventory {
  filmId: number;
  inventoryId: Generated<number>;
  lastUpdate: Generated<Timestamp>;
  storeId: number;
}

export interface Language {
  languageId: Generated<number>;
  lastUpdate: Generated<Timestamp>;
  name: string;
}

export interface NicerButSlowerFilmList {
  actors: string | null;
  category: string | null;
  description: string | null;
  fid: number | null;
  length: number | null;
  price: Numeric | null;
  rating: MpaaRating | null;
  title: string | null;
}

export interface Payment {
  amount: Numeric;
  customerId: number;
  paymentDate: Timestamp;
  paymentId: Generated<number>;
  rentalId: number;
  staffId: number;
}

export interface Rental {
  customerId: number;
  inventoryId: number;
  lastUpdate: Generated<Timestamp>;
  rentalDate: Timestamp;
  rentalId: Generated<number>;
  returnDate: Timestamp | null;
  staffId: number;
}

export interface SalesByFilmCategory {
  category: string | null;
  totalSales: Numeric | null;
}

export interface SalesByStore {
  manager: string | null;
  store: string | null;
  totalSales: Numeric | null;
}

export interface Staff {
  active: Generated<boolean>;
  addressId: number;
  email: string | null;
  firstName: string;
  lastName: string;
  lastUpdate: Generated<Timestamp>;
  password: string | null;
  picture: Buffer | null;
  staffId: Generated<number>;
  storeId: number;
  username: string;
}

export interface StaffList {
  address: string | null;
  city: string | null;
  country: string | null;
  id: number | null;
  name: string | null;
  phone: string | null;
  sid: number | null;
  "zip code": string | null;
}

export interface Store {
  addressId: number;
  lastUpdate: Generated<Timestamp>;
  managerStaffId: number;
  storeId: Generated<number>;
}

export interface DB {
  actor: Actor;
  actorInfo: ActorInfo;
  address: Address;
  category: Category;
  city: City;
  country: Country;
  customer: Customer;
  customerList: CustomerList;
  film: Film;
  filmActor: FilmActor;
  filmCategory: FilmCategory;
  filmList: FilmList;
  inventory: Inventory;
  language: Language;
  nicerButSlowerFilmList: NicerButSlowerFilmList;
  payment: Payment;
  rental: Rental;
  salesByFilmCategory: SalesByFilmCategory;
  salesByStore: SalesByStore;
  staff: Staff;
  staffList: StaffList;
  store: Store;
}
