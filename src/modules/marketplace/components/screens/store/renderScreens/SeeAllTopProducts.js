import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl, StyleSheet } from 'react-native';
import _ from 'lodash';
import { Tab, Tabs, ScrollableTab } from 'native-base';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
import TopProd from "./topproductscomponents/TopProducts";

export default class TopProducts extends React.PureComponent {


    renderTab = (name, id, items) => {
        if (name === name) {
            return <TopProd key={id}
                tabLabel={name} ref={(e) => this.TopProd = e}
                products={items}
                actions={this.props.actions}
                navigation={this.props.navigation}
                login={this.props.login}
                marketplace={this.props.marketplace} />;
        }
    }

    render() {
        const { actions, navigation, marketplace: { setOnlineStoreScreen, getTopProducts } } = this.props
        const data = _.map(getTopProducts, prod => {
            return { id: prod.id, name: prod.name, products: prod.product }
        })
        const initPage = _.has(navigation, "state.params.topPage") ? navigation.getParam("topPage") : 0;
        return (
            <Tabs
                tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                style={styles.TabsStyle}
                renderTabBar={data.length > 4 ? () => <ScrollableTab /> : null}
                locked
                initialPage={initPage}
                tabBarActiveTextColor={Color.colorPrimaryMP}
                tabBarInactiveTextColor={Color.Standard2}>
                {data.map((item, idx) => {
                    return (
                        <Tab key={`idx ${idx}`}
                            heading={`${item.name}`}
                            tabStyle={styles.tabStyle}
                            textStyle={styles.textStyle}
                            activeTextStyle={{ fontSize: 11, color: Color.colorPrimaryMP }}
                            activeTabStyle={{ backgroundColor: Color.white }}>
                            {this.renderTab(item.name, item.id, item.products)}
                        </Tab>
                    );
                })}
            </Tabs>
        )
    }
}

const styles = StyleSheet.create({
    tabBarUnderlineStyle: { height: 1, backgroundColor: Color.colorPrimaryDark },
    tabStyle: { backgroundColor: Color.white },
    TabsStyle: { backgroundColor: Color.white, alignItems: "center", justifyContent: "center" },
    textStyle: { color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 10 },
});