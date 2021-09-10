import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class TopProducts extends React.PureComponent {

    _goToPreview = (item) => {
        const { navigation, actions, marketplace: { setSelectedItems }, login: { session } } = this.props;
        let newPreviewDetails = _.merge({}, setSelectedItems);
        newPreviewDetails.header = item.name;
        actions.setSelectedItems(newPreviewDetails);
        actions.postSelectedProducts(session, item.id, item.slug);
    }

    _renderTopProducts = ({ item, index }) => {
        const b = _.isString(item.price) ? item.price.split(/[.\-_]/) : [];
        const c = b.map(Number);
        const minPrice = !_.isEmpty(c) && (c[0]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const maxPrice = !_.isEmpty(c) && (c[1]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const priceRange = _.isEqual(minPrice, maxPrice) ? maxPrice : `${minPrice} - ${maxPrice}`;
        const price = _.isNumber(item.price) ? Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }) : priceRange;
        const rate = item.rate / 2;

        return (
            <View key={`id ${index}`} style={{ width: "50%", marginTop: 10 }}>
                <TouchableOpacity onPress={() => this._goToPreview(item)} style={{
                    alignSelf: "center", borderWidth: .5, shadowOffset: { width: 1, height: 1, },
                    shadowColor: Colors.grey400, shadowOpacity: 1, borderColor: Colors.grey400, height: 170, width: "95%",
                    borderRadius: 10
                }}>
                    {/* <Image source={{ uri: item.coverImg }} style={{ width: "100%", height: "50%", borderTopLeftRadius: 5, borderTopRightRadius: 5 }} /> */}
                    <View style={{ backgroundColor: "pink", width: "100%", height: "50%", borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
                    <View style={{ position: "absolute", left: 0, top: -1 }}>
                        <View style={[_.isEqual(index, 0) ? { borderTopColor: Color.colorPrimaryMP, } :
                            _.isEqual(index, 1) ? { borderTopColor: "#DBD9D9" } :
                                _.isEqual(index, 2) ? { borderTopColor: "#F5A34F" } :
                                    { borderTopColor: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')' }, {
                            width: 0, height: 0, borderLeftWidth: 0, borderRightWidth: 45, borderTopWidth: 45, borderStyle: 'solid',
                            backgroundColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent',
                            borderBottomColor: 'transparent', borderTopStartRadius: 10
                        }]} />
                        <Text style={{ position: "absolute", top: 0, left: 5, alignSelf: "center", textAlign: "center", fontSize: 10, fontWeight: "bold", fontFamily: "Roboto-Light", color: "white" }}>
                            {`TOP\n${index + 1}`}
                        </Text>
                    </View>
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
        const { products } = this.props;
        return (
            <ScrollView>
                <View style={{ padding: 10, width: width, height: height }}>
                    {!_.isEmpty(products) ?
                        <View style={{ width: "100%", height: "100%" }}>
                            <FlatList
                                data={products}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item) => `id ${item.id}`}
                                renderItem={this._renderTopProducts} />
                        </View> :

                        <View style={{ height: "60%", justifyContent: "center", alignItems: "center" }}>
                            <Image source={Res.get("shopping_bag")} resizeMode="contain" style={{ width: 150, height: 150 }} />
                            <Text style={{ marginTop: 40, fontSize: 23, fontFamily: "Roboto", color: "black", fontWeight: "bold" }}>Empty Products!</Text>
                        </View>
                    }
                </View>
            </ScrollView>
        )
    }
}