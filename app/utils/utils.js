'use strict';

exports.extend = function(destination, source) {
    for (var prop in destination) {
        if (destination.hasOwnProperty(prop) && source.hasOwnProperty(prop) && source[prop] !== null) {
            destination[prop] = source[prop];
        }
    }

    return destination;
};
