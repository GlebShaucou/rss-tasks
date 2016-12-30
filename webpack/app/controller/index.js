'use strict';

const {
    ComponentsConstants,
    ControllerConstants
} = require('../constants');
const Utils = require('../utils/util');

const itemClassName = `.${ComponentsConstants.DEFAULT_ITEM_CLASS}`;
const selectedClassName = ComponentsConstants.SELECTED_CLASS;
let currentIndex = ControllerConstants.DEFAULT_SELECTED_INDEX;

function getItem(number) {
    const items = document.querySelectorAll(itemClassName);
    return items[number];
}

function navigateTo(direction) {
    const item = getItem(currentIndex);

    currentIndex = direction === ControllerConstants.FORWARD
        ? Utils.circularIncrement(currentIndex, ControllerConstants.MENU_LENGTH)
        : Utils.circularDecrement(currentIndex, ControllerConstants.MENU_LENGTH);

    const nextItem = getItem(currentIndex);

    item.classList.remove(selectedClassName);
    nextItem.classList.add(selectedClassName);
}

function initialize() {
    const item = getItem(currentIndex);
    item && item.classList.add(selectedClassName);

    window.addEventListener('keydown', (e) => {
        switch (e.code) {
            case 'ArrowRight':
                forward();
                break;
            case 'ArrowLeft':
                backward();
                break;
            default:
                return;
        }
    });
};

function forward() {
    navigateTo(ControllerConstants.FORWARD);
};

function backward() {
    navigateTo(ControllerConstants.BACKWARD);
};

module.exports = {
    initialize,
    forward,
    backward
};
