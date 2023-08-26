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
        <title>PersonalizeLink | Encurtador de links</title>
        <meta name="description" content="Encurtador de links e urls. Encurte seu link de maneira gratís, rápida e prática! Aqui é possível criar links curtos e fáceis de serem compartilhados." />
        <meta name="keywords" content="Encurtador de url; Encurtador de links; Deixar link curto; Criar link curto;"></meta>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className={styles.main}>
        <Header />
        <div className={styles.container}>
          <form onSubmit={formik.handleSubmit} className={styles.contentForm}>
            <h1 className={styles.title}>Encurtador de link</h1>
            <p className={styles.text}>Encurte seu link de maneira gratís, rápida e prática! Aqui é possível criar links curtos e fáceis de serem compartilhados.</p>
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
            <Image className={styles.img} src={background} loading="lazy" alt="background personalize link"  />
            </div>
        </div>
      </div>
    </>
  );
}
