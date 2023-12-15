/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Button from "~/components/Button";
import styles from "./index.module.css";
import Head from "next/head";
import Header from "~/components/Header";
import { api } from "~/utils/api";
import Image from "next/image";
import background from '../assets/backgroundWhatsapp.webp'
import { useFormik } from 'formik';
import { useState } from "react";
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import TelefoneBrasileiroInput from "react-telefone-brasileiro";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from "zod";
import Textarea from "~/components/Textearea";

export default function Home() {

  const [newLink, setNewLink] = useState<string>();
  const [shortLink, setShortLink] = useState<string>('Carregando...');
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true)
  
  const {mutate: createReference} = api.reference.create.useMutation({
    onSuccess(data) {
      const smallLink = `${window.location.origin}/r/${data.link}`.replace('www.', '');
      setShortLink(smallLink)
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
    void navigator.clipboard.writeText(shortLink ?? '');
      toast.success('Link copiado com sucesso!')
    } catch {
      toast.error('Não foi possível copiar o link. Tente Novamente.')
    }
  }

  function handleShortenNewLink() {
    setNewLink('');
    formik.resetForm()
  }
  
  function validateBrazilianPhoneNumber(phone: string) {
    const numericPhone = phone.replace(/\D/g, '');
  
    return numericPhone.length === 11 && /^[1-9][1-9]/.test(numericPhone);
  }

  const phoneSchema = z.string().refine(validateBrazilianPhoneNumber, {
    message: 'Digite um número de telefone válido!',
  });

    
  
  const formik = useFormik({
    initialValues: {
      phone: '',
      message: '',
    },
    onSubmit: values => {
      try{
        phoneSchema.parse(values.phone);
        try {
          const formattedPhoneNumber = values.phone.replace(/[^0-9]+/g, ''); 
          const message = values.message;
        
          const whatsappLink = `https://api.whatsapp.com/send?phone=55${formattedPhoneNumber}${message ? `&text=${encodeURIComponent(message)}` : ''}`;

          try {
            createNewLink(whatsappLink);
          }catch{}

          setNewLink(whatsappLink);
        } catch {
           
        }
      }catch (e) {
        setIsPhoneValid(false);
        if (e instanceof z.ZodError) {
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
        <title>PersonalizeLink | Link para whatsapp</title>
        <meta name="description" content="Gerador de link do whatsapp. Gere seu link do whatsapp de maneira gratís, rápida e prática! Aqui é possível criar links do whatsapp fáceis de serem compartilhados." />
        <meta name="keywords" content="Gerador de link do whatsapp; Gerador de links; Link whatsapp; whatsapp;"></meta>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

    
        <meta name="og:title" content="Gerar Link Whatsapp" />
        <meta name="og:description" content="Crie grátis seu link de WhatsApp em instantes! Compartilhe nos canais digitais para iniciar conversas em apenas um clique." />
        <meta property="og:url" content="https://www.2link.fun" />
        <meta property="og:site_name" content="Personalize Link" />
        <meta property="og:image" content="https://www.2link.fun/backgroundWhatsapp.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        <link rel="canonical" href="https://www.2link.fun/whatsapp-link" />
      </Head>
      <div className={styles.main}>
        <Header />
        <div className={styles.container}>
          <form onSubmit={formik.handleSubmit} className={styles.contentForm}>
            <h1 className={styles.title}>
              {newLink ? 'Uhull agora você tem um link do whatsapp!' : 'Gerar Link Whatsapp'}</h1>
              <p className={styles.text}>
              {newLink ? 'Agora é só copiar e compartilhar com a galera.' : 
              'Crie grátis seu link de WhatsApp em instantes! Compartilhe nos canais digitais para iniciar conversas em apenas um clique.'}</p>
              {!newLink && (
              <div className={styles.input}>
                <div className={isPhoneValid ? styles.phoneInput : styles.phoneInputError}>
                  <label>Whatsapp*</label>
                  <TelefoneBrasileiroInput
                      value={formik.values.phone}
                      onChange={(event: { target: HTMLInputElement; }) => formik.setFieldValue('phone', event.target.value)}
                      temDDD
                      separaDDD
                      placeholder="Digite o número do whatsapp"
                    />
                    {!isPhoneValid && <span>Telefone inválido.</span>}
                </div>
                <Textarea 
                    type="url"
                    name="message" 
                    label="Mensagem" 
                    placeholder="Escreva o texto da mensagem aqui" 
                    formik={formik} 
                />
              </div>
           )}
            {newLink && (
              <>
              <div className={styles.longLink}>
                <h2 className={styles.titleLink}>Link longo:</h2>
                <Link 
                  id="big-link"
                  href={newLink} 
                  aria-label="Abrir link" 
                  className={styles.textLink}
                  target="_blank"
                >
                  {newLink}
                </Link>
              </div>
            <div className={styles.newLink}>
              <h2 className={styles.titleLink}>Link curto:</h2>
                <div className={styles.content}>
                  <Link 
                    id="small-link"
                    target="_blank"
                    href={shortLink} 
                    aria-label="Abrir link" 
                    className={styles.textNewLink}
                  >
                    {shortLink}
                  </Link>
                  <button id="copiar-link" className={styles.buttonCopy} onClick={() => handleCopy()} type="button">Copiar link</button>
                </div>
                <div className={styles.shortenNewLink}>
                  <Button 
                  text="Gerar um novo link" 
                  type="button" 
                  onClick={handleShortenNewLink}
                  outline={true}
                  />
                  
                </div>
            </div>
            </>
          )}
            <div className={styles.contentButton}>
              {!newLink && (
                <Button id="encurtar-link" text="Gerar link" type="submit" />
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
