/* eslint-disable */
import React from "react";
import { View, Text, ScrollView, Animated, Image, TouchableOpacity, FlatList, Modal, Dimensions } from "react-native";
import _ from "lodash";
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');


class Options extends React.PureComponent {

    _selectedButton = (type, item) => {
        const { actions, productDetails, marketplace: { setProductOptions } } = this.props;
        const newOptions = _.merge({}, setProductOptions);
        let param = _.merge({}, newOptions[productDetails.id]);
        param[type] = item;
        newOptions[productDetails.id] = param;
        actions.setProductOptions(newOptions);
    }


    _productOptionsItem = (variant) => ({ item, index }) => {
        const { productDetails, marketplace: { setProductOptions } } = this.props
        const variation = !_.isUndefined(setProductOptions[productDetails.id][variant]) && setProductOptions[productDetails.id][variant];
        return (
            <TouchableOpacity key={variant} onPress={() => this._selectedButton(variant, item)} style={[_.isEqual(variation, item) ?
                { backgroundColor: Color.colorPrimaryMP } : { borderWidth: .5, borderColor: Colors.grey400 },
            { flex: 1, padding: 5, flexDirection: "row", marginTop: 10, borderRadius: 5, marginRight: 5, }]}>
                <Text style={[_.isEqual(variation, item) ? { fontWeight: "bold", color: "white" } : { color: "black" },
                { flex: 1, fontSize: 12, alignSelf: "center", textAlign: "center", fontFamily: "Roboto-Light" }]}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }


    _productOptions = ({ item, index }) => {
        const { productDetails, marketplace: { setProductOptions } } = this.props
        return (
            <View key={`idx${index}`} style={{ marginTop: 15 }}>
                <Text style={{ paddingHorizontal: 15, fontSize: 12, fontFamily: "Roboto-Light", fontWeight: "bold" }}>
                    {item}:
                </Text>
                {!_.isNull(setProductOptions) &&
                    <FlatList
                        style={{ marginHorizontal: 15, }}
                        data={productDetails.options[item]}
                        numColumns={3}
                        renderItem={this._productOptionsItem(item)}
                        keyExtractor={(item, index) => `idx${index}`} />}
            </View>
        )
    }

    render() {
        const { productDetails } = this.props
        const productOptions = _.has(productDetails, 'options') ? Object.keys(productDetails.options) : [];
        return (
            !_.isEmpty(productDetails.options) &&
            <FlatList
                style={{ marginTop: 5 }}
                data={productOptions}
                renderItem={this._productOptions}
                keyExtractor={(item, index) => `idx${index}`} />
        )
    }
}

export default class OptionsModal extends React.PureComponent {

    state = {
        cartQuantity: 1,
    }

    _changeQuantity = (type, item) => {
        const { actions, productDetails } = this.props;
        if (Number(productDetails.quantity) !== 0) {
            let param;
            let num;
            if (type === "add") {
                num = 1;
                param = item + num;
                this.setState({ cartQuantity: param })
            }
            else {
                if (item > 1) {
                    num = 1;
                    param = item - num;
                    this.setState({ cartQuantity: param })
                }
            }
        }
    }

    _onPress = () => {
        const { closeModal, actions, buttonType, productDetails, navigation, marketplace: { setProductOptions }, login: { session } } = this.props
        if (Number(productDetails.quantity) !== 0) {
            let param = {};
            param.prod_id = productDetails.id
            param.quantity = this.state.cartQuantity;
            !_.isEmpty(productDetails.variation) ? param.variation = setProductOptions[productDetails.id] : {};
            actions.addToCart(session, param);
        }
    }

