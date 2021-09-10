/* eslint-disable no-nested-ternary */
// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, ScrollView, TouchableOpacity, SafeAreaView,
	 Image, TextInput, Modal, StatusBar} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import {Icon} from "react-native-elements";
import _ from "lodash";
import numeral from "numeral";
import Dropdown from "__src/components/Dropdown";
import Detail from "__src/components/Detail";
import Button from "__src/components/Button";
import Loading from "__src/components/Loading";
import styles from "../../styles.css";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const {Res, Color} = Resource;
const errorMessage = "This field is required.";

export default class EcashToEcash extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			error: {},
			inputTransferReason: "",
			isConfirm: false,
			selectAccountWallet: {},
		};
	}

	componentDidMount() {
		const {actions, login: {currentAccount, session}} = this.props;

		actions.resetSendEcash();
		actions.convertAmountInput("");
		if (_.isEmpty(currentAccount.id)){
			actions.getUserAccount(session.token);
		}
	}

	_onClick= (type) => {
		const {navigation} = this.props;

		switch (type){
		case "ECash to ECash":
			navigation.navigate("QRScan", {title: "QR SCANNER"});
			break;
		default:
			navigation.navigate("QRScan", {title: "QR SCANNER"});
			break;
		}
	}

  _wallet = () => {
  	const { login: { additionalDetails },
  		wallet: { walletSelected} } = this.props;
  	const subType = _.has(additionalDetails, "type") ? additionalDetails.type.toUpperCase() : "";
  	const id = _.has(additionalDetails, "metadata") ? additionalDetails.metadata.accountNumber : "";
        
  	return (
  		<View style={styles.walletWrapper}>
  			<View style={styles.flexColumn}>
  				<View>
  					<Text style={styles.walletTxtSource}>SOURCE ACCOUNT</Text>
  					<Text multiline={2}
  						style={styles.walletTxtSourceValue}>{id}</Text>
  				</View>
  				
  				<Text style={styles.walletTxtSourceWallet}>SOURCE WALLET</Text>
  				<Text style={styles.walletTxtSourceWalletValue}>
  					<Text style={styles.walletTxtSourceWalletValue2}>{_.isEmpty(walletSelected) ? "" : walletSelected.code} </Text>
  					{_.isEmpty(walletSelected) ? "" :
  						`${numeral(walletSelected.balance).format("0,000.000000")}`}</Text>
  			</View>
  			<Text numberOfLines={2} style={styles.walletTxtAccountType}>{subType}</Text>
  		</View>
  	);
  }
	
	targetIcon = () => {
		const {navigation, wallet: {isGetWalletLoading}} = this.props;

		if (isGetWalletLoading){
			return (
				<View style={styles.loadView}>
					<Loading size="small" />
				</View>
			);
		}

		return (
			<TouchableOpacity onPress={() => navigation.navigate("QRScan", {title: "Scan QR Code"})}>
				<Image style={styles.qrImage} source={Res.get("qr_dark")} resizeMode="contain"/>
			</TouchableOpacity>);
	}

	renderBase() {
		const {selectAccountWallet} = this.state;
		const {wallet: {targetAccountWallet}} = this.props;
		const flag = _.isEmpty(selectAccountWallet) ? null : selectAccountWallet.code;

		return (
			<View style={[styles.renderBaseWrapper]}>
				<Text style={styles.txtInput}>
					{selectAccountWallet.name ? selectAccountWallet.name : ""}
				</Text>
				<Image style={styles.renderBaseImg} source={Res.get(flag)}/>
				{_.isEmpty(targetAccountWallet) ? null : <Icon name='arrow-drop-down' color="black" size={27} />}
			</View>
		);
	}

	renderRow(rowData, rowID, highlighted) {
		return (
			<View style={styles.renderRowWrapper}>
				<Text style={[styles.renderRowText,
					highlighted && {color: Color.black} ]}>
					{`${rowData.name}`}
				</Text>
				<Image style={styles.renderBaseImg} source={Res.get(rowData.code)} />
			</View>
		);
	}

	_successButton = () => {
		const { actions, wallet: { inputAccountId, convertAmountInput,
			walletSelected}, login: {session} } = this.props;

		const params = {
			amount: convertAmountInput,
			accountToReceive: inputAccountId,
			currency: walletSelected.code};

		actions.sendEcashFund(params, session.token, walletSelected);
	}


	showConfirm() {
		const { login: { additionalDetails },
			wallet: { walletSelected, inputAccountId, convertAmountInput,
				sendingEcash } } = this.props;
		const walletamt = _.isEmpty(walletSelected) ? "" :
			numeral(walletSelected.balance).format("0,000.0000");
		const code = _.isEmpty(walletSelected) ? "" : walletSelected.code;
		const total = _.add(_.toNumber(convertAmountInput), 25);
  	const id = _.has(additionalDetails, "metadata") ? additionalDetails.metadata.accountNumber : "";

		return (
			<Modal animationType='none' transparent visible={this.state.isConfirm} onRequestClose={() => this.setState({isConfirm: false})}>
				<View style={styles.modalWrapper}>
					<View style={styles.modalWrapper2}>
						<Text style={styles.title}>
						Confirmation
						</Text>
						<Text style={styles.subtitle}>
						Please review your transfer fund
						</Text>
						<ScrollView showsVerticalScrollIndicator={false} style={styles.marT10} >
							<View style={styles.wrapper2}>
								<Detail horizontal  label={"Source Account"} value={id} />
								<Detail horizontal  label={"Source Wallet"} value={`${code} ${walletamt}`} />
								<View  style={styles.viewDivider}/>
								<Detail horizontal  label={"Target ID"} value={inputAccountId} />
								<Detail horizontal  label={"Target Wallet"} value={code} />
								<View  style={styles.viewDivider}/>
								<Detail horizontal  label={"Amount"} value={`${code} ${convertAmountInput}`} />
								<Detail horizontal  label={"System Fee"} value={`${code} ${numeral("25").format("0,000.0000")}`} />
								<View  style={styles.viewDivider}/>
								<Detail horizontal labelStyle2={styles.amount}
									label={"Amount Due"}
									value={`${code} ${numeral(total).format("0,000.0000")}`}
									valueStyle2={styles.amount}  />
							</View>
						</ScrollView>
						<View style={styles.modalWrapper3}>
							<Button onPress={() => this.setState({isConfirm: false})}
								style={styles.modalBtn}
								labelStyle={{color: Color.colorPrimary}} label="Back"/>
							<Button onPress={this._successButton} loading={sendingEcash} style={styles.width120} label="Confirm"/>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	Ok = () => {
		const { actions } = this.props;

		this.setState({
			isConfirm: false,
			selectAccountWallet: {},
			inputTransferReason: "",
		});
		actions.resetSendEcash();
	}

	renderSuccess =() => (
  	<View style={styles.renderSuccessWrapper}>
  		<View style={styles.flex1}>
  			<Text style={styles.txt1}>Transfer fund</Text>
  			<Text style={styles.txt2}>Successful!</Text>
  			<Image style={[styles.img1, styles.marT10]} source={Res.get("check_icon")} resizeMode={"contain"} />
				<Text style={[styles.txt3, styles.marT15]}>Tracking Number</Text>
				<Text style={styles.txt4}>
					{this.props.wallet.sendEcashResult.transactionNumber}
				</Text>
  		</View>
  		<View style={styles.renderSuccessWrapper2}>
  			<TouchableOpacity onPress={this.Ok}>
  				<Text style={styles.txtok}>Ok</Text>
  			</TouchableOpacity>
  		</View>
			<SafeAreaView />
  	</View>
	);

	proceed = () => {
		const {inputTransferReason } = this.state;
		const {wallet: {inputAccountId, convertAmountInput, walletSelected}} = this.props;
		const error = {};

		if (inputAccountId === ""){
			error.inputAccountId = "This field is required.";
		} else if (convertAmountInput === 0 || convertAmountInput === ""){
			error.convertAmountInput = "This field is required.";
		} else if (convertAmountInput > walletSelected.balance){
			error.convertAmountInput = "This field is required.";
		} else if (inputTransferReason === ""){
			error.inputTransferReason = "This field is required.";
		}
		
		if (_.isEmpty(error)){
			this.setState({isConfirm: true});
		} else {
			this.setState({error});
		}
	}

	_getAccountWallet = () => {
		const {actions, wallet: {inputAccountId}} = this.props;

		actions.getTargetAccountWallet(inputAccountId);
	}

	_onChangeText = (type) => (val) => {
		const { actions, wallet: {CurrencyList, inputValue, inputAccountId} } = this.props;
		const newInput = _.merge({}, inputValue);
		const newInputAccountId = _.merge({}, inputAccountId);
		const error1 = {};

		switch (type){
		case 1:
			if (_.isEmpty(val)) {
				error1.inputAccountId = errorMessage;
			}

			this.setState({inputAccountId: val});
			newInputAccountId.value = val;
			actions.inputAccountId(newInputAccountId.value);
			break;
		case 2:
			if (_.isEmpty(val)) {
				error1.inputValue = errorMessage;
			}
			newInput.value = val;
			actions.inputValue(newInput.value);
			break;
		case 3:
			if (_.isEmpty(val)) {
				error1.inputTransferReason = errorMessage;
			}
			this.setState({inputTransferReason: val});
			break;
		case 4:
			const selectedWallet = _.find(CurrencyList, (d) => {
				return d.code === val.code;
			});
		
			actions.setTargetWallet(selectedWallet);
			actions.selectedTarget(val.code);
			actions.selectedConvertToRecieved(selectedWallet);
			this.setState({selectAccountWallet: val});
			break;
		}
		this.setState({error: error1});
	}

	_convertInput = _.debounce(() => {
  	const { actions, wallet: { walletSelected, targetWallet, inputValue } } = this.props;

  	actions.convertInputValue(inputValue, walletSelected.code,
  		targetWallet.code);
	})

	onBlur = () => {
		this.setState({targetid: false});
		this._getAccountWallet();
	}

	_inputCurrency = (value) => {
		const { actions, wallet } = this.props;
		const newInput = _.merge({}, wallet.inputValue);

		newInput.value = value;
		actions.inputValue(newInput.value);
		this._convertInput();

		this.setState({ inputValue: value });
	}

	_handleAmount = (value) => {
		const { actions, wallet } = this.props;
		const newInput = _.merge({}, wallet.convertAmountInput);

		newInput.value = value;
		actions.convertAmountInput(newInput.value);
	}

	userLevel = () => {
		const { login: {currentAccount}} = this.props;

		switch (currentAccount.subType) {
		case "REGULAR_RETAILER":
		case "UNIFIED_RETAILER":
		case "UNIFIED_PINOY_DEALER":
		case "UNIFIED_GLOBAL_DEALER":
		case "UNIFIED_SUBDEALER":
			return 1;
		case	"UNIFIED_HUB_MOTHER":
		case	"UNIFIED_HUB_ADMIN":
		case	"UNIFIED_HUB_OUTLET":
		case	"UNIFIED_OUTLET":
		case	"GPRS_OUTLET_MOTHER":
		case	"GPRS_OUTLET_ADMIN":
		case	"GPRS_OUTLET":
			return 7;
		case	"UNIFIED_ECASH_PAY_CENTER_MOTHER":
		case	"UNIFIED_ECASH_PAY_CENTER_ADMIN":
		case	"UNIFIED_ECASH_PAY_CENTER_OUTLET":
			return 16;
		}
	}

	render() {
		const { error} = this.state;
		const err = {color: Color.red, borderBottomColor: Color.red};
  	const error1 = error.inputAccountId ? err : {color: Color.Standard};
  	const errWallet = error.wallet ? err : {color: Color.Standard};
  	const error2 = error.inputValue ? err : {color: Color.Standard};
  	const error3 = error.inputTransferReason ? err : {color: Color.Standard};
		const {wallet: { walletSelected, convertAmountInput, selectedTarget, CurrencyList,
			getTargetAccountWalletFailed,
			sendEcashSuccess, inputAccountId, convertedValuetoRecieved} } = this.props;
		const walletcode = _.isEmpty(walletSelected) ? "" : walletSelected.code;
	
		// if (_.isEmpty(addedWallet)){
		// 	return <Loading color="black" size="small"/>;
		// }

		if (sendEcashSuccess){
			return this.renderSuccess();
		}
  	
		return (
  		<View style={styles.ecashContainer}>
				<StatusBar barStyle="light-content" backgroundColor={Color.Header} />
				{this._wallet()}
  			<KeyboardAwareScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} style={styles.flatlist}>
  				<View style={styles.flex1marT20}>
  					<Text style={[styles.txtLabel, error1]}>Receiver's Account Number</Text>
  					<View style={[styles.viewTarget, error1]}>
  						<TextInput
  							onFocus={() => this.setState({targetid: true})}
  							onBlur={() => this.setState({targetid: false})}
  							isFocus={this.state.targetid}
  							style={styles.txtInput}
								onChangeText={this._onChangeText(1)}
								returnKeyType="done"
								value={inputAccountId}
								onSubmitEditing={this._getAccountWallet}
  							underlineColorAndroid='transparent'/>
							{this.targetIcon()}
  					</View>
						{ error.inputAccountId ?
							<Text style={styles.txtError}>This field is required</Text> : null ||
							getTargetAccountWalletFailed ?
								<Text style={styles.txtError}>
								Invalid target account ID.
								</Text> : null}
  				</View>

  				<View style={styles.flex1marT20}>
  					<Text style={[styles.txtLabel, error2]}>Amount</Text>
  					<View style={[styles.viewTarget, error2]}>
  						<Text style={styles.txtCode}>{walletcode} </Text>
  						<TextInput
  							onFocus={() => this.setState({amt: true})}
  							onBlur={() => this.setState({amt: false})}
								isFocus={this.state.amt}
  							style={styles.txtInput}
  							onChangeText={this._handleAmount}
								value={convertAmountInput === 0 ? "" : _.toString(convertAmountInput)}
								returnKeyType="done"
								placeholder="0"
								keyboardType='numeric'
  							underlineColorAndroid='transparent'/>
  					</View>
						{error.convertAmountInput || convertAmountInput > walletSelected.balance ?
							<Text style={styles.txtNote}>
							Please enter an amount within your current wallet balance of {numeral(
									walletSelected.balance).format("0,000.000000")} {walletcode}
							</Text> : null}
  				</View>
  				<Text style={styles.txtConvertAmt}>
  					{`~ ${numeral(convertAmountInput).format("0,000.0000")} ${walletcode}`}
  				</Text>
  				<View style={styles.flex1marV20}>
  					<Text style={[styles.txtLabel, error3]}>Reason to transfer</Text>
  					<View style={[styles.viewReason, error3]}>
  						<TextInput
  							onFocus={() => this.setState({rtt: true})}
  							onBlur={() => this.setState({rtt: false})}
  							isFocus={this.state.rtt}
  							style={styles.txtInput}
  							onChangeText={this._onChangeText(3)}
  							value={this.state.inputTransferReason}
  							placeholder="Message here..."
								multiline
								onSubmitEditing={this.proceed}
								returnKeyType="done"
  							underlineColorAndroid='transparent'/>
  					</View>
  				</View>
  			</KeyboardAwareScrollView>
				<Button onPress={this.proceed} style={styles.btnProceed} label="Proceed"/>
				{this.showConfirm()}
				<SafeAreaView />
  		</View>
  	);
	}
}

EcashToEcash.propTypes = {
	actions: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
	wallet: PropTypes.object,
	profile: PropTypes.object,
};
