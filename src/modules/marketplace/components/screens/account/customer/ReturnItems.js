import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Alert, FlatList, TextInput, StyleSheet, Dimensions } from 'react-native';
import _ from 'lodash';
import Dropdown from "__src/components/Dropdown";
import ImagePicker from "react-native-image-picker";
import { Tab, Tabs, ScrollableTab } from 'native-base';
import ToReturnScreen from './MyPurchaseToReceive';
import { Icon, CheckBox, Tooltip } from "react-native-elements";
import moment from 'moment';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class ReturnItems extends React.PureComponent {

    state = { img: {}, error: "", isFileDispute: false, comments: "" }

    componentDidUpdate(prevProps) {
        const { actions, navigation, login: { session }, marketplace: { setReturnItems, patchItem, uploadImage } } = this.props;

        if (!_.isEqual(prevProps.marketplace.uploadImage, uploadImage) && !_.isEmpty(uploadImage)) {
            if (uploadImage.status === 0) {
                Alert.alert("Error", uploadImage.result)
            } else {
                let params = {};
                params.action = "Return-Approved";
                params.delivery_receipt = uploadImage[0].url;
                console.log("products", params)
                actions.patchItem(session, params, setReturnItems.id)
            }
            delete uploadImage.status;
        }


        if (!_.isEqual(prevProps.marketplace.patchItem, patchItem) && !_.isEmpty(patchItem)) {
            if (patchItem.status === 0) {
                Alert.alert("Error", patchItem.result)
            } else {
                actions.getReturnList(session);
                navigation.goBack();
            }
            actions.reset_upload();
            delete patchItem.status;
        }
    }

    _onPress = () => {
        const { actions, login: { session }, marketplace: { setReturnItems } } = this.props;
        if (!_.isEmpty(this.state.img) && _.isEmpty(this.state.error)) {
            const param = new FormData();
            param.append("file", this.state.img);
            actions.uploadImage(session, param, "", "mypurchases-return");
        } else if (_.isEmpty(this.state.img)) {
            this.setState({ error: "Choose photo to upload." })
        }
    }

    _toReceive = () => {
        const { actions, login: { session }, marketplace: { setReturnItems } } = this.props;
        let param = {}
        param.action = "Return-Delivered";
        actions.patchItem(session, param, setReturnItems.id)
    }

    _fileDispute = () => {
        const { actions, login: { session }, marketplace: { setReturnItems } } = this.props;
        if (!this.state.isFileDispute) {
            this.setState({ isFileDispute: true })
        } else {
            let param = {}
            !_.isEmpty(this.state.comments) ? param.remarks = this.state.comments : null;
            param.action = "Dispute-Pending";
            actions.patchItem(session, param, setReturnItems.id)
        }
    }

    _onChange = (value) => {
        this.setState({ comments: value });
    }

    componentWillMount() {
        const { actions } = this.props;
        actions.reset_upload();
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

    _productOptions = ({ item, index }) => {
        const { marketplace: { setReturnItems } } = this.props;
        return (
            <View key={`idx ${index}`} style={{ marginTop: 5 }}>
                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>
                    {`${item}: ${setReturnItems.variation[item]}, `}
                </Text>
            </View>
        )
    }

    renderImages = ({ item, index }) => {
        return (
            <Image source={{ uri: item.url }} resizeMode='stretch' style={{ margin: 5, width: 80, height: 70 }} />
        )
    }

    ViewOrder = () => {
        const { marketplace: { setReturnItems, getReasonList } } = this.props;
        const sumTotal = _.sum([setReturnItems.total_price, setReturnItems.ship_fee]);
        const total = Number(parseFloat(sumTotal).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        const price = Number(parseFloat(setReturnItems.total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ padding: 15 }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Transaction Number</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setReturnItems.trackingno}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Status</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setReturnItems.status}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Date Purchased</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setReturnItems.date_purchased}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Payment Method</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setReturnItems.payment_method}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Total Order Quantity</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setReturnItems.quantity}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Total Price</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>₱ {total}</Text>
                    </View>
                </View>

                <View style={{ padding: 15, borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.grey300 }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Merchant Name</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setReturnItems.shop_person}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Shop Name</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setReturnItems.shop_name}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Contact Number</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setReturnItems.shop_contact}</Text>
                    </View>
                    {setReturnItems.status === "Return-Approved" &&
                        <View style={{ marginTop: 5 }}>
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Return Address</Text>
                            <Text style={{ marginTop: 5, fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setReturnItems.delivery_address}</Text>
                        </View>}

                    {(setReturnItems.status === "Return-To Receive" || setReturnItems.status === "Return-Delivered") &&
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Upload Receipt (Required)</Text>
                            {!_.isNull(setReturnItems.delivery_receipt) ?
                                <Image source={{ uri: setReturnItems.delivery_receipt }} resizeMode='stretch' style={{ marginTop: 10, width: "100%", height: 125 }} />
                                :
                                <View style={{ marginTop: 10, width: "100%", height: 125, borderWidth: 1, borderColor: Colors.grey300 }} />
                            }
                        </View>}

                </View>

                <View style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "white" }}>
                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        {/* <Image source={{ uri: item.prod_id.coverImg }} style={{ width: "20%", height: 60 }} resizeMode='stretch' /> */}
                        <View style={{ backgroundColor: "pink", width: "20%", height: 60 }} />
                        <View style={{ width: "75%", }}>
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setReturnItems.prod_name}</Text>
                            <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`Qty: ${setReturnItems.quantity}`}</Text>
                            <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`₱ ${price}`}</Text>
                        </View>
                    </View>

                    {!_.isNull(setReturnItems.variation) &&
                        <FlatList
                            data={Object.keys(setReturnItems.variation)}
                            keyExtractor={(index) => `idx ${index}`}
                            style={{ flexDirection: 'row' }}
                            renderItem={this._productOptions} />}


                    {(setReturnItems.status === "Return-To Ship" || setReturnItems.status === "Return-To Receive" || setReturnItems.status === "Return-Delivered") ? null :
                        <View>
                            <Text style={{ marginTop: 10, marginBottom: 5, fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                                Reason:
                            </Text>

                            <View style={{
                                borderColor: Colors.grey300, borderRadius: 5, borderWidth: 1, height: 35,
                                flexDirection: "row", backgroundColor: "white", justifyContent: "space-evenly", alignItems: "center"
                            }}>
                                <Text style={{ paddingHorizontal: 10, fontSize: 12, width: 320, fontFamily: "Roboto-Light", color: Color.Standard2 }}>{`${setReturnItems.cancel_reason}`}</Text>
                                <Icon type='font-awesome' name='chevron-down' size={15} color={Color.Standard} containerStyle={{ marginRight: 10, alignSelf: "center" }} />
                            </View>
                        </View>}

                    {setReturnItems.status === "Dispute-Declined" &&
                        <View>
                            <Text style={{ marginTop: 10, marginBottom: 5, fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                                Admin Reason:
                            </Text>

                            <View style={{
                                borderColor: Colors.grey300, borderRadius: 5, borderWidth: 1, height: 35,
                                flexDirection: "row", backgroundColor: "white", justifyContent: "space-evenly", alignItems: "center"
                            }}>
                                <Text style={{ paddingHorizontal: 10, fontSize: 12, width: 320, fontFamily: "Roboto-Light", color: Color.Standard2 }}>{`${setReturnItems.remarks}`}</Text>
                                <Icon type='font-awesome' name='chevron-down' size={15} color={Color.Standard} containerStyle={{ marginRight: 10, alignSelf: "center" }} />
                            </View>
                        </View>}


                    {setReturnItems.status === "Return-Approved" &&
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Upload Receipt (Required)</Text>
                            {!_.isNull(setReturnItems.delivery_receipt) ?
                                <Image source={{ uri: setReturnItems.delivery_receipt }} resizeMode='stretch' style={{ marginTop: 10, width: "100%", height: 150 }} />
                                : _.isEmpty(this.state.img) && _.isNull(setReturnItems.delivery_receipt) ?
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
                                <Text style={{ marginTop: 5, color: "red", fontSize: 12 }}>{this.state.error}</Text>}

                            {_.isNull(setReturnItems.delivery_receipt) &&
                                <TouchableOpacity onPress={() => this._onPress()}
                                    style={{ marginTop: 10, width: "100%", alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 5, paddingVertical: 5 }} >
                                    <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>Return Item</Text>
                                </TouchableOpacity>}
                        </View>}


                    {(setReturnItems.status === "Return-Refund" || setReturnItems.status === "Return-To Ship" || setReturnItems.status === "Return-Declined") &&
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Upload Photos</Text>
                            <FlatList
                                data={setReturnItems.image_return}
                                keyExtractor={(item, index) => `img_id ${index}`}
                                numColumns={4}
                                renderItem={this.renderImages} />
                        </View>}

                    {(setReturnItems.status === "Return-To Receive" && !_.isNull(setReturnItems.delivery_receipt)) &&
                        <TouchableOpacity onPress={() => this._toReceive()}
                            style={{ marginTop: 10, width: "100%", alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 5, paddingVertical: 5 }} >
                            <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>Return Received</Text>
                        </TouchableOpacity>
                    }

                    {this.state.isFileDispute &&
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Comments</Text>
                            <View style={{ marginTop: 5, width: "100%", height: 125, borderWidth: 1, borderColor: Colors.grey300 }}>
                                <TextInput
                                    style={{ paddingHorizontal: 10, fontSize: 12 }}
                                    placeholder="Type your request here..."
                                    multiline
                                    value={this.state.comments}
                                    onChangeText={this._onChange} />
                            </View>
                        </View>}

                    {setReturnItems.status === "Return-Declined" &&
                        <TouchableOpacity onPress={() => this._fileDispute()}
                            style={{ marginTop: 40, width: "100%", alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 5, paddingVertical: 5 }} >
                            <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>{this.state.isFileDispute ? "Submit" : "File a Dispute"}</Text>
                        </TouchableOpacity>
                    }
                </View>
            </ScrollView>
        )
    }

    render() {
        const { marketplace: { setReturnItems } } = this.props;
        console.log("IMGGG", this.state)
        return this.ViewOrder();
    }
}
