import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import styles from './Layout.module.css';
import { Footer } from '../Footer/Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className={styles.pageContainer}>{children}</main>
      <Footer />
    </>
  );
};
