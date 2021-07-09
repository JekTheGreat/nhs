/* eslint-disable */
import React from "react";
import {View, StyleSheet, Modal, Text, Image} from "react-native";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import Button from "./Button.1";
const {Color, Res} = Resources;

class CustomAlert extends React.PureComponent{
	render(){
		const {onRequestClose, visible, onPress, 
			animate, status, message} = this.props;

		const title = status === "success" ? "Success!" : "Error!"
    
		return (
			<Modal animationType={animate} transparent visible={visible}
				onRequestClose={onRequestClose}>
				<View style={styles.container}>
					<View style={styles.modalSubContainer1}>
						<Image style={styles.image} source={Res.get(status)} resizeMode="stretch"/>
						<View style={{padding: 20}}>
							<Text style={styles.title}>{title}</Text>
							<Text style={styles.label}>
								{message || "Proof of disbursement successfully upload. Waiting for approval. You can check the status in payout reports page."}
							</Text>

							<View style={styles.view2}>
							<Button
								onPress={onPress}
								style={{width: 140}}
								label="Ok"/>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}

CustomAlert.propTypes = {
	onRequestClose: PropTypes.func,
	onChangeText: PropTypes.func,
	visible: PropTypes.bool,
	isLoad: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.string,
	animate: PropTypes.string,
	status: PropTypes.string,
	onPress: PropTypes.func,
	message: PropTypes.string,
};

const styles = StyleSheet.create({
	container: {flexShrink: 1, justifyContent: "center", width: "100%", height: "100%",
		paddingHorizontal: 30, paddingVertical: "10%", backgroundColor: "rgba(0, 0, 0, 0.5)"},
	modalSubContainer1: {flexShrink: 1, backgroundColor: "#fff", borderRadius: 3},
	title: {fontSize: 23, fontFamily: "Roboto", textAlign: "center", fontWeight: "bold", color: Color.colorPrimary},
	label: {fontSize: 13, fontFamily: "Roboto-Light", textAlign: "center", color: Color.Standard2, marginTop: 5},
	view2: {flexDirection: "row", alignSelf: "center", marginTop: 20},
	cancel: {fontFamily: "Roboto-Light", fontSize: 16, color: Color.Standard2, padding: 5},
	proceed: {fontFamily: "Roboto-Light", fontSize: 16, color: Color.colorPrimary, padding: 5},
	image: {width: "100%", height: 170},
});

export default CustomAlert;
