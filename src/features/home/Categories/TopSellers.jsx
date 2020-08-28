import React, { Component } from "react";
import styles from "./TopSellers.module.css";
import { Link } from "react-router-dom";
import { getTopSellersForHomepage } from "./TopSellersActions";
import { connect } from "react-redux";
import { Placeholder} from "semantic-ui-react";
import "react-lazy-load-image-component/src/effects/blur.css";

const mapState = state => ({
  TopSellers: state.TopSellers,
  TopSellersloading: state.async.loading
});

const actions = {
  getTopSellersForHomepage
};

class TopSellers extends Component {
  async componentDidMount() {
    if (this.props.TopSellers && this.props.TopSellers.length === 0) {
      this.props.getTopSellersForHomepage();
    }
  }

  render() {
    const { TopSellers } = this.props;
    if (TopSellers.length === 0) {
      return (
        <div className={styles.container}>
          <h3>TopSellers</h3>
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
        <h3>Top Sellers</h3>
        <div className={styles.inner}>
          {TopSellers &&
            TopSellers.map(product => (
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
                    ${" "}{Math.round(product.price - (product.price * product.discount) / 100)}
                      
                    </Link>
                    <br />
                    {product.discount > 0 &&<span style={{ color :'green'}}>{product.discount}% OFF </span>}
                  </div>
                </div>
              </div>
            ))}
            <div></div>
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(TopSellers);
