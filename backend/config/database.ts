import { parse } from "pg-connection-string";

export default ({ env }) => {
  const dbUrl = env("DATABASE_URL");

  if (!dbUrl) {
    throw new Error("DATABASE_URL is not set in environment variables.");
  }

  const parsed = parse(dbUrl);

  return {
    connection: {
      client: "postgres",
      connection: {
        host: parsed.host || "localhost",
        port: Number(parsed.port) || 5432,
        database: parsed.database || "strapi",
        user: parsed.user || "postgres",
        password: parsed.password || "password",
        ssl: parsed.ssl === true ? { rejectUnauthorized: false } : false, 
      },
      pool: { min: 2, max: 10 },
      acquireConnectionTimeout: 60000,
    },
  };
};
