/* eslint-disable max-len */
/* eslint-disable import/default */
// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, ScrollView, TouchableOpacity,
	Alert, Image, PermissionsAndroid, Platform } from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import _ from "lodash";
import Button from "__src/components/Button";
import styles from "../../styles.css";
import Dropdown from "__src/components/Dropdown";
import DatePicker from "__src/components/datepicker";
import Loading from "__src/components/Loading";
import {Icon} from "react-native-elements";
import TxtInput from "__src/components/TxtInput";
import moment from "moment";
import ImagePicker from "react-native-image-picker";

const {Res, Color} = Resource;
const reject = {color: "red"};
const idtypes = ["Philippine Passport", "Driver's License", "SSS UMID Card", "GSIS eCard", "Digitized Postal ID", "IBP ID", "OWWA ID", "Diplomat ID",
	"Senior Citizen ID", "Voter's ID", "GOCC and Government Office"];
const options = {
	title: "Select Avatar",
	customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
	storageOptions: {
		skipBackup: true,
		path: "images",
	},
};

export default class UploadID extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			kycInputs: {
				type: "",
				no: "",
				expiration: "",
			},
			error: {},
		};
	}

	componentDidMount(){
		const {actions, login: {session}} = this.props;

		actions.getKYCVerification(session.token);
		actions.setKYCsteps("uploadStep1");
		if (Platform.OS === "android"){
			this.requestCameraPermission();
		}
	}

	componentDidUpdate(prevProps){
		const {profile: {doneVerifyingUploadIdSelfiePhoto}} = this.props;

		if (!_.isEqual(prevProps.profile.doneVerifyingUploadIdSelfiePhoto, doneVerifyingUploadIdSelfiePhoto) && doneVerifyingUploadIdSelfiePhoto){
			this.setState({idAndSelfieFirstTime: true});
		}
	}

	requestCameraPermission = async () => {
		try {
			const {navigation} = this.props;
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.CAMERA,
				{
					title: "UNIFIED App Camera Permission",
					message:
							"UNIFIED v3.0 App needs access to your camera " +
							"so you can take awesome pictures.",
					buttonNegative: "Cancel",
					buttonPositive: "OK",
				},
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("You can use the camera");
			} else {
				navigation.goBack();
			}
		} catch (err) {
			console.log("err", err);
		}
	}

	renderDone = () => (
  	<View style={styles.flex1mar30pad30}>
  		<View style={styles.flex1}>
  			<Image style={styles.imgsuccess} source={Res.get("check_icon")} resizeMode={"contain"} />
  			<Text style={styles.txtalright}>Success!</Text>
  			<Text style={styles.txtsuccess}>ID and Selfie with ID Verfied.</Text>
  		</View>
			<View style={styles.marb20}>
  		<Button
  			onPress={this._handleCurrentStep}
  			style={styles.btnStyle2}
  			label="Next"/>
			</View>
  	</View>
	);

	renderReject = (kyc1) => (
  	<View style={styles.flex1mar30pad30}>
  		<View style={styles.flex1}>
  			<Image style={styles.imgsuccess} source={Res.get("ic_error")} resizeMode={"contain"} />
  			<Text style={[styles.txtalright, reject]}>Sorry!</Text>
  			<Text style={styles.txtsuccess}>ID and Selfie with ID is rejected.</Text>
  			<Text style={[styles.txtsuccess, styles.marginTop10, {color: Color.Header}]}>Reason:</Text>
  			<Text style={[styles.txtsuccess, styles.marginTop5]}>{kyc1.remarks}</Text>
  		</View>
			<View style={styles.marb20}>
				<Button
					onPress={this._handleClearIdAndSelfie}
					style={styles.btnStyle2}
					loading={this.props.profile.isClearingIdAndSelfiePhoto}
					label="Reupload Photo"/>
			</View>
  	</View>
	);

	_handleClearIdAndSelfie = () => {
		const { actions} = this.props;

		actions.clearIdAndSelfie();
		actions.setKYCsteps("uploadStep1");
	}

	checkAccount = () => {
		const {login: {session}, actions} = this.props;

		actions.getKYCVerification(session.token);
		this.setState({idAndSelfieFirstTime: false});
	}
	
	renderPending = (idAndSelfieFirstTime) => (
  	<View style={styles.flex1mar30pad30}>
  		<View style={styles.flex1}>
  			<Image style={styles.imgsuccess} source={Res.get("ic_warning")} resizeMode={"contain"} />
				{idAndSelfieFirstTime ?
					<View>
						<Text style={styles.txtalright}>Alright!</Text>
						<Text style={styles.txtsuccess}>
						ID and Selfie with ID Upload Completed.
						</Text>
						<Text style={styles.txtsuccess}>
						Validation of the documents submitted will take 1 to 3 days.
						</Text>
					</View> :
					<Text style={styles.txtsuccess}>ID is pending for approval.</Text>}
  		</View>
			<View style={styles.marb30}>
				<Button
					onPress={this.checkAccount}
					style={styles.btnStyle2}
					label="Proceed"/>
			</View>
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

  	if (type === "expiration"){
  		newInput[type] = value;
  	} else {
  		newInput[type] = _.isObject(value) ? value.name.common : value;
  	}

  	this.setState({
  		error: { ...error1 },
  		kycInputs: { ...newInput },
  	});
	}

	info = (ids) => {
		const info = _.isEmpty(ids) ?
			"Take a photo or upload clean and readable front photo of your ID. Select of what type of ID do you have." :
			"Take a photo of yourself holding up your ID that you are using on upload ID. Make sure the text on your ID on selfie are clearly visible";

		Alert.alert("Information", info);
	}

	openGalery = (idtype) => {
		const {kycInputs: {type}} = this.state;
		const {actions} = this.props;
		const error = {};

		if (_.isEmpty(type)){
			error.type = "Please pick an ID type first";
			this.setState({error});
			
			return;
		}

		ImagePicker.launchImageLibrary(options, (response) => {
			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log("User tapped custom button: ", response.customButton);
			} else {

				if (idtype === "doneUploadingId"){
					actions.uploadIdPhoto(response.uri);
				} else {
					actions.uploadSelfiePhoto(response.uri);
				}

				this.setState({ error });
			}
		});
	}

	openCamera = (idtype) => {
		const {kycInputs: {type}} = this.state;
		const {actions} = this.props;
		const error = {};

		if (_.isEmpty(type)){
			error.type = "Please pick an ID type first";
			this.setState({error});
			
			return;
		}

		ImagePicker.launchCamera(options, (response) => {
			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log("User tapped custom button: ", response.customButton);
			} else {

				if (idtype === "doneUploadingId"){
					actions.uploadIdPhoto(response.uri);
				} else {
					actions.uploadSelfiePhoto(response.uri);
				}
	
				this.setState({ error });
			}
		});
	}

	_next = () => {
		const { actions, profile: {doneUploadingId} } = this.props;
		const { kycInputs: {type, expiration}  } = this.state;
		const error1 = {};

		if (_.isEmpty(doneUploadingId)) {
			error1.doneUploadingId = "ID photo is required";
		} else if (_.isEmpty(type)) {
			error1.type = "ID Type is required";
		} else if (_.isEmpty(expiration)) {
			error1.expiration = "Expiration Date is required";
		}

		if (_.isEmpty(error1)) {
			actions.setKYCsteps("uploadStep2");
		} else {
			this.setState({error: error1});
		}
	}

	uploadStep1 = () => {
		const {kycInputs, error} = this.state;
		const { profile: { isUploadingId, doneUploadingId} } = this.props;
		const avatar = doneUploadingId ? {uri: doneUploadingId} : Res.get("view_id");

		return (
			<ScrollView showsVerticalScrollIndicator={false} style={styles.flex1pad30pad30}>
				<View style={styles.wrapper1}>
					{isUploadingId ? <Loading customStyle={styles.customStyle} size="small" color="white"/> : null}
					<TouchableOpacity>
						<Image style={styles.imgFile} source={avatar} resizeMode={"contain"} />
					</TouchableOpacity>
					<TouchableOpacity onPress={this.info} style={styles.btnInfo}>
						<Icon containerStyle={styles.padmar0} reverse type="entypo" name="info" color={Color.colorPrimary} size={10}/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.openCamera("doneUploadingId")}
						style={styles.btnCamera}>
						<Icon containerStyle={styles.padmar0} type="font-awesome" name="camera" color={Color.white} size={15}/>
						<Text style={styles.txtCamera}>Use Camera</Text>
					</TouchableOpacity>
				</View>
				{error.doneUploadingId ?
					<Text style={styles.errStyle}>{error.doneUploadingId}</Text> : null}

				<Text style={styles.txtOR}>OR</Text>
				<TouchableOpacity onPress={() => this.openGalery("doneUploadingId")}
					style={styles.btnClickToUpload}>
					<Image style={styles.imgUpload} source={Res.get("view_id")} resizeMode={"contain"} />
					<Text style={styles.txtUpload}>Click to Upload</Text>
				</TouchableOpacity>
	
				<View style={styles.marginTop15}>
					<Text style={[styles.labelStyle, error.type ? {color: Color.red} : null  ]}>SELECT ID TYPE</Text>
					<Dropdown
						animated={false}
						showsVerticalScrollIndicator={false}
						renderBase={this.renderBase.bind(this, kycInputs.type)}
						dropdownStyle={styles.dropdownStyle}
						options={idtypes}
						renderButtonText={this.handleInputChange("type")}
						renderRow={this.renderRow.bind(this)}
						renderSeparator={null} />
					{error.type ? <Text style={styles.errStyle}>{error.type}</Text> : null}
				</View>

				<TxtInput
					onFocus={() => this.setState({fidnum: true})}
					onBlur={() => this.setState({fidnum: false})}
					isFocus={this.state.fidnum}
					label="ID Number"
					style={styles.marginTop15}
					onChangeText={this.handleInputChange("no")}
					value={kycInputs.no}
					returnKeyType='done'
					err={error.no} />
	
				<View style={styles.marginTop15}>
					<DatePicker
						date={kycInputs.expiration}
						mode="date"
						label='EXPIRATION DATE'
						compName="Date"
						minDate={moment().format("YYYY-MM-DD")}
						format="YYYY-MM-DD"
						err={error.expiration}
						onDateChange={this.handleInputChange("expiration")}/>
				</View>

				<View style={styles.marginVer65}>
  				<Button
  					onPress={() => this._next("uploadStep2")}
  					style={styles.btnStyle2}
  					label="Next"/>
  			</View>
			</ScrollView>
		);
	};

	uploadStep2 = () => {
		const {actions,	profile: {doneUploadingSelfie, isUploadingSelfie,
			isVerifyingUploadIdSelfiePhoto}} = this.props;
		const {error} = this.state;
		const avatar = doneUploadingSelfie ? {uri: doneUploadingSelfie} : Res.get("view_selfie_id");
		
		return (
			<View style={styles.flex1mar30pad30}>
				<View style={styles.flex1}>
					<View style={styles.wrapper1}>
						{isUploadingSelfie ? <Loading customStyle={styles.customStyle} size="small" color="white"/> : null}
						<TouchableOpacity>
							<Image style={styles.imgFile} source={avatar} resizeMode={"contain"} />
						</TouchableOpacity>
						<TouchableOpacity onPress={this.info} style={styles.btnInfo}>
							<Icon containerStyle={styles.padmar0} reverse type="entypo" name="info" color={Color.colorPrimary} size={10}/>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.openCamera("doneUploadingSelfie")}
							style={styles.btnCamera}>
							<Icon containerStyle={styles.padmar0} type="font-awesome" name="camera" color={Color.white} size={15}/>
							<Text style={styles.txtCamera}>Use Camera</Text>
						</TouchableOpacity>
					</View>
					{error.doneUploadingSelfie ?
						<Text style={styles.errStyle}>{error.doneUploadingSelfie}</Text> : null}
					<Text style={styles.txtOR}>OR</Text>
					<TouchableOpacity onPress={() => this.openGalery("doneUploadingSelfie")}
						style={styles.btnClickToUpload}>
						<Image style={styles.imgUpload} source={Res.get("view_id")} resizeMode={"contain"} />
						<Text style={styles.txtUpload}>Click to Upload</Text>
					</TouchableOpacity>
				</View>
			

				<View style={styles.marb10}>
  				<Button
  					onPress={() => this._handleSubmitIdAndSelfie()}
						style={styles.btnStyle2}
						loading={isVerifyingUploadIdSelfiePhoto}
  					label="Submit"/>
  				<Button
  					onPress={() => actions.setKYCsteps("uploadStep1")}
  					style={styles.btnStyle3}
  					labelStyle={styles.btnLabelStyle}
  					label="Back"/>
  			</View>
			</View>
		);
	};

  _handleCurrentStep = () => {
  	const { actions } = this.props;

  	actions.changeCurrentStep("proofOfAddressUpload");
  }

  renderSteps =() => {
  	const {profile: {getKYCsteps}} = this.props;

  	switch (getKYCsteps){
  	case "uploadStep1":
  		return this.uploadStep1();
  	case "uploadStep2":
  		return this.uploadStep2();
  	default:
  		return this.uploadStep1();
  	}
  }
	
	_handleSubmitIdAndSelfie = () => {
		const { actions,  profile: { doneUploadingId, doneUploadingSelfie },
			login: { session } } = this.props;
		const { kycInputs } = this.state;
		const error1 = {};

		if (_.isEmpty(doneUploadingSelfie)) {
			error1.doneUploadingSelfie = "Selfie photo is required";
		}

		if (_.isEmpty(error1)) {
			actions.verifyUploadIdSelfiePhoto(doneUploadingId, doneUploadingSelfie, kycInputs, session.token);
		} else {
			this.setState({error: error1});
		}
	}
	
	render(){
  	const { login: { getKYCVerification },
  		profile: { doneVerifyingUploadIdSelfiePhoto} } = this.props;
		const { idAndSelfieFirstTime } = this.state;
		

  	if (doneVerifyingUploadIdSelfiePhoto || !_.isEmpty(getKYCVerification.kyc1)) {
  		if (getKYCVerification.kyc1.status === "pending") {
  			return this.renderPending(idAndSelfieFirstTime);
			} else if (getKYCVerification.kyc1.status === "rejected"){
  			return this.renderReject(getKYCVerification.kyc1);
  		} else if (getKYCVerification.kyc1.status === "accepted"){
  			return this.renderDone();
  		}
  	}
		
  	return (
  		<View style={styles.flex1}>
  			{this.renderSteps()}
  		</View>
  	);
	}
}

UploadID.propTypes = {
	actions: PropTypes.object,
	profile: PropTypes.object,
	login: PropTypes.object,
	navigation: PropTypes.object,
};

