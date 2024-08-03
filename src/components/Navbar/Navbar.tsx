import styles from './Navbar.module.css';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <div className={styles.containerDiv}>
      <div className='flex-start-container'>
        <Link href='/' passHref>
          <p style={{ cursor: 'pointer' }}>
            <img src='/logo.png' alt='Logo' className={styles.logo} />
          </p>
        </Link>
        <Link href='/reviews' className={styles.navLink} passHref>
          <p className='text-p'>Reviews</p>
        </Link>
        <Link href='/posts' className={styles.navLink} passHref>
          <p className='text-p'>Blog</p>
        </Link>
      </div>
      <div className={styles.iconContainerDiv}>
        {/* <ThemeToggle /> */}

        <div style={{ fontSize: 'var(--font-size-x-small)' }}>
          THEME SWITCHER{' '}
        </div>
      </div>
    </div>
  );
};
