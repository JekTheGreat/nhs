import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl, StyleSheet } from 'react-native';
import _ from 'lodash';
import { Tab, Tabs, ScrollableTab } from 'native-base';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
import AllProducts from './TabAllProducts';
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');
const sampleDesc = "ASUS is passionate about technology and driven by innovation. We dream, we dare and we strive to create an effortless and joyful digital life for everyone. We're always in search of incredible ideas and experiences, and we aspire to deliver the incredible in everything we do. ASUS is passionate about technology and driven by innovation. We dream, we dare and we strive to create an effortless and joyful digital life for everyone. We're always in search of incredible ideas and experiences, and we aspire to deliver the incredible in everything we do. ASUS is passionate about technology and driven by innovation. We dream, we dare and we strive to create an effortless and joyful digital life for everyone. We're always in search of incredible ideas and experiences, and we aspire to deliver the incredible in everything we do. ASUS is passionate about technology and driven by innovation. We dream, we dare and we strive to create an effortless and joyful digital life for everyone. We're always in search of incredible ideas and experiences, and we aspire to deliver the incredible in everything we do. ASUS is passionate about technology and driven by innovation. We dream, we dare and we strive to create an effortless and joyful digital life for everyone. We're always in search of incredible ideas and experiences, and we aspire to deliver the incredible in everything we do. ASUS is passionate about technology and driven by innovation. We dream, we dare and we strive to create an effortless and joyful digital life for everyone. We're always in search of incredible ideas and experiences, and we aspire to deliver the incredible in everything we do.";

export default class TabHome extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { seeMore: false, collectionData: [] }
    }

    // componentWillMount() {
    //     const { marketplace: { getShopIdCollections } } = this.props
    //     const collectionArr = _.slice(_.shuffle(getShopIdCollections), 0, 2)
    //     this.setState({ collectionData: collectionArr })
    // }

    _goToPreview = (item) => {
        const { navigation, actions, marketplace: { setSelectedItems }, login: { session } } = this.props;
        let newPreviewDetails = _.merge({}, setSelectedItems);
        newPreviewDetails.header = item.name;
        actions.setSelectedItems(newPreviewDetails);
        actions.postSelectedProducts(session, item.id, item.slug);
    }

    _renderProductsCollection = ({ item, index }) => {
        const price = Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        return (
            <TouchableOpacity key={`prod_col_id ${index}`} onPress={() => this._goToPreview(item)} style={{ marginTop: 5, marginRight: 5, width: width / 2.4, }}>
                {/* <Image source={{ uri: item.coverImg }} resizeMode='stretch' style={{ alignSelf: "center", width: 110, height: 80 }} /> */}
                <View style={{ alignSelf: "center", marginTop: 10, backgroundColor: "pink", width: 110, height: 80 }} />
                {!_.isEqual(item.discount, 0) && <View style={{ position: "absolute", top: 0, right: 0, }}>
                    <Image resizeMode='contain' source={Res.get("discount_banner")} style={{ height: 50, width: 30 }} />
                    <View style={{ position: "absolute", top: 5, right: 5, }}>
                        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 10, fontFamily: "Roboto-Light" }}>{Math.round(item.discount_percent)}%</Text>
                        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 10, fontFamily: "Roboto-Light" }}>OFF</Text>
                    </View>
                </View>}
                <Text style={{ height: 30, alignSelf: "center", textAlign: "center", fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2 }}>{item.name}</Text>
                {!_.isEqual(item.discount, 0) ? <View style={{ paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ width: "60%", textAlign: "center", fontSize: 12, fontWeight: "bold", fontFamily: "Roboto-Light", color: "black" }}>₱ {Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}</Text>
                    <Text style={{ width: "40%", textAlign: "center", fontSize: 10, textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                        ₱ {Number(parseFloat(item.discount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
                    </Text>
                </View> :
                    <Text style={{ textAlign: "center", fontSize: 12, fontWeight: "bold", fontFamily: "Roboto-Light", color: "black" }}>
                        ₱ {price}
                    </Text>}
            </TouchableOpacity>
        )
    }

    _seeAll = (item) => {
        const { actions, marketplace: { setCollectionProducts } } = this.props
        let collectedProducts = _.merge({}, setCollectionProducts);
        collectedProducts = item;
        actions.setCollectionProducts(collectedProducts);
        actions.setFilterScreen("collectionScreen");
    }

    _renderCollections = ({ item, index }) => {
        return (
            <View key={`col_id ${index}`} >
                <View style={{ marginTop: 20, paddingVertical: 15, borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.grey200 }}>
                    <View style={{ flexDirection: "row", paddingHorizontal: 15, justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold", fontFamily: "Roboto", color: "black" }}>{`${item.name} Collection`}</Text>
                        <TouchableOpacity onPress={() => this._seeAll(item)} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: Color.colorPrimaryMP, marginRight: 5 }}>See All</Text>
                            <Icon type='font-awesome' name="long-arrow-right" size={20} color={Color.colorPrimaryMP} />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={item.product}
                    horizontal
                    keyExtractor={(item, index) => `prod_col_id ${index}`}
                    showsHorizontalScrollIndicator={false}
                    renderItem={this._renderProductsCollection} />
            </View>
        )
    }

    render() {
        const { actions, navigation, marketplace: { getShopIdDetails, getShopIdCollections, getShopIdProducts } } = this.props
        const numLines = this.state.seeMore ? 0 : 5;
        return (
            <ScrollView>
                <Image style={{ alignSelf: "center", marginVertical: 15, height: 150, width: "90%" }}
                    resizeMode='stretch'
                    source={Res.get("logo_description")} />

                <View style={{ marginTop: 5, paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, fontFamily: "Roboto-Light", fontWeight: "bold" }} >
                        {`${getShopIdDetails.name} Store`}
                    </Text>
                    {!_.isEmpty(getShopIdDetails.description) &&
                        <View>
                            <Text numberOfLines={numLines}
                                ellipsizeMode='tail'
                                style={{ marginTop: 5, fontSize: 12, fontFamily: "Roboto-Light" }} >
                                {`${getShopIdDetails.description}`}
                            </Text>
                            <TouchableOpacity onPress={() => this.setState({ seeMore: !this.state.seeMore })} style={{ marginTop: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ textAlign: "center", fontFamily: "Roboto-Light", marginRight: 5, fontSize: 14, color: Color.colorPrimaryMP }}>
                                    {this.state.seeMore ? "See Less" : "See More"}
                                </Text>
                                <Icon type='font-awesome' name={this.state.seeMore ? 'chevron-up' : 'chevron-down'} color={Color.colorPrimaryMP} size={13} />
                            </TouchableOpacity>
                        </View>}
                </View>

                <FlatList
                    data={_.slice(getShopIdCollections, 0, 2)}
                    keyExtractor={(item, index) => `col_id ${index}`}
                    renderItem={this._renderCollections} />

                <View style={{ marginTop: 20, paddingVertical: 15, borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.grey200 }}>
                    <Text style={{ paddingHorizontal: 20, fontSize: 15, fontWeight: "bold", fontFamily: "Roboto", color: "black" }}>Sort By</Text>
                </View>

                <AllProducts {...this.props} />
            </ScrollView>
        )
    }
}
