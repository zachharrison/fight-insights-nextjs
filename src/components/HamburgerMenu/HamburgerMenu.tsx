import React, { useState } from 'react';
import styles from './HamburgerMenu.module.css';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.hamburgerMenu}>
      <button className={styles.hamburger} onClick={toggleMenu}>
        <span className={isOpen ? styles.lineOpen : styles.line}></span>
        <span className={isOpen ? styles.lineOpen : styles.line}></span>
        <span className={isOpen ? styles.lineOpen : styles.line}></span>
      </button>
      <nav className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
        <ul>
          <li>
            <a onClick={closeMenu} href='/reviews'>
              Reviews
            </a>
          </li>
          <li>
            <a onClick={closeMenu} href='/posts'>
              Blog
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
