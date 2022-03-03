const { browseManager, viewManager, createManager, updateManager, deleteManager, assignCategoryManager, unAssignCategoryManager,
    addAuthorManager, listAuthorManager,updateAuthorsManager } = require('../data_manager/article.data-manager');
const validator = require("kidstar-package-validator");

module.exports = {
    browseArticles: (params) => {
        return browseManager(params);
    },

    viewArticle: (id, params) => {
        return viewManager(id, params);
    },

    createArticle: (data) => {
        return new Promise((resolve, reject) => {
            if (data['book_categories'] && typeof data['book_categories'] === 'string') data['book_categories'] = JSON.parse(data['book_categories']);
            const db = require("../models");
            console.log(data);
            console.log("-----------");
            validator.validate(db, data, {
                author_id: ['required', { 'exists_in': { url: `${process.env.SERVICE_AUTHOR_URL}/api/json/authors?filter=[{"operator":"eq","key":"id","value":${data['author_id']}}]`, key: 'id' } }],
                title: ['required', 'string'],
                subtitle: ['required', 'string'],
                body: ['required', 'string'],
                comment: ['required', 'string'],
                image_url: ['required', 'string'],
                lang_id: ['required', { 'exists_in': { url: `${process.env.SERVICE_LANGUAGE_URL}/api/json/languages?filter=[{"operator":"eq","key":"id","value":${data['lang_id']}}]`, key: 'id' } }],
                book_categories: ['object'],
            }).then(validatedData => {
                console.log(validatedData);
                createManager(validatedData).then(article => {
                    resolve(article)
                }).catch(error => {
                    reject({ details: [error], code: 500 })
                })
            }).catch(errors => {
                console.log(errors)
                reject({ details: errors, code: 422 })
            })
        })
    },

    updateArticle: async (id, data) => {
        return new Promise((resolve, reject) => {
            if (data['book_categories'] && typeof data['book_categories'] === 'string') data['book_categories'] = JSON.parse(data['book_categories']);
            const db = require("../models");
            validator.validate(db, data, {
                author_id: [{ 'exists_in': { url: `${process.env.SERVICE_AUTHOR_URL}/api/json/authors?filter=[{"operator":"eq","key":"id","value":${data['publisher_id']}}]`, key: 'id' } }],
                title: ['string'],
                subtitle: ['string'],
                body: ['string'],
                comment: ['string'],
                image_url: ['string'],
                lang_id: [{ 'exists_in': { url: `${process.env.SERVICE_LANGUAGE_URL}/api/json/languages?filter=[{"operator":"eq","key":"id","value":${data['lang_id']}}]`, key: 'id' } }],
                book_categories: ['object'],
            }, parseInt(id)).then(validatedData => {
                updateManager(id, validatedData).then(result => {
                    resolve(result)
                }).catch(error => {
                    reject({ details: [error], code: 500 })
                })
            }).catch(errors => {
                reject({ details: errors, code: 422 })
            })
        })
    },

    deleteArticle: async (id) => {
        return deleteManager(id)
    },

    assignCategory: (data) => {
        return new Promise((resolve, reject) => {
            const db = require("../models");
            validator.validate(db, data, {
                article_id: ['required', 'integer', { 'exists_in': 'article' }],
                category_id: ['required', 'integer', { 'exists_in': 'book_category' }]
            }).then(validatedData => {
                assignCategoryManager(validatedData).then(result => {
                    resolve(result)
                }).catch(error => {
                    reject({ details: [error], code: 500 })
                })
            }).catch(errors => {
                reject({ details: errors, code: 422 })
            })
        })
    },

    unAssignCategory: (id) => {
        return unAssignCategoryManager(id);
    },

    addAuthorService: async (id, data) => {
        let validatedData = [];
        const db = require("../models");
        try {
            for (const author of data) {
                validatedData.push(await validator.validate(db, author, {
                    author_id: ['required', 'integer', {
                        'exists_in': {
                            url: `${process.env.SERVICE_AUTHOR_URL}/api/json/authors/${author.author_id}`
                        }
                    }],
                    author_type_id: ['required', 'integer']
                }))
            }
        } catch (error) {
            return Promise.reject({ details: error, code: 422 })
        }

        try {
            const result = await addAuthorManager(id, validatedData);
            return result;
        } catch (error) {
            return Promise.reject({ details: [error], code: 500 })
        }
    },

    listauthorService: (id) => {
        return listAuthorManager(id);
    },

    updateAuthorsService: async (id, data) => {
        let validatedData = [];
        const db = require("../models");
        try {
            for (const author of data) {
                validatedData.push(await validator.validate(db, author, {
                    author_id: ['required', 'integer', {
                        'exists_in': {
                            url: `${process.env.SERVICE_AUTHOR_URL}/api/json/authors/${author.author_id}`
                        }
                    }],
                    author_type_id: ['required', 'integer']
                }))
            }
        } catch (error) {
            return Promise.reject({ details: error, code: 422 })
        }

        try {
            const result = await updateAuthorsManager(id,validatedData)
            return result
        } catch (error) {
            return Promise.reject({ details: [error], code: 500 })
        }

    }
};