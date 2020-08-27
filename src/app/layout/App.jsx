import React, { Component, Fragment } from 'react';
import NavBar from '../../features/nav/NavBar/NavBar';
import { Route, Switch, withRouter } from 'react-router-dom';
import ModalManager from '../../features/modals/ModalManager';
import HomePage from '../../features/home/HomePage';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import ProductDashBoard from '../../features/product/ProductDashBoard/ProductDashBoard';
import ProductDetailedPage from '../../features/product/ProductDetailedPage/ProductDetailedPage';
import Cart from '../../features/cart/Cart';
import Wishlist from '../../features/wishlist/Wishlist';
import { Footer } from '../../features/footer/Footer';
import Beauty from '../../features/product/Beauty/Beauty';
import Jewellery from '../../features/product/Jewellery/Jewellery';
import Bags from '../../features/product/Bags/Bags';
import Register from '../../features/auth/Login/Register';
import Orders from '../../features/orders/Orders';
import NotifyPeople from '../../features/notifypeople/NotifyPeople';

class App extends Component {
  render() {
    return (
      <Fragment>
      <ModalManager /> 
       <NavBar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/profile/:id' component={UserDetailedPage} />
          <Route exact path='/products' component={ProductDashBoard} />
          <Route exact path='/product/:id' component={ProductDetailedPage} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/wishlist' component={Wishlist} />
          <Route exact path='/dress' component={Beauty}/>
          <Route exact path='/tops' component={Jewellery}/>
          <Route exact path='/tunics' component={Bags}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/orders789' component={Orders}/>
          <Route exact path='/notifypeople' component={NotifyPeople} />
        </Switch>
        <Footer />
      </Fragment>
      
    );
  }
}
export default withRouter(App);
