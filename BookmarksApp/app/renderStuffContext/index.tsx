import * as React from 'react';
import { memo, useState } from 'react';
import { produce } from 'immer';
import * as AppWithoutContext from './base-without-context';

export type DataWithChild = {
    text: string;
    child?: DataWithChild;
}

export const RenderedAt = () =>{
    return <>rendered at: {new Date().toISOString()}</>
}

export function App() {
    return <div>
        <div>
            <h1>Base without context</h1>
            <AppWithoutContext.App />
        </div>
    </div>
}

type ChildProps = { data: DataWithChild; }

const Child = memo((props: ChildProps) => {
    const { text, child } = props.data;

    return <div>
        <div>{text}</div><div>rendered at: {new Date().toTimeString()}</div>
        {child && <Child data={child} />}
    </div>;
});


