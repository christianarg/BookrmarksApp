import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from "mobx-react-lite";

import { sampleBookrmarks, TagsRoot } from './bookmarks-mobx';
import { BookmarksStore } from './model-mobx';

var store = new BookmarksStore();
store.tags = sampleBookrmarks;

const TagsRootNew = observer((props: { store: BookmarksStore }) =>{
    const firstTag = props.store.tags[0];
    return (<div>
        <span>First tag: {firstTag.name}</span>
        <span onClick={() => props.store.coso()} >Change</span>
    </div>)
    });


class App extends React.Component {
    render() {
        return (<TagsRootNew store={store} />);
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
