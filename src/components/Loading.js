import React, {PureComponent} from "react";
import { StyleSheet, View, ViewPropTypes} from "react-native";
import PropTypes from "prop-types";
import {Spinner} from "native-base";

export default class Loading extends PureComponent {
	static defaultProps = {
		color: "black",
	}
	
	render() {
		const {customStyle, color, isLoading} = this.props;

		return (
			<View style={[styles.container, customStyle]}>
				<Spinner {...this.props}
					size="small"
					color={color}
					animating={isLoading} />
			</View>
		);
	}
}
Loading.propTypes = {
	color: PropTypes.string,
	isLoading: PropTypes.bool,
	customStyle: ViewPropTypes.style,
};

const styles = StyleSheet.create({
	container: {
		flex: 1, justifyContent: "center", alignItems: "center",
	},
});
