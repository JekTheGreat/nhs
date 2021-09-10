/* eslint-disable */
import React from "react";
import {View, StyleSheet, Image, TextInput, Text } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import Resource from "__src/resources";
const {Color, Res} = Resource;

class PartnerScreen extends React.PureComponent{
	render(){
  	return (
  		<View style={styles.container}>
  			<Text>Comming Soon!</Text>
  		</View>
  	);
	}
}

PartnerScreen.propTypes = {
	label: PropTypes.string,
	ticketing: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flex: 1, alignItems: "center", justifyContent: "center", height: 400},
});

export default PartnerScreen;
