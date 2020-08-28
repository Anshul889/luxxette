import React, { Component } from "react";
import TopSellers from "./Categories/TopSellers";
import BestOffer from "./Categories/BestOffer";
import styles from "./HomePage.module.css";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Slideshow from "./Slideshow";
import SlideshowD from "./Categories/SlideshowD";

class HomePage extends Component {
  render() {
    return (
      <div>
        <div className={styles.bannerm}>
          <Slideshow />
        </div>
        <div className={styles.bannerd}>
          <SlideshowD />
        </div>
        <div className={styles.savings}>
          <div className={styles.innersavings}>
          <h1>Summer Savings</h1>
          <p>Save an additional 10% on all clearance items</p>
          <Button color={"black"}content={'Shop now'}/>
          </div>
        </div>
        <div className={styles.himher}>
          <div className={styles.her}>
            <div
              className={[
                styles.animated,
                styles.animatedFadeInUp,
                styles.fadeInUp
              ].join(" ")}
            >
              <h2>Summer 2020</h2>
              <p>
                Dosuere an morci lobortis scelerisque blandit <br />
                cosmopolis de metropolitan.
              </p>
              <Link to="/her">
                <Button fluid style={{ textTransform: "uppercase" }}>
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles.him}>
            <div
              className={[
                styles.animated,
                styles.animatedFadeInUp,
                styles.fadeInUp
              ].join(" ")}
            >
              <h2>Spring 2020</h2>
              <p>
                Dosuere an morci lobortis scelerisque blandit <br />
                cosmopolis de metropolitan.
              </p>
              <Link to="/him">
                <Button color={'white'} fluid style={{ textTransform: "uppercase" }}>
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.shopby}>
          <div className={styles.innershopby}>
            <h3>Shop By</h3>
            <div className={styles.categories}>
              <div className={styles.item1}><span><Link to="/tops">TOPS</Link></span></div>
              <div className={styles.item2}><span><Link to="/tunics">TUNICS</Link></span></div>
              <div className={styles.item3}><span><Link to="/dress">DRESSES</Link></span></div>
              <div className={styles.item4}><span><Link to="/sweatshirts">SWEATSHIRTS</Link></span></div>
            </div>
          </div>
        </div>
        <TopSellers />
        <BestOffer />
      </div>
    );
  }
}

export default HomePage;
