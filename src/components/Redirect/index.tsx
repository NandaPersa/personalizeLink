import { useRouter } from 'next/navigation';
import React from 'react';
import { useEffect, useState } from 'react';
import { api } from '~/utils/api';

interface Props {
    hash: string
}

const Redirect = ({hash}: Props) => {
    const [redirect, setRedirect] = useState(true);
    const convertedData = hash ? api.reference.convert.useQuery({ referenceHash: hash  }) : null

    const router = useRouter();

    useEffect(() => {
        if (convertedData?.data && convertedData?.data?.success && convertedData.data?.origin) {
            window.location.href = convertedData.data?.origin
        } else if(convertedData?.data){
            setRedirect(false);
            router.push('/404')
        }
    }, [hash, convertedData, router]);

    return redirect ? null : <div></div>;
}

export default Redirect;