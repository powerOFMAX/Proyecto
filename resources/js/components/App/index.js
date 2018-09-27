import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../../rootReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import Main  from '../App/components/Main';
import NavBar from '../App/components/Nav';
import Footer from '../App/components/Footer';

import { BrowserRouter as Router } from 'react-router-dom';

//React Alert 
import { Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";

//instalando el redux-devtools-extension
const enhancer = composeWithDevTools(
    applyMiddleware(thunk)
);

function configureStore(initialState = {}) {
    return createStore(
        rootReducers,
        initialState,
        enhancer
    );
}

const store = configureStore();


if(process.env.NODE_ENV === 'development'){
    window.store = store
    store.subscribe(()=> window.store = store)
}

const App = () => (
    <div id="wrapper">
        <NavBar/>
        <Main/>
        <Footer/>
    </div>
);

const options = {
    timeout: 5000,
    position: "bottom center"
  };

render(
    <AlertProvider template={AlertTemplate} {...options}>
        <Provider store = {store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    </AlertProvider>,
    document.getElementById('app') 
);
