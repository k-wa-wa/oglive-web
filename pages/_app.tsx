import { UserProvider } from '@auth0/nextjs-auth0';
import { AppProps } from "next/app";
import Head from 'next/head';
import { useRouter } from "next/router";
import { useState } from "react";
import { SWRConfig } from "swr";
import Footer from "@/components/Global/Footer";
import Header from '@/components/Global/Header/Header';
import ToPageTopButton from "@/components/Utils/ToPageTopBtn";
import styles from "@/components/_app.module.scss";
import { ThemeContext, themes } from "@/modules/theme-context";

import "modern-css-reset/dist/reset.min.css";
import "@/styles/global.scss";

const liveVolumeRegex = /^vol[1-9][0-9]$/;

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { liveVolume } = router.query;

  const [theme, setTheme] = useState(themes.light);
  const toggleTheme = () => {
    setTheme(theme.name === "light" ? themes.dark : themes.light);
  };
  const style = {
    background: theme.background,
    color: theme.text,
  };

  return (
    <UserProvider>
      <div className={styles.root} style={style}>
        <Head>
          <title>Unplugged Over-Generation Live</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <SWRConfig value={{ refreshInterval: 20 * 1000 }}>

            <Header />
            <ToPageTopButton />

            <div className={styles.bodyWrapper}>
              <div className={styles.body} style={{ backgroundColor: theme.foreground }}>
                {String(liveVolume).match(liveVolumeRegex) || typeof liveVolume === "undefined"
                  ?
                  <Component {...pageProps} />
                  :
                  <div>404</div>}
              </div>
            </div>

            <Footer />

          </SWRConfig>
        </ThemeContext.Provider>
      </div>
    </UserProvider>
  );
};

export default App;