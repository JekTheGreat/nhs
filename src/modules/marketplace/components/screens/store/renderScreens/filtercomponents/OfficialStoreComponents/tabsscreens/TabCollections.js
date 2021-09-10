import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl, StyleSheet } from 'react-native';
import _ from 'lodash';
import { Tab, Tabs, ScrollableTab } from 'native-base';
import { Icon, ListItem } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

export default class TabCollections extends React.PureComponent {


    click = (item) => {
        const { actions, navigation, marketplace: { setCollectionProducts } } = this.props
        let collectedProducts = _.merge({}, setCollectionProducts);
        collectedProducts = item;
        actions.setCollectionProducts(collectedProducts);
        navigation.navigate("FilterScreensCollections");
        actions.isFromCollectionScreen(true);
        // actions.setFilterScreen("collectionScreen");
    }

    renderRow = ({ item, index }) => {
        return (
            <ListItem onPress={() => this.click(item)}
                titleStyle={{ color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light" }}
                containerStyle={{ backgroundColor: Color.white, borderBottomColor: Colors.grey300, borderBottomWidth: .5 }}
                key={`item_id ${item.id}`} title={`${item.name} Collection`}
                chevron={<Icon name='chevron-right' type='evilicon' color={Color.Standard2} size={25} />} />
        );
    }

    render() {
        const { actions, navigation, marketplace: { setOnlineStoreScreen, getShopIdCollections } } = this.props
        return (
            <View>
                <FlatList
                    ListFooterComponent={<View style={{ backgroundColor: "transparent" }} />}
                    data={getShopIdCollections}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => { `item_id ${item.id}` }} />
            </View>
        )
    }
}
