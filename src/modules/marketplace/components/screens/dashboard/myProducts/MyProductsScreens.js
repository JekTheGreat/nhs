import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, FlatList, RefreshControl, StyleSheet, Alert } from 'react-native';
import _ from 'lodash';
import { Tab, Tabs, ScrollableTab } from 'native-base';
import Swipeout from "__src/components/Swipeout";
import { Icon, ListItem } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

export default class MyProductsScreens extends React.PureComponent {

    state = { isRefreshing: false, itemShowing: [], isCancelReasonNull: false }

    componentDidUpdate(prevProps) {
        const { actions, login: { session }, marketplace: { transactionInProgress, patchProductSwitch, getMyShop, removeProducts } } = this.props;
        if (!_.isEqual(prevProps.marketplace.transactionInProgress, transactionInProgress) && (transactionInProgress === false)) {
            this.setState({ isRefreshing: false });
        }
        if (!_.isEqual(prevProps.marketplace.patchProductSwitch, patchProductSwitch) && !_.isEmpty(patchProductSwitch)) {
            if (patchProductSwitch.status === 0) {
                Alert.alert("Error", patchProductSwitch.result)
            } else {
                actions.getSellerProducts(session, getMyShop.id);
            }
            delete patchProductSwitch.status;
        }
        if (!_.isEqual(prevProps.marketplace.removeProducts, removeProducts) && !_.isEmpty(removeProducts)) {
            if (removeProducts.status === 0) {
                Alert.alert("Error", removeProducts.result)
            } else {
                actions.getSellerProducts(session, getMyShop.id);
            }
            delete removeProducts.status;
        }
    }

    view = (item) => {
        const { actions, login: { session }, navigation, marketplace: { setInputDetails, setUserSide } } = this.props
        const selectedTrans = _.merge({}, setInputDetails);
        let sellerRev = _.merge({}, selectedTrans.sellerReview);
        sellerRev = item;
        selectedTrans.sellerReview = sellerRev;
        actions.setInputDetails(selectedTrans);
        navigation.navigate("PreviewProducts", { isSellerSide: setUserSide })
    }
    edit = (item) => {
        const { actions, login: { session }, navigation, marketplace: { setInputDetails, setUserSide } } = this.props
        const selectedTrans = _.merge({}, setInputDetails);
        let sellerRev = _.merge({}, selectedTrans.sellerReview);
        sellerRev = item;
        selectedTrans.sellerReview = sellerRev;
        actions.setInputDetails(selectedTrans);

        let params = _.merge({}, selectedTrans.sellerProductDetails);
        params.name = item.name;
        selectedTrans.sellerProductDetails = params;
        actions.setInputDetails(selectedTrans);
        navigation.navigate("MyProductsAddEdit", { title: "Edit Product Details", isFrom: "edit" });
    }
    delete = (id) => {
        const { actions, login: { session } } = this.props;
        actions.removeProducts(session, id)
    }

    toggleSwitch = (id) => {
        const { actions, login: { session } } = this.props;
        actions.patchProductSwitch(session, id)
    }

    renderRow = ({ item, index }) => {
        return (
            <Swipeout
                data={item}
                viewButton={() => this.view(item)}
                editButton={() => this.edit(item)}
                deleteButton={() => this.delete(item.id)}
                hasSwitch
                onSwitch={() => this.toggleSwitch(item.id)}
                isSwitchOn={item.publish_status} />
        );
    }

    refresh = () => {
        const { actions, login: { session }, marketplace: { getMyShop } } = this.props;
        actions.getSellerProducts(session, getMyShop.id);
        this.setState({ isRefreshing: true });
    }

    render() {
        const { transactionList, marketplace: { getSellerProducts } } = this.props;
        console.log("Translist", transactionList)
        return (
            !_.isEmpty(transactionList) ?
                <FlatList
                    contentContainerStyle={{ backgroundColor: "white", paddingLeft: 15 }}
                    data={transactionList}
                    refreshControl={<RefreshControl refreshing={this.state.isRefreshing && !_.isEmpty(getSellerProducts)}
                        onRefresh={this.refresh} />}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => `trans_idx ${index}`}
                    ItemSeparatorComponent={() => <View style={{ backgroundColor: Colors.grey300, height: 1 }} />}
                    renderItem={this.renderRow} />
                :
                <ScrollView refreshControl={<RefreshControl refreshing={this.state.isRefreshing && !_.isEmpty(getSellerProducts)}
                    onRefresh={this.refresh} />}
                    contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Color.bg }}>
                    <Icon type='font-awesome' name='envelope-open-o' size={45} color={Color.Standard} />
                    <Text style={{ marginTop: 10, fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2, }}>No Data</Text>
                </ScrollView>

        )
    }
}
