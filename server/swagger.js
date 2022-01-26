const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    apis: [
        './routes/*.js'
    ],
    basePath: '/',
    swaggerDefinition: {
        info: {
          description: 'Test API with autogenerated swagger doc',
          swagger: '2.0',
          title: 'User Auth API',
          version: '1.0.0',
        },
      },
}

const specs = swaggerJsdoc(options);

module.exports = specs;