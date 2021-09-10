import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import Button from "__src/components/Button";
import _ from 'lodash';
import { Icon, CheckBox } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
var { height, width } = Dimensions.get('window');

export default class CartList extends React.PureComponent {

    state = {
        itemShowing: [],
    }

    _changeCartItem = (type, item) => {
        const { actions, login: { session } } = this.props;
        const params = {}
        let num;
        if (type === "add") {
            num = 1;
            params.prod_id = item.prod_id;
            _.isNull(item.variation) ? "" : params.variation = item.variation;
            params.quantity = num;
            actions.addToCart(session, params);
        }
        else {
            if (item.quantity > 1) {
                num = -1;
                params.prod_id = item.prod_id;
                _.isNull(item.variation) ? "" : params.variation = item.variation;
                params.quantity = num;
                actions.addToCart(session, params);
            }
        }
    }

    _selectedButton = (id, type, item) => {
        const { actions, marketplace: { setProductOptions } } = this.props;
        const newOptions = _.merge({}, setProductOptions);
        let param = _.merge({}, newOptions[id]);
        param[type] = item;
        newOptions[id] = param;
        actions.setProductOptions(newOptions);
    }

    _productOptionsItem = (id, variant, variation) => ({ item, index }) => {
        const { actions, marketplace: { setProductOptions }, login: { session } } = this.props;
        const opts = setProductOptions.hasOwnProperty(`${id}`) ? setProductOptions[id][variant] : {};
        return (
            <TouchableOpacity key={`variant ${variant}`} onPress={() => this._selectedButton(id, variant, item)}
                style={[((_.isEmpty(opts) || _.isUndefined(opts)) && _.isEqual(variation[variant], item)) || _.isEqual(opts, item) ?
                    { backgroundColor: Color.colorPrimaryMP } : { borderWidth: .5, borderColor: Colors.grey400 },
                { flex: 1, padding: 5, flexDirection: "row", marginTop: 5, borderRadius: 5, marginRight: 5, }]}>
                <Text style={[((_.isEmpty(opts) || _.isUndefined(opts)) && _.isEqual(variation[variant], item)) || _.isEqual(opts, item) ? { fontWeight: "bold", color: "white" } : { color: Color.Standard2 },
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
                    renderItem={this._productOptionsItem(cartItem.id, item, cartItem.variation)} />
            </View>
        )
    }

    _onCheck = (item, index) => {
        const { actions, marketplace: { setCartListOnCheck }, login: { session } } = this.props;
        let param = {};
        let isCheck = _.merge({}, setCartListOnCheck);
        let selectedItems = { ...isCheck };
        let value = !selectedItems[item.id];
        if (value) {
            selectedItems[item.id] = item;
        } else {
            delete selectedItems[item.id];
        }
        param.id = Object.keys(selectedItems);
        console.log("ASDFASDF", param)
        actions.postGetCharge(session, param)
        actions.setCartListOnCheck(selectedItems);
    }

    _hideItem = (item, index) => {
        const { actions, marketplace: { setProductOptions }, login: { session } } = this.props;
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
            if (!_.isEmpty(setProductOptions[item.id])) {
                _.map(Object.keys(item.options), opt => {
                    delete setProductOptions[item.id][opt];
                })
            }
        }
    }

    _edit = (item) => {
        const { actions, marketplace: { setProductOptions }, login: { session } } = this.props;
        if (!_.isEmpty(setProductOptions)) {
            let param = {}
            let obj = {}
            param.prod_id = item.prod_id;
            _.map(Object.keys(item.options), opt => {
                _.map(Object.keys(item.variation), setopt => {
                    obj[opt] = setProductOptions[item.id][opt];
                    console.log("true", obj[opt], setProductOptions[item.id][opt])
                    if (_.isUndefined(setProductOptions[item.id][opt])) {
                        obj[opt] = item.variation[opt];
                    }
                })
            })
            param.variation = obj;
            actions.patchCartOptions(item.id, session, param);
        }
    }

    _goToPreview = (item) => {
        const { navigation, actions, marketplace: { setSelectedItems }, login: { session } } = this.props;
        let newPreviewDetails = _.merge({}, setSelectedItems);
        newPreviewDetails.header = item.name;
        actions.setSelectedItems(newPreviewDetails);
        actions.postSelectedProducts(session, item.prod_id, item.slug);
    }

    _renderCartList = ({ item, index }) => {
        const { actions, marketplace: { setCartListOnCheck } } = this.props;
        const { itemShowing } = this.state;
        const isShowing = (!_.isUndefined(itemShowing[index]) || !_.isEmpty(itemShowing[index])) ? true : false;
        const selected = setCartListOnCheck.hasOwnProperty(`${item.id}`) ? true : false;
        return (
            <View key={`item_id ${item.id}`} style={{ borderBottomWidth: 1, borderBottomColor: Colors.grey200, paddingHorizontal: 15, marginTop: 15, paddingBottom: 15 }}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
                    <Text style={{ marginLeft: 35, color: Color.Standard2, fontWeight: "normal", fontSize: 14, fontFamily: "Roboto-Light" }}>
                        {`${item.shop_name} Official Store`}
                    </Text>
                    {!_.isUndefined(item.options) && isShowing &&
                        <TouchableOpacity onPress={() => this._edit(item)} style={{ backgroundColor: Color.colorPrimaryMP, borderRadius: 5, justifyContent: "center", alignItems: "center", paddingHorizontal: 15, paddingVertical: 3 }}>
                            <Text style={{ color: "white", fontWeight: "normal", fontWeight: "bold", fontSize: 13, fontFamily: "Roboto-Light" }}>
                                {`Edit`}
                            </Text>
                        </TouchableOpacity>}
                </View>

                <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
                    <CheckBox
                        containerStyle={{ padding: 0, marginLeft: 0, borderColor: "transparent", backgroundColor: "transparent" }}
                        checkedColor={Color.colorPrimaryMP}
                        checked={selected}
                        onPress={() => this._onCheck(item, index)} />
                    <Image source={{ uri: item.coverImg }} style={{ height: 60, width: 90 }} />
                    <View style={{ width: "60%", marginLeft: 10 }} >
                        <Text onPress={() => this._goToPreview(item)} numberOfLines={2} style={{ color: Color.Standard2, fontWeight: "normal", fontSize: 14, fontFamily: "Roboto" }}>
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
                    <TouchableOpacity onPress={() => this._changeCartItem("subtract", item)} style={{ justifyContent: "center", alignItems: "center", height: 20, width: 20, }}>
                        <Text style={{ fontSize: 12, color: Color.Standard }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: "center", fontSize: 12, marginLeft: 2, marginRight: 2, color: Color.Standard2 }}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => this._changeCartItem("add", item)} style={{ justifyContent: "center", alignItems: "center", height: 20, width: 20 }}>
                        <Text style={{ fontSize: 12, color: Color.Standard }}>+</Text>
                    </TouchableOpacity>
                </View>

                { !_.isUndefined(item.options) &&
                    <TouchableOpacity onPress={() => this._hideItem(item, index)} style={{ marginTop: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
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
        const { isSelectAll, marketplace: { countCart, getCartList } } = this.props;
        return (
            <FlatList
                data={getCartList}
                keyExtractor={item => `item_id ${item.id}`}
                renderItem={this._renderCartList} />
        )
    }
}