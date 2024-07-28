import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import styles from './Layout.module.css';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className={styles.pageContainer}>{children}</main>
    </>
  );
};
