const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.js');

const app = express();

let port = process.env.PORT,
    baseUrl = process.env.BASE_URL,
    protocol = process.env.PROTOCOL,
    adminUrl = process.env.ADMIN_URL ? process.env.ADMIN_URL : "http://localhost:9000";

const actuator = require("kidstar-package-actuator")({
    appName: "kidstar-be-story-service",
    baseUrl: `${protocol}://${baseUrl}:${port}`,
    managementUrl: "/actuator",
    adminUrl: adminUrl,
    adminPollingInterval: 5000,
    auth: { // Optional, needed if you secured your Spring Boot Admin Server
        "username": "admin",
        "password": "12345678"
    },
})

app.use("/actuator", actuator)

app.use(cors({
    origin: '*'
}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Story Service" });
});

require("./src/routes/routes")(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () =>
    console.log(`🚀 Server ready at ${baseUrl}:${port}`)
);