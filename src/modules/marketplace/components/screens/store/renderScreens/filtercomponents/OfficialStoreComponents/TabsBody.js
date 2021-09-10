import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl, StyleSheet } from 'react-native';
import _ from 'lodash';
import { Tab, Tabs, ScrollableTab } from 'native-base';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import TabHome from './tabsscreens/TabHome';
import TabCollections from './tabsscreens/TabCollections';
import TabAllProducts from './tabsscreens/TabAllProducts';
import Resource from "__src/resources";
const { Color, Res } = Resource;
const tabsData = ["Home", "All Products", "Collections"]


export default class TabsBody extends React.PureComponent {


    renderTab = (name, index) => {
        if (name === "Home") {
            return <TabHome key={index} tabLabel={name} ref={(e) => this.TabHome = e} {...this.props} />;
        }
        else if (name === "All Products") {
            return <TabAllProducts key={index} tabLabel={name} ref={(e) => this.TabAllProducts = e} {...this.props} />;
        }
        else if (name === "Collections") {
            return <TabCollections key={index} tabLabel={name} ref={(e) => this.TabCollections = e} {...this.props} />;
        }
    }

    render() {
        const { setTab, activeTab } = this.props;
        return (
            <Tabs
                tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                style={styles.TabsStyle}
                locked
                initialPage={activeTab}
                tabContainerStyle={{ height: 45 }}
                tabBarActiveTextColor={Color.colorPrimaryMP}
                onChangeTab={(props) => setTab(props.i)}
                tabBarInactiveTextColor={Color.Standard2}>
                {tabsData.map((item, idx) => {
                    return (
                        <Tab key={`idx ${idx}`}
                            heading={`${item}`}
                            tabStyle={styles.tabStyle}
                            textStyle={styles.textStyle}
                            activeTextStyle={{ fontSize: 14, color: Color.colorPrimaryMP }}
                            activeTabStyle={{ backgroundColor: Color.white }}>
                            {this.renderTab(item, idx)}
                        </Tab>
                    );
                })}
            </Tabs>
        )
    }
}

const styles = StyleSheet.create({
    tabBarUnderlineStyle: { height: 1, backgroundColor: Color.colorPrimaryMP },
    tabStyle: { backgroundColor: Color.white, },
    TabsStyle: { backgroundColor: Color.white, alignItems: "center", justifyContent: "center" },
    textStyle: { color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 },
});