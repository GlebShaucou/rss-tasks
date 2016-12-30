function requestData() {
    let xhr = new XMLHttpRequest();

    let url = createURL('javascript');

    xhr.open('GET', url, true);

    xhr.send();

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
    };
}

function createURL(query) {
    let apiKey = 'AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE';
    let searchList = 'https://www.googleapis.com/youtube/v3/search';
    let part = 'snippet';
    let type = 'video';
    let maxResults = 15;
    // pageToken: nextPageToken: "dsfa" or prevPageToken: "dffsd",
    let q = query;

    return `${searchList}?key=${apiKey}&type=${type}&part=${part}&maxResults=${maxResults}&q=${q}`;
}

requestData();