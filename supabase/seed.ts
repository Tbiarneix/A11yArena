import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/lib/db/schema";

async function seed() {
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle(client, { schema });

  console.log("Seeding database...");

  // TODO: Import WCAG 2.2 criteria from content/seed/wcag-2.2-criteria.json
  // TODO: Import RGAA 4.1 criteria from content/seed/rgaa-4.1-criteria.json
  // TODO: Import WCAG<->RGAA mapping from content/seed/wcag-rgaa-mapping.json
  // TODO: Insert initial challenges
  // TODO: Insert initial parcours

  console.log("Seed complete");
  await client.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
