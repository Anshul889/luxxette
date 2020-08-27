import React from 'react';
import styles from './SignedOutMenu.module.css';
import user from '../../../assets/icons/user-circle.svg'

const SignedOutMenu = ({ signIn }) => {
  return (
    <div
      className={styles.glogin}
      onClick={signIn}
      style={{ cursor: 'pointer' }}>
      <img className={styles.mnavimgout} src={user} alt='user'/>
      <div className={styles.authOuttext}>Login</div>
    </div>
  );
};

export default SignedOutMenu;
