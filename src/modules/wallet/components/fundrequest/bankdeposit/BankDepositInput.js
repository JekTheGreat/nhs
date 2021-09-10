/* eslint-disable max-len */
import React, {PureComponent} from "react";
import {View, Text, ScrollView,
	 Image, TextInput} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import {Icon} from "react-native-elements";
import _ from "lodash";
import Dropdown from "__src/components/Dropdown";
import Detail from "__src/components/Detail";
import Button from "__src/components/Button";
import TxtInput from "__src/components/TxtInput";
import styles from "../../../styles.css";
const {Res, Color} = Resource;
const bankdata = ["BDO", "UCPD", "SECURITY BANK"];

export default class BankDepositInput extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			selectAccountWallet: {},
			error: {},
		};
	}

	renderBase() {
		const {wallet: {selectedBank}} = this.props;
		const {error} = this.state;
		const fontColor = selectedBank ? null : {color: Color.Standard};
		const errColor2 = error.selectedBank ? {borderBottomColor: Color.red} : null;
		
		return (
			<View style={[styles.renderBaseWrapper, errColor2]}>
				<Text style={[styles.txtInput, fontColor]}>
					{selectedBank || "Choose bank"}
				</Text>
				<Icon name='arrow-drop-down' color="black" size={27} />
			</View>
		);
	}

	renderRow(rowData, rowID, highlighted) {
		return (
			<View style={[styles.renderRowWrapper,
				highlighted && {backgroundColor: Color.highlight}]}>
				<Text style={[styles.renderRowText,
					highlighted && styles.highlighted ]}>
					{`${rowData}`}
				</Text>
			</View>
		);
	}
  
	renderBaseWallet() {
		const {wallet: {walletSelected}} = this.props;
		const code = _.isEmpty(walletSelected) ? "" : walletSelected.code;

		return (
			<View style={styles.renderBaseWrapper}>
				<Text style={styles.txtInput}>
					{walletSelected ? walletSelected.name : ""}
				</Text>
				<Image style={styles.renderBaseImg} source={Res.get(code)}/>
				<Icon name='arrow-drop-down' color="black" size={27} />
			</View>
		);
	}

	renderRowWallet(rowData, rowID, highlighted) {
		return (
			<View style={[styles.renderRowWrapper,
				highlighted && {backgroundColor: Color.highlight}]}>
				<Text style={[styles.renderRowText,
					highlighted && styles.highlighted ]}>
					{`${rowData.name}`}
				</Text>
				<Image style={styles.renderBaseImg} source={Res.get(rowData.code)} />
			</View>
		);
	}
  
  _selectBank = (value) => {
  	const { actions } = this.props;

  	actions.setSelectedBank(value);
  }

  _setAmountInput = (value) => {
  	const { actions } = this.props;

  	actions.setAmountInput(value);
  }

  handleWalletSelect = (code) => {
  	const { actions, wallet: { addedWallet } } = this.props;
  	const selectedWallet = _.filter(addedWallet, (data) => {
  		return data.code === code;
  	});

  	actions.WalletSelected(selectedWallet[0]);
  }

  _proceedToChooseMethod = () => {
  	const { navigation, actions, wallet: { requestScreenHeader } } = this.props;

  	requestScreenHeader.amount = false;
  	requestScreenHeader.payment = false;
  	navigation.setParams({ title: "Fund Request" });

  	actions.setRequestScreen("chooseMethod");
  	actions.setRequestScreenHeader(requestScreenHeader);
  	actions.resetRequest();
  }

  _proceedToRequestPayment = () => {
  	const { actions, login: {session},
  		wallet: { selectedBank, walletSelected, amountInput} } = this.props;
  	const error = {};

  	if (_.isEmpty(selectedBank)){
  		error.selectedBank = "This field is required.";
  	} else if (_.isEmpty(_.toString(amountInput)) || _.toString(amountInput) === "0"){
  		error.amount = "This field is required.";
  	}

  	this.setState({error});
		
  	if (_.isEmpty(error)){
  		const params = {
  			amount: amountInput,
  			currency: walletSelected.code,
  			service: "Bank",
  			serviceType: selectedBank,
  		};
			
  		actions.createFundRequest(params, session.token, "/transactions/cash-in", "bankDepositPayment");
  	}
  }
  
  render(){
  	const {wallet: {isRequestingFund, amountInput, addedWallet, walletSelected},
  		login: {currentAccount}} = this.props;
  	const {error} = this.state;
  	const errAmount = error.amount ? {color: Color.red} : null;
  	const errBorder = error.amount ? {borderBottomColor: Color.red} : null;
  	const code = _.isEmpty(walletSelected) ? "" : walletSelected.code;
  	const errColor = error.selectedBank ? {color: Color.red} : null;
  	const total = _.toInteger(amountInput) + 25;


  	return (
  		<View style={styles.bankWrapper1}>
  			<View style={styles.bankWrapper2}>
  				<ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
  					<View style={styles.flexShrink1}>
  						<Text style={[styles.txtLabel, errColor]}>Choose Bank</Text>
  						<Dropdown
  							animated={false}
  							showsVerticalScrollIndicator={false}
  							renderBase={this.renderBase.bind(this)}
  							dropdownStyle={styles.targetDropdown}
  							options={bankdata}
  							renderButtonText={(e) => this._selectBank(e)}
  							renderRow={this.renderRow.bind(this)}
  							renderSeparator={null} />
  					</View>

  					<TxtInput
  						value={currentAccount.id}
  						label='Receiving Account'
  						isText
  						style={styles.marT10}
  						inputStyles={styles.inputStyles}
  						style3={styles.borderWidth0}/>

  					<View style={styles.marT10}>
  						<Text style={styles.txtLabel}>Receiving Wallet</Text>
  						<Dropdown
  							animated={false}
  							showsVerticalScrollIndicator={false}
  							renderBase={this.renderBaseWallet.bind(this)}
  							dropdownStyle={styles.targetDropdown}
  							options={addedWallet || []}
  							renderButtonText={(e) => this.handleWalletSelect(e.code)}
  							renderRow={this.renderRowWallet.bind(this)}
  							renderSeparator={null} />
  					</View>

  					<View style={[styles.marT10, styles.marB20]}>
  					<Text style={[styles.txtLabel, errAmount]}>Amount</Text>
  					<View style={[styles.viewTarget, errBorder]}>
  						<Text style={styles.txtCode}>{code} </Text>
  						<TextInput
  							onFocus={() => this.setState({amt: true})}
  							onBlur={() => this.setState({amt: false})}
  							isFocus={this.state.amt}
  							style={styles.txtInput}
  							onChangeText={this._setAmountInput}
  							value={_.toString(amountInput)}
  							returnKeyType="done"
  							keyboardType='numeric'
  							underlineColorAndroid='transparent'/>
  					</View>
  						{error.amount ? <Text style={styles.errStyle}>{error.amount}</Text> : null}
  				</View>
  				</ScrollView>
  			</View>

  			<View style={styles.bankWrapper3}>
  				<View style={styles.flex1}>
  					<Detail horizontal labelStyle2={{color: Color.Standard2}} label={"You will receive:"} value={amountInput} />
  					<Detail horizontal labelStyle2={{color: Color.Standard2}} label={"Service fee:"} value={"PHP 25.00"} />
  					<View  style={styles.viewDivider}/>
  					<Detail horizontal labelStyle2={styles.amount}
  						label={"Amount Due"}
  						value={total}
  						valueStyle2={styles.value}  />
  				</View>
  				<View style={styles.marB10}>
  					<Button
  						onPress={this._proceedToRequestPayment}
  						style={styles.btnStyle2}
  						loading={isRequestingFund}
  						label="Proceed"/>
  					<Button
  						onPress={this._proceedToChooseMethod}
  						style={styles.btnStyle3}
  						labelStyle={styles.btnLabelStyle}
  						label="Back"/>
  			</View>
  			</View>
  		</View>
  	);
  }
}

BankDepositInput.propTypes = {
	actions: PropTypes.object,
	wallet: PropTypes.object,
	login: PropTypes.object,
	navigation: PropTypes.object,
};
