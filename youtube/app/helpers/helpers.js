import { StyleConstants } from '../constants/constants.js';

function correctResultListWidth() {
    let videosList = document.querySelector("#results-list");
    let listWidth = videosList.style.width;

    if (!listWidth) {
        listWidth = 5440;
        videosList.style.width = listWidth + 'px';
    } else {
        listWidth = +listWidth.slice(0, -2);
        listWidth = listWidth + 5100;
        videosList.style.width = listWidth + 'px';
    }
}

export { correctResultListWidth };