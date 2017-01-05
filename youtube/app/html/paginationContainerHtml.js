const PaginationContainer = document.createElement('footer');
const PaginationBar = document.createElement('ul');

PaginationContainer.classList.add('footer');
PaginationBar.classList.add('pagination-bar');
PaginationBar.setAttribute('id', 'pagination-bar');

PaginationContainer.appendChild(PaginationBar);

export { PaginationContainer };