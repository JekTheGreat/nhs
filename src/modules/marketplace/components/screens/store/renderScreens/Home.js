import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView, Image, Dimensions, FlatList, RefreshControl } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import AdsImages from './homecomponents/AdsImages';
import ShortcutButtons from './homecomponents/ShortcutButtons';
import Categories from './homecomponents/Categories';
import ItemsOnSale from './homecomponents/ItemsOnSale';
import ShopList from './homecomponents/ShopList';
import TrendingProducts from './homecomponents/TrendingProducts';
import TopProducts from './homecomponents/TopProducts';
import ProductList from './homecomponents/ProductList';
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class Home extends React.PureComponent {

    state = {
        isRefreshing: false,
    }

    componentDidUpdate(prevProps) {
        const { marketplace: { transactionInProgress } } = this.props;
        if (!_.isEqual(prevProps.marketplace.transactionInProgress, transactionInProgress) && (transactionInProgress === false)) {
            this.setState({ isRefreshing: false });
        }
    }

    refresh = () => {
        const { actions, login: { session } } = this.props;
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
        this.setState({ isRefreshing: true });
    }

    render() {
        const { marketplace: { getAdsImages, getTopProducts, transactionInProgress } } = this.props
        return (
            <ScrollView style={{ backgroundColor: "white" }}
                refreshControl={<RefreshControl refreshing={this.state.isRefreshing && !_.isEmpty(getTopProducts)} onRefresh={this.refresh} />} >
                <AdsImages getAdsImages={getAdsImages} />
                <ShortcutButtons navigation={this.props.navigation} login={this.props.login} />
                <Categories {...this.props} />
                <ItemsOnSale {...this.props} />
                <ShopList {...this.props} />
                <TrendingProducts {...this.props} />
                <TopProducts {...this.props} />
                <ProductList {...this.props} />
            </ScrollView>
        )
    }
}