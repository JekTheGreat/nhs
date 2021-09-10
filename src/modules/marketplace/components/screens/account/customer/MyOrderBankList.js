import React from 'react';
import { Modal, ScrollView, View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import _ from 'lodash';
import Button from "__src/components/Button";
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;
const { width, height } = Dimensions.get('screen');


export default class MyOrderBankList extends React.PureComponent {

    _renderItemList = ({ item, index }) => {
        const { marketplace: { setSelectedTransaction } } = this.props;
        const bground = index % 2 === 0 ? { borderColor: Colors.red100, backgroundColor: "seashell" } : { borderColor: "yellow", backgroundColor: "oldlace" };
        return (
            <View key={index} style={[bground, { marginBottom: 10, padding: 10, marginHorizontal: 10, borderRadius: 10, borderWidth: 1 }]} >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>
                        Product Name:
                    </Text>
                    <Text style={{ color: Color.Standard2, fontStyle: "italic", fontFamily: "Roboto-Light", fontSize: 13 }}>
                        {item.prod_name}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>
                        Transaction No:
                    </Text>
                    <Text style={{ color: Color.Standard2, fontStyle: "italic", fontFamily: "Roboto-Light", fontSize: 13 }}>
                        {setSelectedTransaction.items.core}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>
                        Tracking No:
                    </Text>
                    <Text style={{ color: Color.Standard2, fontStyle: "italic", fontFamily: "Roboto-Light", fontSize: 13 }}>
                        {item.trackingno}
                    </Text>
                </View>

            </View>
        )

    }

    cancel = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }



    render() {
        const { marketplace: { placeOrderData, setSelectedTransaction } } = this.props;
        console.log("props", this.props)
        return (
            <View>
                <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
                    <Image
                        style={{ height: "40%", width: "100%" }}
                        source={Res.get("transaction_success")} />
                    <ScrollView>
                        <Text style={{ marginVertical: 5, alignSelf: "center", fontFamily: "Roboto-Light", fontSize: 25, color: Color.colorPrimaryMP, fontWeight: "bold" }}>
                            Transaction Complete
                        </Text>

                        <View>
                            <Text style={{ paddingHorizontal: 50, fontFamily: "Roboto-Light", fontSize: 12, color: "black", textAlign: "center" }}>
                                Please complete your payment within 24 hours Complete payment via:
                            </Text>
                            <Image
                                source={_.isEqual(setSelectedTransaction.items.bank, "BDO") ? Res.get("mp_bdo") : Res.get("mp_sec_bank")}
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
                                    ₱ {Number(parseFloat(setSelectedTransaction.items.total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
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
                                {setSelectedTransaction.items.verified}
                            </Text>
                            <Text style={{ paddingHorizontal: 50, fontFamily: "Roboto-Light", fontSize: 12, color: "black", textAlign: "center" }}>
                                Please upload your deposit slip upon payment.
                            </Text>
                        </View>

                        <FlatList
                            style={{ marginVertical: 10, }}
                            data={setSelectedTransaction.items.items}
                            keyExtractor={index => { index }}
                            renderItem={this._renderItemList} />
                    </ScrollView>


                    <View style={{ bottom: 5, alignItems: "center" }}>
                        <TouchableOpacity style={{
                            height: 30, width: "90%", backgroundColor: Color.colorPrimary, borderRadius: 5,
                            alignItems: "center", justifyContent: "center"
                        }}>
                            <Text style={{ color: "white", fontSize: 12 }}>Mark as Paid</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.cancel} style={{
                            height: 30, width: "90%", backgroundColor: "white", borderColor: Color.colorPrimaryMP, borderWidth: 1,
                            borderRadius: 5, alignItems: "center", justifyContent: "center", marginTop: 5
                        }}>
                            <Text style={{ color: Color.colorPrimary, fontSize: 12 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

}