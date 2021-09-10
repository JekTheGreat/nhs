/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, TouchableOpacity,StatusBar, ScrollView} from "react-native";
import TxtInput from "__src/components/TxtInput";
import {Icon} from "react-native-elements";
import Color from "__src/resources/styles/color";
import PropTypes from "prop-types";
import styles from "../styles.css";
import _ from "lodash";

const errorMessage = "This field is required."

export default class Username extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			error:{},
		};
	}

	_onChangeText =(type) => (val) => {
		const{register, actions} = this.props;
		const newInput = _.merge({}, register.registerNewInput);
		const error1 = {};

		switch(type){
			case 1:
				if (_.isEmpty(val)) {
					error1.unErr = errorMessage;
				} 

				newInput.username = val.trim();
				break;
		}
		this.setState({ error: error1 });
		actions.setRegisterInput(newInput);
	}

	_submit = () =>{
		const {navigation, register: {registerNewInput}} = this.props;
		const usernameRegex = new RegExp("^(?=.*[!@#\$%\^&\*])(?=.{8,})");
		const error1 = {};

		if(registerNewInput.username === ""){
			error1.unErr = errorMessage;
		}else if (registerNewInput.username.length < 8) {
			error1.unErr = "Username must be at least 8 characters long";
		} else if (registerNewInput.username.match(usernameRegex)) {
			error1.unErr = "Username must not have special characters";
		}

		this.setState({ error: error1 });

		if (_.isEmpty(error1)) {
			navigation.navigate("Password");
		}
	}

	render() {
		const {error} = this.state;
		const { register: {registerNewInput} } = this.props;

		return (
			<View style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor={Color.Header} />
				<ScrollView keyboardShouldPersistTaps='handled' style={styles.bodyContainer}>
					<View style={styles.margin30}>
						<Text style={styles.labelText}>What's your username?</Text>
					</View>

					<TxtInput
						onChangeText={this._onChangeText(1)}
						value={registerNewInput.username}
						onFocus={() => this.setState({unFocus: true})}
						isFocus={this.state.unFocus}
						autoCapitalize="none"
						returnKeyType='next'
						err={error.unErr}
						label='USERNAME'
						style={{marginTop: 30, marginBottom: 30}}
						onSubmitEditing={this._submit}/>

				</ScrollView>
				<TouchableOpacity style={styles.btnRoundArrow} onPress={this._submit} >
					<Icon reverse name='angle-right' type='font-awesome' color={Color.colorPrimary} size={30} />
				</TouchableOpacity>
			</View>
		);
	}
}
Username.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
};
