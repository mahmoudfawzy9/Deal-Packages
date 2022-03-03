const db = require("../models")
const queryBuilder = require('deal-package-query-builder')
const Author = db.author

module.exports = {

    createManager: data => {
        return Author.create(data)

    },
    browseManager: params => {
        return Author.findAndCountAll(queryBuilder.browse(db, Author, params))
    },
    viewManager: (id, params) => {
        return Author.findByPk(id, queryBuilder.view(db, Author, id, params))
    },
    updateManager: (id, data) => {
        data['updated_at'] = getUpdatedAt()
        return Author.update(data, { where: { id } })
    },
    deleteManager: (id) => {
        return Author.update({
            is_deleted: 1,
            updated_at: getUpdatedAt(),
        }, { where: { id } })
    },
    activateManager: (id)=>{
        return Author.update({
            is_deleted: 0,
            updated_at: getUpdatedAt(),
        }, { where: { id } })
    }
}

function getUpdatedAt() {
    return `${[new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('-')} ${[new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].join(':')}`
}