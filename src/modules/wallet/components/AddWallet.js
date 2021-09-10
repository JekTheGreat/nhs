// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, TouchableOpacity, Image, SafeAreaView} from "react-native";
import {Icon} from "react-native-elements";
import Resources from "__src/resources";
import PropTypes from "prop-types";
import styles from "../styles.css";
import _ from "lodash";
import Button from "__src/components/Button";
import Dropdown from "__src/components/Dropdown";

const {Res, Color} = Resources;

export default class AddWallet extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			error: {},
			wallet: {},
		};
	}

	componentDidMount(){
		const { actions, login: {session} } = this.props;

		actions.CurrencyList(session.token);
	}

	renderBase() {
		const {wallet} = this.state;

		return (
			<View style={styles.renderBaseWrapper}>
				<Text style={styles.input}>
					{wallet.name ? `${wallet.code} (${wallet.name})` : ""}
				</Text>
				<Icon name='arrow-drop-down' color="black" size={27} />
			</View>
		);
	}
  
	renderRow(rowData, rowID, highlighted) {
		return (
			<View style={[styles.renderRow, highlighted && {backgroundColor: Color.highlight}]}>
				<Text style={[styles.renderRowTxt,
					highlighted && styles.highlighted ]}>
					{`${rowData.code} (${rowData.name})`}
				</Text>
			</View>
		);
	}
  
  _SelectedValue = (e) => {
  	const { actions }  = this.props;

  	actions.selectedValue(e.id);
  	console.log("_SelectedValue", e);
  	this.setState({wallet: e});
  }
  
  renderSuccess =() => (
  	<View style={styles.renderSuccessWrapper}>
  		<View style={styles.flex1}>
  			<Text style={styles.addTxtNote}>Add New Wallet</Text>
  			<Text style={styles.addTxtSuccess}>Successful!</Text>
  			<Image style={styles.img1} source={Res.get("check_icon")} resizeMode={"contain"} />
  		</View>
  		<View style={styles.renderSuccessWrapper2}>
  			<TouchableOpacity onPress={this._pressOkButtonSuccess}>
  				<Text style={styles.txtok}>Ok</Text>
  			</TouchableOpacity>
  		</View>
  	</View>
  );

  _pressOkButtonSuccess = () => {
  	const { actions } = this.props;

  	actions.closedWalletBox("");
  }

	_proceedToConfirm = () => {
		const {actions, login} = this.props;
		const { session } = login;
		const {wallet} = this.state;
		const error = {};

		if (_.isEmpty(wallet.code)) {
			error.wallet = "Please select a Currency";
		}
    
		if (_.isEmpty(error)){
			const params = {code: wallet.code};
		
			actions.createWalletCurrency(params, session.token);
		} else {
			this.setState({error});
		}
	}
	
	error = () => {
		const {error} = this.state;
		const {wallet: {isWalletExisting}} = this.props;
		
		if (isWalletExisting){
			return (
				<Text style={styles.txtError}>
					This currency is already added to your wallet.
				</Text>
			);
		}
		
		if (error.wallet){
			return (
				<Text style={styles.txtError}>
					{error.wallet}
				</Text>
			);
		}
		
		return null;
	}

	render() {
		const {error} = this.state;
		const {navigation, wallet: {isAdded, isWalletCreated, CurrencyList,
			isWalletExisting}} = this.props;
		const err = {color: Color.red, borderBottomColor: Color.red};
		const errWallet = isWalletExisting || error.wallet ? err : {color: Color.Standard};

		// const newCurrencyList = _.chain(CurrencyList).sortBy("code").filter( (item) => {
		// 	return _.find(["PHP", "USD", "HKD", "SGD", "AED", "QAR"], (o) => {
		// 		return item.code === o;
		// 	});
		// }).value();
    
		if (isAdded){
			return this.renderSuccess();
		}

		return (
			<View style={styles.ecashContainer}>
				<View style={styles.flex1padH20}>
					<View style={styles.marT30}>
						<Text style={styles.title}>Create new wallet?</Text>
						<Text numberOfLines={5} style={styles.subtitle2}>
							Select a currency you want to add on your account.
						</Text>
					</View>

					<View style={styles.flex1marT20}>
  					<Text style={[styles.labelStyle, errWallet]}>Select Currency</Text>
						<Dropdown
							animated={false}
							showsVerticalScrollIndicator={false}
							renderBase={this.renderBase.bind(this)}
							dropdownStyle={styles.dropDownStyle}
							options={CurrencyList}
							renderButtonText={(e) => this._SelectedValue(e)}
							renderRow={this.renderRow.bind(this)}
							renderSeparator={null} />
						{this.error()}
  				</View>
				</View>

				<Button
					onPress={this._proceedToConfirm}
					loading={isWalletCreated}
					style={styles.btnCreate}
					label="Create"/>
				<Button
					onPress={() => navigation.goBack()}
					loading={isWalletCreated}
					style={styles.btnCancel}
					label="Cancel"
					labelStyle={{color: Color.colorPrimaryDark}}/>
				<SafeAreaView />
			</View>
		);
	}
}
AddWallet.propTypes = {
	actions: PropTypes.object,
	wallet: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
};
