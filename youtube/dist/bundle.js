var globals =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _searchContainerHtml = __webpack_require__(1);

	var _resultContainerHtml = __webpack_require__(6);

	var _paginationContainerHtml = __webpack_require__(7);

	var _eventListeners = __webpack_require__(2);

	// import { Tokens } from './requests/xmlHttpRequest';

	var Body = document.querySelector('body');

	Body.appendChild(_searchContainerHtml.SearchContainer);
	Body.appendChild(_resultContainerHtml.ResultContainer);
	Body.appendChild(_paginationContainerHtml.PaginationContainer);

	(0, _eventListeners.eventListeners)();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SearchContainer = document.createElement('header');
	var SearchForm = document.createElement('form');
	var SearchInput = document.createElement('input');
	var SearchButton = document.createElement('button');
	var FontIcon = document.createElement('i');

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
	SearchButton.textContent = ' SEARCH';

	exports.SearchContainer = SearchContainer;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.eventListeners = eventListeners;

	var _xmlHttpRequest = __webpack_require__(3);

	function eventListeners() {
	    var body = document.querySelector('body');

	    body.addEventListener('click', function (e) {
	        e.preventDefault();

	        if (e.target.id === 'search-button') {
	            var searchInput = document.querySelector('#search-input');
	            var searchResultList = document.querySelector('#results-list');
	            var query = searchInput.value;
	            var videosList = document.querySelector("#results-list");

	            videosList.style.left = '0';
	            searchResultList.innerHTML = '';

	            (0, _xmlHttpRequest.requestData)({
	                query: query,
	                searchType: 'searchlist'
	            });

	            // buildPagination();
	        }

	        // if (e.target.id === 'next-page') {
	        //     loadNextPartOfVideos();
	        // }
	    });

	    body.addEventListener('mousedown', function (e) {
	        var mainContainer = document.querySelector('#search-results');

	        mainContainer.onmousemove = function (e) {
	            if (e.movementX > 0) {
	                // console.log('right');  
	                var videosList = document.querySelector("#results-list");
	                var posOfVideos = +videosList.style.left.slice(0, -2);

	                posOfVideos += 10;
	                videosList.style.left = posOfVideos + 'px';
	            } else {
	                // console.log('left');
	                var _videosList = document.querySelector("#results-list");
	                var _posOfVideos = +_videosList.style.left.slice(0, -2);

	                _posOfVideos -= 10;
	                _videosList.style.left = _posOfVideos + 'px';
	            }
	        };
	    });

	    body.addEventListener('mouseup', function (e) {
	        var mainContainer = document.querySelector('#search-results');
	        var videosList = document.querySelector("#results-list");
	        var posOfVideos = +videosList.style.left.slice(0, -2);

	        mainContainer.onmousemove = null;

	        if (posOfVideos > 0) {
	            videosList.style.left = '0';
	        }
	        // if (e.target.id === 'search-results') {
	        //     console.log('true');
	        // }
	    });
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Tokens = exports.requestData = undefined;

	var _videoDetailsContainer = __webpack_require__(4);

	var _constants = __webpack_require__(5);

	var Tokens = {
	    nextPageToken: '',
	    prevPageToken: ''
	};

	function requestData(obj) {
	    var xhr = new XMLHttpRequest();
	    var url = void 0;

	    url = generateSearchListURL(obj.query, obj.pageToken);

	    xhr.open('GET', url, true);
	    xhr.onreadystatechange = function () {
	        if (xhr.readyState == 4 && xhr.status == 200) {
	            var response = JSON.parse(xhr.responseText);
	            Tokens.nextPageToken = response.nextPageToken;
	            Tokens.prevPageToken = response.prevPageToken;

	            onSearchResponse(response);
	        }
	    };

	    xhr.send();
	}

	function generateSearchListURL(query, pageToken) {
	    var baseUrl = 'https://www.googleapis.com/youtube/v3/search';
	    var part = 'snippet';
	    var type = 'video';
	    var maxResults = 15;
	    // pageToken: nextPageToken: "dsfa" or prevPageToken: "dffsd",
	    var q = encodeURIComponent(query);

	    return baseUrl + '?key=' + _constants.Constants.API_KEY + '&type=' + type + '&part=' + part + '&maxResults=' + maxResults + '&q=' + q;
	}

	function onSearchResponse(response) {
	    parseResponseToDisplay(response);
	}

	function parseResponseToDisplay(response) {
	    var listOfVideosData = [];
	    var listOfVideosId = [];
	    var queryResults = response.items;

	    for (var i = 0; i < queryResults.length; i++) {
	        var currentVideo = queryResults[i].snippet;
	        var videoId = queryResults[i].id.videoId;
	        var videoDataToDisplay = {
	            title: currentVideo.title,
	            preview: currentVideo.thumbnails.medium.url,
	            description: currentVideo.description,
	            author: currentVideo.channelTitle,
	            pubDate: new Date(currentVideo.publishedAt),
	            viewCount: 0,
	            videoLink: 'https://www.youtube.com/watch?v=' + videoId
	        };

	        listOfVideosId.push(videoId);
	        listOfVideosData.push(videoDataToDisplay);
	    }

	    requestVideoStatistic({
	        ids: listOfVideosId,
	        videos: listOfVideosData
	    });
	}

	function requestVideoStatistic(obj) {
	    var xhr = new XMLHttpRequest();
	    var url = void 0;

	    url = generateVideoStatURL(obj.ids);

	    xhr.open('GET', url, true);
	    xhr.onreadystatechange = function () {
	        if (xhr.readyState == 4 && xhr.status == 200) {
	            var response = JSON.parse(xhr.responseText);

	            onVideoStatisticResponse({
	                response: response,
	                videos: obj.videos
	            });
	        }
	    };

	    xhr.send();
	}

	function generateVideoStatURL(ids) {
	    var baseUrl = 'https://www.googleapis.com/youtube/v3/videos';
	    var part = 'snippet, statistics';
	    var id = ids.join(',');

	    return baseUrl + '?key=' + _constants.Constants.API_KEY + '&part=' + part + '&id=' + id;
	}

	function onVideoStatisticResponse(obj) {
	    var data = obj.response.items;
	    var videos = obj.videos;

	    for (var i = 0; i < data.length; i++) {
	        videos[i].viewCount = data[i].statistics.viewCount;
	    }

	    showSearchResults(videos);
	}

	function showSearchResults(data) {
	    for (var i = 0; i < data.length; i++) {
	        (0, _videoDetailsContainer.buildVideoDataContainer)(data[i]);
	    }
	}

	exports.requestData = requestData;
		exports.Tokens = Tokens;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function buildVideoDataContainer(obj) {
	    var searchResultsList = document.querySelector('#results-list');
	    var li = document.createElement('li');
	    var videoContainer = document.createElement('div');
	    var videoThumb = document.createElement('img');
	    var propList = document.createElement('ul');
	    var videoDescr = document.createElement('p');
	    var linkTitle = document.createElement('a');
	    var listItems = [];
	    var FontIcons = [];
	    var spans = [];
	    var date = obj.pubDate;

	    videoContainer.classList.add('video-details');
	    videoThumb.classList.add('video-thumb');
	    videoThumb.setAttribute('src', obj.preview);
	    videoThumb.setAttribute('alt', 'Video Thumbnail');
	    propList.classList.add('video-props-list');
	    videoDescr.classList.add('video-descr');

	    for (var i = 0; i < 4; i++) {
	        var _li = document.createElement('li');
	        listItems.push(_li);
	    }

	    for (var _i = 0; _i < 5; _i++) {
	        var FontIcon = document.createElement('i');
	        FontIcon.classList.add('fa');
	        FontIcon.setAttribute('aria-hidden', 'true');
	        FontIcons.push(FontIcon);
	    }

	    for (var _i2 = 0; _i2 < 3; _i2++) {
	        var span = document.createElement('span');
	        spans.push(span);
	    }

	    linkTitle.classList.add('video-title');
	    linkTitle.setAttribute('href', obj.videoLink);
	    linkTitle.setAttribute('target', '_blank');
	    linkTitle.textContent = ' ' + obj.title;

	    FontIcons[0].classList.add('fa-link');
	    FontIcons[1].classList.add('fa-eye');
	    FontIcons[2].classList.add('fa-calendar-check-o');
	    FontIcons[3].classList.add('fa-user');
	    // FontIcons[4].classList.add('fa-comment'); // should be in p paragraph

	    spans[0].classList.add('video-view-count');
	    spans[0].textContent = ' ' + obj.viewCount;
	    spans[1].classList.add('video-pubdate');
	    spans[1].textContent = ' ' + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
	    spans[2].classList.add('video-author');
	    spans[2].textContent = ' ' + obj.author;

	    listItems[0].appendChild(FontIcons[0]);
	    listItems[0].appendChild(linkTitle);

	    listItems[1].appendChild(FontIcons[1]);
	    listItems[1].appendChild(spans[0]);

	    listItems[2].appendChild(FontIcons[2]);
	    listItems[2].appendChild(spans[1]);

	    listItems[3].appendChild(FontIcons[3]);
	    listItems[3].appendChild(spans[2]);

	    for (var _i3 = 0; _i3 < listItems.length; _i3++) {
	        propList.appendChild(listItems[_i3]);
	    }

	    videoDescr.textContent = obj.description;

	    videoContainer.appendChild(videoThumb);
	    videoContainer.appendChild(propList);
	    videoContainer.appendChild(videoDescr);

	    li.appendChild(videoContainer);
	    searchResultsList.appendChild(li);
	}

	exports.buildVideoDataContainer = buildVideoDataContainer;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Constants = {
	    API_KEY: 'AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE'
	};

		exports.Constants = Constants;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ResultContainer = document.createElement('main');
	var ResultsList = document.createElement('ul');

	ResultContainer.setAttribute('id', 'search-results');
	ResultContainer.classList.add('search-results');
	ResultsList.setAttribute('id', 'results-list');
	ResultsList.classList.add('results-list');
	ResultsList.style.width = '5440px';

	ResultContainer.appendChild(ResultsList);

	exports.ResultContainer = ResultContainer;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PaginationContainer = document.createElement('footer');
	var PaginationBar = document.createElement('ul');

	PaginationContainer.classList.add('footer');
	PaginationBar.classList.add('pagination-bar');

	PaginationContainer.appendChild(PaginationBar);

	exports.PaginationContainer = PaginationContainer;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDhhNzgzZmM1MWFjNjY3OTViNjU5Iiwid2VicGFjazovLy9hcHAvZW50cnkuanMiLCJ3ZWJwYWNrOi8vL2FwcC9odG1sL3NlYXJjaENvbnRhaW5lckh0bWwuanMiLCJ3ZWJwYWNrOi8vL2FwcC9ldmVudHMvZXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vL2FwcC9yZXF1ZXN0cy94bWxIdHRwUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vYXBwL2h0bWwvdmlkZW9EZXRhaWxzQ29udGFpbmVyLmpzIiwid2VicGFjazovLy9hcHAvY29uc3RhbnRzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vYXBwL2h0bWwvcmVzdWx0Q29udGFpbmVySHRtbC5qcyIsIndlYnBhY2s6Ly8vYXBwL2h0bWwvcGFnaW5hdGlvbkNvbnRhaW5lckh0bWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOGE3ODNmYzUxYWM2Njc5NWI2NTkiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hDb250YWluZXIgfSBmcm9tICcuL2h0bWwvc2VhcmNoQ29udGFpbmVySHRtbCc7XHJcbmltcG9ydCB7IFJlc3VsdENvbnRhaW5lciB9IGZyb20gJy4vaHRtbC9yZXN1bHRDb250YWluZXJIdG1sJztcclxuaW1wb3J0IHsgUGFnaW5hdGlvbkNvbnRhaW5lciB9IGZyb20gJy4vaHRtbC9wYWdpbmF0aW9uQ29udGFpbmVySHRtbCc7XHJcbmltcG9ydCB7IGV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi9ldmVudHMvZXZlbnRMaXN0ZW5lcnMnO1xyXG4vLyBpbXBvcnQgeyBUb2tlbnMgfSBmcm9tICcuL3JlcXVlc3RzL3htbEh0dHBSZXF1ZXN0JztcclxuXHJcbmNvbnN0IEJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG5Cb2R5LmFwcGVuZENoaWxkKFNlYXJjaENvbnRhaW5lcik7XHJcbkJvZHkuYXBwZW5kQ2hpbGQoUmVzdWx0Q29udGFpbmVyKTtcclxuQm9keS5hcHBlbmRDaGlsZChQYWdpbmF0aW9uQ29udGFpbmVyKTtcclxuXHJcbmV2ZW50TGlzdGVuZXJzKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGFwcC9lbnRyeS5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFNlYXJjaENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xyXG5jb25zdCBTZWFyY2hGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG5jb25zdCBTZWFyY2hJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbmNvbnN0IFNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5jb25zdCBGb250SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuXHJcblNlYXJjaENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzZWFyY2gtY29udGFpbmVyJyk7XHJcblNlYXJjaEZvcm0uY2xhc3NMaXN0LmFkZCgnc2VhcmNoLWZvcm0nKTtcclxuXHJcblNlYXJjaElucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCAnc2VhcmNoLWlucHV0Jyk7XHJcblNlYXJjaElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcblNlYXJjaElucHV0LmNsYXNzTGlzdC5hZGQoJ3NlYXJjaC1pbnB1dCcpO1xyXG5cclxuRm9udEljb24uY2xhc3NMaXN0LmFkZCgnZmEnKTtcclxuRm9udEljb24uY2xhc3NMaXN0LmFkZCgnZmEtc2VhcmNoJyk7XHJcbkZvbnRJY29uLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuU2VhcmNoQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnc2VhcmNoLWJ1dHRvbicpO1xyXG5TZWFyY2hCdXR0b24uY2xhc3NMaXN0LmFkZCgnc2VhcmNoLWJ1dHRvbicpO1xyXG5cclxuU2VhcmNoRm9ybS5hcHBlbmRDaGlsZChTZWFyY2hJbnB1dCk7XHJcblNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoU2VhcmNoQnV0dG9uKTtcclxuU2VhcmNoQ29udGFpbmVyLmFwcGVuZENoaWxkKFNlYXJjaEZvcm0pO1xyXG5TZWFyY2hCdXR0b24uYXBwZW5kQ2hpbGQoRm9udEljb24pO1xyXG5TZWFyY2hCdXR0b24udGV4dENvbnRlbnQgPSBgIFNFQVJDSGA7XHJcblxyXG5leHBvcnQgeyBTZWFyY2hDb250YWluZXIgfTsgXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBhcHAvaHRtbC9zZWFyY2hDb250YWluZXJIdG1sLmpzIiwiaW1wb3J0IHsgcmVxdWVzdERhdGEgfSBmcm9tICcuLi9yZXF1ZXN0cy94bWxIdHRwUmVxdWVzdCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBsZXQgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHJcbiAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gJ3NlYXJjaC1idXR0b24nKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtaW5wdXQnKTtcclxuICAgICAgICAgICAgbGV0IHNlYXJjaFJlc3VsdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy1saXN0Jyk7XHJcbiAgICAgICAgICAgIGxldCBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgdmlkZW9zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVzdWx0cy1saXN0XCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmlkZW9zTGlzdC5zdHlsZS5sZWZ0ID0gJzAnO1xyXG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdERhdGEoe1xyXG4gICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LCBcclxuICAgICAgICAgICAgICAgIHNlYXJjaFR5cGU6ICdzZWFyY2hsaXN0J1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGJ1aWxkUGFnaW5hdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgKGUudGFyZ2V0LmlkID09PSAnbmV4dC1wYWdlJykge1xyXG4gICAgICAgIC8vICAgICBsb2FkTmV4dFBhcnRPZlZpZGVvcygpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcclxuICAgICAgICBsZXQgbWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtcmVzdWx0cycpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG1haW5Db250YWluZXIub25tb3VzZW1vdmUgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5tb3ZlbWVudFggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncmlnaHQnKTsgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHZpZGVvc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jlc3VsdHMtbGlzdFwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBwb3NPZlZpZGVvcyA9ICt2aWRlb3NMaXN0LnN0eWxlLmxlZnQuc2xpY2UoMCwgLTIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBwb3NPZlZpZGVvcyArPSAxMDtcclxuICAgICAgICAgICAgICAgIHZpZGVvc0xpc3Quc3R5bGUubGVmdCA9IHBvc09mVmlkZW9zICsgJ3B4JzsgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnbGVmdCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZpZGVvc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jlc3VsdHMtbGlzdFwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBwb3NPZlZpZGVvcyA9ICt2aWRlb3NMaXN0LnN0eWxlLmxlZnQuc2xpY2UoMCwgLTIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBwb3NPZlZpZGVvcyAtPSAxMDtcclxuICAgICAgICAgICAgICAgIHZpZGVvc0xpc3Quc3R5bGUubGVmdCA9IHBvc09mVmlkZW9zICsgJ3B4JztcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4ge1xyXG4gICAgICAgIGxldCBtYWluQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1yZXN1bHRzJyk7XHJcbiAgICAgICAgbGV0IHZpZGVvc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jlc3VsdHMtbGlzdFwiKTtcclxuICAgICAgICBsZXQgcG9zT2ZWaWRlb3MgPSArdmlkZW9zTGlzdC5zdHlsZS5sZWZ0LnNsaWNlKDAsIC0yKTtcclxuXHJcbiAgICAgICAgbWFpbkNvbnRhaW5lci5vbm1vdXNlbW92ZSA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChwb3NPZlZpZGVvcyA+IDApIHtcclxuICAgICAgICAgICAgdmlkZW9zTGlzdC5zdHlsZS5sZWZ0ID0gJzAnO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiAoZS50YXJnZXQuaWQgPT09ICdzZWFyY2gtcmVzdWx0cycpIHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ3RydWUnKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9KTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGFwcC9ldmVudHMvZXZlbnRMaXN0ZW5lcnMuanMiLCJpbXBvcnQgeyBidWlsZFZpZGVvRGF0YUNvbnRhaW5lciB9IGZyb20gJy4uL2h0bWwvdmlkZW9EZXRhaWxzQ29udGFpbmVyJztcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbnN0YW50cy5qcyc7XHJcblxyXG5jb25zdCBUb2tlbnMgPSB7XHJcbiAgICBuZXh0UGFnZVRva2VuOiAnJyxcclxuICAgIHByZXZQYWdlVG9rZW46ICcnXHJcbn07XHJcblxyXG5mdW5jdGlvbiByZXF1ZXN0RGF0YShvYmopIHtcclxuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIGxldCB1cmw7XHJcblxyXG4gICAgdXJsID0gZ2VuZXJhdGVTZWFyY2hMaXN0VVJMKG9iai5xdWVyeSwgb2JqLnBhZ2VUb2tlbik7XHJcblxyXG4gICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBUb2tlbnMubmV4dFBhZ2VUb2tlbiA9IHJlc3BvbnNlLm5leHRQYWdlVG9rZW47XHJcbiAgICAgICAgICAgIFRva2Vucy5wcmV2UGFnZVRva2VuID0gcmVzcG9uc2UucHJldlBhZ2VUb2tlbjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG9uU2VhcmNoUmVzcG9uc2UocmVzcG9uc2UpO1xyXG4gICAgICAgIH0gXHJcbiAgICB9O1xyXG5cclxuICAgIHhoci5zZW5kKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlU2VhcmNoTGlzdFVSTChxdWVyeSwgcGFnZVRva2VuKSB7ICAgIFxyXG4gICAgY29uc3QgYmFzZVVybCA9ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3NlYXJjaCc7XHJcbiAgICBjb25zdCBwYXJ0ID0gJ3NuaXBwZXQnO1xyXG4gICAgY29uc3QgdHlwZSA9ICd2aWRlbyc7XHJcbiAgICBjb25zdCBtYXhSZXN1bHRzID0gMTU7XHJcbiAgICAvLyBwYWdlVG9rZW46IG5leHRQYWdlVG9rZW46IFwiZHNmYVwiIG9yIHByZXZQYWdlVG9rZW46IFwiZGZmc2RcIixcclxuICAgIGNvbnN0IHEgPSBlbmNvZGVVUklDb21wb25lbnQocXVlcnkpO1xyXG5cclxuICAgIHJldHVybiBgJHtiYXNlVXJsfT9rZXk9JHtDb25zdGFudHMuQVBJX0tFWX0mdHlwZT0ke3R5cGV9JnBhcnQ9JHtwYXJ0fSZtYXhSZXN1bHRzPSR7bWF4UmVzdWx0c30mcT0ke3F9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gb25TZWFyY2hSZXNwb25zZShyZXNwb25zZSkge1xyXG4gICAgcGFyc2VSZXNwb25zZVRvRGlzcGxheShyZXNwb25zZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlUmVzcG9uc2VUb0Rpc3BsYXkocmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IGxpc3RPZlZpZGVvc0RhdGEgPSBbXTtcclxuICAgIGNvbnN0IGxpc3RPZlZpZGVvc0lkID0gW107XHJcbiAgICBjb25zdCBxdWVyeVJlc3VsdHMgPSByZXNwb25zZS5pdGVtcztcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXJ5UmVzdWx0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBjdXJyZW50VmlkZW8gPSBxdWVyeVJlc3VsdHNbaV0uc25pcHBldDtcclxuICAgICAgICBsZXQgdmlkZW9JZCA9IHF1ZXJ5UmVzdWx0c1tpXS5pZC52aWRlb0lkO1xyXG4gICAgICAgIGxldCB2aWRlb0RhdGFUb0Rpc3BsYXkgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBjdXJyZW50VmlkZW8udGl0bGUsXHJcbiAgICAgICAgICAgIHByZXZpZXc6IGN1cnJlbnRWaWRlby50aHVtYm5haWxzLm1lZGl1bS51cmwsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBjdXJyZW50VmlkZW8uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgIGF1dGhvcjogY3VycmVudFZpZGVvLmNoYW5uZWxUaXRsZSxcclxuICAgICAgICAgICAgcHViRGF0ZTogbmV3IERhdGUoY3VycmVudFZpZGVvLnB1Ymxpc2hlZEF0KSxcclxuICAgICAgICAgICAgdmlld0NvdW50OiAwLFxyXG4gICAgICAgICAgICB2aWRlb0xpbms6IGBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PSR7dmlkZW9JZH1gXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGlzdE9mVmlkZW9zSWQucHVzaCh2aWRlb0lkKTtcclxuICAgICAgICBsaXN0T2ZWaWRlb3NEYXRhLnB1c2godmlkZW9EYXRhVG9EaXNwbGF5KTtcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0VmlkZW9TdGF0aXN0aWMoe1xyXG4gICAgICAgIGlkczogbGlzdE9mVmlkZW9zSWQsXHJcbiAgICAgICAgdmlkZW9zOiBsaXN0T2ZWaWRlb3NEYXRhXHJcbiAgICB9KTsgIFxyXG59XHJcblxyXG5mdW5jdGlvbiByZXF1ZXN0VmlkZW9TdGF0aXN0aWMob2JqKSB7XHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICBsZXQgdXJsO1xyXG5cclxuICAgIHVybCA9IGdlbmVyYXRlVmlkZW9TdGF0VVJMKG9iai5pZHMpO1xyXG5cclxuICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09IDQgJiYgeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBvblZpZGVvU3RhdGlzdGljUmVzcG9uc2Uoe1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLCBcclxuICAgICAgICAgICAgICAgIHZpZGVvczogb2JqLnZpZGVvc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IFxyXG4gICAgfTtcclxuXHJcbiAgICB4aHIuc2VuZCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVZpZGVvU3RhdFVSTChpZHMpIHtcclxuICAgIGxldCBiYXNlVXJsID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvdmlkZW9zJztcclxuICAgIGxldCBwYXJ0ID0gJ3NuaXBwZXQsIHN0YXRpc3RpY3MnO1xyXG4gICAgbGV0IGlkID0gaWRzLmpvaW4oJywnKTtcclxuXHJcbiAgICByZXR1cm4gYCR7YmFzZVVybH0/a2V5PSR7Q29uc3RhbnRzLkFQSV9LRVl9JnBhcnQ9JHtwYXJ0fSZpZD0ke2lkfWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uVmlkZW9TdGF0aXN0aWNSZXNwb25zZShvYmopIHtcclxuICAgIGxldCBkYXRhID0gb2JqLnJlc3BvbnNlLml0ZW1zO1xyXG4gICAgbGV0IHZpZGVvcyA9IG9iai52aWRlb3M7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmlkZW9zW2ldLnZpZXdDb3VudCA9IGRhdGFbaV0uc3RhdGlzdGljcy52aWV3Q291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NlYXJjaFJlc3VsdHModmlkZW9zKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1NlYXJjaFJlc3VsdHMoZGF0YSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYnVpbGRWaWRlb0RhdGFDb250YWluZXIoZGF0YVtpXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJlcXVlc3REYXRhLCBUb2tlbnMgfTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGFwcC9yZXF1ZXN0cy94bWxIdHRwUmVxdWVzdC5qcyIsImZ1bmN0aW9uIGJ1aWxkVmlkZW9EYXRhQ29udGFpbmVyKG9iaikge1xyXG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy1saXN0Jyk7XHJcbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICBjb25zdCB2aWRlb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgdmlkZW9UaHVtYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgY29uc3QgcHJvcExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgY29uc3QgdmlkZW9EZXNjciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIGNvbnN0IGxpbmtUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIGNvbnN0IGxpc3RJdGVtcyA9IFtdO1xyXG4gICAgY29uc3QgRm9udEljb25zID0gW107XHJcbiAgICBjb25zdCBzcGFucyA9IFtdO1xyXG4gICAgbGV0IGRhdGUgPSBvYmoucHViRGF0ZTtcclxuXHJcbiAgICB2aWRlb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd2aWRlby1kZXRhaWxzJyk7XHJcbiAgICB2aWRlb1RodW1iLmNsYXNzTGlzdC5hZGQoJ3ZpZGVvLXRodW1iJyk7XHJcbiAgICB2aWRlb1RodW1iLnNldEF0dHJpYnV0ZSgnc3JjJywgb2JqLnByZXZpZXcpO1xyXG4gICAgdmlkZW9UaHVtYi5zZXRBdHRyaWJ1dGUoJ2FsdCcsICdWaWRlbyBUaHVtYm5haWwnKTtcclxuICAgIHByb3BMaXN0LmNsYXNzTGlzdC5hZGQoJ3ZpZGVvLXByb3BzLWxpc3QnKTtcclxuICAgIHZpZGVvRGVzY3IuY2xhc3NMaXN0LmFkZCgndmlkZW8tZGVzY3InKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgbGlzdEl0ZW1zLnB1c2gobGkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgbGV0IEZvbnRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIEZvbnRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhJyk7XHJcbiAgICAgICAgRm9udEljb24uc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcbiAgICAgICAgRm9udEljb25zLnB1c2goRm9udEljb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgc3BhbnMucHVzaChzcGFuKTtcclxuICAgIH1cclxuXHJcbiAgICBsaW5rVGl0bGUuY2xhc3NMaXN0LmFkZCgndmlkZW8tdGl0bGUnKTtcclxuICAgIGxpbmtUaXRsZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBvYmoudmlkZW9MaW5rKTtcclxuICAgIGxpbmtUaXRsZS5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcclxuICAgIGxpbmtUaXRsZS50ZXh0Q29udGVudCA9IGAgJHtvYmoudGl0bGV9YDtcclxuXHJcbiAgICBGb250SWNvbnNbMF0uY2xhc3NMaXN0LmFkZCgnZmEtbGluaycpO1xyXG4gICAgRm9udEljb25zWzFdLmNsYXNzTGlzdC5hZGQoJ2ZhLWV5ZScpO1xyXG4gICAgRm9udEljb25zWzJdLmNsYXNzTGlzdC5hZGQoJ2ZhLWNhbGVuZGFyLWNoZWNrLW8nKTtcclxuICAgIEZvbnRJY29uc1szXS5jbGFzc0xpc3QuYWRkKCdmYS11c2VyJyk7XHJcbiAgICAvLyBGb250SWNvbnNbNF0uY2xhc3NMaXN0LmFkZCgnZmEtY29tbWVudCcpOyAvLyBzaG91bGQgYmUgaW4gcCBwYXJhZ3JhcGhcclxuXHJcbiAgICBzcGFuc1swXS5jbGFzc0xpc3QuYWRkKCd2aWRlby12aWV3LWNvdW50Jyk7XHJcbiAgICBzcGFuc1swXS50ZXh0Q29udGVudCA9IGAgJHtvYmoudmlld0NvdW50fWA7XHJcbiAgICBzcGFuc1sxXS5jbGFzc0xpc3QuYWRkKCd2aWRlby1wdWJkYXRlJyk7XHJcbiAgICBzcGFuc1sxXS50ZXh0Q29udGVudCA9IGAgJHtkYXRlLmdldERhdGUoKX0vJHtkYXRlLmdldE1vbnRoKCl9LyR7ZGF0ZS5nZXRGdWxsWWVhcigpfSAke2RhdGUuZ2V0SG91cnMoKX06JHtkYXRlLmdldE1pbnV0ZXMoKX1gO1xyXG4gICAgc3BhbnNbMl0uY2xhc3NMaXN0LmFkZCgndmlkZW8tYXV0aG9yJyk7XHJcbiAgICBzcGFuc1syXS50ZXh0Q29udGVudCA9IGAgJHtvYmouYXV0aG9yfWA7XHJcblxyXG4gICAgbGlzdEl0ZW1zWzBdLmFwcGVuZENoaWxkKEZvbnRJY29uc1swXSk7XHJcbiAgICBsaXN0SXRlbXNbMF0uYXBwZW5kQ2hpbGQobGlua1RpdGxlKTtcclxuXHJcbiAgICBsaXN0SXRlbXNbMV0uYXBwZW5kQ2hpbGQoRm9udEljb25zWzFdKTtcclxuICAgIGxpc3RJdGVtc1sxXS5hcHBlbmRDaGlsZChzcGFuc1swXSk7XHJcblxyXG4gICAgbGlzdEl0ZW1zWzJdLmFwcGVuZENoaWxkKEZvbnRJY29uc1syXSk7XHJcbiAgICBsaXN0SXRlbXNbMl0uYXBwZW5kQ2hpbGQoc3BhbnNbMV0pO1xyXG5cclxuICAgIGxpc3RJdGVtc1szXS5hcHBlbmRDaGlsZChGb250SWNvbnNbM10pO1xyXG4gICAgbGlzdEl0ZW1zWzNdLmFwcGVuZENoaWxkKHNwYW5zWzJdKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHByb3BMaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtc1tpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmlkZW9EZXNjci50ZXh0Q29udGVudCA9IG9iai5kZXNjcmlwdGlvbjtcclxuXHJcbiAgICB2aWRlb0NvbnRhaW5lci5hcHBlbmRDaGlsZCh2aWRlb1RodW1iKTtcclxuICAgIHZpZGVvQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb3BMaXN0KTtcclxuICAgIHZpZGVvQ29udGFpbmVyLmFwcGVuZENoaWxkKHZpZGVvRGVzY3IpO1xyXG5cclxuICAgIGxpLmFwcGVuZENoaWxkKHZpZGVvQ29udGFpbmVyKTtcclxuICAgIHNlYXJjaFJlc3VsdHNMaXN0LmFwcGVuZENoaWxkKGxpKTtcclxufVxyXG5cclxuZXhwb3J0IHsgYnVpbGRWaWRlb0RhdGFDb250YWluZXIgfTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGFwcC9odG1sL3ZpZGVvRGV0YWlsc0NvbnRhaW5lci5qcyIsImNvbnN0IENvbnN0YW50cyA9IHtcclxuICAgIEFQSV9LRVk6ICdBSXphU3lDUjVJbjREWmFUUDZJRVpRMHIxSmNldXZsdUpSelFOTEUnXHJcbn07XHJcblxyXG5leHBvcnQgeyBDb25zdGFudHMgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gYXBwL2NvbnN0YW50cy9jb25zdGFudHMuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtYWluJyk7XHJcbmNvbnN0IFJlc3VsdHNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuXHJcblJlc3VsdENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3NlYXJjaC1yZXN1bHRzJyk7XHJcblJlc3VsdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzZWFyY2gtcmVzdWx0cycpO1xyXG5SZXN1bHRzTGlzdC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Jlc3VsdHMtbGlzdCcpO1xyXG5SZXN1bHRzTGlzdC5jbGFzc0xpc3QuYWRkKCdyZXN1bHRzLWxpc3QnKTtcclxuUmVzdWx0c0xpc3Quc3R5bGUud2lkdGggPSAnNTQ0MHB4JztcclxuXHJcblJlc3VsdENvbnRhaW5lci5hcHBlbmRDaGlsZChSZXN1bHRzTGlzdCk7XHJcblxyXG5leHBvcnQgeyBSZXN1bHRDb250YWluZXIgfTsgXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBhcHAvaHRtbC9yZXN1bHRDb250YWluZXJIdG1sLmpzIiwiY29uc3QgUGFnaW5hdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xyXG5jb25zdCBQYWdpbmF0aW9uQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuXHJcblBhZ2luYXRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9vdGVyJyk7XHJcblBhZ2luYXRpb25CYXIuY2xhc3NMaXN0LmFkZCgncGFnaW5hdGlvbi1iYXInKTtcclxuXHJcblBhZ2luYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoUGFnaW5hdGlvbkJhcik7XHJcblxyXG5leHBvcnQgeyBQYWdpbmF0aW9uQ29udGFpbmVyIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGFwcC9odG1sL3BhZ2luYXRpb25Db250YWluZXJIdG1sLmpzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNiQTtBQUNBOzs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDakVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7Ozs7Ozs7Ozs7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoRkE7QUFDQTtBQURBO0FBQ0E7QUFHQTs7Ozs7O0FDSkE7QUFDQTs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9