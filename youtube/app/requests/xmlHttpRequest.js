import { buildVideoDataContainer } from '../html/videoDetailsContainer';
import { Constants } from '../constants/constants.js';
import { buildPagination } from '../events/buildPagination';
import { correctResultListWidth } from '../helpers/helpers.js'

const Tokens = {
    query: '',
    nextPageToken: '',
    prevPageToken: ''
};

function requestData(obj) {
    let xhr = new XMLHttpRequest();
    let url;

    Tokens.query = obj.query;
    url = generateSearchListURL(obj.query, obj.nextPageToken);

    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText);
            Tokens.nextPageToken = response.nextPageToken;
            Tokens.prevPageToken = response.prevPageToken;
            
            onSearchResponse(response);
        } 
    };

    xhr.send();
}

function generateSearchListURL(query, nextPageToken) {    
    const baseUrl = 'https://www.googleapis.com/youtube/v3/search';
    const part = 'snippet';
    const type = 'video';
    const maxResults = 15;
    const q = encodeURIComponent(query);

    if (nextPageToken) {
        return `${baseUrl}?key=${Constants.API_KEY}&type=${type}&part=${part}&pageToken=${nextPageToken}&maxResults=${maxResults}&q=${q}`; 
    }

    return `${baseUrl}?key=${Constants.API_KEY}&type=${type}&part=${part}&maxResults=${maxResults}&q=${q}`;
}

function onSearchResponse(response) {
    parseResponseToDisplay(response);
}

function parseResponseToDisplay(response) {
    const listOfVideosData = [];
    const listOfVideosId = [];
    const queryResults = response.items;

    for (let i = 0; i < queryResults.length; i++) {
        let currentVideo = queryResults[i].snippet;
        let videoId = queryResults[i].id.videoId;
        let videoDataToDisplay = {
            title: currentVideo.title,
            preview: currentVideo.thumbnails.medium.url,
            description: currentVideo.description,
            author: currentVideo.channelTitle,
            pubDate: new Date(currentVideo.publishedAt),
            viewCount: 0,
            videoLink: `https://www.youtube.com/watch?v=${videoId}`
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
    let xhr = new XMLHttpRequest();
    let url;

    url = generateVideoStatURL(obj.ids);

    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText);
             
            onVideoStatisticResponse({
                response: response, 
                videos: obj.videos
            });
        } 
    };

    xhr.send();
}

function generateVideoStatURL(ids) {
    let baseUrl = 'https://www.googleapis.com/youtube/v3/videos';
    let part = 'snippet, statistics';
    let id = ids.join(',');

    return `${baseUrl}?key=${Constants.API_KEY}&part=${part}&id=${id}`;
}

function onVideoStatisticResponse(obj) {
    let data = obj.response.items;
    let videos = obj.videos;

    for (let i = 0; i < data.length; i++) {
        videos[i].viewCount = data[i].statistics.viewCount;
    }

    showSearchResults(videos);
}

function showSearchResults(data) {
    correctResultListWidth();

    for (let i = 0; i < data.length; i++) {
        buildVideoDataContainer(data[i]);
    }

    buildPagination();
}

export { requestData, Tokens };
