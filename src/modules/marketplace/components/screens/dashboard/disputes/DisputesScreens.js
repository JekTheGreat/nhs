import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, FlatList, RefreshControl, StyleSheet } from 'react-native';
import _ from 'lodash';
import { Tab, Tabs, ScrollableTab } from 'native-base';
import { Icon, ListItem } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

export default class DisputesScreens extends React.PureComponent {

    state = { isRefreshing: false, itemShowing: [], isCancelReasonNull: false }

    componentDidUpdate(prevProps) {
        const { marketplace: { transactionInProgress } } = this.props;
        if (!_.isEqual(prevProps.marketplace.transactionInProgress, transactionInProgress) && (transactionInProgress === false)) {
            this.setState({ isRefreshing: false });
        }
    }

    _onPress = (item) => {
        const { actions, navigation, login: { session }, marketplace: { setSelectedTransaction } } = this.props
        let selectedTrans = _.merge({}, setSelectedTransaction);
        selectedTrans = item;
        actions.setSelectedTransaction(selectedTrans);
        navigation.navigate("DisputesSummary");
    }

    renderItems = ({ item, index }) => {
        const price = Number(parseFloat(item.total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        return (
            <View style={{ marginTop: 5, paddingBottom: 5, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    {/* <Image source={{ uri: item.coverImg }} style={{ width: "20%", height: 60 }} resizeMode='stretch' /> */}
                    <View style={{ backgroundColor: "pink", width: "20%", height: 60 }} />
                    <View style={{ width: "75%", }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.prod_name}</Text>
                        <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`Qty: ${item.quantity}`}</Text>
                        <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`₱ ${price}`}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderRow = ({ item, index }) => {
        const { itemShowing } = this.state;
        const isShowing = (!_.isUndefined(itemShowing[index]) || !_.isEmpty(itemShowing[index])) ? true : false;
        const sumTotal = _.sum([item.total_price, item.ship_fee]);
        const total = Number(parseFloat(sumTotal).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        return (
            <View key={`trans_idx ${index}`} style={{ backgroundColor: "white", borderBottomColor: Colors.grey300, borderBottomWidth: 1 }}>
                <View style={{ paddingVertical: 10, paddingHorizontal: 15, }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "black" }}>Transaction Number</Text>
                        <Text style={{ fontSize: 12, fontWeight: "bold", color: Color.colorPrimaryMP }}>{item.trackingno}</Text>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Status</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.status}</Text>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Date Purchased</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.date_purchased}</Text>
                    </View>
                </View>

                <View style={{ paddingVertical: 10, paddingHorizontal: 15, backgroundColor: Color.bg }}>
                    <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Product/s</Text>
                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.prod_name}</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`Qty: ${item.quantity}`}</Text>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "white" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Total Quantity </Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.quantity}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Total Price </Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>₱ {total}</Text>
                    </View>

                    <TouchableOpacity onPress={() => this._onPress(item)}
                        style={{ marginTop: 10, width: "35%", alignSelf: "flex-end", alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 5, paddingVertical: 5 }} >
                        <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>
                            {"View Order"}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    _hideItem = (item, index) => {
        let selected = [...this.state.itemShowing];
        let value = !selected[index];
        if (value) {
            this.setState(previousState => {
                const itemShowing = [...previousState.itemShowing];
                itemShowing[index] = true;
                return { itemShowing };
            });
        }
        else {
            this.setState(previousState => {
                const itemShowing = [...previousState.itemShowing];
                delete itemShowing[index];
                return { itemShowing };
            });
        }
    }

    refresh = () => {
        const { actions, login: { session } } = this.props;
        actions.getSellerReturns(session);
        this.setState({ isRefreshing: true });
    }

    render() {
        const { transactionList, marketplace: { getPurchaseList } } = this.props;
        console.log("Translist", transactionList)
        return (
            !_.isEmpty(transactionList) ?
                <FlatList
                    style={{ backgroundColor: Color.bg }}
                    data={transactionList}
                    refreshControl={<RefreshControl refreshing={this.state.isRefreshing && !_.isEmpty(getPurchaseList)}
                        onRefresh={this.refresh} />}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => `trans_idx ${index}`}
                    renderItem={this.renderRow} />
                :
                <ScrollView refreshControl={<RefreshControl refreshing={this.state.isRefreshing && !_.isEmpty(getPurchaseList)}
                    onRefresh={this.refresh} />}
                    contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Color.bg }}>
                    <Icon type='font-awesome' name='envelope-open-o' size={45} color={Color.Standard} />
                    <Text style={{ marginTop: 10, fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2, }}>No Data</Text>
                </ScrollView>

        )
    }
}
