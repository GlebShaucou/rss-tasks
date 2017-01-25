import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router';

import App from './components/App.react.js';

const Sections = ["TODO", "InProgress", "Testing", "Done"];

const Tasks = [
    {
        title: "Task1",
        description: "Short description lorem ipsum",
        uniqKey: "dsfsdf24324",
        status: 0
    },

    {
        title: "Task23",
        description: "Short description lorem ipsum",
        uniqKey: "dsfsdf24df24",
        status: 0
    },

    {
        title: "Task88",
        description: "Short description lorem ipsum",
        uniqKey: "dsfsdf2hfh24",
        status: 0
    },

    {
        title: "Task2",
        description: "Short description lorem ipsum",
        uniqKey: "dsfsdffsfs4324",
        status: 1
    },

    {
        title: "Task3",
        description: "Short description lorem ipsum",
        uniqKey: "dsfsdf24324fdf",
        status: 2
    },

    {
        title: "Task33",
        description: "Short description lorem ipsum",
        uniqKey: "dsfsdf2432fsaf4",
        status: 2
    },

    {
        title: "Task4",
        description: "Short description lorem ipsum",
        uniqKey: "dsfsdf24324fsfr3",
        status: 3
    }
];

ReactDOM.render((
        <App sections={Sections} data={Tasks} />
    ),
    document.querySelector('#app')
);
