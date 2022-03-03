

const {browseManager, viewManager, createManager, updateManager, deleteManager} = require('../data_manager/artifact.data-manager');
const validator = require("deal-package-validator");
const axios = require('axios');

module.exports = {
    browseArtifact: (params) => {
        return browseManager(params);
    },

    viewArtifact: (id, params) => {
        return viewManager(id, params);
    },

    createArtifact: (data) => {
        return new Promise((resolve, reject) => {
            const db = require("../models");
            validator.validate(db, data, {
                name: ['required', 'string'],
                url: ['required', 'string'],
                platform: ['string'],
                article_id: ['required', 'number', {'exists_in': 'article'}],
            }).then(validatedData => {
                createManager(validatedData).then(artifact => {
                    resolve(artifact)
                }).catch(error => {
                    reject({details: [error], code: 500})
                })
            }).catch(errors => {
                reject({details: errors, code: 422})
            })
        })
    },

    updateArtifact: async (id, data) => {
        return new Promise((resolve, reject) => {
            const db = require("../models");
            validator.validate(db, data, {
                name: ['string'],
                platform: ['string'],
                url: ['string'],
                article_id: ['number', {'exists_in': 'article'}],
            }, parseInt(id)).then(validatedData => {
                updateManager(id, validatedData).then(result => {
                    resolve(result)
                }).catch(error => {
                    reject({details: [error], code: 500})
                })
            }).catch(errors => {
                reject({details: errors, code: 422})
            })
        })
    },

    deleteArtifact: async (id) => {
        return deleteManager(id)
    }
};