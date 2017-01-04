import { requestData } from '../requests/xmlHttpRequest';

export function eventListeners() {
    let body = document.querySelector('body');

    body.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.id === 'search-button') {
            let searchInput = document.querySelector('#search-input');
            let searchResultList = document.querySelector('#results-list');
            let query = searchInput.value;
            let videosList = document.querySelector("#results-list");
            
            videosList.style.left = '0';
            searchResultList.innerHTML = '';

            requestData({
                query: query, 
                searchType: 'searchlist'
            });

            // buildPagination();
        }

        // if (e.target.id === 'next-page') {
        //     loadNextPartOfVideos();
        // }
    });

    body.addEventListener('mousedown', (e) => {
        let mainContainer = document.querySelector('#search-results');
        
        mainContainer.onmousemove = (e) => {
            if (e.movementX > 0) {
                // console.log('right');  
                let videosList = document.querySelector("#results-list");
                let posOfVideos = +videosList.style.left.slice(0, -2);
                
                posOfVideos += 10;
                videosList.style.left = posOfVideos + 'px'; 
            } else {
                // console.log('left');
                let videosList = document.querySelector("#results-list");
                let posOfVideos = +videosList.style.left.slice(0, -2);
                
                posOfVideos -= 10;
                videosList.style.left = posOfVideos + 'px';
            }            
        };
    });

    body.addEventListener('mouseup', (e) => {
        let mainContainer = document.querySelector('#search-results');
        let videosList = document.querySelector("#results-list");
        let posOfVideos = +videosList.style.left.slice(0, -2);

        mainContainer.onmousemove = null;

        if (posOfVideos > 0) {
            videosList.style.left = '0';
        }
        // if (e.target.id === 'search-results') {
        //     console.log('true');
        // }
    });
};
