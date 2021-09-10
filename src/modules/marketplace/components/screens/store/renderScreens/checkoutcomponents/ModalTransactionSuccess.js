import React from 'react';
import { Modal, ScrollView, View, Text, Image, FlatList, Dimensions } from 'react-native';
import _ from 'lodash';
import Button from "__src/components/Button";
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;
const { width, height } = Dimensions.get('screen');


export default class ModalTransactionSuccess extends React.PureComponent {

    _renderItemList = ({ item, index }) => {
        const bground = index % 2 === 0 ? { borderColor: Colors.red100, backgroundColor: "seashell" } : { borderColor: "yellow", backgroundColor: "oldlace" };
        return (
            <View key={index} style={[bground, { marginBottom: 10, padding: 10, marginHorizontal: 10, borderRadius: 10, borderWidth: 1 }]} >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>
                        Product Name:
                    </Text>
                    <Text style={{ color: Color.Standard2, fontStyle: "italic", fontFamily: "Roboto-Light", fontSize: 13 }}>
                        {item.product}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>
                        Transaction No:
                    </Text>
                    <Text style={{ color: Color.Standard2, fontStyle: "italic", fontFamily: "Roboto-Light", fontSize: 13 }}>
                        {item.transNoCore}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>
                        Tracking No:
                    </Text>
                    <Text style={{ color: Color.Standard2, fontStyle: "italic", fontFamily: "Roboto-Light", fontSize: 13 }}>
                        {item.trackingNo}
                    </Text>
                </View>

            </View>
        )

    }

    _startAgain = (type) => {
        const { closeModal, actions, navigation, login: { session }, marketplace: { setCartListOnCheck } } = this.props;
        const param = {}
        param.id = Object.keys(setCartListOnCheck);
        actions.patchCartItem(session, param);
        actions.reset_data();
        actions.isFilterScreen(false);
        actions.getNotifications(session);
        actions.setOnlineStoreScreen('home');
        if (type === "homePage") {
            navigation.navigate("MarketPlaceMain");
        } else {
            actions.getPurchaseList(session);
            navigation.navigate("MarketPlaceMain");
            navigation.navigate("MyPurchase", { isSearching: false });
        }
        closeModal();
    }


    render() {
        const { isTransactionCompleteModal, selectedBank, selectedPayment, closeModal, marketplace: { placeOrderData } } = this.props;
        let ArrData = [];
        _.map(placeOrderData.data, (transNo, index) => {
            let obj = {};
            _.map(placeOrderData.item, (item, i) => {
                if (_.isEqual(index, i)) {
                    obj.transNoCore = transNo.core;
                    obj.product = item.prod_name;
                    obj.trackingNo = item.trackingno;
                }
            })
            ArrData.push(obj)
        })
        console.log("props", this.props)
        return (
            <Modal
                ref={"ModalTransactionSuccess"}
                visible={isTransactionCompleteModal}
                transparent
                onRequestClose={closeModal}>
                <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
                    <Image
                        style={[selectedPayment === "bank" ? { height: "40%", } : { height: "65%", }, { width: width }]}
                        source={Res.get("transaction_success")} />
                    <ScrollView>
                        <Text style={{ marginVertical: 5, alignSelf: "center", fontFamily: "Roboto-Light", fontSize: 25, color: Color.colorPrimaryMP, fontWeight: "bold" }}>
                            Transaction Complete
                        </Text>

                        {selectedPayment === "bank" &&
                            <View>
                                <Text style={{ paddingHorizontal: 50, fontFamily: "Roboto-Light", fontSize: 12, color: "black", textAlign: "center" }}>
                                    Please complete your payment within 24 hours Complete payment via:
                            </Text>
                                <Image
                                    source={selectedBank.img}
                                    resizeMode='contain'
                                    style={{ marginVertical: 10, alignSelf: "center", width: 100, height: 50 }} />
                                <Text style={{ paddingHorizontal: 15, fontFamily: "Roboto-Light", fontSize: 12, color: "black", textAlign: "center" }}>
                                    Account Name: GPRS- Unified Products and Services, Inc
                            </Text>
                                <Text style={{ marginVertical: 5, paddingHorizontal: 15, fontFamily: "Roboto-Light", fontSize: 12, color: "black", textAlign: "center" }}>
                                    Account Number: 0000-002822-722
                            </Text>
                                <View style={{ paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: "black", textAlign: "center" }}>
                                        Total Amount Due:
                                </Text>
                                    <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: "black", textAlign: "center" }}>
                                        {_.has(placeOrderData, "data") ?
                                            `₱ ${Number(parseFloat(placeOrderData.data[0].total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}`
                                            : ""}
                                    </Text>
                                </View>
                                <View style={{ marginVertical: 5, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: "black", textAlign: "center" }}>
                                        Remarks:
                                </Text>
                                    <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: "black", textAlign: "center" }}>
                                        ---
                                </Text>
                                </View>
                                <Text style={{ fontSize: 14, color: "red", textAlign: "center" }}>
                                    {_.has(placeOrderData, "data") ? placeOrderData.data[0].verified : ""}
                                </Text>
                                <Text style={{ paddingHorizontal: 50, fontFamily: "Roboto-Light", fontSize: 12, color: "black", textAlign: "center" }}>
                                    Please upload your deposit slip upon payment.
                            </Text>
                            </View>
                        }

                        <FlatList
                            style={{ marginVertical: 10, }}
                            data={ArrData}
                            keyExtractor={index => { index }}
                            renderItem={this._renderItemList} />
                    </ScrollView>


                    <View style={{ bottom: 10, marginTop: 10, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                        <Button
                            onPress={() => this._startAgain("homePage")}
                            style={{ width: "40%" }}
                            label="Go to Home Page" />
                        <Button
                            onPress={() => this._startAgain("myPurchase")}
                            style={{ width: "40%" }}
                            label="View My Purchases" />
                    </View>

                </View>
            </Modal>
        )
    }

}