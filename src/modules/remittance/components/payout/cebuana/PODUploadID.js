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
import * as globals from "__src/globals";
import {Icon} from "react-native-elements";
import _ from "lodash";
import ImagePicker from "react-native-image-picker";
import * as Animatable from "react-native-animatable";
const AnimatedScrollview = Animatable.createAnimatableComponent(ScrollView);
import Resources from "__src/resources";
const {Color, Res} = Resources;

const options = {
	title: "Choose method",
	storageOptions: {
		skipBackup: true,
		path: "images",
	},
};

class UploadID extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			idnumHolder: "",
			isHasExpired: true,
			error: {},
			rule: "",
		};
	}

	componentDidMount(){
		const {actions} = this.props;

		actions.getIdType();
	}

	componentDidUpdate(prevProps){
		const {actions, remittance: {checkIdRegister, inputPayoutDetails, AddNewID, AddNewIDFailed}} = this.props;

		if (!_.isEqual(prevProps.remittance.checkIdRegister, checkIdRegister) &&
		!_.isEmpty(checkIdRegister)){
			if (checkIdRegister.S === 1 && !_.isEmpty(checkIdRegister.D)){
				const newInput = _.merge({}, inputPayoutDetails);

				newInput.idtype = checkIdRegister.D[0].idType.id;
				newInput.description = checkIdRegister.D[0].idType.description;
				newInput.placeholder = checkIdRegister.D[0].idType.placeholder;
				newInput.expirable = checkIdRegister.D[0].idType.expirable;
				newInput.rule = checkIdRegister.D[0].idType.rule;
				newInput.id1 = checkIdRegister.D[0].id;

				newInput.idnumber = checkIdRegister.D[0].idNumber;
				newInput.idExpirationDate = checkIdRegister.D[0].expiry;
				actions.inputPayoutDetails(newInput);
				actions.clearUpload(checkIdRegister.D[0].attachment);
			}
		}

		if (!_.isEqual(prevProps.remittance.AddNewID, AddNewID) &&
		!_.isEmpty(AddNewID)){
			if (AddNewID.S === 1 && AddNewID.selection === "add"){
				Alert.alert(AddNewID.M);
				const newInput = _.merge({}, inputPayoutDetails);

				newInput.idtype = "";
				newInput.description = "";
				newInput.idnumber = "";
				newInput.idExpirationDate = "";
				actions.inputPayoutDetails(newInput);
				actions.clearUpload("");
			}
		}

		if (!_.isEqual(prevProps.remittance.AddNewID, AddNewID) &&
		!_.isEmpty(AddNewID)){
			if (AddNewID.S === 1 && AddNewID.selection === "selection"){
				Alert.alert(AddNewID.M);
				const newInput = _.merge({}, inputPayoutDetails);

				newInput.idtype = "";
				newInput.description = "";
				newInput.idnumber = "";
				newInput.idExpirationDate = "";
				actions.inputPayoutDetails(newInput);
				actions.clearUpload("");
			}
		}

		if (!_.isEqual(prevProps.remittance.AddNewIDFailed, AddNewIDFailed) &&
		!_.isEmpty(AddNewIDFailed)){
			if (AddNewIDFailed.S === 0){
				Alert.alert(AddNewIDFailed.M);
			}
		}

	}

  renderBase = () => {
  	const {remittance: {inputPayoutDetails}} = this.props;
		
  	return (
  		<DropDownItem base
  			placeHolder="-- Select --"
  			value={inputPayoutDetails.description} />
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
  	const {actions, remittance: {inputPayoutDetails, getPayoutDetail},
  		login: {additionalDetails}} = this.props;
  	const newInput = _.merge({}, inputPayoutDetails);

  	switch (type){
  	case "idtype":
  		newInput.idtype = value.id;
  		newInput.description = value.description;
  		newInput.placeholder = value.placeholder;
  		newInput.expirable = value.expirable;
  		newInput.rule = value.rule;

  		const param = {};

  		param.idType = value.id;
  		param.loyaltyNo = getPayoutDetail.D.sender.SenderClientID;
  		param.type = "PAYOUT";
  		param.userId = additionalDetails.id;
			
  		actions.checkIdRegister(param);
  		break;
  	case "idnumber":
  		newInput[type] = value;
  		break;
  	case "idExpirationDate":
  		newInput[type] = value;
  		break;
  	}
  	actions.inputPayoutDetails(newInput);
	}
	
	onProceed = () => {
		const {actions, remittance: {inputPayoutDetails, getPayoutDetail, 
			doneUploadId, checkIdRegister},
		login: {additionalDetails, currentAccount}} = this.props;
		const params = {}, error = {};

		if(_.isEmpty(inputPayoutDetails.idtype.toString())){
			error.idtype = "This field is required.";
		}else	if(_.isEmpty(inputPayoutDetails.idnumber)){
			error.idnumber = "This field is required.";
		}else	if(inputPayoutDetails.rule && _.isEmpty(inputPayoutDetails.idExpirationDate)){
			error.idExpirationDate = "This field is required.";
		}else	if(_.isEmpty(doneUploadId)){
			Alert.alert("Please provide an ID attachment.");
			error.doneUploadId = "Please provide an ID attachment.";
		}

		this.setState({error});

		if(_.isEmpty(error)){
			// params.userId = 24;
			params.userId = additionalDetails.id;
			params.accountId = currentAccount.id;
			params.idNumber = inputPayoutDetails.idnumber;

			if(_.has(checkIdRegister, "D") && !_.isEmpty(checkIdRegister.D)){
				const expiry = checkIdRegister.D[0].expiry;
				const attachment = checkIdRegister.D[0].attachment;

				if(_.isEqual(doneUploadId, attachment) && _.isEqual(inputPayoutDetails.idExpirationDate, expiry)){
					const senderName = `${getPayoutDetail.D.sender.SenderFirstName} ${getPayoutDetail.D.sender.SenderMiddleName} ${getPayoutDetail.D.sender.SenderLastName}`;
					const BeneficiaryName = `${getPayoutDetail.D.beneficiary.BeneficiaryFirstName} ${getPayoutDetail.D.beneficiary.BeneficiaryMiddleName} ${getPayoutDetail.D.beneficiary.BeneficiaryLastName}`;
					params.referenceNumber = inputPayoutDetails.reference;
					params.SenderClientID = getPayoutDetail.D.sender.SenderClientID;
					params.SenderClientNumber = getPayoutDetail.D.sender.SenderClientNumber;
					params.SenderName = senderName;
					params.BeneficiaryID = getPayoutDetail.D.beneficiary.BeneficiaryID;
					params.BeneficiaryName = BeneficiaryName;
					params.providerId = inputPayoutDetails.provId;
					params.id1 = inputPayoutDetails.id1;
					params.IdType = inputPayoutDetails.provId;
					params.walletId = currentAccount.wallet.id;
					params.serviceFee = getPayoutDetail.D.rates.ServiceFee;
					params.amount = getPayoutDetail.D.rates.PrincipalAmount;
					params.ciType = 0;
					params.company = "UPS";
					params.currency = getPayoutDetail.D.rates.SendCurrencyCode;

					actions.Payout(params);
				}else{
					params.attachment = doneUploadId;
					params.expiry = inputPayoutDetails.idExpirationDate;
					params.idType = inputPayoutDetails.idtype;
					params.loyaltyNo = getPayoutDetail.D.sender.SenderClientID;
					params.type = "PAYOUT";
					params.id = checkIdRegister.id;
					actions.RenewID(params);
				}

				return;
			}

			params.attachment = doneUploadId;
			params.expiry = inputPayoutDetails.idExpirationDate;
			params.idType = inputPayoutDetails.idtype;
			params.loyaltyNo = getPayoutDetail.D.sender.SenderClientID;
			params.type = "PAYOUT";
			params.provider = inputPayoutDetails.provId;
			actions.AddNewID(params);
		}
	}
  
  openGalery = (type) => {
  	const {actions, remittance: {inputPayoutDetails}} = this.props;
  	const newInput = _.merge({}, inputPayoutDetails);
  	// const error = {};

  	// if (_.isEmpty(idType)){
  	// 	error.idType = "Please pick an ID type first";
  	// 	this.setState({error});
			
  	// 	return;
  	// }

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

  			newInput[type] = fileupload;
				
  			actions.uploadIdPhoto(fileupload);
  		}
  	});
  }
	
	onBlur = () => {
		const {remittance: {inputPayoutDetails}} = this.props;
		const rule = _.has(inputPayoutDetails, "rule") ? inputPayoutDetails.rule.replace("/g", "").replace("/", "") : "";
		const ruleRegex = new RegExp(rule, "g");
		const error = {};

		if (!inputPayoutDetails.idnumber.match(ruleRegex)){
			error.idnumber = "Invalid format";
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
						source={{uri: this.transformImage(doneUploadId)}} resizeMode="contain" />
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

	transformImage = (photo) => {
		return globals.CloudUpload.imageTransform(
			photo, "c_fill,g_face,w_140,h_140");
	}

	_handleCancel = () => {
		const {actions} = this.props;

		actions.setPayoutChildScreen("summary");
	}

	render(){
  	const {remittance: {inputPayoutDetails, getIdType, isAddNewIDLoading, isTransactionLoad}} = this.props;
  	const {error} = this.state;
    
  	return (
  		<View style={styles.flex1marT30padH20}>
				<AnimatedScrollview animation="fadeInRight"
					showsVerticalScrollIndicator={false} style={styles.flex1}>

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
  					value={inputPayoutDetails.idnumber}
  					label='ID Number'
  					placeholder={`Ex. ${inputPayoutDetails.placeholder}`}
						style={styles.marT15}
						onBlur={this.onBlur}
  					err={error.idnumber}
  					onChangeText={this.onChangeText("idnumber")}
  				/>

  				{inputPayoutDetails.expirable ?
  					<View style={styles.marT15}>
  						<DatePicker
  							date={inputPayoutDetails.idExpirationDate}
  							mode="date"
  							label='Expiration Date'
  							compName="Date"
  							placeholder="YYYY-MM-DD"
  							format="YYYY-MM-DD"
  							err={error.idExpirationDate}
  							onDateChange={this.onChangeText("idExpirationDate")}
  						/>
  					</View> : null}
  			

  				<View style={styles.loadImage}>
						{this.loadImage()}
  				</View>
  				<Text style={styles.podTxt3}>jpeg, png file type only</Text>

  			</AnimatedScrollview>

  			<View style={styles.summaryBtnWrapper}>
  				<Button
						onPress={this.onProceed}
						loading={isAddNewIDLoading || isTransactionLoad}
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

UploadID.propTypes = {
	actions: PropTypes.object,
	remittance: PropTypes.object,
	login: PropTypes.object,
};

export default UploadID;
