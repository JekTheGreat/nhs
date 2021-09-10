import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl, StyleSheet } from 'react-native';
import _ from 'lodash';
import { Tab, Tabs, ScrollableTab } from 'native-base';
import { Icon, ListItem } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

export default class DynamicTabs extends React.PureComponent {

    state = {
        isRefreshing: false,
    }

    componentDidUpdate(prevProps) {
        const { marketplace: { transactionInProgress } } = this.props;
        if (!_.isEqual(prevProps.marketplace.transactionInProgress, transactionInProgress) && (transactionInProgress === false)) {
            this.setState({ isRefreshing: false });
        }
    }

    _onPress = (item) => {
        const { actions, login: { session } } = this.props
        let param = {};
        param.id = item.id;
        param.type = item.type;
        actions.patchNotifications(session, param)
    }

    renderRow = ({ item, index }) => {
        let img;
        if (item.type.toString().toUpperCase() === "Ordered".toUpperCase() || item.type.toString().toUpperCase() === "Comments".toUpperCase()) {
            img = "order_image_test";
        } else if (item.type.toString().toUpperCase() === "System".toUpperCase()) {
            img = "settings_test";
        } else if (item.type.toString().toUpperCase() === "Promotions".toUpperCase()) {
            img = "promotions_test"
        }
        return (
            <TouchableOpacity key={`item_id ${index}`} onPress={() => this._onPress(item)} activeOpacity={1} style={{ borderBottomColor: Colors.grey300, borderBottomWidth: .5, flexDirection: "row", paddingVertical: 15, }}>
                <View style={{ marginHorizontal: 10, borderWidth: 1, borderColor: Color.Standard, height: 50, width: "18%", alignItems: "center", justifyContent: "center" }}>
                    <Image source={{ uri: item.url }} style={{ height: 40, width: 40 }} />
                </View>
                {item.status.toString().toUpperCase() === "New".toUpperCase() &&
                    <View style={{ position: "absolute", left: 10, top: 15 }}>
                        <View style={{
                            width: 0, height: 0, borderLeftWidth: 0, borderRightWidth: 35, borderTopWidth: 35, borderStyle: 'solid',
                            backgroundColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent',
                            borderTopColor: Color.colorPrimaryMP, borderBottomColor: 'transparent',
                        }} />
                        <Text style={{
                            position: "absolute", top: 3, left: 2, alignSelf: "center", textAlign: "center",
                            fontSize: 10, fontWeight: "bold", fontFamily: "Roboto-Light", color: "white",
                            transform: [{ rotate: "315deg" }]
                        }} >New
                            </Text>
                    </View>}

                <View style={{ width: "75%", }}>
                    <Text style={{ fontSize: 14, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.colorPrimaryMP, }}>
                        {`${item.name}.`}
                    </Text>
                    <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2, }}>
                        {`${item.content}.`}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }


    refresh = () => {
        const { actions, login: { session } } = this.props;
        actions.getNotifications(session);
        this.setState({ isRefreshing: true });
    }

    render() {
        const { notifs, marketplace: { getNotifications } } = this.props
        return (
            !_.isEmpty(notifs) ?
                <View>
                    <FlatList
                        ListFooterComponent={<View style={{ backgroundColor: "transparent" }} />}
                        data={notifs}
                        refreshControl={<RefreshControl refreshing={this.state.isRefreshing && !_.isEmpty(getNotifications)}
                            onRefresh={this.refresh} />}
                        showsVerticalScrollIndicator={false}
                        renderItem={this.renderRow}
                        keyExtractor={(item) => { `item_id ${item.id}` }} />
                </View>
                :
                <ScrollView refreshControl={<RefreshControl refreshing={this.state.isRefreshing && !_.isEmpty(getNotifications)}
                    onRefresh={this.refresh} />} >
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 150 }}>
                        <Icon type='font-awesome' name='envelope-open-o' size={45} color={Color.Standard} />
                        <Text style={{ marginTop: 10, fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2, }}>No Data</Text>
                    </View>
                </ScrollView>
        )
    }
}
