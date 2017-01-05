import { requestData, Tokens } from '../requests/xmlHttpRequest';
import { handleSwipeEnd } from './handleSwipeEnd';
import { StyleConstants } from '../constants/constants.js';

function touchEventListener() {
    const MainContainer = document.querySelector('#search-results');
    const videosList = document.querySelector("#results-list");
    let posOfVideos = 0;
    let resultContainerPos = 0; // left position of container with search qeury results
    let movementDirection = ''; // direction of "slide" move
    let prevPos;
    let currPos;
    let direction;

    MainContainer.addEventListener('touchstart', (e) => {
        let touch = e.changedTouches[0];
        posOfVideos = +videosList.style.left.slice(0, -2);
        resultContainerPos = +videosList.style.left.slice(0, -2);
        currPos = touch.screenX;
    });

    MainContainer.addEventListener('touchmove', (e) => {       
        let touch = e.changedTouches[0];
        prevPos = currPos;
        currPos = touch.screenX;
        direction = currPos - prevPos;
       
        if (direction > 0) {                    
            posOfVideos += StyleConstants.SLIDE_SPEED;
            videosList.style.left = posOfVideos + 'px';
            movementDirection = 'left'; 
        } else {                 
            posOfVideos -= StyleConstants.SLIDE_SPEED;
            videosList.style.left = posOfVideos + 'px';
            movementDirection = 'right';
        }  
    });

    MainContainer.addEventListener('touchend', (e) => {
        const dataToProcess = {
            posOfVideos: posOfVideos, 
            videosList: videosList, 
            movementDirection: movementDirection, 
            resultContainerPos: resultContainerPos, 
            requestData: requestData, 
            Tokens: Tokens
        };
        
        handleSwipeEnd(dataToProcess);
    });    
}

export { touchEventListener }
