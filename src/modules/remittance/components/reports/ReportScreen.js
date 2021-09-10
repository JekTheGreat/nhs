/* eslint-disable */
import React, {PureComponent} from "react";
import {Text, View,  FlatList,  TouchableOpacity, StyleSheet, Image} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import Resource from "__src/resources";
import DatePicker from "__src/components/datepicker";
import TxtInput from "__src/components/TxtInput";
import moment from "moment";
import {Icon} from "react-native-elements";
import Dropdown from "__src/components/Dropdown";

const {Res, Color} = Resource;

const bankdata = ["BDO(Banco De Oro)", "RCBC", "BPI", "UnionBank",
	"CitiBank", "PNB"];

export default class ReportScreen extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showFilter: false,
			transaction: "",
			currency: "",
			date: "",
		};
	}

	componentDidMount(){
		const {actions} = this.props;

		// actions.fetchProvider();
		const today = moment().format("MM/DD/YYYY");
		const lastWeek = moment().subtract(7, 'days').format("MM/DD/YYYY")
		const params = {
			accountId: "137965341084",
			company: "UPS",
			// end: "07/08/2019",
			end : today,
			limit: 10,
			// providerId: [1, 3, 5, 2],
			provider:[],
			skip: 0,
			start : lastWeek,
			// start: "04/01/2019",
			userId: 12,
		};

		actions.SendReports(params);
	}

	onClick =(item) => {
		const {navigation} = this.props;

		// navigation.navigate("TransactionDetail", {title: "Transaction Details"});
	}

	renderBase(type) {
		const {transaction} = this.state;

		if (type === "transaction"){
			return (
				<View style={styles.renderBase}>
					<Text style={styles.txtInput}>
						Transaction Type
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
		const newRow = _.isObject(rowData) ? rowData.name : rowData;

		return (
			<View style={[styles.renderRow, highlighted && {backgroundColor: Color.highlight}]}>
				<Text style={[styles.renderRowText,
					highlighted && styles.highlighted ]}>
					{`${newRow}`}
				</Text>
			</View>
		);
	}

	renderItem = ({item, index}) => {
		const color = index % 2 ? {backgroundColor: Color.LightBlue2} : null;
		const date = moment(new Date(item.updatedAt));
		const type = item.providerId.name;

		return (
			<TouchableOpacity onPress={this.onClick} activeOpacity={0.5}
				key={`idx ${index}`} style={[styles.container, color]}>
  			<View style={styles.view1}>
  				<Text numberOfLines={2} style={styles.txtRemark}>Transaction Type: <Text style={{fontWeight: "500"}}>{type}</Text></Text>
  				<Text style={styles.txtStatus}>Account ID: {item.accountId}</Text>
  			</View>
  			<View style={styles.view2}>
  				<Text style={styles.txtTrack}>Track No. #{item.transactionNumber}</Text>
  				<Text style={styles.txtTime}>{date.format("h:mm A")}</Text>
  				<Text style={styles.txtTime}>{date.format("MM/DD/YYYY")}</Text>
  			</View>
  		</TouchableOpacity>
		);
	}

	renderFilter = () => {
		const {showFilter} = this.state;
		const {remittance: {fetchProvider}} = this.props;

		if (!showFilter){
			return null;
		}

		return (
			<View style={{marginBottom: 15}}>
				<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
					<View style={{width: "45%"}}>
						<DatePicker
							date={""}
							mode="date"
							compName="Date"
							placeholder = "Entry Date"
							format="YYYY-MM-DD"
							// onDateChange={this._handleInputChange("birthday")}
							/>
					</View>
					<View style={{width: "45%"}}>
						<Dropdown
							animated={false}
							showsVerticalScrollIndicator={false}
							renderBase={this.renderBase.bind(this, "transaction")}
							dropdownStyle={styles.dropDownStyle}
							options={fetchProvider}
							// renderButtonText={(e) => this._selectBank(e)}
							renderRow={this.renderRow.bind(this)}
							renderSeparator={null} />
					</View>
				</View>

				<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
					<View style={{width: "100%"}}>
						<TxtInput
							value={""}
							placeholder="Search Track No. / Account ID"
							style={styles.marginTop10}
							compName="Search2"/>
					</View>
				</View>
			</View>
		);
	}

	render() {
		const {remittance: {SendReports, isSendingReport}} = this.props;

		return (
  		<View style={styles.flex1}>
				<View style={styles.top}>
					<View style={styles.topView1}>
						<Text style={styles.topTxt1}>Recent reports</Text>
						<TouchableOpacity
							onPress={() => this.setState({showFilter: !this.state.showFilter})}
							activeOpacity={0.7} style={styles.btnFilter}>
							<Icon name="tune" type="material-community" size={20} color={Color.colorPrimary}/>
							<Text style={{fontSize: 17, fontFamily: "Roboto", color: Color.colorPrimary}}>Filter</Text>
						</TouchableOpacity>
					</View>
					{this.renderFilter()}
					
				</View>
			
  			<View style={styles.flex1}>
					<FlatList
						onRefresh={() => this.componentDidMount()}
						refreshing={isSendingReport}
						data={SendReports.D || []}
						renderItem={this.renderItem}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={<Text style={[styles.txt4, styles.marT10]}>
						No item available!</Text>}
						keyExtractor={(item, index) => `idx ${index}`} />
  			</View>
  		</View>
  	);
	}
}

ReportScreen.propTypes = {
	actions: PropTypes.object,
	service: PropTypes.object,
	navigation: PropTypes.object,
	wallet: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flexShrink: 1, padding: 15, flexDirection: "row",
		justifyContent: "center", alignItems: "center", backgroundColor: Color.white},
	imageLogo: {width: 45, height: 45},
	view1: {flexDirection: "column", flex: 1},
	view2: {flexDirection: "column", flexShrink: 1, marginLeft: 10},
	top: {paddingTop: 30, paddingBottom: 10, paddingHorizontal: 15 },
	topView1: {flexShrink: 1, justifyContent: "space-between", flexDirection: "row"},
	topTxt1: {fontSize: 16, fontFamily: "Roboto", color: Color.Standard2},
	flex1: {flex: 1, backgroundColor: Color.bg},
	txtRemark: {flex: 1, fontSize: 14, color: Color.Standard2, fontFamily: "Roboto-Light"},
	txtStatus: {fontSize: 16, color: Color.Standard2, fontFamily: "Roboto"},
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
});

