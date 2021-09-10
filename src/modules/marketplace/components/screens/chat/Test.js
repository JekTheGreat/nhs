import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { HeaderBackButton } from "react-navigation-stack";
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

export default class Test extends React.PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
            headerTitle: <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableOpacity style={{
                    width: 150, backgroundColor: "white", borderRadius: 5, flexDirection: "row",
                    justifyContent: "space-between", alignItems: "center"
                }}>
                    <Text style={{ padding: 10, fontFamily: "Roboto-Light", fontSize: 11, color: Color.colorPrimaryMP }}>Search a product</Text>
                    <Icon name='search' type='font-awesome' size={20} color={"black"} style={{ padding: 10, }} />
                </TouchableOpacity>
                <Image style={{ width: 23, height: 23, padding: 2 }} source={Res.get("online_store_cart")} resizeMode="contain" />
            </View>,
            headerLeft: <HeaderBackButton tintColor="white" onPress={navigation.getParam("back")} />
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.setParams({
            back: this.onBack, onselect: this._onSelect,
            renderrow: this._renderRow, renderbuttontext: this._renderButtonText
        })
    }

    onBack = () => {
        const { navigation } = this.props;
        navigation.navigate("MarketPlaceMain")
    }
    render() {
        return (
            <View>
                <Text>ASDFAFDSFA</Text>
            </View>
        )
    }
}