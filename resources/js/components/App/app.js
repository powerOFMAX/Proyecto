import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/data';

import Main  from './main';
import NavBar from './navbar';

import { BrowserRouter as Router } from 'react-router-dom';

function configureStore(initialState) {

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}

const store = configureStore();

const App = () => (
    <div>
        <NavBar/>
        <Main/>
    </div>
);

render(
    <Provider store = {store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('app') 
);
