import React, { PureComponent } from "react";
import { StyleSheet, Text, View, Animated, Image, SafeAreaView, StatusBar, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import CustomTab from './Customtab';
import RenderStore from './screens/store/RenderStore';
// import RenderChat from './screens/chat/RenderChat';
import RenderChat from './screens/CSOON';
import RenderNotification from './screens/notifications/RenderNotifications';
import DashboardMain from './screens/dashboard/DashboardMain';
import RenderAccount from './screens/account/RenderAccount';
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";
import { HeaderBackButton } from "react-navigation-stack";
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const tabList = ["MarketPlace", "Chat", "Notification", "Account"];


class Main extends PureComponent {

    componentWillMount() {
        const { actions, login: { session }, marketplace: { getMyShop, setInputDetails } } = this.props
        // if (_.isEmpty(getMyShop)) {
        const newInput = _.merge({}, setInputDetails);
        let param = _.merge({}, newInput.route);
        param = tabList[0];
        newInput.route = param;
        actions.setInputDetails(newInput);
        actions.getMyShop(session);
        actions.getFilterCategoryList(session);
        actions.getShopList(session);
        actions.getCartList(session);
        actions.getAdsImages(session);
        actions.getCategoryList(session);
        actions.getProductList(session);
        actions.getTopProducts(session);
        actions.getTrendingProducts(session);
        actions.getSaleProducts(session);
        actions.getNotifications(session);
        // }
    }

    componentDidUpdate(prevProps) {
        const { actions, marketplace: { countCart, getCartList, patchCartItem, addToCart, setCartListOnCheck }, login: { session } } = this.props
        if (!_.isEqual(prevProps.marketplace.addToCart, addToCart) && !_.isEmpty(addToCart)) {
            actions.getCartList(session);
        }
        if (!_.isEqual(prevProps.marketplace.patchCartItem, patchCartItem) && !_.isEmpty(patchCartItem)) {
            if (Number(patchCartItem.status) === 0) {
                Alert.alert("Error", patchCartItem.result);
                delete patchCartItem.status;
            }
            else {
                _.map(Object.keys(setCartListOnCheck), del_id => {
                    delete setCartListOnCheck[del_id];
                })
                delete patchCartItem.status;
                actions.getCartList(session);
            }
        }
        // if (!_.isEqual(prevProps.marketplace.getCartList, getCartList)) {
        //     let cartTotal = _.merge({}, countCart);
        //     const sumCart = _.map(getCartList, (item) => {
        //         return item.quantity;
        //     });
        //     const sum = (!_.isEmpty(sumCart)) || (!_.isUndefined(sumCart)) ? _.sum(sumCart) : {};
        //     cartTotal = sum;
        //     actions.countCart(cartTotal);
        // }
    }

    goToPage = (page) => {
        this.tabView.goToPage(page);
    }

    render() {
        const { actions, marketplace: { countCart, getCartList, setUserSide }, login: { session }, isFocused } = this.props
        const obj = {
            homeLabel: "MarketPlace",
            homeIcon: "online_store_home",
            homeIconActive: "online_store_home_tint",
            dashboardLabel: "Dashboard",
            dashboardIcon: "online_store_dashboard",
            dashboardIconActive: "online_store_dashboard_tint",
            chatsLabel: "Chats",
            chatsIcon: "online_store_chats",
            chatsIconActive: "online_store_chats_tint",
            notificationsLabel: "Notifications",
            notificationsIcon: "online_store_notifications",
            notificationsIconActive: "online_store_notifications_tint",
            accountLabel: "Account",
            accountIcon: "menu_profile",
            accountIconActive: "menu_profile_tint",
        }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor={"white"} />
                <ScrollableTabView
                    ref={(tabView) => { this.tabView = tabView }}
                    initialPage={0}
                    locked
                    renderTabBar={(props) => <CustomTab {...this.props} props2={props} ref={(e) => this.CustomTab = e} />}
                    tabBarPosition="bottom"
                    tabBarInactiveTextColor={Color.Standard}
                    tabBarActiveTextColor={Color.white}>
                    {setUserSide ?
                        <DashboardMain
                            tabLabel={obj.dashboardLabel}
                            {...this.props} /> :
                        <RenderStore
                            goToPage={this.goToPage}
                            tabLabel={obj.homeLabel}
                            {...this.props} />}
                    <RenderChat
                        goToPage={this.goToPage}
                        tabLabel={obj.chatsLabel}
                        {...this.props} />
                    <RenderNotification
                        goToPage={this.goToPage}
                        tabLabel={obj.notificationsLabel}
                        {...this.props} />
                    <RenderAccount
                        goToPage={this.goToPage}
                        tabLabel={obj.accountLabel}
                        {...this.props} />
                </ScrollableTabView>
            </SafeAreaView>
        )
    }
}


export default Main;