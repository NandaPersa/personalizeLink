/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { api } from '~/utils/api';
import logo from '~/assets/logo.svg';
import styles from './redirect.module.css';

interface Props {
  hash: string;
}

const Redirect = ({ hash }: Props) => {
  const convertedData = hash ? api.reference.convert.useQuery({ referenceHash: hash }) : null;
  const router = useRouter();

  useEffect(() => {
    if (convertedData?.data && convertedData?.data?.success && convertedData.data?.origin) {
      window.location.href = convertedData.data.origin;
    } else if (convertedData?.data && convertedData?.data?.success === false) {
      router.push('/404');
    }
  }, [hash, convertedData, router]);

  return (
    <>
      <Head>
        <title>Redirecionando... | PersonalizeLink</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.card}>
          <Image src={logo} alt="PersonalizeLink" height={40} width={200} priority className={styles.logo} />
          <div className={styles.spinner} />
          <h2 className={styles.title}>Redirecionando você...</h2>
          <p className={styles.subtitle}>Aguarde um instante, estamos conectando ao seu destino com segurança.</p>
        </div>
      </div>
    </>
  );
};

export default Redirect;