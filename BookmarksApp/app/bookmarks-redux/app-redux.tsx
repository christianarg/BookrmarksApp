﻿import * as React from 'react';
import { ConnectedTagsRoot } from "./bookmarks-redux";
import { createStore } from 'redux'
import { bookmarkApp } from './reducers';
import { Provider } from 'react-redux'
const store = createStore(bookmarkApp);

export class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedTagsRoot />
            </Provider>);
    }
}