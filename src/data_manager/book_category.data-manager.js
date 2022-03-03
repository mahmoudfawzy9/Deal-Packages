
const db = require("../models");
const queryBuilder = require("kidstar-package-query-builder");
const BookCategory = db.book_category;
const BookCategoryTranslation = db.book_category_translation

module.exports = {
    browseManager: (params) => {
        return BookCategory.findAndCountAll(queryBuilder.browse(db, BookCategory, params))
    },

    viewManager: (id, params) => {
        if (typeof params['with'] == 'string' && params['with'].length > 0) {
            params['with'] += ',book_category_translation'
        } else {
            params['with'] = 'book_category_translation'
        }
        return BookCategory.findByPk(id, queryBuilder.view(db, BookCategory, id, params));
    },

    createManager: async (data) => {
        const transaction = await db.sequelize.transaction()
        try {
            const bookCategory = await BookCategory.create(data, { transaction })
            const bookCategoryTranslationList = []
            data['book_category_translations'].forEach(element => {
                bookCategoryTranslationList.push({
                    book_category_id: bookCategory.id,
                    name: element.name,
                    language_id: element.language_id
                })
            })

            await BookCategoryTranslation.bulkCreate(bookCategoryTranslationList, { transaction })
            await transaction.commit()

            const result =
                await BookCategory.findByPk(bookCategory.id,
                    queryBuilder.view(db, BookCategory, bookCategory.id, { with: 'book_category_translation' }))
            return result
        } catch (error) {
            await transaction.rollback()
            return Promise.reject(error)
        }
    },

    updateManager: async (id, data) => {
        data['updated_at'] = getUpdatedAt()
        const transaction = await db.sequelize.transaction()

        try {
            const newBookCategoryTranslation = []
            for (const bookTranslation of data['book_category_translations']) {
                if (!bookTranslation.hasOwnProperty('id') || bookTranslation.id == 0) {//add new book category translation
                    newBookCategoryTranslation.push({
                        name: bookTranslation.name,
                        language_id: bookTranslation.language_id,
                        book_category_id: id
                    })
                }
                else {//updated existing book category translation
                    const checkExists =
                        await BookCategoryTranslation.findByPk(bookTranslation.id, queryBuilder.view(db, BookCategoryTranslation, bookTranslation.id, {}))
                    
                    if (checkExists['dataValues']['book_category_id'] != id) {
                        transaction.rollback()
                        return Promise.reject({
                            message: "validation_err", errors:
                                `bookCategoryTranslation with id=${bookTranslation.id} dosen't belong to bookCategory with id=${id}`
                        })
                    }
                    bookTranslation['updated_at'] = data['updated_at']
                    await BookCategoryTranslation.update(bookTranslation,
                        { transaction, where: { id: bookTranslation.id, book_category_id: id } })
                }
            }
            if (newBookCategoryTranslation.length > 0) {
                await BookCategoryTranslation.bulkCreate(newBookCategoryTranslation, { transaction })
            }
            const bookCategory = await BookCategory.update(data, { transaction, where: { id } })
            await transaction.commit()
            return bookCategory

        } catch (error) {
            await transaction.rollback()
            return Promise.reject(error)
        }
    },

    deleteManager: async (id) => {
        return BookCategory.update({
            is_deleted: 1,
            updated_at: getUpdatedAt()
        }, { where: { id } })
    }
};

function getUpdatedAt() {
    return `${[new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('-')} ${[new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].join(':')}`
}