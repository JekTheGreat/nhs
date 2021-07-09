import React, {PureComponent} from "react";
import {Keyboard, TouchableWithoutFeedback} from "react-native";
import PropTypes from "prop-types";

class KeyboardDismiss extends PureComponent {
	render(){
		return (
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				{this.props.children}
			</TouchableWithoutFeedback>
		);
	}
}

KeyboardDismiss.propTypes = {
	children: PropTypes.element,
};

export default KeyboardDismiss;
