import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tags } from './bookmarks/bookrmarks';

class App extends React.Component{
    render() {
        return (<Tags />);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
