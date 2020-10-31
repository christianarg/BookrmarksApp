import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { TagsRoot } from './bookmarks-mobx';
import { BookmarksStore, store } from './model-mobx';

export const StoreContext = React.createContext<BookmarksStore>(null);

class App extends React.Component {
    render() {
        return (<StoreContext.Provider value={store}><TagsRoot /></StoreContext.Provider>);
    }
}
ReactDOM.render(<App />, document.getElementById('root'));