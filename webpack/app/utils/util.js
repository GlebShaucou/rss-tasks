'use strict';

function circularIncrement(index, max) {
    return (index + 1) % max;
};

function circularDecrement(index, max) {
    return (index - 1 + max) % max;
};

module.exports = {
    circularIncrement,
    circularDecrement
};
