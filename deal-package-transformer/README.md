# DEAL Transformer
This package is to transform api requests and responses from camelCase to snake_case and vice versa.

It is also allows you to add custom transformation if needed.
## Installation
```sh
$ npm i git+ssh://git@gitlab.deal.com:deal/deal-package-transformer.git
```

## Usage

```js
const {transformCollection, transformSingle, transformSubmission, transformErrors} = require('deal-package-transformer');
const transformer = require(`../transformers/custom.transformer`);
let input_data = [{
    key_name_one: 'value',
    key_name_two: {
        key_name_two_one: 'value',
        key_name_two_two: 'value'
    },
}];
let output = transformCollection(transformer, input_data);
```

###output
```js
[{
    keyNameOne: 'value',
    keyNameTwo: {
        keyNameTwoOne: 'value',
        keyNameTwoTwo: 'value'
    },
}]
```

## Methods

| Method | Usage                                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| transformSingle       | To transform a single object.                                        |
| transformCollection   | To transform an array of objects.                              |
| transformSubmission   | To transform submission request from camelCase to snake_case.  |
| transformErrors       | To transform error object from snake_case to camelCase.             |
