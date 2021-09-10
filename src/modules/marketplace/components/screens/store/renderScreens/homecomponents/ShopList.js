import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl, Alert } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class ShopList extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const { navigation, marketplace: { getShopIdDetails, setInputDetails } } = this.props;
        if (setInputDetails.route === "MarketPlace" && !_.isEmpty(getShopIdDetails) && !_.isEqual(prevProps.marketplace.getShopIdDetails, getShopIdDetails)) {
            if (getShopIdDetails.status === 0) {
                Alert.alert("Error", getShopIdDetails.result)
            } else {
                navigation.navigate("FilterScreensOfficialStore")
            }
        }
    }

    _onPress = (item) => {
        const { actions, navigation, marketplace: { }, login: { session } } = this.props;
        delete this.props.marketplace.getShopIdDetails;
        actions.getShopIdDetails(session, item.id);
        actions.getShopIdCollections(session, item.id);
        actions.getShopIdProducts(session, item.id);
    }


    _renderShops = ({ item, index }) => {
        const shopBG = _.isEmpty(item.logo) ? { uri: "https://unified.ph/static/images/UPS_Logo.png" } : { uri: item.logo };
        const shopImg = _.isEmpty(item.banner) ? { uri: "https://unified.ph/static/images/UPS_Logo.png" } : { uri: item.banner };
        return (
            <View key={`idx ${index}`} style={{ marginRight: 5, width: width / 2.2, paddingVertical: 15 }}>
                <View>
                    <View style={{ alignSelf: "center", marginTop: 10, backgroundColor: "pink", width: 150, height: 80 }} />
                    <View style={{ position: "absolute", bottom: -20, borderColor: 'rgba(255,255,255, 0.5)', borderWidth: 5, borderRadius: 20, alignSelf: "center", padding: 5, backgroundColor: "blue", width: 40, height: 40 }} />

                    {/* <Image source={shopBG} resizeMode='stretch' style={{ alignSelf: "center", width: 150, height: 80 }} />
                    <View style={{ position: "absolute", bottom: -20, borderColor: 'rgba(255,255,255, 0.5)', borderWidth: 5, borderRadius: 30, alignSelf: "center", alignItems: "center", width: 50, height: 50 }} >
                        <Image source={shopImg} style={{ padding: 5, borderRadius: 30, width: 40, height: 40, resizeMode: 'cover' }} />
                    </View> */}
                </View>
                <View style={{ alignSelf: "center", flexDirection: "row" }}>
                    <Text style={{ marginTop: 15, height: 30, textAlign: "center", fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2 }}>{item.name}</Text>
                    <Image source={Res.get("bookmark")} resizeMode='contain' style={{ alignSelf: "center", height: 15, width: 25 }} />
                </View>

                <TouchableOpacity onPress={() => this._onPress(item)} style={{ marginTop: 10, borderRadius: 10, alignSelf: "center", justifyContent: "center", width: 150, height: 25, backgroundColor: Color.colorPrimaryMP, elevation: 7 }}>
                    <Text style={{ alignSelf: "center", textAlign: "center", fontSize: 12, color: "white" }}>View Shop</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { navigation, marketplace: { getShopList } } = this.props
        const shops = _.slice(getShopList, 0, 10);
        return (
            <View style={{ marginTop: 15 }}>
                <View style={{ flexDirection: "row", paddingHorizontal: 15, justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", fontFamily: "Roboto", color: "black" }}>Unified Store</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("ShopList")} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black", fontWeight: "bold", marginRight: 5, textDecorationLine: "underline" }}>See All</Text>
                        {/* <Icon type='font-awesome' name="long-arrow-right" size={20} color={Color.colorPrimaryMP} /> */}
                    </TouchableOpacity>
                </View>

                {/* <View style={{ height: 1, backgroundColor: Colors.grey200, marginTop: 10 }} /> */}

                <View style={{ flex: 1, marginHorizontal: 15, marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Image source={Res.get("bookmark")} resizeMode='contain' style={{ alignSelf: "center", height: 15, width: 25 }} />
                        <Text style={{ fontSize: 11, fontFamily: "Roboto-Light", color: "black" }}>Verified Store</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Image source={Res.get("delivery_options")} resizeMode='contain' style={{ height: 15, width: 25 }} />
                        <Text style={{ marginLeft: 5, fontSize: 11, fontFamily: "Roboto-Light", color: "black" }}>Delivery Options</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Image source={Res.get("shipping")} resizeMode='contain' style={{ height: 15, width: 25 }} />
                        <Text style={{ marginLeft: 5, fontSize: 11, fontFamily: "Roboto-Light", color: "black" }}>Free Shipping</Text>
                    </View>
                </View>

                <FlatList
                    data={shops}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={index => { `idx ${index}` }}
                    renderItem={this._renderShops} />
            </View>
        )
    }
}