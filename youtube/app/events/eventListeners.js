'use strict';

import { requestData as requestData, Tokens as Tokens } from '../requests/xmlHttpRequest';
import { handleSwipeEnd as handleSwipeEnd } from './handleSwipeEnd';
import { StyleConstants as StyleConstants } from '../constants/constants.js';
import { checkScreenWidth as checkScreenWidth } from '../helpers/checkScreenWidth';

function eventListeners() {
    const body = document.querySelector('body');
    let pageWidth = checkScreenWidth();

    body.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.className === 'video-title') {
            window.open(e.target.href);
        }

        const MainContainer = document.querySelector('#search-results');
        let resultContainerPos = 0; // left position of container with search qeury results
        let movementDirection = ''; // direction of "slide" move

        if (e.target.id === 'search-button') {
            const SearchInput = document.querySelector('#search-input');
            const SearchResultList = document.querySelector('#results-list');
            const PaginationBar = document.querySelector('#pagination-bar');
            let query = SearchInput.value;
            
            SearchResultList.style.left = '0';
            SearchResultList.innerHTML = '';
            PaginationBar.innerHTML = '';

            requestData({
                query: query, 
                searchType: 'searchlist'
            });
        } if (e.target.className == 'page') { // handle with clicking on paging
            const videosList = document.querySelector("#results-list");
            const paginationBar = document.querySelector('#pagination-bar');
            const CurrentPage = document.querySelector('.page-active');
            let lastPageNum = +paginationBar.lastElementChild.textContent;
            let pageNum = +e.target.textContent;
            let widthToSlide = (pageNum - 1) * pageWidth; 

            CurrentPage.classList.toggle('page-active');
            e.target.classList.toggle('page-active');

            videosList.style.left = `-${widthToSlide}px`;

            if (pageNum === lastPageNum) {
                requestData(Tokens);
            }
        } else { // slider implementation
            MainContainer.onmousedown = (e) => {
                const videosList = document.querySelector("#results-list");
                let posOfVideos = +videosList.style.left.slice(0, -2); // temporary left position of container with search qeury results during our moves
                resultContainerPos = +videosList.style.left.slice(0, -2);

                MainContainer.onmousemove = (e) => {
                    if (e.movementX > 0) {                    
                        posOfVideos += StyleConstants.SLIDE_SPEED;
                        videosList.style.left = posOfVideos + 'px';
                        movementDirection = 'left'; 
                    } else {                 
                        posOfVideos -= StyleConstants.SLIDE_SPEED;
                        videosList.style.left = posOfVideos + 'px';
                        movementDirection = 'right';
                    }            
                };

                MainContainer.onmouseup = (e) => {
                    MainContainer.onmousemove = null;

                    const dataToProcess = {
                        posOfVideos: posOfVideos, 
                        videosList: videosList, 
                        movementDirection: movementDirection, 
                        resultContainerPos: resultContainerPos, 
                        requestData: requestData, 
                        Tokens: Tokens
                    };
                    
                    handleSwipeEnd(dataToProcess);
                };
            };
        }        
    });
};

export { eventListeners as eventListeners };
 