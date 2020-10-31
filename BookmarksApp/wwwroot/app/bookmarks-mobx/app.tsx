import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { TagsRoot } from './bookmarks-mobx';
import { store } from './model-mobx';



class App extends React.Component {
    render() {
        return (<TagsRoot store={store} />);
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
