import * as React from 'react';
import { memo, useState } from 'react';
import { produce } from 'immer';
import * as AppWithoutContext from './base-without-context';
import * as AppWithContext from './with-context';

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
        <div>
            <h1>With context</h1>
            <AppWithContext.App />
        </div>
    </div>
}