import React, { PureComponent } from "react";
import { ScrollView, Text } from "react-native";
import styles from "../../styles.css";
import TxtInput from "__src/components/TxtInput";
import PropTypes from "prop-types";
import _ from "lodash";
import Resource from "__src/resources";
const {Color} = Resource;

class RegcodeAccount extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			isSecure: true,
			errorRegcode: "",
			error: {},
		};
	}

	_handleChangeInput = (type) => (value) => {
		const { actions, addlegacy: { regcodeCredentialsInput } } = this.props;
		const newInput = _.merge({}, regcodeCredentialsInput);
		const { error } = this.state;

		switch (type) {
		case "username":
			if (_.isEmpty(value)) {
				error.username = "Username is required";
			} else {
				delete error.username;
			}
      
			newInput.username = (value).trim();
			break;
		case "password":
			if (_.isEmpty(value)) {
				error.password = "Password is required";
			} else {
				delete error.password;
			}
      
			newInput.password = (value).trim();
			break;
		}

		actions.setRegcodeCredentials(newInput);
	}

	onSubmit = () => {
		const { actions, addlegacy: {  regcodeCredentialsInput,
			getSearchRegcodeInput } } = this.props;
		const error = {};
	
		if (_.isEmpty(regcodeCredentialsInput.username)) {
			error.username = "Username is required";
		}
    
		if (_.isEmpty(regcodeCredentialsInput.password)) {
			error.password = "Password is required";
		}
    
		if (_.isEmpty(error)) {
			actions.getRegcodeCredentials(regcodeCredentialsInput, getSearchRegcodeInput);

		} else {
			this.setState({error});
		}
	}

	render() {
		const { addlegacy: { isGetRegcodeCredentialsFailed,
			regcodeCredentialsInput, getSearchRegcodeInput } } = this.props;
		const {error} = this.state;
		const error2 = isGetRegcodeCredentialsFailed ? "Invalid account credential" : "";

		return (
			<ScrollView showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				style={styles.flex1padH20} >
				<Text style={[styles.txt1, {color: Color.Standard2}]}>
          Regcode Account Credential</Text>
				<Text style={[styles.input3, styles.marT15]}>
					Please fill up all the required fields</Text>

				<TxtInput
					value={getSearchRegcodeInput}
					label='Regcode'
					isText
					style={styles.marT15}
					inputStyles={{color: Color.Standard2}}
					style3={styles.borderWidth0}/>

				<TxtInput
					onChangeText={this._handleChangeInput("username")}
					onFocus={() => this.setState({fnUN: true})}
					onBlur={() => this.setState({fnUN: false})}
					isFocus={this.state.fnUN}
					value={regcodeCredentialsInput.username}
					returnKeyType='next'
					err={error2 || error.username}
					label='Username'
					style={styles.marT15} />

				<TxtInput
					onChangeText={this._handleChangeInput("password")}
					onFocus={() => this.setState({fnPass: true})}
					onBlur={() => this.setState({fnPass: false})}
					isFocus={this.state.fnPass}
					value={regcodeCredentialsInput.password}
					returnKeyType='done'
					err={error.password}
					label='Password'
					compName="Password"
					onPass={() => this.setState({isSecure: !this.state.isSecure})}
					secureTextEntry={this.state.isSecure}
					style={styles.marT15} />

			</ScrollView>
		);
	}
}

RegcodeAccount.propTypes = {
	actions: PropTypes.object,
	addlegacy: PropTypes.object,
};

export default RegcodeAccount;
