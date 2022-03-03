const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express()

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.js')

let port = process.env.PORT,
    baseUrl = process.env.BASE_URL,
    protocol = process.env.PROTOCOL,
    adminUrl = process.env.ADMIN_URL ? process.env.ADMIN_URL : "http://localhost:9000";

const actuator = require("kidstar-package-actuator")({
    appName: "kidstar-be-author-service",
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
}))

// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

require('./src/routes/routes')(app)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () =>
    console.log(`🚀 Server ready at ${baseUrl}:${port}   `)
)