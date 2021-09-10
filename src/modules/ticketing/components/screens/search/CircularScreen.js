import React from "react";
import { StyleSheet, View, Text, Image, Modal  } from "react-native";
import CircularProgress from "./CircularProgress";
import PropTypes from "prop-types";
import _ from "lodash";
import Resource from "__src/resources";
const {Color, Res} = Resource;

class CircularScreen extends React.PureComponent {
	render(){
		const {visible, setInput} = this.props;
    
		if (!_.has(setInput, "origin.city") || !_.has(setInput, "destination.city")){
			return null;
		}
		const originCity = setInput.origin.city.split(",");
		const desCity = setInput.destination.city.split(",");
		const departLocation = originCity[originCity.length - 1].trim();
		const returnLocation = desCity[desCity.length - 1].trim();
    
		return (
			<Modal transparent visible={visible} onRequestClose={() => console.log()}>
				<View pointerEvents="none" style={styles.container}>
					<CircularProgress />
					<View style={[styles.view1]}>
						<View style={styles.viewCenter}>
							<Text style={styles.txtIata}>{setInput.origin.iata}</Text>
							<Text style={styles.txtCountry}>{departLocation}</Text>
						</View>
						<Image style={styles.imageDepart} source={Res.get("depart_white")} resizeMode="contain"/>
						<View style={styles.viewCenter}>
							<Text style={styles.txtIata}>{setInput.destination.iata}</Text>
							<Text style={styles.txtCountry}>{returnLocation}</Text>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
};

CircularScreen.propTypes = {
	visible: PropTypes.bool,
	setInput: PropTypes.object,
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#191D21CC",
		alignItems: "center", justifyContent: "center" },
	view1: {flexDirection: "row", alignItems: "center", justifyContent: "center", position: "absolute"},
	viewCenter: {alignItems: "center"},
	txtIata: {fontFamily: "Montserrat-Medium", fontSize: 20, color: Color.white},
	txtCountry: {fontFamily: "Montserrat-Medium", fontSize: 12, color: Color.white},
	imageDepart: {width: 20, height: 20, marginHorizontal: 5},
});

export default CircularScreen;
