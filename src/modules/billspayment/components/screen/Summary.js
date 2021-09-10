/* eslint-disable */
import React from "react";
import { View, Text, ScrollView, Image, FlatList, TouchableOpacity } from "react-native";
import Dropdown from "__src/components/Dropdown";
import SummaryModal from "./SummaryModal";
import ViewImageModal from "./ViewImageModal";
import Dash from "react-native-dash";
import { Card } from "native-base";
import { Icon, CheckBox } from "react-native-elements";
import _ from "lodash";
import TermsConditionModal from "./TermsConditionModal"
import numeral from "numeral";
import styles from "../../../wallet/styles.css";
import Resources from "__src/resources";
import PropTypes from "prop-types";
const { Color, Res } = Resources;

class SummaryScreen extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			imageURL: "",
			viewImage: false,
			isTransPassShowing: false,
			isTermsShowing: false,
			isCheck: false,
		}
	}

	componentDidMount() {
		const { actions, wallet: { walletSelected }, billspayment: { getRates, setInputDetails } } = this.props;
		const data = _.has(setInputDetails, "filloutform") ? setInputDetails.filloutform : [];
		const convertAmountInput = eval(getRates.serviceCharge) + eval(parseFloat(data["amount"]));
		const currency = "PHP";
		const currencyCode = _.isEmpty(walletSelected) ? "PHP" : walletSelected.code;
		actions.selectedConvertValueFrom(currency);
		actions.convertAmountInput(convertAmountInput);
		this._SelectedValueToRecieve(currencyCode);
	}

	componentDidUpdate(prevProps, prevState) {
		// const {isCheck} = this.state;
		// const { actions, wallet, } = this.props;
		// const { selectConvertValueFrom, selectConvertToRecieve, convertAmountInput,
		// 	convertedValuetoRecieved } = wallet;
		// const codeReceive = selectConvertToRecieve ? selectConvertToRecieve.code : "";
		// const codeFrom = "PHP";
		// const {login: {session}} = this.props;

		// if(prevProps.wallet.selectConvertValueFrom!==selectConvertValueFrom && prevState.isCheck!==isCheck){
		// 	if (!_.isEmpty(selectConvertValueFrom) && !_.isEmpty(selectConvertToRecieve)){
		// 		actions.currencyRate(codeFrom, codeReceive);
		// 		console.log("TEST1: ", codeFrom, codeReceive);
		// 	}
		// }

		// if(prevProps.wallet.convertAmountInput!==convertAmountInput){
		// 	if (_.isNaN(convertAmountInput) || _.isEqual(convertAmountInput, 0)) {
		// 		if (convertedValuetoRecieved !== 0) {
		// 			actions.resetAmountInput();
		// 			console.log("TEST2: ", 	actions.resetAmountInput());
		// 		}
		// 	}
		// }

		// if (!_.isEqual(convertAmountInput, 0) && !_.isNaN(convertAmountInput) &&
		// !_.isEmpty(selectConvertValueFrom) && !_.isEmpty(selectConvertToRecieve)){
		// actions.convertedValuetoRecieved(codeFrom,
		// 	codeReceive, convertAmountInput);
		// 	console.log("TEST3: ", 	actions.convertedValuetoRecieved(codeFrom,
		// 		codeReceive, convertAmountInput));
		// }

	}

	onNext = () => {
		const { isCheck } = this.state;
		const { actions, billspayment: { setInputDetails, validateFields } } = this.props;
		const newInput = _.merge({}, setInputDetails);
		const param = _.merge({}, newInput.filloutform)
		if (!isCheck) {
			alert("You need to agree with the terms and condition.")
			console.log("You need to agree with the terms and condition.")
		}
		else {
			if (_.isUndefined(setInputDetails.filloutform.amount) || _.isEmpty(setInputDetails.filloutform.amount)) {
				param.amount = validateFields.amount;
				newInput.filloutform = param;
				actions.setInputDetails(newInput);
			}
			delete setInputDetails.summary.transPass;
			this.setState({ isTransPassShowing: true });
		}
	}

	onBack = () => {
		const { actions, billspayment: { setInputDetails } } = this.props;
		delete setInputDetails.filloutform;
		actions.validateFields({});
	}

	closeModal = () => {
		this.setState({ isTransPassShowing: false, viewImage: false });
	}

	closeModal2 = () => {
		this.setState({ isTermsShowing: false });
	}

	_ViewImage = (item) => {
		const { billspayment: { setInputDetails, getRates, validateFields } } = this.props;
		this.setState({ imageURL: item, viewImage: true });
	}

	renderItem = ({ item, index }) => {
		const { billspayment: { setInputDetails, getRates, validateFields } } = this.props;
		const field = _.has(setInputDetails, "filloutform") ? setInputDetails.filloutform : [];
		console.log("TEST:", item)
		return (
			<View key={`${index}`} style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
				<Text style={{ width: "50%", fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard2 }}>{item.field.name}:</Text>
				{item.field.input === "image" ?
					<Text onPress={() => this._ViewImage(field[item.field.varname])} style={{ width: "50%", textAlign: "right", flexShrink: 1, fontSize: 14, fontFamily: "Roboto-Light", color: Color.LightBlue }}>
						View Image
					</Text> :
					<Text style={{ width: "50%", textAlign: "right", flexShrink: 1, fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard2 }}>
						{item.field.varname === "amount" && _.has(validateFields, "amount") ?
							Number(parseFloat(validateFields.amount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }) :
							item.field.input === "Dropdown" ? setInputDetails.getDP[item.field.varname] :
								field[item.field.varname]}
					</Text>
				}
			</View>
		)
	}

	renderBase() {
		const { selectConvertToRecieve } = this.props.wallet;
		const codeReceive = selectConvertToRecieve ? selectConvertToRecieve.code : "";
		return (
			<View style={{ flexShrink: 1, marginLeft: 5, flexDirection: "row", height: 40, alignItems: "center" }}>
				<Image style={styles.conRBImg} source={Res.get(codeReceive)} />
				<Text style={styles.conRBTxt1}>
					{codeReceive}
				</Text>
				<Icon name='menu-down' type='material-community' color={Color.Standard2} size={27} />
			</View>
		);
	}

	renderRow(rowData, rowID, highlighted) {
		console.log("ROW: ", rowData.code)
		return (
			<View style={{ paddingLeft: 7, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "flex-start", backgroundColor: "white" }}>
				<Image style={styles.conRRImg} source={Res.get(rowData.code)} />
				<Text style={[styles.conRRTxt,
				highlighted && { color: Color.black }]}>
					{`${rowData.name} Wallet`}
				</Text>
			</View>
		);
	}

	_SelectedValueToRecieve = (value) => {
		const { actions, wallet: { addedWallet } } = this.props;
		const selectedWallet = _.filter(addedWallet, (data) => {
			return data.code === value;
		});
		actions.selectedConvertToRecieved(selectedWallet[0]);
	}

	render() {
		const { wallet: { addedWallet, selectConvertToRecieve, convertedValuetoRecieved, currencyRate, convertSuccess },
			billspayment: { setInputDetails, validateFields, getRates, getFields }, login: { currentAccount, session } } = this.props;
		const userlevel = session.role.charAt(0).toUpperCase() + session.role.slice(1);
		const codeReceive = selectConvertToRecieve ? selectConvertToRecieve.code : "";
		const billers = _.has(setInputDetails, "chooseBillers.biller") ? setInputDetails.chooseBillers.biller : {};
		const fields = _.has(getFields, "fields") ? getFields.fields : {};
		const imageSrc = !_.isEmpty(getFields.logo) && !_.isEqual(getFields.logo, " ") ? { uri: getFields.logo } :
			!_.isEmpty(getFields.billerCode.logo) ? { uri: getFields.billerCode.logo } : require('../../../../resources/images/logo/ups_logo.png');
		let rates = "", convertToReceive = "";
		if (currencyRate.hasOwnProperty("rates") && !_.isEmpty(selectConvertToRecieve)) {
			rates = currencyRate.rates[selectConvertToRecieve.code];
		}
		if (selectConvertToRecieve.hasOwnProperty("currency")) {
			convertToReceive = selectConvertToRecieve.code;
		}
		if (convertSuccess) {
			return this.renderSuccess();
		}
		const amt = _.isUndefined(setInputDetails.filloutform.amount) ? eval(parseFloat(validateFields.amount)) : eval(parseFloat(setInputDetails.filloutform.amount))
		const totalAmount = eval(getRates.serviceCharge) + amt;
		const totalamt = Number(parseFloat(totalAmount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
		console.log("validateFields", validateFields, totalamt)
		return (
			<ScrollView style={{ paddingHorizontal: 20 }}>
				<View style={{ marginTop: 20, }}>
					<Text style={{ fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 20, }}>Confirmation Details</Text>
					<Text style={{ marginTop: 10, fontFamily: "Roboto-Light", fontSize: 16, }}>
						Please review all your paying bill details below.
				</Text>

					<View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 40 }}>
						<Text style={{ width: "80%", fontFamily: "Roboto-Light", fontSize: 18 }}>{billers}</Text>
						<Image style={{ width: 50, height: 50 }} resizeMode={'contain'} source={imageSrc} />
					</View>

					{/* <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
						<View>
							<Text tyle={{ fontSize: 20, fontFamily: "Roboto-Light", color: Color.Standard2 }}> User Level:</Text>
						</View>
						<View>
							<Text tyle={{ fontSize: 20, fontFamily: "Roboto-Light", color: Color.Standard2 }}>{userlevel}</Text>
						</View>
					</View> */}
					<Dash style={{ height: .1, marginTop: 20 }} />

					<FlatList
						data={fields}
						extraData={{ ...this.billspayment }}
						keyExtractor={(item, index) => `idx${index}`}
						renderItem={this.renderItem}
					/>
					<View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
						<Text style={{ fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard2 }}> Convenience Fee:</Text>
						<Text style={{ fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard2 }}>{getRates.serviceCharge.toFixed(2)}</Text>
					</View>
					{_.isUndefined(setInputDetails.filloutform.amount) || _.isEmpty(setInputDetails.filloutform.amount) ?
						<View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
							<Text style={{ fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard2 }}> Amount:</Text>
							<Text style={{ fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard2 }}>
								{Number(parseFloat(validateFields.amount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
							</Text>
						</View> : null
					}
				</View>

				<Dash style={{ height: .1, marginTop: 20 }} />


				<View style={{ height: "25%", marginTop: 20, }}>
					<Card style={{ height: "75%", borderRadius: 5, backgroundColor: "whitesmoke" }}>
						<View style={{ padding: 20, paddingTop: 20, borderTopRightRadius: 5, borderTopLeftRadius: 5 }}>
							<View style={{ flexDirection: "row" }}>
								<View style={{ flexDirection: "column" }}>
									<Text style={{ fontFamily: "Roboto-Light", fontSize: 16 }}>Pay In:</Text>
									<Dropdown
										animated={false}
										style={{ width: 180 }}
										showsVerticalScrollIndicator={false}
										renderBase={this.renderBase.bind(this)}
										dropdownStyle={{ height: 50, width: 70 }}
										options={_.filter(addedWallet, (item) => {
											// return item.code;
											if (_.isEqual(item.code, "PHP")) {
												return item.code;
											}
										})}
										renderButtonText={(e) =>
											this._SelectedValueToRecieve(e.code)}
										renderRow={this.renderRow.bind(this)}
										renderSeparator={null} />
								</View>
								<View style={styles.conView3}>
									<Text style={{ color: Color.LightBlue, fontFamily: "Roboto-Light", fontSize: 18, fontWeight: "bold", textAlign: "right", marginTop: 30 }}>
										{/* {convertedValuetoRecieved.toFixed(2)} */}
										{totalamt}
									</Text>
								</View>
							</View>
							<Text style={{ alignSelf: "center", color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 14 }}>Wallet Balance: {numeral(selectConvertToRecieve.balance).format("0,00.0000")} {codeReceive}</Text>
							<View style={{ marginTop: 10, alignSelf: "center", width: "100%", height: 1, backgroundColor: Color.Standard }}>
							</View>
							<Text style={{ marginTop: 10, alignSelf: "center", color: Color.Standard, fontFamily: "Roboto-Light", fontSize: 22 }}> Current Rate</Text>
							<Text style={{ alignSelf: "center", color: Color.Standard, fontFamily: "Roboto-Light", fontSize: 14, }}>
								{/* {_.isEmpty(selectConvertToRecieve) ? "" : `1 PHP ~ ${numeral(rates).format("0,00.0000")} ${convertToReceive}`} */}
								{/* {_.isEmpty(selectConvertToRecieve) ? "" : `1 PHP ~ ${numeral(rates).format("0,00.0000")} ${codeReceive}`} */}
								{_.isEmpty(selectConvertToRecieve) ? "" : `1 PHP ~ ${numeral(1).format("0,00.0000")} ${codeReceive}`}
							</Text>
						</View>
					</Card>
					<View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
						<Text style={{ fontFamily: "Roboto-Light", fontSize: 18, fontWeight: "bold" }}> Total Amount </Text>
						{/* <Text style={{fontFamily: "Roboto-Light", fontSize: 22, fontWeight: "bold"}}> {convertedValuetoRecieved.toFixed(2)} {codeReceive} </Text> */}
						<Text style={{ fontFamily: "Roboto-Light", fontSize: 18, fontWeight: "bold" }}> {totalamt} {codeReceive} </Text>
					</View>

					<View style={{ flex: 1, flexDirection: "row", marginTop: 15, alignItems: "center" }}>
						<CheckBox
							containerStyle={{ marginVertical: 0, paddingVertical: 0 }}
							iconType='material'
							checkedIcon='check-box'
							uncheckedIcon='check-box-outline-blank'
							onPress={() => this.setState({ isCheck: !this.state.isCheck })}
							checked={this.state.isCheck} />
						<Text style={{ width: "80%", fontFamily: "Roboto", fontSize: 13, fontWeight: "bold" }}>
							By clicking the "Agree" button, you hereby acknowledge the following:
						</Text>
						{/* <Text style={{ fontFamily: "Roboto", fontSize: 14 }}>I agree with the
							<Text onPress={() => this.setState({ isTermsShowing: true })} style={{ fontFamily: "Roboto", fontSize: 14, color: Color.LightBlue }}>
								{` Terms and Conditions and \nCancellation Policy `}</Text>
						that i have read</Text> */}
					</View>
					<Text style={{ fontFamily: "Roboto", fontSize: 13, marginLeft: 55, marginBottom: 10 }}>
						{`\n• GPRS-Unified Products and Services, Inc. will not be liable for disputes resulting from incorrect entry of amount, account numbers and other information in this transaction. \n• No refund will be processed on a successful transaction.`}
					</Text>

					<View style={{ height: 50 }}></View>
				</View>

				<TermsConditionModal
					{...this.props}
					{...this.state}
					isTermsShowing={this.state.isTermsShowing}
					closeModal2={this.closeModal2}
				/>

				<SummaryModal
					{...this.props} {...this.state}
					isTransPassShowing={this.state.isTransPassShowing}
					closeModal={this.closeModal}
				/>
				<ViewImageModal
					closeModal={this.closeModal}
					viewImage={this.state.viewImage}
					imageURL={this.state.imageURL}
				/>
			</ScrollView>
		);
	}
}

SummaryScreen.propTypes = {
	billspayment: PropTypes.object,
};

export default SummaryScreen;