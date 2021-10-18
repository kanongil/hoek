'use strict';

const internals = {};


// Somewhat mirrors https://nodejs.org/api/timers.html#timers_timerspromises_settimeout_delay_value_options

module.exports = function (timeout, returnValue, options) {

    if (typeof timeout !== 'number' && timeout !== undefined) {
        throw new TypeError('Timeout must be a number');
    }

    return new Promise((resolve, reject) => {

        const signal = options?.signal;

        if (signal?.aborted === true) {
            reject(new internals.AbortError());
            return;
        }

        const timer = setTimeout(resolve, timeout, returnValue);

        signal?.addEventListener('abort', () => {

            clearTimeout(timer);
            reject(new internals.AbortError());
        }, { once: true });
    });
};


internals.AbortError = class extends Error {

    constructor() {

        super('The operation was aborted');

        this.code = 'ABORT_ERR';
        this.name = 'AbortError';
    }
};
