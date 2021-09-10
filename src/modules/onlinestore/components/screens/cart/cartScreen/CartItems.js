/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, ScrollView, Dimensions, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { CheckBox, Icon } from "react-native-elements";
import _ from "lodash";
import EmptyCart from "./EmptyCartScreen";
import CartList from "./CartItemList";
import PlaceOrderFromPreview from './PlaceOrderFromPreview';
import PlaceOrderCartList from "./PlaceOrderCartList";
import OrderSummary from "./CartOrderSummary";
import Resources from "__src/resources";
import styles from "../../../../styles.css"
const { Color } = Resources;
import { Colors } from 'react-native-paper';
var { height, width } = Dimensions.get('window');

class CartItems extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalOrders: 0,
      totalPrice: 0,
    }
  }

  // componentDidUpdate(prevProps) {
  //   const { actions, onlinestore: { setSelectedItems, setInputDetails, getCartList } } = this.props;
  //   const product = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
  //   if (!_.isEqual(prevProps.onlinestore.getCartList, getCartList)) {
  //     let toPlace = {};
  //     _.filter(getCartList, cart => {
  //       if (cart.prod_id === product.id) {
  //         toPlace[cart.id] = cart;
  //       }
  //     })
  //     const newInput = _.merge({}, setInputDetails);
  //     newInput.placeOrder = toPlace;
  //     actions.setInputDetails(newInput);
  //     console.log("componentDidUpdate", toPlace);
  //   }
  // }

  countCartFunc = (cartCount) => {
    this.setState({ totalOrders: cartCount })
  }

  countTotalPrice = (total) => {
    this.setState({ totalPrice: total })
  }

  render() {
    const { navigation, onlinestore: { getCartList, setInputDetails } } = this.props;
    const CartListUI = setInputDetails.isFromPreviewProducts ? <PlaceOrderFromPreview countTotalPrice={this.countTotalPrice} countCartFunc={this.countCartFunc} onlinestore={this.props.onlinestore} /> :
      setInputDetails.isPlaceOrderShowing ?
        <PlaceOrderCartList countCartFunc={this.countCartFunc} {...this.props} /> :
        <CartList {...this.props} />
    return (
      _.isEmpty(getCartList) || _.isUndefined(getCartList) ? <EmptyCart {...this.props} /> :
        <ScrollView style={{ paddingHorizontal: 20, marginTop: 5, backgroundColor: Color.bg }}>
          <View style={{ marginTop: 20 }}>
            <View>
              <Text style={styles.homelatestProducts}>{setInputDetails.isPlaceOrderShowing || setInputDetails.isFromPreviewProducts ?
                `Place Order` : `My Shopping Cart`}</Text>
              {CartListUI}
              {_.isEmpty(setInputDetails.cartCB) && !setInputDetails.isFromPreviewProducts ? null :
                <View>
                  <Text style={{ marginVertical: 20, fontSize: 16, fontFamily: "Roboto", fontWeight: "bold" }}>
                    {setInputDetails.isPlaceOrderShowing || setInputDetails.isFromPreviewProducts ?
                      `Delivery Information` : `Order Summary`}</Text>
                  {/* <OrderSummary openPlaceOrder={this.openPlaceOrder} {...this.state} {...this.props} /> */}
                  <OrderSummary totalOrders={this.state.totalOrders} totalPrice={this.state.totalPrice} {...this.props} />

                </View>
              }
            </View>
            <View style={{ marginTop: 100 }} />
          </View>
        </ScrollView>
    );
  }
}

CartItems.propTypes = {
  onlinestore: PropTypes.object,
  navigation: PropTypes.object,
};

export default CartItems;