const { transformSingle } = require('deal-package-transformer');

module.exports = {
    transform(articleCategory) {
        if (articleCategory != null) {
            if (articleCategory.hasOwnProperty('createdAt'))
                !articleCategory['createdAt'].val ?
                    articleCategory['createdAt'] = new Date(articleCategory['createdAt']).getTime() :
                    articleCategory['createdAt'] = new Date().getTime();
            if (articleCategory.hasOwnProperty('updatedAt'))
                !articleCategory['updatedAt'].val ?
                    articleCategory['updatedAt'] = new Date(articleCategory['updatedAt']).getTime() :
                    articleCategory['updatedAt'] = new Date().getTime();
            if (articleCategory.hasOwnProperty('isDeleted'))
                articleCategory['isDeleted'] = articleCategory['isDeleted'] === 1;

            if (articleCategory.hasOwnProperty('bookCategory')) {
                articleCategory['bookCategory'].toJSON = () => { return articleCategory['bookCategory']; }
                articleCategory['bookCategory'] = transformSingle(require(`./book_category.transformer`), articleCategory['bookCategory'])
            }
        }
        return articleCategory
    }
};
