/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, ScrollView, FlatList, Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Icon, CheckBox, Tooltip } from "react-native-elements";
import moment from 'moment';
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;

class ChooseItem extends PureComponent {

    state = { isDisable: false }

    componentWillMount() {
        const { isDisable, actions, marketplace: { setSelectedTransaction } } = this.props;
        let istrue;
        const test = _.map(setSelectedTransaction.items.items, (product, index) => {
            return product.status
        })
        if (test.includes("Return-Pending")) {
            for (let i = 0; i < test.length; i++) {
                if (test[0] !== test[i]) {
                    istrue = false
                } else {
                    istrue = true;
                }
            }
            this.setState({ isDisable: istrue });
            isDisable(istrue)
        } else {
            this.setState({ isDisable: false });
            isDisable(this.state.isDisable)
        }

        // if (test.join('').split(test[0]).join('').length === 0 && !test.includes("Return-Pending")) {
        //     this.setState({ isDisable: false });
        //     isDisable(this.state.isDisable)
        // } else {
        //     this.setState({ isDisable: true });
        //     isDisable(this.state.isDisable)
        // }
        console.log("TEST", test.every((val, ind, test) => console.log("val", val, test[0])))
    }

    onNext = () => {
        const { actions, marketplace: { setInputDetails } } = this.props;
        if (_.isEmpty(setInputDetails.selectedProductToReturn) && !this.state.isDisable) {
            Alert.alert("Notice", "Select item to return first.");
        } else {
            actions.setToReturnScreen("chooseReason");
        }
    }

    _onCheck = (id, item) => {
        const { isDisable, actions, marketplace: { setInputDetails } } = this.props;
        const newInput = _.merge({}, setInputDetails);
        let toreturn = _.merge({}, newInput.selectedProductToReturn);
        let selected = { ...toreturn };
        let value = !selected[id];
        if (value) {
            selected[id] = item;
        }
        else {
            delete selected[id];
        }
        newInput.selectedProductToReturn = selected;
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
        const { marketplace: { setSelectedTransaction, setInputDetails } } = this.props;
        const price = Number(parseFloat(item.total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        const productCreated = moment(setSelectedTransaction.items.CreatedAt).format('MMM DD')
        const expectedDelivery = moment(setSelectedTransaction.items.CreatedAt).add(item.delivery_days, 'days').format('DD')
        const Estimated = `${productCreated} - ${expectedDelivery}`;
        const selected = setInputDetails.selectedProductToReturn.hasOwnProperty(`${item.id}`) ? true : false;
        return (
            <View style={{ paddingVertical: 10, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }}>
                <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    {item.status === "Return-Pending" ?
                        <Tooltip overlayColor='transparent' backgroundColor={Color.Standard2} containerStyle={{ alignSelf: "center" }}
                            popover={<Text style={{ color: "white", fontSize: 10 }}>You already returned this item</Text>}>
                            <Icon type='font-awesome' name='info-circle' color={"red"} size={15} />
                        </Tooltip>
                        :
                        <CheckBox
                            containerStyle={{
                                justifyContent: "center", height: 10, width: 15, paddingLeft: 0, marginLeft: 0,
                                alignSelf: "center", borderColor: "transparent", backgroundColor: "transparent",
                            }}
                            checkedColor={Color.colorPrimary}
                            checked={selected}
                            onPress={() => this._onCheck(item.id, item)} />}

                    <Image source={{ uri: item.coverImg }} style={{ width: "20%", height: 60 }} resizeMode='stretch' />
                    <View style={{ width: "70%", }}>
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

            </View>
        )
    }

    render() {
        const { marketplace: { setSelectedTransaction } } = this.props;
        console.log("STATE", this.state)
        return (
            <FlatList
                data={setSelectedTransaction.items.items}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => `ind ${index}`}
                renderItem={this._renderItems} />
        );
    }
}

ChooseItem.propTypes = {
    marketplace: PropTypes.object,
    navigation: PropTypes.object,
};

export default ChooseItem;