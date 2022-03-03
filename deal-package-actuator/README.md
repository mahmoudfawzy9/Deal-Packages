# Kidstar Actuator
This middleware creates a series of endpoints to help you monitor and manage your application when it's pushed to production. It's useful when you run your application on kubernetes and you are in need of endpoints for [readiness/liveness](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) probe.

It is based on [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#production-ready).

## Installation
```sh
$ npm i git+ssh://git@gitlab.apptcom.com:apptcom-kidstar/kidstar-package-actuator.git
```

## Usage

```js
const actuator = require("kidstar-express-actuator")({
    appName: "your-app-name",
    baseUrl: `http://your-app-url.com`,
    managementUrl: "/actuator",
    adminUrl: "http://your-admin-url.com",
    adminPollingInterval: 5000, // Time interval in ms to hit your Spring Boot Admin Server
    auth: { // Optional, needed if you secured your Spring Boot Admin Server
        "username": "admin-username",
        "password": "admin-password"
    },
})

app.use("/actuator", actuator)
```
