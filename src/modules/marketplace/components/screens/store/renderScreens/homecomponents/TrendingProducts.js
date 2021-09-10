import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class TrendingProducts extends React.PureComponent {

    state = {
        slicedTrendingProducts: []
    }

    _goToPreview = (item) => {
        const { navigation, actions, marketplace: { setSelectedItems }, login: { session } } = this.props;
        let newPreviewDetails = _.merge({}, setSelectedItems);
        newPreviewDetails.header = item.name;
        actions.setSelectedItems(newPreviewDetails);
        actions.postSelectedProducts(session, item.id, item.slug);
    }

    _renderTrends = ({ item, index }) => {
        return (
            <View key={`id ${index}`} style={{ paddingHorizontal: 5 }}>
                <View style={{
                    width: width / 1.5, justifyContent: "space-between", marginTop: 10, padding: 5, flexDirection: "row",
                    alignItems: "center", backgroundColor: "white", borderRadius: 10
                }}>
                    <View style={{ width: 80, height: 75, }}>
                        {/* <Image source={{ uri: item.coverImg }} style={{ flex: 1, resizeMode: "stretch" }} /> */}
                        <View style={{ width: 80, height: 75, backgroundColor: "pink" }} />
                        {
                            !_.isNull(item.discount_percent) && !_.isEqual(item.discount, 0) &&
                            <View style={{ position: "absolute", top: 0, right: -2, }}>
                                <Image resizeMode='contain' source={Res.get("discount_banner")} style={{ height: 40, width: 30 }} />
                                <View style={{ position: "absolute", top: 0, right: 5, }}>
                                    <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 10, fontFamily: "Roboto-Light" }}>{Math.round(item.discount_percent)}%</Text>
                                    <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 10, fontFamily: "Roboto-Light" }}>OFF</Text>
                                </View>
                            </View>
                        }
                    </View>

                    <View style={{ width: "55%" }}>
                        <Text ellipsizeMode='tail' numberOfLines={2} style={{ fontSize: 12, fontWeight: "bold", fontFamily: "Roboto-Light", color: "black" }}>{item.name}</Text>
                        <Text style={{ marginTop: 5, fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2 }}>{`${item.quantity} Products`}</Text>
                        <TouchableOpacity onPress={() => this._goToPreview(item)}
                            style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "#2F80ED", fontWeight: "bold", marginRight: 5 }}>Check it Out</Text>
                            <Icon type='font-awesome' name="long-arrow-right" size={15} color="#2F80ED" />
                        </TouchableOpacity>
                    </View>
                </View>

            </View >
        )
    }

    _shuffle = () => {
        const { actions, marketplace: { getTrendingProducts } } = this.props;
        this.setState({ slicedTrendingProducts: _.shuffle(getTrendingProducts.data) });
    }

    render() {
        const { marketplace: { getTrendingProducts } } = this.props;
        const trendingData = _.isEmpty(this.state.slicedTrendingProducts) ? _.slice(getTrendingProducts.data, 0, 4) : _.slice(this.state.slicedTrendingProducts, 0, 4);

        return (
            <View style={{ paddingVertical: 10, backgroundColor: Color.colorPrimaryMP }}>
                <View style={{ flexDirection: "row", paddingHorizontal: 15, justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", fontFamily: "Roboto", color: "white" }}>Trending</Text>
                    <TouchableOpacity onPress={() => this._shuffle()} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "white", fontWeight: "bold", marginRight: 5, textDecorationLine: "underline" }}>Change</Text>
                        {/* <Image source={Res.get("change_arrow")} resizeMode='contain' style={{ height: 15, width: 15 }} /> */}
                    </TouchableOpacity>
                </View>

                {/* <View style={{ height: 1, backgroundColor: Colors.grey200, marginTop: 10 }} /> */}

                <FlatList
                    data={trendingData}
                    // numColumns={2}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 5 }}
                    keyExtractor={(item) => `id ${item.id}`}
                    renderItem={this._renderTrends} />
            </View>
        )
    }
}