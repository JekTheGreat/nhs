/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-len */
/* eslint-disable import/default */
// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, ScrollView, TouchableOpacity,
	Alert, Image} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import _ from "lodash";
import Button from "__src/components/Button";
import styles from "../../styles.css";
import Loading from "__src/components/Loading";
import {Icon} from "react-native-elements";
import ImagePicker from "react-native-image-picker";
const {Res, Color} = Resource;

const reject = {color: "red"};
const options = {
	title: "Select Avatar",
	customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
	storageOptions: {
		skipBackup: true,
		path: "images",
	},
};

export default class ProofAddress extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			yes: true,
			kycInputs: {
				source: null,
			},
			error: {},
		};
	}

	componentDidMount(){
		const {actions, login: {session}} = this.props;

		actions.getKYCVerification(session.token);
	}

	componentDidUpdate(prevProps){
		const {profile: {doneVerifyingUploadAddressAuthPhoto}} = this.props;

		if (!_.isEqual(prevProps.profile.doneVerifyingUploadAddressAuthPhoto, doneVerifyingUploadAddressAuthPhoto) && doneVerifyingUploadAddressAuthPhoto){
			this.setState({addressFirstTime: true});
		}
	}

	renderDone = () => (
  	<View style={styles.flex1mar30pad30}>
  		<View style={styles.flex1}>
  			<Image style={styles.imgsuccess} source={Res.get("check_icon")} resizeMode={"contain"} />
  			<Text style={styles.txtalright}>Success!</Text>
  			<Text style={styles.txtsuccess}>Proof of Address Verfied.</Text>
  		</View>
			<View style={styles.marb20}>
				<Button
					onPress={this._handleCurrentStep}
					style={[styles.btnStyle2, styles.marb20]}
					label="Next"/>
			</View>
  	</View>
	);

	renderReject = (kyc1) => (
  	<View style={styles.flex1mar30pad30}>
  		<View style={styles.flex1}>
  			<Image style={styles.imgsuccess} source={Res.get("ic_error")} resizeMode={"contain"} />
  			<Text style={[styles.txtalright, reject]}>Sorry!</Text>
  			<Text style={styles.txtsuccess}>Proof of address is rejected.</Text>
				<Text style={[styles.txtsuccess, styles.marginTop10, {color: Color.Header}]}>Reason:</Text>
  			<Text style={[styles.txtsuccess, styles.marginTop5]}>{kyc1.remarks}</Text>
  		</View>
  		<Button
  			onPress={this._handleClearProofOfAddress}
				style={[styles.btnStyle2, styles.marb20]}
				loading={this.props.profile.isClearingProofOfAddressPhoto}
  			label="Reupload Photo"/>
  	</View>
	);

	_handleClearProofOfAddress = () => {
		const { actions } = this.props;

		actions.clearProofOfAddress();
	}

	clickPending = () => {
		const {login: {session}, actions} = this.props;

		this.setState({addressFirstTime: false});
		actions.getKYCVerification(session.token);
	}
	
	renderPending = (addressFirstTime) => (
  	<View style={styles.flex1mar30pad30}>
  		<View style={styles.flex1}>
  			<Image style={styles.imgsuccess} source={Res.get("ic_warning")} resizeMode={"contain"} />
				{addressFirstTime ?
					<View>
						<Text style={styles.txtalright}>Alright!</Text>
						<Text style={styles.txtsuccess}>Your proof of address completed.</Text>
						<Text style={styles.txtsuccess}>
							Validation of the documents submitted will take 1 to 3 days.
						</Text>
					</View> :
					<Text style={styles.txtsuccess}>
					Your proof of address is pending for approval.
					</Text>
				}
  		</View>
  		<Button
				onPress={this.clickPending}
  			style={[styles.btnStyle2, styles.marb20]}
  			label="Next"/>
  	</View>
	);

	renderBase(value) {
  	return (
  		<View style={styles.renderBase}>
  			<Text style={styles.input}>
  				{value}
  			</Text>
  			<Icon name='chevron-down' type='evilicon' color="black" size={27} />
  		</View>
  	);
	}
	
	renderRow(rowData, rowID, highlighted) {
		const data = _.isObject(rowData) ? rowData.name.common : rowData;

  	return (
  		<View style={styles.renderRow}>
  			<Text style={[styles.renderRowTxt,
  				highlighted && {color: Color.black} ]}>
  				{data}
  			</Text>
  		</View>
  	);
	}

	handleInputChange = (type) => (value) => {
  	const { kycInputs } = this.state;
  	const error1 = {}, newInput = { ...kycInputs };

  	if (_.isEmpty(value)) {
  		error1[type] = "This field is required.";
  	} else {
  		delete error1[type];
  	}

  	newInput[type] = _.isObject(value) ? value.name.common : value;

  	this.setState({
  		error: { ...error1 },
  		kycInputs: { ...newInput },
  	});
	}

	info = () => {
		const info = "Make sure that the documents you upload are in your name and residential address as it appears in your account, and have been issued within the last six(6) months. \n\n Provide type of documents within the choices only. IDs are not considered an acceptable address document. Please do not upload an ID photo.";

		Alert.alert("Information", info);
	}

	openGalery = (type) => {
		const {actions} = this.props;
		const error = {};

		ImagePicker.launchImageLibrary(options, (response) => {
			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log("User tapped custom button: ", response.customButton);
			} else {
	
				if (type === "doneUploadingAuth"){
					actions.uploadAuthPhoto(response.uri);
				} else {
					actions.uploadAddressPhoto(response.uri);
				}
				
				this.setState({ error });
			}
		});
	}

	openCamera = (type) => {
		const {actions} = this.props;
		const error = {};

		ImagePicker.launchCamera(options, (response) => {
			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log("User tapped custom button: ", response.customButton);
			} else {

				if (type === "doneUploadingAuth"){
					actions.uploadAuthPhoto(response.uri);
				} else {
					actions.uploadAddressPhoto(response.uri);
				}
				this.setState({ error });
			}
		});
	}

	uploadStep1 = () => {
		const {error} = this.state;
		const { profile: { isUploadingAddress, doneUploadingAddress,
			isVerifyingUploadAddressAuthPhoto } } = this.props;
		const avatar = doneUploadingAddress ? {uri: doneUploadingAddress} : Res.get("view_utility_bill");

		return (
			<ScrollView keyboardShouldPersistTaps='handled'
				showsVerticalScrollIndicator={false} style={styles.flex1pad30pad30}>
				<View style={styles.wrapper1}>
					{isUploadingAddress ? <Loading customStyle={styles.customStyle} size="small" color="white"/> : null}
					<TouchableOpacity>
						<Image style={styles.imgFile} source={avatar} resizeMode={"contain"} />
					</TouchableOpacity>
					<TouchableOpacity onPress={this.info} style={styles.btnInfo}>
						<Icon containerStyle={styles.padmar0} reverse type="entypo" name="info" color={Color.colorPrimary} size={10}/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.openCamera("doneUploadingAddress")}
						style={styles.btnCamera}>
						<Icon containerStyle={styles.padmar0} type="font-awesome" name="camera" color={Color.white} size={15}/>
						<Text style={styles.txtCamera}>Use Camera</Text>
					</TouchableOpacity>
				</View>
				{error.doneUploadingAddress ?
					<Text style={styles.errStyle}>{error.doneUploadingAddress}</Text> : null}

				<Text style={styles.txtOR}>OR</Text>
				<TouchableOpacity onPress={() => this.openGalery("doneUploadingAddress")} style={styles.btnClickToUpload}>
					<Image style={styles.imgUpload} source={Res.get("view_id")} resizeMode={"contain"} />
					<Text style={styles.txtUpload}>Click to Upload</Text>
				</TouchableOpacity>

				<Text style={[styles.textStyle, styles.marginTop15]}><Text style={{fontSize: 16, fontWeight: "bold"}}>Note: </Text>
If you don't have Proof of Billing under your name, please submit Proof of Billing under parent's name as long as you're residing at the same address and same
family name. If you are renting, kindly upload Proof of Billing with an authorization
letter signed by the owner of the billing statement and photocopy of IDs of the owner.</Text>
				
				<View style={styles.paddingVer30}>
  				<Button
  					onPress={this._handleSubmitAddressAndAuth}
						style={[styles.btnStyle2, {marginBottom: 20}]}
						loading={isVerifyingUploadAddressAuthPhoto}
  					label="Submit"/>
  			</View>
			</ScrollView>
		);
	};

	_handleSubmitAddressAndAuth = () => {
		const { actions, profile: { doneUploadingAddress },
			login: { session } } = this.props;
		const error1 = {};

		if (_.isEmpty(doneUploadingAddress)) {
			error1.doneUploadingAddress = "Address photo is required";
		}

		if (_.isEmpty(error1)) {
			actions.verifyUploadAddressAuthPhoto(doneUploadingAddress,
				session.token);
		} else {
			this.setState({error: error1});
		}
	}

  _handleCurrentStep = () => {
  	const {actions} = this.props;
		
  	actions.changeCurrentStep("verified");
  }
	
  render(){
  	const { login: { additionalDetails, getKYCVerification },
  		profile: { doneVerifyingUploadAddressAuthPhoto} } = this.props;
  	const {addressFirstTime} = this.state;
  	console.log("UPLOADID", !_.isEmpty(additionalDetails.individual.addressProofUploadedAt));
		
  	if (doneVerifyingUploadAddressAuthPhoto || !_.isEmpty(getKYCVerification.kyc2)) {
  		if (addressFirstTime || getKYCVerification.kyc2.status === "pending") {
  			return this.renderPending(addressFirstTime);
  		} else if (getKYCVerification.kyc2.status === "rejected"){
  			return this.renderReject(getKYCVerification.kyc2);
  		} else if (getKYCVerification.kyc2.status === "accepted"){
  			return this.renderDone();
  		}
  	}
		
  	return (
  		<View style={styles.flex1}>
  			{this.uploadStep1()}
  		</View>
  	);
  }
}

ProofAddress.propTypes = {
	actions: PropTypes.object,
	profile: PropTypes.object,
	login: PropTypes.object,
};

