import styles from './Navbar.module.css';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <div className={styles.containerDiv}>
      <div className='flex-start-div'>
        <Link href='/' passHref>
          <p style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <img src='/logo.png' alt='Logo' className={styles.logo} />
          </p>
        </Link>
        <Link href='/reviews' className={styles.navLink} passHref>
          <p>Reviews</p>
        </Link>
        <Link href='/posts' className={styles.navLink} passHref>
          <p>Blog</p>
        </Link>
      </div>
      <div className={styles.iconContainerDiv}>
        {/* <ThemeToggle /> */}
        THEME SWITCHER
      </div>
    </div>
  );
};
