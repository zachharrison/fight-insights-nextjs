import { EmailInput } from '../EmailInput/EmailInput';
import styles from './Footer.module.css';
import Link from 'next/link';

export const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className={styles.containerDiv}>
      <div className={styles.footerSectionsContainer}>
        <div className={styles.footerSectionContainer}>
          <h1 className={styles.headerH1}>STAY CONNECTED</h1>
          <EmailInput />
          <div className={styles.iconContainerDiv}>
            <a href='https://www.instagram.com/fight_insights/' target='_blank'>
              <img src='/instagram.svg' className={styles.footerIcon} />
            </a>
            <a href='https://www.youtube.com/@fight_insights' target='_blank'>
              <img src='/youtube.svg' className={styles.footerIcon} />
            </a>
          </div>
        </div>

        <div className={styles.footerSectionContainer}>
          <h1 className={styles.headerH1}>NAVIGATE</h1>
          <div className={styles.linksGrid}>
            <Link href='/' className={styles.footerLink}>
              Home
            </Link>
            <Link href='/blog' className={styles.footerLink}>
              Blog
            </Link>
            <Link href='/reviews' className={styles.footerLink}>
              Review
            </Link>
            <Link href='/reviews' className={styles.footerLink}>
              Link
            </Link>
            <Link href='/reviews' className={styles.footerLink}>
              Link
            </Link>
            <Link href='/reviews' className={styles.footerLink}>
              Link
            </Link>
            <Link href='/reviews' className={styles.footerLink}>
              Link
            </Link>
            <Link href='/reviews' className={styles.footerLink}>
              Link
            </Link>
          </div>
        </div>
      </div>
      <p className='text-p'>
        Copyright © {date} Fight Insights, Inc. All Rights Reserved.
      </p>
    </div>
  );
};
