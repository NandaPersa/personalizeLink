import React from 'react';
import { useEffect, useState } from 'react';
import { api } from '~/utils/api';

interface Props {
    hash: string
}

const Redirect = ({hash}: Props) => {
    const [redirect, setRedirect] = useState(true);
    const convertedData = hash ? api.reference.convert.useQuery({ referenceHash: hash  }) : null

    useEffect(() => {
        if (convertedData?.data?.success && convertedData.data?.origin) {
            window.location.href = convertedData.data?.origin
        } else {
            setRedirect(false);
        }
    }, [hash, convertedData]);

    return redirect ? null : <div></div>;
}

export default Redirect;