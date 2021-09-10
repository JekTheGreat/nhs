import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import moment from 'moment';
import Resource from "__src/resources";
const { Color, Res } = Resource;
const shopInfo = ["Products", "Chat Performance", "Ratings", "Cancellation Rate", "Joined", "Ship Out Time"]

export default class HeaderShopDetails extends React.PureComponent {

    _renderShopInfo = ({ item, index }) => {
        const { marketplace: { getShopIdDetails } } = this.props;
        console.log("asdfqwe", getShopIdDetails)
        let iconLabel;
        switch (item) {
            case "Products":
                iconLabel = `${getShopIdDetails.Stat.Products}`
                break;
            case "Ratings":
                iconLabel = `${Math.round(getShopIdDetails.Stat.Rate * 100) / 100}`
                break;
            case "Chat Performance":
                iconLabel = `${getShopIdDetails.Stat.Chat_Rate}%`
                break;
            case "Cancellation Rate":
                iconLabel = `${Math.round(getShopIdDetails.Stat.CancelRate)}%`
                break;
            case "Joined":
                iconLabel = `${moment(getShopIdDetails.Stat.Join).format('ll')}`
                break;
            case "Ship Out Time":
                iconLabel = `${getShopIdDetails.Stat.Ship_Days}`
                break;
        }

        return (
            <View style={[index % 3 !== 0 && { borderLeftWidth: 1, borderLeftColor: Color.Standard }, { flex: 1, marginTop: 5, justifyContent: "center" }]}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ marginLeft: 5, fontSize: 12, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.colorPrimaryMP }}>
                        {iconLabel}
                    </Text>
                </View>
                <Text style={{ textAlign: "center", fontSize: 12, fontFamily: "Roboto-Light", color: "white" }}>
                    {item}
                </Text>
            </View >
        )
    }

    render() {
        const { marketplace: { getShopIdDetails } } = this.props;
        const storeLogo = !_.isEmpty(getShopIdDetails.logo) ? { uri: getShopIdDetails.logo } : { uri: "https://assets1.progressivegrocer.com/files/styles/content_sm/s3/2020-01/Stop%20%26%20Shop%20MASS.jpg?itok=PzykErKN" };
        const banner = !_.isEmpty(getShopIdDetails.banner) ? { uri: getShopIdDetails.banner } : { uri: "https://unified.ph/static/images/UPS_Logo.png" };

        return (
            <View style={{ height: 200 }}>
                <Image source={storeLogo} style={{ width: "100%", height: 200 }} />
                <View style={{ position: "absolute", width: "100%", backgroundColor: 'rgba(0,0,0,0.5)', height: 200 }}>
                    <View style={{ height: 120, }}>
                        <View style={{ top: 20, left: 20, width: 70, height: 70, borderRadius: 35, flexDirection: "row", backgroundColor: Colors.grey600, padding: 2, alignItems: "center" }}>
                            <Image source={banner} style={{ height: 65, width: 65, borderRadius: 35 }} />
                            {/* <View style={{ height: 65, width: 65, backgroundColor: "blue", borderRadius: 35 }} /> */}
                            <View style={{ marginLeft: 15, width: 170 }} >
                                <Text style={{ justifyContent: "center", color: "white", fontSize: 16 }}>{`${getShopIdDetails.name} Store`}</Text>
                                <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 5, alignItems: "center" }} >
                                    <Image style={{ width: 15, height: 15 }} source={Res.get('bookmark')} />
                                    <Text style={{ color: "white", marginLeft: 5, fontSize: 12 }}>{`Verified Store`}</Text>
                                </View>
                                <Text style={{ fontWeight: "bold", color: Color.colorPrimaryMP, fontSize: 12 }}>{`Active 46 Hours Ago`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ bottom: 0, height: 100 }}>
                        <FlatList
                            style={{}}
                            numColumns={3}
                            data={shopInfo}
                            keyExtractor={(item, index) => index}
                            renderItem={this._renderShopInfo} />
                    </View>
                </View>
                <TouchableOpacity onPress={() => alert("This function is under construction")}
                    style={{ position: "absolute", top: 45, right: 20, width: 50, borderRadius: 5, backgroundColor: Color.colorPrimaryMP, paddingVertical: 3, paddingHorizontal: 2, alignItems: "center" }}>
                    <Text style={{ color: "white", fontSize: 14 }}>Chat</Text>
                </TouchableOpacity>
            </View>
        )
    }
}