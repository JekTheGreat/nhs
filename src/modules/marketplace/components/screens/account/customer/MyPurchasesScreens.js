import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, FlatList, RefreshControl, StyleSheet } from 'react-native';
import _ from 'lodash';
import { Tab, Tabs, ScrollableTab } from 'native-base';
import { Icon, ListItem } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

export default class MyPurchasesScreens extends React.PureComponent {

    state = { isRefreshing: false, itemShowing: [], isCancelReasonNull: false }

    componentDidUpdate(prevProps) {
        const { marketplace: { transactionInProgress } } = this.props;
        if (!_.isEqual(prevProps.marketplace.transactionInProgress, transactionInProgress) && (transactionInProgress === false)) {
            this.setState({ isRefreshing: false });
        }
    }

    _onPress = (type, item) => {
        const { actions, navigation, login: { session }, marketplace: { setSelectedTransaction } } = this.props
        if (item.status === "Processing" || (item.status === "To Receive" && type === "Return")) {
            actions.getReasonList(session);
        }
        let selectedTrans = _.merge({}, setSelectedTransaction);
        selectedTrans = { type: type, items: item };
        actions.setSelectedTransaction(selectedTrans);
        navigation.navigate("MyOrder");
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

    renderItems = ({ item, index }) => {
        const price = Number(parseFloat(item.total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        return (
            <View style={{ paddingVertical: 10, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }}>
                <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    {/* <Image source={{ uri: item.coverImg }} style={{ width: "20%", height: 60 }} resizeMode='stretch' /> */}
                    <View style={{ backgroundColor: "pink", width: "20%", height: 60 }} />
                    <View style={{ width: "75%", }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.prod_name}</Text>
                        <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`Qty: ${item.quantity}`}</Text>
                        <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`₱ ${price}`}</Text>
                    </View>

                </View>
                { !_.isNull(item.variation) &&
                    <FlatList
                        data={Object.keys(item.variation)}
                        keyExtractor={(index) => `idx ${index}`}
                        style={{ flexDirection: 'row' }}
                        renderItem={this._productOptions(item)} />}

            </View>
        )
    }

    renderRow = ({ item, index }) => {
        const { itemShowing } = this.state;
        const isShowing = (!_.isUndefined(itemShowing[index]) || !_.isEmpty(itemShowing[index])) ? true : false;
        const productsList = isShowing ? item.items : _.slice(item.items, 0, 1);
        const sumTotal = _.sum([item.total_price, item.ship_fee]);
        const total = Number(parseFloat(sumTotal).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        // let isReasonNull = {};
        // _.map(item.items, isCancelReasonNull => {
        //     if (_.isNull(isCancelReasonNull.cancel_reason)) {
        //         isReasonNull[item.id] = true;
        //     }
        // })
        // console.log("item", isReasonNull[item.id])
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
                    <FlatList
                        data={productsList}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `items_idx ${index}`}
                        renderItem={this.renderItems} />

                    {item.items.length > 1 && <Text onPress={() => this._hideItem(item, index)} style={{ marginTop: 10, textAlign: "center", fontSize: 12, color: Color.colorPrimaryMP }}>
                        {isShowing ? "Show Less Products" : "Show More Products"}
                    </Text>}

                    <View style={{}}>
                        <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`${item.items.length} Items`}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Total Amount (Shipping Fee included): </Text>
                                <Text style={{ fontSize: 12, color: Color.colorPrimaryMP }}>₱ {total}</Text>
                            </View>
                        </View>
                        {(_.isEqual(item.status, "To Receive") && !_.isNull(item.delivery_receipt)) ?
                            <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <TouchableOpacity onPress={() => this._onPress("Received", item)}
                                    style={{ marginTop: 10, width: "45%", alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 5, paddingVertical: 5 }} >
                                    <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>Order Received</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this._onPress("Return", item)}
                                    style={{ marginTop: 10, width: "45%", alignItems: "center", borderWidth: 1, borderColor: Color.colorPrimaryMP, borderRadius: 5, paddingVertical: 5 }} >
                                    <Text style={{ textAlign: "center", fontSize: 12, color: Color.colorPrimaryMP }}>Return</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity onPress={() => this._onPress("View", item)}
                                style={{ marginTop: 10, width: "35%", alignSelf: "flex-end", alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 5, paddingVertical: 5 }} >
                                <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>View Order</Text>
                            </TouchableOpacity>
                        }

                    </View>
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
        actions.getPurchaseList(session);
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
