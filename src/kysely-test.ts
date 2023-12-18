import "dotenv/config";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
// import { PostgresJSDialect } from "kysely-postgres-js";
import { jsonArrayFrom } from "kysely/helpers/postgres";
// import postgres from "postgres";
import { DB } from "./kysely-types";
import pg from "pg";

const DATABASE_URL = process.env["DATABASE_URL"]!;

async function main() {
  const kysely = new Kysely<DB>({
    // dialect: new PostgresJSDialect({
    //   postgres: postgres(DATABASE_URL, {
    //     ssl: "prefer",
    //   }),
    // }),
    dialect: new PostgresDialect({
      pool: new pg.Pool({
        connectionString: DATABASE_URL,
      }),
    }),
    plugins: [new CamelCasePlugin()],
  });

  await kysely.selectFrom("film").selectAll().executeTakeFirst();

  const now = performance.now();

  const latestFilmsQuery = kysely
    .selectFrom("film")
    .limit(1000)
    .orderBy(["film.releaseYear desc", "film.title asc"])
    .selectAll("film")
    .groupBy("film.filmId")
    .select((eb) => [
      jsonArrayFrom(
        eb
          .selectFrom("filmCategory")
          .innerJoin(
            "category",
            "category.categoryId",
            "filmCategory.categoryId"
          )
          .where("filmCategory.filmId", "=", eb.ref("film.filmId"))
          .orderBy(["category.name asc"])
          .selectAll("category")
      ).as("categories"),
      jsonArrayFrom(
        eb
          .selectFrom("filmActor")
          .innerJoin("actor", "actor.actorId", "filmActor.actorId")
          .where("filmActor.filmId", "=", eb.ref("film.filmId"))
          .orderBy(["actor.lastName asc", "actor.firstName asc"])
          .selectAll("actor")
      ).as("actors"),
    ]);

  // console.log(latestFilmsQuery.compile().sql);

  const latestFilms = await latestFilmsQuery.execute();
  const diff = performance.now() - now;

  console.log(latestFilms[0]);
  console.log("Query took", diff, "ms");

  await kysely.destroy();
}

main();
