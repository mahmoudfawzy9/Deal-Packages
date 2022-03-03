const story = require("../controller/article.controller.js");

module.exports = (app, router) => {
    // Create a new article
    router.post("/", article.create);

    // Retrieve all articles
    router.get("/", article.browse);

    // Retrieve a single article with id
    router.get("/:id", article.view);

    // Delete a article with id
    router.delete("/:id", article.delete);

    // Assign Category to article
    router.post("/assign-category", article.assignCategory);

    // Un-assign Category to article
    router.delete("/un-assign-category/:id", article.unAssignCategory);

    // Update a article with id
    router.put("/:id", article.update);

    //add authors to article by id
    router.post('/:id/authors',article.addAuthors);

    //list article authors
    router.get('/:id/authors',article.browseAuthors);

    //update article authors
    router.put('/:id/authors',article.updateAuthors);

    app.use('/api/json/articles', router);
};