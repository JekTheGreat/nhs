import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import reducers from "./reducers";
import TopProducts from "./containers/topProducts";
import ShopList from "./containers/shopList";
import MyCart from "./containers/cart";
import ItemsOnSale from "./containers/itemsOnSale";
import PreviewProducts from "./containers/previewProducts";
import SimilarProducts from "./containers/similarProducts";
import ProductList from "./containers/productList";
import CheckOut from "./containers/checkOut";
import ManageAddress from "./containers/manageAddress";
import FilterScreens from "./containers/filterScreen";
import FilterScreensOfficialStore from "./containers/filterScreenOfficialStore";
import FilterScreensCollections from "./containers/filterScreenCollections";
import SearchScreen from "./containers/searchScreen";
import MyFavorites from "./containers/myfavorites";
import SettingsScreen from "./containers/settings";
import ReportsScreen from "./containers/reports";
import GenRepScreen from "./containers/generalReports";
import MyPurchase from "./containers/mypurchase";
import MyOrder from "./containers/myorder";
import ReturnRefund from "./containers/returnrefund";
import ReturnItems from "./containers/returnitems";
import WriteReview from "./containers/writereview";
import BlockedUsers from "./containers/blockusers";
import MySales from "./containers/mysales";
import MySalesSummary from "./containers/mysalessummary";
import Disputes from "./containers/disputes";
import DisputesSummary from "./containers/disputessummary";
import ReturnsSeller from "./containers/returnsseller";
import ReturnsSellerSummary from "./containers/returnssellersummary";
import MyProducts from "./containers/myproducts";
import MyProductsAddEdit from "./containers/myproductsaddedit";
import MyCollections from "./containers/mycollections";
import ViewCollection from "./containers/viewcollection";
import AddToAlbum from "./containers/addtoalbum";
import BurgerMenuScreen from "./containers/burgermenu";

import { createStackNavigator } from "react-navigation-stack";
import Resource from "__src/resources";
const { Color, Res } = Resource;

export const marketplace = reducers;
export const BurgerMenu = BurgerMenuScreen;

export default {

    TopProducts: {
        screen: TopProducts,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: Color.white,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTitle: "TOP PRODUCTS",
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 17
            },
            headerLeft: () => <TouchableOpacity onPress={() => navigation.goBack()}
                style={{ marginLeft: 20, marginTop: 5, backgroundColor: "#FFC914", padding: 5, elevation: 10, borderRadius: 20 }} >
                <Icon type='ionicons' name='arrow-back' size={20} color='white' />
            </TouchableOpacity>,
        })
    },
    ShopList: {
        screen: ShopList,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: Color.white,
                elevation: 4,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTitle: "UNIFIED STORE",
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 17
            },
            headerLeft: () => <TouchableOpacity onPress={() => navigation.goBack()}
                style={{ marginLeft: 20, marginTop: 5, backgroundColor: "#FFC914", padding: 5, elevation: 10, borderRadius: 20 }} >
                <Icon type='ionicons' name='arrow-back' size={20} color='white' />
            </TouchableOpacity>,
        }),
    },
    MyCart: {
        screen: MyCart,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
            headerTitle: "Shopping Cart",
        },
    },
    ItemsOnSale: {
        screen: ItemsOnSale,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: Color.white,
                elevation: 4,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTitle: "ITEMS FOR SALE",
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 17
            },
            headerLeft: () => <TouchableOpacity onPress={() => navigation.goBack()}
                style={{ marginLeft: 20, marginTop: 5, backgroundColor: "#FFC914", padding: 5, elevation: 10, borderRadius: 20 }} >
                <Icon type='ionicons' name='arrow-back' size={20} color='white' />
            </TouchableOpacity>,
        }),
    },
    PreviewProducts: {
        screen: PreviewProducts,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },
    SimilarProducts: {
        screen: SimilarProducts,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
            headerTitle: "Similar Products",
        },
    },
    ProductList: {
        screen: ProductList,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
            headerTitle: "Products You May Like",
        },
    },
    CheckOut: {
        screen: CheckOut,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
            headerTitle: "Check Out",
        },
    },
    ManageAddress: {
        screen: ManageAddress,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
            headerTitle: "Manage Address",
        },
    },
    FilterScreens: {
        screen: FilterScreens,
        navigationOptions: {
            headerShown: false,
        },
    },
    FilterScreensOfficialStore: {
        screen: FilterScreensOfficialStore,
        navigationOptions: {
            headerShown: false,
        },
    },
    FilterScreensCollections: {
        screen: FilterScreensCollections,
        navigationOptions: {
            headerShown: false,
        },
    },
    SearchScreen: {
        screen: SearchScreen,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },
    MyFavorites: {
        screen: MyFavorites,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
            headerTitle: "My Favorites",
        },
    },
    SettingsScreen: {
        screen: SettingsScreen,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
            headerTitle: "Settings",
        },
    },
    ReportsScreen: {
        screen: ReportsScreen,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },
    GenRepScreen: {
        screen: GenRepScreen,
        navigationOptions: {
            headerTitle: "General Report",
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },
    MyPurchase: {
        screen: MyPurchase,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },
    MyOrder: {
        screen: MyOrder,
        navigationOptions: {
            headerTitle: "My Order",
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },
    ReturnRefund: {
        screen: ReturnRefund,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },
    ReturnItems: {
        screen: ReturnItems,
        navigationOptions: {
            headerTitle: "Return Item(s)",
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },
    WriteReview: {
        screen: WriteReview,
        navigationOptions: {
            headerTitle: "Write a Review",
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },
    BlockedUsers: {
        screen: BlockedUsers,
        navigationOptions: {
            headerTitle: "Blocked Users",
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },
    MySales: {
        screen: MySales,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },
    MySalesSummary: {
        screen: MySalesSummary,
        navigationOptions: {
            headerTitle: "My Sales",
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },
    Disputes: {
        screen: Disputes,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },
    DisputesSummary: {
        screen: DisputesSummary,
        navigationOptions: {
            headerTitle: "Disputes",
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },
    ReturnsSeller: {
        screen: ReturnsSeller,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },
    ReturnsSellerSummary: {
        screen: ReturnsSellerSummary,
        navigationOptions: {
            headerTitle: "Returns & Refunds",
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },
    MyProducts: {
        screen: MyProducts,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },

    MyProductsAddEdit: {
        screen: MyProductsAddEdit,
        navigationOptions: ({ navigation }) => ({
            title: _.has(navigation, "state.params.title") ?
                navigation.state.params.title : "",
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        }),
    },
    MyCollections: {
        screen: MyCollections,
        navigationOptions: {
            headerTitle: "My Collections",
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },

    ViewCollection: {
        screen: ViewCollection,
        navigationOptions: ({ navigation }) => ({
            title: _.has(navigation, "state.params.title") ?
                navigation.state.params.title : "",
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        }),
    },

    AddToAlbum: {
        screen: AddToAlbum,
        navigationOptions: {
            headerStyle: { backgroundColor: Color.colorPrimaryMP },
        },
    },

    // BurgerMenu: {
    //     screen: BurgerMenu,
    //     navigationOptions: {
    //         headerShown: false,
    //     }
    // },

};
