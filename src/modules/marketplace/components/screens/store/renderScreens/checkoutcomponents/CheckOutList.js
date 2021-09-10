import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import Button from "__src/components/Button";
import _ from 'lodash';
import DeliveryAddress from './DeliveryAddress';
import PaymentMethod from './PaymentMethod';
import TermsCondition from './TermsCondition';
import TransactionPassword from './TransactionPassword';
import { Icon, CheckBox } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
var { height, width } = Dimensions.get('window');

export default class CheckOutList extends React.PureComponent {

    state = {
        itemShowing: [],
    }

    _productOptionsItem = (variant, variation) => ({ item, index }) => {
        return (
            <TouchableOpacity key={`variant ${variant}`} disabled style={[_.isEqual(variation[variant], item) ?
                { backgroundColor: Color.colorPrimaryMP } : { borderWidth: .5, borderColor: Colors.grey400 },
            { flex: 1, padding: 5, flexDirection: "row", marginTop: 5, borderRadius: 5, marginRight: 5, }]}>
                <Text style={[_.isEqual(variation[variant], item) ? { fontWeight: "bold", color: "white" } : { color: Color.Standard2 },
                { flex: 1, fontSize: 12, alignSelf: "center", textAlign: "center", fontFamily: "Roboto-Light" }]}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }

    _productOptions = (cartItem) => ({ item, index }) => {
        return (
            <View key={`idx ${index}`} style={{ marginTop: 5 }}>
                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                    {item}:
                </Text>
                <FlatList
                    data={cartItem.options[item]}
                    numColumns={3}
                    keyExtractor={item => `variant ${item}`}
                    renderItem={this._productOptionsItem(item, cartItem.variation)} />
            </View>
        )
    }

    _hideItem = (index) => {
        let selected = [...this.state.itemShowing];
        let value = !selected[index];
        if (value) {
            this.setState(previousState => {
                const itemShowing = [...previousState.itemShowing];
                itemShowing[index] = true;
                return { itemShowing };
            });
        }
        else {
            this.setState(previousState => {
                const itemShowing = [...previousState.itemShowing];
                delete itemShowing[index];
                return { itemShowing };
            });
        }
    }

    _renderCheckOutList = ({ item, index }) => {
        const { itemShowing } = this.state;
        const isShowing = (!_.isUndefined(itemShowing[index]) || !_.isEmpty(itemShowing[index])) ? true : false;
        return (
            <View key={`item_id ${item.id}`} style={{ borderBottomWidth: 1, borderBottomColor: Colors.grey200, paddingHorizontal: 15, marginTop: 15, paddingBottom: 15 }}>
                <Text style={{ marginLeft: 35, color: Color.Standard2, fontWeight: "normal", fontSize: 14, fontFamily: "Roboto-Light" }}>
                    {`${item.shop_name} Official Store`}
                </Text>
                <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
                    <CheckBox
                        containerStyle={{ padding: 0, marginLeft: 0, borderColor: "transparent", backgroundColor: "transparent" }}
                        checkedColor={Color.colorPrimaryMP}
                        checked={true}
                        disabled />
                    <Image source={{ uri: item.coverImg }} style={{ height: 60, width: 90 }} />
                    <View style={{ width: "60%", marginLeft: 10 }} >
                        <Text numberOfLines={2} style={{ color: Color.Standard2, fontWeight: "normal", fontSize: 14, fontFamily: "Roboto" }}>
                            {`${item.name}`}
                        </Text>
                        <Text style={{ marginTop: 10, color: Color.colorPrimaryMP, fontWeight: "bold", fontSize: 14, fontFamily: "Roboto" }}>
                            ₱ {Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
                        </Text>
                    </View>
                </View>

                { !_.isUndefined(item.options) && isShowing &&
                    <FlatList
                        style={{ marginTop: 5, marginLeft: 35 }}
                        data={Object.keys(item.options)}
                        keyExtractor={(index) => `idx ${index}`}
                        renderItem={this._productOptions(item)} />}

                <Text style={{ marginLeft: 35, fontFamily: "Roboto-Light", marginVertical: 5, fontSize: 12, color: Color.Standard2 }}>Quantity:</Text>
                <View style={{ marginLeft: 35, width: "35%", backgroundColor: Colors.grey200, borderWidth: 1, borderColor: Colors.grey400, padding: 3, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRadius: 5 }}>
                    <TouchableOpacity disabled style={{ justifyContent: "center", alignItems: "center", height: 20, width: 20, }}>
                        <Text style={{ fontSize: 12, color: Color.Standard }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: "center", fontSize: 12, marginLeft: 2, marginRight: 2, color: Color.Standard2 }}>{item.quantity}</Text>
                    <TouchableOpacity disabled style={{ justifyContent: "center", alignItems: "center", height: 20, width: 20 }}>
                        <Text style={{ fontSize: 12, color: Color.Standard }}>+</Text>
                    </TouchableOpacity>
                </View>

                { !_.isUndefined(item.options) &&
                    <TouchableOpacity onPress={() => this._hideItem(index)} style={{ marginTop: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ textAlign: "center", fontFamily: "Roboto-Light", marginRight: 5, fontSize: 14, fontWeight: "bold", color: Color.colorPrimaryMP }}>
                            {isShowing ? "Hide Variations" : "Show Variations"}
                        </Text>
                        <Icon type='font-awesome' name={isShowing ? 'chevron-up' : 'chevron-down'} color={Color.colorPrimaryMP} size={13} />
                    </TouchableOpacity>
                }
            </View>
        )
    }


    render() {
        const { marketplace: { postGetCharge } } = this.props;
        const ProductArray = _.has(postGetCharge, "data") ? postGetCharge.data : [];
        return (
            <ScrollView>
                <DeliveryAddress {...this.props} />
                <FlatList
                    data={ProductArray}
                    keyExtractor={item => `item_id ${item.id}`}
                    renderItem={this._renderCheckOutList} />
                <PaymentMethod  {...this.props} />
                <TermsCondition {...this.props} />
                <TransactionPassword {...this.props} />
            </ScrollView>
        )
    }
}