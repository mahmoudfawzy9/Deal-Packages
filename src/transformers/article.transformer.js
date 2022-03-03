const {transformCollection, transformSingle} = require('deal-package-transformer');
const storage = require("../helpers/storage.js");

module.exports = {
    transform (article) {
        return new Promise(async (resolve, reject) => {
            if (article != null) {
                if (article.hasOwnProperty('imageUrl'))
                    article['imageUrl'] = await storage.getFileUrl(article['imageUrl'])
                if (article.hasOwnProperty('createdAt'))
                    !article['createdAt'].val ?
                        article['createdAt'] = new Date(article['createdAt']).getTime() :
                        article['createdAt'] = new Date().getTime();
                if (article.hasOwnProperty('updatedAt'))
                    !article['updatedAt'].val ?
                        article['updatedAt'] = new Date(article['updatedAt']).getTime() :
                        article['updatedAt'] = new Date().getTime();
                if (article.hasOwnProperty('isDeleted'))
                    article['isDeleted'] = article['isDeleted'] === 1;

                if (article.hasOwnProperty('bookCategories')) {
                    for (let i = 0; i < article['bookCategories'].length; i++) {
                        article['bookCategories'][i].toJSON = () => {
                            return article['bookCategories'][i];
                        }
                    }
                    article['bookCategories'] = await transformCollection(require(`./book_category.transformer`), article['bookCategories'])
                }
                if (article.hasOwnProperty('articleCategories')) {
                    for (let i = 0; i < article['articleCategories'].length; i++) {
                        article['articleCategories'][i].toJSON = () => {
                            return article['articleCategories'][i];
                        }
                    }
                    article['articleCategories'] = await transformCollection(require(`./article_category.transformer`), article['articleCategories'])
                }
            }
            resolve(article)
        })
    }
}
