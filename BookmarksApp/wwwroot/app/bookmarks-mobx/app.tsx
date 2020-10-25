import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { sampleBookrmarks, TagsRootNew } from './bookmarks-mobx';
import { BookmarksStore } from './model-mobx';

const store = new BookmarksStore();
store.tags = sampleBookrmarks;


class App extends React.Component {
    render() {
        return (<TagsRootNew store={store} />);
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
