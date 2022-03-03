

const { browseManager, viewManager, createManager, updateManager, deleteManager } = require('../data_manager/book_category.data-manager');
const validator = require("deal-package-validator");
const axios = require('axios');

module.exports = {
    browseBookCategory: (params) => {
        return browseManager(params);
    },

    viewBookCategory: (id, params) => {
        return viewManager(id, params);
    },

    createBookCategory: async data => {
        const db = require("../models")
        let validatedData = null
        try {
            validatedData = await validator.validate(db, data, {
                code: ['required', 'string', { 'unique_in': 'book_category' }],
                image_url: ['required', 'string'],
            })

        } catch (error) {
            return Promise.reject({ details: error, code: 422 })
        }

        try {
            const result = await createManager(validatedData)
            return result
        } catch (error) {
            return Promise.reject({ details: [error], code: 500 })
        }

    },

    updateBookCategory: async (id, data) => {
        const db = require('../models')
        let validatedData = null
        try {
            validatedData = await validator.validate(db, data, {
                code: ['string'],
                image_url: ['required', 'string'],
            })

    
        } catch (error) {
            return Promise.reject({ details: error, code: 422 })
        }

        try {
            const result = await updateManager(id, validatedData)
            return result
        } catch (error) {
            console.log(error)
            return Promise.reject({ details: [error], code: 500 })
        }
    },

    deleteBookCategory: async (id) => {
        return deleteManager(id)
    }
};