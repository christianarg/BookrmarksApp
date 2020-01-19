import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ConnectedTagsRoot } from "./bookmarks-redux-toolkit";
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducer from './bookmark-slice'

const store = configureStore({ reducer: reducer });

export class App extends React.Component{
    render() {
        return (
            <Provider store={store}>
                <ConnectedTagsRoot />
            </Provider>);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


