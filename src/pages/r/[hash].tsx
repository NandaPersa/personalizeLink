import { useRouter } from 'next/router';
import React from 'react';
import Redirect from '~/components/Redirect';

const RedirectPage: React.FC = () => {
    const router = useRouter()

    return router.query?.hash ? <Redirect hash={router.query.hash as string} /> : null;
}

export default RedirectPage;