/* eslint-disable @next/next/next-script-for-ga */
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ToastContainer } from 'react-toastify';

import { Inter } from 'next/font/google'
import Script from "next/script";
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
        
  <main className={inter.className}>
    <Component {...pageProps} />
    <ToastContainer />
  </main>
  </>
  )
};

export default api.withTRPC(MyApp);
