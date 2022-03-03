const response = require("../responses/crud.response");
const { transformCollection, transformSingle, transformSubmission, transformErrors } = require('deal-package-transformer');
const { browseBookCategory, viewBookCategory, createBookCategory, updateBookCategory, deleteBookCategory } = require('../service/book_category.service');

// Create and Save a new Book Category
exports.create = async (req, res) => {
    const transformedBookCategory = transformSubmission(req.body)
    if (transformedBookCategory['book_category_translations']) {
        transformedBookCategory['book_category_translations'] =
            transformedBookCategory['book_category_translations'].map(translation => transformSubmission(translation))
    }
    createBookCategory(transformedBookCategory).then(async data => {
        const transformer = require(`../transformers/book_category.transformer`)
        response.createRespond(res, await transformSingle(transformer, data))
    }).catch(error => {
        response.errorRespond(res, transformErrors(error.details), error.code)
    })
}

// Retrieve all Book Categories from the database.
exports.browse = async (req, res) => {
    browseBookCategory(req.query).then(async data => {
        const transformer = require(`../transformers/book_category.transformer`);
        response.browseRespond(req, res, { rows: await transformCollection(transformer, data.rows), count: data.count })
    }).catch(err => {
        response.errorRespond(res, [err.message] || ["Failed to browse book categories"]);
    });
};

// Find a single Book Category with an id
exports.view = async (req, res) => {
    viewBookCategory(req.params.id, req.query).then(async data => {
        const transformer = require(`../transformers/book_category.transformer`);
        response.viewRespond(res, await transformSingle(transformer, data));
    }).catch(err => {
        response.errorRespond(res, [err.message] || [`Failed to get book category with id=${req.params.id}`]);
    });
};

// Update a Book Category by the id in the request
exports.update = (req, res) => {
    const transformedBookCategory = transformSubmission(req.body)

    if (transformedBookCategory['book_category_translations']) {
        transformedBookCategory['book_category_translations'] =
            transformedBookCategory['book_category_translations'].map(translation => transformSubmission(translation))
    }
    updateBookCategory(req.params.id, transformedBookCategory).then(() => {
        response.updateRespond(res);
    }).catch(error => {
        response.errorRespond(res, transformErrors(error.details), error.code);
    });
};

// Delete a Book Category with the specified id in the request
exports.delete = (req, res) => {
    deleteBookCategory(req.params.id).then(result => {
        if (result[0] === 1) {
            response.deleteRespond(res);
        } else {
            response.errorRespond(res, [`Cannot delete Book Category with id=${req.params.id}. Maybe Book Category was not found!`]);
        }
    }).catch(err => {
        response.errorRespond(res, [err.message] || [`Failed to delete book category with id=${req.params.id}`]);
    });
};