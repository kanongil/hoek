'use strict';

/* globals performance */


const internals = {};


module.exports = class {

    #ts;

    constructor() {

        this.reset();
    }

    reset() {

        this.#ts = performance.now();
    }

    elapsed() {

        return performance.now() - this.#ts;
    }
};
