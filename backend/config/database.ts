import { parse } from "pg-connection-string";

export default ({ env }) => {
  const dbUrl = env("DATABASE_URL", ""); // Fetch DATABASE_URL from .env
  const parsed = parse(dbUrl); // Parse PostgreSQL connection string

  return {
    connection: {
      client: "postgres",
      connection: {
        host: parsed.host, // postgres.railway.internal
        port: parsed.port, // 5432
        database: parsed.database, // railway
        user: parsed.user, // postgres
        password: parsed.password, // Your actual password
        ssl: { rejectUnauthorized: false }, // Required for Railway
      },
      pool: { min: 2, max: 10 },
      acquireConnectionTimeout: 60000,
    },
  };
};
