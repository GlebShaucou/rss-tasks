'use strict';

function buildPagination() {
    const PaginationBar = document.querySelector('#pagination-bar');
    let count = PaginationBar.childElementCount;
    
    if (!count) {
        for (let i = 1; i <= 3; i++) {
            const listItem = document.createElement('li');
            
            listItem.classList.add('page');
            listItem.textContent = i;

            PaginationBar.appendChild(listItem);    
        }

        PaginationBar.firstElementChild.classList.add('page-active');

    } else {
        let start = +PaginationBar.lastElementChild.textContent;
        
        for(let i = start + 1; i <= start + 3; i++) {
            const listItem = document.createElement('li');
            
            listItem.classList.add('page');
            listItem.textContent = i;

            PaginationBar.appendChild(listItem);   
        }
    }       
}

export { buildPagination as buildPagination };
