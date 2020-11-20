import * as React from 'react';

export function RenderChivato(props: { phase?: string }) {
    return <>
        <div>renderTime : {new Date().toISOString()}</div>
        {props.phase && <div>phase: {props.phase}</div>}
    </>
}