/* eslint-disable import/default */
/* eslint-disable */
import React from "react";
import {View, SafeAreaView, ScrollView, Text, 
	Image, TouchableOpacity, Alert } from "react-native";
import Button from "__src/components/Button.1";
import TxtInput from "__src/components/TxtInput";
import DatePicker from "__src/components/datepicker";
import Dropdown from "__src/components/Dropdown";
import DropDownItem from "__src/components/DropDownItem";
import PropTypes from "prop-types";
import styles from "../../../styles.css";
import Loading from "__src/components/Loading";
import {Icon} from "react-native-elements";
import _ from "lodash";
import moment from "moment";
import ImagePicker from "react-native-image-picker";
import Resources from "__src/resources";
import * as Animatable from 'react-native-animatable';
const AnimatedScrollview = Animatable.createAnimatableComponent(ScrollView);
const {Color, Res} = Resources;

const options = {
	title: "Choose method",
	noData: true,
	quality: 0.7,
	storageOptions: {
		privateDirectory: true,
		skipBackup: true,
	},
};

class KYCSecondaryID extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			idnumHolder: "",
			isHasExpired: true,
			disable: false,
			error: {},
			rule: "",
			pin: ""
		};
	}

	componentDidMount(){
		const {actions, remittance: {inputDetails}, login: {session}} = this.props;

		actions.getIdType(session.token);
		const newInput = _.merge({}, inputDetails);

		newInput.idtype = "";
		newInput.description = "";
		newInput.placeholder = "";
		newInput.expirable = "";
		newInput.idnumber = "";
		newInput.idExpirationDate = "";
		actions.inputDetails(newInput);
		actions.clearUpload("");
		actions.clearUploadSelfie("");
	}

	componentDidUpdate(prevProps){
		const {actions, remittance: {checkIdRegister, inputDetails, AddNewID, AddNewIDFailed}} = this.props;

		if (!_.isEqual(prevProps.remittance.checkIdRegister, checkIdRegister) && !_.isEmpty(checkIdRegister)){
			if (checkIdRegister.S === 1 && !_.isEmpty(checkIdRegister.D)){
				this.setState({disable: true});
				const newInput = _.merge({}, inputDetails);

				newInput.idtype = checkIdRegister.D[0].idType.id;
				newInput.description = checkIdRegister.D[0].idType.description;
				newInput.placeholder = checkIdRegister.D[0].idType.placeholder;
				newInput.expirable = checkIdRegister.D[0].idType.expirable;
				newInput.rule = checkIdRegister.D[0].idType.rule;
				newInput.id2 = checkIdRegister.D[0].id;

				newInput.idnumber = checkIdRegister.D[0].idNumber;
				// newInput.idExpirationDate = moment(new Date(checkIdRegister.D[0].expiry)).format("YYYY-MM-DD") ;
				newInput.idExpirationDate = checkIdRegister.D[0].expiry ;
				actions.inputDetails(newInput);
				actions.clearUpload(checkIdRegister.D[0].attachment);
				actions.clearUploadSelfie(checkIdRegister.D[0].selfie);
			} else {
				this.setState({disable: false});
				const newInput = _.merge({}, inputDetails);

				newInput.idnumber = "";
				newInput.idExpirationDate = "";
				actions.inputDetails(newInput);
				actions.clearUpload("");
				actions.clearUploadSelfie("");
			}
		}

		if (!_.isEqual(prevProps.remittance.AddNewID, AddNewID) &&
		!_.isEmpty(AddNewID)){
			if (AddNewID.S === 1){
				const newInput = _.merge({}, inputDetails);

				newInput.id2 = AddNewID.D.id;
				actions.inputDetails(newInput);
				actions.clearUpload("");
				actions.clearUploadSelfie("");
			} else {
				const newInput = _.merge({}, inputDetails);

				newInput.idnumber = "";
				newInput.idExpirationDate = "";
				actions.inputDetails(newInput);
				actions.clearUpload("");
				actions.clearUploadSelfie("");
			}
		}

		if (!_.isEqual(prevProps.remittance.AddNewIDFailed, AddNewIDFailed) &&
		!_.isEmpty(AddNewIDFailed)){
			// if (AddNewIDFailed.S === 0){
				Alert.alert(AddNewIDFailed);
			// }
		}

	}

  renderBase = () => {
  	const {remittance: {inputDetails}} = this.props;
		
  	return (
  		<DropDownItem base
  			placeholder="-- Select --"
  			value={inputDetails.description} />
  	);
  }
  
	renderRow = (rowData, rowID, highlighted) => {
		return (
			<DropDownItem row
				rowData={rowData.description}
				highlighted={highlighted} />
		);
	}
  
  onChangeText = (type) => (value) => {
  	const {actions, remittance: {inputDetails},
  		login: {additionalDetails, currentAccount}} = this.props;
  	const newInput = _.merge({}, inputDetails);

  	switch (type){
  	case "idtype":
  		newInput.idtype = value.id;
  		newInput.description = value.description;
  		newInput.placeholder = value.placeholder;
  		newInput.expirable = value.expirable;
  		newInput.rule = value.rule;

  		const param = {};

  		param.accountId = currentAccount.id;
  		param.birthdate = inputDetails.Sender.DoB;
  		param.fullname = inputDetails.Sender.fullname.trim();
  		param.idType = value.id;
  		param.type = "SEND";
			param.userId = additionalDetails.id;
			
  		actions.checkIdRegisterSend(param);
  		break;
  	case "idnumber":
  		newInput[type] = value;
  		break;
  	case "idExpirationDate":
			console.log("idExpirationDate", typeof value);
  		newInput[type] = value;
  		break;
  	}
  	actions.inputDetails(newInput);
	}

	getScreen = (num) => {
		const {remittance: { setSelectedScreen, selectProvider } } = this.props;
		const index = _.findIndex(selectProvider, {value: setSelectedScreen});

		return selectProvider[index + num].value;
	}
	
	onProceed = () => {
		const {actions, remittance: {inputDetails, doneUploadSelfie, 
			doneUploadId, checkIdRegister, setSelectedScreen},
		login: {additionalDetails, currentAccount, session}} = this.props;
		const params = {}, error = {};

		if(_.isEmpty(inputDetails.idtype.toString())){
			error.idtype = "This field is required.";
		}else	if(_.isEmpty(inputDetails.idnumber)){
			error.idnumber = "This field is required.";
		}else	if(inputDetails.rule && _.isEmpty(inputDetails.idExpirationDate) && inputDetails.expirable){
			error.idExpirationDate = "This field is required.";
		}else	if(_.isEmpty(doneUploadId)){
			Alert.alert("Please provide an ID attachment.");
			error.doneUploadId = "Please provide an ID attachment.";
		}else if(_.isEqual(inputDetails.id1, inputDetails.id2)){
			error.idtype = " ";
			Alert.alert("Notice",`This ${inputDetails.idnumber} is used as primary id. Please choose other`);
		}

		this.setState({error});

		if(_.isEmpty(error)){
			params.userId = additionalDetails.id;
			params.accountId = currentAccount.id;
			params.idNumber = inputDetails.idnumber;
			params.provider = inputDetails.provId;
			params.attachment = doneUploadId;
			params.selfie = doneUploadSelfie;
			params.expiry = inputDetails.idExpirationDate;
			params.idType = inputDetails.idtype;
			params.loyaltyNo = inputDetails.Sender.loyaltyNo;
			params.type = "SEND";
			params.amount = inputDetails.amount;
			params.currency = "PHP";
			params.referenceNumber = "";
			params.kycType = setSelectedScreen;

			if(_.has(checkIdRegister, "D") && !_.isEmpty(checkIdRegister.D)){
				const expiry = checkIdRegister.D[0].expiry;
				const attachment = checkIdRegister.D[0].attachment;
				const selfie = checkIdRegister.D[0].selfie;

				if(_.isEqual(doneUploadId, attachment) && _.isEqual(inputDetails.idExpirationDate, expiry) &&
					 _.isEqual(doneUploadSelfie, selfie)){
					actions.setSelectedScreen(this.getScreen(+1));
				}else{
					params.id = checkIdRegister.D[0].id;

					if(_.isEqual(doneUploadId, attachment) && _.isEqual(doneUploadSelfie, selfie)){
						actions.RenewID(params, session.token, this.getScreen(+1));
					}else{
						actions.RenewIDWithUpload(params, session.token, this.getScreen(+1));
					}
				}
				return;
			}

			params.birthdate = inputDetails.Sender.DoB;
			params.firstName = inputDetails.Sender.firstName;
			params.middleName = inputDetails.Sender.middleName;
			params.lastName = inputDetails.Sender.lastName;
			params.fullname = inputDetails.Sender.fullname;
			actions.AddNewID(params, session.token, this.getScreen(+1));
		}
	}
  
  openGalery = (type) => {
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
				
				if(type === "selfie"){
					actions.uploadSelfiePhoto(response.uri);
				}else{
					actions.uploadIdPhoto(response.uri);
				}
  		}
  	});
  }
	
	onBlur = () => {
		const {remittance: {inputDetails}} = this.props;
		const rule = _.has(inputDetails, "rule") ? inputDetails.rule.replace("/g", "").replace("/", "") : "";
		const ruleRegex = new RegExp(rule, "g");
		const error = {};

		if(!_.isEmpty(inputDetails.idnumber)){
			if (!inputDetails.idnumber.match(ruleRegex)){
				error.idnumber = "Invalid format";
			}
		}
	
		this.setState({error});
	}

	loadImage = () => {
		const {actions, remittance: {isUploadingId, doneUploadId}} = this.props;

		if (isUploadingId){
			return <Loading color={Color.Standard2} />;
		} else if (!_.isEmpty(doneUploadId)){
			return (
				<View style={styles.uploadView1}>
					<TouchableOpacity onPress={() => actions.clearUpload("")} style={styles.btnClose}>
						<Icon name="close" color="red" size={25}/>
					</TouchableOpacity>
					<Image
						style={styles.uploadTxt1}
						source={{uri: doneUploadId}} resizeMode="contain" />
				</View>
			);
		}
		
		return (
			<TouchableOpacity style={styles.mar20} activeOpacity={0.8} onPress={this.openGalery}>
				<Image style={styles.podImage1} source={Res.get("ic_upload")} resizeMode="contain" />
				<Text style={styles.podTxt2}>Click to upload file</Text>
			</TouchableOpacity>
		);
	}

	loadImageSelfie = () => {
		const {actions, remittance: {isUploadingSelfie, doneUploadSelfie}} = this.props;

		if (isUploadingSelfie){
			return <Loading color={Color.Standard2} />;
		} else if (!_.isEmpty(doneUploadSelfie)){
			return (
				<View style={styles.uploadView1}>
					<TouchableOpacity onPress={() => actions.clearUploadSelfie("")} style={styles.btnClose}>
						<Icon name="close" color="red" size={25}/>
					</TouchableOpacity>
					<Image
						style={styles.uploadTxt1}
						source={{uri: doneUploadSelfie}} resizeMode="contain" />
				</View>
			);
		}
		
		return (
			<TouchableOpacity style={styles.mar20} activeOpacity={0.8} onPress={() => this.openGalery("selfie")}>
				<Image style={styles.podImage1} source={Res.get("ic_upload")} resizeMode="contain" />
				<Text style={styles.podTxt2}>Click to upload file</Text>
			</TouchableOpacity>
		);
	}

	_handleCancel = () => {
		const {actions} = this.props;

		actions.setSelectedScreen(this.getScreen(-1));
	}

	render(){
		const {remittance: {inputDetails, getIdType, isAddNewIDLoading, 
			isCheckingID, isTransactionLoad}} = this.props;
		const {error, disable} = this.state;
		    
  	return (
  		<View style={styles.flex1marT30padH20}>
  			<AnimatedScrollview animation="fadeInRight" showsVerticalScrollIndicator={false} style={styles.flex1}>
  				<View style={styles.marT20}>
  					<Text style={[styles.labelStyle]}>Select ID Type</Text>
  					<Dropdown
  						animated={false}
  						showsVerticalScrollIndicator={false}
  						renderBase={this.renderBase}
  						dropdownStyle={styles.dropDownStyle}
  						options={getIdType}
  						renderButtonText={this.onChangeText("idtype")}
  						renderRow={this.renderRow}
  						renderSeparator={null} />
  					{error.idtype ? <Text style={styles.txtError}>{error.idtype}</Text> : null}
  				</View>

  				<TxtInput
  					value={inputDetails.idnumber}
  					label='ID Number'
  					placeholder={`Ex. ${inputDetails.placeholder}`}
						style={styles.marT15}
						style3={disable ? {borderBottomWidth: 0} : null}
						editable={!disable}
						onBlur={this.onBlur}
  					err={error.idnumber}
  					onChangeText={this.onChangeText("idnumber")}
  				/>

  				{inputDetails.expirable ?
  					<View style={styles.marT15}>
  						<DatePicker
  							date={inputDetails.idExpirationDate}
  							mode="date"
  							label='Expiration Date'
  							compName="Date"
								placeholder="MM-DD-YYYY"
								minDate={moment().format("MM-DD-YYYY")}
  							format="MM-DD-YYYY"
  							err={error.idExpirationDate}
  							onDateChange={this.onChangeText("idExpirationDate")}
  						/>
  					</View> : null}
  			

					<Text style={[styles.txtLabel2, styles.marT20]}>Upload Primary ID</Text>
  				<View style={styles.loadImage}>
						{this.loadImage()}
  				</View>
  				<Text style={styles.podTxt3}>jpeg, png file type only</Text>

					<Text style={[styles.txtLabel2, styles.marT20]}>Selfie Picture</Text>
					<View style={styles.loadImage}>
						{this.loadImageSelfie()}
  				</View>
  				<Text style={[styles.podTxt3, styles.marB20]}>jpeg, png file type only</Text>
  			</AnimatedScrollview>

  			<View style={styles.summaryBtnWrapper}>
  				<Button
						onPress={this.onProceed}
						loading={isAddNewIDLoading || isTransactionLoad || isCheckingID}
  					label="Proceed"/>

  				<Button
  					onPress={this._handleCancel}
  					style={styles.btnCancel}
  					style2={styles.btnCancel}
  					label="Back"
  					labelStyle={{color: Color.colorPrimaryDark}}/>
  			</View>
  			<SafeAreaView />
  		</View>
  	);
	}
}

KYCSecondaryID.propTypes = {
	actions: PropTypes.object,
	remittance: PropTypes.object,
	login: PropTypes.object,
};

export default KYCSecondaryID;
