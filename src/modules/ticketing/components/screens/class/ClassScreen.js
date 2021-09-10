/* eslint-disable max-len */
/* eslint-disable import/named */
import React from "react";
import {View, Modal, StyleSheet, SafeAreaView, Text, ScrollView, Image, TextInput, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import getSymbol from "currency-symbol-map";
import numeral from "numeral";
import {HeaderBackButton} from "react-navigation-stack";
import PropTypes from "prop-types";
import _ from "lodash";
import Button from "./Button";
import ButtonDone from "__src/components/Button";
import Guest from "./Guest";
import Resource from "__src/resources";
import Dropdown from "__src/components/Dropdown";
import Airlines from "../../../data/AirlineTitles";
const {Color, Res} = Resource;
const NEWAIRLINES = Object.values(Airlines);

class ClassScreen extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			setactive: "Economy",
			search: "",
			airlines: NEWAIRLINES,
		};
	}
  
  isActive = (type) => {
  	const {ticketing: {setTicketingInput}} = this.props;
    
  	if (setTicketingInput.bookingClass === type){
  		return true;
  	}
  	
  	return false;
  }

  onClassPress = (type) => {
  	this.setState({setactive: type});
  	const {ticketing: {setTicketingInput}, actions} = this.props;
  	const newInput = _.merge({}, setTicketingInput);

  	newInput.bookingClass = type;
  	actions.setTicketingInput(newInput);
  }
	
	onAdultPress = (num) => {
		const {ticketing: {setTicketingInput}, actions} = this.props;
		const newInput = _.merge({}, setTicketingInput);

		if (newInput.adults === newInput.infants && num === -1){
			newInput.infants = setTicketingInput.infants - 1;
		}
		
		newInput.adults += num;
		actions.setTicketingInput(newInput);
	}

	onSeniorPress = (num) => {
		const {ticketing: {setTicketingInput}, actions} = this.props;
		const newInput = _.merge({}, setTicketingInput);
		
		newInput.adults = 0;
		newInput.children = 0;
		newInput.infants = 0;
		newInput.seniors += num;

		if (newInput.seniors === 0){
			newInput.adults = 1;
		}
		
		actions.setTicketingInput(newInput);
	}

	onChildPress = (num) => {
		const {ticketing: {setTicketingInput}, actions} = this.props;
		const newInput = _.merge({}, setTicketingInput);

		newInput.children += num;
		actions.setTicketingInput(newInput);
	}

	onInfantPress = (num) => {
		const {ticketing: {setTicketingInput}, actions} = this.props;
		const newInput = _.merge({}, setTicketingInput);

		newInput.infants += num;
		actions.setTicketingInput(newInput);
	}

	_renderBase = () => {
		const {ticketing: {setAirlines}} = this.props;

		return (
			<View style={styles.renderBase}>
				{setAirlines.map((item) => {
					return (
						<View key={item} style={styles.renderBaseView1}>
							<Text style={styles.textAirline}>{item}</Text>
							<TouchableOpacity onPress={() => this.onChangeAirline(item, true)}>
								<Icon name="close" type="evilicon" size={16} color="black"/>
							</TouchableOpacity>
						</View>
					);
				})}
									
				<View style={styles.renderBaseView2}>
					<Icon name="add" size={10} color="white"/>
				</View>
			</View>
		);
	}

	renderSearch = () => {
		return (
			<View style={styles.renderSearch}>
				<TextInput style={styles.input}
					onChangeText={this.onSearch}
					value={this.state.search}
					placeholder="Search here..."/>
			</View>
		);
	}

	_renderRow( rowData) {
		const {ticketing: {setAirlines}} = this.props;
		const isInclude = _.includes(setAirlines, rowData);

		return (
			<View style={[styles.dropdownRow]}>
				<Text style={[styles.dropdownRowText,
					isInclude && styles.dropdownRowText2]}>
					{`${rowData}`}
				</Text>
				{isInclude && <Icon name="check" color={Color.LightBlue5} size={12}/>}
			</View>
		);
	}

	onChangeAirline = (val, remove) => {
		const {actions, ticketing: {setAirlines}} = this.props;
		const isExist = _.filter(setAirlines, (item) => item === val);

		if (val === "All Airlines"){
			actions.setAirlines([val]);
		}

		if (_.isEmpty(isExist) && val !== "All Airlines"){
			let newAirline = _.filter(setAirlines, (item) => item !== "All Airlines");
			newAirline = _.concat(newAirline, val);
			actions.setAirlines(newAirline);
		}

		if (remove){
			const newAirline = _.filter(setAirlines, (item) => item !== val);
			actions.setAirlines(newAirline);
		}
	}

	onSearch = (value) => {
		let data;

		if (_.isEmpty(value)){
			data = NEWAIRLINES;
		} else {
			data = _.filter(NEWAIRLINES, (item) => {
				return item.startsWith(value);
			});
		}

		this.setState({airlines: data, search: value});
	}

	render(){
  	const {visible, onClose} = this.props;
		
  	return (
  		<Modal animationType="slide" visible={visible} onRequestClose={onClose} >
  			<SafeAreaView style={styles.container}>
  				<View style={[styles.view1]}>
  					<View style={styles.headerView}>
  						<View style={styles.view3}>
  							<HeaderBackButton onPress={onClose} tintColor={Color.colorPrimary} label=" "/>
  						</View>
  						<View style={styles.viewWallet2}>
  							<View style={styles.viewRow}>
  								<Icon size={20} name="account-balance-wallet" color="white" />
  								<Text style={styles.txtWallet1}>Your wallet</Text>
  							</View>
  							<View style={styles.viewRow}>
  								<Text style={styles.txtWallet2}>{getSymbol("PHP")} {numeral("121").format("0,000.00")}</Text>
  								<Image source={Res.get("PHP")}
  									style={styles.imgCurrency}/>
  							</View>
  						</View>
  						
  						<View style={styles.wid15} />
  					</View>
  					<ScrollView style={styles.view4}>
  						<Image style={styles.image1} source={Res.get("ticket2")} />
  						<View>
  							<View style={[styles.view2]}>
  								<View style={styles.wid47}>
  									<Button active={this.isActive("Economy")} onPress={() => this.onClassPress("Economy")} label="Economy"/>
  								</View>
  								<View style={styles.wid47}>
  									<Button active={this.isActive("Business")} onPress={() => this.onClassPress("Business")} label="Business"/>
  								</View>
  							</View>

  							<View style={[styles.view2, styles.marT20]}>
  								<View style={styles.wid47}>
  									<Button active={this.isActive("Premium-Economy")} onPress={() => this.onClassPress("Premium-Economy")} label="Premium-Economy"/>
  								</View>
  								<View style={styles.wid47}>
  									<Button active={this.isActive("First-Class")} onPress={() => this.onClassPress("First-Class")} label="First-Class"/>
  								</View>
  							</View>

  							<View style={[styles.view2, styles.marT20]}>
  								<View style={styles.wid47}>
  									<Button active={this.isActive("Premium-Business")} onPress={() => this.onClassPress("Premium-Business")} label="Premium-Business"/>
  								</View>
  								<View style={styles.wid47}>
  									<Button active={this.isActive("Premium-First")} onPress={() => this.onClassPress("Premium-First")} label="Premium-First"/>
  								</View>
  							</View>
  						</View>
						
							<View style={styles.marT20}>
								<Text style={styles.txtAirlineHeader}>Select Airlines</Text>

								<Dropdown
									animated={false}
									renderBase={this._renderBase.bind(this)}
									renderSearch={this.renderSearch}
									dropdownStyle={styles.dropdownstyle}
									options={this.state.airlines}
									renderButtonText={this.onChangeAirline}
									renderRow={this._renderRow.bind(this)}
									renderSeparator={null} />
							</View>
							
							<Guest {...this.props} onAdultPress={this.onAdultPress} onSeniorPress={this.onSeniorPress}
								onChildPress={this.onChildPress} onInfantPress={this.onInfantPress}/>
							
							<ButtonDone
								onPress={onClose}
								style={styles.btnDoneStyle}
								label="Done"
								labelStyle={styles.labelStyle}/>
  					</ScrollView>
  				</View>
  			</SafeAreaView>
  		</Modal>
  	);
	}
}

