const {Router} = require('express')
const  authorRoutes = require('./authorRoutes')

module.exports = app => {
    authorRoutes(app, Router())
}