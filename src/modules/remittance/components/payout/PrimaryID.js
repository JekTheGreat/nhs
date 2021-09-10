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
import styles from "../../styles.css";
import Loading from "__src/components/Loading";
import * as globals from "__src/globals";
import {Icon} from "react-native-elements";
import _ from "lodash";
import moment from "moment";
import ImagePicker from "react-native-image-picker";
import Resources from "__src/resources";
const {Color, Res} = Resources;

const options = {
	title: "Choose method",
	storageOptions: {
		skipBackup: true,
		path: "images",
	},
};

class PrimaryID extends React.PureComponent{
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
		const {actions, remittance: {inputPayoutDetails}} = this.props;

		actions.getIdTypePayout();
		const newInput = _.merge({}, inputPayoutDetails);

		newInput.idtype = "";
		newInput.description = "";
		newInput.idnumber = "";
		newInput.placeholder = "";
		newInput.idExpirationDate = "";
		actions.clearUpload("");
		actions.inputPayoutDetails(newInput);
	}

	getScreen = (num) => {
		const {remittance: { setPayoutScreen, selectPayoutProvider } } = this.props;
		const index = _.findIndex(selectPayoutProvider, {value: setPayoutScreen});

		return selectPayoutProvider[index + num].value;
	}

	componentDidUpdate(prevProps){
		const {actions, remittance: {checkIdRegisterPayout, inputPayoutDetails, AddNewPayoutID, AddNewPayoutIDFailed}} = this.props;

		if (!_.isEqual(prevProps.remittance.checkIdRegisterPayout, checkIdRegisterPayout) &&
		!_.isEmpty(checkIdRegisterPayout)){
			if (checkIdRegisterPayout.S === 1 && !_.isEmpty(checkIdRegisterPayout.D)){
				const newInput = _.merge({}, inputPayoutDetails);

				newInput.idtype = checkIdRegisterPayout.D[0].idType.id;
				newInput.description = checkIdRegisterPayout.D[0].idType.description;
				newInput.placeholder = checkIdRegisterPayout.D[0].idType.placeholder;
				newInput.expirable = checkIdRegisterPayout.D[0].idType.expirable;
				newInput.rule = checkIdRegisterPayout.D[0].idType.rule;
				newInput.id1 = checkIdRegisterPayout.D[0].id;

				newInput.idnumber = checkIdRegisterPayout.D[0].idNumber;
				newInput.idExpirationDate = checkIdRegisterPayout.D[0].expiry;
				actions.inputPayoutDetails(newInput);
				actions.clearUpload(checkIdRegisterPayout.D[0].attachment);
			} else {
				const newInput = _.merge({}, inputPayoutDetails);

				newInput.idnumber = "";
				newInput.idExpirationDate = "";
				actions.inputPayoutDetails(newInput);
				actions.clearUpload("");
				actions.clearUploadSelfie("");
			}
		}

		if (!_.isEqual(prevProps.remittance.AddNewPayoutID, AddNewPayoutID) &&
		!_.isEmpty(AddNewPayoutID)){
			if (AddNewPayoutID.S === 1){
				const newInput = _.merge({}, inputPayoutDetails);

				newInput.idtype = "";
				newInput.description = "";
				newInput.idnumber = "";
				newInput.placeholder = "";
				newInput.idExpirationDate = "";
				newInput.id1 = AddNewPayoutID.D.id;
				actions.inputPayoutDetails(newInput);
				actions.clearUpload("");
				actions.clearUploadSelfie("");
				actions.setPayoutScreen(this.getScreen(+1));
			}
		}

		if (!_.isEqual(prevProps.remittance.AddNewPayoutIDFailed, AddNewPayoutIDFailed) &&
		!_.isEmpty(AddNewPayoutIDFailed)){
			if (AddNewPayoutIDFailed.S === 0){
				Alert.alert(AddNewPayoutIDFailed.M);
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
  		login: {additionalDetails, currentAccount}} = this.props;
  	const newInput = _.merge({}, inputPayoutDetails);

  	switch (type){
  	case "idtype":
  		newInput.idtype = value.id;
  		newInput.description = value.description;
  		newInput.placeholder = value.placeholder;
  		newInput.expirable = value.expirable;
  		newInput.rule = value.rule;

  		const param = {};
			param.accountId = currentAccount.id;
			param.birthdate = getPayoutDetail.D.beneficiary.DoB;
			param.fullname = getPayoutDetail.D.beneficiary.fullname;
			param.idType = value.id;
			param.type = "PAYOUT";
			param.userId = additionalDetails.individualId;
			
  		actions.checkIdRegisterPayout(param);
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
			doneUploadId, checkIdRegisterPayout, doneUploadSelfie, setPayoutScreen},
		login: {additionalDetails, currentAccount, session}} = this.props;
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
			params.userId = additionalDetails.individualId;
			params.accountId = currentAccount.id;
			params.idNumber = inputPayoutDetails.idnumber;
			params.provider = inputPayoutDetails.provId;
			params.attachment = doneUploadId;
			params.selfie = doneUploadId;
			params.expiry = inputPayoutDetails.idExpirationDate;
			params.idType = inputPayoutDetails.idtype;
			// params.loyaltyNo = getPayoutDetail.D.beneficiary.loyaltyNo;
			params.type = "PAYOUT";
			params.amount = getPayoutDetail.D.amount;
			params.currency = "PHP";
			params.referenceNumber = getPayoutDetail.D.referenceNumber;
			params.kycType = setPayoutScreen;
			// if(_.has(checkIdRegisterPayout, "D") && !_.isEmpty(checkIdRegisterPayout.D)){
			// 	const expiry = checkIdRegisterPayout.D[0].expiry;
			// 	const attachment = checkIdRegisterPayout.D[0].attachment;

			// 	if(_.isEqual(doneUploadId, attachment) && _.isEqual(inputPayoutDetails.idExpirationDate, expiry)){
			// 		const senderName = `${getPayoutDetail.D.sender.SenderFirstName} ${getPayoutDetail.D.sender.SenderMiddleName} ${getPayoutDetail.D.sender.SenderLastName}`;
			// 		const BeneficiaryName = `${getPayoutDetail.D.beneficiary.BeneficiaryFirstName} ${getPayoutDetail.D.beneficiary.BeneficiaryMiddleName} ${getPayoutDetail.D.beneficiary.BeneficiaryLastName}`;
			// 		params.referenceNumber = inputPayoutDetails.reference;
			// 		params.SenderClientID = getPayoutDetail.D.sender.SenderClientID;
			// 		params.SenderClientNumber = getPayoutDetail.D.sender.SenderClientNumber;
			// 		params.SenderName = senderName;
			// 		params.BeneficiaryID = getPayoutDetail.D.beneficiary.BeneficiaryID;
			// 		params.BeneficiaryName = BeneficiaryName;
			// 		params.providerId = inputPayoutDetails.provId;
			// 		params.id1 = inputPayoutDetails.id1;
			// 		params.IdType = inputPayoutDetails.provId;
			// 		params.walletId = currentAccount.wallet.id;
			// 		params.serviceFee = getPayoutDetail.D.rates.ServiceFee;
			// 		params.amount = getPayoutDetail.D.rates.PrincipalAmount;
			// 		params.ciType = 0;
			// 		params.company = "UPS";
			// 		params.currency = getPayoutDetail.D.rates.SendCurrencyCode;

			// 		actions.Payout(params);
			// 	}else{
			// 		params.attachment = doneUploadId;
			// 		params.expiry = inputPayoutDetails.idExpirationDate;
			// 		params.idType = inputPayoutDetails.idtype;
			// 		params.loyaltyNo = getPayoutDetail.D.sender.SenderClientID;
			// 		params.type = "PAYOUT";
			// 		params.id = checkIdRegisterPayout.id;
			// 		actions.RenewID(params);
			// 	}

			// 	return;
			// }
			if(_.has(checkIdRegisterPayout, "D") && !_.isEmpty(checkIdRegisterPayout.D)){
				const idNumber = checkIdRegisterPayout.D[0].idNumber;
				const expiry = checkIdRegisterPayout.D[0].expiry;
				const attachment = checkIdRegisterPayout.D[0].attachment;

				if(_.isEqual(doneUploadId, attachment) && _.isEqual(inputPayoutDetails.idExpirationDate, expiry) 
					&& _.isEqual(inputPayoutDetails.idnumber, idNumber)){
					actions.setPayoutScreen(this.getScreen(+1));
				}else{
					params.id = checkIdRegisterPayout.D[0].id;

					if(_.isEqual(doneUploadId, attachment)){
						actions.RenewPayoutID(params, session.token);
					}else{
						actions.RenewPayoutIDWithUpload(params, session.token);
					}
				}
				return;
			}

			params.birthdate = getPayoutDetail.D.beneficiary.DoB;
			params.firstName = getPayoutDetail.D.beneficiary.firstName;
			params.middleName = getPayoutDetail.D.beneficiary.middleName;
			params.lastName = getPayoutDetail.D.beneficiary.lastName;
			params.fullname = getPayoutDetail.D.beneficiary.fullname;

			actions.AddNewPayoutID(params, session.token);
		}
	}
  
  openGalery = (type) => {
  	const {actions, remittance: {inputPayoutDetails}} = this.props;
  	const newInput = _.merge({}, inputPayoutDetails);

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
				
  			actions.uploadIdPhoto(response.uri);
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

		// actions.setPayoutChildScreen("summary");
		actions.setPayoutScreen(this.getScreen(-1));
	}

	render(){
  	const {remittance: {inputPayoutDetails, getIdTypePayout, isAddNewPayoutIDLoad, isTransactionLoad}} = this.props;
  	const {error} = this.state;
    
  	return (
  		<View style={styles.flex1marT30padH20}>
  			<ScrollView showsVerticalScrollIndicator={false} style={styles.flex1}>

  				<View style={styles.marT20}>
  					<Text style={[styles.labelStyle]}>Select ID Type</Text>
  					<Dropdown
  						animated={false}
  						showsVerticalScrollIndicator={false}
  						renderBase={this.renderBase}
  						dropdownStyle={styles.dropDownStyle}
  						options={getIdTypePayout}
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
								placeholder="MM-DD-YYYY"
								minDate={moment().format("MM-DD-YYYY")}
  							format="MM-DD-YYYY"
  							err={error.idExpirationDate}
  							onDateChange={this.onChangeText("idExpirationDate")}
  						/>
  					</View> : null}
  			

  				<View style={styles.loadImage}>
						{this.loadImage()}
  				</View>
  				<Text style={styles.podTxt3}>jpeg, png file type only</Text>

  			</ScrollView>

  			<View style={styles.summaryBtnWrapper}>
  				<Button
						onPress={this.onProceed}
						loading={isAddNewPayoutIDLoad || isTransactionLoad}
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

PrimaryID.propTypes = {
	actions: PropTypes.object,
	remittance: PropTypes.object,
	login: PropTypes.object,
};

export default PrimaryID;
