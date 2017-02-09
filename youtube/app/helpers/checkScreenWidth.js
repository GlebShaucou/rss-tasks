'use strict';

import { StyleConstants as StyleConstants } from '../constants/constants.js';

function checkScreenWidth() {
    if (window.screen.width <= 1024) {
        return StyleConstants.ANDROID_PAGE_WIDTH;
    } else {
        return StyleConstants.PC_PAGE_WIDTH;
    }
}

export { checkScreenWidth as checkScreenWidth };