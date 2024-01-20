const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const actuator = require('express-actuator');
const cors = require('cors')
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
const actuatorConfig = {
  info: {
    gitInfo: "nodejs crud application with mongodb database"
  },
  health: {
    description: "App is running at 5000"
  }
};
app.use(actuator(actuatorConfig));
//allow cors

app.use(cors({
  origin: "http://51.20.41.138:3000"
}))
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

//configuring keycloak
// const keycloak = require('./config/keycloak.config.js').initKeycloak();
// app.use(keycloak.middleware());
// Require employee routes
const employeeRoutes = require('./src/routes/employee.routes')
// using as middleware
app.use('/api/v1/employees', employeeRoutes)
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});