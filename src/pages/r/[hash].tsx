import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { api } from '~/utils/api';

const RedirectPage: React.FC = () => {
    const router = useRouter()
    const [redirect, setRedirect] = useState(true);

    const convertedData = api.reference.convert.useQuery({ referenceHash: router.query.hash as string });

    useEffect(() => {
        if (convertedData.data?.success && convertedData.data?.origin) {
            window.location.href = convertedData.data?.origin
        } else {
            setRedirect(false);
        }
    }, [router.query.hash, convertedData]);



    return redirect ? null : <div />;
}

export default RedirectPage;