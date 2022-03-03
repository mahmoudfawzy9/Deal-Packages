const artifact = require("../controller/artifact.controller.js");

module.exports = (app, router) => {
    // Create a new Artifact
    router.post("/", artifact.create);

    // Retrieve all Artifacts
    router.get("/", artifact.browse);

    // Retrieve a single Artifact with id
    router.get("/:id", artifact.view);

    // Delete an Artifact with id
    router.delete("/:id", artifact.delete);

    // Update an Artifact with id
    router.put("/:id", artifact.update);

    app.use('/api/json/artifacts', router);
};