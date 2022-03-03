
const { createManager, browseManager, viewManager, updateManager,
    deleteManager, activateManager } = require('../dataManager/authorDataManager')
const { validationException, createAuthorValidation, updateAuthorValidation } = require('./authorValidation')

module.exports = {

    createAuthor: async data => {
        let validatedData = null
        try {
            validatedData = await createAuthorValidation(data)

        } catch (error) {
            console.log(error)
            throw new validationException({ errors: error, code: 422 })
        }

        try {
            return createManager(validatedData)
        } catch (error) {
            console.log(error)
            throw new validationException({ errors: error, code: 500 })
        }
    },
    browseAuthors: params => {
        return browseManager(params)
    },
    viewAuthor: (id, params) => {
        return viewManager(id, params)
    },
    updateAuthor: async (id, data) => {
        let validatedData = null
        try {

            validatedData = await updateAuthorValidation(data)
        } catch (error) {
            console.log(error)
            throw new validationException({ errors: error, code: 422 })
        }

        try {
            return updateManager(id, validatedData)
        } catch (error) {
            console.log(error)
            throw new validationException({ errors: error, code: 500 })
        }
    },
    deleteAuthor: async id => {
        return deleteManager(id)
    },
    activateAuthor: async id => {
        return activateManager(id)
    }

}