/* eslint-disable max-len */
/* eslint-disable import/default */
/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, Image, ImageBackground,
	 StyleSheet, TouchableOpacity, Alert} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import {Icon, Avatar} from "react-native-elements";
import * as globals from "__src/globals";
import Loading from "__src/components/Loading";
import ImagePicker from "react-native-image-picker";
import _ from "lodash";
const {Color, Res} = Resource;
const options = {
	title: "Choose method",
	storageOptions: {
		skipBackup: true,
		path: "images",
	},
};

export default class ProfileImage extends PureComponent{

	componentDidUpdate(prevProps) {

		const { actions, profile: { uploadedPhoto, doneUpdatingProfilePhoto },
			login: { additionalDetails } } = this.props;

		if (uploadedPhoto && uploadedPhoto !== prevProps.profile.uploadedPhoto) {
			actions.updateProfilePhoto(uploadedPhoto, additionalDetails.individual.id);
		}

		if (doneUpdatingProfilePhoto.id !== prevProps.profile.doneUpdatingProfilePhoto.id &&
			doneUpdatingProfilePhoto.id) {
			Alert.alert("Profile photo successfully updated");
			actions.resetUpdatingProfilePhoto();
		}
	}

	goBack = () => {
		const {goBack} = this.props.navigation;

		goBack();
	}

	openGalery = () => {
		const {actions} = this.props;

		ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log("User tapped custom button: ", response.customButton);
			} else {
				const ext = response.uri.slice(-4).toString();
				const fileupload = {
					data: response.uri,
					extension: ext,
					name: response.fileName,
					type: response.type,
				};

				actions.uploadProfilePhoto(fileupload);
			}
		});
	}

	transformImage = (photo) => {
		return globals.CloudUpload.imageTransform(
			photo,
			"c_fill,g_face,w_140,h_140");
	}

	level = () => {
		const {login: {additionalDetails}} = this.props;

		if (!_.has(additionalDetails, "levels") || _.isEmpty(additionalDetails.levels)){
			return null;
		}

		if (additionalDetails.levels.length > 1){
			return `- Level ${additionalDetails.levels[1]}`;
		}

		return `- Level ${additionalDetails.levels[0]}`;
	}

	getResource = () => {
		const {login: {additionalDetails}} = this.props;
 
		if (!_.has(additionalDetails, "individual.firstName") || !_.has(additionalDetails, "type")){
			return {photo: Res.get("user_icon"), firstName: "", lastName: ""};
		}

		const photo = additionalDetails.profilePhoto ?
			{uri: this.transformImage(additionalDetails.profilePhoto)} : Res.get("user_icon");
		const firstName = additionalDetails.individual.firstName.toUpperCase();
		const lastName = additionalDetails.individual.lastName.toUpperCase();
		const id = additionalDetails.metadata.accountNumber;
		
		return {photo, firstName, lastName, id};
	}

	getStatus = () => {
		const {login: {getKYCVerification}} = this.props;
 
		if (!_.has(getKYCVerification, "kyc1.status") || !_.has(getKYCVerification, "kyc2")){
			return {color: Color.red, status: "Unverified"};
		}
		
		const color = getKYCVerification.kyc1.status === "accepted" ? Color.lightgreen : Color.red;
		const status = getKYCVerification.kyc1.status === "accepted" ? "Verified" : "Unverified";

		return {color, status};

	}
 
	render(){
		const {login: {additionalDetails}, profile: {isUploadingPhoto}, navigation, isEdit} = this.props;
		const {photo, firstName, lastName, id} = this.getResource();
		const {color, status} = this.getStatus();
		const cif = _.has(additionalDetails, "individualId") ? additionalDetails.individualId : "";
		const subType = _.has(additionalDetails, "type") ? additionalDetails.type.toUpperCase() : "";
		
  	return (
			<View style={styles.container}>
				<Image style={styles.imagebackground} source={Res.get("background_dark")} resizeMode="stretch"/>
				<View style={styles.mainWrap}>
					<View style={styles.body}>
	
						<View style={styles.view3}>
							<ImageBackground style={styles.imgBackground} source={Res.get("profile_circle")}>
								{isUploadingPhoto ? <Loading customStyle={styles.customStyle} size="small" color="white"/> : null}
								<Avatar rounded size={110} source={photo} />
								{/* {isEdit ?
									<TouchableOpacity activeOpacity={0.8} onPress={this.openGalery} style={styles.btnCamera}>
										<Image style={styles.imgCamera} source={Res.get("button_camera")} resizeMode={"contain"} />
									</TouchableOpacity> :
									null} */}
							</ImageBackground>
						</View>
				
						<View style={styles.view1}>
							<Text adjustsFontSizeToFit style={styles.name}>
								{firstName} {lastName}
							</Text>
							<Text adjustsFontSizeToFit style={styles.type}>
								{subType} / CIF No. { cif }
							</Text>
							<View style={styles.underline} />
							<View style={styles.viewId}>
								<Text adjustsFontSizeToFit style={styles.idTxt}>{id}</Text>
							</View>
							<View style={styles.status} >
								<Text style={styles.statusTxt1}>Status</Text>
								<Icon name='question-circle' type='font-awesome' color={Color.white} size={11} />
								<Text style={[styles.statusTxt2, {color}]}>
									{status} {this.level()}
								</Text>
							</View>

							<TouchableOpacity style={styles.view2} onPress={() => navigation.navigate("QRCode", {title: "QR CODE"})}>
								<Image  style={styles.qrImg} source={Res.get("qr_regcode")} resizeMode={"contain"} resizeMethod={"resize"}/>
								<Text style={styles.qrTxt}>Received</Text>
							</TouchableOpacity>
						</View>
					
					</View>
				</View>
				
			</View>
  	);
	}
}

