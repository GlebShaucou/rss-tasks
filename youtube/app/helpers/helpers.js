'use strict';

import { StyleConstants as StyleConstants } from '../constants/constants.js';

function correctResultListWidth() {
    let videosList = document.querySelector("#results-list");
    let listWidth = videosList.style.width;

    if (!listWidth) {
        listWidth = StyleConstants.INITIAL_RESULT_LIST_WIDTH;
        videosList.style.width = listWidth + 'px';
    } else {
        listWidth = +listWidth.slice(0, -2);
        listWidth = listWidth + StyleConstants.ADDITIONAL_RESULT_LIST_WIDTH;
        videosList.style.width = listWidth + 'px';
    }
}

export { correctResultListWidth as correctResultListWidth };