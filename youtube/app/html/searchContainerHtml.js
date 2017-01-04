'use strict';

const SearchContainer = document.createElement('header');
const SearchForm = document.createElement('form');
const SearchInput = document.createElement('input');
const SearchButton = document.createElement('button');
const FontIcon = document.createElement('i');

SearchContainer.classList.add('search-container');
SearchForm.classList.add('search-form');

SearchInput.setAttribute('id', 'search-input');
SearchInput.setAttribute('type', 'text');
SearchInput.classList.add('search-input');

FontIcon.classList.add('fa');
FontIcon.classList.add('fa-search');
FontIcon.setAttribute('aria-hidden', 'true');

SearchButton.setAttribute('id', 'search-button');
SearchButton.classList.add('search-button');

SearchForm.appendChild(SearchInput);
SearchForm.appendChild(SearchButton);
SearchContainer.appendChild(SearchForm);
SearchButton.appendChild(FontIcon);
SearchButton.textContent = ` SEARCH`;

export { SearchContainer }; 
