import React from 'react';
import styles from './Footer2.module.css';

const Footer2 = ({ total }) => {
  return (
    <footer className={styles.footer2}>
      <div className={styles.container}>
        <p>Total Price: {total.toFixed(2)}</p>
      </div>
    </footer>
  );
};

export default Footer2;
