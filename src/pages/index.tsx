/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Button from "~/components/Button";
import styles from "./index.module.css";
import Head from "next/head";
import Header from "~/components/Header";
import TextField from "~/components/TextField";
import { api } from "~/utils/api";
import Image from "next/image";
import background from '../assets/backgroundEncLink.png'
import { useFormik } from 'formik';
import { useState } from "react";
import Link from "next/link";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from "zod";

export default function Home() {

  const [newLink, setNewLink] = useState<string>();
  const [isLinkValid, setIsLinkValid] = useState<boolean>(true)
  
  const {mutate: createReference} = api.reference.create.useMutation({
    onSuccess(data) {
      const smallLink = `${window.location.href}r/${data.link}`.replace('www.', '');
      setNewLink(smallLink)
    },
    onError() {
      toast.error('Não foi possível criar link curto. Tente novamente')
    }
  });

  function createNewLink(link: string) {
    createReference({ origin: link});
  }


  function handleCopy() {
    try{
    void navigator.clipboard.writeText(newLink ?? '');
      toast.success('Link copiado com sucesso!')
    } catch {
      toast.error('Não foi possível copiar o link. Tente Novamente.')
    }
  }

  function handleShortenNewLink() {
    setNewLink('');
    formik.resetForm()
    
  }

  const linkSchema = z.string().refine(value => {
    return value.startsWith('http://') || value.startsWith('https://');
  }, {
    message: 'Digite um link válido começando com http:// ou https://',
  });

  
  const formik = useFormik({
    initialValues: {
      longLink: '',
    },
    onSubmit: values => {
      try {
        linkSchema.parse(values.longLink);
        try {
          setIsLinkValid(true);
          createNewLink(values.longLink);
        } catch (e) {
          toast.error('Não foi possível criar link curto. Tente novamente')
        }
      } catch (e) {
        if (e instanceof z.ZodError) {
          setIsLinkValid(false);
          const error = JSON.parse(e.message)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
          toast.error(error[0].message)
        } 
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
            <h1 className={styles.title}>
              {newLink ? 'Uhull agora você tem um link curto!' : 'Encurtador de link'}</h1>
            <p className={styles.text}>
              {newLink ? 'Agora é só copiar e compartilhar com a galera.' : 
              'Encurte seu link de maneira grátis, rápida e prática! Aqui é possível criar links curtos e fáceis de serem compartilhados.'}</p>
              {!newLink && (
              <div className={styles.input}>
                <TextField 
                  type="url"
                  name="longLink" 
                  label="*Seu link longo:" 
                  placeholder="Cole o link aqui" 
                  formik={formik} 
                  isLinkValid={isLinkValid}
                />
              </div>
           )}
            {newLink && (
              <>
              <div className={styles.longLink}>
                <h2 className={styles.titleLink}>Link longo:</h2>
                <Link 
                  id="big-link"
                  href={formik.values.longLink} 
                  aria-label="Abrir link longo" 
                  className={styles.textLink}
                  target="_blank"
                >
                  {formik.values.longLink}
                </Link>
              </div>
            <div className={styles.newLink}>
            <h2 className={styles.titleLink}>Link curto:</h2>
              <div className={styles.content}>
                <Link 
                  id="small-link"
                  target="_blank"
                  href={newLink} 
                  aria-label="Abrir link curto" 
                  className={styles.textNewLink}
                >
                  {newLink}
                </Link>
                <button id="copiar-link" className={styles.buttonCopy} onClick={() => handleCopy()} type="button">Copiar link</button>
              </div>
              <div className={styles.shortenNewLink}>
              <Button 
              text="Encurtar um novo link" 
              type="button" 
              onClick={handleShortenNewLink} />
              </div>
            </div>
            </>
          )}
            <div className={styles.contentButton}>
              {!newLink && (
            <Button id="encurtar-link" text="Encurtar link" type="submit" />
            )}
           
            </div>
          </form>
          <div className={styles.contentImage}>
            <Image className={styles.img} src={background} loading="lazy" alt="background personalize link"  />
            <div className={styles.textImage}>
              <h2>É fácil,</h2>
              <h2>É prático,</h2>
              <h2>e rápido!</h2>
            </div>
            </div>
        </div>
      </div>
    </>
  );
}
