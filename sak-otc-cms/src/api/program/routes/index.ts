export default {
  routes: [
    {
      method: 'GET',
      path: '/programs',
      handler: 'program.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/programs/:id',
      handler: 'program.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/programs',
      handler: 'program.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/programs/:id',
      handler: 'program.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/programs/:id',
      handler: 'program.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};