import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class TopProducts extends React.PureComponent {

    _goToPreview = (item) => {
        const { navigation, actions, marketplace: { setSelectedItems }, login: { session } } = this.props;
        if (!_.isUndefined(item)) {
            let newPreviewDetails = _.merge({}, setSelectedItems);
            newPreviewDetails.header = item.name;
            actions.setSelectedItems(newPreviewDetails);
            actions.postSelectedProducts(session, item.id, item.slug);
        }
        else {
            alert("Nothing To Show")
        }
    }

    _renderTopProducts = ({ item, index }) => {
        const { navigation } = this.props;

        const img = _.has(item, "product[0].coverImg") ? item.product[0].coverImg : "";
        const img1 = _.has(item, "product[1].coverImg") ? item.product[1].coverImg : "";
        const img2 = _.has(item, "product[2].coverImg") ? item.product[2].coverImg : "";
        return (
            <View style={{ width: width / 1.5, padding: 10 }}>
                {/* <TouchableOpacity onPress={() => this._goToPreview(item.product[0])} key={`id ${index}`} style={{ width: width / 1.5, marginTop: 10, }}> */}
                <TouchableOpacity onPress={() => navigation.navigate("TopProducts", { topPage: index })}
                    key={`id ${index}`} style={{ width: width / 1.5, marginTop: 10, }}>
                    <View style={{ flex: 1, }}>
                        <View style={{ flexDirection: "row" }}>

                            <View style={{ width: "60%", height: 105, backgroundColor: "pink" }} />
                            {/* <Image source={{ uri: img }} resizeMode='cover' style={{ width: "60%", height: 105, borderWidth: 1, borderColor: Colors.grey300 }} /> */}

                            <View style={{ position: "absolute", left: 0 }}>
                                <View style={{
                                    width: 0, height: 0, borderLeftWidth: 0, borderRightWidth: 45, borderTopWidth: 45, borderStyle: 'solid',
                                    backgroundColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent',
                                    borderTopColor: Color.colorPrimaryMP, borderBottomColor: 'transparent',
                                }} />
                                <Text style={{ position: "absolute", top: 0, left: 5, alignSelf: "center", textAlign: "center", fontSize: 10, fontWeight: "bold", fontFamily: "Roboto-Light", color: "white" }}>
                                    {`TOP\n1`}
                                </Text>
                            </View>
                            <View style={{ marginLeft: 5, width: "34%", }}>

                                <View style={{}}>
                                    <View style={{ width: "100%", height: 50, backgroundColor: "pink" }} />
                                    {/* <Image source={{ uri: img1 }} resizeMode='cover' style={{ width: "100%", height: 50, borderWidth: 1, borderColor: Colors.grey300 }} /> */}

                                    <View style={{ position: "absolute", left: 0 }}>
                                        <View style={{
                                            width: 0, height: 0, borderLeftWidth: 0, borderRightWidth: 40, borderTopWidth: 40, borderStyle: 'solid',
                                            backgroundColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent',
                                            borderTopColor: Color.colorPrimaryMP, borderBottomColor: 'transparent',
                                        }} />
                                        <Text style={{ position: "absolute", top: 0, left: 5, alignSelf: "center", textAlign: "center", fontSize: 9, fontWeight: "bold", fontFamily: "Roboto-Light", color: "white" }}>
                                            {`TOP\n2`}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ marginTop: 5 }}>
                                    <View style={{ width: "100%", height: 50, backgroundColor: "pink" }} />
                                    {/* <Image source={{ uri: img2 }} resizeMode='cover' style={{ width: "100%", height: 50, borderWidth: 1, borderColor: Colors.grey300 }} /> */}

                                    <View style={{ position: "absolute", left: 0 }}>
                                        <View style={{
                                            width: 0, height: 0, borderLeftWidth: 0, borderRightWidth: 40, borderTopWidth: 40, borderStyle: 'solid',
                                            backgroundColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent',
                                            borderTopColor: Color.colorPrimaryMP, borderBottomColor: 'transparent',
                                        }} />
                                        <Text style={{ position: "absolute", top: 0, left: 5, alignSelf: "center", textAlign: "center", fontSize: 9, fontWeight: "bold", fontFamily: "Roboto-Light", color: "white" }}>
                                            {`TOP\n3`}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{
                                fontSize: 12, width: "70%",
                                fontWeight: "bold", fontFamily: "Roboto-Light", color: "black",
                            }}>
                                {item.name}
                            </Text>

                            <Text onPress={() => navigation.navigate("TopProducts", { topPage: index })}
                                style={{ fontSize: 12, fontFamily: "Roboto-Light", color: Color.colorPrimaryMP, fontWeight: "bold", width: "20%", textDecorationLine: "underline" }}>See All
                             </Text>

                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { navigation, marketplace: { getTopProducts } } = this.props;
        return (
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: "row", paddingHorizontal: 15, justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", fontFamily: "Roboto", color: "black" }}>Top Products</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("TopProducts")} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black", fontWeight: "bold", marginRight: 5, textDecorationLine: "underline" }}>See All</Text>
                        {/* <Icon type='font-awesome' name="long-arrow-right" size={20} color={Color.colorPrimaryMP} /> */}
                    </TouchableOpacity>
                </View>

                {/* <View style={{ height: 1, backgroundColor: Colors.grey200, marginTop: 10 }} /> */}

                <FlatList
                    data={_.slice(getTopProducts, 0, 10)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => `id ${item.id}`}
                    renderItem={this._renderTopProducts} />
            </View>
        )
    }
}