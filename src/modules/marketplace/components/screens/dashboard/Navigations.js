import React from 'react';
import { View, Text, TouchableOpacity, Image, Easing, FlatList } from 'react-native';
import _ from 'lodash';
import { Icon, ListItem } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const ScreenList = ["My Products", "My Collections", "My Sales", "Returns & Refunds", "Disputes", "Reports", "Shop Profile"];

export default class Navigations extends React.PureComponent {

    click = (item, index) => {
        const { actions, navigation, login: { session }, marketplace: { getMyShop } } = this.props;

        if (item === "My Products") {
            actions.getSellerProducts(session, getMyShop.id);
            navigation.navigate("MyProducts", { isSearching: false });
        }
        else if (item === "My Collections") {
            actions.getSellerProducts(session, getMyShop.id);
            actions.getCollections(session);
            navigation.navigate("MyCollections", { isSearching: false });
        }
        else if (item === "My Sales") {
            actions.getMySales(session);
            navigation.navigate("MySales", { isSearching: false });
        }
        else if (item === "Returns & Refunds") {
            actions.getSellerReturns(session);
            navigation.navigate("ReturnsSeller", { isSearching: false });
        }
        else if (item === "Disputes") {
            actions.getSellerReturns(session);
            navigation.navigate("Disputes", { isSearching: false });
        }
        else if (item === "Reports") {
            actions.getSellerReports(session);
            navigation.navigate("ReportsScreen", { isSearching: false });
        }
        else if (item === "Shop Profile") {
            console.log("ITEM", item)
        }
    }

    _renderScreens = ({ item, index }) => {
        let image;
        if (item === "My Products") {
            image = "to_ship";
        } else if (item === "My Collections") {
            image = "dashboard_collection";
        } else if (item === "My Sales") {
            image = "dashboard_mysales";
        } else if (item === "Returns & Refunds") {
            image = "dashboard_mysales";
        } else if (item === "Disputes") {
            image = "dashboard_mysales";
        } else if (item === "Reports") {
            image = "dashboard_reports";
        } else if (item === "Shop Profile") {
            image = "dashboard_shop";
        }
        return (
            <View>
                <ListItem onPress={() => this.click(item, index)}
                    titleStyle={{ color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light" }}
                    containerStyle={{ backgroundColor: Color.white, borderBottomColor: Colors.grey300, borderBottomWidth: .5 }}
                    key={`scr_rowid ${item}`} title={item}
                    chevron={<Icon name='chevron-right' type='evilicon' color={Color.Standard2} size={25} />}
                    leftAvatar={<Image style={{ width: 23, height: 23, padding: 2 }} source={Res.get(image)} resizeMode='contain' />} />
            </View>
        )
    }

    render() {
        return (
            <View style={{ marginVertical: 10 }}>
                <Text style={{ paddingHorizontal: 20, marginTop: 5, fontSize: 14, fontWeight: "bold", color: "black" }}>Navigations</Text>
                <Text style={{ paddingHorizontal: 20, marginTop: 5, fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Menus that will help you explore your merchant profile.</Text>
                <FlatList
                    style={{ marginTop: 10 }}
                    ListFooterComponent={<View style={{ backgroundColor: "transparent" }} />}
                    data={ScreenList}
                    renderItem={this._renderScreens}
                    keyExtractor={(item, index) => `scr_rowid ${index}`} />
            </View>
        )
    }
}