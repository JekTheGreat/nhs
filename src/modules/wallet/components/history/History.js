/* eslint-disable */
import React, {PureComponent} from "react";
import {Text, View,  FlatList,  TouchableOpacity, StyleSheet, Image, TextInput} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import Resource from "__src/resources";
import moment from "moment";
import {Icon} from "react-native-elements";
import Dropdown from "__src/components/Dropdown";
import DatePicker from "__src/components/datepicker";
import LoaderModal from "__src/components/LoaderModal";
const {Res, Color} = Resource;

const bankdata = ["BDO(Banco De Oro)", "RCBC", "BPI", "UnionBank",
	"CitiBank", "PNB"];

export default class HistoryScreen extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showFilter: false,
			transaction: "",
			currency: "",
			date: "",
			start: "",
			end: "",
			transactions: [],
			search: "",
		};
	}

	componentDidMount(){
		const { actions, login: { session }, wallet: {logHistory} } = this.props;
		const params = {};
		actions.getWalletLog(session.token);
		if(!_.isEmpty(logHistory)){
			this.setState({transactions: this.state.transactions.concat(logHistory.data)});
		}
	}

	componentDidUpdate(prevProps){
		const {wallet: {logHistory}} = this.props;

		if (!_.isEqual(prevProps.wallet.logHistory, logHistory) && !_.isEmpty(logHistory)){
			this.setState({transactions: []});
			const updated = logHistory.data;
			setTimeout( () => {this.setState({transactions: 
				this.state.transactions.concat(updated)})},1000);
			
		}
	}

	onClick = (item) => {
		const {navigation, actions, wallet: { requestScreenHeader },login: { session }} = this.props;
		
		if(item.service === "BANK" && (item.status === "PENDING" || item.status === "PROCESSING")){
			requestScreenHeader.amount = true;
			requestScreenHeader.payment = true;
			actions.setHeaderTitle("Bank Deposit");
			actions.setRequestScreen("bankDepositPayment");
			actions.setRequestScreenHeader(requestScreenHeader);
			navigation.navigate("FundRequest", {title: "Bank Deposit"});
			actions.getFundRequest(item.transactionNumber, session.token);
		}

		if(item.service === "OUTLET" && (item.status === "PENDING" || item.status === "PROCESSING")){
			requestScreenHeader.amount = true;
			requestScreenHeader.payment = true;
			actions.setHeaderTitle("Unified Outlet");
			actions.setRequestScreen("unifiedPayment");
			actions.setRequestScreenHeader(requestScreenHeader);
			navigation.navigate("FundRequest", {title: "Unified Outlet"});
			actions.getFundRequest(item.transactionNumber, session.token);
		}

		// navigation.navigate("FundRequest", {title: "Transaction Details"});
		if(item.service === "LOADING"){
			navigation.navigate("TransactionDetail", {title: "Transaction Details", item: item});
		}
	}

	renderBase(type) {
		const {transaction} = this.state;

		if (type === "transaction"){
			return (
				<View style={styles.renderBase}>
					<Text style={styles.txtInput}>
						All Transactions
					</Text>
					<Icon name='arrow-drop-down' color="black" size={27} />
				</View>
			);
		}

		if (type === "currency"){
			return (
				<View style={styles.renderBase}>
					<Text style={styles.txtInput}>
						All Currencies
					</Text>
					<Image style={styles.renderBaseImg} source={Res.get("PHP")} />
					<Icon name='arrow-drop-down' color="black" size={27} />
				</View>
			);
		}

		return (
			<View style={styles.renderBase}>
				<Text style={styles.txtInput}>
					Past 30 days
				</Text>
				<Icon name='arrow-drop-down' color="black" size={27} />
			</View>
		);
		
	}

	renderRow(rowData, rowID, highlighted) {
		console.log("rowData",rowData);
		console.log("rowID",rowID);
		console.log("highlighted", highlighted);

		return (
			<View style={[styles.renderRow, highlighted && {backgroundColor: Color.highlight}]}>
				<Text style={[styles.renderRowText,
					highlighted && styles.highlighted ]}>
					{`${rowData}`}
				</Text>
			</View>
		);
	}

	getIconServices = (type) => {
		switch(type){
			case "CASH-IN":
				return "circle_fund";
			case "ONLINE STORE":
				return "circle_wallet";
			case "LOADING":
				return "circle_mobile";
			case "TICKETING":
				return "circle_wallet";
			case "E2E":
				return "circle_send";
			case "BILLSPAYMENT":
				return "circle_fund";
			case "CASH-IN":
				return "circle_fund";
			default:
				return "circle_wallet";
		}
	}

	getStatus = (type) => {
		switch(type){
			case "PENDING":
				return "Payment pending";
			case "PROCESSING":
				return "Verifying your payment";
			default:
				return type;
		}
	}

	getColor = (type) => {
		switch(type){
			case "FAILED":
				return {color: Color.red};
			case "COMPLETED":
				return {color: Color.green};
			case "PENDING":
				return {color: Color.LightBlue4};
			default:
				return {color: Color.LightBlue4};
		}
	}

	renderItem = ({item, index}) => {
		const color = index % 2 ? {backgroundColor: Color.LightBlue2} : null;
		const date = moment(new Date(item.createdAt));
		const transNo = _.has(item, "transactionNumber") ? item.transactionNumber : ""

		return (
			<TouchableOpacity onPress={() => this.onClick(item)} activeOpacity={0.5}
				key={`idx ${index}`} style={[styles.container, color]}>
  			<Image style={styles.imageLogo} source={Res.get(this.getIconServices(item.service))} resizeMode={"contain"} />
  			<View style={styles.view1}>
  				<Text style={styles.txtRemark}>{`${item.transactionType === "PAYMENT" ? "" : item.transactionType +" via " } ${item.service === "BANK" ? item.serviceType : item.service}`}</Text>
  				<Text numberOfLines={2} style={[styles.txtStatus, this.getColor(item.status)]}>{this.getStatus(item.status)}</Text>
  			</View>
  			<View style={styles.view2}>
  				<Text numberOfLines={2} style={styles.txtTrack}>Transaction No. {transNo}</Text>
  				<Text style={styles.txtTime}>{date.format("MMM DD, YYYY h:mm A")}</Text>
  				<Text style={styles.txtTime}> - {item.currency} {item.amount}</Text>
  			</View>
  		</TouchableOpacity>
		);
	}

	renderFilter = () => {
		const {showFilter} = this.state;

		if (!showFilter){
			return null;
		}

		return (
			<View style={{marginBottom: 15}}>
				<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
					<View style={{width: "45%"}}>
						<Dropdown
							animated={false}
							showsVerticalScrollIndicator={false}
							renderBase={this.renderBase.bind(this, "transaction")}
							dropdownStyle={styles.dropDownStyle}
							options={bankdata}
							// renderButtonText={(e) => this._selectBank(e)}
							renderRow={this.renderRow.bind(this)}
							renderSeparator={null} />
					</View>
					<View style={{width: "45%"}}>
						<Dropdown
							animated={false}
							showsVerticalScrollIndicator={false}
							renderBase={this.renderBase.bind(this, "currency")}
							dropdownStyle={styles.dropDownStyle}
							options={bankdata}
							// renderButtonText={(e) => this._selectBank(e)}
							renderRow={this.renderRow.bind(this)}
							renderSeparator={null} />
					</View>
				</View>

				<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
					<View style={{width: "45%"}}>
						<Dropdown
							animated={false}
							showsVerticalScrollIndicator={false}
							renderBase={this.renderBase.bind(this)}
							dropdownStyle={styles.dropDownStyle}
							options={bankdata}
							// renderButtonText={(e) => this._selectBank(e)}
							renderRow={this.renderRow.bind(this)}
							renderSeparator={null} />
					</View>
				</View>
			</View>
		);
	}

	onRefresh = () => {
		const {login: {session}, actions} = this.props;

		actions.getWalletLog(session.token);
	}

	onChangeText = (value) => {
		this.setState({search: value.toUpperCase()});
	}

	filterTransactions = (type) => {
		const {wallet:{logHistory}} = this.props;
		const {transactions, search} = this.state;
		
		if(type === "date") {
			if(!_.isEmpty(logHistory)){
				for(i = 0; i < logHistory.data.length; i++){
					if(moment(logHistory.data[i].createdAt).format("YYYY-MM-DD") == moment(this.state.start).format("YYYY-MM-DD")){
						transactions.push(logHistory.data[i]);
					}
				}
			this.onRefresh();
			}
		} else {
			if(!_.isEmpty(logHistory)){
				for(i = 0; i < logHistory.data.length; i++){
					if(logHistory.data[i].transactionNumber === search){
						transactions.push(logHistory.data[i]);
					}
				}
			this.onRefresh();
			}
		}
	}

	render() {
		const {wallet: {isFetching}} = this.props;
		const {start, transactions} = this.state;
		
		return (
  		<View style={styles.flex1}>
				<View style={styles.top}>
					<View style={styles.topView1}>
						<Text style={styles.topTxt1}>Recent Activity</Text>
						<TouchableOpacity
							onPress={() => this.setState({showFilter: !this.state.showFilter})}
							activeOpacity={0.7} style={styles.btnFilter}>
							<Icon name="tune" type="material-community" size={20} color={Color.colorPrimary}/>
							<Text style={{fontSize: 17, fontFamily: "Roboto", color: Color.colorPrimary}}>Filter</Text>
						</TouchableOpacity>
					</View>
					{/* {this.renderFilter()} */}
					{
						this.state.showFilter ?
						<View style={styles.dateContainer}>
							<View style={styles.datePickerView}>
								<DatePicker
									date={start}
									mode="date"
									compName="Date"
									placeholder = "Date"
									format="YYYY-MM-DD"
									onDateChange={(date) => {
										this.setState({start: date});
										this.setState({transactions: []});
										setTimeout( () => {this.filterTransactions("date")},1000);
									}}
									/>
							</View>
							<View style={styles.datePickerView}>
							<TextInput style={styles.inputSearch} onChangeText={this.onChangeText} placeholder={"Transaction Number"}
								onSubmitEditing={ () => {
									this.setState({transactions: []});
									setTimeout( () => {this.filterTransactions("transNum")},1000);
								}}/>
							</View>
						</View> : 
						<View></View>
					}
				</View>
			
  			<View style={styles.flex1}>
					<FlatList
						onRefresh={() => this.onRefresh()}
						refreshing={isFetching}
						data={transactions}
						renderItem={this.renderItem}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={<Text style={[styles.txt4, styles.marT10]}>
						No item available!</Text>}
						keyExtractor={(item, index) => `idx ${index}`} />
  			</View>
				{/* <LoaderModal loading={isRequestingFund}/> */}
  		</View>
  	);
	}
}

