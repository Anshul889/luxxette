import React, { Component } from "react";
import ProductListItem from "./ProductListItem";
import styles from "./ProductList.module.css";
import { Link } from "react-router-dom";

class ProductList extends Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        <div
            style={{
              color: "black",
              fontWeight: "700",
              marginBottom: "10px",
              textTransform: "uppercase",
              textAlign:'center'
            }}
          >
            Categories
          </div>
        <div className={styles.filter}>
          
          <div>
            <Link to='/tops'>Tops</Link>
          </div>
          <div>
            <Link to='/tunics'>Tunics</Link>
          </div>
          <div>
            <Link to='/dress'>Dresses</Link>
          </div>
        </div>

        <div className={styles.container}>
          {products &&
            products.map(product => (
              <ProductListItem key={product.id} product={product} />
            ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
