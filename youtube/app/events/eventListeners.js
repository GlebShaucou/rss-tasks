import { requestData, Tokens } from '../requests/xmlHttpRequest';
import { StyleConstants } from '../constants/constants.js';

function eventListeners() {
    const body = document.querySelector('body');

    body.addEventListener('click', (e) => {
        e.preventDefault();

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
            let widthToSlide = (pageNum - 1) * StyleConstants.PAGE_WIDTH; 

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

                    if (posOfVideos > 0) {
                        videosList.style.left = '0';
                        return;
                    } 

                    if (movementDirection === 'right') {
                        const paginationBar = document.querySelector('#pagination-bar');
                        const CurrentPage = document.querySelector('.page-active');
                        const NextPage = CurrentPage.nextSibling;
                        let lastPageNum = +paginationBar.lastElementChild.textContent;
                        let nextPageNum = +NextPage.textContent;
                        
                        if (nextPageNum === lastPageNum) {
                            requestData(Tokens);
                        }

                        if (NextPage) {
                            CurrentPage.classList.toggle('page-active');
                            NextPage.classList.toggle('page-active');
                        }

                        resultContainerPos -= StyleConstants.PAGE_WIDTH;
                        videosList.style.left = `${resultContainerPos}px`;
                    }

                    if (movementDirection === 'left') {
                        const CurrentPage = document.querySelector('.page-active');
                        const PrevPage = CurrentPage.previousSibling;

                        if (PrevPage) {
                            CurrentPage.classList.toggle('page-active');
                            PrevPage.classList.toggle('page-active');
                        }

                        resultContainerPos += StyleConstants.PAGE_WIDTH;
                        videosList.style.left = `${resultContainerPos}px`;
                    }
                };
            };
        }        
    });
};

export { eventListeners }
