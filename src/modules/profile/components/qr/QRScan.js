/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, ImageBackground, TouchableOpacity, Image, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import { RNCamera } from "react-native-camera";
// import QRCodeScanner from 'react-native-qrcode-scanner';
import SwitchSelector from "__src/resources/customize/SwitchSelector";
import _ from "lodash";
const {Res, Color} = Resources;

export default class QRScan extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			option: "",
			isBarcodeScannerEnabled: true
		}
	}

	onBarCodeRead = (code) => {
		const{actions, navigation} = this.props;
		const {isBarcodeScannerEnabled} = this.state;
		if(isBarcodeScannerEnabled){

			actions.inputAccountId(_.toString(code));
			navigation.goBack();
			// actions.getTargetAccountWallet(_.toString(code));
			this.setState({isBarcodeScannerEnabled: false});
		}
	}

	renderCamera = () => {
		return (
			<View style={{height: "80%"}}>
				<RNCamera
					autoFocus={RNCamera.Constants.AutoFocus.on}
					onBarCodeRead={(e) => this.onBarCodeRead(e.data)} style={styles.camera2} />
			</View>
		)
	}

	renderQR = () => {
		const {login} = this.props;
		const id = login.currentAccount.id;

		return (
			<View style={{height: "80%"}}>
				<Text onPress={() => this.onBarCodeRead(id)} style={{textAlign: "center", paddingTop: 30, fontSize: 13, fontFamily: "Roboto", color: Color.white}}>Place the code in the center of the square.</Text>
				<Text style={{textAlign: "center", fontSize: 13, fontFamily: "Roboto", color: Color.white}}>It will be scanned automatically.</Text>
				<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
					<ImageBackground  style={{padding: 30}} source={Res.get("qr_frame")}>
						<RNCamera
							autoFocus={RNCamera.Constants.AutoFocus.on}
							onBarCodeRead={(e) => this.onBarCodeRead(e.data)} style={styles.camera} />
					</ImageBackground>
				</View>
			</View>
		)
	}
  
	render() {
		const {option} = this.state;
		const cameraStyle = option === "cam" ? this.renderCamera() : this.renderQR();

		return (
			<View style={styles.container}>
				{cameraStyle}
				
			</View>
		);
	}
}
QRScan.propTypes = {
	Title: PropTypes.string,
	placeholder: PropTypes.string,
	onBarCodeRead: PropTypes.func,
	onChangeText: PropTypes.func,
	onRequestClose: PropTypes.func,
	onPress: PropTypes.func,
	onPressOK: PropTypes.func,
	onPressCancel: PropTypes.func,
	value: PropTypes.string,
	visible: PropTypes.bool,
	isLoad: PropTypes.bool,
};
const styles = StyleSheet.create({
	container: {flex: 1, backgroundColor: Color.gray05},

	camera: {width: 230, height: 230, alignItems: "center"},
	camera2: {width: "100%", height:  "100%"},
});
