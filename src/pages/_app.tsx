import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ToastContainer } from 'react-toastify';

import { Inter } from 'next/font/google'
const inter = Inter({
  subsets: ['latin'],
  display: "swap",
  
})

const MyApp: AppType = ({ Component, pageProps }) => {
  
  return (
  <main className={inter.className}>
    <Component {...pageProps} />
    <ToastContainer />
  </main>
  )
};

export default api.withTRPC(MyApp);
