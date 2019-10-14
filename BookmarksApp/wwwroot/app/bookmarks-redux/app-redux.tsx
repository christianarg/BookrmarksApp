import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ConnectedTagsRoot } from "./tagsRoot";
import { createStore } from 'redux'
import { bookmarkApp } from './reducers';
import { Provider } from 'react-redux'
const store = createStore(bookmarkApp);

export class App extends React.Component{
    render() {
        return (
            <Provider store={store}>
                <ConnectedTagsRoot />
            </Provider>);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


