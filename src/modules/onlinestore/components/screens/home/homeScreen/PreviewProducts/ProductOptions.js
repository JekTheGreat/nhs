/* eslint-disable */
import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions, Share, Alert } from "react-native";
import Button from "__src/components/Button";
import { Icon } from "react-native-elements";
import { Rating, AirbnbRating } from "react-native-ratings";
import _ from "lodash";
import styles from "../../../../../styles.css";
import Resources from "__src/resources";
var { height, width } = Dimensions.get('window');
const { Color } = Resources;
import { Colors } from 'react-native-paper';

class ProductOptions extends React.PureComponent {


    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Share with: ',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    _selectedButton = (type, item) => {
        const { actions, onlinestore: { setInputDetails, setSelectedItems } } = this.props;
        const newInput = _.merge({}, setInputDetails);
        newInput.type = type;
        let param = _.merge({}, newInput.options);
        param[type] = item;
        newInput.options = param;
        actions.setInputDetails(newInput);
    }

    _productOptionsItem = (variant) => ({ item, index }) => {
        const { onlinestore: { setInputDetails, setSelectedItems } } = this.props;
        const variation = _.isUndefined(setInputDetails.options[variant]) ? null : setInputDetails.options[variant];
        const variantLength = _.has(setSelectedItems, "previewProducts.variation") ? setSelectedItems.previewProducts.variation.length : {};
        console.log("ASDF", variantLength)
        return (
            <TouchableOpacity key={variant} onPress={() => this._selectedButton(variant, item)} style={[_.isEqual(variation, item) ?
                { backgroundColor: Colors.yellow700 } : { borderWidth: 1, borderColor: Colors.grey500 }, variantLength / 2 > 2 ? { width: "27%", } : {},
            { flexDirection: "row", marginTop: 10, borderRadius: 5, marginRight: 5, paddingHorizontal: 5, justifyContent: "center" }]}>
                <Text style={[_.isEqual(variation, item) ? { fontWeight: "bold", color: "white" } : { color: "black" },
                { fontSize: 13, alignSelf: "center", textAlign: "center", fontFamily: "Roboto-Light" }]}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }

    _productOptions = ({ item, index }) => {
        const { onlinestore: { setInputDetails, setSelectedItems, getProductList } } = this.props;
        const previewProducts = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
        return (
            <View key={`idx${index}`} style={{ flexDirection: "row", flex: 1 }}>
                <Text style={{
                    width: "23%", marginTop: 15, fontSize: 13, fontFamily: "Roboto-Light", fontWeight: "bold",
                    textAlign: "right", marginRight: 5
                }}>{item}:</Text>
                {_.isNull(setInputDetails.options) ? null :
                    <FlatList
                        data={previewProducts.options[item]}
                        numColumns={3}
                        renderItem={this._productOptionsItem(item)}
                        keyExtractor={(item, index) => `idx${index}`} />
                }
            </View>
        )
    }

    _changeQuantity = (type, item) => {
        const { actions, onlinestore: { setInputDetails } } = this.props;
        const newInput = _.merge({}, setInputDetails);
        let param = _.merge({}, newInput.cartQuantity);
        let num;
        if (type === "add") {
            num = 1;
            param = item + num;
            newInput.cartQuantity = param;
        }
        else {
            if (item > 1) {
                num = 1;
                param = item - num;
                newInput.cartQuantity = param;
            }
        }
        actions.setInputDetails(newInput);
    }

    _addCart = (item) => {
        const { actions, onlinestore: { setInputDetails }, login: { session } } = this.props;
        let error = "";
        if (!_.isEmpty(item.variation)) {
            Object.keys(item.variation[0].variation).map(item => {
                if (_.isEmpty(setInputDetails.options[item])) {
                    Alert.alert("Notice", `Please select ${item}`);
                    error = `Please select ${item}`;
                }
            })
        }

        if (_.isEmpty(error)) {
            const params = {};
            params.prod_id = item.id;
            !_.isEmpty(item.variation) ? params.variation = setInputDetails.options : {};
            params.quantity = setInputDetails.cartQuantity;
            actions.changeCartItem(params, session);
        }
    }


    _buyNow = (item) => {
        const { goToPage, actions, onlinestore: { setInputDetails }, login: { additionalDetails }, login: { session } } = this.props;
        actions.getDeliveryAddress(additionalDetails.individualId);
        const params = {};
        params.prod_id = item.id;
        !_.isEmpty(item.variation) ? params.variation = setInputDetails.options : {};
        params.quantity = setInputDetails.cartQuantity;
        actions.changeCartItem(params, session);
        let showFromPreview = _.merge({}, setInputDetails);
        showFromPreview.isFromPreviewProducts = true;
        showFromPreview.cartCB = {};
        showFromPreview.selectcartAll = false;
        actions.setInputDetails(showFromPreview);
        goToPage(1);
    }

    render() {
        const { onlinestore: { setSelectedItems, getCartList, setInputDetails, changeCartItem, getMyShop } } = this.props;
        const previewProducts = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
        const myShop = _.has(getMyShop, "id") ? getMyShop.id : {};
        const selectedShopId = previewProducts.shop_id.id;
        const productOptions = _.has(previewProducts, 'options') ? Object.keys(previewProducts.options) : [];
        let displayPrice;
        _.map(previewProducts.variation, item => {

            if (_.isEqual(item.variation, setInputDetails.options)) {
                displayPrice = Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
            }
        })
        const price = Number(parseFloat(previewProducts.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        const shipping_fee = Number(parseFloat(previewProducts.ship_fee).toFixed(2)).toLocaleString('en', {
            minimumFractionDigits: 2
        });
        let countCart;
        _.map(getCartList, item => {
            if (_.isEqual(previewProducts.id, item.prod_id) && _.isEqual(setInputDetails.options, item.variation)) {
                countCart = item.quantity;
            }
            else if (_.isEmpty(previewProducts.variation) && _.isEqual(previewProducts.id, item.prod_id)) {
                countCart = item.quantity;
            }
        })


        return (
            <View style={[styles.previewProductsMainView2, { marginBottom: 10 }]}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }} >
                    <View style={styles.previewProductsSubView}>
                        <Text style={{ fontSize: 20, color: Color.Standard2, fontFamily: "Roboto-Light" }}>{previewProducts.name}</Text>
                    </View>
                    <View style={{ marginTop: 20, justifyContent: "flex-end" }}>
                        {/* <Text style={styles.previewProductsTextPrice}>₱ {!_.isUndefined(displayPrice) ? displayPrice : !_.isEmpty(previewProducts.variation) ? priceRange : price}</Text> */}
                        <Text style={styles.previewProductsTextPrice}>₱ {!_.isUndefined(displayPrice) ? displayPrice : price}</Text>
                    </View>
                </View>


                <View style={styles.previewProductsSubView2}>
                    <Icon type='font-awesome' name="map-marker" size={13} color={"#9E9E9F"} />
                    <Text style={styles.previewProductsTextAddress}>{` ${previewProducts.shop_id.name}'s Shop`}</Text>
                </View>
                <View style={styles.previewProductsSubView3}>
                    <View style={styles.previewProductsSubView3SubView}>
                        <AirbnbRating
                            count={5}
                            defaultRating={previewProducts.rate}
                            isDisabled={true}
                            showRating={false}
                            size={10} />
                        <Text style={styles.previewProductsTextReviews}>{` | ${previewProducts.reviews.length} Reviews`}</Text>
                    </View>
                    <TouchableOpacity onPress={this.onShare}>
                        <Icon type='evilicon' name="share-google" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.previewProductsSubView4}>
                    <View style={styles.previewProductsSubView4SubView}>
                        <Text style={styles.previewProductsTextBrand}> {`Brand: ${previewProducts.brand}`}</Text>
                    </View>
                    <View style={styles.previewProductsSubView4SubView2}>
                        <Text style={styles.previewProductsTextShippingType}>{_.isUndefined(previewProducts.ship_fee) ? "Free Shipping" : `Shipping Fee: ₱${shipping_fee}`}</Text>
                    </View>
                </View>
                <View style={styles.previewProductsBorder}></View>
                {!_.isEqual(myShop, selectedShopId) ?
                    <View>
                        {
                            _.has(setSelectedItems, "previewProducts.options") ?
                                <FlatList
                                    style={{ marginTop: 5 }}
                                    data={productOptions}
                                    renderItem={this._productOptions}
                                    keyExtractor={(item, index) => `idx${index}`} />
                                : null
                        }
                        <View style={{ marginTop: 25, flexDirection: "row", justifyContent: "space-evenly", alignItems: "flex-start" }}>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start" }}>
                                <Text style={{ fontSize: 13, marginRight: 10, alignSelf: "center" }}>Quantity:</Text>
                                <View style={{
                                    borderWidth: 1, padding: 3, flexDirection: "row", justifyContent: "center", alignItems: "center",
                                    borderRadius: 5, borderColor: Colors.grey500
                                }} >
                                    <TouchableOpacity onPress={() => this._changeQuantity("subtract", setInputDetails.cartQuantity)} style={{ justifyContent: "center", alignItems: "center", height: 20, width: 20, }}>
                                        <Text style={{ fontSize: 13, color: Color.Standard }}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 13, marginLeft: 2, marginRight: 2 }}>{setInputDetails.cartQuantity}</Text>
                                    <TouchableOpacity onPress={() => this._changeQuantity("add", setInputDetails.cartQuantity)} style={{ justifyContent: "center", alignItems: "center", height: 20, width: 20 }}>
                                        <Text style={{ fontSize: 13, color: Color.Standard }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={() => this._addCart(previewProducts)} style={{ marginTop: 10, width: width / 2.5, borderColor: Color.colorPrimaryDark, borderWidth: 0.5, backgroundColor: Color.white, marginRight: 10 }}
                                labelStyle={{ color: Color.colorPrimary }} icon={_.isUndefined(countCart) ? "Cart" : ""}
                                label={_.isUndefined(countCart) || _.isEqual(countCart, 0) ? "Add to cart" :
                                    <Text> <Text style={{ color: Color.colorPrimary, fontWeight: "bold" }} >{`${countCart}`}</Text> Already in Cart</Text>} />
                            <Button onPress={() => this._buyNow(previewProducts)} style={{ marginTop: 10, width: width / 2.5 }} label="Buy Now" />
                        </View>
                    </View>
                    :
                    <View style={{ padding: 10, marginTop: 10, borderWidth: 1, borderColor: Color.LightBlue, borderRadius: 5 }}>
                        <Icon type='font-awesome' name='info-circle' color={Color.LightBlue} size={25} containerStyle={{ marginTop: 5, marginLeft: 10, position: 'absolute', left: 0 }} />
                        <Text style={{ fontSize: 15, fontWeight: "bold", alignSelf: "center" }}>Own Product</Text>
                        <Text style={{ fontSize: 13, alignSelf: "center" }}>You cannot buy from your own Shop.</Text>
                    </View>
                }
                <View style={{ height: 20 }}></View>
            </View>
        );
    }

}
export default ProductOptions;