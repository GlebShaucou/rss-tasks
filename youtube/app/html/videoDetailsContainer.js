function buildVideoDataContainer(obj) {
    const searchResultsList = document.querySelector('#results-list');
    const li = document.createElement('li');
    const videoContainer = document.createElement('div');
    const videoThumb = document.createElement('img');
    const propList = document.createElement('ul');
    const videoDescr = document.createElement('p');
    const linkTitle = document.createElement('a');
    const listItems = [];
    const FontIcons = [];
    const spans = [];
    let date = obj.pubDate;

    videoContainer.classList.add('video-details');
    videoThumb.classList.add('video-thumb');
    videoThumb.setAttribute('src', obj.preview);
    videoThumb.setAttribute('alt', 'Video Thumbnail');
    propList.classList.add('video-props-list');
    videoDescr.classList.add('video-descr');

    for (let i = 0; i < 4; i++) {
        let li = document.createElement('li');
        listItems.push(li);
    }

    for (let i = 0; i < 5; i++) {
        let FontIcon = document.createElement('i');
        FontIcon.classList.add('fa');
        FontIcon.setAttribute('aria-hidden', 'true');
        FontIcons.push(FontIcon);
    }

    for (let i = 0; i < 3; i++) {
        let span = document.createElement('span');
        spans.push(span);
    }

    linkTitle.classList.add('video-title');
    linkTitle.setAttribute('href', obj.videoLink);
    // linkTitle.setAttribute('target', '_blank');
    linkTitle.textContent = ` ${obj.title}`;

    FontIcons[0].classList.add('fa-link');
    FontIcons[1].classList.add('fa-eye');
    FontIcons[2].classList.add('fa-calendar-check-o');
    FontIcons[3].classList.add('fa-user');
    // FontIcons[4].classList.add('fa-comment'); // should be in p paragraph

    spans[0].classList.add('video-view-count');
    spans[0].textContent = ` ${obj.viewCount}`;
    spans[1].classList.add('video-pubdate');
    spans[1].textContent = ` ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    spans[2].classList.add('video-author');
    spans[2].textContent = ` ${obj.author}`;

    listItems[0].appendChild(FontIcons[0]);
    listItems[0].appendChild(linkTitle);

    listItems[1].appendChild(FontIcons[1]);
    listItems[1].appendChild(spans[0]);

    listItems[2].appendChild(FontIcons[2]);
    listItems[2].appendChild(spans[1]);

    listItems[3].appendChild(FontIcons[3]);
    listItems[3].appendChild(spans[2]);

    for (let i = 0; i < listItems.length; i++) {
        propList.appendChild(listItems[i]);
    }

    videoDescr.textContent = obj.description;

    videoContainer.appendChild(videoThumb);
    videoContainer.appendChild(propList);
    videoContainer.appendChild(videoDescr);

    li.appendChild(videoContainer);
    searchResultsList.appendChild(li);
}

export { buildVideoDataContainer };
