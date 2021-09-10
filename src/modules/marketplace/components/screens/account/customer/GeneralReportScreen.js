import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, Dimensions, FlatList, Alert, ActivityIndicator } from 'react-native';
import { HeaderBackButton } from "react-navigation-stack";
import _ from 'lodash';
import { Rating } from 'react-native-ratings';
import { Spinner } from 'native-base';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class GeneralReportScreen extends React.PureComponent {

    _productOptions = (items) => ({ item, index }) => {
        return (
            <View key={`idx ${index}`} style={{ marginTop: 5 }}>
                <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", color: "black" }}>
                    {`${item}: ${items.variation[item]}, `}
                </Text>
            </View>
        )
    }

    _renderItems = ({ item, index }) => {
        const price = Number(parseFloat(item.total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        return (
            <View style={{ paddingVertical: 15, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Image source={{ uri: item.coverImg }} style={{ width: "20%", height: 60 }} resizeMode='contain' />
                    <View style={{ width: "70%", }}>
                        <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", color: "black" }}>{item.prod_name}</Text>
                        <Text style={{ textAlign: "right", fontSize: 13, fontFamily: "Roboto-Light", color: "black" }}>{`Qty: ${item.quantity}`}</Text>
                        <Text style={{ textAlign: "right", fontSize: 13, fontFamily: "Roboto-Light", color: "black" }}>{`₱ ${price}`}</Text>
                    </View>

                </View>
                { !_.isNull(item.variation) &&
                    <FlatList
                        data={Object.keys(item.variation)}
                        keyExtractor={(index) => `idx ${index}`}
                        style={{ flexDirection: 'row' }}
                        renderItem={this._productOptions(item)} />}

                <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", color: "black" }}>Arrived:
                    <Text style={{ fontSize: 12, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.colorPrimaryMP }}>{item.received_date}</Text>
                </Text>
            </View>
        )
    }

    render() {
        const { actions, marketplace: { setSelectedReports, setUserSide } } = this.props;
        const item = setSelectedReports;
        const shipfee = Number(parseFloat(item.ship_fee).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        const total = Number(parseFloat(item.total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 10, backgroundColor: "white" }}>

                <View style={{ paddingHorizontal: 15, paddingVertical: 10, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }} >
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", fontWeight: "bold", color: "black" }}>Transaction Number</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", fontWeight: "bold", color: Color.colorPrimaryMP }}>{item.trackingno}</Text>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 15, paddingVertical: 10, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }} >
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Date Debited</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.date_purchased}</Text>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Status</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.status}</Text>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Payment Option</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.payment_method}</Text>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Shop Name</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.shop_name}</Text>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Shipping Fee</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>₱ {shipfee}</Text>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Total Amount</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>₱ {total}</Text>
                    </View>
                </View>

                {setUserSide ?
                    <View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }} >
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", fontWeight: "bold", color: "black" }}>Customer Details</Text>
                        </View>

                        <View style={{ paddingHorizontal: 15, paddingVertical: 10, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }} >
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Customer Name</Text>
                                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.delivery_person}</Text>
                            </View>
                            <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Contact Number</Text>
                                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.delivery_contact}</Text>
                            </View>
                        </View>

                        <View style={{ paddingHorizontal: 15, paddingVertical: 10, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }} >
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", fontWeight: "bold", color: "black" }}>Customer Address</Text>
                        </View>

                        <View style={{ paddingHorizontal: 15, paddingVertical: 10, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }} >
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.delivery_address}</Text>
                            </View>
                        </View>

                    </View>
                    :
                    <View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }} >
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", fontWeight: "bold", color: "black" }}>Shop Details</Text>
                        </View>

                        <View style={{ paddingHorizontal: 15, paddingVertical: 10, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }} >
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Merchant Name</Text>
                                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.shop_person}</Text>
                            </View>
                            <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Shop Name</Text>
                                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.shop_name}</Text>
                            </View>
                        </View>
                    </View>
                }



                <View style={{ paddingHorizontal: 15, paddingVertical: 10, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }} >
                    <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", fontWeight: "bold", color: "black" }}>Product List</Text>
                </View>

                <View style={{ paddingHorizontal: 15, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }} >
                    <FlatList
                        data={item.items}
                        keyExtractor={(item, index) => `items_idx ${index}`}
                        renderItem={this._renderItems} />
                </View>

            </ScrollView>
        )
    }
}