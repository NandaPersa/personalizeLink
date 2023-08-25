import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const MyApp: AppType = ({ Component, pageProps }) => {
  
  return (
  <main className={inter.className}>
    <Component {...pageProps} />
  </main>
  )
};

export default api.withTRPC(MyApp);
