import React from 'react';
import { View, Text, TouchableOpacity, Image, Easing, StatusBar, StyleSheet } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

export default class Header extends React.PureComponent {


    onBack = () => {
        const { navigation, actions, isFilterScreen, activeTab, setTab, marketplace: { countCart, isFromSearchScreen, setInputDetails, setFilterScreen, isFromCategoryScreen } } = this.props;

        /////////////FOR SEARCH SCREEN TO GO BACK MAIN SCREEN.
        // if (isFromSearchScreen && navigation.state.routeName === "FilterScreens") { 
        //     actions.isFromSearchScreen(false);
        //     navigation.navigate("MarketPlaceMain")
        // } else {
        if (navigation.state.routeName === "FilterScreensCollections") {
            actions.isFromCollectionScreen(false);
        }
        navigation.goBack()
        // }
    }

    _onPress = () => {
        const { actions, isFilterScreen, login: { session }, openDrawer, navigation, marketplace: { countCart, setOnlineStoreScreen } } = this.props;
        // if (!isFilterScreen) {
        //     actions.getCartList(session);
        //     navigation.navigate("MyCart")
        // }
        // else {
        //     openDrawer();
        // }
        navigation.navigate("BurgerMenu")
    }

    render() {
        const { navigation, actions, isFilterScreen, marketplace: { countCart, setOnlineStoreScreen } } = this.props;
        let image;
        if (!isFilterScreen) {
            image = "online_store_cart"
        } else {
            image = "online_store_filter"
        }
        console.log("prv", navigation)
        return (
            <View style={{ height: 50, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                {/* <TouchableOpacity onPress={() => this.onBack()} style={{  }}> */}
                <Image style={{ position: "absolute", left: 13, width: 28, height: 30, }} source={Res.get("u_legit_logo")} resizeMode="contain" />
                {/* </TouchableOpacity> */}
                <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")} style={{
                    backgroundColor: "white", height: 35, width: "75%", borderRadius: 15, elevation: 4,
                    flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                }} >
                    {/* <Text style={{ padding: 10, fontSize: 10, color: Color.Standard2, fontFamily: "Roboto-Light" }} >Search a product.</Text> */}
                    <Icon type='font-awesome' name='search' size={15} color={Color.colorPrimaryMP} containerStyle={{ padding: 10 }} />
                </TouchableOpacity>
                {/* {!_.isEqual(countCart, 0) && !isFilterScreen &&
                    <View style={{
                        position: "absolute", width: 15, height: 15, borderRadius: 20, backgroundColor: Colors.red600,
                        right: 5, top: 5, justifyContent: "center", alignItems: "center",
                    }}>
                        <Text style={{ backgroundColor: 'transparent', color: 'white', fontSize: 10 }}>{countCart}</Text>
                    </View>} */}
                <TouchableOpacity onPress={() => this._onPress()} style={{ position: "absolute", right: 15, alignItems: "center" }}>
                    <Image style={{ width: 20, height: 20, }} source={Res.get("burger_menu")} resizeMode="contain" />
                    {/* {isFilterScreen && <Text style={{ fontSize: 11 }}>Filter</Text>} */}
                </TouchableOpacity>
            </View>
        )
    }
}