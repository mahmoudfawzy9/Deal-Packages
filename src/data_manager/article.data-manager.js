
const db = require("../models");
const queryBuilder = require("deal-package-query-builder");
const Article = db.article;
const ArticleCategory = db.article_category;
const ArticleAuthor = db.article_author;

module.exports = {
    browseManager: (params) => {
        let options = queryBuilder.browse(db, Article, params)
        return Article.findAndCountAll(options)
    },

    viewManager: (id, params) => {
        return Article.findByPk(id, queryBuilder.view(db, Article, id, params));
    },

    createManager: (data) => {
        return new Promise(async (resolve, reject) => {
            const t = await db.sequelize.transaction();
            try {
                const article = await Article.create(data, { transaction: t });
                if (data['book_categories']) {
                    let articleCategories = [];
                    data['book_categories'].forEach(category => {
                        articleCategories.push({ article_id: article.id, category_id: category.id })
                    })
                    await ArticleCategory.bulkCreate(articleCategories, { transaction: t });
                    await t.commit();
                    resolve(Article.findByPk(article.id, queryBuilder.view(db, Article, article.id, { with: 'book_category' })))
                } else {
                    await t.commit();
                }
                resolve(article);
            } catch (error) {
                await t.rollback();
                reject(error);
            }
        });
    },

    updateManager: (id, data) => {
        return new Promise(async (resolve, reject) => {
            const t = await db.sequelize.transaction();
            try {
                // Update Article Data
                data['updated_at'] = `${[new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('-')} ${[new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].join(':')}`
                const result = await Article.update(data, { where: { id: id }, transaction: t })
                if (data['book_categories']) {
                    const Op = db.Sequelize.Op;
                    const oldArticleCategories = await ArticleCategory.findAll({ where: { article_id: { [Op.eq]: id } } })
                    // Delete All Old Article Categories
                    for (const category of oldArticleCategories) {
                        await ArticleCategory.destroy({
                            where: {
                                id: category.toJSON().id
                            },
                            transaction: t
                        })
                    }
                    // Add New Article Categories
                    let articleCategories = [];
                    data['book_categories'].forEach(category => {
                        articleCategories.push({ article_id: id, category_id: category.id })
                    })
                    await ArticleCategory.bulkCreate(articleCategories, { transaction: t });
                }
                await t.commit();
                resolve(result)
            } catch (error) {
                await t.rollback();
                reject(error);
            }
        });
    },

    deleteManager: (id) => {
        return db.article.update({
            is_deleted: 1,
            updated_at: `${[new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('-')} ${[new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].join(':')}`
        }, { where: { id: id } })
    },

    assignCategoryManager: (data) => {
        return ArticleCategory.create(data);
    },

    unAssignCategoryManager: (id) => {
        return ArticleCategory.destroy({ where: { id: id } });
    },

    addAuthorManager: (id, data) => {
        const articleAuthorList = [];
        data.forEach(author => {
            articleAuthorList.push({
                article_id: author.author_id,
                article_id: id
            });
        });
        return ArticleAuthor.bulkCreate(articleAuthorList);
    },

    listAuthorManager: (id) => {
        return ArticleAuthor.findAndCountAll({ where: { article_id: id }, raw: true });
    },

    updateAuthorsManager: async (id, data) => {
        const articleAuthorList = [];
        data.forEach(author => {
            articleAuthorList.push({
                author_id: author.author_id,
                article_id: id
            });
        });

        const transaction = await db.sequelize.transaction();
        try {
            const removeAuthors = await ArticleAuthor.destroy({ where: { article_id: id }, transaction });
            const result = await ArticleAuthor.bulkCreate(articleAuthorList, { transaction });
            await transaction.commit();

            return result;
        } catch (error) {
            await transaction.rollback();
            Promise.reject(error);
        }
    }
}