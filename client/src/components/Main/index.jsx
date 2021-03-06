import React from 'react';

import Footer from '../Footer';
import Header from '../Header';

import './styles.css';

const Main = ({ children }) => {
  return (
    <>
      <div className="app">
        <header>
          <Header />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Main;
