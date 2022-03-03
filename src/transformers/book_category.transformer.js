const { transformSingle } = require('deal-package-transformer');
const storage = require("../helpers/storage.js");

module.exports = {
    transform(bookCategory) {
        return new Promise(async (resolve, reject) => {
            if (bookCategory != null) {
                if (bookCategory.hasOwnProperty('createdAt'))
                    !bookCategory['createdAt'].val ?
                        bookCategory['createdAt'] = new Date(bookCategory['createdAt']).getTime() :
                        bookCategory['createdAt'] = new Date().getTime();
                if (bookCategory.hasOwnProperty('updatedAt'))
                    !bookCategory['updatedAt'].val ?
                        bookCategory['updatedAt'] = new Date(bookCategory['updatedAt']).getTime() :
                        bookCategory['updatedAt'] = new Date().getTime();
                if (bookCategory.hasOwnProperty('isDeleted'))
                    bookCategory['isDeleted'] = bookCategory['isDeleted'] === 1;

                if (bookCategory.hasOwnProperty('articleCategory')) {
                    bookCategory['articleCategory'].toJSON = () => { return bookCategory['articleCategory']; }
                    bookCategory['articleCategory'] = transformSingle(require(`./article_category.transformer`), bookCategory['articleCategory'])
                }


                if (bookCategory.hasOwnProperty('imageUrl') && bookCategory['imageUrl'] != null)
                    bookCategory['imageUrl'] = await storage.getFileUrl(bookCategory['imageUrl'])
            }
            resolve(bookCategory)
        })
    }
}
