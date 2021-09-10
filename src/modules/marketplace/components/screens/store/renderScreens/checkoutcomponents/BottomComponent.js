import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import Button from "__src/components/Button";
import _ from 'lodash';
import ModalTransactionSuccess from './ModalTransactionSuccess'
import { Icon, CheckBox } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
var { height, width } = Dimensions.get('window');

export default class BottomComponent extends React.PureComponent {

    state = {
        isTransactionCompleteModal: false,
    }

    componentDidUpdate(prevProps) {
        const { actions, marketplace: { countCart, setCartListOnCheck, placeOrderData, patchCartItem, getCartList }, login: { session } } = this.props;
        if (!_.isEqual(prevProps.marketplace.placeOrderData, placeOrderData) && !_.isEmpty(placeOrderData)) {
            if (Number(placeOrderData.status) === 0) {
                Alert.alert("Error", placeOrderData.data);
                delete placeOrderData.status;
            }
            else {
                this.setState({ isTransactionCompleteModal: true });
            }
        }
    }

    _placeOrder = () => {
        const { selectedPayment, isCheck, transactionPass, onErr, selectedBank, actions, marketplace: { getDeliveryAddress, setCartListOnCheck, setInputDetails }, login: { session } } = this.props;
        let param = {};
        let err = {};
        let itemsArr = [];
        if (_.isEmpty(selectedBank) && selectedPayment === "bank") {
            err.bank = "Please select bank first."
            onErr(err);
        }
        else if (isCheck === false) {
            Alert.alert("Notice", "Please agree in terms and condition.")
        }
        else if (_.isEmpty(transactionPass)) {
            err.tp = "Please enter your transaction password."
            onErr(err);
        }
        else {
            onErr({});
            if (_.isUndefined(setInputDetails.deliveryParamsToBuy)) {
                _.map(getDeliveryAddress, (address, index) => {
                    if (address.selected) {
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
            _.map(Object.values(setCartListOnCheck), (orders, index) => {
                let obj = {};
                obj.prod_id = orders.prod_id;
                obj.quantity = orders.quantity;
                if (!_.isNull(orders.variation)) {
                    obj.variation = orders.variation;
                }
                itemsArr.push(obj)
            })
            param.items = itemsArr;
            param.payment_method = selectedPayment;
            selectedPayment === "bank" ? param.bank = selectedBank.name : null;
            param.password = transactionPass;
            actions.placeOrder(session, param)
        }
    }

    closeModal = () => {
        this.setState({ isTransactionCompleteModal: false });
    }

    render() {
        const { marketplace: { setCartListOnCheck, getCartList, postGetCharge } } = this.props;
        let prices = [];
        _.map(getCartList, c => {
            _.map(Object.values(setCartListOnCheck), charge => {
                if (charge.prod_id === c.prod_id) {
                    const sub = _.multiply(c.price, c.quantity)
                    prices.push(sub)
                }
            })
        })
        const chargeErrorHandler = _.has(postGetCharge, "charge") && !_.isEmpty(setCartListOnCheck) ? postGetCharge.charge : 0;
        const totalChargeFromAPI = Number(parseFloat(chargeErrorHandler).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        const sumPrices = _.sum(prices)
        const totalPrices = Number(parseFloat(sumPrices).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        const sumTotal = chargeErrorHandler + sumPrices;
        const sumTotalFormartter = Number(parseFloat(sumTotal).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });

        return (
            <View style={{ borderTopWidth: 1, borderTopColor: Colors.grey400, height: 105, width: width }}>

                <View style={{ width: width, paddingHorizontal: 10, paddingTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 }}>Total Order Quantity: </Text>
                    <Text style={{ color: Color.colorPrimaryMP, fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 12 }}>
                        {!_.isEqual(postGetCharge.data.length, 0) && `( ${postGetCharge.data.length} Item/s )`}
                    </Text>
                </View>
                <View style={{ width: width, paddingHorizontal: 10, paddingTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 }}>Order Subtotal: </Text>
                    <Text style={{ color: Color.colorPrimaryMP, fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 12 }}>
                        ₱ {totalPrices}
                    </Text>
                </View>
                <View style={{ width: width, paddingHorizontal: 10, paddingTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 }}>Delivery Subtotal: </Text>
                    <Text style={{ color: Color.colorPrimaryMP, fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 12 }}>
                        ₱ {totalChargeFromAPI}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ paddingHorizontal: 10, }}>
                        <Text style={{ textAlign: "left", color: "black", fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 13 }}>Total: </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <Text style={{ marginRight: 10, color: Color.colorPrimaryMP, fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 13 }}>
                            ₱ {sumTotalFormartter}
                        </Text>
                        <Button onPress={this._placeOrder} style={{ marginTop: 5, borderRadius: 0, paddingHorizontal: 10 }}
                            label={"Place Order"} />
                    </View>
                </View>

                <ModalTransactionSuccess
                    isTransactionCompleteModal={this.state.isTransactionCompleteModal}
                    closeModal={this.closeModal} {...this.props} />

            </View>
        )
    }
}