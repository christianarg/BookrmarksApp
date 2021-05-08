import * as React from 'react';
import { useEffect, useState } from 'react';


export const App = () => {
    return <div>
        <h1>Prop drilling samples</h1>
        <UserLiceses />
    </div>
}

// simulate ajax call
const getLicense = () => {
    const licenses: License[] = [
        { name: 'exchage online', checked: false },
        { name: 'office e1', checked: false },
    ]
    return Promise.resolve(licenses);
}

type License = {
    name: string;
    checked: boolean;
}

const UserLicenseRow = (props: { license: License }) => {
    const license = props.license;
    return <div key={license.name}>
        <input id="license-check" type="checkbox" checked={license.checked} style={{ verticalAlign: 'middle' }} />
        <label htmlFor="license-check">{license.name}</label>
    </div>;
}

const UserLiceses = () => {
    const [licenses, setLicenses] = useState<License[]>(null);

    useEffect(() => {
        const fetch = async () => {
            const licenses = await getLicense();
            setLicenses(licenses);
        }
        fetch();
    }, []);

    const licensesList = licenses?.map(license => <UserLicenseRow key={license.name} license={license} />);

    return licenses && <div>{licensesList}</div>
}

// type UserLicensesClassState = { licenses: License[] }
// class UserLicensesClass extends React.Component<{}, UserLicensesClassState> {
//     state: UserLicensesClassState = { licenses: null }
//     async componentDidMount() {
//         const licenses = await getLicense();
//         this.setState({ licenses: licenses });
//     }
//     render() {
//         return this.state.licenses && <div>Licenses :)</div>
//     }
// }