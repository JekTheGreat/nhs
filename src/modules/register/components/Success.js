import React, {PureComponent} from "react";
import {View, Text, Image, StatusBar,
	 StyleSheet, TouchableOpacity} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import {StackActions, NavigationActions} from "react-navigation";

const {Color, Res} = Resource;

export default class Success extends PureComponent {

	_backToLogin = () => {
		const {navigation, actions} = this.props;

		const resetAction = StackActions.reset({
		  index: 0,
		  key: null,
		  actions: [NavigationActions.navigate({routeName: "Login"})],
		});

		actions.resetCheckImportantDetails();
		actions.resetRegister();
		navigation.dispatch(resetAction);
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" backgroundColor={Color.Header} />
				<View style={styles.viewContainer1}>
					<Text style={styles.textContent1}>Account Creation</Text>
					<Text style={styles.textContent2}>Successful!</Text>
					<Image style={styles.imageFlag} source={Res.get("check_icon")} resizeMode={"contain"} />
				</View>
				<View style={styles.viewContainer2}>
					<TouchableOpacity onPress={this._backToLogin}>
						<Text style={styles.textNext}>Start</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

Success.propTypes = {
	actions: PropTypes.object,
	navigation: PropTypes.object,
};
const styles = StyleSheet.create({
	container: {backgroundColor: "#FFF", width: "100%", height: "100%", flexShrink: 1, paddingHorizontal: 30},
	viewContainer1: {flex: 2, justifyContent: "flex-start", paddingTop: 30 },
	viewContainer2: {flex: 1,  justifyContent: "flex-end", paddingBottom: 30},
	imageFlag: {width: 125, height: 125, alignSelf: "center", marginVertical: 30},
	textNext: {color: Color.colorPrimary, fontSize: 17, alignSelf: "center", paddingHorizontal: 30, paddingVertical: 10},
	textContent1: {textAlign: "center", color: "#4d4d4d", fontSize: 24},
	textContent2: {textAlign: "center", color: Color.DarkBG, fontSize: 25},
});
