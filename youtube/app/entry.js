'use strict';

import { SearchContainer as SearchContainer } from './html/searchContainerHtml';
import { ResultContainer as ResultContainer } from './html/resultContainerHtml';
import { PaginationContainer as PaginationContainer } from './html/paginationContainerHtml';
import { eventListeners as eventListeners } from './events/eventListeners';
import { touchEventListener as touchEventListener } from './events/touchEventListeners';

const Body = document.querySelector('body');

Body.appendChild(SearchContainer);
Body.appendChild(ResultContainer);
Body.appendChild(PaginationContainer);

eventListeners();
touchEventListener();
