/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Button from "~/components/Button";
import styles from "./index.module.css";
import Head from "next/head";
import Header from "~/components/Header";
import TextField from "~/components/TextField";
import { api } from "~/utils/api";
import Image from "next/image";
import background from '../assets/backgroundEncLink.svg'
import { useFormik } from 'formik';
import { useState } from "react";
import Link from "next/link";
import linkIcon from '~/assets/Link.svg'

export default function Home() {

  const [newLink, setNewLink] = useState<string>();
  const {mutate: createReference} = api.reference.create.useMutation({
    onSuccess(data) {
      console.log(data);
      setNewLink(`${window.location.href}r/${data.link}`)
    },
  });

  function createNewLink(link: string) {
    console.log('função')
    createReference({ origin: link});
  }

  function handleCopy() {
    void navigator.clipboard.writeText(newLink ?? '');
  }

  
  const formik = useFormik({
    initialValues: {
      longLink: '',
    },
    onSubmit: values => {
      try {
        console.log('formik')
      createNewLink(values.longLink)
      } catch (e) {
        console.log(e);
      }
    },
  });


  return (
    <>
      <Head>
        <title>PersonalizeLink | Home</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Header />
        <div className={styles.container}>
          <form onSubmit={formik.handleSubmit} className={styles.contentForm}>
            <h1 className={styles.title}>Encurtador de link</h1>
            <p className={styles.text}>Crie grátis seu link de WhatsApp em instantes! Compartilhe no canais digitais para iniciar 
              conversas em apenas um clique.</p>
              {!newLink && (
              <div className={styles.input}>
                <TextField 
                name="longLink" 
                label="*Seu link longo:" 
                placeholder="Cole o link aqui" 
                formik={formik} 
                />
              </div>
           )}
            {newLink && (
              <>
              <div className={styles.longLink}>
                <h2 className={styles.titleLink}>Link longo:</h2>
                <Link href={formik.values.longLink} aria-label="Abrir link longo" className={styles.textLink}>{formik.values.longLink}</Link>
              </div>
            <div className={styles.newLink}>
            <h2 className={styles.titleLink}>Link curto:</h2>
              <div className={styles.content}>
                <Link href={newLink} aria-label="Abrir link curto" className={styles.textNewLink}>{newLink}</Link>
                <button className={styles.buttonCopy} onClick={() => handleCopy()} type="button">Copiar link</button>
              </div>
              
            </div>
            </>
          )}
            <div className={styles.contentButton}>
              {!newLink && (
            <Button text="Encurtar link" type="submit" />
            )}
           
            </div>
          </form>
          <div className={styles.contentImage}>
            <Image className={styles.img} src={background} alt="background personalize link"  />
            </div>
        </div>
      </div>
    </>
  );
}
