/* eslint-disable array-callback-return */
/* eslint-disable */
import React from "react";
import {
	ScrollView, View, Image, StyleSheet, SafeAreaView,
	TouchableWithoutFeedback, Text
} from "react-native";
import PropTypes from "prop-types";
import Loading from "__src/components/Loading";
import _ from "lodash";
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";
// import HomeScreen from "./screens/home/containers/homeMain";
import HomeScreen from "./screens/home/RenderHomeScreen";
// import CartScreen from "./screens/cart/CartScreen";
import RenderCartScreen from "./screens/cart/RenderCartScreen";
import CustomTab from "./screens/Customtab";
import { HeaderBackButton } from "react-navigation-stack";
import Profile from "./screens/account/RenderProfileScreen";
import Resource from "__src/resources";
const { Color, Res } = Resource;

class MainScreen extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isVisible: true,
			showContent: false,
			isNotComplete: true,
			currentIndex: 0,
			isPlaceOrderShowing: false,
		};
	}

	componentWillMount() {
		const { actions, login: { session }, onlinestore: { setOnlineStoreScreen, setInputDetails, getCartList } } = this.props;
		const newInput = _.merge({}, setInputDetails);
		newInput.route = "Online Store";
		actions.setInputDetails(newInput);
		actions.fetchMyShop(session.token);
		actions.fetchCartList(session.token);
		actions.fetchProductList();
		actions.fetchDisputeList();
		actions.fetchCategoryList(session.token);
		actions.fetchFilterCategoryList();
		actions.fetchPurchaseList(session);
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
		const { actions, login: { session }, onlinestore: { getCartList, setSelectedItems, changeCartItem, setInputDetails } } = this.props;
		const product = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
		const newInput = _.merge({}, setInputDetails);
		if (!_.isEqual(prevProps.onlinestore.changeCartItem, changeCartItem)) {
			actions.fetchCartList(session.token);
		}
		if (!_.isEqual(prevProps.onlinestore.getCartList, getCartList)) {
			const sumCart = _.map(getCartList, (item) => {
				return item.quantity;
			});
			const sum = (!_.isEmpty(sumCart)) || (!_.isUndefined(sumCart)) ? _.sum(sumCart) : {};
			let toPlace = {};
			_.filter(getCartList, cart => {
				if ((cart.id === changeCartItem.id) && setInputDetails.isFromPreviewProducts) {
					toPlace[cart.id] = cart;
					console.log("toPlace:", toPlace, cart.id === changeCartItem.id)
				}
				else {
					toPlace[cart.id] = cart;
				}
			})
			console.log("newInput:", toPlace)
			newInput.placeOrder = toPlace;
			newInput.countCart = sum;
			actions.setInputDetails(newInput);
		}
	}

	componentDidMount() {
		const { navigation } = this.props;
		navigation.setParams({
			back: this.onBack
		})
	}

	openPlaceOrder = () => {
		this.setState({ isPlaceOrderShowing: true })
	}

	onBack = () => {
		const { actions, onlinestore: { setOnlineStoreScreen, setProfileScreen, setInputDetails }, navigation } = this.props;
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
		else if (_.isEqual(setInputDetails.route, "Account")) {
			switch (setProfileScreen) {
				case "renderTabs":
					actions.setProfileScreen("profile");
					break;
				case "profile":
				default:
					navigation.goBack();
					break;
			}
		}
	}
	goToPage = (page) => {
		this.tabView.goToPage(page);
	}


	render() {
		const { onlinestore: { setUserSide } } = this.props;
		const obj = {
			homeLabel: "Online Store",
			homeIcon: "online_store_home",
			homeIconActive: "online_store_home_tint",
			cartLabel: "My Cart",
			cartIcon: "online_store_cart",
			cartIconActive: "online_store_cart_tint",
			accountLabel: "Account",
			accountIcon: "menu_profile",
			accountIconActive: "menu_profile_tint",
		}

		return (
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollableTabView
					ref={(tabView) => { this.tabView = tabView }}
					renderTabBar={(props) => <CustomTab {...this.props} props2={props} ref={(e) => this.CustomTab = e} />}
					tabBarPosition="bottom"
					tabBarInactiveTextColor={Color.Standard}
					tabBarActiveTextColor={Color.white}>
					{!setUserSide ? <HomeScreen
						tabView={this.tabView}
						tabLabel={obj.homeLabel}
						{...this.props}
						goToPage={this.goToPage} /> : <RenderCartScreen
							tabView={this.tabView}
							tabLabel={obj.cartLabel}
							{...this.props}
							openPlaceOrder={this.openPlaceOrder}
							isPlaceOrderShowing={this.state.isPlaceOrderShowing}
							goToPage={this.goToPage} />}


					{!setUserSide ?
						<RenderCartScreen
							tabView={this.tabView}
							tabLabel={obj.cartLabel}
							{...this.props}
							openPlaceOrder={this.openPlaceOrder}
							isPlaceOrderShowing={this.state.isPlaceOrderShowing}
							goToPage={this.goToPage} />
						: <HomeScreen
							tabView={this.tabView}
							tabLabel={obj.homeLabel}
							{...this.props}
							goToPage={this.goToPage} />}

					<Profile
						tabView={this.tabView}
						tabLabel={obj.accountLabel}
						{...this.props} />
				</ScrollableTabView>
			</SafeAreaView>
		);
	}
}

MainScreen.propTypes = {
	onlinestore: PropTypes.object,
	login: PropTypes.object,
	actions: PropTypes.object,
	isVisible: PropTypes.bool,
	onClose: PropTypes.func,
};

const styles = StyleSheet.create({
	container: { flex: 1, marginLeft: 60 },
	scrollStyle: { flex: 1, backgroundColor: Color.bg2, paddingHorizontal: 10 },
	modal: { flex: 1, margin: 0, backgroundColor: "rgba(0,0,0,0.4)" },
	height30: { height: 30 },
	txtNodata: { fontFamily: "Roboto", fontSize: 14, color: Color.Header, textAlign: "center", marginTop: 20 },
});

export default MainScreen;