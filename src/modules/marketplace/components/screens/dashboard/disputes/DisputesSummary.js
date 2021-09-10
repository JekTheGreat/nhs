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

export default class DisputesSummary extends React.PureComponent {

    state = { isCheck: false, reason: "", img: {}, error: "", isDisable: false }


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

            </ScrollView>
        )
    }

}
