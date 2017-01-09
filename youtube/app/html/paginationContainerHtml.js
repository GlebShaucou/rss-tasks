'use strict';

const PaginationContainer = document.createElement('footer');
const PaginationBar = document.createElement('ul');
const InfoParagraph = document.createElement('p');

PaginationContainer.classList.add('footer');
PaginationBar.classList.add('pagination-bar');
PaginationBar.setAttribute('id', 'pagination-bar');
InfoParagraph.classList.add('footer-info');
InfoParagraph.innerHTML = "&copy; This WebApp was created by Gleb Shaucou special for Rolling Scopes School. All rights reserved."

PaginationContainer.appendChild(PaginationBar);
PaginationContainer.appendChild(InfoParagraph);

export { PaginationContainer as PaginationContainer };