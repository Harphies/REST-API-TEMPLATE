// Configure documentation Auto generate
exports.swaggeroption = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Singledoctor API',
      description: 'A platform for doctor and patient',
      contact: {
        name: 'TREPLABS',
      },
      servers: ['http://localhost:5000'],
    },
  },
  // the folder where the routes are defined
  apis: ['./backend/routes/*.js'],
}
