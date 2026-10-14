import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import animationData from '~/assets/lotties/BISXCbEZLm.json';
import styles from './404.module.css';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Button from '~/components/Button';
import useScreenSize from '~/hooks/resize';
import { House } from '@phosphor-icons/react';

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

const PageNotFound = () => {
  const router = useRouter();
  const { isMobile } = useScreenSize();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleRedirectToHome = () => {
    void router.push('/');
  };

  return (
    <>
      <Head>
        <title>PersonalizeLink | Página Não Encontrada (404)</title>
      </Head>

      <div className={styles.pageWrapper}>
        <Header />

        <main className={styles.main}>
          <div className={styles.card}>
            <div className={styles.animation}>
              <Lottie
                options={defaultOptions}
                width={isMobile ? 260 : 380}
                height={isMobile ? 180 : 260}
              />
            </div>

            <span className={styles.badge}>Erro 404</span>
            <h1 className={styles.title}>Ooooops... Página Não Encontrada</h1>
            <p className={styles.text}>
              Parece que o caminho ou link encurtado que você está procurando não existe, foi
              removido ou não está mais acessível.
            </p>

            <div className={styles.actions}>
              <Button
                size="lg"
                leftIcon={<House size={18} weight="fill" />}
                onClick={handleRedirectToHome}
              >
                Voltar para a Página Inicial
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PageNotFound;