ClassScreen.propTypes = {
	onClose: PropTypes.func,
	visible: PropTypes.bool,
	actions: PropTypes.object,
	ticketing: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flex: 1, backgroundColor: Color.StatusBar},
	view1: {flex: 1, backgroundColor: Color.white},
	view2: {flexDirection: "row", alignItems: "center", justifyContent: "space-between"},
	viewWallet2: {flexDirection: "row", width: "70%", justifyContent: "space-between",
		paddingHorizontal: 15, paddingVertical: 5, backgroundColor: Color.Header, borderRadius: 6},
	viewRow: {flexDirection: "row", alignItems: "center"},
	imgCurrency: {width: 20, height: 20, borderRadius: 20 / 2,
		borderWidth: 0.6, borderColor: Color.white},
	txtWallet1: {fontFamily: "Roboto", fontSize: 15, color: "white", marginLeft: 5},
	txtWallet2: {fontFamily: "Roboto", fontSize: 15, color: "white", marginRight: 5},
	wid15: {width: "15%"},
	wid47: {width: "47%"},
	marT20: {marginTop: 20},
	headerView: {height: 55, width: "100%", justifyContent: "space-between", flexDirection: "row", alignItems: "center"},
	view3: {width: "15%", paddingLeft: 6},
	view4: {flex: 1, paddingHorizontal: 25, marginTop: 5},
	image1: {height: 150, width: "100%",  marginVertical: 15},
	labelStyle: {fontSize: 18, fontFamily: "Roboto"},
	btnDoneStyle: {height: 40, width: "100%", marginTop: 40, marginBottom: 25},
	dropdownstyle: {width: 300, height: 250, borderColor: "#D9D8D8",
		marginTop: 3, borderWidth: 1, borderRadius: 5, paddingHorizontal: 5},
	renderSearch: {height: 40, borderBottomColor: Color.Standard,
		borderBottomWidth: 0.5, marginTop: 5},
	input: {flex: 1, fontFamily: "Roboto-Light", fontSize: 15, marginLeft: 5, paddingVertical: 0},
	dropdownRow: {flexDirection: "row", height: 40, alignItems: "center", backgroundColor: "white"},
	dropdownRowText: {marginLeft: 5, fontSize: 13, fontFamily: "Roboto-Light", color: Color.Standard2, flex: 1},
	dropdownRowText2: {fontWeight: "bold"},

	renderBase: {flexDirection: "row", minHeight: 35, flexWrap: "wrap",  borderWidth: 0.6, borderColor: Color.text2, borderRadius: 5, paddingHorizontal: 5, marginTop: 6  },
	renderBaseView1: {flexShrink: 1, padding: 3, marginRight: 5, flexDirection: "row", borderWidth: 0.5,
		borderColor: Color.text3,  marginTop: 5, alignItems: "center", justifyContent: "center"},
	textAirline: {flexShrink: 1, paddingHorizontal: 7, fontFamily: "Roboto", fontSize: 14},
	renderBaseView2: {width: 20, height: 20, backgroundColor: Color.LightBlue5, alignItems: "center",
		justifyContent: "center", borderRadius: 15, position: "absolute", right: 5, top: 5},
	txtAirlineHeader: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 15, color: Color.Header},
});

export default ClassScreen;
