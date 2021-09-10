import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import { Rating } from 'react-native-ratings';
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class ProductList extends React.PureComponent {

    state = {
        showAll: false,
    }

    _goToPreview = (item) => {
        const { navigation, actions, marketplace: { setSelectedItems }, login: { session } } = this.props;
        let newPreviewDetails = _.merge({}, setSelectedItems);
        newPreviewDetails.header = item.name;
        actions.setSelectedItems(newPreviewDetails);
        actions.postSelectedProducts(session, item.id, item.slug);
    }

    _renderProducts = ({ item, index }) => {
        const b = _.isString(item.price) ? item.price.split(/[.\-_]/) : [];
        const c = b.map(Number);
        const minPrice = !_.isEmpty(c) && (c[0]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const maxPrice = !_.isEmpty(c) && (c[1]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const priceRange = _.isEqual(minPrice, maxPrice) ? maxPrice : `${minPrice} - ${maxPrice}`;
        const price = _.isNumber(item.price) ? Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }) : priceRange;
        const rate = item.rate / 2;
        return (
            <View key={`id ${index}`} style={{ width: width / 2, marginTop: 10, paddingBottom: 5 }}>
                <TouchableOpacity onPress={() => this._goToPreview(item)} style={{
                    alignSelf: "center", borderWidth: .5, shadowOffset: { width: 1, height: 1, },
                    shadowColor: Colors.grey400, shadowOpacity: 1, borderColor: Color.colorPrimaryMP, height: 170, width: "95%",
                    borderRadius: 10, elevation: 7, backgroundColor: "white"
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
                        <View style={{ paddingHorizontal: 10, }}>
                            <Text style={{
                                textAlign: "left", fontSize: 11, textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid', fontFamily: "Roboto-Light", color: Color.Standard2
                            }}>
                                ₱ {Number(parseFloat(item.old_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
                            </Text>
                            <Text style={{ textAlign: "left", fontSize: 11, fontWeight: "bold", fontFamily: "Roboto-Light", color: "black" }}>
                                ₱ {Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
                            </Text>

                        </View> :
                        <Text style={{ marginBottom: 5, paddingLeft: 10, textAlign: "left", fontSize: 11, fontWeight: "bold", fontFamily: "Roboto-Light", color: "black" }}>
                            ₱ {price}</Text>
                    }
                    <View style={{ paddingHorizontal: 10, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ alignSelf: "center", textAlign: "center", fontSize: 11, fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                            {`${item.reviews.length} Reviews`}</Text>
                        <Rating
                            style={{ alignSelf: "center" }}
                            startingValue={rate}
                            readonly={true}
                            imageSize={12}
                            ratingColor={Color.colorPrimaryMP} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { marketplace: { getProductList } } = this.props;
        const productsData = this.state.showAll ? getProductList.data : _.slice(getProductList.data, 0, 10);

        return (
            <View style={{ marginTop: 20 }}>
                {/* <View style={{ flexDirection: "row", paddingHorizontal: 15, justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", fontFamily: "Roboto", color: "black" }}>More Products</Text>
                    <TouchableOpacity onPress={() => this.setState({ showAll: !this.state.showAll })} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: Color.colorPrimaryMP, fontWeight: "bold", marginRight: 5 }}>{this.state.showAll ? "See Less" : "See All"}</Text>
                        <Icon type='font-awesome' name="long-arrow-right" size={20} color={Color.colorPrimaryMP} />
                    </TouchableOpacity>
                </View> */}

                {/* <View style={{ height: 1, backgroundColor: Colors.grey200, marginTop: 10 }} /> */}

                <FlatList
                    data={getProductList.data}
                    numColumns={2}
                    keyExtractor={(item) => `id ${item.id}`}
                    renderItem={this._renderProducts} />
            </View>
        )
    }
}