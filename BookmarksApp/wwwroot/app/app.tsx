import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Bookmarks } from './bookmarks/bookrmarks';

class App extends React.Component{
    render() {
        debugger;
        return (<Bookmarks />);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
