import { StyleConstants } from '../constants/constants.js';

function handleSwipeEnd(dataToProcess) {
    if (dataToProcess.posOfVideos > 0) {
        dataToProcess.videosList.style.left = '0';
        return;
    } 

    if (dataToProcess.movementDirection === 'right') {
        const paginationBar = document.querySelector('#pagination-bar');
        const CurrentPage = document.querySelector('.page-active');
        const NextPage = CurrentPage.nextSibling;
        let lastPageNum = +paginationBar.lastElementChild.textContent;
        let nextPageNum = +NextPage.textContent;
        
        if (nextPageNum === lastPageNum) {
            dataToProcess.requestData(dataToProcess.Tokens);
        }

        if (NextPage) {
            CurrentPage.classList.toggle('page-active');
            NextPage.classList.toggle('page-active');
        }

        dataToProcess.resultContainerPos -= StyleConstants.PAGE_WIDTH;
        dataToProcess.videosList.style.left = `${dataToProcess.resultContainerPos}px`;
    }

    if (dataToProcess.movementDirection === 'left') {
        const CurrentPage = document.querySelector('.page-active');
        const PrevPage = CurrentPage.previousSibling;

        if (PrevPage) {
            CurrentPage.classList.toggle('page-active');
            PrevPage.classList.toggle('page-active');
        }

        dataToProcess.resultContainerPos += StyleConstants.PAGE_WIDTH;
        dataToProcess.videosList.style.left = `${dataToProcess.resultContainerPos}px`;
    }
}

export { handleSwipeEnd }
