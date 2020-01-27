import React from 'react';

import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';

import './scss/main.scss'
import './index.scss';
import {App} from './components';

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));