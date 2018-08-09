import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './reducers/app';
import Game from './components/Game';

const store = createStore( appReducer );

ReactDOM.render(
    <Provider store={ store }>
        <Game />
    </Provider>,
    document.getElementById( 'app' ),
);
