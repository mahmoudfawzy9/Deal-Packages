const validator = require('kidstar-package-validator')
const db = require('../models')

/*errorDetails = {field:'<fieldtitle>' message:'<errorMessage>'} */
function validationException(errorDetails) {
    this.details = errorDetails.errors
    this.code = errorDetails.code
}

const createAuthorValidation = data => {
    if (data.gender != 'female' && data.gender != 'male') {
        throw new validationException({ errors: 'gender can be only female or male', code: 422 })
    }

    return validator.validate(db, data, {
        first_name: ['required', 'string'],
        last_name: ['required', 'string'],
        gender: ['required', 'string'],
        author_type_id: ['required', 'integer', { 'exists_in': 'author_type' }]
    })
}

const updateAuthorValidation = data => {
    if (data.gender != 'female' && data.gender != 'male') {
        throw new validationException({ errors: 'gender can be only female or male', code: 422 })
    }
    return validator.validate(db, data, {
        first_name: ['string'],
        last_name: ['string'],
        gender: ['string'],
        author_type_id: ['integer', { 'exists_in': 'author_type' }]
    })
}

module.exports = {
    validationException, createAuthorValidation, updateAuthorValidation
}