import React, { Component } from 'react';
import { withFirebase } from 'react-redux-firebase';
import { Link, withRouter } from 'react-router-dom';
import { openModal } from '../../modals/modalActions';
import { connect } from 'react-redux';

import home from '../../../assets/icons/home.svg';
import wishlisticon from '../../../assets/icons/heart.svg';
import shoppingCart from '../../../assets/icons/shopping-cart.svg';
import about from '../../../assets/icons/about.svg';
import styles from './NavBar.module.css';
import logo from '../../../assets/logo.webp';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { objectToArray } from '../../../app/common/util/helpers';

const actions = {
  openModal
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  cart : objectToArray(state.firebase.profile.cart),
});

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal('LoginModal');
  };

  handleSignout = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  };

  render() {
    const { auth, profile, cart } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const totalQuantity = cart && cart.length !== 0 && cart.map(item => item.quantity).reduce((prev, next) => prev + next);
    return (
      <div className={styles.Navigation}>
        <div className={styles.dnavigation}>
          <Link to='/' className={styles.logo}>
            <img className={styles.imglogo} src={logo} alt='logo' />
          </Link>
          <ul className={styles.leftdnav}>
            <li className={styles.dItem}>
              <Link to='/products'>Products</Link>
            </li>
            <li className={styles.dItem}>
              <Link to='/wishlist'>Wishlist</Link>
            </li>
           
          </ul>
          <ul className={styles.rightdnav}>
          {authenticated &&
            <li className={styles.dItem}>
            <Link to='/cart'>Cart {totalQuantity > 0 &&<span>({totalQuantity}) </span>}</Link>
          </li>}
          {authenticated ? (
            <SignedInMenu profile={profile} signOut={this.handleSignOut} auth={auth}/>
          ) : (
            <SignedOutMenu signIn={this.handleSignIn} />
          )}
          </ul>
        </div>
        <div className={styles.MobileNav}>
          <Link className={styles.mItem} to='/'>
            <img className={styles.mnavimg} src={home} alt='logo' />
            <div className={styles.mText}>Home</div>
          </Link>
          <Link className={styles.mItem} to='/products'>
            <img className={styles.mnavimg} src={about} alt='logo' />
            <div className={styles.mText}>Products</div>
          </Link>
          <Link className={styles.mItem} to='/wishlist'>
            <img className={styles.mnavimg} src={wishlisticon} alt='logo' />
            <div className={styles.mText}>Wishlist</div>
          </Link>
          <Link className={styles.mItem} to='/cart'>
            <img className={styles.mnavimg} src={shoppingCart} alt='cart' />
            <div className={styles.mText}>Cart {totalQuantity > 0 &&<span className={styles.badge}>{totalQuantity}</span>}</div>
          </Link>
          {authenticated ? (
            <SignedInMenu profile={profile} signOut={this.handleSignOut} auth={auth}/>
          ) : (
            <SignedOutMenu signIn={this.handleSignIn} />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(
  withFirebase(
    connect(
      mapState,
      actions
    )(NavBar)
  )
);
