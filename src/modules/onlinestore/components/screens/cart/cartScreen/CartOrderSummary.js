/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, Dimensions, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Button from "__src/components/Button";
import TxtInput from "__src/components/TxtInput";
import { CheckBox, Icon } from "react-native-elements";
import Dash from "react-native-dash";
import _ from "lodash";
import AddressDelivery from "./AddressDelivery";
import ModalTermsCondition from "./ModalTermsCondition";
import ModalTransactionSuccess from "./ModalTransactionSuccess";
import Resources from "__src/resources";
const { Color } = Resources;
import { Colors } from 'react-native-paper';
var { height, width } = Dimensions.get('window');
const payment = { e2e: "eCash", cod: "Cash On Delivery", otc: "Over The Counter", bank: "Bank Transfer" };
class CartItems extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
      tp: "",
      error: {},
      isTermsShowing: false,
    }
  }



  _placeOrder = () => {
    const { actions, onlinestore: { setInputDetails, getDeliveryAddress }, login: { additionalDetails, session } } = this.props;
    actions.getDeliveryAddress(additionalDetails.individualId);
    const showOrder = _.merge({}, setInputDetails);
    showOrder.isPlaceOrderShowing = true;
    actions.setInputDetails(showOrder);
    const err = {};
    let param = {};
    let itemsArr = []
    if (setInputDetails.isPlaceOrderShowing || setInputDetails.isFromPreviewProducts) {
      if (this.state.isCheck === false) {
        alert("Please agree in terms and condition.")
      }
      else if (_.isEmpty(this.state.tp)) {
        err.tp = "Please enter your transaction password."
        this.setState({ error: err })
      }
      else {
        this.setState({ error: {} })
        if (!_.has(setInputDetails, "selectedAddress")) {
          _.map(getDeliveryAddress, (address, index) => {
            if (index === getDeliveryAddress.length - 1) {
              param.delivery_address = address.address;
              param.delivery_city = address.city;
              param.delivery_contact = address.contactNo;
              param.delivery_person = address.contactPerson;
              param.delivery_region = address.region;
            }
          })
        }
        else {
          param = { ...setInputDetails.deliveryParamsToBuy };
        }
        _.map(Object.values(setInputDetails.placeOrder), (orders, index) => {
          let obj = {};
          obj.prod_id = orders.prod_id;
          obj.quantity = orders.quantity;
          if (!_.isNull(orders.variation)) {
            obj.variation = orders.variation;
          }
          itemsArr.push(obj)
        })
        param.items = itemsArr;
        param.password = this.state.tp;
        param.payment_method = setInputDetails.paymentOps;
        actions.buyNow(param, session)
      }
    }
  }


  _onChangeText = (value) => {
    this.setState({ tp: value })
  }


  _openTermsAndCondition = () => {
    this.setState({ isTermsShowing: true });
  }

  closeModal = () => {
    this.setState({ isTermsShowing: false });
  }

  agreeInTerms = () => {
    this.setState({ isCheck: true })
  }

  _selectPayment = (paymentMethod) => {
    const { actions, onlinestore: { setInputDetails } } = this.props;
    const newInput = _.merge({}, setInputDetails);
    newInput.paymentOps = paymentMethod;
    actions.setInputDetails(newInput);
  }

  renderPaymentMethod = ({ item, idx }) => {
    const { onlinestore: { setInputDetails } } = this.props;
    const active = setInputDetails.paymentOps === item;
    const layout = active ? { backgroundColor: Color.colorPrimary, borderColor: "white" } : { backgroundColor: "white", borderColor: Color.colorPrimary };
    const textColor = active ? { color: "white", fontWeight: "bold", } : { color: Color.Standard2 };
    return (
      <View key={idx} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 10 }}>
        <TouchableOpacity onPress={() => this._selectPayment(item)} style={[layout, { borderRadius: 10, borderWidth: .5, width: "90%", alignItems: "center" }]}>
          <Text style={[textColor, { paddingVertical: 10, fontFamily: "Roboto-Light", fontSize: 14 }]}>{payment[item]}</Text>
        </TouchableOpacity>
      </View>
    )
  }


  render() {
    const { totalPrice, totalOrders, onlinestore: { getCartList, getProductList, setInputDetails, setSelectedItems } } = this.props;
    const selectedProduct = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
    const prices = _.map(getCartList, item => {
      if (!_.isEmpty(setInputDetails.cartCB) || !_.isUndefined(setInputDetails.cartCB)) {
        if (setInputDetails.cartCB[item.id] === true) {
          return _.multiply(item.quantity, item.price);
        }
      }
    });
    const filterPrice = _.filter(prices, item => {
      if (!_.isUndefined(item)) {
        return item;
      }
    })
    const sumprices = _.sumBy(filterPrice);
    const subtotal = Number(parseFloat(sumprices).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
    let serviceCharge = [];
    if (setInputDetails.isPlaceOrderShowing) {
      _.map(getProductList.data, p => {
        _.map(Object.values(setInputDetails.placeOrder), charge => {
          if (charge.prod_id === p.id) {
            _.map(getCartList, c => {
              if (charge.prod_id === c.prod_id) {
                const fee = _.multiply(p.ship_fee, c.quantity);
                serviceCharge.push(fee);
              }
            })
          }
        })
      })
    } else if (setInputDetails.isFromPreviewProducts && _.has(setSelectedItems, "previewProducts")) {
      _.map(getCartList, c => {
        console.log("charge", selectedProduct.id, c.prod_id)

        if (selectedProduct.id === c.prod_id) {
          const fee = _.multiply(selectedProduct.ship_fee, c.quantity);
          serviceCharge.push(fee);
        }
      })
    }

    const sumDeliveryFees = _.sum(serviceCharge)
    const totalDeliveryCharge = Number(parseFloat(sumDeliveryFees).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
    const total = setInputDetails.isFromPreviewProducts ? Number(totalPrice) + Number(totalDeliveryCharge) : sumprices + Number(totalDeliveryCharge);
    const totalFormat = Number(parseFloat(total).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
    console.log("ASDF", serviceCharge, setInputDetails.isFromPreviewProducts && _.has(setSelectedItems, "previewProducts"))
    return (
      <View style={{
        backgroundColor: "white",
        shadowOffset: { width: 1, height: 1, }, shadowColor: Colors.grey400, shadowOpacity: 1, borderRadius: 10,
      }}>
        <View style={{ marginBottom: 10, marginHorizontal: 15 }}>
          {setInputDetails.isPlaceOrderShowing || setInputDetails.isFromPreviewProducts ?
            <View style={{ marginTop: 20 }}>
              <AddressDelivery {...this.props} />

              <Dash style={{ height: 1, marginVertical: 20, }} dashColor={Colors.grey300} />
              <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 15 }}>Payment Method</Text>
              <FlatList
                numColumns={2}
                data={Object.keys(payment)}
                keyExtractor={(item, index) => `idx${index}`}
                renderItem={this.renderPaymentMethod} />


              <Dash style={{ height: 1, marginVertical: 20, }} dashColor={Colors.grey300} />
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 15 }}>Order Summary</Text>
                <Text style={{ color: Color.LightBlue, fontFamily: "Roboto-Light", fontSize: 12 }}>{`(${totalOrders} items)`}</Text>
              </View>
              <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 13 }}>Subtotal</Text>
                <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 13 }}>
                  ₱ {setInputDetails.isFromPreviewProducts ? Number(parseFloat(totalPrice).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }) : subtotal}
                </Text>
              </View>
              <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 13 }}>Delivery Charge</Text>
                <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 13 }}>
                  {totalDeliveryCharge}
                </Text>
              </View>
              <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: Color.LightBlue, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 15 }}>Total</Text>
                <Text style={{ color: Color.LightBlue, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 15 }}>
                  {totalFormat}
                </Text>
              </View>
              <Dash style={{ height: 1, marginTop: 20, }} dashColor={Colors.grey300} />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckBox
                  containerStyle={{ paddingHorizontal: 0, borderColor: "transparent", backgroundColor: "transparent" }}
                  checkedColor={Color.colorPrimary}
                  checked={this.state.isCheck}
                  onPress={() => this.setState({ isCheck: !this.state.isCheck })} />
                <Text>
                  {`I agree with the `}
                  <Text onPress={() => this._openTermsAndCondition()} style={{ color: Color.LightBlue, fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 14, }}>
                    Terms and Conditions and Cancellation Policy
                  </Text>
                  {` that i have read`}
                </Text>
              </View>

              <Text style={{ marginBottom: 10, color: Color.Standard2, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 13 }}>Transaction Password</Text>
              <TxtInput
                style={{
                  backgroundColor: Colors.grey50, shadowOffset: { width: 1, height: 1, },
                  shadowColor: Colors.grey300, shadowOpacity: 1, borderRadius: 5, marginBottom: 15,
                }}
                style3={{ borderColor: Color.Standard, borderRadius: 5 }}
                round
                err={this.state.error.tp}
                placeholder="Enter your transaction password"
                returnKeyType="next"
                value={this.state.tp}
                onChangeText={this._onChangeText} />
            </View>
            :
            <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ color: Color.LightBlue, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 15 }}>Cart Total</Text>
              <Text style={{ color: Color.LightBlue, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 15 }}>₱ {subtotal}</Text>
            </View>
          }

          <Button onPress={() => this._placeOrder()} style={{ justifyContent: "center", alignSelf: "center", width: "100%" }}
            label="Place Order" />

        </View>
        <ModalTermsCondition agreeInTerms={this.agreeInTerms} closeModal={this.closeModal} isTermsShowing={this.state.isTermsShowing} />
        <ModalTransactionSuccess {...this.props} />
      </View>
    );
  }
}

CartItems.propTypes = {
  onlinestore: PropTypes.object,
  navigation: PropTypes.object,
};

export default CartItems;