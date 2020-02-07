// core
import React from 'react';

//library
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

// components
import {App} from './components';
import { store } from './init/store';


// styles
import './assets/scss/main.scss'
import './index.scss';



ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));