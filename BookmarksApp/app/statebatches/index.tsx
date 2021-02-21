import * as React from 'react';
import { useState } from 'react';

async function someAsync() {
    return new Promise<string>((resolve) => resolve("Hola 3"));
}

type SomeState = {
    foo: string;
}
class StateBatchingSamplesClassComponent extends React.Component<{}, SomeState>{
    state: SomeState = { foo: '' }

    componentDidMount() {
        // setState are NOT batched because we are NOT on a react event handler
        this.setState({ foo: 'Hola' });
        this.setState({ foo: 'Hola que hace' });
    }

    onClick = () => {
        // setState are batched becase we are on a react event handler
        this.setState({ foo: 'Hola 2' });
        this.setState({ foo: 'Hola que hace2' });
    }

    onClickAsync = async () => {
        const result = await someAsync();
        // setState are NOT batched because we are NOT on a react event handler. 
        // remember, after the await it's syntas sugar for someAsync().then() => {/*we are not in the react handler anymore */ })
        this.setState({ foo: result });
        this.setState({ foo: result + 'que hace' });
    }

    render() {
        console.log('render StateBatchingSamplesClassComponent');
        return (<>
            <h2>With Class Component</h2>
            <div>{this.state.foo}</div>
            <button onClick={this.onClick}>Click</button>
            <button onClick={this.onClickAsync}>Async Click</button>
        </>)
    }
}

function StateBatchingSamplesHooks() {
    const [foo, setFoo] = useState('');

    const onClick = () => {
        // setState are batched becase we are on a react event handler
        setFoo('Hola 2');
        setFoo('Hola que hace2');
    }

    const onClickAsync = async () => {
        const result = await someAsync();
        // setState are NOT batched because we are NOT on a react event handler. 
        // remember, after the await it's syntas sugar for someAsync().then() => {/*we are not in the react handler anymore */ })
        setFoo(result);
        setFoo(result + 'que hace');
    }


    console.log('render StateBatchingSamplesHooks');
    return (<>
        <h2>With Hooks</h2>
        <div>{foo}</div>
        <button onClick={onClick}>Click</button>
        <button onClick={onClickAsync}>Async Click</button>
    </>);
}

export type StateBatchedState = {
    type: string;
}
// more infor about batching https://github.com/facebook/react/issues/14259
export default class StateBatched extends React.Component {
    state: StateBatchedState = { type: '' }
    render() {

        return (<>
            <StateBatchingSamplesClassComponent />
            <StateBatchingSamplesHooks />
        </>);
    }
}