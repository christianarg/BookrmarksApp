import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ConnectedTagsRoot } from "./bookmarks-redux.toolkit";
import { bookmarkApp } from './reducers';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: bookmarkApp });

export class App extends React.Component{
    render() {
        return (
            <Provider store={store}>
                <ConnectedTagsRoot />
            </Provider>);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


