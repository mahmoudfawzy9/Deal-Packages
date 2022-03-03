"use strict"

const camelcaseKeys = require('camelcase-keys');

function camelToSnake(string) {
    return string.replace(/[\w]([A-Z])/g, function(m) {
        return m[0] + "_" + m[1];
    }).toLowerCase();
}

module.exports = {
    async transformSingle(module, data) {
        if(data != null) {
            return await module.transform(camelcaseKeys(data.constructor === ({}).constructor ? data : data.toJSON(), {deep: true}));
        }
        return data;
    },

    async transformCollection(module, data) {
        if(data != null) {
            for (let i = 0; i < data.length; i++) {
                data[i] = await module.transform(camelcaseKeys(data[i].constructor === ({}).constructor ? data[i] : data[i].toJSON(), {deep: true}));
            }
        }
        return data;
    },

    transformSubmission(data) {
        let result = {};
        Object.keys(data).forEach(key => {
            result[camelToSnake(key)] = data[key];
        });
        return result;
    },

    transformErrors(data) {
        return camelcaseKeys(data, {deep: true})
    }
};