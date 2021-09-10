import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import Button from "__src/components/Button";
import _ from 'lodash';
import { Icon, CheckBox } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
var { height, width } = Dimensions.get('window');
const payment = { e2e: "eCash", cod: "Cash On Delivery", otc: "Over The Counter", bank: "Bank Transfer" };

export default class PaymentMethod extends React.PureComponent {

    state = {
        banklist: [{ img: Res.get("mp_bdo"), name: "BDO" }, { img: Res.get("mp_sec_bank"), name: "SECURITY BANK" }],
    }


    renderPaymentMethod = ({ item, idx }) => {
        const { onSelectPayment, selectedPayment } = this.props;
        const active = selectedPayment === item;
        const layout = active ? { backgroundColor: Color.colorPrimaryMP, borderColor: "white" } : { backgroundColor: "white", borderColor: Color.Standard2 };
        const textColor = active ? { color: "white", fontWeight: "bold", } : { color: Color.Standard2 };
        return (
            <View key={idx} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                <TouchableOpacity onPress={() => onSelectPayment(item)} style={[layout, { borderRadius: 5, borderWidth: .5, width: "90%", alignItems: "center" }]}>
                    <Text style={[textColor, { paddingVertical: 10, fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 14 }]}>{payment[item]}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderBankList = ({ item, idx }) => {
        const { onSelectBank, selectedBank } = this.props;
        const selected = selectedBank.name === item.name ? true : false;
        return (
            <View key={idx} style={{ flex: 1, width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "row", marginBottom: 10 }}>
                <CheckBox
                    containerStyle={{ padding: 0, marginLeft: 0, borderColor: "transparent", backgroundColor: "transparent" }}
                    checkedColor={Color.colorPrimaryMP}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={selected}
                    onPress={() => onSelectBank(item)} />
                <Image source={item.img} resizeMode='contain' style={{ width: 90, height: 30 }} />
            </View>
        )
    }
    render() {
        const { onSelectPayment, selectedPayment, errTP } = this.props;
        console.log("selectedPayment", this.state.banklist)
        return (
            <View style={{ paddingHorizontal: 15, paddingVertical: 15, borderWidth: 1, borderColor: Colors.grey200 }}>
                <Text style={{ marginBottom: 15, color: Color.Standard2, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 16 }}>Payment Method</Text>
                <FlatList
                    numColumns={2}
                    data={Object.keys(payment)}
                    keyExtractor={(item, index) => `idx${index}`}
                    renderItem={this.renderPaymentMethod} />

                {selectedPayment === "bank" &&
                    <View>
                        <Text style={{ marginBottom: 15, color: Color.Standard2, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 16 }}>Bank List</Text>
                        <FlatList
                            numColumns={2}
                            data={this.state.banklist}
                            keyExtractor={(item, index) => `idx${index}`}
                            renderItem={this.renderBankList} />
                        {_.has(errTP, "bank") &&
                            <Text style={{ color: "red", textAlign: "center", fontFamily: "Roboto-Light", fontSize: 12 }}>Please select bank first.</Text>
                        }
                    </View>
                }
            </View>
        )
    }
}