import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";
import * as schema from "./drizzle-schema.js";

async function main() {
  const pool = new pg.Pool({
    connectionString: process.env["DATABASE_URL"],
  });
  const db = drizzle(pool, {
    schema,
  });

  // const sql = postgres(process.env["DATABASE_URL"]!);
  // const db = drizzle(sql, {
  //   schema,
  // });

  // warm up
  await db.select().from(schema.film).limit(1).execute();

  // large query and result
  const now = performance.now();
  const latestFilms = await db.query.film.findMany({
    with: {
      filmActor: {
        with: {
          actor: true,
        },
      },
      filmCategory: {
        with: {
          category: true,
        },
      },
    },
  });

  const diff = performance.now() - now;

  console.log(latestFilms[0]);
  console.log("Query took", diff, "ms");

  // await sql.end();
  await pool.end();
}

main();
