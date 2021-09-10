/* eslint-disable */
import React from "react";
import {View, Text, SafeAreaView, Image, ScrollView, Alert} from "react-native";
import Button2 from "__src/components/Button.1";
import PropTypes from "prop-types";
import TxtInput from "__src/components/TxtInput";
import Dropdown from "__src/components/Dropdown";
import TransPass from "__src/components/TransPass";
import {Icon} from "react-native-elements";
import _ from "lodash";
import styles from "../../styles.css";
import CebuanaScreen from "./cebuana/CebuanaScreen";
import RemitScreen from "./remit/RemitScreen"
import Resources from "__src/resources";
const {Color, Res} = Resources;

class Selection extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			provider: "",
			isVisible: false,
			error: {},
		};
	}

	componentDidMount(){
		const {actions, login: {session}} = this.props;

		actions.fetchProviderPayout(session.token);
	}

	componentDidUpdate(prevProps){
		const { actions, remittance: { getPayoutDetail } } = this.props;

		if (prevProps.remittance.getPayoutDetail !== getPayoutDetail && getPayoutDetail){
			if (getPayoutDetail.type === "selection"){
				actions.setPayoutScreen("kycId1");
				// actions.setPayoutScreen(this.getScreen(+1));
			}
		}
	}

	getScreen = (num) => {
		const {remittance: { setPayoutScreen, selectPayoutProvider } } = this.props;
		const index = _.findIndex(selectPayoutProvider, {value: setPayoutScreen});

		return selectPayoutProvider[index + num].value;
	}

	renderBase = () => {
		const {remittance: {inputPayoutDetails}} = this.props;
		const color = inputPayoutDetails.provName ? null : Color.Standard;
		
		return (
			<View style={styles.renderBaseWrapper}>
				<Text style={[styles.input, {color}]}>
					{inputPayoutDetails.provName || "-- Select Partner --"}
				</Text>
				<Image source={{uri: inputPayoutDetails.logo}} style={{width: 60, height: 30}} 
					resizeMode="stretch"/>
				<Icon name='arrow-drop-down' color="black" size={27} />
			</View>
		);
	}
  
	renderRow = (rowData, rowID, highlighted) => {
		return (
			<View style={[styles.renderRow, highlighted && {backgroundColor: Color.highlight}]}>
				<Text style={[styles.renderRowTxt,
					highlighted && styles.highlighted ]}>
					{rowData.name}
				</Text>
				<Image source={{uri: rowData.logo}} style={{width: 60, height: 30}} 
					resizeMode="stretch"/>
			</View>
		);
	}

	onChangeText = (type) => (value) => {
		const {actions, remittance: {inputPayoutDetails}, wallet: {walletSelected}} = this.props;
		const newInput = _.merge({}, inputPayoutDetails);
		const error = {};

		switch (type){
		case "reference":
			if (_.isEmpty(value)){
				error.err = "Reference is required.";
			}

			newInput[type] = value.trim();
			break;

		case "provider":
			if (_.isEmpty(value)){
				error.err = "Provider is required.";
			}

			newInput.provId = value.id;
			newInput.provName = value.name;
			newInput.code = walletSelected.code;
			newInput.api = value.api;
			newInput.logo = value.logo;

			if(value.api.startsWith("v3/remittance")){
				const split = _.split(value.api, "v3/remittance");
				newInput.api = split[1];
			}else{
				newInput.api = value.api;
			}
			break;
		}

		actions.inputPayoutDetails(newInput);
		this.setState({error});
	}

	_handleOk = () => {
		const { actions, remittance: { inputPayoutDetails },
			login: {additionalDetails, currentAccount, session} } = this.props;
		const error = {};

		if (_.isEmpty(inputPayoutDetails.provName)){
			error.err = "All field is required.";
		} else if (_.isEmpty(inputPayoutDetails.reference)){
			error.err = "All field is required.";
		}

		this.setState({error});

		if (_.isEmpty(error)){
			const params = {
				accountId: currentAccount.id,
				company: "UPS",
				provider: inputPayoutDetails.provId,
				provname: inputPayoutDetails.provName,
				referenceNumber: inputPayoutDetails.reference,
				userId: additionalDetails.id,
			};

			actions.getPayoutInfo(params, session.token);
		}
	}

	renderError = () => {
		const {error} = this.state;
		const {remittance: {getPayoutDetailFailed}} = this.props;

		if (!_.isEmpty(error) || !_.isEmpty(getPayoutDetailFailed)){
			return (
				<View style={styles.inpuView1}>
					<Icon containerStyle={styles.iconContainerStyle}
						name='close-circle' type="material-community" color={Color.red} size={15} />
					<Text style={[styles.txt3, {color: Color.red}, styles.flex1]}>
						{error.err || getPayoutDetailFailed}</Text>
				</View>
			);
		}
		
		return null;
	}

	onProceed = () => {
		const {actions, login: {currentAccount, additionalDetails},
			remittance: {inputPOD}} = this.props;
		const param = {};
		const error = {};

		if (_.isEmpty(inputPOD.trackingNumber)){
			error.trackingNumber = "This field is required.";
		}

		this.setState({error});

		if (_.isEmpty(error)){
			param.accountId = currentAccount.id;
			param.transactionNumber = inputPOD.trackingNumber;
			param.userId = additionalDetails.id;
			actions.getPODdetails(param);
		}
	}

	onChangeTextPOD = (value) => {
		const {actions, remittance: {inputPOD}} = this.props;
		const newItem = _.merge({}, inputPOD);
		const error = {};

		if (_.isEmpty(value)){
			error.trackingNumber = "This field is required.";
		}

		newItem.trackingNumber = value.trim();
		this.setState({error});

		if (_.isEmpty(error)){
			actions.inputPOD(newItem);
		}
	}

	renderTransPass = () => {
		const {remittance: {inputPOD, isPODLoad, getPODdetails}} = this.props;
		const {error} = this.state;

		return (
			<TransPass title="Proof of Disbursement"
				subtitle="Please enter your tracking number below"
				placeholder="Enter tracking number"
				onProceed={this.onProceed}
				onCancel={() => this.setState({isVisible: false})}
				visible={this.state.isVisible}
				value={inputPOD.trackingNumber}
				isLoad={isPODLoad ? "Loading" : null}
				onRequestClose={() => this.setState({isVisible: false})}
				onChangeText={this.onChangeTextPOD}
				error={error.trackingNumber || getPODdetails.M}
				 />
		);
	}

	render(){
		const {remittance: {fetchPayoutProvider, isTransactionLoad, inputPayoutDetails}, navigation} = this.props;

		return (
			<ScrollView style={styles.flex1marT30padH20}>
				<View style={styles.flex1}>
				<Text style={[styles.labelStyle, styles.marT10, 
					{fontWeight: "bold", fontSize: 19}]}>
					Fast, safe and convenient way of sending money.
				</Text>
				<Text style={[styles.labelStyle, styles.marT5]}>
					Transfer and get your cash instantly through our accredited 
					remittance partners and outlets nationwide.</Text>

					<View style={styles.marT20}>
  					<Text style={[styles.labelStyle]}>Select / Choose Provider</Text>
						<Dropdown
							animated={false}
							showsVerticalScrollIndicator={false}
							renderBase={this.renderBase}
							dropdownStyle={styles.dropDownStyle}
							options={fetchPayoutProvider}
							renderButtonText={this.onChangeText("provider")}
							renderRow={this.renderRow}
							renderSeparator={null} />
  				</View>

					<TxtInput
						value={inputPayoutDetails.reference}
						label='Reference Number'
						placeholder="#"
						keyboardType="default"
						autoCapitalize="characters"
						style={styles.marT20}
						labelStyle2={{color: Color.Standard2}}
						onChangeText={this.onChangeText("reference")}/>
					{this.renderError()}
				</View>

				<View style={{width: "100%", alignSelf: "center"}}>
					<Button2
						onPress={this._handleOk}
						loading={isTransactionLoad}
						style2={{marginTop: 10}}
						label="Proceed"/>
						{inputPayoutDetails.provName === "Cebuana" ?
					<Button2
						onPress={() => this.setState({isVisible: true})}
						style={{flexDirection: "row", width: "100%", backgroundColor: Color.LightBlue, borderBottomColor: Color.LightBlue4}}
						style2={{marginTop: 5, backgroundColor: Color.LightBlue}}
						label="Proceed">
						<Image style={{width: 20, height: 20}} source={Res.get("ic_upload_white")} resizeMode="contain" />
						<Text style={styles.txtPOD}>Upload POD</Text>
					</Button2> : null}
					
					<Button2
						onPress={() => navigation.goBack()}
						style={styles.btnCancel}
						style2={styles.btnCancel}
						label="Back"
						labelStyle={{color: Color.colorPrimaryDark}}/>
				</View>
				<SafeAreaView style={styles.marB5} />
				{this.renderTransPass()}
			</ScrollView>
		);
	}
}

Selection.propTypes = {
	actions: PropTypes.object,
	remittance: PropTypes.object,
	wallet: PropTypes.object,
	login: PropTypes.object,
};

export default Selection;
