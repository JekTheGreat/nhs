/* eslint-disable import/named */
import React from "react";
import {  View, StatusBar, FlatList, Alert } from "react-native";
import Color from "__src/resources/styles/color";
import Account from "__src/modules/wallet/components/Account";
import styles from "../styles.css";
import {ListItem} from "react-native-elements";
import {StackActions, NavigationActions} from "react-navigation";
import PropTypes from "prop-types";
const list = [ "Verify Account", "My Profile", "Account Settings",  "Privacy Policy", "Terms and Conditions", "Logout"];
const list2 = ["My Profile", "Account Settings", "Privacy Policy", "Terms and Conditions", "Logout"];

class Main extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			currentPosition: 0,
		};
	}

	logout = async () => {
		const {actions, navigation} = this.props;
		const resetAction = StackActions.reset({
		  index: 0,
		  key: null,
		  actions: [NavigationActions.navigate({routeName: "Login"})],
		});

		actions.logout();
		navigation.dispatch(resetAction);
	}
	
	click =(type) => {
		const {navigation} = this.props;

		switch (type){
		case "My Profile":
			navigation.navigate("MyProfile", {title: type});
			break;
		case "Verify Account":
			navigation.navigate("Verification", {title: "Verification"});
			break;
		case "Switch Account":
			navigation.navigate("Switch", {title: type});
			break;
		case "Add Legacy Account":
			navigation.navigate("AddLegacy", {title: type});
			break;
		case "Account Settings":
			navigation.navigate("Setting", {title: "Account Settings"});
			break;
		case "Privacy Policy":
			navigation.navigate("Terms", {title: type});
			break;
		case "Terms and Conditions":
			navigation.navigate("Terms", {title: type});
			break;
		case "Find Dealer":
			navigation.navigate("ViewStore", {title: type});
			break;
		case "Logout":
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
			break;
		default:
			Alert.alert("Notice", "This service is under construction.");
			break;
		}
	}
	
	renderRow = ({item, index}) => {
		const color = index % 2 ? {backgroundColor: Color.LightBlue2} : null;

		return (
			<ListItem onPress={() => this.click(item)}
				titleStyle={styles.titleStyle}
				containerStyle={[styles.liStyle, color]}
				key={`idx ${item}`} title={item} />
		);
	}
	
	render() {
		const {login: {isAccountNotVerified}} = this.props;
		const arrays = isAccountNotVerified ? list : list2;
		const zindex = {zIndex: 1};

  	return (
  		<View style={styles.container}>
  			<StatusBar backgroundColor={Color.StatusBar} barStyle="light-content" />
  			<View style={styles.bg}/>
  			<View style={[styles.account, zindex ]}>
  				<Account {...this.props} />
  			</View>
  			<View style={styles.body}>
					<FlatList
						ListFooterComponent={<View style={styles.footer}/>}
						data={arrays}
						renderItem={this.renderRow}
						keyExtractor={(item) => item} />
  			</View>
  		</View>
  	);
	}
}

Main.propTypes = {
	actions: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
};

export default Main;
