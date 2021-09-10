import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import _ from 'lodash';
import Dropdown from "__src/components/Dropdown";
import { Rating } from 'react-native-ratings';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class ProductDetails extends React.PureComponent {

    renderBase() {
        const { productDetails, marketplace: { setSelectedItems } } = this.props;
        const area = !_.isUndefined(setSelectedItems.region) ? `${setSelectedItems.region}, ${setSelectedItems.city}` : !_.isEmpty(productDetails.area) && `${productDetails.area[0].region}, ${productDetails.area[0].city}`
        return (
            <View style={{ flexDirection: "row", width: 200, height: 40, alignItems: "center", alignSelf: "center" }}>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 14, paddingLeft: 5 }}>
                    {area}
                </Text>
                <Icon type='material' name='expand-more' color={"black"} size={23} />
            </View>
        );
    }

    renderRow(rowData, rowID, highlighted) {
        return (
            <View style={[{ paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white" },
            highlighted && { backgroundColor: Color.highlight }]}>
                <Text style={[{ margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center" },
                    highlighted]}>
                    {`${rowData.region}, ${rowData.city}`}
                </Text>
            </View>
        );
    }

    onChange = (value) => {
        const { actions, marketplace: { setSelectedItems } } = this.props;
        let newInput = _.merge({}, setSelectedItems);
        newInput.shipping = value.ship_fee;
        newInput.region = value.region;
        newInput.city = value.city;
        actions.setSelectedItems(newInput);
    }


    render() {
        const { productDetails, marketplace: { setSelectedItems, } } = this.props;
        const rate = productDetails.rate / 2;
        const shipFeeFrom = !_.isUndefined(setSelectedItems.shipping) ? setSelectedItems.shipping : !_.isEmpty(productDetails.area) ? productDetails.area[0].ship_fee : null;
        const shipfee = _.isNull(shipFeeFrom) ? 0 : shipFeeFrom;
        const shipFormat = Number(parseFloat(shipfee).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        const b = _.isString(productDetails.price) ? productDetails.price.split(/[.\-_]/) : [];
        const c = b.map(Number);
        const minPrice = !_.isEmpty(c) && (c[0]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const maxPrice = !_.isEmpty(c) && (c[1]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const priceRange = _.isEqual(minPrice, maxPrice) ? maxPrice : `${minPrice} - ${maxPrice}`;
        const price = _.isNumber(productDetails.price) ? Number(parseFloat(productDetails.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }) : priceRange;
        const area = !_.isUndefined(setSelectedItems.region) ? `${setSelectedItems.region}, ${setSelectedItems.city}` : !_.isEmpty(productDetails.area) && `${productDetails.area[0].region}, ${productDetails.area[0].city}`
        return (
            <View style={{ marginHorizontal: 15, marginVertical: 10, }}>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 14, color: Color.colorPrimaryMP, fontWeight: "bold", marginBottom: 10 }}> {productDetails.quality} </Text>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 16, color: "black", fontWeight: "bold" }}> {productDetails.name} </Text>
                <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginRight: 15 }}>
                        <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: Color.colorPrimaryMP, fontWeight: "bold", marginRight: 5 }}> {rate} </Text>
                        <Rating
                            style={{ alignSelf: "center" }}
                            startingValue={rate}
                            readonly={true}
                            imageSize={15}
                            ratingColor={Color.colorPrimaryMP} />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginRight: 15 }}>
                        <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard, marginRight: 10 }}>| </Text>
                        <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard2 }}>{`${productDetails.reviews.length} Ratings`} </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard, marginRight: 10 }}>| </Text>
                        <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard2, }}>{`${productDetails.sale} Sold`} </Text>
                    </View>
                </View>

                {!_.isNull(productDetails.discount_percent) && !_.isEqual(productDetails.discount, 0) ?
                    <View style={{ flexDirection: "row", marginTop: 15, alignItems: "center" }}>
                        <Text style={{ marginRight: 20, textAlign: "center", fontSize: 16, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.colorPrimaryMP }}>
                            ₱ {Number(parseFloat(productDetails.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
                        </Text>
                        <Text style={{
                            fontSize: 14, textDecorationLine: 'line-through', textAlign: "center",
                            textDecorationStyle: 'solid', fontFamily: "Roboto-Light", color: Color.Standard2
                        }}>
                            ₱ {Number(parseFloat(productDetails.old_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
                        </Text>
                    </View> :
                    <Text style={{ marginTop: 15, textAlign: "left", fontSize: 16, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.colorPrimaryDark }}>
                        ₱ {price}
                    </Text>
                }

                <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontFamily: "Roboto-Light", fontSize: 14, color: Color.Standard2 }}>Shipping To: </Text>
                    <View style={{ flexDirection: "row", width: 200, height: 40, alignItems: "center", alignSelf: "center" }}>
                        <Text style={{ fontFamily: "Roboto-Light", fontSize: 14, paddingLeft: 5 }}>
                            {area}
                        </Text>
                        <Icon type='material' name='expand-more' color={"black"} size={23} />
                    </View>
                    {/* <Dropdown
                        animated={true}
                        showsVerticalScrollIndicator={true}
                        renderBase={this.renderBase.bind(this)}
                        dropdownStyle={{ height: 150 }}
                        options={productDetails.area}
                        renderButtonText={(value) => this.onChange(value)}
                        renderRow={this.renderRow.bind(this)}
                        renderSeparator={null} /> */}
                </View>

                <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontFamily: "Roboto-Light", fontSize: 14, color: Color.Standard2, marginRight: 3 }}>Shipping Fee: </Text>
                    <Text style={{ fontFamily: "Roboto-Light", fontSize: 14, color: Color.Standard2 }}>₱ {shipFormat}</Text>
                </View>
            </View>
        )
    }
}