ProfileImage.propTypes = {
	login: PropTypes.object,
	navigation: PropTypes.object,
	actions: PropTypes.object,
	profile: PropTypes.object,
	isEdit: PropTypes.bool,
};

const styles = StyleSheet.create({
	container: {flexShrink: 1, backgroundColor: Color.Header},
	body: {flexShrink: 1, width: "100%", alignItems: "center", flexDirection: "row" },
	imagebackground: {width: "100%", height: "100%", position: "absolute"},
	mainWrap: {flexShrink: 1, flexDirection: "column", paddingVertical: 20},
	underline: {backgroundColor: Color.white, height: 1, width: 50, alignSelf: "flex-start", marginVertical: 5},
	view1: {flexDirection: "column", justifyContent: "flex-start", width: "60%"},
	view2: {position: "absolute", right: 10, bottom: 15},
	view3: {width: "40%", alignItems: "center", justifyContent: "center"},
	status: {flexDirection: "row", marginTop: 5},
	statusTxt1: {fontFamily: "Roboto-Light", fontSize: 10, color: Color.white, marginRight: 2},
	statusTxt2: {fontFamily: "Roboto-Light", fontSize: 10, marginLeft: 5},
	viewId: {flexDirection: "row", justifyContent: "space-between"},
	idTxt: {fontFamily: "Roboto-Light", fontSize: 21, color: Color.colorPrimary, fontWeight: "bold"},
	name: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.white},
	type: {fontFamily: "Roboto-Light", fontSize: 10, color: Color.colorPrimary},
	qrImg: {width: 18, height: 18, alignSelf: "center"},
	qrTxt: {fontFamily: "Roboto-Light", fontSize: 9, color: Color.Standard, textAlign: "center"},
	imgBackground: {padding: 5},
	btnCamera: {position: "absolute", bottom: 10, right: 0},
	imgCamera: {width: 30, height: 30},
	customStyle: {backgroundColor: Color.transparent, zIndex: 1, position: "absolute", top: 0, bottom: 0, left: 0, right: 0},

});
