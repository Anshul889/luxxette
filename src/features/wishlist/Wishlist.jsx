import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import {
  getUserWishlist,
  removeFromWishlist,
  addToCart
} from "../../features/user/userActions";
import { compose } from "redux";
import styles from "./Wishlist.module.css";
import { Link } from "react-router-dom";
import { Button, Loader } from "semantic-ui-react";
import heart from '../../assets/heart.svg';
import { objectToArray } from '../../app/common/util/helpers';


const mapState = (state, ownProps) => ({
  profile: state.firebase.profile,
  userUid: state.firebase.auth.uid,
  wishlist: state.wishlist,
  auth : state.firebase.auth,
  loading: !state.async.loading
});

const actions = {
  getUserWishlist,
  removeFromWishlist,
  addToCart
};

class Wishlist extends Component {
  async componentDidMount() {
    if (this.props.wishlist && this.props.wishlist.length === 0 && this.props.auth.isLoaded && !this.props.auth.isEmpty) {
      await this.props.getUserWishlist(this.props.userUid);
    }
  }

  render() {
    const { wishlist, removeFromWishlist, addToCart , auth, loading, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    let values = { quantity: 1 };
    const carters= profile.cart && objectToArray(profile.cart);
    if (wishlist && wishlist.length === 0 && loading) {
      return (
        <div>
          <h1 className={styles.heading}>Wishlist</h1>
          <div className={styles.wishempty}>Your wishlist is empty!</div>
        </div>
      );
    }

    if (!loading){
      return (
        <div>
          <h1 className={styles.heading}>Wishlist</h1>
          <div className={styles.wishempty}><Loader active={true} content="Loading" /></div>
        </div>
      );
    }

    if (!authenticated) {
      return (
        <div>
          <h1 className={styles.heading}>Wishlist</h1>
          <div className={styles.wishempty}>Your wislist is empty!</div>
        </div>
      );
    }

    return (
      <div>
        <h1 className={styles.heading}>Wishlist</h1>
        <div className={styles.container}>
          <div className={styles.inner}>
            {wishlist &&
              wishlist.map(product => (
                <div className={styles.product} key={product.id}>
                  <div className={styles.image}>
                    <Link to={`/product/${product.id}`}>
                      <img src={product.photoURL} alt={product.description} loading='lazy'/>
                    </Link>
                  </div>
                  <div className={styles.content}>
                    <div className={styles.title}>
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                    </div>
                    <div className={styles.price}>
                   ${product.price - (product.price * product.discount) / 100}
                    </div>
                  <img
                    alt='dislike'
                    src={heart}
                    onClick={() => removeFromWishlist(product)
                    }
                    
                  />
                
                  {carters && !carters.some(a => a.id === product.id) &&
                    (<div><Button
                      onClick={() => addToCart(product, values)}
                      content={"Add to cart"}
                    />
                    </div>)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(mapState, actions),
  firestoreConnect()
)(Wishlist);
