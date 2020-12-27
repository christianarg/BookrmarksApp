import * as React from 'react';
import { TagsRoot } from './bookmarks-mobx';
import { BookmarksStore, store } from './model-mobx';

export const StoreContext = React.createContext<BookmarksStore>(null);

export class App extends React.Component {
    render() {
        return (<StoreContext.Provider value={store}><TagsRoot /></StoreContext.Provider>);
    }
}