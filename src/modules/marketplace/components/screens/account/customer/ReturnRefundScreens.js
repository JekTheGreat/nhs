import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, FlatList, RefreshControl, StyleSheet } from 'react-native';
import _ from 'lodash';
import { Tab, Tabs, ScrollableTab } from 'native-base';
import { Icon, ListItem } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

export default class ReturnRefundScreens extends React.PureComponent {

    state = { isRefreshing: false, itemShowing: [], isCancelReasonNull: false }

    componentDidUpdate(prevProps) {
        const { marketplace: { transactionInProgress } } = this.props;
        if (!_.isEqual(prevProps.marketplace.transactionInProgress, transactionInProgress) && (transactionInProgress === false)) {
            this.setState({ isRefreshing: false });
        }
    }

    _onPress = (item) => {
        const { actions, navigation, login: { session }, marketplace: { setReturnItems } } = this.props
        let rItems = _.merge({}, setReturnItems);
        rItems = item
        actions.setReturnItems(rItems);
        navigation.navigate("ReturnItems");
    }

    _productOptions = (items) => ({ item, index }) => {
        return (
            <View key={`idx ${index}`} style={{ marginTop: 5 }}>
                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>
                    {`${item}: ${items.variation[item]}, `}
                </Text>
            </View>
        )
    }

    renderRow = ({ item, index }) => {
        const price = Number(parseFloat(item.total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        return (
            <View key={`trans_idx ${index}`} style={{}}>
                <View style={{ paddingVertical: 10, paddingHorizontal: 15, }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.shop_name}</Text>
                        </View>
                        <Text style={{ fontSize: 12, color: Color.colorPrimaryMP }}>{item.status}</Text>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Transaction Number</Text>
                        <Text style={{ fontSize: 12, color: Color.colorPrimaryMP }}>{item.trackingno}</Text>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "white" }}>
                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        {/* <Image source={{ uri: item.prod_id.coverImg }} style={{ width: "20%", height: 60 }} resizeMode='stretch' /> */}
                        <View style={{ backgroundColor: "pink", width: "20%", height: 60 }} />
                        <View style={{ width: "75%", }}>
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.prod_name}</Text>
                            <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`Qty: ${item.quantity}`}</Text>
                            <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`₱ ${price}`}</Text>
                        </View>

                    </View>
                    {!_.isNull(item.variation) &&
                        <FlatList
                            data={Object.keys(item.variation)}
                            keyExtractor={(index) => `idx ${index}`}
                            style={{ flexDirection: 'row' }}
                            renderItem={this._productOptions(item)} />}

                    <TouchableOpacity onPress={() => this._onPress(item)}
                        style={{ marginTop: 10, width: "35%", alignSelf: "flex-end", alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 5, paddingVertical: 5 }} >
                        <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>View Item</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    refresh = () => {
        const { actions, login: { session } } = this.props;
        actions.getReturnList(session);
        this.setState({ isRefreshing: true });
    }

    render() {
        const { transactionList, marketplace: { getReturnList } } = this.props;
        console.log("Translist", transactionList)
        return (
            !_.isEmpty(transactionList) ?
                <FlatList
                    style={{ backgroundColor: Color.bg }}
                    data={transactionList}
                    refreshControl={<RefreshControl refreshing={this.state.isRefreshing && !_.isEmpty(getReturnList)}
                        onRefresh={this.refresh} />}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => `trans_idx ${index}`}
                    renderItem={this.renderRow} />
                :
                <ScrollView refreshControl={<RefreshControl refreshing={this.state.isRefreshing && !_.isEmpty(getReturnList)}
                    onRefresh={this.refresh} />}
                    contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Color.bg }}>
                    <Icon type='font-awesome' name='envelope-open-o' size={45} color={Color.Standard} />
                    <Text style={{ marginTop: 10, fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2, }}>No Data</Text>
                </ScrollView>

        )
    }
}
