/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, TouchableOpacity,Switch,StatusBar, ScrollView} from "react-native";
import TxtInput from "__src/components/TxtInput";
import Color from "__src/resources/styles/color";
import {Icon} from "react-native-elements";
import PropTypes from "prop-types";
import styles from "../styles.css";
import _ from "lodash";
import validator from "validator";

const errorMessage = "This field is required."

export default class RegisterScreen extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			error: {},
		};
	}
	
	_onChangeText = (type) => (val) =>{
		const{register: {registerNewInput}, actions} = this.props;
		const error1 = {};
		const newInput = _.merge({}, registerNewInput);

		switch(type){
			case 1:
				if (_.isEmpty(val)) {
					error1.emailErr = errorMessage;
				} 

				newInput.email = val;
				break;
		}
		this.setState({error: error1});
		actions.setRegisterInput(newInput);
	}

	_submit = () => {
		const {register: {registerNewInput}, actions, navigation} = this.props;
		const error1 = {};

		if(_.isEmpty(registerNewInput.email)){
			error1.emailErr = errorMessage;
		}else if(!validator.isEmail(registerNewInput.email)){
			error1.emailErr = "Email address is not valid";
		}

		if (_.isEmpty(error1)) {
			navigation.navigate("Mobile");
			// actions.checkImportantDetails(registerNewInput.email, "email");
		} else {
			this.setState({ error: error1 });
		}
	}

	render() {
		const {register: {registerNewInput}} = this.props;
		const {error} = this.state;
		return (
			<View style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor={Color.Header} />
				<ScrollView keyboardShouldPersistTaps='handled' style={styles.bodyContainer}>
					<View style={styles.margin30}>
						<Text style={styles.labelText}>And, your email</Text>
						<Text style={styles.labelText}>address?</Text>
					</View>

					<TxtInput
						inputStyles={{fontSize: 17}}
						onChangeText={this._onChangeText(1)}
						onFocus={() => this.setState({emailFocus: true})}
						onBlur={() => this.setState({emailFocus: false})}
						isFocus={this.state.emailFocus}
            value={registerNewInput.email}
            keyboardType="email-address"
						returnKeyType='next'
						onSubmitEditing={this._submit}
						err={error.emailErr}
						label='Email Address'
						style={{marginTop: 30}}/>

          <View style={{backgroundColor: 'transparent', flexDirection: 'row', marginTop: 15}}>
						<View style={{flex: 1}}>
							<Text numberOfLines={5} style={{color: Color.Standard, fontFamily: 'Roboto-Light'}}>
								I'd like to receive newsletter, promotional communication, additional resources from Adviso Tax Express via Email, SMS and phone.
							</Text>
						</View>
						<View style={{alignItems: 'flex-end', marginLeft: 10}}>
							<Switch value={this.state.switch} trackColor={Color.DarkBG} onValueChange={() => this.setState({switch: !this.state.switch})} />
						</View>
					</View>

				</ScrollView>
				<TouchableOpacity style={styles.btnRoundArrow} onPress={this._submit} >
					<Icon reverse name='angle-right' type='font-awesome' color={Color.colorPrimary} size={30} />
				</TouchableOpacity>
			</View>
		);
	}
}
RegisterScreen.propTypes = {
	actions: PropTypes.object,
	InputedData: PropTypes.object,
	navigation: PropTypes.object,
};
