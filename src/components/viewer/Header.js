import React from "react";
import {View, TouchableOpacity, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import PropTypes from "prop-types";

class Header extends React.PureComponent{
	render(){
		const {onClose} = this.props;

		return (
			<View style={styles.container}>
	      <TouchableOpacity onPress={onClose} style={styles.btnClose}>
					<Icon name="close" color="red" size={25}/>
				</TouchableOpacity>
			</View>
		);
	}
}
Header.propTypes = {
	onClose: PropTypes.func,
};
const styles = StyleSheet.create({
	container: {height: 110, width: "100%", backgroundColor: "white"},
	btnClose: {position: "absolute", top: 5, right: 5, zIndex: 1},
});

export default Header;
