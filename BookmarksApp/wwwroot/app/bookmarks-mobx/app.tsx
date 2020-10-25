import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { TagsRootNew } from './bookmarks-mobx';
import { store } from './model-mobx';



class App extends React.Component {
    render() {
        return (<TagsRootNew store={store} />);
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
