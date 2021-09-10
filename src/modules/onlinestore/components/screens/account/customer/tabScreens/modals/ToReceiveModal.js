/* eslint-disable */
import React, { PureComponent } from "react";
import { FlatList, View, Text, Modal, Dimensions, Alert, Image } from 'react-native';
import Button from "__src/components/Button";
import Dropdown from "__src/components/Dropdown";
import _ from 'lodash';
import { Icon } from "react-native-elements";
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
import ToView from './ToViewReceive';
import ToReturn from './ToReturnReceive';
import ToReceivedOrder from './ToReceivedOrder';
const { Color, Res } = Resources;
const { width, height } = Dimensions.get('screen');

class ToReceiveModal extends PureComponent {

    render() {
        const { toView, toReturn, toReceived, selectedProduct, isProcessingModalShowing, closeModal, onlinestore: { getReasonsToCancel } } = this.props
        console.log("toReceiveModal", selectedProduct, this.props)
        return (
            <Modal
                ref={"toReceiveModal"}
                visible={isProcessingModalShowing}
                transparent
                onRequestClose={closeModal}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    <View style={{ borderRadius: 10, shadowRadius: 5, width: width - 60, backgroundColor: "white" }}>
                        <View style={{ marginVertical: 10, }}>

                            <View style={{ marginHorizontal: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>
                                    {`Tracking no.${selectedProduct.trackingno}`}
                                </Text>
                                <Text onPress={closeModal} style={{ fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>x</Text>
                            </View>

                            <View style={{ marginHorizontal: 15, marginVertical: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <View>
                                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12, }}>Contact Person</Text>
                                    <Text style={{ marginBottom: 10, fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>{selectedProduct.shop_person}</Text>

                                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12, }}>Shop Name</Text>
                                    <Text style={{ marginBottom: 10, fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>{selectedProduct.shop_name}</Text>

                                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12, }}>Total Price(Shipping Fee Included)</Text>
                                    <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>₱ {Number(parseFloat(selectedProduct.total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}</Text>
                                </View>

                                <View>
                                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12, }}>Contact No.</Text>
                                    <Text style={{ marginBottom: 10, fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>{selectedProduct.shop_contact}</Text>

                                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12, }}>Total Quantity</Text>
                                    <Text style={{ marginBottom: 10, fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>{selectedProduct.total_qty}</Text>

                                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12, }}>Shipping Fee</Text>
                                    <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>₱ {Number(parseFloat(selectedProduct.ship_fee).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}</Text>
                                </View>
                            </View>

                            {toReturn ? null : <View style={{ height: .5, backgroundColor: Color.Standard, marginTop: 10 }} />}
                        </View>

                        {toReceived ? <ToReceivedOrder {...this.props} /> :
                            toReturn ? <ToReturn {...this.props} /> :
                                <ToView {...this.props} />}
                    </View>
                </View>
            </Modal>

        );
    }
}

export default ToReceiveModal;