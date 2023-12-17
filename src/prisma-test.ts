import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient({
    log: ["query"],
  });

  // warm up
  await prisma.film.findFirst();

  const now = performance.now();
  const latestFilmsQuery = prisma.film.findMany({
    include: {
      film_actor: {
        include: {
          actor: true,
        },
        orderBy: [
          { actor: { last_name: "asc" } },
          { actor: { first_name: "asc" } },
        ],
      },
      film_category: {
        include: {
          category: true,
        },
        orderBy: [{ category: { name: "asc" } }],
      },
    },
    take: 1000,
    orderBy: [{ release_year: "desc" }, { title: "asc" }],
  });

  const latestFilms = await latestFilmsQuery;

  console.log(latestFilms[0]);
  console.log("Query took", performance.now() - now, "ms");

  await prisma.$disconnect();
}

main();
