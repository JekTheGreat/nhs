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
        const { actions, marketplace: { setInputDetails } } = this.props;
        const { errorReason, errorQuantity } = this.state;
        let errReason = {}
        let errQty = {}

        _.filter(Object.keys(setInputDetails.selectedProductToReturn), id => {
            if (!setInputDetails.reasonsToReturn.hasOwnProperty(`${id}`)) {
                errReason[id] = "This field is required";
            } if (!setInputDetails.quantityToReturn.hasOwnProperty(`${id}`)) {
                errQty[id] = "This field is required";
            }
        })
        this.setState({ errorReason: errReason, errorQuantity: errQty });

        if (_.isEmpty(errorReason) && _.isEmpty(errorQuantity) &&
            (_.isEqual(Object.keys(setInputDetails.selectedProductToReturn), Object.keys(setInputDetails.reasonsToReturn))) &&
            (_.isEqual(Object.keys(setInputDetails.selectedProductToReturn), Object.keys(setInputDetails.quantityToReturn)))) {
            actions.setToReturnScreen("uploadPhoto");
        }
    }

    renderBase = (type, id) => {
        const { marketplace: { setInputDetails } } = this.props;
        const { errorReason, errorQuantity } = this.state;
        if (type === "reason") {
            return (
                <View style={[!_.isEmpty(errorReason[id]) ? { borderColor: "red" } : { borderColor: Color.Standard }, {
                    flexDirection: "row", height: 40, alignItems: "center", alignSelf: "center",
                    borderWidth: 0.6, borderRadius: 5, paddingHorizontal: 5, marginTop: 10
                }]}>
                    <Text style={[!_.isEmpty(errorReason[id]) ? { color: "red" } :
                        !setInputDetails.reasonsToReturn.hasOwnProperty(`${id}`) && _.isEmpty(errorReason[id]) ? { color: Color.Standard2 } : { color: "black" },
                    { flex: 1, fontFamily: "Roboto-Light", fontSize: 12, paddingLeft: 5 }]}>
                        {!_.isEmpty(errorReason[id]) ? errorReason[id] : setInputDetails.reasonsToReturn.hasOwnProperty(`${id}`) ? setInputDetails.reasonsToReturn[id] : "Select a reason."}
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
                    <Text style={[!_.isEmpty(errorQuantity[id]) ? { color: "red" } :
                        !setInputDetails.quantityToReturn.hasOwnProperty(`${id}`) && _.isEmpty(errorQuantity[id]) ? { color: Color.Standard2 } : { color: "black" },
                    { flex: 1, fontFamily: "Roboto-Light", fontSize: 12, paddingLeft: 5 }]}>
                        {!_.isEmpty(errorQuantity[id]) ? errorQuantity[id] : setInputDetails.quantityToReturn.hasOwnProperty(`${id}`) ? setInputDetails.quantityToReturn[id] : "How many."}
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
        const { actions, marketplace: { setInputDetails } } = this.props;
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

    _productOptions = (items) => ({ item, index }) => {
        return (
            <View key={`idx ${index}`} style={{ marginTop: 5 }}>
                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>
                    {`${item}: ${items.variation[item]}, `}
                </Text>
            </View>
        )
    }

    _renderItems = ({ item, index }) => {
        const { marketplace: { setSelectedTransaction, setInputDetails, getReasonList } } = this.props;
        const price = Number(parseFloat(item.total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        const productCreated = moment(setSelectedTransaction.items.CreatedAt).format('MMM DD')
        const expectedDelivery = moment(setSelectedTransaction.items.CreatedAt).add(item.delivery_days, 'days').format('DD')
        const Estimated = `${productCreated} - ${expectedDelivery}`;
        let toCountArr = [];
        for (let counter = item.quantity; counter >= 1; counter--) {
            toCountArr.push(counter)
        }
        return (
            <View style={{ paddingVertical: 10, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }}>
                <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                    <Image source={{ uri: item.coverImg }} style={{ width: "20%", height: 60 }} resizeMode='stretch' />
                    <View style={{ width: "75%", }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.prod_name}</Text>
                        <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`Qty: ${item.quantity}`}</Text>
                        <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`₱ ${price}`}</Text>
                    </View>

                </View>
                { !_.isNull(item.variation) &&
                    <FlatList
                        data={Object.keys(item.variation)}
                        keyExtractor={(index) => `idx ${index}`}
                        style={{ flexDirection: 'row' }}
                        renderItem={this._productOptions(item)} />}

                <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Estimated Arrival: </Text>
                    <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: Color.colorPrimaryMP }}>
                        {Estimated}
                    </Text>
                </View>


                <View style={{ marginVertical: 10 }} >
                    <Text style={{ marginBottom: 5, fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 12, }}>Reason: </Text>
                    <Dropdown
                        animated={true}
                        showsVerticalScrollIndicator={true}
                        renderBase={() => this.renderBase("reason", item.id)}
                        dropdownStyle={{ height: 125 }}
                        options={getReasonList}
                        renderButtonText={(value) => this.onChange(value, "reason", item.id)}
                        renderRow={this.renderRow.bind(this, "reason")} />
                </View>
                <View style={{ marginBottom: 10 }} >
                    <Text style={{ marginBottom: 5, fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 12, }}>Quantity: </Text>
                    <Dropdown
                        animated={true}
                        showsVerticalScrollIndicator={true}
                        renderBase={() => this.renderBase("quantity", item.id)}
                        style={{ width: "50%" }}
                        dropdownStyle={{ height: 80, width: "50%" }}
                        options={toCountArr}
                        renderButtonText={(value) => this.onChange(value, "quantity", item.id)}
                        renderRow={this.renderRow.bind(this, "quantity")} />
                </View>

            </View>
        )
    }


    render() {
        const { marketplace: { setSelectedTransaction, setInputDetails } } = this.props;
        return (
            <FlatList
                data={Object.values(setInputDetails.selectedProductToReturn)}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => `ind ${index}`}
                renderItem={this._renderItems} />
        );
    }
}

ChooseReasons.propTypes = {
    marketplace: PropTypes.object,
    navigation: PropTypes.object,
};

export default ChooseReasons;