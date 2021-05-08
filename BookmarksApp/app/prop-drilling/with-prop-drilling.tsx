import * as React from 'react';
import { useEffect, useState } from 'react';

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

type UserLicenseCheckerProps = {
    license: License;
    onLicenseCheck: (license: License) => void;
}

const UserLicenseChecker = (props: UserLicenseCheckerProps ) =>{
    const { license, onLicenseCheck } = props;
    
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedLicense = { ...license, checked: e.target.checked };
        onLicenseCheck(updatedLicense);
    }

    return <input id="license-check" type="checkbox" checked={license.checked} onChange={handleCheck} style={{ verticalAlign: 'middle' }} />
}

type UserLicenseRowProps = {
    license: License;
    onLicenseCheck: (license: License) => void;
}
const UserLicenseRow = (props: UserLicenseRowProps) => {
    const { license, onLicenseCheck } = props;

    return <div key={license.name}>
        <UserLicenseChecker license={license} onLicenseCheck={onLicenseCheck}  />
        <label htmlFor="license-check">{license.name}</label>
    </div>;
}

export const UserLiceses = () => {
    const [licenses, setLicenses] = useState<License[]>(null);

    useEffect(() => {
        const fetch = async () => {
            const licenses = await getLicense();
            setLicenses(licenses);
        }
        fetch();
    }, []);

    const handleLicenseCheck = (license: License) => {
        const updatedLicenses = licenses.map(x => x.name == license.name ? license : x);
        setLicenses(updatedLicenses);
    }

    const licensesList = licenses?.map(license => <UserLicenseRow key={license.name} license={license} onLicenseCheck={handleLicenseCheck} />);

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