import * as React from 'react';
import * as ReactDOM from 'react-dom';


type CounterProps = {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

export default class Counter extends React.Component<CounterProps> {
    incrementIfOdd = () => {
        if (this.props.value % 2 == 0) {
            this.props.onIncrement();
        }
    }

    incrementAsync = () => {
        setTimeout(this.props.onIncrement, 100);
    }

    render() {
        const { value, onIncrement, onDecrement } = this.props
        return (
            <p>
                Clicked: {value} times
        {' '}
                <button onClick={onIncrement}>
                    +
        </button>
                {' '}
                <button onClick={onDecrement}>
                    -
        </button>
                {' '}
                <button onClick={this.incrementIfOdd}>
                    Increment if odd
        </button>
                {' '}
                <button onClick={this.incrementAsync}>
                    Increment async
        </button>
            </p>
        )
    }
}
