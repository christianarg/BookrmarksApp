import * as React from 'react';
import * as WithPropDrilling from './with-prop-drilling';
import * as WithoutPropDrilling from './without-prop-drilling';


export const App = () => {
    return <div>
        <h1>Prop drilling samples</h1>
        <div>
            <h2>With Prop drilling</h2>
            <WithPropDrilling.UserLiceses />
        </div>
        <div>
            <h2>Without Prop drilling</h2>
            <WithoutPropDrilling.UserLiceses />
        </div>
    </div>
}


