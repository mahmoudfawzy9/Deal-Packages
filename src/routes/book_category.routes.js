const bookCategory = require("../controller/book_category.controller.js");

module.exports = (app, router) => {
    // Create a new Book Category
    router.post("/", bookCategory.create);

    // Retrieve all Book Categories
    router.get("/", bookCategory.browse);

    // Retrieve a single Book Category with id
    router.get("/:id", bookCategory.view);

    // Delete a Book Category with id
    router.delete("/:id", bookCategory.delete);

    // Update a Book Category with id
    router.put("/:id", bookCategory.update);

    app.use('/api/json/book-categories', router);
};