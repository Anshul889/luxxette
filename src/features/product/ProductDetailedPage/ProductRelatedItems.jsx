import React, { Component } from 'react'
import { connect } from "react-redux";
import { getRelatedItems } from "../productActions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./ProductRelatedItems.module.css";
import { Link } from "react-router-dom";

const mapState = (state) => ({
  relatedItems: state.relatedItems
});

const actions = {
  getRelatedItems
};

class ProductRelatedItems extends Component {
  
  async componentDidMount() {
    
      this.props.getRelatedItems(this.props.product);
   
  }

  render() {
    const { relatedItems } = this.props;
    return (
      <div className={styles.container}>
        <h3>Recommended items</h3>
        <div className={styles.inner}>
          {relatedItems &&
            relatedItems.map(product => (
              <div className={styles.product} key={product.id}>
                <div className={styles.image}>
                  <Link to={`/product/${product.id}`}>
                    <LazyLoadImage
                      alt={product.title}
                      src={product.photoURL}
                      width="100%"
                      effect="blur"
                    />
                  </Link>
                </div>
                <div className={styles.content}>
                  <h3>
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(ProductRelatedItems);
