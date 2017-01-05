'use strict';

const ResultContainer = document.createElement('main');
const ResultsList = document.createElement('ul');

ResultContainer.setAttribute('id', 'search-results');
ResultContainer.classList.add('search-results');
ResultsList.setAttribute('id', 'results-list');
ResultsList.classList.add('results-list');

ResultContainer.appendChild(ResultsList);

export { ResultContainer }; 
