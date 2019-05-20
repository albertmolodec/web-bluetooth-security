import React from 'react';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import './layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app">
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
