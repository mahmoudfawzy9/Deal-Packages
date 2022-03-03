
module.exports = app => {
    require("./article.routes")(app, require("express").Router());
    require("./book_category.routes")(app, require("express").Router());
    require("./artifact.routes")(app, require("express").Router());
}