import { requestData, Tokens } from '../requests/xmlHttpRequest';

export function eventListeners() {
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

            // return;
        }

        // if (e.target.className === 'page') {
        //     console.log("ASD");
        // }

        MainContainer.onmousedown = (e) => {
            let videosList = document.querySelector("#results-list");
            let posOfVideos = +videosList.style.left.slice(0, -2); // temporary left position of container with search qeury results during our moves
            resultContainerPos = +videosList.style.left.slice(0, -2);

            MainContainer.onmousemove = (e) => {
                if (e.movementX > 0) {                    
                    posOfVideos += 10;
                    videosList.style.left = posOfVideos + 'px';
                    movementDirection = 'left'; 
                } else {                 
                    posOfVideos -= 10;
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
                    const CurrentPage = document.querySelector('.page-active');
                    const NextPage = CurrentPage.nextSibling;
                    let pageNum = +NextPage.textContent;

                    console.log(Tokens);
                    if (pageNum % 3 === 0) {
                        requestData(Tokens);
                    }

                    if (NextPage) {
                        CurrentPage.classList.toggle('page-active');
                        NextPage.classList.toggle('page-active');
                    }

                    resultContainerPos -= 1360;
                    videosList.style.left = `${resultContainerPos}px`;
                }

                if (movementDirection === 'left') {
                    const CurrentPage = document.querySelector('.page-active');
                    const PrevPage = CurrentPage.previousSibling;

                    if (PrevPage) {
                        CurrentPage.classList.toggle('page-active');
                        PrevPage.classList.toggle('page-active');
                    }

                    resultContainerPos += 1360;
                    videosList.style.left = `${resultContainerPos}px`;
                }
            };
        };
    });
};
