import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './posts/post';

import App from './index';

const store = configureStore();

render(
    <Provider store = {store}>
        <App/>
    </Provider>,
    document.getElementById('app') 
);
