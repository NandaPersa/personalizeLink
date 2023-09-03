/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '~/assets/lotties/BISXCbEZLm.json';
import styles from './404.module.css'
import Header from '~/components/Header';
import Button from '~/components/Button';
import { useRouter } from 'next/router';
import useScreenSize from '~/hooks/resize';
import Head from 'next/head';


const pageNotFound = () => {
  const router = useRouter();
  const {isMobile} = useScreenSize();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
  };

  const handleRedirectToHome = () => {
    void router.push('/')
  }

  return (
    <>
      <Head>
        <title>PersonalizeLink | 404</title>
      </Head>
      <div className={styles.wrapper}>
          <Header />
      <div className={styles.animation}>
        <Lottie 
          options={defaultOptions}
          width={isMobile ? 270 : 450}
          height={isMobile  ? 200 : 300}
        />
      </div>
      <h1>Ooooops...</h1>
      <h2>Parece que o caminho que você está procurando não existe ou não está mais acessível.</h2>
      <div className={styles.contentButton}>
      <Button text='Voltar para Home' type='button' onClick={handleRedirectToHome}/>
      </div>
      </div>
    </>
  )
}

export default pageNotFound;