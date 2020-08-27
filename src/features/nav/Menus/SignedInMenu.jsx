import React from 'react'
import styles from './SignedOutMenu.module.css'
import {Link} from 'react-router-dom';
import userCircle from '../../../assets/icons/user-circle.svg'

const SignedInMenu = ({signedIn, profile, auth}) => {
  return (
    <Link className={styles.glogin} to={`/profile/${auth.uid}`} style={{ cursor: 'pointer'}}>
          <img className={styles.mnavimg} src={profile.photoURL || userCircle} alt="profile" />
          <div className={styles.authtext} >
            Profile
          </div>
        </Link>
  )
}

export default SignedInMenu
