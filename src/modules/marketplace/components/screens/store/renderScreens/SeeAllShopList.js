import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

export default class SeeAllShopList extends React.PureComponent {

    header = () => {
        return (
            <View style={{ height: 35, paddingHorizontal: 15, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: Colors.grey400, borderBottomWidth: 1 }}>
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
        )
    }

    componentDidUpdate(prevProps) {
        const { navigation, marketplace: { getShopIdDetails } } = this.props;
        if (!_.isEmpty(getShopIdDetails) && !_.isEqual(prevProps.marketplace.getShopIdDetails, getShopIdDetails)) {
            navigation.navigate("FilterScreensOfficialStore")
        }

    }

    _onPress = (item) => {
        const { actions, navigation, marketplace: { }, login: { session } } = this.props;
        delete this.props.marketplace.getShopIdDetails;
        actions.getShopIdDetails(session, item.id);
        actions.getShopIdCollections(session, item.id);
        actions.getShopIdProducts(session, item.id);
        // alert("This function is under construction")
        // console.log("QWQWQ:", item)
    }

    _renderAllShops = ({ item, index }) => {
        // const shopBG = _.isEmpty(item.logo) ? { uri: "https://unified.ph/static/images/UPS_Logo.png" } : { uri: item.logo };
        const shopBG = _.isEmpty(item.logo) ? { uri: "" } : { uri: item.logo };
        const shopImg = _.isEmpty(item.banner) ? { uri: "https://unified.ph/static/images/UPS_Logo.png" } : { uri: item.banner };
        return (
            <View key={`ids ${item.id}`} style={{ marginTop: 10, marginRight: 5, width: "50%", }}>
                <View>
                    <View style={{ borderTopEndRadius: 7, borderTopStartRadius: 7, alignSelf: "center", marginTop: 10, backgroundColor: "pink", width: 150, height: 80 }} />
                    <View style={{ position: "absolute", bottom: -15, borderColor: "white", borderWidth: 1, borderRadius: 20, alignSelf: "center", padding: 2, backgroundColor: "blue", width: 40, height: 40 }} />

                    {/* <Image source={shopBG} resizeMode='stretch' style={{ alignSelf: "center", width: 150, height: 80 }} />
                    <View style={{ position: "absolute", bottom: -15, borderColor: "white", borderWidth: 2, borderRadius: 30, alignSelf: "center", alignItems: "center", width: 50, height: 50 }} >
                        <Image source={shopImg} resizeMode='cover' style={{ padding: 2, borderRadius: 30, width: 45, height: 45 }} />
                    </View> */}
                </View>
                <View style={{ borderBottomStartRadius: 7, borderBottomEndRadius: 7, borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderColor: Colors.grey400, width: 149, height: 95, alignSelf: "center" }}>
                    <View style={{ alignSelf: "center", flexDirection: "row", }}>
                        <Text style={{ marginTop: 15, height: 30, textAlign: "center", fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2 }}>{item.name}</Text>
                        <Image source={Res.get("bookmark")} resizeMode='contain' style={{ alignSelf: "center", height: 15, width: 25 }} />
                    </View>

                    <TouchableOpacity onPress={() => this._onPress(item)} style={{ marginTop: 10, borderRadius: 5, alignSelf: "center", justifyContent: "center", width: 125, height: 25, backgroundColor: Colors.yellow600 }}>
                        <Text style={{ alignSelf: "center", textAlign: "center", fontSize: 12, fontWeight: "bold", fontFamily: "Roboto-Light", color: "white" }}>View Shop</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { navigation, marketplace: { getShopList } } = this.props;
        return (
            <View style={{ backgroundColor: "white" }}>
                {this.header()}
                <FlatList
                    data={getShopList}
                    numColumns={2}
                    keyExtractor={(item) => `ids ${item.id}`}
                    renderItem={this._renderAllShops} />
            </View>
        )
    }
}