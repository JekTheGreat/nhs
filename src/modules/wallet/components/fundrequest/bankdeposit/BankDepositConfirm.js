/* eslint-disable import/default */
/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, ScrollView, TouchableOpacity,
	Alert, Image} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import _ from "lodash";
import Button from "__src/components/Button";
import styles from "../../../styles.css";
import TxtInput from "__src/components/TxtInput";
import DatePicker from "__src/components/datepicker";
import Loading from "__src/components/Loading";
import {Icon} from "react-native-elements";
import moment from "moment";
import ImagePicker from "react-native-image-picker";
const {Res, Color} = Resource;

const options = {
	title: "Select Avatar",
	customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
	storageOptions: {
		skipBackup: true,
		path: "images",
	},
};

export default class BankDepositConfirm extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			time: "",
			error: {},
		};
	}

	info = () => {
		const info = "Take a photo or upload clean and readable photo of your bank receipt." ;
			
		Alert.alert("Information", info);
	}

	openGalery = () => {
		const {actions} = this.props;

		ImagePicker.launchImageLibrary(options, (response) => {
			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log("User tapped custom button: ", response.customButton);
			} else {

				actions.uploadBankPaymentConfirmImage(response.uri);
				this.setState({error: {}});
			}
		});
	}

	openCamera = () => {
		const {actions} = this.props;
	
		ImagePicker.launchCamera(options, (response) => {
			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log("User tapped custom button: ", response.customButton);
			} else {
	
				actions.uploadBankPaymentConfirmImage(response.uri);
				this.setState({error: {}});
			}
		});
	}

	_handleChangeInput = (type) => (e) => {
		const {actions, wallet} = this.props;
		const { error } = this.state;
		const newInput = _.merge({}, wallet.confirmPaymentInput);

		switch (type){
		case "date":
			e = +moment(e);
			if (e > 0){
				delete error.date;
			} else {
				error.date = "This field is required.";
			}
			newInput.month = +moment(e);
			break;
		case "time":
			if (_.isEmpty(e)){
				error.time = "This field is required";
			} else {
				delete error.time;
			}
			this.setState({time: e});
			const split = e.split(/[ ,\/ :]/);
			newInput.hour = split[0];
			newInput.min = split[1];
			newInput.meridian = split[2];
			break;
		case "refNumber":
			if (_.isEmpty(e)){
				error.refNumber = "This field is required.";
			} else {
				delete error.refNumber;
			}

			newInput.refNumber = e;
			break;
		default:
			break;
		}

		actions.setConfirmPaymentInput(newInput);
	}

	_proceedToChooseMethod = () => {
		const { actions } = this.props;

		actions.setRequestScreen("bankDepositPayment");
	}

	renderSuccess =() => (
  	<View style={styles.renderSuccessWrapper}>
  		<View style={styles.flex1}>
  			<Text style={styles.txt1}>Payment Confirmation</Text>
  			<Text style={styles.txt2}>Successful!</Text>
  			<Image style={styles.img1} source={Res.get("check_icon")} resizeMode={"contain"} />
				<Text style={styles.txt3}>Amount will be received within 24 hours or once validation is completed.</Text>
				<Text style={styles.txt3_1}>Tracking Number:</Text>
				<Text style={styles.txt4}>
					{this.props.wallet.displayRequestSuccessModal}
				</Text>
  		</View>
  		<View style={styles.renderSuccessWrapper2}>
  			<TouchableOpacity onPress={this.handleCancelModal}>
  				<Text style={styles.txtok}>Ok</Text>
  			</TouchableOpacity>
  		</View>
  	</View>
	);

	uploadStep1 = () => {
		const { error} = this.state;
		const { wallet: { confirmPaymentInput,bankPaymentConfirmImg, uploadingBankPaymentConfirmImg, isRequestPaid} } = this.props;
		const avatar = bankPaymentConfirmImg ? {uri: bankPaymentConfirmImg} : Res.get("view_id");

		return (
			<ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} style={styles.flex1padH20marT10}>
				<Text style={styles.title}>Payment Confirmation</Text>
  			<Text style={styles.subtitle2}>Please enter transaction reference number as shown below</Text>
				<View style={styles.wrapper1}>
					{uploadingBankPaymentConfirmImg ? <Loading customStyle={styles.customStyle} size="small" color="white"/> : null}
					<TouchableOpacity >
						<Image style={styles.imgFile} source={avatar} resizeMode={"contain"} />
					</TouchableOpacity>
					<TouchableOpacity onPress={this.info} style={styles.btnInfo}>
						<Icon containerStyle={styles.padmar0} reverse name="info" color={Color.colorPrimary} size={14}/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.openCamera()}
						style={styles.btnCamera}>
						<Icon containerStyle={styles.padmar0} type="font-awesome" name="camera" color={Color.white} size={15}/>
						<Text style={styles.txtCamera}>Use Camera</Text>
					</TouchableOpacity>
				</View>
				{error.bankPaymentConfirmImg ?
					<Text style={styles.errStyle}>{error.bankPaymentConfirmImg}</Text> : null}

				<Text style={styles.txtOR}>OR</Text>
				<TouchableOpacity onPress={() => this.openGalery()}
					style={styles.btnClickToUpload}>
					<Image style={styles.imgUpload} source={Res.get("view_id")} resizeMode={"contain"} />
					<Text style={styles.txtUpload}>Click to Upload</Text>
				</TouchableOpacity>
		
				<TxtInput
					onChangeText={this._handleChangeInput("refNumber")}
  				onFocus={() => this.setState({FrefNum: true})}
  				onBlur={() => this.setState({FrefNum: false})}
  				isFocus={this.state.FrefNum}
  				value={confirmPaymentInput.refNumber}
  				returnKeyType='done'
  				err={error.refNumber}
  				label='Reference Number'
  				style={styles.marT15}/>

				<View style={styles.marT15}>
					<DatePicker
						date={_.has(confirmPaymentInput, "month") ? 
						moment(moment(confirmPaymentInput.month)).format("YYYY-MM-DD").toString() : ""}
						mode="date"
						label='Transaction Date'
						compName="Date"
						format="YYYY-MM-DD"
						err={error.date}
						onDateChange={this._handleChangeInput("date")}
					/>
				</View>

				<View style={styles.marT15}>
					<DatePicker
						date={this.state.time.toString()}
						mode="time"
						label='Transaction Time'
						compName="Date"
						format="hh:mm A"
						err={error.time}
						onDateChange={this._handleChangeInput("time")}
					/>
				</View>

				<View style={[styles.marB20, styles.marT30]}>
  					<Button
  						onPress={this._confirmPayment}
							style={styles.btnStyle2}
							loading={isRequestPaid}
  						label="Proceed"/>
  					<Button
  						onPress={this._proceedToChooseMethod}
  						style={styles.btnStyle3}
  						labelStyle={styles.btnLabelStyle}
  						label="Back"/>
  			</View>
			</ScrollView>
		);
	};

	_confirmPayment = () => {
		const {actions, login: {session}, wallet: {fundRequestResult, bankPaymentConfirmImg,
			confirmPaymentInput: {refNumber, month, hour, min, meridian }} } = this.props;
		const error1 = {};
		let plus12;
		let date;

		this.setState({ whatModal: "success" });

		if (_.isEmpty(refNumber)){
			error1.refNumber = "Reference number is required.";
		} else {
			delete error1.refNumber;
		}
	
		if (month > 0 ){
			delete error1.expiration;
		} else {
			error1.expiration = "This field is required.";
		}


		if (_.isEmpty(this.state.time) || _.isEmpty(hour) || _.isEmpty(min) || _.isEmpty(meridian)){
			error1.time = "This field is required";
		} else {
			delete error1.time;
		}

		if (_.isEmpty(bankPaymentConfirmImg)){
			error1.bankPaymentConfirmImg = "Image is required";
		} else {
			delete error1.bankPaymentConfirmImg;
		}
		date = +moment(month).hour(hour);
		date = +moment(date).minute(min);

		this.setState({ error: error1 });
		if (_.isEmpty(error1) && meridian === "AM") {
			const params = {
				transaction: fundRequestResult.transactionNumber,
				remarks: fundRequestResult.transactionNumber,
				bank: fundRequestResult.service,
				dateTime: `${moment(date).format("MM/DD/YYYY HH:mm")}`,
				amount: fundRequestResult.amount,
				referenceNumber: fundRequestResult.transactionNumber,
				receipt: bankPaymentConfirmImg,
				filename: `${fundRequestResult.transactionNumber}.jpg`
			}
			console.log("Params", params)
			actions.markPaidFundRequest(params, session.token);
		} else  if (_.isEmpty(error1) && meridian === "PM") {
			plus12 = +moment(date).add(12, "h");
			const params = {
				transaction: fundRequestResult.transactionNumber,
				remarks: fundRequestResult.transactionNumber,
				bank: fundRequestResult.service,
				dateTime: `${moment(plus12).format("MM/DD/YYYY HH:mm")}`,
				amount: fundRequestResult.amount,
				referenceNumber: fundRequestResult.transactionNumber,
				receipt: bankPaymentConfirmImg,
				filename: `${fundRequestResult.transactionNumber}.jpg`
			}

			console.log("Params", params)
			actions.markPaidFundRequest(params, session.token);
		}
	}

	handleCancelModal = () => {
		this.setState({ visible: false });
		const { actions } = this.props;
		const {wallet: {requestScreenHeader}} = this.props;

		requestScreenHeader.amount = false;
		requestScreenHeader.payment = false;

		actions.setRequestScreenHeader(requestScreenHeader);
		actions.resetRequest();
	}
	
	render(){
		const {wallet: {requestSuccess}} = this.props;

		if(requestSuccess){
			return this.renderSuccess();
		}
		
  	return (
  		<View style={styles.flex1}>
  			{this.uploadStep1()}
  		</View>
  	);
	}
}

BankDepositConfirm.propTypes = {
	actions: PropTypes.object,
	profile: PropTypes.object,
	login: PropTypes.object,
	wallet: PropTypes.object,
};

