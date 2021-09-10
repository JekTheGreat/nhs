/* eslint-disable */
import React, { PureComponent } from "react";
import { FlatList, View, Text, Modal, Dimensions, Alert, Image } from 'react-native';
import Button from "__src/components/Button";
import Dropdown from "__src/components/Dropdown";
import _ from 'lodash';
import { Icon } from "react-native-elements";
import { Colors } from 'react-native-paper';
import moment from 'moment';
import Resources from "__src/resources";
const { Color, Res } = Resources;
const { width, height } = Dimensions.get('screen');

class ProcessingModal extends PureComponent {

    state = {
        cancelReason: "",
    }

    renderBase = () => {
        const { onlinestore: { setInputDetails } } = this.props;
        return (
            <View style={{
                flexDirection: "row", height: 40, alignItems: "center", alignSelf: "center", borderColor: Color.Standard,
                borderWidth: 0.6, borderRadius: 5, paddingHorizontal: 5, marginTop: 10
            }}>
                <Text style={{ flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingLeft: 5 }}>{this.state.cancelReason || "Select a reason."}
                </Text>
                <Icon type='material' name='expand-more' color={"black"} size={27} />
            </View>
        );
    }

    renderRow = (rowData, rowID, highlighted) => {
        return (
            <View style={[{ paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white" },
            highlighted && { backgroundColor: Color.highlight }]}>
                <Text style={[{ margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center" },
                    highlighted]}>
                    {`${rowData.name}`}
                </Text>
            </View>
        );
    }

    onChange = (value) => {
        const { actions, onlinestore: { setInputDetails } } = this.props;
        this.setState({ cancelReason: value.name });
    }

    _renderToCancel = ({ item, ind }) => {
        const datePurchased = moment(item.date_purchased).format('MMMM DD');
        return (
            <View style={{ margin: 20 }}>
                <View key={ind} style={{ marginVertical: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            resizeMode='contain'
                            source={{ uri: item.coverImg }}
                            style={{ height: 50, width: 50 }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontWeight: "bold", fontFamily: 'Roboto-Light', fontSize: 13, }}> {item.prod_name} </Text>
                            <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2 }}>Date Purchased:
                             <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: Color.LightBlue }}> {datePurchased}</Text>
                            </Text>
                            <Text style={{ marginTop: 5, fontFamily: 'Roboto-Light', fontStyle: "italic", fontSize: 13 }}>₱ {Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })} </Text>
                        </View>
                    </View>
                    <Text style={{ fontFamily: 'Roboto-Light', fontWeight: "bold", fontSize: 13 }}>x{item.quantity} </Text>
                </View>
            </View>
        )
    }

    _cancelOrder = () => {
        const { closeModal, selectedProduct, actions, onlinestore: { setInputDetails }, login: { session } } = this.props;

        if (_.isEmpty(this.state.cancelReason)) {
            Alert.alert("Notice", "Select reason to cancel");
        } else {
            let param = {};
            param.actions = "Cancelled";
            param.cancel_reason = this.state.cancelReason;
            actions.patchTransaction(selectedProduct.id, param, session);
            // actions.fetchPurchaseList(session);
            closeModal();
        }
    }

    render() {
        const { selectedProduct, isProcessingModalShowing, closeModal, onlinestore: { getReasonsToCancel } } = this.props
        // console.log("ProcessingModal", selectedProduct, this.props)
        return (
            <Modal
                ref={"processingModal"}
                visible={isProcessingModalShowing}
                transparent
                onRequestClose={closeModal}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    <View style={{ borderRadius: 10, shadowRadius: 5, width: width - 60, height: height / 1.3, backgroundColor: "white" }}>
                        <View style={{ marginVertical: 10, }}>
                            <View style={{ marginHorizontal: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>
                                    {`Tracking no.${selectedProduct.trackingno}`}
                                </Text>
                                <Text onPress={closeModal} style={{ fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>x</Text>
                            </View>

                            <View style={{ marginHorizontal: 15, marginVertical: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
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

                            <View style={{ marginHorizontal: 15 }} >
                                <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, }}>Reason: </Text>
                                <Dropdown
                                    animated={true}
                                    showsVerticalScrollIndicator={true}
                                    renderBase={this.renderBase}
                                    dropdownStyle={{ height: 125, }}
                                    options={getReasonsToCancel}
                                    renderButtonText={(value) => this.onChange(value)}
                                    renderRow={this.renderRow} />
                            </View>


                            <View style={{ height: .5, backgroundColor: Color.Standard, marginTop: 20 }} />

                            <FlatList
                                data={selectedProduct.items}
                                style={{ height: "40%" }}
                                ItemSeparatorComponent={() => <View style={{ height: .5, backgroundColor: Color.Standard }} />}
                                keyExtractor={ind => { ind }}
                                renderItem={this._renderToCancel} />
                        </View>
                        <Button
                            onPress={() => this._cancelOrder()}
                            style={{
                                position: "absolute", bottom: 0, marginTop: 10, borderTopStartRadius: 0, borderTopEndRadius: 0,
                                borderBottomEndRadius: 5, borderBottomStartRadius: 5, justifyContent: "center",
                                alignSelf: "center", width: "100%"
                            }}
                            label="Cancel Order" />
                    </View>
                </View>
            </Modal>

        );
    }
}

export default ProcessingModal;