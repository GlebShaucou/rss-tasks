'use strict';

const { ComponentsConstants } = require('../constants');

function Item(text) {
    const li = document.createElement('li');
    li.classList.add(ComponentsConstants.DEFAULT_ITEM_CLASS);
    li.innerText = text;

    return li;
};

module.exports = Item;