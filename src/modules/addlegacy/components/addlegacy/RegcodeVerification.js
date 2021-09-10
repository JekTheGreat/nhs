import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import styles from "../../styles.css";
import TxtInput from "__src/components/TxtInput";
import PropTypes from "prop-types";
import _ from "lodash";
import Resource from "__src/resources";
const {Color} = Resource;

class RegcodeVerification extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			fnFocus: false,
			errorRegcode: "",
		};
	}

	_handleChangeInput = (value) => {
		if (_.isEmpty(value)) {
			this.setState({ errorRegcode: "Regcode account is required" });
		} else {
			this.setState({ errorRegcode: "" });
		}

		this.props.actions.setSearchRegcodeInput(value);
	};

	onSubmit = () => {
		const { actions, addlegacy: { getSearchRegcodeInput } } = this.props;
	
		if (_.isEmpty(getSearchRegcodeInput)) {
			this.setState({ errorRegcode: "Regcode account is required" });
		} else {
			actions.searchRegcode(getSearchRegcodeInput);
		}
	}

	render() {
		const { addlegacy: { isSearchRegcodeFailed, getSearchRegcodeInput } } = this.props;
		const error = isSearchRegcodeFailed ? "Regcode account ID not found" : "";

		return (
			<View style={styles.flex1padH20} >
				<Text style={[styles.txt1, {color: Color.Standard2}]}>Regcode Verification</Text>
				<Text style={[styles.input3, styles.marT15]}>
					Input your regcode account ID from UPS system version 1</Text>

				<TxtInput
					onChangeText={this._handleChangeInput}
					onFocus={() => this.setState({fnFocus: true})}
					onBlur={() => this.setState({fnFocus: false})}
					isFocus={this.state.fnFocus}
					value={getSearchRegcodeInput}
					returnKeyType='next'
					err={error || this.state.errorRegcode}
					label='Enter your regcode'
					style={styles.marT25} />

			</View>
		);
	}
}

RegcodeVerification.propTypes = {
	actions: PropTypes.object,
	addlegacy: PropTypes.object,
};

export default RegcodeVerification;
