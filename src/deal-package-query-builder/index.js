"use strict"

function appendSorting(options, params) {
    let sorters = [];
    Object.keys(params).forEach(key => {
        if (key === 'sortAsc') sorters.push([params[key], 'ASC'])
        else if (key === 'sortDesc') sorters.push([params[key], 'DESC'])
    })
    if (sorters.length>0) options['order'] = sorters
    return options;
}

function appendPagination(options, params) {
    if (params['paginate'] && params['page']) {
        options['limit'] = parseInt(params['paginate']);
        options['offset'] = params['page'] * parseInt(params['paginate']) - parseInt(params['paginate']);
    }
    return options;
}

function appendSorting(options, params) {
    let sorters = [];
    Object.keys(params).forEach(key => {
        if (key === 'sortAsc') sorters.push([params[key], 'ASC'])
        else if (key === 'sortDesc') sorters.push([params[key], 'DESC'])
    })
    if (sorters.length>0) options['order'] = sorters
    return options;
}

function appendPagination(options, params) {
    if (params['paginate'] && params['page']) {
        options['limit'] = parseInt(params['paginate']);
        options['offset'] = params['page'] * parseInt(params['paginate']) - parseInt(params['paginate']);
    }
    return options;
}

function appendFilters(db, options, params) {
    const Op = db.Sequelize.Op;
    let filters = {
        is_deleted: 0
    }
    if (params['filter']) {
        let queryFilters = JSON.parse(params['filter'].replace(/%22/g, '"').replace(/%20/g, ' '))
        queryFilters.forEach(queryFilter => {
            if (Object.keys(queryFilter).length === 2 ) {
                let subFilters = queryFilter[Object.keys(queryFilter)[0]];
                 let andFilters = queryFilter[Object.keys(queryFilter)[1]];
                 let   formattedSubFilters = [];
                subFilters.forEach(subFilter => {
                     andFilters.forEach(andFilter => {

                    // { id: { [Op.gt]: 10 } }
                    formattedSubFilters.push({
                        [subFilter['key']]: { [Op[subFilter['operator']]]: subFilter['value'] },
                        [andFilter['key']]: { [Op[andFilter['operator']]]: andFilter['value'] }
                    })
                   })
                })
                filters[Op[Object.keys(queryFilter)[0]]] = formattedSubFilters
            } else {
                // filters[queryFilter['key']] = { [Op[queryFilter['operator']]]: queryFilter['value'] }
                let subFilters = queryFilter[Object.keys(queryFilter)[0]];
                 let andFilters = queryFilter[Object.keys(queryFilter)[1]];
                 let   formattedSubFilters = [];
                subFilters.forEach(subFilter => {
                    // { id: { [Op.gt]: 10 } }
                    formattedSubFilters.push({
                        [subFilter['key']]: { [Op[subFilter['operator']]]: subFilter['value'] }
                    })
                   })
            
                filters[Op[Object.keys(queryFilter)[0]]] = formattedSubFilters
            }
        })
    }
    options['where'] = filters;
    return options;
}

function appendOnly(options, params) {
    if (params['only']) {
        let attributes = params['only'].split(',')
        attributes.forEach(attribute => {
            if(attribute.split('.').length === 1) {
                options['attributes']?
                    options['attributes'].push(attribute):options['attributes']=[attribute]
            }
        })
    }
    return options;
}

function appendWith(db, model, options, params) {
    if (params['with']) {
        let includes = params['with'].split(',')
        let paths = [];
        includes.forEach(include => {
            paths.push(include.split('.'))
        })
        options['include'] = arrangeIntoTree(db, paths, params);
    }
    return options;
}



function arrangeIntoTree(db, paths, params) {
    // Adapted from http://brandonclapp.com/arranging-an-array-of-flat-paths-into-a-json-tree-like-structure/
    let tree = [];
    for (let i = 0; i < paths.length; i++) {
        let path = paths[i];
        let currentLevel = tree;
        for (let j = 0; j < path.length; j++) {
            let part = path[j],
                existingPath = findWhere(currentLevel, 'name', part);
            if (existingPath) {
                currentLevel = existingPath.include;
            } else {
                let newPart = {
                    model: db[part],
                    required: false,
                    where: {is_deleted: 0},
                    include: [],
                }
                if (params['only']) {
                    let attributes = params['only'].split(',')
                    attributes.forEach(attribute => {
                        if(attribute.split('.').length > 1) {
                            let attributeName = attribute.split('.')[attribute.split('.').length-1],
                                modelName = attribute.split('.')[attribute.split('.').length-2]
                            if (part===modelName){
                                newPart['attributes']?
                                    newPart['attributes'].push(attributeName):newPart['attributes']=[attributeName]
                            }
                        }
                    })
                }

                // Append filters in sub-model
                const Op = db.Sequelize.Op;
                let filters = {
                    is_deleted: 0
                };
                if (params['filterKeys'] && params['filterValues']) {
                    let filterKeys = params['filterKeys'].split(','),
                        filterValues = params['filterValues'].split(',')
                    for (let i=0; i<filterKeys.length; i++) {
                        if(filterKeys[i].split('.').length > 1 && i < filterValues.length) {
                            let operator = 'like';
                            if (params['filterOperators']&&i<params['filterOperators'].split(',').length)
                                operator = params['filterOperators'].split(',')[i]
                            let keyName = filterKeys[i].split('.')[filterKeys[i].split('.').length-1],
                                modelName = filterKeys[i].split('.')[filterKeys[i].split('.').length-2]
                            if (part === modelName){
                                filters[keyName]= {[Op[operator]]: operator==='like'?`%${filterValues[i]}%`:filterValues[i]}
                            }
                        }
                    }
                }
                newPart['where'] = filters;

                currentLevel.push(newPart);
                currentLevel = newPart.include;
            }
        }
    }
    return tree;

    function findWhere(array, key, value) {
        let t = 0; // t is used as a counter
        while (t < array.length && array[t][key] !== value) { t++; } // find the index where the id is the as the aValue
        if (t < array.length) {
            return array[t]
        } else {
            return false;
        }
    }
}

module.exports = {
    browse: (db, model, params) => {
        let options = appendSorting({distinct: true}, params);
        options = appendFilters(db, options, params);
        options = appendWith(db, model, options, params);
        // options = appendAnd(db,model,options,params);
        options = appendPagination(options, params);
        options = appendOnly(options, params);
        return options
    },

    view: (db, model, id, params) => {
        let options = appendWith(db, model,{distinct: true, where: {is_deleted: 0}}, params);
        options = appendOnly(options, params);
        return options
    }
}