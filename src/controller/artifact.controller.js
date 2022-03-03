const response = require("../responses/crud.response");
const {transformCollection, transformSingle, transformSubmission, transformErrors} = require('kidstar-package-transformer');
const {browseArtifact, viewArtifact, createArtifact, updateArtifact, deleteArtifact} = require('../service/artifact.service');

// Create and Save a new Artifact
exports.create = async (req, res) => {
    createArtifact(transformSubmission(req.body)).then(async data => {
        const transformer = require(`../transformers/artifact.transformer`);
        response.createRespond(res, await transformSingle(transformer, data));
    }).catch(error => {
        response.errorRespond(res, transformErrors(error.details), error.code);
    });
};

// Retrieve all Artifacts from the database.
exports.browse = (req, res) => {
    browseArtifact(req.query).then(async data => {
        const transformer = require(`../transformers/artifact.transformer`);
        response.browseRespond(req, res, { rows: await transformCollection(transformer, data.rows), count: data.count })
    }).catch(err => {
        response.errorRespond(res, [err.message] || ["Failed to browse artifacts"]);
    });
};

// Find a single Artifact with an id
exports.view = (req, res) => {
    viewArtifact(req.params.id, req.query).then(async data => {
        const transformer = require(`../transformers/artifact.transformer`);
        response.viewRespond(res, await transformSingle(transformer, data));
    }).catch(err => {
        response.errorRespond(res, [err.message] || [`Failed to get Artifact with id=${req.params.id}`]);
    });
};

// Update an Artifact by the id in the request
exports.update = (req, res) => {
    updateArtifact(req.params.id, transformSubmission(req.body)).then(() => {
        response.updateRespond(res);
    }).catch(error => {
        response.errorRespond(res, transformErrors(error.details), error.code);
    });
};

// Delete an Artifact with the specified id in the request
exports.delete = (req, res) => {
    deleteArtifact(req.params.id).then(result => {
        if (result[0] === 1) {
            response.deleteRespond(res);
        } else {
            response.errorRespond(res,[`Cannot delete Artifact with id=${req.params.id}. Maybe Artifact was not found!`]);
        }
    }).catch(err => {
        response.errorRespond(res, [err.message] || [`Failed to delete artifact with id=${req.params.id}`]);
    });
};