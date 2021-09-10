import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl, StyleSheet } from 'react-native';
import _ from 'lodash';
import { Tab, Tabs, ScrollableTab } from 'native-base';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import DynamicTabs from './TabsScreen/DynamicTabs';
import Resource from "__src/resources";
const { Color, Res } = Resource;
// const tabsData = ["Order Updates", "Chat", "Marketplace Promotions", "Comments", "System Updates"]


export default class RenderTabsScreen extends React.PureComponent {

    state = {
        tabsData: ["Order Updates", "Chat", "Marketplace Promotions", "Comments", "System Updates"]
    }

    renderTab = (name, index) => {
        const { marketplace: { getNotifications } } = this.props
        if (name === name) {
            let product;
            if (name === "Order Updates") {
                product = _.filter(getNotifications.data, orders => {
                    if (orders.type.toString().toUpperCase() === "Ordered".toUpperCase()) {
                        return orders;
                    }
                })
            } else if (name === "Chat") {
                product = _.filter(getNotifications.data, orders => {
                    if (orders.type.toString().toUpperCase() === "Chat".toUpperCase()) {
                        return orders;
                    }
                })
            } else if (name === "Marketplace Promotions") {
                product = _.filter(getNotifications.data, orders => {
                    if (orders.type.toString().toUpperCase() === "Promotions".toUpperCase()) {
                        return orders;
                    }
                })
            } else if (name === "Comments") {
                product = _.filter(getNotifications.data, orders => {
                    if (orders.type.toString().toUpperCase() === "Comments".toUpperCase()) {
                        return orders;
                    }
                })
            } else if (name === "System Updates") {
                product = _.filter(getNotifications.data, orders => {
                    if (orders.type.toString().toUpperCase() === "System".toUpperCase()) {
                        return orders;
                    }
                })
            } else if (name === "Listing Updates") {
                product = _.filter(getNotifications.data, orders => {
                    if (orders.type.toString().toUpperCase() === "Listing".toUpperCase()) {
                        return orders;
                    }
                })
            }
            return <DynamicTabs key={index} notifs={product} tabLabel={name} ref={(e) => this.OrdersTab = e} {...this.props} />;
        }
    }

    render() {
        const { marketplace: { setUserSide, transactionInProgress } } = this.props;
        const tabsScreens = setUserSide ? _.concat(this.state.tabsData, "Listing Updates") : this.state.tabsData;
        return (
            <Tabs
                tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                style={styles.TabsStyle}
                renderTabBar={() => < ScrollableTab style={{ height: 40, }} />}
                locked
                initialPage={0}
                // page={0}
                tabContainerStyle={{ height: 30 }}
                tabBarActiveTextColor={Color.colorPrimaryMP}
                tabBarInactiveTextColor={Color.Standard2} >
                {
                    tabsScreens.map((item, idx) => {
                        return (
                            <Tab key={`idx ${idx}`}
                                heading={`${item}`}
                                tabStyle={styles.tabStyle}
                                textStyle={styles.textStyle}
                                activeTextStyle={{ fontSize: 12, color: Color.colorPrimaryMP }}
                                activeTabStyle={{ backgroundColor: Color.white }}>
                                {this.renderTab(item, idx)}
                            </Tab>
                        );
                    })
                }
            </Tabs >
        )
    }
}

const styles = StyleSheet.create({
    tabBarUnderlineStyle: { height: 1, backgroundColor: Color.colorPrimaryMP },
    tabStyle: { backgroundColor: Color.white, },
    TabsStyle: { backgroundColor: Color.white, alignItems: "center", justifyContent: "center" },
    textStyle: { color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 },
});