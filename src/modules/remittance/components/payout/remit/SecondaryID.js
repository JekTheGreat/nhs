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
import moment from "moment";
import ImagePicker from "react-native-image-picker";
import Resources from "__src/resources";
import * as Animatable from 'react-native-animatable';
const AnimatedScrollview = Animatable.createAnimatableComponent(ScrollView);
const {Color, Res} = Resources;

const options = {
	title: "Choose method",
	storageOptions: {
		skipBackup: true,
		path: "images",
	},
};

class SecondaryID extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			idnumHolder2: "",
			isHasExpired: true,
			disable: true,
			error: {},
			rule: "",
		};
	}

	componentDidMount(){
		const {actions, remittance: {inputPayoutDetails}} = this.props;

		actions.getIdType();
		const newInput = _.merge({}, inputPayoutDetails);

		newInput.idtype2 = "";
		newInput.description2 = "";
		newInput.placeholder2 = "";
		newInput.expirable2 = "";
		newInput.idnumber2 = "";
		newInput.idExpirationDate2 = "";
		actions.inputPayoutDetails(newInput);
		actions.clearSecondaryId("");
	}

	componentDidUpdate(prevProps){
		const {actions, remittance: {checkIdRegisterPayout, inputPayoutDetails, 
			AddNewPayoutIDFailed, checkIdRegisterPayoutFailed, AddNewPayoutID}} = this.props;

		if (!_.isEqual(prevProps.remittance.checkIdRegisterPayout, checkIdRegisterPayout) &&
		!_.isEmpty(checkIdRegisterPayout)){
			if (checkIdRegisterPayout.S === 1 && !_.isEmpty(checkIdRegisterPayout.D)){
				const newInput = _.merge({}, inputPayoutDetails);

				newInput.idtype2 = checkIdRegisterPayout.D[0].idType.id;
				newInput.description2 = checkIdRegisterPayout.D[0].idType.description;
				newInput.placeholder2 = checkIdRegisterPayout.D[0].idType.placeholder;
				newInput.expirable2 = checkIdRegisterPayout.D[0].idType.expirable;
				newInput.rule2 = checkIdRegisterPayout.D[0].idType.rule;
				newInput.id2 = checkIdRegisterPayout.D[0].id;
				this.setState({disable: false});

				newInput.idnumber2 = checkIdRegisterPayout.D[0].idNumber;
				newInput.idExpirationDate2 = checkIdRegisterPayout.D[0].expiry ;
				actions.inputPayoutDetails(newInput);
				actions.clearSecondaryId(checkIdRegisterPayout.D[0].attachment);
			}else{
				this.reset();
			}
		}

		if (!_.isEqual(prevProps.remittance.AddNewPayoutIDFailed, AddNewPayoutIDFailed) &&
		!_.isEmpty(AddNewPayoutIDFailed)){
			if (AddNewPayoutIDFailed.S === 0){
				Alert.alert("Notice",AddNewPayoutIDFailed.M, [{text: "OK", onPress: this.reset}]);
			}
		}
		if (!_.isEqual(prevProps.remittance.AddNewPayoutID, AddNewPayoutID) &&
		!_.isEmpty(AddNewPayoutID)){
			if (AddNewPayoutID.S === 1){
				Alert.alert("Notice",AddNewPayoutID.M, [{text: "OK", onPress: this.reset}]);
			}
		}
		if (!_.isEqual(prevProps.remittance.checkIdRegisterPayoutFailed, checkIdRegisterPayoutFailed) &&
			!_.isEmpty(checkIdRegisterPayoutFailed)){
			if (checkIdRegisterPayoutFailed.S === 0){
				this.reset();
			}
		}
	}

	reset = () => {
		const {remittance: {inputPayoutDetails}, actions} = this.props;

		this.setState({disable: true});
		const newInput = _.merge({}, inputPayoutDetails);

		newInput.idnumber2 = "";
		newInput.idExpirationDate2 = "";
		actions.inputPayoutDetails(newInput);
		actions.clearSecondaryId("");
	}

  renderBase = () => {
  	const {remittance: {inputPayoutDetails}} = this.props;
		
  	return (
  		<DropDownItem base
  			placeholder="-- Select --"
  			value={inputPayoutDetails.description2} />
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
  		newInput.idtype2 = value.id;
  		newInput.description2 = value.description;
  		newInput.placeholder2 = value.placeholder;
  		newInput.expirable2 = value.expirable;
  		newInput.rule2 = value.rule;

  		const params = {};
  		params.idType = value.id;
			params.birthdate = getPayoutDetail.D.beneficiary.DoB;
			params.firstName = getPayoutDetail.D.beneficiary.firstName;
			params.lastName = getPayoutDetail.D.beneficiary.lastName;
  		params.middleName = getPayoutDetail.D.beneficiary.middleName;
  		params.fullname = getPayoutDetail.D.beneficiary.fullname;
  		params.type = "PAYOUT";
			params.userId = additionalDetails.id;
			params.accountId = currentAccount.id;
			
  		actions.checkIdRegisterPayout(params);
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
			secondaryID, checkIdRegisterPayout},
		login: {additionalDetails, currentAccount}} = this.props;
		const params = {}, error = {};

		if(_.isEmpty(inputPayoutDetails.idtype2.toString())){
			error.idtype = "This field is required.";
		}else	if(_.isEmpty(inputPayoutDetails.idnumber2)){
			error.idnumber = "This field is required.";
		}else	if(inputPayoutDetails.rule2 && _.isEmpty(inputPayoutDetails.idExpirationDate2)){
			error.idExpirationDate = "This field is required.";
		}else	if(_.isEmpty(secondaryID)){
			Alert.alert("Notice", "Please provide an ID attachment.");
			error.secondaryID = "Please provide an ID attachment.";
		}else if(inputPayoutDetails.idtype === inputPayoutDetails.idtype2){
			Alert.alert("Notice", "Primary ID is same with Secondary ID. Please choose other id.");
			error.secondaryID = "Primary ID is same with Secondary ID. Please choose other id.";
		}

		this.setState({error});
		if(_.isEmpty(error)){
			
			// params.userId = 24;
			params.userId = additionalDetails.id;
			params.accountId = currentAccount.id;
			params.idNumber = inputPayoutDetails.idnumber2;
			params.provider = inputPayoutDetails.provId;
			params.attachment = secondaryID;
			params.selfie = secondaryID;
			params.expiry = inputPayoutDetails.idExpirationDate2;
			params.idType = inputPayoutDetails.idtype2;
			params.type = "PAYOUT";
			params.currency = "PHP";
			params.referenceNumber = inputPayoutDetails.reference;
			
			if(_.has(checkIdRegisterPayout, "D") && !_.isEmpty(checkIdRegisterPayout.D)){
				const expiry = checkIdRegisterPayout.D[0].expiry;
				const attachment = checkIdRegisterPayout.D[0].attachment;

				if(_.isEqual(secondaryID, attachment) && _.isEqual(inputPayoutDetails.idExpirationDate2, expiry)){
					actions.setPayoutChildScreen("summary");
				}else{
					params.id = checkIdRegisterPayout.D[0].id;
					actions.RenewPayoutID(params);
				}

				return;
			}

  		params.birthdate = getPayoutDetail.D.beneficiary.DoB;
			params.firstName = getPayoutDetail.D.beneficiary.firstName;
			params.lastName = getPayoutDetail.D.beneficiary.lastName;
  		params.middleName = getPayoutDetail.D.beneficiary.middleName;
  		params.fullname = getPayoutDetail.D.beneficiary.fullname;
			params.amount = getPayoutDetail.D.amount;

			actions.AddNewPayoutID(params);
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
				
  			actions.secondaryId(fileupload);
  		}
  	});
  }
	
	onBlur = () => {
		const {remittance: {inputPayoutDetails}} = this.props;
		const rule = _.has(inputPayoutDetails, "rule") ? inputPayoutDetails.rule2.replace("/g", "").replace("/", "") : "";
		const ruleRegex = new RegExp(rule, "g");
		const error = {};

		if (!inputPayoutDetails.idnumber2.match(ruleRegex)){
			error.idnumber = "Invalid format";
		}
		this.setState({error});
	}

	loadImage = () => {
		const {actions, remittance: {isUploadingSecondaryId, secondaryID}} = this.props;

		if (isUploadingSecondaryId){
			return <Loading color={Color.Standard2} />;
		} else if (!_.isEmpty(secondaryID)){
			return (
				<View style={styles.uploadView1}>
					<TouchableOpacity onPress={() => actions.clearSecondaryId("")} style={styles.btnClose}>
						<Icon name="close" color="red" size={25}/>
					</TouchableOpacity>
					<Image
						style={styles.uploadTxt1}
						source={{uri: this.transformImage(secondaryID)}} resizeMode="contain" />
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

		actions.setPayoutChildScreen("payoutid");
		actions.setPayoutScreen("selection");
	}

	render(){
  	const {remittance: {inputPayoutDetails, getIdType, isAddNewPayoutIDLoad, isTransactionLoad}} = this.props;
		const {error, disable} = this.state;
		console.log(disable);
    
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
  					value={inputPayoutDetails.idnumber2}
  					label='ID Number'
  					placeholder={`Ex. ${inputPayoutDetails.placeholder2}`}
						style={styles.marT15}
						style3={disable ? null : {borderBottomWidth: 0}}
						editable={disable}
						onBlur={this.onBlur}
  					err={error.idnumber}
  					onChangeText={this.onChangeText("idnumber")}
  				/>

  				{inputPayoutDetails.expirable2 ?
  					<View style={styles.marT15}>
  						<DatePicker
  							date={inputPayoutDetails.idExpirationDate2}
  							mode="date"
  							label='Expiration Date'
  							compName="Date"
  							placeholder="YYYY-MM-DD"
  							format="YYYY-MM-DD"
  							err={error.idExpirationDate}
  							onDateChange={this.onChangeText("idExpirationDate")}
  						/>
  					</View> : null}
  			
					<Text style={[styles.txtLabel2, styles.marT20]}>Upload Primary ID</Text>
  				<View style={styles.loadImage}>
						{this.loadImage()}
  				</View>
  				<Text style={[styles.podTxt3, styles.marT5, styles.marB20]}>jpeg, png file type only</Text>

  			</AnimatedScrollview>

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

SecondaryID.propTypes = {
	actions: PropTypes.object,
	remittance: PropTypes.object,
	login: PropTypes.object,
};

export default SecondaryID;
