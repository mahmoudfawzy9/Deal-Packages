const storage = require("../helpers/storage.js");

module.exports = {
    transform (artifact) {
        return new Promise(async (resolve, reject) => {
            if (artifact != null) {
                if (artifact.hasOwnProperty('url'))
                    artifact['url'] = await storage.getFileUrl(artifact['url'])
                if (artifact.hasOwnProperty('createdAt'))
                    !artifact['createdAt'].val ?
                        artifact['createdAt'] = new Date(artifact['createdAt']).getTime() :
                        artifact['createdAt'] = new Date().getTime();
                if (artifact.hasOwnProperty('updatedAt'))
                    !artifact['updatedAt'].val ?
                        artifact['updatedAt'] = new Date(artifact['updatedAt']).getTime() :
                        artifact['updatedAt'] = new Date().getTime();
                if (artifact.hasOwnProperty('isDeleted'))
                    artifact['isDeleted'] = artifact['isDeleted'] === 1;
            }
            resolve(artifact)
        })
    }
};
