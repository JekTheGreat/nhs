/* eslint-disable import/named */
import React from "react";
import {View, Modal, StyleSheet, SafeAreaView, Text, TextInput, Image, ScrollView} from "react-native";
import {Icon} from "react-native-elements";
import getSymbol from "currency-symbol-map";
import numeral from "numeral";
import moment from "moment";
import _ from "lodash";
import Loading from "__src/components/Loading";
import {HeaderBackButton} from "react-navigation-stack";
import Resource from "__src/resources";
import SearchResult from "./SearchResult";
import PropTypes from "prop-types";
const {Color, Res} = Resource;

class SearchScreen extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			search: "",
		};
	}

	componentDidUpdate(prevProps){
		const {FromTo, actions} = this.props;

		if (!_.isEqual(prevProps.FromTo, FromTo)){
			this.setState({search: ""});
			actions.searchCountryReset([]);
		}
	}

	onSearchFlight = (e) => {
		const {actions} = this.props;

		this.setState({search: e});

		if (_.isEmpty(e)){
			actions.searchCountryReset([]);
		}

		if (e.length >= 3){
			actions.searchCountry(e);
		}
	}

	onItemPress = (item) => {
		const {onClose, ticketing: {setTicketingInput}, FromTo, actions} = this.props;
		const newInput = _.merge({}, setTicketingInput);
		const type = FromTo === "From" ? "origin" : "destination";
		
		newInput[type] = item;
		item.updatedAt = +moment();
		actions.setTicketingInput(newInput);
		actions.setPreviousSearch(item);
		onClose();
		this.setState({search: ""});
		actions.searchCountryReset([]);
	}
	
	render(){
		const {visible, onClose, FromTo, ticketing: {searchCountry}} = this.props;
		const {search} = this.state;
		const placeholder = FromTo === "From" ? "Where from?" : "Where to?";
		
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
						<ScrollView showsVerticalScrollIndicator={false} style={styles.view4}>
							<Image style={styles.image1} source={Res.get("ticket")} resizeMode="stretch"/>
							<View style={styles.view2}>
								<TextInput
									style={styles.txtSearch}
									onChangeText={this.onSearchFlight}
									value={search}
									placeholder={placeholder}
									placeholderTextColor={Color.text1}/>
								<View>
									{!_.isEmpty(search) && _.isEmpty(searchCountry) && <Loading />}
								</View>
								
							</View>
							<SearchResult onItemPress={this.onItemPress} {...this.props}/>
						</ScrollView>
					</View>
				</SafeAreaView>
			</Modal>
		);
	}
}

SearchScreen.propTypes = {
	onClose: PropTypes.func,
	visible: PropTypes.bool,
	actions: PropTypes.object,
	ticketing: PropTypes.object,
	FromTo: PropTypes.string,
};

const styles = StyleSheet.create({
	container: {flex: 1, backgroundColor: Color.StatusBar},
	view1: {flex: 1, backgroundColor: Color.white},
	view2: { flexDirection: "row", height: 40, alignItems: "center", justifyContent: "center", borderWidth: 0.7,
		borderColor: Color.border1, borderRadius: 6, paddingRight: 7},
	viewWallet2: {flexDirection: "row", width: "70%", justifyContent: "space-between", paddingHorizontal: 15, paddingVertical: 5, backgroundColor: Color.Header, borderRadius: 6},
	viewRow: {flexDirection: "row", alignItems: "center"},
	imgCurrency: {width: 20, height: 20, borderRadius: 20 / 2,
		borderWidth: 0.6, borderColor: Color.white},
	txtWallet1: {fontFamily: "Roboto", fontSize: 15, color: "white", marginLeft: 5},
	txtWallet2: {fontFamily: "Roboto", fontSize: 15, color: "white", marginRight: 5},
	wid15: {width: "15%"},
	txtSearch: {flex: 1, textAlignVertical: "center", fontFamily: "Roboto", fontSize: 15, color: Color.Header, marginLeft: 20},
	headerView: {height: 60, width: "100%", justifyContent: "space-between", flexDirection: "row", alignItems: "center"},
	view3: {width: "15%", paddingLeft: 6},
	view4: {flex: 1, paddingHorizontal: 20, marginTop: 10},
	image1: {height: 150, width: "100%", marginVertical: 15},
});

export default SearchScreen;
