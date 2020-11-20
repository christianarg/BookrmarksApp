import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MasterComponent } from './render-stuff';

class App extends React.Component {
    render() {
        return (<div><MasterComponent /></div>);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));