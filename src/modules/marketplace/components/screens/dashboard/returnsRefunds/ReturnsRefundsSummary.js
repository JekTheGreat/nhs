import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Alert, FlatList, RefreshControl, Dimensions, StyleSheet } from 'react-native';
import _ from 'lodash';
import Loading from "__src/components/Loading";
import Dropdown from "__src/components/Dropdown";
import { Tab, Tabs, ScrollableTab, Spinner } from 'native-base';
import { Icon, CheckBox, Tooltip } from "react-native-elements";
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class ReturnsRefundsSummary extends React.PureComponent {

    state = { isCheck: false, reason: "", img: {}, error: "", isDisable: false }

    componentDidUpdate(prevProps) {
        const { actions, navigation, login: { session }, marketplace: { patchItem, uploadImage, setSelectedTransaction } } = this.props;
        if (!_.isEmpty(patchItem) && !_.isEqual(prevProps.marketplace.patchItem, patchItem)) {
            if (patchItem.status === 1) {
                actions.getSellerReturns(session);
                actions.reset_upload();
                navigation.goBack();
            } else {
                Alert.alert("Error", patchItem.result)
            }
            delete patchItem.status;
        }
        if (!_.isEqual(prevProps.marketplace.uploadImage, uploadImage) && !_.isEmpty(uploadImage)) {
            if (uploadImage.status === 0) {
                Alert.alert("Error", uploadImage.result)
            } else {
                let params = {};
                params.action = "Return-Delivered";
                params.delivery_receipt = uploadImage[0].url;
                actions.patchItem(session, params, setSelectedTransaction.id)
            }
            delete uploadImage.status;
        }
    }


    _onPress = (type) => {
        const { actions, login: { session }, marketplace: { setSelectedTransaction } } = this.props;
        let param = {};
        if (!_.isEqual(type, "delivered")) {
            if (type === "accept") {
                param.action = "Return-Approved"
            } else if (type === "reject") {
                param.action = "Return-Declined";
            } else if (type === "shipout") {
                param.action = "Return-To Receive";
            } else if (type === "replace") {
                param.action = "Return-To Ship";
            } else if (type === "refund") {
                param.action = "Return-Refund";
            }
            actions.patchItem(session, param, setSelectedTransaction.id)
        } else {
            if (_.isEmpty(this.state.img)) {
                this.setState({ error: "Upload receipt required." })
            }
            if (!_.isEmpty(this.state.img) && _.isEmpty(this.state.error)) {
                const photo = new FormData();
                photo.append("file", this.state.img);
                actions.uploadImage(session, photo, "", "mysales-shipping");
            }
        }
    }

    _selectImages = () => {
        const { actions, marketplace: { setInputDetails }, login: { session } } = this.props;

        ImagePicker.showImagePicker({ noData: true, mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log("didCancel", response.didCancel);
            }
            else if (response.error) {
                console.log("error", response.error);
            }
            else if (response.customButton) {
                console.log("customButton", response.customButton);
            }
            else {
                this.setState({ error: "", img: { type: "image/jpeg", uri: response.uri, name: response.fileName } })
                // this.forceUpdate()
            }
        });
    }


    _productOptions = (items) => ({ item, index }) => {
        return (
            <View key={`idx ${index}`} style={{ marginTop: 5 }}>
                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>
                    {`${item}: ${items.variation[item]}, `}
                </Text>
            </View>
        )
    }

    renderImages = ({ item, index }) => {
        console.log("ASDF", item.url)
        return (
            <Image source={{ uri: item.url }} resizeMode='stretch' style={{ margin: 5, width: 80, height: 70 }} />
        )
    }


    render() {
        const { marketplace: { setSelectedTransaction, getReasonList, transactionInProgress } } = this.props;
        const total = Number(parseFloat(setSelectedTransaction.total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        const sumTotal = _.sum([setSelectedTransaction.total_price, setSelectedTransaction.ship_fee]);
        const subTotal = Number(parseFloat(sumTotal).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ padding: 15 }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Transaction Number</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setSelectedTransaction.trackingno}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Status</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setSelectedTransaction.status}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Date Purchased</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setSelectedTransaction.date_purchased}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Payment Method</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setSelectedTransaction.payment_method}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Total Order Quantity</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setSelectedTransaction.quantity}</Text>
                    </View>

                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Total Price</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>₱ {total}</Text>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 15, paddingVertical: 10, borderTopColor: Colors.grey300, borderTopWidth: .5, }} >
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Customer Name</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setSelectedTransaction.delivery_person}</Text>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Contact Number</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setSelectedTransaction.delivery_contact}</Text>
                    </View>
                </View>

                {setSelectedTransaction.status === "Return-Delivered" &&
                    <View style={{ marginHorizontal: 15 }}>
                        <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 }}>Uploaded Signed DR</Text>
                        <Image resizeMode='stretch'
                            source={{ uri: setSelectedTransaction.delivery_receipt }}
                            style={{ alignSelf: "center", marginTop: 10, width: "100%", height: 125 }} />
                    </View>
                }

                {setSelectedTransaction.status === "Return-To Receive" &&
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 }}>Uploaded Signed DR(Required)</Text>
                        {_.isEmpty(this.state.img) ?
                            <TouchableOpacity onPress={() => this._selectImages()}
                                style={{
                                    marginTop: 10, width: "100%", alignItems: "center", borderWidth: 1, borderStyle: "dashed",
                                    backgroundColor: Color.bg, borderRadius: 5, paddingVertical: 40, borderColor: Color.LightBlue
                                }} >
                                <Text style={{ textAlign: "center", fontFamily: "Roboto-Light", color: Color.LightBlue, fontSize: 25 }}>+</Text>
                                <Text style={{ textAlign: "center", fontFamily: "Roboto-Light", color: Color.LightBlue, fontSize: 17 }}>{`Upload Photo`}</Text>
                            </TouchableOpacity> :
                            <Image source={{ uri: this.state.img.uri }} resizeMode='stretch' style={{ marginTop: 10, width: "100%", height: 150 }} />
                        }
                        {!_.isEmpty(this.state.error) &&
                            <Text style={{ textAlign: "center", fontFamily: "Roboto-Light", color: "red", fontSize: 12 }}>{this.state.error}</Text>
                        }
                    </View>
                }

                <View style={{ marginTop: 10, padding: 15, backgroundColor: Color.bg }}>
                    <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Customer Address</Text>
                    <Text style={{ marginTop: 5, fontSize: 12, fontFamily: "Roboto-Light", color: Color.colorPrimaryMP }}>{setSelectedTransaction.delivery_address}</Text>
                </View>


                <View style={{ paddingHorizontal: 15, paddingVertical: 10, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }}>
                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Image source={{ uri: setSelectedTransaction.prod_id.coverImg }} style={{ width: "20%", height: 60 }} resizeMode='stretch' />
                        <View style={{ width: "75%", }}>
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setSelectedTransaction.prod_name}</Text>
                            <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`Return Qty: ${setSelectedTransaction.quantity}`}</Text>
                            <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`₱ ${subTotal}`}</Text>
                        </View>
                    </View>
                    {!_.isNull(setSelectedTransaction.variation) &&
                        <FlatList
                            data={Object.keys(setSelectedTransaction.variation)}
                            keyExtractor={(index) => `idx ${index}`}
                            contentContainerStyle={{ flexDirection: 'row' }}
                            renderItem={this._productOptions(setSelectedTransaction)} />}
                </View>
                <View style={{ paddingHorizontal: 15 }}>
                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`Reason:`}</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`${setSelectedTransaction.cancel_reason}`}</Text>
                    </View>
                    {!_.isEmpty(setSelectedTransaction.image_return) &&
                        <Text style={{ marginTop: 5, fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`Upload Photo/s`}</Text>}
                    <FlatList
                        data={setSelectedTransaction.image_return}
                        keyExtractor={(item, index) => `img_id ${index}`}
                        numColumns={4}
                        renderItem={this.renderImages} />
                </View>

                {setSelectedTransaction.status === "Return-Pending" &&
                    <View>
                        <TouchableOpacity onPress={() => this._onPress("accept")}
                            style={{ marginHorizontal: 15, marginBottom: 10, marginTop: 20, alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 3, paddingVertical: 5 }} >
                            {transactionInProgress ?
                                <Loading customStyle={{ height: 25 }} isLoading={transactionInProgress} size="small" color={"white"} /> :
                                <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>Accept</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._onPress("reject")}
                            style={{ marginHorizontal: 15, marginBottom: 10, alignItems: "center", backgroundColor: "white", borderRadius: 3, borderWidth: 1, borderColor: Color.colorPrimaryMP, paddingVertical: 5 }} >
                            {transactionInProgress ?
                                <Loading customStyle={{ height: 25 }} isLoading={transactionInProgress} size="small" color={Color.colorPrimaryMP} /> :
                                <Text style={{ textAlign: "center", fontSize: 12, color: Color.colorPrimaryMP }}>Reject</Text>}
                        </TouchableOpacity>
                    </View>
                }
                {(setSelectedTransaction.status === "Return-Approved" && !_.isNull(setSelectedTransaction.delivery_receipt)) &&
                    <View>
                        <TouchableOpacity onPress={() => this._onPress("replace")}
                            style={{ marginHorizontal: 15, marginBottom: 10, marginTop: 20, alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 3, paddingVertical: 5 }} >
                            {transactionInProgress ?
                                <Loading customStyle={{ height: 25 }} isLoading={transactionInProgress} size="small" color={"white"} /> :
                                <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>Replace</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._onPress("refund")}
                            style={{ marginHorizontal: 15, marginBottom: 10, alignItems: "center", backgroundColor: "white", borderRadius: 3, borderWidth: 1, borderColor: Color.colorPrimaryMP, paddingVertical: 5 }} >
                            {transactionInProgress ?
                                <Loading customStyle={{ height: 25 }} isLoading={transactionInProgress} size="small" color={Color.colorPrimaryMP} /> :
                                <Text style={{ textAlign: "center", fontSize: 12, color: Color.colorPrimaryMP }}>Refund</Text>}
                        </TouchableOpacity>
                    </View>
                }

                {setSelectedTransaction.status === "Return-To Ship" &&
                    <TouchableOpacity onPress={() => this._onPress("shipout")}
                        style={{ marginHorizontal: 15, marginVertical: 10, alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 3, paddingVertical: 5 }} >
                        {transactionInProgress ?
                            <Loading customStyle={{ height: 25 }} isLoading={transactionInProgress} size="small" color={"white"} /> :
                            <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>Ship Order</Text>}
                    </TouchableOpacity>}

                {setSelectedTransaction.status === "Return-To Receive" &&
                    <TouchableOpacity onPress={() => this._onPress("delivered")}
                        style={{ marginHorizontal: 15, marginVertical: 10, alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 3, paddingVertical: 5 }} >
                        {transactionInProgress ?
                            <Loading customStyle={{ height: 25 }} isLoading={transactionInProgress} size="small" color={"white"} /> :
                            <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>Mark as Delivered</Text>}
                    </TouchableOpacity>}
            </ScrollView>
        )
    }

}
