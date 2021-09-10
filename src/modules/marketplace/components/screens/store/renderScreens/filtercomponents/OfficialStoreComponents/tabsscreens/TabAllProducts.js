import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
import moment from 'moment';
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');
const buttonFilterer = ["Relevance", "Latest", " Top Sales", "Price"];

export default class TabAllProducts extends React.PureComponent {

    state = {
        data: [],
        active: "relevance",
        isAsc: false,
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
            <View key={`prod_id ${index}`} style={{ width: "50%", marginTop: 10 }}>
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

    relevance = (item) => {
        this.setState({ data: item, active: "relevance" })
    }
    latest = (item) => {
        const data = _.orderBy(item, ["CreatedAt"], "desc");
        this.setState({ data: data, active: "latest" })
    }
    topsales = (item) => {
        const data = _.orderBy(item, ["sale"], "desc");
        this.setState({ data: data, active: "topsales" })
    }
    price = (item) => {
        if (this.state.asc) {
            const data = _.orderBy(item, ["MaxPrice"], "asc")
            this.setState({ data: data, active: "price", asc: !this.state.isAsc, isAsc: !this.state.isAsc })
        } else {
            const data = _.orderBy(item, ["MaxPrice"], "desc")
            this.setState({ data: data, active: "price", asc: !this.state.isAsc, isAsc: !this.state.isAsc })
        }
    }


    render() {
        const { marketplace: { setInputDetails, getShopIdProducts } } = this.props;
        const { active, data } = this.state;
        const arrData = _.isEmpty(data) ? getShopIdProducts.data : data;
        return (
            <View style={{ padding: 15 }}>
                { !_.isEmpty(getShopIdProducts.data) ?
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginLeft: 5, marginTop: 10, backgroundColor: Color.colorPrimaryMP, height: 50, width: "97%" }} >
                        <TouchableOpacity
                            onPress={() => this.relevance(getShopIdProducts.data)}
                            style={[_.isEqual(active, "relevance") ? { backgroundColor: "black" } : { backgroundColor: "white" }, { borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, justifyContent: "center", alignItems: "center" }]} >
                            <Text style={[_.isEqual(active, "relevance") ? { color: "white" } : { color: "black" }]}>Relevance</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.latest(getShopIdProducts.data)}
                            style={[_.isEqual(active, "latest") ? { backgroundColor: "black" } : { backgroundColor: "white" }, { borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, justifyContent: "center", alignItems: "center" }]} >
                            <Text style={[_.isEqual(active, "latest") ? { color: "white" } : { color: "black" }]}>Latest</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.topsales(getShopIdProducts.data)}
                            style={[_.isEqual(active, "topsales") ? { backgroundColor: "black" } : { backgroundColor: "white" }, { borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, justifyContent: "center", alignItems: "center" }]} >
                            <Text style={[_.isEqual(active, "topsales") ? { color: "white" } : { color: "black" }]}>Top Sales</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.price(getShopIdProducts.data)}
                            style={[_.isEqual(active, "price") ? { backgroundColor: "black" } : { backgroundColor: "white" }, { flexDirection: "row", borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, justifyContent: "center", alignItems: "center" }]} >
                            <Text style={[_.isEqual(active, "price") ? { color: "white" } : { color: "black" }, { marginRight: 5 }]}>Price</Text>
                            <Icon type='font-awesome' name={_.isUndefined(this.state.asc) ? 'arrows-v' : this.state.asc ? 'long-arrow-up' : 'long-arrow-down'} size={13} color={_.isEqual(active, "price") ? Color.colorPrimaryMP : "black"} />
                        </TouchableOpacity>
                    </View> :
                    <View style={{ justifyContent: "center", alignItems: "center", }}>
                        <Image source={Res.get("shopping_bag")} resizeMode="contain" style={{ width: 150, height: 150 }} />
                        <Text style={{ marginTop: 40, fontSize: 23, fontFamily: "Roboto", color: "black", fontWeight: "bold" }}>Empty Products!</Text>
                    </View>}

                <FlatList
                    data={arrData}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => `prod_id ${item.id}`}
                    renderItem={this._renderProducts} />
            </View>
        )
    }
}