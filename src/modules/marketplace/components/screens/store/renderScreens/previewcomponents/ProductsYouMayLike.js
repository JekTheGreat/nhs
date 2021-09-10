import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import _ from 'lodash';
import { Rating } from 'react-native-ratings';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import moment from 'moment';
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class ProductsYouMayLike extends React.PureComponent {


    _goToPreview = (item) => {
        const { navigation, actions, marketplace: { setSelectedItems }, login: { session } } = this.props;
        let newPreviewDetails = _.merge({}, setSelectedItems);
        newPreviewDetails.header = item.name;
        actions.setSelectedItems(newPreviewDetails);
        actions.postSelectedProducts(session, item.id, item.slug);
    }

    _renderYouMayLike = ({ item, index }) => {
        const b = _.isString(item.price) ? item.price.split(/[.\-_]/) : [];
        const c = b.map(Number);
        const minPrice = !_.isEmpty(c) && (c[0]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const maxPrice = !_.isEmpty(c) && (c[1]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const priceRange = _.isEqual(minPrice, maxPrice) ? maxPrice : `${minPrice} - ${maxPrice}`;
        const price = _.isNumber(item.price) ? Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }) : priceRange;
        const rate = item.rate / 2;
        return (
            <View key={`umay ${index}`} style={{ width: "50%", marginTop: 10 }}>
                <TouchableOpacity onPress={() => this._goToPreview(item)} style={{
                    alignSelf: "center", borderWidth: .5, shadowOffset: { width: 1, height: 1, },
                    shadowColor: Colors.grey400, shadowOpacity: 1, borderColor: Colors.grey400, height: 170, width: "95%",
                    borderRadius: 10
                }}>
                    {/* <Image source={{ uri: item.coverImg }} style={{ width: "100%", height: "50%", borderTopLeftRadius: 5, borderTopRightRadius: 5 }} /> */}
                    <View style={{ backgroundColor: "pink", width: "100%", height: "50%", borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
                    {!_.isNull(item.discount_percent) && !_.isEqual(item.discount, 0) &&
                        <View style={{ position: "absolute", top: -5, right: 0, }}>
                            <Image resizeMode='contain' source={Res.get("discount_banner")} style={{ height: 50, width: 30, borderTopRightRadius: 2 }} />
                            <View style={{ position: "absolute", top: 5, right: 5, }}>
                                <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 10, fontFamily: "Roboto-Light" }}>{Math.round(item.discount_percent)}%</Text>
                                <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 10, fontFamily: "Roboto-Light" }}>OFF</Text>
                            </View>
                        </View>}
                    <Text style={{ marginTop: 5, height: 30, alignSelf: "center", textAlign: "center", fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                        {item.name}
                    </Text>
                    {!_.isNull(item.discount_percent) && !_.isEqual(item.discount, 0) ?
                        <View style={{ paddingHorizontal: 10, flexDirection: "row", }}>
                            <Text style={{ width: "50%", textAlign: "left", fontSize: 11, fontWeight: "bold", fontFamily: "Roboto-Light", color: "black" }}>₱ {Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}</Text>
                            <Text style={{
                                width: "50%", textAlign: "right", fontSize: 11, textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid', fontFamily: "Roboto-Light", color: Color.Standard2
                            }}>
                                ₱ {Number(parseFloat(item.old_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
                            </Text>
                        </View> :
                        <Text style={{ paddingLeft: 10, textAlign: "left", fontSize: 11, fontWeight: "bold", fontFamily: "Roboto-Light", color: "black" }}>
                            ₱ {price}</Text>
                    }
                    <View style={{ paddingHorizontal: 10, marginTop: 5, flexDirection: "row", justifyContent: "space-between" }}>
                        <Rating
                            style={{ alignSelf: "center" }}
                            startingValue={rate}
                            readonly={true}
                            imageSize={12}
                            ratingColor={Color.colorPrimaryMP} />
                        <Text style={{ alignSelf: "center", textAlign: "center", fontSize: 11, fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                            {`${item.reviews.length} Reviews`}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { navigation, marketplace: { getProductList } } = this.props;
        const productList = _.has(getProductList, "data") ? getProductList.data : [];
        return (
            <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                {!_.isEmpty(productList) &&
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Roboto", color: "black" }}>Products You May Also Like</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("ProductList")} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: Color.colorPrimaryMP, fontWeight: "bold", marginRight: 5 }}>See All</Text>
                            <Icon type='font-awesome' name="long-arrow-right" size={20} color={Color.colorPrimaryMP} />
                        </TouchableOpacity>
                    </View>}

                <FlatList
                    data={_.slice(productList, 0, 4)}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => `umay ${item.id}`}
                    renderItem={this._renderYouMayLike} />
            </View>
        )
    }
}
