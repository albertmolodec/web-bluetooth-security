import React from 'react';
import Head from 'next/head';
import NoSsr from '@material-ui/core/NoSsr';

import Footer from '../src/components/Footer';
import Header from '../src/components/Header';

import './layout.css';

const Layout = ({ children, title = 'Фронтенд' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="app">
        <header>
          <Header />
        </header>
        <main>
          <NoSsr>{children}</NoSsr>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
