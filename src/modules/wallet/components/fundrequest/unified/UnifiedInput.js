/* eslint-disable max-len */
import React, {PureComponent} from "react";
import {View, Text, Image, TextInput} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import {Icon} from "react-native-elements";
import _ from "lodash";
import Detail from "__src/components/Detail";
import Button from "__src/components/Button";
import styles from "../../../styles.css";
const {Res, Color} = Resource;

export default class UnifiedInput extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			selectAccountWallet: {},
			error: {},
			amount: "",
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
  	const error = {};
		
  	if (_.isEmpty(value)){
  		error.amount = "This field is required.";
  	}
		
  	this.setState({error, amount: value });
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
  		wallet: {walletSelected} } = this.props;
  	const {amount} = this.state;
  	const error = {};

  	if (_.isEmpty(_.toString(amount)) || _.toString(amount) === "0"){
  		error.amount = "This field is required.";
  	}

  	this.setState({error});
		
  	if (_.isEmpty(error)){
  		const params = {
  			amount,
  			currency: walletSelected.code,
  			channel: "Mobile",
  		};
			
  		actions.createFundRequest(params, session.token, "/transactions/top-ups", "unifiedPayment");
  	}
  }
  
  render(){
  	const {wallet: {isRequestingFund, walletSelected}} = this.props;
  	const {error, amount} = this.state;
  	const errBorder = error.amount ? {borderColor: Color.red} : null;
  	const code = _.isEmpty(walletSelected) ? "PHP" : walletSelected.code;
  	const total = _.toInteger(amount) + 25;

  	return (
  		<View style={styles.bankWrapper1}>
  			<View style={styles.unifiedWrapper2}>
  				<Text style={styles.txt5}>How much would you like to top up?</Text>

  					<View style={[styles.marT30, styles.marB20]}>
  					<View style={[styles.unifiedView1, errBorder]}>
  						<TextInput
  							onFocus={() => this.setState({amt: true})}
  							onBlur={() => this.setState({amt: false})}
  							isFocus={this.state.amt}
  							style={styles.txtAmount}
  							onChangeText={this._setAmountInput}
  							value={_.toString(amount)}
  							placeholder="Enter amount"
  							returnKeyType="done"
  							keyboardType='numeric'
  							underlineColorAndroid='transparent'/>
  					</View>
  				</View>
  			</View>

  			<View style={styles.unifiedWrapper3}>
  				<View style={styles.flex1}>
  					<Detail horizontal labelStyle2={{color: Color.Standard2}} label={"Receiving currency:"} value={code} />
  					<Detail horizontal labelStyle2={{color: Color.Standard2}} label={"You will receive:"} value={amount || "0"} />
  					<Detail horizontal labelStyle2={{color: Color.Standard2}} label={"Service fee:"} value={"PHP 25.00"} />
  					<View  style={styles.viewDivider}/>
  					<Detail horizontal labelStyle2={styles.amount}
  						label={"Amount Due"}
  						value={amount ? `${code} ${total}` : `${code} 0`}
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

UnifiedInput.propTypes = {
	actions: PropTypes.object,
	wallet: PropTypes.object,
	login: PropTypes.object,
	navigation: PropTypes.object,
};
