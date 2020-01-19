import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ConnectedTagsRoot } from "./bookmarks-redux-toolkit";
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducer, { recieveState, sampleState, addBookmark} from './bookmark-slice'

const store = configureStore({ reducer: reducer });

export class App extends React.Component {
    componentDidMount() {
        // Estado inicial de pruebas (aqui habría que hacer un fetch)
        store.dispatch(recieveState({ newState: sampleState }));
    }
    render() {
        return (
            <Provider store={store}>
                <ConnectedTagsRoot />
            </Provider>);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


