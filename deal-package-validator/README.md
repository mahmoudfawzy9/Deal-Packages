# Deal Validator
This package is to validate api requests.

It is based on [Sequlize](https://sequelize.org/) ORM.
## Installation
```sh
$ npm i git+ssh://git@gitlab.deal.com:deal/deal-package-validator.git
```

## Usage

```js
const validator = require("deal-package-validator")
const db = require("../models");

validator.validate(db, data, {
    data_key_name: ['required', 'string', {'unique_in': 'model_name'}],
    data_key_name2: ['required', 'integer', {'exists_in': 'model_name'}]
}).then(validatedData => {
    // Process the validated data here.
}).catch(errors => {
    // Through validation error exception here.
})
```

## Validators

| Validator | Usage                                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| required | To validate if key is available or not                                                                                |
| string   | To validate if the value is of type string |
| number   | To validate if the value is of type Integer                                                                                                                  |
| boolean  | To validate if the value is of type boolean `true/false`                                                                                                                 |
| object   | To validate if the value is of type object                                                                                                                  |
| email    | To validate if the value is in email format or not                                                                                                                  |
| { 'unique_in': 'model_name' }    | To validate if the value is unique in a specific resource or not.                                                                                                                |
| { 'exists_in': 'model_name' }    | To validate if the value exists in a specific resource or not.                                                                                                                |

## Updates

### V 1.1.0
* Added validation on unique values of fields in another services through api url.
* Added validation on existing values of fields in another services through api url.