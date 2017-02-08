'use strict';

const Container = require('./components/container.js');
const Controller = require('./controller');

document.addEventListener("DOMContentLoaded", function() {
    const container = Container();
    document.body.appendChild(container);
    Controller.initialize();
});


