'use strict';

import { SearchContainer } from './html/searchContainerHtml';
import { ResultContainer } from './html/resultContainerHtml';
import { PaginationContainer } from './html/paginationContainerHtml';
import { eventListeners } from './events/eventListeners';
// import { Tokens } from './requests/xmlHttpRequest';

const Body = document.querySelector('body');

Body.appendChild(SearchContainer);
Body.appendChild(ResultContainer);
Body.appendChild(PaginationContainer);

eventListeners();