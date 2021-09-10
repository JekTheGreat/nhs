/* eslint-disable */
import React, {PureComponent} from "react";
import { StyleSheet, View, ImageBackground, Image, Platform, SafeAreaView,
	TouchableOpacity, InteractionManager, Text, Alert, PermissionsAndroid} from "react-native";
import QRCode from 'react-native-qrcode-svg';
import CameraRoll from "@react-native-community/cameraroll";
import PropTypes from "prop-types";
import Loading from "__src/components/Loading";
import Resource from "__src/resources";
import moment from "moment";
import { captureRef } from "react-native-view-shot";
import _ from 'lodash';
const {Color, Res} = Resource;
const value = {
	format: "png",
	quality: 1.0,
	result: "tmpfile",
	snapshotContentContainer: false,
};

export default class QRCodeScreen extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isClose: false,
			didFinishInitialAnimation: true,
			testImage: "",
		};

		this.qr = React.createRef();
	}

	componentDidMount(){

		InteractionManager.runAfterInteractions(() => {
			this.setState({
				didFinishInitialAnimation: false,
			});
		});
	}

	requestStoragePermission = async() => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('You can use the camera');
			} else {
				Alert.alert("We can't save your QR to your gallery");
			}
		} catch (err) {
			console.warn(err);
		}
	}

	snapshot = () => {
		const { actions, profile: {saveQRCode}} = this.props;

		// if(!_.isEmpty(saveQRCode)){
		// 	Alert.alert("Notice", "QR code already save in your Gallery/Photos")
		// 	return;
		// }

		captureRef(this.qr, value).then((res) => {
			const url = Platform.OS === "android" ? `file://${res}` : `file://${res}`;

			console.log(url);
			CameraRoll.saveToCameraRoll(url, "photo");
			actions.saveQRCode(url);
			Alert.alert("Notice", "QR code will be send to your Gallery/Photos")
		}).catch((error) => {
			console.warn(error);
			this.setState({ error, res: null, previewSource: null });
		});
	}
	
	render() {
		const {login: {additionalDetails, currentAccount}} = this.props;
		const {firstName, lastName} = additionalDetails.individual;
		const {id} = currentAccount;
		const {didFinishInitialAnimation} = this.state;
		const date = moment(new Date(additionalDetails.createdAt));
		
  	if (didFinishInitialAnimation){
  		return <Loading size="small" color="black" />;
  	}
		
		return (
			<SafeAreaView style={styles.flex1}>
				<View style={styles.flex1}>
					<Text style={styles.txt1}>Let others scan your QR code for you</Text>
					<Text style={styles.txt2}>to receive payment</Text>
					<View ref={this.qr} style={styles.middle}>
						<ImageBackground style={styles.padding30} source={Res.get("qr_frame")}>
							<QRCode value={id} size={200} logoBackgroundColor='black' backgroundColor='white' />
						</ImageBackground>
						<Text style={styles.txt3}>{`${firstName} ${lastName}`}</Text>
						<Text style={styles.txt4}>Verified member since {date.format("MMM YYYY")}</Text>
					</View>
					<TouchableOpacity activeOpacity={0.7} style={styles.bottom} onPress={this.snapshot}>
						<Image style={styles.imgqrdownload} source={Res.get("qr_download")}/>
						<Text style={styles.txt5}>Save QR Code to your gallery</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}
}

QRCodeScreen.propTypes = {
	navigation: PropTypes.object,
	login: PropTypes.object,
	actions: PropTypes.object,
};

const styles = StyleSheet.create({
	flex1: {flex: 1},
	txt1: {textAlign: "center", paddingTop: 30, fontSize: 13, fontFamily: "Roboto-Light", color: Color.Standard},
	txt2: {textAlign: "center", fontSize: 13, fontFamily: "Roboto-Light", color: Color.Standard},
	txt3: {textAlign: "center", paddingTop: 20, fontSize: 17, color: Color.black, fontWeight: "bold", fontFamily: "Roboto-Light"},
	txt4: {textAlign: "center", fontSize: 11, fontFamily: "Roboto-Light", color: Color.Standard},
	middle: {flex: 1, alignItems: "center", justifyContent: "center"},
	padding30: {padding: 30},
	bottom: {flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 20},
	imgqrdownload: {width: 30, height: 30},
	txt5: {textAlign: "center", fontSize: 10, fontFamily: "Roboto-Light", color: Color.LightBlue},
});
