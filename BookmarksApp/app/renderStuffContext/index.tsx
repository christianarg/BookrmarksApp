import * as React from 'react';
import { memo, useState } from 'react';
import { produce } from 'immer';

type DataWithChild = {
    text: string;
    child?: DataWithChild;
}



type AppState = {

}

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

    return <>
        <Child data={data} />
        <button onClick={changeFirst}>Change First</button>
    </>
}

type ChildProps = { data: DataWithChild; }

const Child = memo((props: ChildProps) => {
    const { text, child } = props.data;

    return <div>
        <span>{text}</span><span>rendered at: {new Date().toTimeString()}</span>
        {child && <Child data={child} />}
    </div>;
});


