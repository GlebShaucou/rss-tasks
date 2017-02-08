'use strict';

const ItemsList = require('./items_list');
const { ComponentsConstants } = require('../constants/index.js'); // nested destructuring

function Container() {
    const container = document.createElement('div');
    const itemsList = new ItemsList();

    container.classList.add(...ComponentsConstants.DEFAULT_CONTAINER_CLASSES);
    container.appendChild(itemsList);

    return container;
};

module.exports = Container;
