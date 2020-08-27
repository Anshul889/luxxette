import React, { Component } from "react";
import { connect } from "react-redux";
import { getBeauty } from "./BeautyActions";
import styles from "./Beauty.module.css";
import { Link } from "react-router-dom";
import { Placeholder, Button } from "semantic-ui-react";

const mapState = state => ({
  beauty: state.beauty
});

const actions = {
  getBeauty
};

class Beauty extends Component {
  state = {
    products: [],
    sortedByPrice: '',
    sortedByName: ''
  };

  filterAsc = () => {
    let filteredProducts = this.state.products.sort(function(a, b){
      var x = a.price;
      var y = b.price;
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
    this.setState({products: filteredProducts, sortedByPrice: 'priceLow'})
  }

  filterDsc = () => {
    let filteredProducts = this.state.products.sort(function(a, b){
      var x = a.price;
      var y = b.price;
      if (x < y) {return 1;}
      if (x > y) {return -1;}
      return 0;
    });
    this.setState({products: filteredProducts, sortedByPrice: 'priceHigh'})
  }

  filterNameAsc = () => {
    let filteredProducts = this.state.products.sort(function(a, b){
      var x = a.title.toLowerCase();
      var y = b.title.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
    this.setState({products: filteredProducts, sortedByName: 'ZtoA'})
  }

  filterNameDsc = () => {
    let filteredProducts = this.state.products.sort(function(a, b){
      var x = a.title.toLowerCase();
      var y = b.title.toLowerCase();
      if (x < y) {return 1;}
      if (x > y) {return -1;}
      return 0;
    });
    this.setState({products: filteredProducts, sortedByName: 'AtoZ'})
  }

  async componentDidMount() {
    await this.props.getBeauty();
    this.setState({ products: this.props.beauty });
  }

  render() {
    const { products, sortedByPrice, sortedByName } = this.state;
    if (products.length === 0) {
      return (
        <div className={styles.beauty}>
          <h1 className={styles.heading}>Dresses</h1>
          <div className={styles.container}>
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
        </div>
      );
    }
    return (
      <div className={styles.beauty}>
        <h1 className={styles.heading}>Dresses</h1>
        <div className={styles.filter}>
            <div><Button color={'black'} active={sortedByPrice==='lowestPrice'} onClick={this.filterAsc}>Lowest Price</Button></div>
            <div><Button color={'black'} active={sortedByPrice ==='highestPrice'} onClick={this.filterDsc}>Highest Price</Button></div>
            {(sortedByName ==='ZtoA') && <div><Button color={'black'} onClick={this.filterNameDsc}>Name</Button></div>}
            {(sortedByName === '' || sortedByName ==='AtoZ') && <div><Button color={'black'} onClick={this.filterNameAsc}>Name</Button></div>}
          </div>
        <div className={styles.container}>
          <div className={styles.inner}>
            {products &&
              products.map(product => (
                <div className={styles.product} key={product.id}>
                  <div className={styles.image}>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.photoURL}
                        alt={product.title}
                        loading={"lazy"}
                      />
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
                          <strike>Rs {product.price}</strike>
                        </span>
                      )}
                      <Link to={`/product/${product.id}`}>
                      Rs{" "}{Math.round(product.price -
                          (product.price * product.discount) / 100)}
                        
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
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(Beauty);
