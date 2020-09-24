import React from 'react';
import styles from './Footer.module.css';
import mpesalogo from '../../assets/mpesalogo.png';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.sec1}>
        <p>© 2020 LUXETTE CARICODE STORE DEMO.<br/> ECOMMERCE SOFTWARE BY CARICODE.</p>
      </div>
      <div className={styles.sec2}>
        <h3>Contact Us</h3>
        <p>info@caricode.com</p>
      </div>
      <div className={styles.info}>
        <h3>Information</h3>
        <div className={styles.infodiv}>Privacy Policy</div>
        <div className={styles.infodiv}>FAQ's</div>
      </div>
      <div className={styles.copyright}>
        <img src={mpesalogo} alt='mpesa logo' />
        <p>© 2020 caricode.com</p>
        <p>All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer