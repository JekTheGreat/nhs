/* eslint-disable */
import React, { PureComponent } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Button from "__src/components/Button";
import { CheckBox, Icon } from "react-native-elements";
import _ from 'lodash';
import moment from 'moment';
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;

export default class ToReceivedOrder extends PureComponent {
    state = {
        isCheck: false,
    }

    _renderItems = ({ item, ind }) => {
        return (
            <View key={`${ind}`} style={{ marginHorizontal: 20, marginTop: 5 }}>
                <View style={{ marginVertical: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            resizeMode='contain'
                            source={{ uri: item.coverImg }}
                            style={{ height: 50, width: 50 }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontWeight: "bold", fontFamily: 'Roboto-Light', fontSize: 13, }}> {item.prod_name} </Text>
                            <Text style={{ marginTop: 5, fontFamily: 'Roboto-Light', fontStyle: "italic", fontSize: 13 }}>₱ {Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })} </Text>
                        </View>
                    </View>
                    <Text style={{ fontFamily: 'Roboto-Light', fontWeight: "bold", fontSize: 13 }}>x{item.quantity} </Text>
                </View>
            </View>
        )
    }
    _receiveOrder = () => {
        const { actions, selectedProduct, closeModal, login: { session } } = this.props
        if (!this.state.isCheck) {
            alert("Please agree in terms and condition first.")
        } else {
            let param = {};
            param.action = "Delivered";
            actions.patchTransaction(selectedProduct.id, param, session);
            closeModal();
        }
    }

    render() {
        const { selectedProduct } = this.props
        return (
            <View>
                <Image
                    resizeMode='cover'
                    source={{ uri: selectedProduct.delivery_receipt }}
                    style={{ height: 125, width: "90%", alignSelf: "center", justifyContent: "center", marginVertical: 5 }} />
                <FlatList
                    data={selectedProduct.items}
                    style={[selectedProduct.items.length === 1 ? {} : { height: "28%" }]}
                    ItemSeparatorComponent={() => <View style={{ height: .5, backgroundColor: Color.Standard }} />}
                    keyExtractor={ind => { ind }}
                    renderItem={this._renderItems} />

                <CheckBox
                    containerStyle={{
                        justifyContent: "center", height: 10,
                        alignSelf: "center", borderColor: "transparent", backgroundColor: "transparent"
                    }}
                    title={<Text style={{ fontFamily: 'Roboto-Light', fontSize: 12, fontWeight: "bold" }}>I agree on Terms and condition.</Text>}
                    checkedColor={Color.colorPrimary}
                    checked={this.state.isCheck}
                    onPress={() => this.setState({ isCheck: !this.state.isCheck })} />
                <Button
                    onPress={() => this._receiveOrder()}
                    style={{
                        bottom: -7, borderTopStartRadius: 0, borderTopEndRadius: 0,
                        borderBottomEndRadius: 5, borderBottomStartRadius: 5, justifyContent: "center",
                        alignSelf: "center", width: "100%"
                    }}
                    label="Order Received" />
            </View>
        );
    }
}