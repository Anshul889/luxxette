import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import styles from "./UserDetailedPage.module.css";
import format from "date-fns/format";
import UserAddressForm from "./UserAddressForm";
import UserAddressFormTwo from "./UserAddressFormTwo";
import {
  removeNewAddress,
  removeNewAddressTwo,
  getOrderHistory
} from "../userActions";
import { objectToArray } from "../../../app/common/util/helpers";
import { Link } from "react-router-dom";
import userCircle from '../../../assets/icons/user-circle.svg'

const mapState = (state, ownProps) => ({
  profile: state.firebase.profile,
  orders: state.user
});

const actions = {
  removeNewAddress,
  removeNewAddressTwo,
  getOrderHistory
};

class UserDetailedPage extends Component {
  state = {
    isAddressOneOpen: false,
    isAddressTwoOpen: false
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };

  closeFormOne = () => {
    this.setState({ isAddressOneOpen: false });
  };

  closeFormTwo = () => {
    this.setState({ isAddressTwoOpen: false });
  };

  componentDidMount() {
    this.props.getOrderHistory();
  }

  render() {
    const {
      profile,
      removeNewAddressTwo,
      removeNewAddress,
      orders
    } = this.props;
    let createdAt;
    if (profile.createdAt) {
      createdAt = format(profile.createdAt.toDate(), "do LLL yyyy");
    }
    return (
      <React.Fragment>
        <h1 className={styles.heading}>Your Profile</h1>
        <div className={styles.container}>
          <div className={styles.profileimage}>
            <img src={profile.photoURL || userCircle} alt="profile" />
            <div className={styles.displayname}>{profile.displayName}</div>
            <div className={styles.membersince}>
              Member Since: <strong>{createdAt}</strong>
            </div>
            <div className={styles.refcode}>Share code: {profile.refcode} for a 10% discount on your next purchase</div>
          </div>
          <Button color={'black'}onClick={this.handleSignOut}>Logout</Button>
        </div>
        {profile.newAddress && (
          <div className={styles.address1}>
            <h3>Address:</h3>
            <div
              className={styles.editbutton}
              onClick={() =>
                this.setState({
                  isAddressOneOpen: !this.state.isAddressOneOpen,
                  isAddressTwoOpen: false
                })
              }
            >
              edit
            </div>
            <div className={styles.addressshow}>
              <div>Street: {profile.newAddress.Address}</div>
              <div>City: {profile.newAddress.City}</div>
              <div>Postal Code: {profile.newAddress.postcode}</div>
            </div>
            <div className={styles.deletebutton} onClick={removeNewAddress}>
              delete
            </div>
          </div>
        )}

        {profile.newAddressTwo && (
          <div className={styles.address1}>
            <h3>Address 2:</h3>
            <div
              className={styles.editbutton}
              onClick={() =>
                this.setState({
                  isAddressOneOpen: false,
                  isAddressTwoOpen: !this.state.isAddressTwoOpen
                })
              }
            >
              edit
            </div>
            <div className={styles.addressshow}>
              <div>Street: {profile.newAddressTwo.Address}</div>
              <div>City: {profile.newAddressTwo.City}</div>
              <div>Postal Code: {profile.newAddressTwo.postcode}</div>
            </div>
            <div className={styles.deletebutton} onClick={removeNewAddressTwo}>
              delete
            </div>
          </div>
        )}
        <div style={{ width: "90%", margin: "20px auto", maxWidth: "1080px" }}>
          {profile.newAddress ? null : (
            <Button
              color={'black'}
              onClick={() =>
                this.setState({
                  isAddressOneOpen: !this.state.isAddressOneOpen,
                  isAddressTwoOpen: false
                })
              }
              size="tiny"
              content={"Add Address 1"}
            />
          )}

          {profile.newAddressTwo ? null : (
            <Button
            color={'black'}
              onClick={() =>
                this.setState({
                  isAddressTwoOpen: !this.state.isAddressTwoOpen,
                  isAddressOneOpen: false
                })
              }
              size="tiny"
              content={"Add Address 2"}
            />
          )}
        </div>
        {this.state.isAddressOneOpen && (
          <UserAddressForm closeForm={this.closeFormOne} />
        )}
        {this.state.isAddressTwoOpen && (
          <UserAddressFormTwo closeForm={this.closeFormTwo} />
        )}
        <div className={styles.orderhistory}>Order History</div>
        {orders &&
          orders.map(order => (
            <div className={styles.order} key={order.id}>
              <div>
                <div>${order.price}</div>
                <div>status : {order.status}</div>
                <div>{format(order.time.toDate(), "do LLL yyyy")}</div>
              </div>
              <div className={styles.productcolumn}>
                {objectToArray(order.products).map(product => (
                  <div key={product.id}>
                    <div>
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                    </div>
                    <div>quantity: {product.quantity}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </React.Fragment>
    );
  }
}

export default withRouter(
  withFirebase(connect(mapState, actions)(UserDetailedPage))
);
