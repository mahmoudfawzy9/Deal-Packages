
const db = require("../models");
const queryBuilder = require("kidstar-package-query-builder");
const Artifact = db.artifact;

module.exports = {
    browseManager: (params) => {
        return Artifact.findAndCountAll(queryBuilder.browse(db, Artifact, params))
    },

    viewManager: (id, params) => {
        return Artifact.findByPk(id, queryBuilder.view(db, Artifact, id, params));
    },

    createManager: (data) => {
        return Artifact.create(data);
    },

    updateManager: (id, data) => {
        data['updated_at'] = `${[new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()].join('-')} ${[new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].join(':')}`
        return Artifact.update(data, { where: { id: id } })
    },

    deleteManager: (id) => {
        return db.artifact.update({
            is_deleted: 1,
            updated_at: `${[new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()].join('-')} ${[new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].join(':')}`
        }, { where: { id: id } })
    }
};