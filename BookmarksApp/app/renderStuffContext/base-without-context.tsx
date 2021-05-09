import * as React from 'react';
import { memo, useState } from 'react';
import { produce } from 'immer';
import { DataWithChild, RenderedAt } from '.';

export function App() {
    const [data, setData] = useState<DataWithChild>({
        text: 'First',
        child: {
            text: 'Second',
            child: {
                text: 'Third'
            }
        }
    });

    const changeFirst = () => {
        const nextData = produce(data, (draft) =>{
            draft.text += "1";
        });
        setData(nextData);
    }

    const changeSecond = () => {
        const nextData = produce(data, (draft) =>{
            draft.child.text += "1";
        });
        setData(nextData);
    }

    const changeThird = () => {
        const nextData = produce(data, (draft) =>{
            draft.child.child.text += "1";
        });
        setData(nextData);
    }

    return <>
        <Child data={data} />
        <button onClick={changeFirst}>Change First</button>
        <button onClick={changeSecond}>Change Second</button>
        <button onClick={changeThird}>Change Third</button>
    </>
}

type ChildProps = { data: DataWithChild; }

const Child = memo((props: ChildProps) => {
    const { text, child } = props.data;

    return <div>
        <div>{text}</div><div><RenderedAt /></div>
        {child && <Child2 data={child} />}
    </div>;
});

const Child2 = memo((props: ChildProps) => {
    const { text, child } = props.data;

    return <div>
        <div>{text}</div><div><RenderedAt /></div>
        {child && <Child3 data={child} />}
    </div>;
});

const Child3 = memo((props: ChildProps) => {
    const { text, child } = props.data;

    return <div>
        <div>{text}</div><div><RenderedAt /></div>
    </div>;
});