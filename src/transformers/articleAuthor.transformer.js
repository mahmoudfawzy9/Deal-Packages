
module.exports = {
    transform(articleAuthor) {
        return new Promise(async (resolve, reject) => {
            if (articleAuthor != null) {
                if (articleAuthor.hasOwnProperty('createdAt')) {
                    !articleAuthor['createdAt'].val ?
                        articleAuthor['createdAt'] = new Date(articleAuthor['createdAt']).getTime() :
                        articleAuthor['createdAt'] = new Date().getTime();
                }
                if (articleAuthor.hasOwnProperty('updatedAt')) {
                    !articleAuthor['updatedAt'].val ?
                        articleAuthor['updatedAt'] = new Date(articleAuthor['updatedAt']).getTime() :
                        articleAuthor['updatedAt'] = new Date().getTime();
                }
                if (articleAuthor.hasOwnProperty('isDeleted')) {
                    articleAuthor['isDeleted'] = articleAuthor['isDeleted'] === 1;
                }
            }
            resolve(articleAuthor)
        })
    }
}