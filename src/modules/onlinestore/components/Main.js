import React from 'react';
import { createAppContainer } from 'react-navigation';
import { HeaderBackButton } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { View, Image, Text, Dimensions } from 'react-native';
import Store from '../containers/onlineStoreMain';
import Cart from '../containers/cartContainer';
import Profile from '../containers/profile';
import { Spinner } from "native-base";
import Tabbar from '../containers/tabbar';
import _ from "lodash";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen')

const TabNavigator = createMaterialTopTabNavigator({
    "Online Store": Store,
    "My Cart": Cart,
    Account: Profile,
}, {
    initialRouteName: "Online Store",
    tabBarPosition: "bottom",
    transparentCard: true,
    swipeEnabled: false,
    animationEnabled: true,
    tabBarComponent: props => <Tabbar {...props} />,
});

const AppContainer = createAppContainer(TabNavigator);


export default class Main extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        const { actions, login: { session }, onlinestore: { getMyShop, setOnlineStoreScreen, setInputDetails, getCartList } } = this.props;
        const newInput = _.merge({}, setInputDetails);
        newInput.route = "Online Store";
        actions.setInputDetails(newInput);
        actions.fetchMyShop(session.token);
        actions.fetchCartList(session.token);
        actions.fetchProductList();
        actions.fetchDisputeList();
        actions.fetchCategoryList(session.token);
        actions.fetchFilterCategoryList();
        actions.fetchPurchaseList();
        actions.fetchMostSearch();
        actions.fetchAdsImages();
        actions.fetchSomethingNew();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Image style={{ height: 20, width: 20, marginRight: 10 }}
                    source={Res.get("onlinestoreNavTitle")} />
                <Text style={{ fontFamily: "Roboto-Light", color: "white", fontSize: 17 }}>Online Store</Text>
            </View>,
            headerLeft: <HeaderBackButton tintColor="white" onPress={navigation.getParam("back")} />
        }
    }

    componentDidUpdate(prevProps) {
        const { actions, login: { session }, onlinestore: { getCartList, changeCartItem, setInputDetails } } = this.props;
        if (!_.isEqual(prevProps.onlinestore.changeCartItem, changeCartItem)) {
            actions.fetchCartList(session.token);
        }
        if (!_.isEqual(prevProps.onlinestore.getCartList, getCartList) && !_.isEmpty(getCartList)) {
            const newInput = _.merge({}, setInputDetails);
            const sumCart = _.map(getCartList, (item) => {
                return item.quantity;
            });
            const sum = (!_.isEmpty(sumCart)) || (!_.isUndefined(sumCart)) ? _.sum(sumCart) : {};
            newInput.countCart = sum;
            actions.setInputDetails(newInput);
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.setParams({
            back: this.onBack, onselect: this._onSelect,
            renderrow: this._renderRow, renderbuttontext: this._renderButtonText
        })
    }

    onBack = () => {
        const { actions, onlinestore: { setOnlineStoreScreen, setInputDetails }, navigation } = this.props;
        const inputDetails = _.merge({}, setInputDetails);
        if (_.isEqual(setInputDetails.route, "Online Store")) {
            switch (setOnlineStoreScreen) {
                case "selectedCategory":
                    if (setInputDetails.isFilterBySearch) {
                        inputDetails.isFilterBySearch = false;
                        actions.setInputDetails(inputDetails);
                        actions.setOnlineStoreScreen("searchScreen");
                    } else {
                        actions.setOnlineStoreScreen("main");
                    }
                    break;
                case "searchScreen":
                case "previewproducts":
                    actions.setOnlineStoreScreen("main");
                    break;
                case "main":
                default:
                    navigation.goBack();
                    break;
            }
        }
        else if (_.isEqual(setInputDetails.route, "My Cart")) {
            switch (setOnlineStoreScreen) {
                case "testScreen":
                    actions.setOnlineStoreScreen("cartScreen");
                    break;
                case "cartScreen":
                default:
                    if (setInputDetails.isPlaceOrderShowing) {
                        inputDetails.isPlaceOrderShowing = false;
                        actions.setInputDetails(inputDetails);
                    }
                    else if (setInputDetails.isFromPreviewProducts) {
                        inputDetails.isFromPreviewProducts = false;
                        actions.setInputDetails(inputDetails);
                    }
                    else {
                        navigation.goBack();
                    }
                    break;
            }
        }
        else {
            navigation.goBack();
        }
    }

    render() {
        const { navigation, onlinestore: { setInputDetails, transactionInProgress } } = this.props;
        return <AppContainer screenProps={setInputDetails.countCart} />
    }
}