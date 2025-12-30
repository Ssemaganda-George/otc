export default {
  routes: [
    {
      method: 'GET',
      path: '/about-page',
      handler: 'about-page.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/about-page',
      handler: 'about-page.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/about-page',
      handler: 'about-page.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};