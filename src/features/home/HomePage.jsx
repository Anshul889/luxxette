import React, { Component } from 'react'
import TopSellers from './Categories/TopSellers'
import BestOffer from './Categories/BestOffer'
import styles from './HomePage.module.css'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Slideshow from './Slideshow'
import SlideshowD from './Categories/SlideshowD'
import firebase from '../../app/config/firebase.js'

class HomePage extends Component {
  componentDidMount() {
    const messaging = firebase.messaging();
    const sendTokenToServer = firebase
      .app()
      .functions('asia-south1')
      .httpsCallable('pushmessagingtoken');
    Notification
      .requestPermission()
      .then(() => {
        return messaging.getToken()
      })
      .then((token) => {
        return sendTokenToServer({token})
      })
      .then((token) => {
        return console.log(token)
      })
      .catch(() => console.log('error'))
  }
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
            <p>Fashion inspired by where we're from — the sunny shores of California.</p>
            <p>Products provided by PIKO</p>
          </div>
        </div>
        <div className={styles.himher}>
          <div className={styles.her}>
            <div
              className={[
                styles.animated,
                styles.animatedFadeInUp,
                styles.fadeInUp,
              ].join(' ')}
            >
              <h2>Summer 2020</h2>
              <p>
                Dosuere an morci lobortis scelerisque blandit <br />
                cosmopolis de metropolitan.
              </p>
              <Link to='/her'>
                <Button  fluid style={{ textTransform: 'uppercase' }}>
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
                styles.fadeInUp,
              ].join(' ')}
            >
              <h2>Spring 2020</h2>
              <p>
                Dosuere an morci lobortis scelerisque blandit <br />
                cosmopolis de metropolitan.
              </p>
              <Link to='/him'>
                <Button fluid style={{ textTransform: 'uppercase' }}>
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
              <div className={styles.item1}>
                <span>
                  <Link to='/tops'>TOPS</Link>
                </span>
              </div>
              <div className={styles.item2}>
                <span>
                  <Link to='/tunics'>TUNICS</Link>
                </span>
              </div>
              <div className={styles.item3}>
                <span>
                  <Link to='/dress'>DRESSES</Link>
                </span>
              </div>
              <div className={styles.item4}>
                <span>
                  <Link to='/sweatshirts'>SWEATSHIRTS</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
        <TopSellers />
        <BestOffer />
      </div>
    )
  }
}

export default HomePage
