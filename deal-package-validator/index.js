"use strict"
const axios = require('axios');

function snakeToCamel(s){
    return s.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();});
}

function pushError(key, error_message, errors) {
    errors.push({
        field: snakeToCamel(key),
        message: error_message.replace(key, snakeToCamel(key))
    })
    return errors;
}

function validateRequired(data, key, result) {
    if (data.hasOwnProperty(key)) {
        result.success[key] = data[key];
    } else {
        result.errors = pushError(key, `Field is required`, result.errors)
    }
    return result;
}

function validateEmail(data, key, result) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(data[key]).toLowerCase())) {
        result.success[key] = data[key];
    } else {
        result.errors = pushError(key, `Please, enter a valid email`, result.errors)
    }
    return result;
}

function validateType(data, key, type, result) {
    if (typeof data[key] === type) {
        result.success[key] = data[key];
    } else {
        result.errors = pushError(key, `Field must be a ${type}`, result.errors)
    }
    return result;
}

function validateExisting(db, data, key, validator, result) {
    return new Promise((resolve, reject) => {
        if (validator.exists_in['url']) {
            axios.get(validator.exists_in['url'])
                .then((response) => {
                    if (response.data.data.length === 0) {
                        result.errors = pushError(key, `${key} entered does not exist`, result.errors)
                    } else {
                        result.success[key] = data[key];
                    }
                    resolve(result)
                })
                .catch((error) => {
                    result.errors = pushError(key, `${key} entered does not exist`, result.errors)
                    resolve(result)
                })
        } else {
            db[validator.exists_in].findByPk(data[key]).then(response => {
                if (response === null) {
                    result.errors = pushError(key, `${key} entered does not exist`, result.errors)
                } else {
                    result.success[key] = data[key];
                }
                resolve(result)
            }).catch(() => {
                result.errors = pushError(key, `${key} entered does not exist`, result.errors)
                resolve(result)
            });
        }
    });
}

function validateUnique(db, data, key, validator, result, record_id) {
    return new Promise((resolve, reject) => {
        if (validator.unique_in['url']) {
            axios.get(validator.unique_in['url'])
                .then((response) => {
                    if (response.data.data.length > 0) {
                        result.errors = pushError(key, `${key} already exists`, result.errors)
                    } else {
                        result.success[key] = data[key];
                    }
                    resolve(result)
                })
                .catch((error) => {
                    result.errors = pushError(key, `${key} already exists`, result.errors)
                    resolve(result)
                })
        } else {
            db[validator.unique_in].findAll({where: {[key]: data[key]}}).then(response => {
                if (response.length > 0 && record_id !== response[0].id) {
                    result.errors = pushError(key, `${key} already exists`, result.errors)
                } else {
                    result.success[key] = data[key];
                }
                resolve(result)
            })
        }
    });
}

function validateMax(data, key, maximum, result) {
    return new Promise((resolve, reject) => {
        if (data[key] > maximum) {
            result.errors = pushError(key, `Field cannot be more than ${maximum}`, result.errors)
        } else {
            result.success[key] = data[key];
        }
        resolve(result)
    });
}

function fetchFields(db, data, fields, record_id, result = {success: {}, errors: []}, index = 0) {
    return new Promise((resolve, reject) => {
        if (index < Object.keys(fields).length) {
            let fieldName = Object.keys(fields)[index];
            let validators = fields[fieldName];
            validateField(db, fieldName, validators, data, result, record_id).then(result => {
                index++;
                fetchFields(db, data, fields, record_id, result, index).then(result => {
                    resolve(result);
                }).catch(errors => {
                    reject(errors);
                });
            })
        } else {
            if (Object.keys(result.errors).length === 0) {
                resolve(result.success);
            } else {
                reject(result.errors);
            }
        }
    });
}

function validateField (db, fieldName, validators, data, result, record_id, validator_index = 0) {
    return new Promise((resolve, reject) => {
        if (validator_index < validators.length) {
            if (typeof validators[validator_index] === 'string') {
                if (validators[validator_index] === 'required') {
                    result = validateRequired(data, fieldName, result)
                } else if (data[fieldName] !== undefined &&
                    (validators[validator_index] === 'string'
                        || validators[validator_index] === 'number'
                        || validators[validator_index] === 'boolean'
                        || validators[validator_index] === 'object')) {
                    result = validateType(data, fieldName, validators[validator_index], result)
                } else if (data[fieldName] !== undefined && validators[validator_index] === 'email') {
                    result = validateEmail(data, fieldName, result)
                }

                validator_index++;
                validateField(db, fieldName, validators, data, result, record_id, validator_index).then(result => {
                    resolve(result);
                })
            } else if (typeof validators[validator_index] === 'object') {
                if (data[fieldName] !== undefined && validators[validator_index].exists_in) {
                    validateExisting(db, data, fieldName, validators[validator_index], result).then(result => {
                        validator_index++;
                        validateField(db, fieldName, validators, data, result, record_id, validator_index).then(result => {
                            resolve(result);
                        })
                    });
                } else if (data[fieldName] !== undefined && validators[validator_index].unique_in) {
                    validateUnique(db, data, fieldName, validators[validator_index], result, record_id).then(result => {
                        validator_index++;
                        validateField(db, fieldName, validators, data, result, record_id, validator_index).then(result => {
                            resolve(result);
                        })
                    });
                } else if (data[fieldName] !== undefined && validators[validator_index].max) {
                    validateMax(data, fieldName, validators[validator_index].max, result).then(result => {
                        validator_index++;
                        validateField(db, fieldName, validators, data, result, record_id, validator_index).then(result => {
                            resolve(result);
                        })
                    });
                } else {
                    validator_index++;
                    validateField(db, fieldName, validators, data, result, record_id, validator_index).then(result => {
                        resolve(result);
                    })
                }
            }
        } else {
            resolve(result);
        }
    });
}

module.exports = {
    validate: (db, data, fields, record_id = null) => {
        return new Promise((resolve, reject) => {
            fetchFields(db, data, fields, record_id).then(result => {
                resolve(result)
            }).catch(errors => {
                reject(errors)
            })
        });
    }
}