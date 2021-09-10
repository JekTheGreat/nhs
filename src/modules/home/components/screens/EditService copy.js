/* eslint-disable */
import React from "react";
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, Image} from "react-native";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import Modal from "__src/resources/customize/AnimatedModal";
import TxtInput from "__src/components/TxtInput";
const {Color, Res} = Resources;
const {width, height} = Dimensions.get("window");

class EditService extends React.Component{

	render(){
  	const {editRef, value, error,
			onChangeText, onCancel, onProceed, isLoad} = this.props;
    
  	return (
			<View style={styles.container2}>
				<View style={[styles.innerContainer]}>
					<View style={{alignItems: "center", justifyContent: "center"}}>
						<View style={{width: 80, height: 3, backgroundColor: Color.Standard, marginTop: 10}}/>
						<View style={{width: 60, height: 3, backgroundColor: Color.Standard, marginTop: 5}}/>
					</View>

					<View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20, paddingHorizontal: 20}}>
						<Text style={{fontFamily: "Roboto-Light", fontSize: 16, color: Color.Standard2}}>Your Favourites</Text>
						<TouchableOpacity onPress={() => onEditChange()}
							activeOpacity={0.7} >
							<Image style={styles.imgUpdate} source={Res.get("button_update")} resizeMode="contain" />
						</TouchableOpacity>
					</View>
				</View>
			</View>
  	);
	}
}

EditService.propTypes = {
	onRequestClose: PropTypes.func,
	onChangeText: PropTypes.func,
	visible: PropTypes.bool,
	isLoad: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.string,
	animate: PropTypes.string,
	onCancel: PropTypes.func,
	onProceed: PropTypes.func,
	editRef: PropTypes.func,
};

EditService.defaultProps = {
	editRef: null,
};

const styles = StyleSheet.create({
	container: { width, height: height / 2, zIndex: 888,
		paddingHorizontal: 25, paddingVertical: "10%", backgroundColor: "rgba(0, 0, 0, 0.5)"},
	modalSubContainer1: {flexShrink: 1, backgroundColor: "#fff", borderRadius: 3, padding: 20},
	title: {fontSize: 23, fontFamily: "Roboto-Light", color: Color.colorPrimary},
	label: {fontSize: 13, fontFamily: "Roboto-Light", color: Color.Standard2, marginTop: 5},
	view2: {flexDirection: "row", alignSelf: "flex-end", marginTop: 20},
	btnUpdate: {alignSelf: "flex-end", marginBottom: 15},
	imgUpdate: {width: 60, height: 25},
	container2: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "flex-end",
	},
	flex1: {flex: 1},
	innerContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		top: 200,
		backgroundColor: "white",
	},
});

export default EditService;
