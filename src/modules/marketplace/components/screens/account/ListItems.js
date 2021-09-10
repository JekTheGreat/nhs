import React from 'react';
import { View, ScrollView, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { Colors } from 'react-native-paper';
import _ from 'lodash';
import Resources from "__src/resources";
const { Color, Res } = Resources;
const { height, width } = Dimensions.get('window');
const customerList = { "Transactions": ["My Purchases", "Return & Refunds"], "Notifications": "Notifications", "My Favorites": "My favorites", "Reports": "Reports", "Settings": "Settings" }
const sellerList = ["Dashboard", "Notifications", "Settings"]

export default class ListItems extends React.PureComponent {

    state = { isExpanded: false };

    click = (item, index) => {
        const { actions, navigation, changeUserSide, goToPage, login: { session }, marketplace: { countCart, setUserSide } } = this.props;
        if (item === "Switch") {
            changeUserSide();
        }
        else if (item === "Transactions") {
            this.setState({ isExpanded: !this.state.isExpanded });
        }
        else if (item === "Dashboard") {
            goToPage(0);
        }
        else if (item === "Notifications") {
            goToPage(2);
        }
        else if (item === "My Favorites") {
            actions.getFavorites(session);
            navigation.navigate("MyFavorites", { countCart: countCart });
        }
        else if (item === "Reports") {
            actions.getReports(session, 0);
            navigation.navigate("ReportsScreen", { isSearching: false });
        }
        else if (item === "Settings") {
            if (setUserSide) {
                actions.getBlockList(session);
            }
            navigation.navigate("SettingsScreen", { countCart: countCart, isSellerSide: setUserSide });
        }
        else if (item === "My Purchases") {
            actions.getPurchaseList(session);
            navigation.navigate("MyPurchase", { isSearching: false });
        }
        else if (item === "Return & Refunds") {
            actions.getReturnList(session);
            navigation.navigate("ReturnRefund", { isSearching: false });
        }
    }

    _renderChildCustomerRow = ({ item, index }) => {
        return (
            <ListItem onPress={() => this.click(item, index)}
                titleStyle={{ marginLeft: 40, color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light" }}
                containerStyle={{ backgroundColor: Color.white, borderBottomColor: Colors.grey300, borderBottomWidth: .5 }}
                key={`cust_child_row_id ${item}`} title={item}
                chevron={<Icon name='chevron-right' type='evilicon' color={Color.Standard2} size={25} />} />
        )
    }

    _renderCustomerRow = ({ item, index }) => {
        const { marketplace: { getNotifications } } = this.props;
        let image;
        let iconName;
        if (item === "Transactions") {
            image = "transactions_icon";
            iconName = this.state.isExpanded ? 'chevron-up' : 'chevron-down';
        } else if (item === "Notifications") {
            image = "notif_icon";
            iconName = 'chevron-right';
        } else if (item === "My Favorites") {
            image = "favorites_icon";
            iconName = 'chevron-right';
        } else if (item === "Reports") {
            image = "reports_icon";
            iconName = 'chevron-right';
        } else if (item === "Settings") {
            image = "settings_icon";
            iconName = 'chevron-right';
        }
        else if (item === "Dashboard") {
            image = "dashboard_icon";
            iconName = 'chevron-right';
        }

        return (
            <View>
                <ListItem onPress={() => this.click(item, index)}
                    titleStyle={{ color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light" }}
                    containerStyle={{ backgroundColor: Color.white, borderBottomColor: Colors.grey300, borderBottomWidth: .5 }}
                    key={`cust_row_id ${item}`} title={item}
                    chevron={<Icon name={iconName} type='evilicon' color={Color.Standard2} size={25} />}
                    leftAvatar={<Image style={{ width: 23, height: 23, padding: 2 }} source={Res.get(image)} resizeMode='contain' />}
                    rightElement={<View>
                        {_.isEqual(item, "Notifications") && _.has(getNotifications, "new") && (!_.isEqual(getNotifications.new, 0)) &&
                            <View style={{
                                position: "absolute", width: 18, height: 18, borderRadius: 20, backgroundColor: Colors.red600,
                                right: -10, top: -10, justifyContent: "center", alignItems: "center",
                            }}>
                                <Text style={{ backgroundColor: 'transparent', color: 'white', fontSize: 10 }}>{getNotifications.new}</Text>
                            </View>}
                    </View>} />
                {_.isEqual(item, "Transactions") && this.state.isExpanded &&
                    <FlatList
                        ListFooterComponent={<View style={{ backgroundColor: "transparent" }} />}
                        data={customerList.Transactions}
                        renderItem={this._renderChildCustomerRow}
                        keyExtractor={(item, index) => `cust_child_row_id ${index}`} />}
            </View>
        )
    }

    _renderUI = () => {
        const { marketplace: { setUserSide } } = this.props;
        const ListData = setUserSide ? sellerList : Object.keys(customerList);
        return (
            <FlatList
                ListFooterComponent={<View style={{ backgroundColor: "transparent" }} />}
                data={ListData}
                renderItem={this._renderCustomerRow}
                keyExtractor={(item, index) => `cust_row_id ${index}`} />
        )
    }

    render() {
        const { userSide, marketplace: { setUserSide } } = this.props;
        //setUserSide === seller ui, !setUserSide=== customer ui.
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <ListItem onPress={() => this.click("Switch")}
                    titleStyle={{ color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light" }}
                    containerStyle={{ backgroundColor: Color.white, borderBottomColor: Colors.grey300, borderBottomWidth: .5 }}
                    title={`Switch to ${userSide} Account`}
                    leftAvatar={<Image style={{ width: 23, height: 23, padding: 2 }} source={Res.get("prof_icon")} resizeMode='contain' />}
                    chevron={<Icon name='chevron-right' type='evilicon' color={Color.Standard2} size={25} />} />
                {this._renderUI()}
            </ScrollView>
        )
    }
}