var q = require('q');

exports.parsePolyQuery = function(body) {
    return q.promise(function(resolve) {
        var items = JSON.parse(body) || [];
        return resolve(items);
    });
}

exports.parseMonoQuery = function(body) {
    return q.promise(function(resolve) {
        exports.parsePolyQuery(body)
            .then(function(items) {
                var item = (items.length > 0) ? items[0] : null;
                return resolve(item);
            });
    });
}

// response[0]: the response
// response[1]: the body
// response[2]: the error
exports.parseResponse = function(response) {
    return q.promise(function(resolve, reject) {
        if (!response) {
            return reject(new Error('Invalid response format'));
        }
        if (response[2]) {
            return reject(response[2]);
        }
        return resolve(response);
    });
}

exports.parseDelete = function(response) {
    return q.promise(function(resolve, reject) {
        switch (response[0].statusCode) {
            case 204:
                return resolve(response[1]);
            case 404:
                return reject(new Error('No item with the given id was found.'));
            case 500:
                return reject(new Error('The item could not be removed.'));
            default:
                return reject(new Error('Not a valid response code.'));
        }
    });
}

exports.parsePost = function(response) {
    return q.promise(function(resolve, reject) {
        switch(response[0].statusCode) {
            case 200:
                return resolve(response[1]);
            case 400:
                return reject(new Error('The JSON object in the request was omitted.'));
            case 500:
                return reject(new Error('The item could not be saved.'));
            default:
                return reject(new Error('Not a valid response code.'));
        }
    });
}

exports.parsePut = function(response) {
    return q.promise(function(resolve, reject) {
        switch(response[0].statusCode) {
            case 204:
                return resolve(response[1]);
            case 400:
                return reject(new Error('The JSON object in the request was omitted.'));
            case 500:
                return reject(new Error('The item could not be saved.'));
            default:
                return reject(new Error('Not a valid response code.'));
        }
    });
}

exports.parseGet = function(response) {
    return q.promise(function(resolve, reject) {
        switch(response[0].statusCode) {
            case 200:
                return resolve(response[1]);
            case 404:
                return reject(new Error('No item with the given id was found.'));
            case 500:
                return reject(new Error('The item/items could not be fetched.'));
            default:
                return reject(new Error('Not a valid response code.'));
        }
    });
}
