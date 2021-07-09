/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable */
import React from "react";
import { Image, View, Text, ScrollView, StatusBar,
	BackHandler, Alert } from "react-native";
import {StackActions, NavigationActions} from "react-navigation";
import Slideshow from "__src/resources/customize/Slideshow";
import Loading from "__src/components/Loading";
import Resource from "__src/resources";
import styles from "../styles.css";
import PropTypes from "prop-types";
import _ from "lodash";
const {Res, Color} = Resource;

class HomeScreen extends React.PureComponent {
	_didFocusSubscription;
	_willBlurSubscription;
	
	constructor(props){
		super(props);
		this.state = {
			favouriteListings: [],
			isLoad: true,
		};

		this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
	}

	static navigationOptions = {
		headerShow: false,
	}

	async componentDidMount() {
		const { login: { additionalDetails, currentAccount}, actions } = this.props;


		this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
		BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
	);

		if (additionalDetails.hasOwnProperty("client")) {
			if (additionalDetails.id) {
				let toSwitch = true;

				if (currentAccount.id) {
					toSwitch = false;
				}
				await actions.getUserAccount(additionalDetails.client.id, toSwitch, currentAccount);
				this.setState({isLoad: false});
			}
		}
	}

	componentWillUnmount() {
		this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
	}

	onBackButtonPressAndroid = () => {
		Alert.alert(
			"Notice",
			"Want to sign out?",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{text: "OK", onPress: () => this.logout()},
			],
			{cancelable: false},
		);
		
		return true;
	};

	logout = () => {
		const {actions, navigation, login} = this.props;

		const resetAction = StackActions.reset({
		  index: 0,
		  key: null,
		  actions: [NavigationActions.navigate({routeName: "Login"})],
		});

		actions.logout(login.session.userId, login.currentLogin.id);
		navigation.dispatch(resetAction);
	}

	 componentDidUpdate(prevProps) {
		const { login: { additionalDetails, currentAccount, isLoggedIn, session,
			notYetGetCurrentEmployee, accounts }, wallet: { addedWallet }, actions } = this.props;

		if (additionalDetails.hasOwnProperty("client")) {
			if (additionalDetails.id !== prevProps.login.additionalDetails.id && additionalDetails.id) {
				let toSwitch = true;

				if (currentAccount.id) {
					toSwitch = false;
				}
				actions.getUserAccount(additionalDetails.client.id, toSwitch, currentAccount);
			}
		}

		if (isLoggedIn && currentAccount.id &&
			((currentAccount.id !== prevProps.login.currentAccount.id) ||
			(!addedWallet && accounts.length))) {
			actions.walletAdded(currentAccount.id);
		}

		if (isLoggedIn && !_.isEmpty(session) && notYetGetCurrentEmployee) {
			 actions.getCurrentEmployee( session.userId );
		}
	}

	render() {
		if (this.state.isLoad){
			return <Loading customStyle={{backgroundColor: Color.bg}} color="black" size="small"/>;
		}

		return (
			<View style={styles.container}>
				<StatusBar backgroundColor={Color.StatusBar} barStyle="light-content" />
				<View style={styles.bg}/>
				<View style={styles.body}>
					<ScrollView style={styles.padH10}>
						<Slideshow
							containerStyle={styles.marT10}
							height={160}
							overlay={false}
							scrollEnabled
							dataSource={[
								{
									title: "Title 1",
									caption: "Content.txt",
									url: Res.get("slider_1"),
								}, {
									title: "Title 2",
									caption: "Content.txt",
									url: Res.get("slider_2"),
								},
							]}/>
						<View style={styles.marT20}>
							<Image style={styles.img1} source={Res.get("ads")} resizeMode="stretch" />
						</View>
						<View style={styles.view1}>
							<Text style={styles.txt1}>Powered by:</Text>
							<Image style={styles.img2} source={Res.get("poweredby")} resizeMode="contain" />
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}
}

HomeScreen.propTypes = {
	navigation: PropTypes.object,
	login: PropTypes.object,
	actions: PropTypes.object,
};

export default HomeScreen;
