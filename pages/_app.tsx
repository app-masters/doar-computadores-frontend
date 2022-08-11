import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/globals';
import { defaultTheme } from '../styles/themes/default';
import 'react-toastify/dist/ReactToastify.min.css';
import { Layout } from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Layout>
          <Component {...pageProps} />
          <GlobalStyle />
          <ToastContainer
            className="impact-toast"
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
          />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
