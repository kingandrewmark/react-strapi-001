module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),  // Ensure this is 0.0.0.0
  port: env.int('PORT', 1337),   // Make sure it's correctly set
  url: env('PUBLIC_URL', 'https://react-strapi-001-production.up.railway.app'),
  app: {
    keys: env.array('APP_KEYS', ['yourRandomKey1', 'yourRandomKey2']),
  },
});
