/* eslint-disable */
import Resource from "__proj/src/resources";
import Color from "__src/resources/styles/color";
import React, { PureComponent } from "react";
import { View, Text,TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import {StackActions, NavigationActions} from "react-navigation";
import styles from "../styles.css";
const {Res} = Resource;

class ResetSuccess extends PureComponent {

	_backToLogin = () => {
		const {navigation} = this.props;

		const resetAction = StackActions.reset({
			index: 0,
			key: null,
			actions: [NavigationActions.navigate({routeName: "Login"})],
		});

		navigation.dispatch(resetAction);
	}

	_resetScreen = () => {
		const { actions } = this.props;

		actions.setForgotPasswordScreen("username");
	}
	render() {
		return (
			<View style={{flex: 1, paddingHorizontal: 30}}>
				<View style={{flex: 1, paddingTop: 30 }}>
					<Text style={{textAlign: "center", color: Color.Standard2, fontSize: 22}}>Create New Password</Text>
					<Text style={{textAlign: "center", color: Color.Standard2, fontSize: 25, fontWeight: "500"}}>Successful!</Text>
					<Image style={{width: 130, height: 130, alignSelf: "center", marginVertical: 30}} source={Res.get("check_icon")} resizeMode={"contain"} />
				</View>
					<TouchableOpacity onPress={this._resetScreen} style={{marginBottom: 30, height: 45, marginLeft: 3, borderRadius: 3, alignItems: "center",
							backgroundColor: "transparent", justifyContent: "center" }}>
							<Text style={{color: Color.colorPrimary, fontSize: 16, padding: 10, fontFamily: "Roboto", fontWeight: "bold"}}>Login</Text>
					</TouchableOpacity>
			</View>
		);
	}
}

ResetSuccess.propTypes = {
	actions: PropTypes.object,
	login: PropTypes.object,
};


export default ResetSuccess;
