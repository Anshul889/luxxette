import React, { Component, Fragment, lazy, Suspense } from 'react'
import NavBar from '../../features/nav/NavBar/NavBar'
import { Route, Switch, withRouter } from 'react-router-dom'
import ModalManager from '../../features/modals/ModalManager'
import HomePage from '../../features/home/HomePage'
import ProductDetailedPage from '../../features/product/ProductDetailedPage/ProductDetailedPage'

const UserDetailedPage = lazy(() =>
  import('../../features/user/UserDetailed/UserDetailedPage')
)
const ProductDashBoard = lazy(() =>
  import('../../features/product/ProductDashBoard/ProductDashBoard')
)

const Cart = lazy(() => import('../../features/cart/Cart'))
const Wishlist = lazy(() => import('../../features/wishlist/Wishlist'))
const Beauty = lazy(() => import('../../features/product/Beauty/Beauty'))
const Jewellery = lazy(() =>
  import('../../features/product/Jewellery/Jewellery')
)
const Bags = lazy(() => import('../../features/product/Bags/Bags'))
const Register = lazy(() => import('../../features/auth/Login/Register'))
const Orders = lazy(() => import('../../features/orders/Orders'))
const Complete = lazy(() => import('../../features/complete/Complete'))
const NotifyPeople = lazy(() =>
  import('../../features/notifypeople/NotifyPeople')
)
const Footer = lazy(
  () =>
    new Promise((resolve, reject) =>
      setTimeout(() => resolve(import('../../features/footer/Footer')), 2000)
    )
)

const renderLoader = () => <p>Loading</p>

class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager />
        <NavBar />
        <Switch>
          <Suspense fallback={renderLoader()}>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/profile/:id' component={UserDetailedPage} />
            <Route exact path='/products' component={ProductDashBoard} />
            <Route exact path='/product/:id' component={ProductDetailedPage} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/wishlist' component={Wishlist} />
            <Route exact path='/dress' component={Beauty} />
            <Route exact path='/tops' component={Jewellery} />
            <Route exact path='/tunics' component={Bags} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/orders' component={Orders} />
            <Route exact path='/complete' component={Complete} />
            <Route exact path='/notifypeople' component={NotifyPeople} />
          </Suspense>
        </Switch>
        <Suspense fallback={renderLoader()}>
          <Footer />
        </Suspense>
      </Fragment>
    )
  }
}
export default withRouter(App)
