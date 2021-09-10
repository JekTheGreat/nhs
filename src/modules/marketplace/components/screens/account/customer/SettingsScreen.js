import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, Alert } from 'react-native';
import { HeaderBackButton } from "react-navigation-stack";
import _ from 'lodash';
import { Rating } from 'react-native-ratings';
import ToggleSwitch from 'toggle-switch-react-native';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class SettingsScreen extends React.PureComponent {
    state = { settings: {} }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            headerLeft: <HeaderBackButton tintColor="black" onPress={() => navigation.goBack()} />,
            headerRight: !params.isSellerSide &&
                <View style={{ justifyContent: "center", alignItems: "center", }}>
                    < TouchableOpacity onPress={() => navigation.navigate("MyCart")
                    } style={{ position: "absolute", right: 15, alignItems: "center", alignSelf: "center" }}>
                        <Image style={{ width: 20, height: 20, }} source={Res.get("online_store_cart")} resizeMode="contain" />
                    </TouchableOpacity >
                    {!_.isEqual(params.countCart, 0) &&
                        < View style={{
                            position: "absolute", width: 15, height: 15, borderRadius: 20, backgroundColor: Colors.red600,
                            right: 5, top: 10, justifyContent: "center", alignItems: "center",
                        }}>
                            <Text style={{ backgroundColor: 'transparent', color: 'white', fontSize: 10 }}>{params.countCart}</Text>
                        </View>
                    }
                </View >
        }
    }
    componentWillMount() {
        const { marketplace: { getSettings, setUserSide } } = this.props;
        let arr = {};
        arr.ordered = getSettings.ordered
        arr.chat = getSettings.chat
        arr.promotions = getSettings.promotions
        arr.comments = getSettings.comments
        arr.system = getSettings.system
        if (setUserSide) {
            arr.listing = getSettings.listing
        }
        this.setState({ settings: arr })
    }

    componentDidUpdate(prevProps) {
        const { actions, login: { session }, marketplace: { patchSettings, setUserSide } } = this.props;
        if (!_.isEmpty(patchSettings) && !_.isEqual(patchSettings, prevProps.marketplace.patchSettings)) {
            if (patchSettings.status === 1) {
                let arr = {};
                arr.ordered = patchSettings.data.ordered
                arr.chat = patchSettings.data.chat
                arr.promotions = patchSettings.data.promotions
                arr.comments = patchSettings.data.comments
                arr.system = patchSettings.data.system
                if (setUserSide) {
                    arr.listing = patchSettings.data.listing
                }
                this.setState({ settings: arr });
                actions.getSettings(session);
                actions.getNotifications(session);
            } else {
                Alert.alert("Error", patchSettings.result)
            }
            delete patchSettings.status;
        }
    }


    _renderSettings = ({ item, index }) => {
        const { actions, login: { session }, marketplace: { patchSettings } } = this.props;
        let image;
        let txt;
        if (item === "ordered") {
            image = "settings_order_update";
            txt = "Order Updates"
        } else if (item === "chat") {
            image = "settings_chat";
            txt = "Chat"
        } else if (item === "promotions") {
            image = "settings_mp_promotions";
            txt = "Marketplace Promotions"
        } else if (item === "comments") {
            image = "settings_comments";
            txt = "Comments"
        } else if (item === "system") {
            image = "settings_system_update";
            txt = "System Update"
        } else if (item === "listing") {
            image = "cart_icon";
            txt = "Listing Updates"
        }
        return (
            <View key={`settings_idx ${index}`} style={{ borderBottomColor: Colors.grey300, borderBottomWidth: .5, flexDirection: "row", paddingVertical: 15, paddingHorizontal: 20 }}>
                <View style={{ flexDirection: "row", width: "90%", justifyContent: "flex-start" }}>
                    <Image style={{ alignSelf: "center", width: 23, height: 23 }} source={Res.get(image)} resizeMode='contain' />
                    <Text style={{ marginLeft: 15, textAlign: "center", fontSize: 14, fontFamily: "Roboto-Light", color: "black" }}>{`${txt}`}</Text>
                </View>
                <View style={{ flexDirection: "row", width: "10%", }}>
                    <ToggleSwitch
                        isOn={this.state.settings[item]}
                        onColor={Color.colorPrimaryMP}
                        offColor={Color.Standard}
                        size="small"
                        onToggle={() => actions.patchSettings(session, item)} />
                </View>

            </View >
        )
    }


    render() {
        const { navigation, marketplace: { setUserSide, getBlockList } } = this.props;
        const role = setUserSide ? "merchant" : "customer";
        console.log("state", this.state.settings)
        return (
            <View style={{ paddingVertical: 10, backgroundColor: "white", width: "100%", height: "100%" }}>
                {setUserSide &&
                    <View>
                        <Text style={{ paddingHorizontal: 20, marginTop: 5, fontSize: 14, fontWeight: "bold", color: "black" }}>Privacy Settings </Text>
                        <Text style={{ paddingHorizontal: 20, marginTop: 5, fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>
                            Manage your merchant profile privacy settings.
                        </Text>

                        <TouchableOpacity onPress={() => navigation.navigate("BlockedUsers")} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15, paddingHorizontal: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image style={{ width: 20, height: 20 }} source={Res.get("prof_icon")} resizeMode='contain' />
                                <View style={{}}>
                                    <Text style={{ marginLeft: 10, fontSize: 14, fontFamily: "Roboto-Light", color: "black" }}>Blocked Users</Text>
                                    <Text style={{ marginLeft: 10, fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard }}>{`List of users you have blocked\nfrom chats`}</Text>

                                </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ textAlign: "center", fontSize: 14, fontFamily: "Roboto-Light", color: Color.colorPrimaryMP }}>{`${getBlockList.total} blocked users`}</Text>
                            </View>
                        </TouchableOpacity>

                        <Text style={{ paddingHorizontal: 20, marginTop: 20, fontSize: 14, fontWeight: "bold", color: "black" }}>Notifications </Text>
                    </View>}

                <Text style={{ paddingHorizontal: 20, marginTop: 5, fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>
                    {`Manage your ${role} profile notification settings.`}
                </Text>
                <FlatList
                    data={Object.keys(this.state.settings)}
                    contentContainerStyle={{ marginTop: 10 }}
                    keyExtractor={(item, index) => `settings_idx ${index}`}
                    renderItem={this._renderSettings} />
            </View>
        )
    }
}