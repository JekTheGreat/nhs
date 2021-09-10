/* eslint-disable max-len */
// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, Image, TextInput, TouchableOpacity, SafeAreaView} from "react-native";
import styles from "../styles.css";
import {Card} from "native-base";
import {Icon} from "react-native-elements";
import Dropdown from "__src/components/Dropdown";
import Button from "__src/components/Button";
import Resource from "__src/resources";
import _ from "lodash";
import numeral from "numeral";
import PropTypes from "prop-types";
import KeyboardDismiss from "__src/components/KeyboardDismiss";
// import { KeyBoardAwareView } from "react-native-keyboard-aware-scroll-view";

const {Color, Res} = Resource;

export default class Conversion extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			ratefrom: false,
			rateto: false,
			view1: 0,
			view2: 0,
			error: "",
		};
	}

	componentDidMount() {
		const { actions } = this.props;

		actions.closedWalletBox("");
		actions.resetConvertData();
		actions.setEwalletScreen("convert");
	}

	componentDidUpdate() {
		const { actions, wallet } = this.props;
		const { selectConvertValueFrom, selectConvertToRecieve, convertAmountInput,
			convertedValuetoRecieved } = wallet;
		const codeReceive = selectConvertToRecieve ? selectConvertToRecieve.code : "";
		const codeFrom = selectConvertValueFrom ? selectConvertValueFrom.code : "";

		if (!_.isEmpty(selectConvertValueFrom) && !_.isEmpty(selectConvertToRecieve) &&
			(this.state.ratefrom || this.state.rateto)){
			actions.currencyRate(codeFrom, codeReceive);
			this.setState({rateto: false, ratefrom: false});
		}
		if (_.isNaN(convertAmountInput) || _.isEqual(convertAmountInput, 0)) {
			if (convertedValuetoRecieved !== 0) {
				actions.resetAmountInput();
			}
		}
		if (!_.isEqual(convertAmountInput, 0) && !_.isNaN(convertAmountInput) &&
			!_.isEmpty(selectConvertValueFrom) && !_.isEmpty(selectConvertToRecieve)){
			actions.convertedValuetoRecieved(codeFrom,
				codeReceive, convertAmountInput);
		}
	}

	renderSuccess =() => (
  	<View style={styles.renderSuccessWrapper}>
  		<View style={styles.flex1}>
  			<Text style={styles.addTxtNote}>Converting Currency</Text>
  			<Text style={styles.addTxtSuccess}>Successful!</Text>
  			<Image style={styles.img1} source={Res.get("check_icon")} resizeMode={"contain"} />
  		</View>
  		<View style={styles.renderSuccessWrapper2}>
  			<TouchableOpacity onPress={() => this.componentDidMount()}>
  				<Text style={styles.txtok}>Ok</Text>
  			</TouchableOpacity>
  		</View>
  	</View>
	);

	_convertSuccess = () => {
		const { actions, wallet: {convertAmountInput,
			selectConvertValueFrom, selectConvertToRecieve} }  = this.props;
		let error = "";

		if (_.isEmpty(selectConvertValueFrom)){
			error = "Please select currency from.";
		} else if (_.isEmpty(selectConvertToRecieve)){
			error = "Please select currency receiver.";
		} else if (_.isEmpty(_.toString(convertAmountInput)) || convertAmountInput === 0){
			error = "Input amount to convert.";
		}

		this.setState({error});

		if (_.isEmpty(error)) {
			actions.convertCurrency(parseFloat(convertAmountInput),
				selectConvertValueFrom, selectConvertToRecieve);
		}
	}

	renderBase(type) {
		const { selectConvertValueFrom, selectConvertToRecieve } = this.props.wallet;
		const codeReceive = selectConvertToRecieve ? selectConvertToRecieve.code : "";
		const codeFrom = selectConvertValueFrom ? selectConvertValueFrom.code : "";


		if (type === "receive"){
			return (
				<View style={styles.conRenderBase}>
					<Image style={styles.conRBImg} source={Res.get(codeReceive)}/>
					<Text style={styles.conRBTxt1}>
						{selectConvertToRecieve ? selectConvertToRecieve.code : "Select wallet"}
					</Text>
					<Icon name='menu-down' type='material-community' color={Color.Standard2} size={27} />
				</View>
			);
		}
		
		return (
			<View style={styles.conRenderBase}>
				<Image style={styles.conRBImg} source={Res.get(codeFrom)}/>
				<Text style={styles.conRBTxt2}>
					{selectConvertValueFrom ? selectConvertValueFrom.code : "Select walet"}
				</Text>
				<Icon name='menu-down' type='material-community' color="white" size={27} />
			</View>
		);
	}

	renderRow(rowData, rowID, highlighted) {
		return (
			<View style={styles.conRenderRow}>
				<Image style={styles.conRRImg} source={Res.get(rowData.code)} />
				<Text style={[styles.conRRTxt,
					highlighted && {color: Color.black} ]}>
					{`${rowData.code}`}
				</Text>
			</View>
		);
	}

	_handleAmount = (value) => {
		const { actions, wallet: {convertAmountInput} } = this.props;
		const newInput = _.merge({}, convertAmountInput);

		newInput.value = value;
		actions.convertAmountInput(newInput.value);
	}

	_SelectedValueFrom = (value) => {
		const { actions, wallet: { addedWallet } } = this.props;
		const selectedWallet = _.filter(addedWallet, (data) => {
			return data.code === value;
		});

		this.setState({ratefrom: true });
		actions.selectedConvertValueFrom(selectedWallet[0]);
	}

	_SelectedValueToRecieve = (value) => {
		const { actions, wallet: { addedWallet } } = this.props;
		const selectedWallet = _.filter(addedWallet, (data) => {
			return data.code === value;
		});

		this.setState({rateto: true});
		actions.selectedConvertToRecieved(selectedWallet[0]);
	}

	swap = () => {
		const {actions, wallet} = this.props;
		const { selectConvertValueFrom, selectConvertToRecieve } = wallet;

		this.setState({ratefrom: true, rateto: true });
		actions.selectedConvertValueFrom(selectConvertToRecieve);
		actions.selectedConvertToRecieved(selectConvertValueFrom);
	}

	renderError = () => {
		const { wallet: {selectConvertValueFrom, convertAmountInput}} = this.props;
		const {error} = this.state;
		const codeFrom = selectConvertValueFrom ? selectConvertValueFrom.code : "";

		let component;

		if (convertAmountInput > selectConvertValueFrom.credits){
			component =  (
				<Text style={styles.contxt9}>
					{`Please enter an amount within your current wallet balance of ${numeral(selectConvertValueFrom.credits).format("0,00.00")} ${codeFrom}`}
				</Text>
			);
		} else if (!_.isEmpty(error)){
			component = (
				<Text style={styles.contxt9}>
					{error}
				</Text>
			);
		}

		return (
			<View style={styles.conView6}>
				{component}
			</View>
		);
	
	}

	render(){
		const {wallet} = this.props;
		const {view1} = this.state;
		const { addedWallet, convertAmountInput, selectConvertValueFrom, selectConvertToRecieve,
			convertedValuetoRecieved, converting, currencyRate, convertSuccess } = wallet;
		const codeReceive = selectConvertToRecieve ? selectConvertToRecieve.code : "";
		const codeFrom = selectConvertValueFrom ? selectConvertValueFrom.code : "";

		let rates = "", convertToReceive = "";

		if (currencyRate.hasOwnProperty("rates") && !_.isEmpty(selectConvertToRecieve)) {
			rates = currencyRate.rates[selectConvertToRecieve.code];
		}

		if (selectConvertToRecieve.hasOwnProperty("currency")) {
			convertToReceive = selectConvertToRecieve.code;
		}

		if (convertSuccess){
			return this.renderSuccess();
		}

		return (
			<KeyboardDismiss>
				<View style={styles.flex1marT30padH20}>
					<View style={[styles.flex1, {}]}>
						<Card style={styles.conCard}>
							<View onLayout={(e) => this.setState({view1: e.nativeEvent.layout.height})}
								style={styles.conView1}>
								<View style={styles.flexRow}>
									<View style={styles.flexCol}>
										<Text style={styles.contxt2}>Converting from:</Text>
										<Dropdown
											animated={false}
											showsVerticalScrollIndicator={false}
											renderBase={this.renderBase.bind(this)}
											dropdownStyle={styles.condropdown}
											options={_.filter(addedWallet, (item) => {
												return item.code !== codeReceive;
											})}
											renderButtonText={(e) => this._SelectedValueFrom(e.code)}
											renderRow={this.renderRow.bind(this)}
											renderSeparator={null} />
									</View>
									<View style={styles.conView3}>
										<TextInput
											style={styles.contxtInput}
											value={convertAmountInput === 0 ? "" : `${convertAmountInput}`}
											placeholder="0.00"
											placeholderTextColor={Color.colorPrimaryLight}
											keyboardType="decimal-pad"
											returnKeyType="done"
											onChangeText={(e) => this._handleAmount(e)} />
									</View>
								</View>
								<Text style={styles.contxt3}>Balance: {numeral(selectConvertValueFrom.credits).format("0,00.0000")} {codeFrom}</Text>
							</View>
						
							<TouchableOpacity onPress={this.swap}
								style={[styles.conBtnSwitch, {top: view1 - 12.5}]}>
								<Image style={styles.conImgSwitch} source={Res.get("button_switch")}/>
							</TouchableOpacity>
						
							<View onLayout={(e) => this.setState({view2: e.nativeEvent.layout.height})}
								style={styles.conView2}>
								<View style={styles.flexRow}>
									<View style={styles.flexCol}>
										<Text style={styles.contxt1}>You will receive:</Text>
										<Dropdown
											animated={false}
											showsVerticalScrollIndicator={false}
											renderBase={this.renderBase.bind(this, "receive")}
											dropdownStyle={styles.condropdown}
											options={_.filter(addedWallet, (item) => {
												return item.code !== codeFrom;
											})}
											renderButtonText={(e) =>
												this._SelectedValueToRecieve(e.code)}
											renderRow={this.renderRow.bind(this)}
											renderSeparator={null} />
									</View>
									<View style={styles.conView3}>
										<Text style={styles.contxt4}>
											{ convertedValuetoRecieved }
										</Text>
									</View>
								</View>
								<Text style={styles.contxt5}>Balance: {numeral(selectConvertToRecieve.credits).format("0,00.0000")} {codeReceive}</Text>
								<View style={styles.conView4}>
									<Text style={styles.contxt6}>CURRENT RATE</Text>
									<View style={styles.conView5}/>
									<Text style={styles.contxt7}>
										{_.isEmpty(selectConvertValueFrom) ? "" : `1 ${codeFrom} ~ ${numeral(rates).format("0,00.0000")} ${convertToReceive}`}
									</Text>
								</View>
							</View>

						</Card>
						<Text style={styles.contxt8}>
          Please keep in mind that the exchange rate of currencies are volatile.{" "}
					Exchange rate may go up or down at any time
						</Text>
						{this.renderError()}

						<View style={[styles.btnWrapper, styles.marB10]}>
							<Button onPress={this._convertSuccess} loading={converting} style={styles.conBtnConvert} label="Convert"/>
						</View>
					</View>
					<SafeAreaView />
				</View>
			</KeyboardDismiss>
		);
	}
}

Conversion.propTypes = {
	wallet: PropTypes.object,
	actions: PropTypes.object,
	login: PropTypes.object,
};
