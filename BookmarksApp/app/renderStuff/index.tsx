import * as React from 'react';
import * as NoPureClone from './nopure+clone';
import * as PureClone from './pure+clone';
import * as NoPureConcreteModify from './nopure+concrete-modify';
import * as PureConcreteModify from './pure+concrete-modify';
import * as PureConcreteModifyImmer from './pure+concrete-modify-with-immer';

export class App extends React.Component {
    render() {
        return (<div>
            <div>
                <h1>No Pure Component + Clone: Always re-render</h1>
                <NoPureClone.MasterComponent />
            </div>
            <div>
                <h1>Pure Component + Clone: Always re-render</h1>
                <PureClone.MasterComponent />
            </div>
            <div>
                <h1>No Pure Component + Concrete Modify: Always re-render</h1>
                <NoPureConcreteModify.MasterComponent />
            </div>
            <div>
                <h1>Pure Component + Concrete Modify: Rerender only modified</h1>
                <PureConcreteModify.MasterComponent />
            </div>
            <div>
                <h1>Pure Component + Concrete Modify with Immer: Rerender only modified</h1>
                <PureConcreteModifyImmer.MasterComponent />
            </div>
        </div>);
    }
}