    render() {
        const { closeModal, isModalShowing, buttonType, productDetails, marketplace: { setProductOptions } } = this.props
        let optionsPrice;
        _.map(productDetails.variation, item => {
            if (_.isEqual(item.variation, setProductOptions[productDetails.id])) {
                optionsPrice = Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
            }
        })
        const price = Number(parseFloat(productDetails.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        const displayPrice = _.isEmpty(productDetails.variation) ? price : optionsPrice;
        return (
            <Modal
                ref={"modalProductReview"}
                visible={isModalShowing}
                transparent
                onRequestClose={closeModal}>
                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    <View style={{ width: width, height: "65%", backgroundColor: "white", borderTopStartRadius: 5, borderTopEndRadius: 5 }}>
                        <Icon onPress={closeModal} type='font-awesome' name='times' size={25} color={Color.colorPrimaryMP} containerStyle={{ alignSelf: "flex-end", marginTop: 5, marginRight: 5 }} />

                        <View style={{ paddingHorizontal: 15 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image source={{ uri: productDetails.coverImg }} style={{ height: 60, width: 90 }} />
                                <View style={{ width: "60%", marginLeft: 10 }} >
                                    <Text numberOfLines={2} style={{ color: Color.Standard2, fontWeight: "bold", fontSize: 14, fontFamily: "Roboto-Light" }}>
                                        {`${productDetails.name}`}
                                    </Text>

                                    {!_.isNull(productDetails.discount_percent) && !_.isEqual(productDetails.discount, 0) ?
                                        <View style={{}}>
                                            <Text style={{ marginTop: 10, color: Color.colorPrimaryMP, fontWeight: "bold", fontSize: 14, fontFamily: "Roboto-Light" }}>
                                                ₱ {Number(parseFloat(productDetails.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
                                            </Text>
                                            <Text style={{ fontSize: 12, textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                                                ₱ {Number(parseFloat(productDetails.old_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
                                            </Text>
                                        </View> :
                                        <Text style={{ marginTop: 10, color: Color.colorPrimaryMP, fontWeight: "bold", fontSize: 14, fontFamily: "Roboto-Light" }}>
                                            ₱ {displayPrice}
                                        </Text>}
                                </View>
                            </View>
                        </View>

                        <Options {...this.props} />

                        <View style={[_.isEmpty(productDetails.variation) ? { position: "absolute", bottom: 0 } : {},
                        { width: "100%", height: "30%", justifyContent: "center", paddingHorizontal: 15, }]}>

                            <View style={{ justifyContent: "flex-start" }}>
                                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", fontWeight: "bold", marginBottom: 10, }}>Quantity:</Text>

                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ borderWidth: 1, borderColor: Colors.grey400, padding: 3, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRadius: 5 }}>
                                        <TouchableOpacity
                                            activeOpacity={Number(productDetails.quantity) === 0 ? 1 : 0}
                                            onPress={() => this._changeQuantity("subtract", this.state.cartQuantity)}
                                            style={{ justifyContent: "center", alignItems: "center", height: 20, width: 20, }}>
                                            <Text style={{ fontSize: 12, color: Color.Standard }}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={{ width: "35%", textAlign: "center", fontSize: 12, marginLeft: 2, marginRight: 2, color: Color.Standard2 }}>{Number(productDetails.quantity) === 0 ? 0 : this.state.cartQuantity}</Text>
                                        <TouchableOpacity
                                            activeOpacity={Number(productDetails.quantity) === 0 ? 1 : 0}
                                            onPress={() => this._changeQuantity("add", this.state.cartQuantity)}
                                            style={{ justifyContent: "center", alignItems: "center", height: 20, width: 20 }}>
                                            <Text style={{ fontSize: 12, color: Color.Standard }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ fontSize: 12, alignSelf: "center", textAlign: "center", fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                                        {`${productDetails.quantity} stocks remaining`}
                                    </Text>
                                </View>

                            </View>


                            <TouchableOpacity
                                onPress={() => this._onPress()}
                                activeOpacity={Number(productDetails.quantity) === 0 ? 1 : 0}
                                style={[Number(productDetails.quantity) === 0 ? { backgroundColor: Color.Standard } : { backgroundColor: Color.colorPrimaryMP },
                                { alignSelf: "center", marginTop: 10, paddingVertical: 10, width: "100%", borderRadius: 5, }]}>
                                <Text style={{ fontWeight: "bold", color: "white", fontSize: 14, textAlign: "center", fontFamily: "Roboto-Light" }}>
                                    {_.isEqual(buttonType, "buyNow") ? "Buy Now" : "Add to Cart"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal >
        )
    }
}