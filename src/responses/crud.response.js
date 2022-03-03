const HTTP_STATUS_CODES = {
    'CODE_200' : 'OK',
    'CODE_201' : 'Created',
    'CODE_202' : 'Accepted',
    'CODE_203' : 'Non-Authoritative Information',
    'CODE_204' : 'No Content',
    'CODE_205' : 'Reset Content',
    'CODE_206' : 'Partial Content',
    'CODE_300' : 'Multiple Choices',
    'CODE_301' : 'Moved Permanently',
    'CODE_302' : 'Found',
    'CODE_303' : 'See Other',
    'CODE_304' : 'Not Modified',
    'CODE_305' : 'Use Proxy',
    'CODE_307' : 'Temporary Redirect',
    'CODE_400' : 'Bad Request',
    'CODE_401' : 'Unauthorized',
    'CODE_402' : 'Payment Required',
    'CODE_403' : 'Forbidden',
    'CODE_404' : 'Not Found',
    'CODE_405' : 'Method Not Allowed',
    'CODE_406' : 'Not Acceptable',
    'CODE_407' : 'Proxy Authentication Required',
    'CODE_408' : 'Request Timeout',
    'CODE_409' : 'Conflict',
    'CODE_410' : 'Gone',
    'CODE_411' : 'Length Required',
    'CODE_412' : 'Precondition Failed',
    'CODE_413' : 'Request Entity Too Large',
    'CODE_414' : 'Request-URI Too Long',
    'CODE_415' : 'Unsupported Media Type',
    'CODE_416' : 'Requested Range Not Satisfiable',
    'CODE_417' : 'Expectation Failed',
    'CODE_422' : 'Unprocessable Entity',
    'CODE_500' : 'Internal Server Error',
    'CODE_501' : 'Not Implemented',
    'CODE_502' : 'Bad Gateway',
    'CODE_503' : 'Service Unavailable',
    'CODE_504' : 'Gateway Timeout',
    'CODE_505' : 'HTTP Version Not Supported'
};

module.exports = {
    browseRespond: (req, res, data, message = 'Data fetched successfully', status_code = 200) => {
        res.status(status_code).send({ message,
            data: data.rows,
            meta: {
                total_records: data.count,
                fetched_records: data.rows.length,
                total_pages: req.query.paginate?Math.ceil(data.count / req.query.paginate):1,
                current_page: req.query.page?parseInt(req.query.page):1,
                next: req.query.paginate?
                    parseInt(req.query.page)<Math.ceil(data.count / req.query.paginate)?
                        req.originalUrl.replace(`page=${req.query.page}`,`page=${parseInt(req.query.page)+1}`):null
                        :null,
                previous: req.query.paginate?
                    parseInt(req.query.page)>1?
                        req.originalUrl.replace(`page=${req.query.page}`,`page=${parseInt(req.query.page)-1}`):null
                    :null,
            }
        });
    },

    viewRespond: (res, data, message = 'Item fetched successfully', status_code = 200) => {
        res.status(status_code).send({ message, data });
    },

    createRespond: (res, data, message = 'Item created successfully', status_code = 200) => {
        res.status(status_code).send({ message, data });
    },

    updateRespond: (res, message = 'Item updated successfully', status_code = 200) => {
        res.status(status_code).send({ message });
    },

    deleteRespond: (res, message = 'Item deleted successfully', status_code = 200) => {
        res.status(status_code).send({ message });
    },

    errorRespond: (res, errors = [], status_code = 500) => {
        res.status(status_code).send({ message: HTTP_STATUS_CODES[`CODE_${status_code}`], errors });
    },
};