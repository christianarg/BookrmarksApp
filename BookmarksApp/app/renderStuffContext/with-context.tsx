import * as React from 'react';
import { memo, useContext, useState } from 'react';
import { produce } from 'immer';
import { DataWithChild, RenderedAt } from '.';

const DataContext = React.createContext<DataWithChild>(null);

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
        const nextData = produce(data, (draft) => {
            draft.text += "1";
        });
        setData(nextData);
    }

    const changeSecond = () => {
        const nextData = produce(data, (draft) => {
            draft.child.text += "1";
        });
        setData(nextData);
    }

    const changeThird = () => {
        const nextData = produce(data, (draft) => {
            draft.child.child.text += "1";
        });
        setData(nextData);
    }

    return <>
        <DataContext.Provider value={data}>
            <Child />
            <button onClick={changeFirst}>Change First</button>
            <button onClick={changeSecond}>Change Second</button>
            <button onClick={changeThird}>Change Third</button>
        </DataContext.Provider>
    </>
}

const Child = () => {
    const contextData = useContext(DataContext);

    const { text, child } = contextData;

    return <div>
        <div>{text}</div><div><RenderedAt /></div>
        {child && <Child2 />}
    </div>;
}


const Child2 = () => {
    const contextData = useContext(DataContext);

    const { text, child } = contextData.child;

    return <div>
        <div>{text}</div><div><RenderedAt /></div>
        {child && <Child3 />}
    </div>;
}


const Child3 = () => {
    const contextData = useContext(DataContext);

    const { text } = contextData.child.child;

    return <div>
        <div>{text}</div><div><RenderedAt /></div>
    </div>;
}
