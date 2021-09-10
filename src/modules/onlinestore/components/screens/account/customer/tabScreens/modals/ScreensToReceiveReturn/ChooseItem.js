/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, ScrollView, FlatList, Image } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CheckBox } from "react-native-elements";
import moment from 'moment';
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;

class ChooseItem extends PureComponent {

    onNext = () => {
        const { actions, onlinestore: { setInputDetails } } = this.props;
        if (_.isEmpty(setInputDetails.selectedProductToReturn)) {
            alert("Select Item to Return");
        } else {
            actions.setToReturnScreen("chooseReason");
        }
        // let arr = []
        // arr.push({ type: "ASDFASFD", actions: "QWEQWEQ" }, { type: "1231231", actions: "3213231312" })
        // console.log(arr)
    }

    _onCheck = (id) => {
        const { actions, onlinestore: { setInputDetails } } = this.props;
        const newInput = _.merge({}, setInputDetails);
        let toreturn = _.merge({}, newInput.selectedProductToReturn);
        let selected = { ...toreturn };
        let value = !selected[id];
        if (value) {
            selected[id] = true;
        }
        else {
            delete selected[id];
        }
        newInput.selectedProductToReturn = selected;
        actions.setInputDetails(newInput);
    }

    _renderItems = ({ item, index }) => {
        const { onlinestore: { setInputDetails } } = this.props;
        const datePurchased = moment(item.date_purchased).format('MMMM DD');
        const params = setInputDetails.selectedProductToReturn;
        const selected = params[item.id] ? true : false;
        return (
            <View key={`${index}`} style={{ marginHorizontal: 20, marginVertical: 10, }}>
                <View style={{ marginVertical: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <CheckBox
                            containerStyle={{
                                justifyContent: "center", height: 10, width: 15, paddingLeft: 0, marginLeft: 0,
                                alignSelf: "center", borderColor: "transparent", backgroundColor: "transparent",
                            }}
                            checkedColor={Color.colorPrimary}
                            checked={selected}
                            onPress={() => this._onCheck(item.id)} />
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
            </View>
        )
    }

    render() {
        const { onSearch, selectedProduct, toSearch, onlinestore: { getPurchaseList } } = this.props;
        return (
            <FlatList
                data={selectedProduct.items}
                style={[selectedProduct.items.length <= 2 ? {} : { height: 160, }]}
                ItemSeparatorComponent={() => <View style={{ height: .5, backgroundColor: Color.Standard }} />}
                keyExtractor={(item, index) => { `${index}` }}
                renderItem={this._renderItems} />
        );
    }
}

ChooseItem.propTypes = {
    onlinestore: PropTypes.object,
    navigation: PropTypes.object,
};

export default ChooseItem;