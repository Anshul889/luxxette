import React, { Component } from 'react';
import styles from './ProductListItem.module.css';
import { Link } from 'react-router-dom';

class ProductListItem extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className={styles.product}>
        <div className={styles.image}>
          <Link to={`/product/${product.id}`}>
            <img src={product.photoURL} alt={product.title} loading='lazy' />
          </Link>
        </div>
        <div className={styles.content}>
                    <div className={styles.title}>
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                    </div>
                    <div className={styles.price}>
                      {product.discount > 0 && (
                        <span
                          style={{
                            paddingRight: "5px",
                            fontWeight: "100",
                            color: "gray"
                          }}
                        >
                          <strike>{product.price} KSH</strike>
                        </span>
                      )}
                      <Link to={`/product/${product.id}`}>
                        {Math.round(product.price -
                          (product.price * product.discount) / 100)}{" "}
                        KSH
                      </Link>
                      <br />
                      {product.discount > 0 && (
                        <span
                          className={styles.blink}
                          style={{ color: "green" }}
                        >
                          {product.discount}% OFF{" "}
                        </span>
                      )}
                    </div>
                  </div>
      </div>
    );
  }
}

export default ProductListItem;
