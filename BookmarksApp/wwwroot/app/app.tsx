import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TagsRoot } from './bookmarks/bookmarks';

class App extends React.Component{
    render() {
        return (<TagsRoot />);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
