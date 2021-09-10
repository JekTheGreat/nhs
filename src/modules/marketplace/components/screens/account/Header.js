import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

export default class Header extends React.PureComponent {

    onBack = () => {
        const { navigation } = this.props;
        navigation.goBack()
    }

    _onPress = () => {
        const { actions, login: { session }, navigation } = this.props;
        actions.getCartList(session);
        navigation.navigate("MyCart")
    }

    render() {
        const { marketplace: { countCart, setUserSide } } = this.props;
        return (
            <LinearGradient colors={["#484848", "#414141"]} style={{ height: 50, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
                <TouchableOpacity onPress={() => this.onBack()} style={{ position: "absolute", left: 13 }}>
                    <Image style={{ width: 18, height: 18, }} source={Res.get("back_white")} resizeMode="contain" />
                </TouchableOpacity>
                {(!_.isEqual(countCart, 0) && !setUserSide) && <View style={{
                    position: "absolute", width: 15, height: 15, borderRadius: 20, backgroundColor: Colors.red600,
                    right: 5, top: 5, justifyContent: "center", alignItems: "center",
                }}>
                    <Text style={{ backgroundColor: 'transparent', color: 'white', fontSize: 10 }}>{countCart}</Text>
                </View>}
                {!setUserSide &&
                    <TouchableOpacity onPress={() => this._onPress()} style={{ position: "absolute", right: 15, alignItems: "center" }}>
                        <Image style={{ width: 20, height: 20, }} source={Res.get("online_store_cart_white")} resizeMode="contain" />
                    </TouchableOpacity>
                }
            </LinearGradient>
        )
    }
}