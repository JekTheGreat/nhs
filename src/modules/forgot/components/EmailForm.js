/* eslint-disable max-len */
import React, {PureComponent} from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import _ from "lodash";
import PropTypes from "prop-types";
import Resource from "__src/resources";
import Loading from "__src/components/Loading";
import styles from "../styles.css";

const {Color, Res} = Resource;

import {CheckBox} from "react-native-elements";
class EmailForm extends PureComponent {
	constructor(){
		super();
		this.state = {
			error: {},
			isEmail: true,
			isMobile: false,
		};
	}

	render() {
		const { forgot } = this.props;
		const { userInfo, sendingVerification } = forgot;

		return (
			<View style={styles.flex1pad30}>
				<View style={styles.marginVer30}>
					<Text style={styles.txtnote}>
					Tell us where we can send you the activation code to reset your password
					</Text>
				</View>

				<CheckBox
					containerStyle={styles.containerStyle}
					textStyle={styles.textStyle}
					title={`Email: ${userInfo.email.substring(0, 2)}****${userInfo.email.substring(userInfo.email.length - 5)}`}
					checkedIcon='dot-circle-o'
					uncheckedIcon='circle-o'
					checkedColor={Color.Standard2}
					onPress={this._handleChangeRadio(1)}
					checked={this.state.isEmail}
				/>

				<CheckBox
					containerStyle={styles.containerStyle}
					textStyle={styles.textStyle}
					title={`Mobile Number: ${userInfo.mobile.substring(0, 6)}****${userInfo.mobile.substring(userInfo.mobile.length - 2)}`}
					checkedIcon='dot-circle-o'
					uncheckedIcon='circle-o'
					checkedColor={Color.Standard2}
					onPress={this._handleChangeRadio(2)}
					checked={this.state.isMobile}
				/>

				{sendingVerification ?
					<View style={styles.btnEmailform}>
						<Loading size="small" color="white"/>
					</View> :
			
					<TouchableOpacity style={styles.btnEmailform} onPress={this._proceedCodeFrom} >
						<Image style={styles.imgNext} source={Res.get("next")} />
					</TouchableOpacity>
				}

			</View>
		);
	}

	_handleChangeRadio = (type) => () => {
		const { actions, forgot } = this.props;

		switch (type){
		case 1:
			actions.saveRadio({
				type: "email",
				value: forgot.userInfo.email,
			});
			this.setState({isEmail: true, isMobile: false});
			break;
		case 2:
			actions.saveRadio({
				type: "mobile",
				value: forgot.userInfo.mobile,
			});
			this.setState({isEmail: false, isMobile: true});
			break;
		}
	}

	_proceedCodeFrom = () => {
		const { actions, forgot } = this.props;
		const { getSaveRadio, forgotpasswordType } = forgot;

		let error = "";

		if (_.isEmpty(getSaveRadio)) {
			error = "Please select method";
		}

		if (_.isEmpty(error)) {
			actions.forgotPasswordEmail(getSaveRadio, forgot.userInfo.id, forgotpasswordType);
		} else {
			message.error(error, 5);
		}
	}
}

EmailForm.propTypes = {
	forgot: PropTypes.object,
	actions: PropTypes.object,
};

export default EmailForm;
