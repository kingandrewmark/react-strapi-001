export default [
    'strapi::errors',
    {
      name: 'strapi::cors',
      config: {
        origin: ['http://localhost:5173'], // Your React app's URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
      },
    },
    'strapi::security',
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::favicon',
    'strapi::public',
  ];
  