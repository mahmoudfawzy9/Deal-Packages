const response = require("../responses/crud.response");
const { browseArticles, viewArticle, createArticle, updateArticle, deleteArticle, assignCategory,
    unAssignCategory, addAuthorService, listauthorService, updateAuthorsService } = require('../service/article.service');
const { transformCollection, transformSingle, transformSubmission, transformErrors } = require('deal-package-transformer');

// Create and Save a new Article
exports.create = async (req, res) => {
    createArticle(transformSubmission(req.body)).then(async data => {
        const transformer = require(`../transformers/article.transformer`);
        response.createRespond(res, await transformSingle(transformer, data));
    }).catch(error => {
        response.errorRespond(res, transformErrors(error.details), error.code);
    });
};

// Retrieve all Articles from the database.
exports.browse = async (req, res) => {
    browseArticles(req.query).then(async data => {
        const transformer = require(`../transformers/article.transformer`);
        response.browseRespond(req, res, { rows: await transformCollection(transformer, data.rows), count: data.count })
    }).catch(err => {
        response.errorRespond(res, [err.message] || ["Failed to browse articles"]);
    });
};

// Find a single Article with an id
exports.view = (req, res) => {
    viewArticle(req.params.id, req.query).then(async data => {
        const transformer = require(`../transformers/article.transformer`);
        response.viewRespond(res, await transformSingle(transformer, data));
    }).catch(err => {
        response.errorRespond(res, [err.message] || [`Failed to get article with id=${req.params.id}`]);
    });
};

// Update an Article by the id in the request
exports.update = (req, res) => {
    updateArticle(req.params.id, transformSubmission(req.body)).then(() => {
        response.updateRespond(res);
    }).catch(error => {
        response.errorRespond(res, transformErrors(error.details), error.code);
    });
};

// Delete an Article with the specified id in the request
exports.delete = (req, res) => {
    deleteArticle(req.params.id).then(result => {
        if (result[0] === 1) {
            response.deleteRespond(res);
        } else {
            response.errorRespond(res, [`Cannot delete Article with id=${req.params.id}. Maybe Article was not found!`]);
        }
    }).catch(err => {
        response.errorRespond(res, [err.message] || [`Failed to delete article with id=${req.params.id}`]);
    });
};

// Assign Category to Article with category_id and and article_id
exports.assignCategory = async (req, res) => {
    assignCategory(transformSubmission(req.body)).then(data => {
        response.createRespond(res, data);
    }).catch(error => {
        response.errorRespond(res, transformErrors(error.details), error.code);
    });
};

// Un-Assign category to article with relation(ArticleCategory) ID.
exports.unAssignCategory = (req, res) => {
    unAssignCategory(req.params.id).then(result => {
        if (result === 1) response.deleteRespond(res, 'Category un-assigned successfully');
        else response.errorRespond(res, [`Cannot un-assign category to article! Maybe the assignation was not found.`]);
    }).catch(err => {
        response.errorRespond(res, [err.message] || [`Failed to un-assign category to article!`]);
    });
};

// Add authors to article
exports.addAuthors = async (req, res) => {
    const authorList = req.body;
    const transformedAuthorList = [];
    authorList.map(author => transformedAuthorList.push(transformSubmission(author)));
    try {
        const returndAuthors = await addAuthorService(req.params.id, transformedAuthorList);
        response.updateRespond(res, 'Authors added successfully');
    } catch (error) {
        response.errorRespond(res, transformErrors(error.details), error.code);
    }
}

//list article authors
exports.browseAuthors = async (req, res) => {
    try {
        const transformer = require('../transformers/articleAuthor.transformer');
        const data = await listauthorService(req.params.id);
        const { rows } = data;
        response.viewRespond(res, await transformCollection(transformer, rows));
    } catch (error) {
        console.log(error)
        response.errorRespond(res, [error.message] || ["Failed to browse authors article"]);
    }
}

//update article authors
exports.updateAuthors = async (req, res) => {
    try {
        const authorList = req.body;
        const transformedAuthorList = [];
        authorList.map(author => transformedAuthorList.push(transformSubmission(author)));
        const data = await updateAuthorsService(req.params.id, transformedAuthorList);
        const { rows } = data;
        response.updateRespond(res, 'Authors updated successfully');
    } catch (error) {
        console.log(error);
        response.errorRespond(res, transformErrors(error.details), error.code);
    }
}