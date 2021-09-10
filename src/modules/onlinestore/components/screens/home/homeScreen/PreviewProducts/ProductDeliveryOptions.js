/* eslint-disable */
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import _ from "lodash";
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color } = Resources;

class ProductDeliveryOptions extends React.PureComponent {

    render() {
        const { showDeliveryOpt, isDeliveryOptShowing, onlinestore: { setSelectedItems } } = this.props;
        const previewProducts = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
        const shipping_fee = Number(parseFloat(previewProducts.ship_fee).toFixed(2)).toLocaleString('en', {
            minimumFractionDigits: 2
        });
        return (
            <View style={{
                paddingHorizontal: 15, backgroundColor: "white", marginHorizontal: 10, marginVertical: 5, paddingVertical: 10,
                borderRadius: 8, borderWidth: 1, borderColor: Colors.grey300
            }}>
                <TouchableOpacity onPress={isDeliveryOptShowing} style={{
                    justifyContent: "space-between",
                    alignItems: "center", flexDirection: "row",
                }}>
                    <Text style={{ fontSize: 14, fontWeight: "bold", color: Color.Standard2, fontFamily: "Roboto-Light" }}>Delivery Options</Text>
                    <Icon type='evilicon' name={showDeliveryOpt ? "chevron-down" : "chevron-up"} size={30} />
                </TouchableOpacity>

                {showDeliveryOpt ?
                    <View style={{ backgroundColor: "white", marginVertical: 5, }}>
                        <Text style={{ fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard2 }}>Overseas Shipping</Text>
                        <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard2 }}>Economy Delivery</Text>
                            <Text style={{ fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard2 }}>Free</Text>
                        </View>
                        <Text style={{ fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard }}>8-17 Days</Text>

                        <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard2 }}>Standard Delivery</Text>
                            <Text style={{ fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard2 }}>₱ {shipping_fee}</Text>
                        </View>
                        <Text style={{ fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard }}>4-10 Days</Text>

                        <Text style={{ fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard2 }}>Cash on Delivery not available</Text>
                    </View> : null}

            </View>
        )
    }
}

export default ProductDeliveryOptions;