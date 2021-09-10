import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl } from 'react-native';
import { HeaderBackButton } from "react-navigation-stack";
import _ from 'lodash';
import { Rating } from 'react-native-ratings';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');


export default class FavoritesScreen extends React.PureComponent {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        console.log("params", params)
        return {
            headerLeft: <HeaderBackButton tintColor="black" onPress={() => navigation.goBack()} />,
            headerRight: <View style={{ justifyContent: "center", alignItems: "center", }}>
                < TouchableOpacity onPress={() => navigation.navigate("MyCart")
                } style={{ position: "absolute", right: 15, alignItems: "center", alignSelf: "center" }}>
                    <Image style={{ width: 20, height: 20, }} source={Res.get("online_store_cart")} resizeMode="contain" />
                </TouchableOpacity >
                {!_.isEqual(params.countCart, 0) &&
                    < View style={{
                        position: "absolute", width: 15, height: 15, borderRadius: 20, backgroundColor: Colors.red600,
                        right: 5, top: 10, justifyContent: "center", alignItems: "center",
                    }}>
                        <Text style={{ backgroundColor: 'transparent', color: 'white', fontSize: 10 }}>{params.countCart}</Text>
                    </View>
                }
            </View >
        }
    }

    componentDidUpdate(prevProps) {
        const { navigation, marketplace: { countCart } } = this.props;
        if (!_.isEqual(prevProps.marketplace.countCart, countCart)) {
            navigation.setParams({ countCart: countCart })
        }
    }

    _goToPreview = (item) => {
        const { actions, marketplace: { setSelectedItems }, login: { session } } = this.props;
        let newPreviewDetails = _.merge({}, setSelectedItems);
        newPreviewDetails.header = item.name;
        actions.setSelectedItems(newPreviewDetails);
        actions.postSelectedProducts(session, item.id, item.slug);
    }

    _renderAllProductList = ({ item, index }) => {
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

                    <View style={{ paddingHorizontal: 10, marginTop: 5, flexDirection: "row", justifyContent: "space-between" }}>
                        <Rating
                            style={{ alignSelf: "center" }}
                            startingValue={rate}
                            readonly={true}
                            imageSize={12}
                            ratingColor={Color.colorPrimaryMP} />

                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ marginRight: 3, textAlign: "center", fontSize: 11, fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                                {`${item.like}`}</Text>
                            <Icon type='font-awesome' name={"heart"} color={"red"} size={12} />
                        </View>


                    </View>

                    {!_.isNull(item.discount_percent) && !_.isEqual(item.discount, 0) ?
                        <View style={{ marginTop: 5, paddingHorizontal: 10, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                            <Text style={{ fontSize: 11, fontWeight: "bold", fontFamily: "Roboto-Light", color: "black" }}>
                                ₱ {Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
                            </Text>
                            <Text style={{
                                fontSize: 11, textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid', fontFamily: "Roboto-Light", color: Color.Standard2
                            }}>
                                ₱ {Number(parseFloat(item.old_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
                            </Text>
                        </View> :
                        <Text style={{ marginTop: 5, textAlign: "center", fontSize: 11, fontWeight: "bold", fontFamily: "Roboto-Light", color: "black" }}>
                            ₱ {price}</Text>
                    }

                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { navigation, marketplace: { getFavorites } } = this.props;
        const productsList = _.has(getFavorites, "data") ? getFavorites.data : [];
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "white" }}>
                <View style={{ padding: 10, width: width, height: height }}>
                    <View style={{ width: "100%", height: "100%" }}>
                        <Text style={{ paddingLeft: 10, marginTop: 5, fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>
                            List of products that you marked as favorite.
                        </Text>
                        <FlatList
                            data={productsList}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => `id ${index}`}
                            renderItem={this._renderAllProductList} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}