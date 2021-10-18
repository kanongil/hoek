'use strict';

const Reach = require('./reach');


const internals = {};


module.exports = function (obj, template, options) {

    return template.replace(/{([^{}]+)}/g, ($0, chain) => {

        return Reach(obj, chain, options) ?? '';
    });
};
