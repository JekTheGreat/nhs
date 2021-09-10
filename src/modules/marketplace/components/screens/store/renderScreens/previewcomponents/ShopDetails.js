import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const shopInfo = ["Products", "Chat Performance", "Ratings"]
export default class ShopDetails extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const { actions, navigation, marketplace: { getShopIdDetails, setInputDetails } } = this.props;
        console.log("this.props", this.props)
        if (!_.isEmpty(getShopIdDetails) && !_.isEqual(prevProps.marketplace.getShopIdDetails, getShopIdDetails)) {
            navigation.navigate("FilterScreensOfficialStore")
        }
    }

    _renderShopInfo = ({ item, index }) => {
        const { productDetails, marketplace: { getShopList } } = this.props;
        const shopStat = _.filter(getShopList, shop => {
            if (shop.id === productDetails.shop_id.id) {
                return shop
            }
        })
        let iconLabel;
        console.log("ASDF", shopStat)
        switch (item) {
            case "Products":
                iconLabel = _.isEmpty(shopStat) ? "0" : `${shopStat[0].Stat.Products}`
                break;
            case "Ratings":
                iconLabel = _.isEmpty(shopStat) ? "0" : `${shopStat[0].Stat.Rate}`
                break;
            case "Chat Performance":
                iconLabel = _.isEmpty(shopStat) ? "0" : `${shopStat[0].Stat.Chat_Rate}%`
                break;
        }

        return (
            <View style={[index % 3 !== 0 && { borderLeftWidth: 1, borderLeftColor: Color.Standard }, { flex: 1, justifyContent: "center" }]}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ marginLeft: 5, fontSize: 14, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.colorPrimaryMP }}>
                        {iconLabel}
                    </Text>
                </View>
                <Text style={{ textAlign: "center", fontSize: 12, fontFamily: "Roboto-Light", color: "white" }}>
                    {item}
                </Text>
            </View >
        )
    }

    _onPress = () => {
        const { actions, navigation, productDetails, login: { session }, marketplace: { getShopIdDetails } } = this.props;
        if (getShopIdDetails.id === productDetails.shop_id.id) {
            navigation.navigate("FilterScreensOfficialStore")
        } else {
            // delete this.props.marketplace.getShopIdDetails;
            actions.getShopIdDetails(session, productDetails.shop_id.id);
            actions.getShopIdCollections(session, productDetails.shop_id.id);
            actions.getShopIdProducts(session, productDetails.shop_id.id);
            // alert("This function is under construction")
            console.log("QWQWQ:", productDetails.shop_id.id)
        }
    }

    render() {
        const { productDetails, marketplace: { getShopList, setUserSide } } = this.props;
        const storeLogo = !_.isEmpty(productDetails.shop_id.logo) ? { uri: productDetails.shop_id.logo } : { uri: "https://assets1.progressivegrocer.com/files/styles/content_sm/s3/2020-01/Stop%20%26%20Shop%20MASS.jpg?itok=PzykErKN" };
        const banner = !_.isEmpty(productDetails.shop_id.banner) ? { uri: productDetails.shop_id.banner } : { uri: "https://unified.ph/static/images/UPS_Logo.png" };

        return (
            <View style={{ marginTop: 10, height: 175 }}>
                <Image source={storeLogo} style={{ width: "100%", height: 175 }} />
                <View style={{ position: "absolute", width: "100%", backgroundColor: 'rgba(0,0,0,0.5)', height: 175 }}>
                    <View style={{ height: 120, }}>
                        <View style={{ top: 20, left: 20, width: 70, height: 70, borderRadius: 35, flexDirection: "row", backgroundColor: Colors.grey600, padding: 2, alignItems: "center" }}>
                            {/* <Image source={banner} style={{ height: 65, width: 65, borderRadius: 35 }} /> */}
                            <View style={{ height: 65, width: 65, backgroundColor: "blue", borderRadius: 35 }} />
                            <View style={{ marginLeft: 15, width: 170 }} >
                                <Text style={{ justifyContent: "center", color: "white", fontSize: 16 }}>{`${productDetails.shop_id.name} Store`}</Text>
                                <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }} >
                                    <Image style={{ width: 15, height: 15 }} source={Res.get('bookmark')} />
                                    <Text style={{ color: "white", marginLeft: 5, fontSize: 12 }}>{`Verified Store`}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ bottom: 0, height: 75 }}>
                        <FlatList
                            style={{ marginVertical: 10, }}
                            numColumns={shopInfo.length}
                            data={shopInfo}
                            keyExtractor={(item, index) => index}
                            renderItem={this._renderShopInfo} />
                    </View>
                </View>
                <TouchableOpacity onPress={!setUserSide ? () => this._onPress() : console.log("")} disabled={!setUserSide ? false : true}
                    style={{ position: "absolute", top: 35, right: 10, width: 110, borderRadius: 5, backgroundColor: Color.colorPrimaryMP, paddingVertical: 8, paddingHorizontal: 8, alignItems: "center" }}>
                    <Text style={{ color: "white", marginLeft: 5, fontSize: 16 }}>View Shop</Text>
                </TouchableOpacity>
            </View>
        )
    }
}