HistoryScreen.propTypes = {
	actions: PropTypes.object,
	service: PropTypes.object,
	navigation: PropTypes.object,
	wallet: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flexShrink: 1, padding: 15, flexDirection: "row",
		justifyContent: "center", alignItems: "center", backgroundColor: Color.white},
	imageLogo: {width: 45, height: 45},
	view1: {flexDirection: "column", flex: 1, marginLeft: 10},
	view2: {flexDirection: "column", width: "50%", marginLeft: 10},
	top: {paddingTop: 30, paddingBottom: 10, paddingHorizontal: 15 },
	topView1: {flexShrink: 1, justifyContent: "space-between", flexDirection: "row"},
	topTxt1: {fontSize: 16, fontFamily: "Roboto", color: Color.Standard2},
	flex1: {flex: 1, backgroundColor: Color.bg},
	txtRemark: {fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", flex: 1,},
	txtStatus: {flex: 1, fontSize: 12, color: Color.LightBlue, fontFamily: "Roboto-Light", bottom: 0},
	txtTrack: {fontSize: 10, color: Color.LightBlue, textAlign: "right", fontFamily: "Roboto-Light"},
	txtTime: {fontSize: 10, color: Color.Standard2, textAlign: "right", fontFamily: "Roboto-Light"},
	txtInput: {flex: 1, fontFamily: "Roboto-Light", fontSize: 14},

	dropDownStyle: {height: 150},
	renderBase: {flexDirection: "row", width: "100%", height: 40, alignItems: "center",  borderBottomColor: "#404040", borderBottomWidth: 0.6},
	renderRow: {paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white"},
	renderRowText: {margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center"},
	renderBaseImg: {width: 20, height: 20},
	highlighted: {fontWeight: "bold"},

	btnFilter: {flexDirection: "row", alignItems: "center", justifyContent: "center"},
	txt4: {textAlign: "center", fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 14},
	marT10: {marginTop: 10},
	datePickerView: {width: "45%"},
	dateContainer: {flexDirection: "row", justifyContent: "space-between"},
	inputSearch: {flex: 1, marginLeft: 3, paddingVertical: 0, borderBottomWidth: 0.5},
});

