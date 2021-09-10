import React from "react";
import {View, Text, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import Resource from "__src/resources";
const {Color} = Resource;

const ExtraDescription = (props) => {
	const {title, description, titleStyle, descStyle} = props;

	return (
		<View style={styles.container}>
			<Text style={[styles.title, titleStyle]}>{title}</Text>
			<Text style={[styles.description, descStyle]}>{description}</Text>
		</View>
	);
};

ExtraDescription.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	descStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const styles = StyleSheet.create({
	container: {minHeight: 100},
	title: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 16, color: Color.text2, marginTop: 18},
	description: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2, marginTop: 10},
});

export default ExtraDescription;
