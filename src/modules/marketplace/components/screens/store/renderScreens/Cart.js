import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, Alert, Platform } from 'react-native';
import Button from "__src/components/Button";
import _ from 'lodash';
import CartList from './cartcomponents/CartList';
import YouMayLike from '../renderScreens/previewcomponents/ProductsYouMayLike'
import EmptyScreen from './EmptyCartScreen';
import { Icon, CheckBox } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
var { height, width } = Dimensions.get('window');

export default class Cart extends React.PureComponent {

    state = {
        isSelectAll: false,
    }

    componentDidUpdate(prevProps) {
        const { actions, marketplace: { setCartListOnCheck, patchCartOptions, setProductOptions, patchCartItem }, login: { session } } = this.props
        if (!_.isEqual(prevProps.marketplace.patchCartOptions, patchCartOptions) && !_.isEmpty(patchCartOptions)) {
            if (patchCartOptions.status === 0) {
                Alert.alert("Error", patchCartOptions.result)
            }
            else {
                Alert.alert("SUCCESS", patchCartOptions.result)
                actions.getCartList(session);
            }
        }
    }

    checkOut = () => {
        const { actions, navigation, marketplace: { setCartListOnCheck, getCartList }, login: { session, additionalDetails } } = this.props;
        if (!_.isEmpty(setCartListOnCheck)) {
            let param = {};
            param.id = Object.keys(setCartListOnCheck);
            actions.postGetCharge(session, param);
            actions.getDeliveryAddress(session, additionalDetails.individualId)
            navigation.navigate("CheckOut");
        } else {
            Alert.alert("Notice", "Please select product first.")
        }

    }

    selectAll = (selectAll) => {
        const { actions, marketplace: { setCartListOnCheck, getCartList }, login: { session } } = this.props;
        let param = {};
        let isCheck = _.merge({}, setCartListOnCheck);
        let selectedItems = { ...isCheck };
        _.map(getCartList, cart => {
            if (!selectAll) {
                selectedItems[cart.id] = cart;
            } else {
                delete selectedItems[cart.id];
            }
        })
        param.id = Object.keys(selectedItems);
        actions.postGetCharge(session, param)
        actions.setCartListOnCheck(selectedItems);

    }

    _delete = () => {
        const { actions, marketplace: { setCartListOnCheck }, login: { session } } = this.props;
        let param = {}
        param.id = Object.keys(setCartListOnCheck)
        actions.patchCartItem(session, param);
    }

    render() {
        const { marketplace: { countCart, setCartListOnCheck, getCartList, getProductList, postGetCharge } } = this.props;
        const selectAll = _.isEqual(Object.keys(setCartListOnCheck).length, getCartList.length) ? true : false;
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
        return (
            _.isEmpty(getCartList) || _.isEqual(countCart, 0) ? <EmptyScreen {...this.props} />
                :
                <View style={{ flex: 1, backgroundColor: "white", height: height, width: width }}>
                    <View style={{ paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: Colors.grey400, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <CheckBox
                            containerStyle={{ marginLeft: 5, paddingVertical: 0, borderColor: "transparent", backgroundColor: "transparent" }}
                            checkedColor={Color.colorPrimaryMP}
                            checked={selectAll}
                            title="Select All"
                            textStyle={{ fontWeight: "normal", color: Color.Standard2, fontSize: 12 }}
                            onPress={() => this.selectAll(selectAll)} />
                        {!_.isEqual(countCart, 0) &&
                            <TouchableOpacity onPress={() => this._delete()} style={{ flexDirection: "row", marginRight: 10 }}>
                                <Icon name='trash-o' type='font-awesome' color={Color.Standard2} size={15} />
                                <Text style={{ marginLeft: 5, color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 }}>Delete </Text>
                            </TouchableOpacity>}
                    </View>

                    <ScrollView>
                        <CartList isSelectAll={this.state.isSelectAll} {...this.props} />
                        <YouMayLike {...this.props} />
                    </ScrollView>


                    <View style={{ borderTopWidth: 1, borderTopColor: Colors.grey400, height: 70, width: width }}>
                        <View style={{ width: width, paddingHorizontal: 10, paddingTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 }}>Product Quantity: </Text>
                            <Text style={{ color: Color.colorPrimaryMP, fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 12 }}>
                                {!_.isEqual(Object.keys(setCartListOnCheck).length, 0) && `( ${Object.keys(setCartListOnCheck).length} Item/s )`}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ paddingHorizontal: 10, }}>
                                <Text style={{ textAlign: "left", color: "black", fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 13 }}>Shopping Cart Count Total </Text>
                                <Text style={{ textAlign: "left", color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 }}>Delivery Charge </Text>
                            </View>
                            <View style={{ justifyContent: "flex-end" }}>
                                <Text style={{ textAlign: "right", color: Color.colorPrimaryMP, fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 13 }}>
                                    ₱ {totalPrices}</Text>
                                <Text style={{ textAlign: "right", color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 }}>₱ {totalChargeFromAPI}</Text>
                            </View>

                            <Button onPress={this.checkOut} style={{ marginTop: 10, borderRadius: 0, width: "25%" }}
                                label={"Check Out"} />
                        </View>
                    </View>
                </View>
        )
    }
}