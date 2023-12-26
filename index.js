const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const actuator = require('express-actuator');
require('./config/db.config');
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json());
//monitor and manage application
app.use(actuator());
//swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation with Swagger",
      version: "1.0.0",
      description: "API Documentation with Swagger"
    },
    servers: [
      {
        url: `http://localhost:${port}/api/v1/employees`,
      }
    ],
  },
  apis: [`./src/routes/*.js`],
};
let options = {
  explorer: true
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerSpec, options))

// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});
// Require employee routes
const employeeRoutes = require('./src/routes/employee.routes')
// using as middleware
app.use('/api/v1/employees', employeeRoutes)
// listen for requests
console.log(`${__dirname}/src/routes/employee.routes.js`);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});