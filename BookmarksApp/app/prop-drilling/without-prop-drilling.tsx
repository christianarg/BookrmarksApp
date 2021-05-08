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

const UserLicenseChecker = (props: UserLicenseCheckerProps) => {
    const { license, onLicenseCheck } = props;

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedLicense = { ...license, checked: e.target.checked };
        onLicenseCheck(updatedLicense);
    }

    return <input id="license-check" type="checkbox" checked={license.checked} onChange={handleCheck} style={{ verticalAlign: 'middle' }} />
}

type UserLicenseRowProps = {
    license: License;
}
const UserLicenseRow = (props: React.PropsWithChildren<UserLicenseRowProps>) => {
    const { license, children } = props;

    return <div key={license.name}>
        {children}
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

    const licensesList = licenses?.map(license => {
        return <UserLicenseRow key={license.name} license={license}>
            <UserLicenseChecker license={license} onLicenseCheck={handleLicenseCheck} />
        </UserLicenseRow>
    });

    return licenses && <div>{licensesList}</div>
}
