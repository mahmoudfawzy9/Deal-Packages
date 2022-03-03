"use strict"

const $http = require('http-as-promised'),
    router = require("./router")

function buildRegisterPayload(config){
    return {
        name: config.appName,
        managementUrl:`${config.baseUrl}${config.managementUrl}/info`,
        healthUrl:`${config.baseUrl}${config.managementUrl}/health`,
        serviceUrl: config.baseUrl,
        metadata:{
            "user.name": config.auth.username,
            "user.password": config.auth.password
        }
    }
}

function heartbeat(config){
    return $http.post({
        url: `${config.adminUrl}/instances`,
        json: buildRegisterPayload(config),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": "Basic YWRtaW46MTIzNDU2Nzg=",
            "Cookie": "XSRF-TOKEN=e79598ec-6abe-4c0f-8795-1c2c42b6e2ee; JSESSIONID=D419EC9742251ACE46368FA8542152C6",
        }
    }).spread((response, body) => {
        //console.log(response.body.id)
        //console.log("Status: ", response.statusCode)
    }).catch(error => {
        console.error("Error calling spring-boot-admin: ",error.message)
    })
}

function setDefaultConfigValues(config){
    config = config || {}
    config.appName = config.appName || "Unknown app"
    config.adminPollingInterval = config.adminPollingInterval || 10000
    config.managementUrl = config.managementUrl || "/"
    return config
}

module.exports = function(config){
    config = setDefaultConfigValues(config)

    if (config.adminUrl) {
        setInterval(heartbeat,config.adminPollingInterval,config)
    }

    return router
}
