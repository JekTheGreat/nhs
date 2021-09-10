/* eslint-disable no-inline-comments */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, ScrollView, Image, InteractionManager, Dimensions,
	TouchableOpacity, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import Confirm from "__src/resources/svg/buyload/Confirm";
import Resources from "__src/resources";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import _ from "lodash";
import {Card} from "native-base";
import Loading from "__src/components/Loading";
import Wallets from "./Wallets";
import numeral from "numeral";
const SCREEN_WIDTH = Dimensions.get("window").width;

const {Color, Res} = Resources;

const truncateSixDecimal = {};
truncateSixDecimal.floor = function(number, precision) {
	const factor = Math.pow(10, precision);
	const tempNumber = number * factor;
	const roundedTempNumber = Math.floor(tempNumber);

	return roundedTempNumber / factor;
};

export default class Payment extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			error: {},
			wallet: {},
			ratefrom: false,
			rateto: false,
			convert: false,
			didFinishInitialAnimation: true,
			isWalletsShow: false,
			selectedCurrency: {},
		};
	}
  
	componentDidMount(){
		const {wallet: {walletSelected}} = this.props;
		InteractionManager.runAfterInteractions(() => {
			this.setState({
				didFinishInitialAnimation: false, selectedCurrency: walletSelected,
			});
		});
	}

	componentWillUnmount(){
		const {actions} = this.props;

		actions.convertAmountInput(null);
		actions.resetAmountInput();
	}

	renderBase() {
		const { selectConvertToRecieve } = this.props.wallet;
		const codeReceive = selectConvertToRecieve ? selectConvertToRecieve.code : "";

		return (
			<View style={styles.conRenderBase}>
				<Image style={styles.conRBImg} source={Res.get(codeReceive)}/>
				<Text style={styles.conRBTxt1}>
					{codeReceive}
				</Text>
				<Icon name="menu-down" type="material-community" color={Color.Standard2} size={27} />
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
  
  _SelectedValueToRecieve = (value) => {
  	const { actions, wallet: { addedWallet } } = this.props;
  	const selectedWallet = _.filter(addedWallet, (data) => {
  		return data.code === value;
  	});

  	this.setState({rateto: true, ratefrom: true, convert: true, error: {}});
  	actions.selectedConvertToRecieved(selectedWallet[0]);
  }
	
	onSubmit = () => {
		this.props.onShowTrans();
	}

	onShowWallets= () => {
		const {isWalletsShow} = this.state;

		this.setState({isWalletsShow: !isWalletsShow});
	};
	renderError = () => {
		const {error} = this.state;
		const {loading: {loadInventoryFailed}} = this.props;
		
		if (!_.isEmpty(error) || !_.isEmpty(loadInventoryFailed)){
			return (
				<View style={styles.inpuView1}>
					<Icon containerStyle={styles.iconContainerStyle}
						name="close-circle" type="material-community" color={Color.red} size={15} />
					<Text style={[styles.txt3, {color: Color.red}, styles.flex1]}>
						{error.payment || loadInventoryFailed}</Text>
				</View>
			);
		}
		
		return null;
	}

	toPrecisedTruncate = (number, nth) => {
		return Number.parseFloat(number).toPrecision(nth);
	};


	onItemClick = (item) => {
		const {loading: {selectedInventory}, actions,
			login: {currentAccount, session}} = this.props;
		const params = {};
		this.setState({selectedCurrency: item});

		params.currency = item.code;
		params.type = selectedInventory.isInternational == 0 || false ?
			"local" : "international";
		params.amount = selectedInventory.amount;
		params.system = "unified";
		params.userLevel = currentAccount.userLevel;
		params.denomination =  selectedInventory.denomination;
		params.productName = `${selectedInventory.name}`;
		params.mobileNetworkId = selectedInventory.isInternational == 0 || false ?
			"INVENTORY" : selectedInventory.provider;
		actions.convertLoad(params, session.token);
		actions.selectedWallet(item.code);
	};

	render() {
		const {didFinishInitialAnimation, selectedCurrency, isWalletsShow} = this.state;
		const {loading: {selectedInventory, setInputInventory,
			loadComputation, isLoadComputation}, wallet: {addedWallet}} = this.props;

		if (didFinishInitialAnimation || isLoadComputation){
			return <Loading customStyle={{backgroundColor: Color.bg}} size="small" color="black" />;
		}
		const mobile = `+${setInputInventory.prefix}${setInputInventory.mobile}`;
		const hasLocalComputation = _.isEmpty(loadComputation) ? "" : loadComputation.data.metaData.loadAmount;
		const hasIntComputation = _.isEmpty(loadComputation) ? "" : `${loadComputation.data.metaData.amountWMarkUp}`;
		const amount = selectedInventory.isInternational == 0 || false ?
			hasLocalComputation : hasIntComputation;

  	return (
  		<View style={styles.flex1padH20}>
  			<ScrollView style={styles.flex1} showsVerticalScrollIndicator={false}>
					<View style={styles.viewImage}>
						<Confirm width={SCREEN_WIDTH - 100} height={150}/>
					</View>
					<Wallets visible={isWalletsShow} wallets = {addedWallet}
						onItemClick={this.onItemClick} loadComputation = {loadComputation}
						onClose={this.onShowWallets} />
					<Text style={{textAlign: "center", color: Color.LightBlue4, fontSize: 20}}>
						TRANSACTION DETAILS
					</Text>
					<Card style={[styles.payCard1, styles.marT10]}>
						<View style={[styles1.flex1]}>
							<View style={[{width: "100%", flexDirection: "row", marginTop: 0}]}>
								<Text style={[styles1.labelStyle]}>
									{`${selectedInventory.isInternational == 0 || false ?
										"Mobile Number:" : "Email:"}`}
								</Text>
								<Text selectable style={[styles1.valueStyle]}>
									{`${selectedInventory.isInternational == 0 || false ? mobile :
										_.truncate(setInputInventory.email, {length: 27, separator: ""})}`}
								</Text>
							</View>
						</View>
						<View style={[styles1.flex1]}>
							<View style={[styles1.Wrapper1]}>
								<Text style={[styles1.labelStyle]}>
									{"Loading Type:"}
								</Text>
								<Text selectable style={[styles1.valueStyle]}>
									{`${selectedInventory.isInternational == 0 || false ?
										"Local E-Loads" : "International E-Loads"}`}</Text>
							</View>
						</View>
						<View style={[styles1.flex1]}>
							<View style={[styles1.Wrapper1]}>
								<Text style={[styles1.labelStyle]}>
									{"Loading Category:"}
								</Text>
								<Text selectable style={[styles1.valueStyle]}>
									{`${selectedInventory.categoryId}`}</Text>
							</View>
						</View>
						<View style={[styles1.flex1]}>
							<View style={[styles1.Wrapper1]}>
								<Text style={[styles1.labelStyle]}>
									{"Product Code/Name:"}
								</Text>
								<Text selectable style={[styles1.valueStyle]}>
									{`${_.truncate(selectedInventory.name, {length: 21, separator: ""})}`}
								</Text>
							</View>
						</View>
						<View style={[styles1.flex1]}>
							<View style={[styles1.Wrapper1]}>
								<Text style={[styles1.labelStyle]}>
									{"Amount:"}
								</Text>
								<Text selectable style={[styles1.valueStyle]}>
									{`${_.isEmpty(loadComputation) ? "" : amount}`}</Text>
							</View>
						</View>
						{/* <View style={[styles1.flex1]}>
							<View style={[styles1.Wrapper1]}>
								<Text style={[styles1.labelStyle]}>
									{"Converted Amount:"}
								</Text>
								<Text selectable style={[styles1.valueStyle]}>
									{`${_.isEmpty(loadComputation) ? "" :
									loadComputation.data.metaData.convertedAmount}`}</Text>
							</View>
						</View> */}
					</Card>

  				<Card style={[styles.payCard1]}>
						<View style = {{flexDirection: "row"}}>
							<View>
  							<Text style={[styles.contxt6, {fontWeight: "100"}]}>Pay In</Text>
								<TouchableOpacity activeOpacity={0.9}
									onPress = {() => this.onShowWallets()}
									 style={styles.view4}>
									<Image style={styles.imageCurrency1}
										source={Res.get(selectedCurrency.code)}/>
									<Text style={styles.txtNumber1}>{selectedCurrency.code}</Text>
									<Icon name="chevron-down" type="feather" size={16}/>
								</TouchableOpacity>
							</View>
							<View style = {{marginLeft: 30}}>
								<View style = {{flexDirection: "row"}}>
									<Text style={{color: Color.LightBlue, fontSize: 18}}>{_.isEmpty(loadComputation) ? "" :
										`${truncateSixDecimal.floor(
											loadComputation.data.totalAmount, 6)}`}</Text>
									<Text style={[styles.contxt6, {marginTop: 5}]}>
										{_.isEmpty(loadComputation) ? "" : ` ${selectedCurrency.code}`}
									</Text>
								</View>
								<Text style={[styles.contxt6, {fontWeight: "100", fontSize: 12}]}>
									{"Wallet Balance: "}
									<Text style={[styles.contxt6, {fontWeight: "100", fontSize: 11}]}>
										{`${numeral(selectedCurrency.balance).format("000,000.00") } `}
										<Text style={[styles.contxt6, {fontWeight: "300", fontSize: 11}]}>
											{`${selectedCurrency.code}`}</Text>
									</Text>
								</Text>
							</View>
						</View>
  				</Card>
					<Card style={styles.payCard1}>
  					<Text style={styles.txt2}>Amount Due:
							<Text style={styles.txt1}> {_.isEmpty(loadComputation) ? "" :
								`${truncateSixDecimal.floor(loadComputation.data.totalAmount, 6)}`}
							</Text>
							<Text style={styles.contxt6}> {_.isEmpty(loadComputation) ? "" :
								`${selectedCurrency.code}`}</Text>
  					</Text>
						<Text style={styles.txtDiscount}>Your discount:{" "}
							<Text style={{color: Color.LightBlue}}>
								{_.isEmpty(loadComputation) ? "" : `${loadComputation.data.metaData.discount} ${selectedCurrency.code}`}
							</Text>
						</Text>
  				</Card>
					{this.renderError()}
  				<View style={[styles.payView1, styles.marB20]}>
  					<Icon name="info" color={Color.LightBlue} size={18} containerStyle={styles.payIcon}/>
  					<Text style={[styles.txt4, {color: Color.LightBlue4}]}>
						Note: Please review your details</Text>
  				</View>
  			</ScrollView>
  		</View>
  	);
	}
}
Payment.propTypes = {
	actions: PropTypes.object,
	wallet: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
	loading: PropTypes.object,
	onShowTrans: PropTypes.func,
};

const styles1 = StyleSheet.create({
	flex1: {flexShrink: 1},
	Wrapper1: {width: "100%", flexDirection: "row", marginTop: 10},
	labelStyle: {color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 14},
	valueStyle: {flex: 1, color: Color.Standard2,
		fontFamily: "Roboto",  textAlign: "right", fontSize: 14},
});
