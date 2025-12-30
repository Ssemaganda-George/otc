export default {
  routes: [
    {
      method: 'GET',
      path: '/resources',
      handler: 'resource.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/resources/:id',
      handler: 'resource.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/resources',
      handler: 'resource.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/resources/:id',
      handler: 'resource.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/resources/:id',
      handler: 'resource.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};