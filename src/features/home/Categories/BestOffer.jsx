import React, { Component } from 'react';
import styles from './BestOffer.module.css';
import { Link } from 'react-router-dom';
import { getbestOfferForHomepage } from './BestOfferActions';
import { connect } from 'react-redux';
import { Placeholder } from 'semantic-ui-react';

const mapState = state => ({
  bestOffer: state.BestOffer
});

const actions = {
  getbestOfferForHomepage
};

class BestOffer extends Component {
  async componentDidMount() {
    if (this.props.bestOffer && this.props.bestOffer.length === 0) {
      this.props.getbestOfferForHomepage();
    }
  }

  render() {
    const { bestOffer } = this.props;
    if (bestOffer.length === 0) {
      return (
        <div className={styles.container}>
          <h2>Hot Deals</h2>
          <div className={styles.inner}>
            <div className={styles.product}>
              <div className={styles.image}>
                <Placeholder>
                  <Placeholder.Image />
                </Placeholder>
              </div>
            </div>
            <div className={styles.product}>
              <div className={styles.image}>
                <Placeholder>
                  <Placeholder.Image />
                </Placeholder>
              </div>
            </div>
            <div className={styles.product}>
              <div className={styles.image}>
                <Placeholder>
                  <Placeholder.Image />
                </Placeholder>
              </div>
            </div>
            <div className={styles.product}>
              <div className={styles.image}>
                <Placeholder>
                  <Placeholder.Image />
                </Placeholder>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.container}>
        <h2>Hot Deals</h2>
        <div className={styles.inner}>
          {bestOffer &&
            bestOffer.map(product => (
              <div className={styles.product} key={product.id}>
                <Link to={`/product/${product.id}`}>
                    <img src={product.photoURL} alt={product.title} loading='lazy'/>
                </Link>
                <div className={styles.content}>
                  <div className={styles.title}>
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </div>
                  <div className={styles.price}>
                  {product.discount > 0 && (
                      <span style={{ paddingRight: "5px", fontWeight: '100', color: 'gray'}}>
                        <strike>${product.price} </strike>
                      </span>
                    )}
                    <Link to={`/product/${product.id}`}>
                      ${Math.round(product.price - (product.price * product.discount) / 100)}
                      
                    </Link>
                    <br />
                    {product.discount > 0 &&<span className={styles.blink} style={{ color :'green'}}>{product.discount}% OFF </span>}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(BestOffer);
