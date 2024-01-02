/* eslint-disable @next/next/next-script-for-ga */
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ToastContainer } from 'react-toastify';

import { Inter } from 'next/font/google'
import Script from "next/script";
import Head from "next/head";
const inter = Inter({
  subsets: ['latin'],
  display: "swap",
  
})

const MyApp: AppType = ({ Component, pageProps }) => {
  
  return (
    <>
    <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM}`} />
    <Script
    id='tagManager'
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTM}');
    `,
    }}
  />

  <Head>
    <meta name="robots" content="all" />
  </Head>

   <Script
    id='teste'
    type="text/javascript"
    dangerouslySetInnerHTML={{
      __html: ` (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "k7xx2pq5fb");
    `,
    }}
  />
        
  <main className={inter.className}>
    <Component {...pageProps} />
    <ToastContainer />
  </main>
  </>
  )
};

export default api.withTRPC(MyApp);
