
const { transformSubmission, transformCollection, transformSingle, transformErrors } = require('deal-package-transformer')

const { createAuthor, browseAuthors, viewAuthor, updateAuthor, activateAuthor, deleteAuthor } = require('../service/authorService')
const { createResponse, browseResponse, viewResponse, updateResponse,
    deleteResponse, errorResponse } = require('../responses/crudResponses')
const transformer = require('../transformer/authorTransformer')

module.exports = {

    create: async (req, res) => {

        const transformedAuthor = await transformSubmission(req.body)
        try {
            const createdAuthor = await createAuthor(transformedAuthor)
            createResponse(res)
        } catch (error) {
            errorResponse(res, transformErrors(error.details), error.code)
        }
    },

    browse: async (req, res) => {
        try {

            const authorListData = await browseAuthors(req.query)
            const rows = await transformCollection(transformer, authorListData.rows)
            const count = authorListData.count

            browseResponse(req, res, { rows, count })

        } catch (error) {
            console.log(error)
            errorResponse(error, [error.message] || ["Failed to browse authors"])
        }
    },

    view: async (req, res) => {
        try {
            const authorData = await viewAuthor(req.params.id, req.query)
            const transformedAuthorData = await transformSingle(transformer, authorData)

            viewResponse(res, transformedAuthorData)
        } catch (error) {
            console.log(error)
            errorResponse(res, [error.message] || [`Failed to get author id=${error.params.id}`])


        }
    },

    update: async (req, res) => {
        const transformedAuthor = transformSubmission(req.body)
        try {
            const updatedAuthor = await updateAuthor(req.params.id, transformedAuthor)
            updateResponse(res)
        } catch (error) {
            console.log(error)
            errorResponse(res, error.details, error.code)
        }
    },

    delete: async (req, res) => {
        try {
            const result = await deleteAuthor(req.params.id)

            if (result[0] === 1) {
                deleteResponse(res)
            }
            else {
                errorResponse(res, [`Cannot delete author with id=${req.params.id}. Maybe author was not found!`])
            }
        } catch (error) {
            console.log(error)
            errorResponse(res, [error.message] || [`Failed to delete author with id=${req.params.id}`])
        }
    },

    activate: async (req, res) => {
        try {
            const result = await activateAuthor(req.params.id)
            if (result[0] === 1) {
                updateResponse(res, 'Item activated successfully')
            }
            else {
                errorResponse(res, [`Cannot activate author with id=${req.params.id}. Maybe author was not found!`])
            }
        } catch (error) {
            console.log(error)
            errorResponse(res, [error.message] || [`Failed to activate author with id=${req.params.id}`])
        }
    }
}