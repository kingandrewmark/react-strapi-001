import { parse } from "pg-connection-string";

export default ({ env }) => {
  const dbUrl = env("DATABASE_URL");
  if (!dbUrl) {
    console.warn("⚠️ DATABASE_URL is missing. Check your environment variables.");
    return {};
  }

  const parsed = parse(dbUrl);

  return {
    connection: {
      client: "postgres",
      connection: {
        host: parsed.host || env("DATABASE_HOST", "localhost"),
        port: parsed.port ? Number(parsed.port) : 5432,
        database: parsed.database || env("DATABASE_NAME", "strapi"),
        user: parsed.user || env("DATABASE_USERNAME", "strapi"),
        password: parsed.password || env("DATABASE_PASSWORD", "strapi"),
        ssl: env.bool("DATABASE_SSL", true) ? { rejectUnauthorized: false } : false,
      },
      pool: { min: 2, max: 10 },
      acquireConnectionTimeout: 60000,
    },
  };
};
