/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, FlatList, Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import Dropdown from "__src/components/Dropdown";
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;
let count = 0;
let arr = [];
class ChooseReasons extends PureComponent {
    state = { errorReason: {}, errorQuantity: {} }

    onNext = () => {
        const { actions, onlinestore: { setInputDetails } } = this.props;
        let errReason = {}
        let errQty = {}
        if (Object.values(setInputDetails.reasonsToReturn).length !== count || Object.values(setInputDetails.quantityToReturn).length !== count) {
            _.filter(arr, items => {
                if (_.isUndefined(setInputDetails.reasonsToReturn[items.id])) {
                    errReason[items.id] = "This field is required";
                } if (_.isUndefined(setInputDetails.quantityToReturn[items.id])) {
                    errQty[items.id] = "This field is required";
                }
            })
        }
        else {
            actions.setToReturnScreen("uploadPhoto");
        }
        this.setState({ errorReason: errReason, errorQuantity: errQty });
    }

    renderBase = (type, id) => {
        const { onlinestore: { setInputDetails } } = this.props;
        const { errorReason, errorQuantity } = this.state;
        if (type === "reason") {
            return (
                <View style={[!_.isEmpty(errorReason[id]) ? { borderColor: "red" } : { borderColor: Color.Standard }, {
                    flexDirection: "row", height: 40, alignItems: "center", alignSelf: "center",
                    borderWidth: 0.6, borderRadius: 5, paddingHorizontal: 5, marginTop: 10
                }]}>
                    <Text style={[!_.isEmpty(errorReason[id]) ? { color: "red" } : {}, { flex: 1, fontFamily: "Roboto-Light", fontSize: 12, paddingLeft: 5 }]}>
                        {!_.isEmpty(errorReason[id]) ? errorReason[id] : setInputDetails.reasonsToReturn[id] || "Select a reason."}
                    </Text>
                    <Icon type='material' name='expand-more' color={!_.isEmpty(errorReason[id]) ? "red" : "black"} size={27} />
                </View>
            );
        }
        else {

            return (
                <View style={[!_.isEmpty(errorQuantity[id]) ? { borderColor: "red" } : { borderColor: Color.Standard }, {
                    flexDirection: "row", height: 40, alignItems: "center", alignSelf: "center",
                    borderWidth: 0.6, borderRadius: 5, paddingHorizontal: 5, marginTop: 10
                }]}>
                    <Text style={[!_.isEmpty(errorQuantity[id]) ? { color: "red" } : {}, { flex: 1, fontFamily: "Roboto-Light", fontSize: 12, paddingLeft: 5 }]}>
                        {!_.isEmpty(errorQuantity[id]) ? errorQuantity[id] : setInputDetails.quantityToReturn[id] || "How many."}
                    </Text>
                    <Icon type='material' name='expand-more' color={!_.isEmpty(errorQuantity[id]) ? "red" : "black"} size={27} />
                </View>
            );
        }
    }

    renderRow(type, rowData, rowID, highlighted) {
        if (type === "reason") {
            return (
                <View style={[{ paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white" },
                highlighted && { backgroundColor: Color.highlight }]}>
                    <Text style={[{ margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center" },
                        highlighted]}>
                        {`${rowData.name}`}
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={[{ paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white" },
                highlighted && { backgroundColor: Color.highlight }]}>
                    <Text style={[{ margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center" },
                        highlighted]}>
                        {`${rowData}`}
                    </Text>
                </View>
            );
        }

    }

    onChange = (value, type, id) => {
        const { actions, onlinestore: { setInputDetails } } = this.props;
        const { errorReason, errorQuantity } = this.state;
        const newInput = _.merge({}, setInputDetails);
        let reasons = _.merge({}, newInput.reasonsToReturn);
        let qty = _.merge({}, newInput.quantityToReturn);
        if (type === "reason") {
            delete errorReason[id];
            reasons[id] = value.name;
        } else {
            delete errorQuantity[id];
            qty[id] = value;
        }
        this.setState({ errorReason, errorQuantity })
        newInput.reasonsToReturn = reasons;
        newInput.quantityToReturn = qty;
        actions.setInputDetails(newInput);
    }

    _renderItems = ({ item, index }) => {
        const { onlinestore: { setInputDetails, getReasonsToCancel } } = this.props;
        const datePurchased = moment(item.date_purchased).format('MMMM DD');
        let toCountArr = [];
        for (let counter = item.quantity; counter >= 1; counter--) {
            toCountArr.push(counter)
        }
        return (
            <View key={`${index}`} style={{ marginHorizontal: 20, marginBottom: 10, }}>
                <View style={{ marginVertical: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            resizeMode='contain'
                            source={{ uri: item.coverImg }}
                            style={{ height: 50, width: 50, }} />
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

                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{}} >
                        <Text style={{ fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 13, }}>Reason: </Text>
                        <Dropdown
                            animated={true}
                            style={{ width: 140 }}
                            showsVerticalScrollIndicator={true}
                            renderBase={() => this.renderBase("reason", item.id)}
                            dropdownStyle={{ height: 80, width: 75 }}
                            options={getReasonsToCancel}
                            renderButtonText={(value) => this.onChange(value, "reason", item.id)}
                            renderRow={this.renderRow.bind(this, "reason")} />
                    </View>
                    <View style={{}} >
                        <Text style={{ fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 13, }}>Quantity: </Text>
                        <Dropdown
                            animated={true}
                            showsVerticalScrollIndicator={true}
                            renderBase={() => this.renderBase("quantity", item.id)}
                            style={{ width: 140 }}
                            dropdownStyle={[toCountArr.length > 1 ? { height: 80, } : { height: 40 }]}
                            options={toCountArr}
                            renderButtonText={(value) => this.onChange(value, "quantity", item.id)}
                            renderRow={this.renderRow.bind(this, "quantity")} />
                    </View>
                </View>

            </View>
        )
    }


    render() {
        const { onSearch, selectedProduct, toSearch, onlinestore: { setInputDetails } } = this.props;
        let products = [];
        _.filter(Object.keys(setInputDetails.selectedProductToReturn), toComp => {
            _.filter(selectedProduct.items, (item) => {
                if (_.isEqual(item.id, Number(toComp))) {
                    products.push(item);
                }
            })
        })
        count = products.length;
        arr = products
        return (
            <FlatList
                data={products}
                showsVerticalScrollIndicator={false}
                style={[products.length < 2 ? {} : { height: 250, marginTop: 5 }]}
                ItemSeparatorComponent={() => <View style={{ height: .5, backgroundColor: Color.Standard }} />}
                keyExtractor={(item, index) => { `${index}` }}
                renderItem={this._renderItems} />
        );
    }
}

ChooseReasons.propTypes = {
    onlinestore: PropTypes.object,
    navigation: PropTypes.object,
};

export default ChooseReasons;