export default {
  routes: [
    {
      method: 'GET',
      path: '/footer',
      handler: 'footer.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/footer',
      handler: 'footer.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/footer',
      handler: 'footer.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};