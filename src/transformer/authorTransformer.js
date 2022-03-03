module.exports = {
    transform: author => {

        if (author) {
            if (author.hasOwnProperty('createdAt'))
                author['createdAt'] = author['createdAt'].val === 'CURRENT_TIMESTAMP' ?
                    new Date().getTime() : new Date(author['createdAt']).getTime()
            if (author.hasOwnProperty('updatedAt'))
                author['updatedAt'] = author['updatedAt'].val === 'CURRENT_TIMESTAMP' ?
                    new Date().getTime() : new Date(author['updatedAt']).getTime()
            if (author.hasOwnProperty('isDeleted'))
                author['isDeleted'] = author['isDeleted'] === 1

        }
        return author
    }

}