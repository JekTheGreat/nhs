/* eslint-disable import/default */
/* eslint-disable no-nested-ternary */
// /* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-len */
// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, SafeAreaView, ScrollView,
	Image, TouchableOpacity, Alert, Linking} from "react-native";
import Button from "__src/components/Button.1";
import PropTypes from "prop-types";
import Detail from "__src/components/Detail";
import styles from "../../../styles.css";
import _ from "lodash";
import * as globals from "__src/globals";
import ImagePicker from "react-native-image-picker";
import Loading from "__src/components/Loading";
import {Icon} from "react-native-elements";
import Resources from "__src/resources";
import FullScreen from "__src/components/viewer/index";
import CustomAlert from "__src/components/CustomAlert";
import * as Animatable from "react-native-animatable";
const AnimatedScrollview = Animatable.createAnimatableComponent(ScrollView);
const {Color, Res} = Resources;

const options = {
	title: "Choose method",
	storageOptions: {
		skipBackup: true,
		path: "images",
	},
};

class PODSummary extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			error: {},
			isTranspassVisible: false,
			isImageVisible: false,
			status: "",
			message: "",
			setScreen: props.remittance.getPODdetails.D.status,
		};
	}

	componentDidUpdate(prevProps){
		const {remittance: {TransactionSuccess}} = this.props;

		if (prevProps.remittance.TransactionSuccess !== TransactionSuccess && !_.isEmpty(TransactionSuccess)){
			if (TransactionSuccess.S === 1 && TransactionSuccess.type === "pod"){
				this.setState({isTranspassVisible: true, status: "success"});
			} else if (TransactionSuccess.S === 0){
				this.setState({isTranspassVisible: true, status: "error", message: TransactionSuccess.M});
			}
		}
	}

	_handleCancel = () => {
		const {actions} = this.props;

		actions.resetRemittance();
	}

	onClose = () => {
		this.setState({isTranspassVisible: !this.state.isTranspassVisible});
	}

	onProceed = () => {
		const {actions, remittance: {doneUploadId, getPODdetails},
			login: {currentAccount, additionalDetails}} = this.props;
		const error = {}, params = {};

		if (_.isEmpty(doneUploadId)){
			Alert.alert("Please provide a POD attachment.");
			error.doneUploadId = "Please provide a POD attachment.";
		} else {
			params.userId = additionalDetails.id;
			params.accountId = currentAccount.id;
			params.attachment = doneUploadId;
			params.company = "UPS";
			params.podId = getPODdetails.D.id;
			params.transactionNumber = getPODdetails.D.transactionNumber;
			actions.PODPayout(params);
		}
	}

	onConfirm = () => {
		const {actions} = this.props;

		actions.resetRemittance();
	}

	renderTranspass = () => {
		const {isTranspassVisible, status, message} = this.state;
		
		return (
			<CustomAlert visible={isTranspassVisible}
				onCancel={this.onClose}
				onRequestClose={this.onClose}
				status={status}
				onPress={this.onConfirm}
				message={message}
			/>
		);
	}

	transformImage = (photo) => {
		return globals.CloudUpload.imageTransform(
			photo, "c_fill,g_face,w_140,h_140");
	}

	loadImage = () => {
		const {actions, remittance: {isUploadingId, doneUploadId}} = this.props;

		if (isUploadingId){
			return <Loading color={Color.Standard2} size="small"/>;
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

	openGalery = (type) => {
  	const {actions, remittance: {inputPOD}} = this.props;
  	const newInput = _.merge({}, inputPOD);
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

	renderMessage = () => {
		const {remittance: {getPODdetails}} = this.props;

		switch (getPODdetails.D.status){
		case "REJECTED":
			return "Sorry, Your payout transaction has been rejected. You may review your email for further information.";
		case "PENDING":
			return "";
		case "APPROVED":
			return "You can now proceed to upload the signed POD (Proof of Disbursment) to complete the transaction.";
		}
	}

	renderTitle = () => {
		const {remittance: {getPODdetails}} = this.props;

		switch (getPODdetails.D.status){
		case "REJECTED":
			return "Payout Rejected!";
		case "PENDING":
			return "Your request is currently in process.	Please wait for approval";
		case "APPROVED":
			return "Payout Approved!";
		}
	}

	podURL = () => {
		const {remittance: {getPODdetails}} = this.props;

		Linking.openURL(`http://10.10.1.201:1339/v3/remittance/receipt/payout/${getPODdetails.D.transactionNumber}`)
			.catch((err) => console.error("An error occurred", err));
	}

	renderDone = () => {
		const {remittance: {getPODdetails, inputPayoutDetails}} = this.props;
		const status = getPODdetails.D.status === "REJECTED" ? "ic_error" :
			(getPODdetails.D.status === "PENDING") ? "ic_warning" : "check_icon";

		return (
			<View style={styles.renderSuccessWrapper}>
				<ScrollView style={styles.flex1}>

					<Image style={styles.img1} source={Res.get(status)} resizeMode={"contain"} />
					<Text style={styles.txt3_1}>{this.renderTitle()}</Text>
					<Text style={styles.txtMessage}>{this.renderMessage()}</Text>
					<Detail horizontal label={"Referenc Number:"} value={getPODdetails.D.referenceNumber} />
					<Detail horizontal label={"Transaction:"} value={inputPayoutDetails.provName} />
					<Detail horizontal label={"Beneficiary:"} value={getPODdetails.D.beneficiaryName} />
				
					<View  style={styles.viewDivider}/>

					<Detail horizontal label={"Transferred Amount:"} value={`${getPODdetails.D.currency} ${getPODdetails.D.amount}`} />
					<Detail horizontal label={"Tracking Number:"} value={getPODdetails.D.transactionNumber} />
				</ScrollView>
				<View style={styles.summaryBtnWrapper}>
					<TouchableOpacity activeOpacity={0.7}
						onPress={this.podURL} style={styles.bottom}>
						<Image style={styles.imgqrdownload} source={Res.get("qr_download")}/>
						<Text style={styles.txtDownload}>Download a copy of your receipt</Text>
					</TouchableOpacity>
					<Button
						onPress={this._handleCancel}
  					label="Done"/>
					{getPODdetails.D.status === "REJECTED" ?
						<Button
							onPress={() => this.setState({setScreen: ""})}
							style={styles.btnCancel}
							style2={styles.btnCancel}
							label="Proceed to Upload POD"
							labelStyle={{color: Color.colorPrimaryDark}}/> : null}
				</View>
			</View>
		);
	}
	
	renderScreen = () => {
		const {setScreen} = this.state;
		switch (setScreen){
		case "REJECTED":
			return this.renderDone();
		case "PENDING":
			return this.renderDone();
		case "APPROVED":
			return this.renderDone();
		default:
			return this.renderSummary();
		}
	}

	Images = () => {
		const {remittance: {getPODdetails}} = this.props;

		const images = [
			{
				url: getPODdetails.D.attachment,
			},
		];
		
		return images;
	}

	renderSummary(){
		const {remittance: {getPODdetails, isTransactionLoad}} = this.props;

		// return this.renderDone();

		return (
			<View style={styles.flex1marT30padH20}>
				<AnimatedScrollview animation="fadeInRight"
					showsVerticalScrollIndicator={false} style={styles.flex1}>
					<Text style={[styles.txtheader, styles.marT20, styles.txtAlignLeft]}>
					Upload POD
					</Text>
					<Text style={[styles.txt2, styles.marT10]}>
					You may see your details below and upload your proof of disbursement
					</Text>
          
					<Text style={[styles.txt1, styles.marT20, styles.fontSize17]}>Transaction Details</Text>
					<Detail horizontal label={"Transaction Track No.:"} value={getPODdetails.D.transactionNumber} />
					<Detail horizontal label={"Reference No.:"} value={getPODdetails.D.referenceNumber} />
					<Detail horizontal label={"Sender Name:"} value={getPODdetails.D.senderName} />
					<Detail horizontal label={"Beneficiary:"} value={getPODdetails.D.beneficiaryName} />
					<Detail horizontal label={"Amount:"} value={getPODdetails.D.amount} />
					<View  style={styles.viewDivider}/>

					<Text style={[styles.txt1, styles.marT15, styles.fontSize17]}>ID Details</Text>
					<Detail horizontal label={"ID Type:"} value={getPODdetails.D.Ids.idType.description} />
					<Detail horizontal label={"ID Number:"} value={getPODdetails.D.Ids.idNumber} />
					<Detail horizontal label={"Expiration Date:"} value={getPODdetails.D.Ids.expiry} />
					<Detail horizontal label={"ID Image Uploaded:"} value={"Click here"}
					 valueStyle2={{color: Color.LightBlue}} onPressValue={() => this.setState({isImageVisible: true})}/>
					<View  style={styles.viewDivider}/>

					<Text style={styles.podTxt1}>Upload Image / File of Proof of Disbursement</Text>
					<View style={styles.podView1}>
						{this.loadImage()}
  				</View>
  				<Text style={[styles.podTxt3, styles.marB20]}>jpeg, png file type only</Text>

				</AnimatedScrollview>

				<View style={styles.summaryBtnWrapper}>
					<Button
						onPress={this.onProceed}
						style={styles.btnStyle}
						loading={isTransactionLoad}
						label="Proceed"/>

					<Button
						onPress={this._handleCancel}
						style={styles.btnCancel}
  					style2={styles.btnCancel}
						label="Back"
						labelStyle={{color: Color.colorPrimaryDark}}/>
				</View>
				{this.renderTranspass()}
				<FullScreen visible={this.state.isImageVisible}
					images={this.Images()}
					onRequestClose={() => this.setState({isImageVisible: false})}/>
				<SafeAreaView />
			</View>
		);
	}

	render(){
		return this.renderScreen();
	}
}

PODSummary.propTypes = {
	actions: PropTypes.object,
	remittance: PropTypes.object,
	login: PropTypes.object,
};

export default PODSummary;
