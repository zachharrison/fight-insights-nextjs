import React from 'react';
import styles from './EmailInput.module.css';

export const EmailInput = () => {
  return (
    <div className={styles.inputContainer}>
      <input
        type='email'
        placeholder='Enter your email'
        className={styles.emailInput}
      />
      <button className={styles.subscribeButton}>Subscribe</button>
    </div>
  );
};
