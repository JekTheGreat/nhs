/* eslint-disable max-len */
import React from "react";
import {View, SafeAreaView, StyleSheet, Platform, Modal, StatusBar,
	SectionList, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import Loading from "__src/components/Loading";
import LoaderModal from "__src/components/LoaderModal";
import Contacts from "react-native-contacts";
import {Icon} from "react-native-elements";
import Resources from "__src/resources";
import worldCountries from "world-countries";
import { PERMISSIONS, check, RESULTS } from "react-native-permissions";
const {Color} = Resources;
const BarStyle = Platform.OS === "android" ? "light-content" : "dark-content";

class Contact extends React.PureComponent{
	state = {
		contacts: [],
		isDenied: false,
		searchContact: [],
	}

	async componentDidMount(){
		if (_.isEmpty(this.state.contacts)){
			if (Platform.OS === "android") {
				if (Platform.Version < 23) {
					this.getContacts();
				} else {
					const res =	await check(PERMISSIONS.ANDROID.READ_CONTACTS);
					if (res === RESULTS.GRANTED){
						this.getContacts();
					}
				}
			} else {
				const res = await check(PERMISSIONS.IOS.CONTACTS);
				if (res === RESULTS.GRANTED) {
					this.getContacts();
				}
			}
		}
	}

	componentDidUpdate(prevProps){
		const {loading: {searchProductFailed, searchProduct, setIntScreen}} = this.props;

		if (!_.isEqual(prevProps.loading.searchProductFailed, searchProductFailed) && !_.isEmpty(searchProductFailed)){
			const timeout = setTimeout(() => {
				Alert.alert("Notice", searchProductFailed);
				clearTimeout(timeout);
			}, 10);
		}

		if (!_.isEqual(prevProps.loading.setIntScreen, setIntScreen) && !_.isEmpty(setIntScreen)){
			this.props.onClose();
		}
		if (!_.isEqual(prevProps.loading.searchProduct, searchProduct)){
			this.props.onClose();
		}
	}

	getContacts = () => {
		Contacts.getAll((err, contacts) => {
			if (err === "denied"){
				this.setState({isDenied: true});
			} else {
				const result = _.chain(contacts).groupBy( (contact) => {
					
					return contact.givenName.substr(0, 1);
				}).toPairs().map((currentItem) => {
					return _.zipObject(["title", "data"], currentItem);
				}).orderBy(["title"], ["asc"]).value();

				this.setState({isDenied: false, contacts: result, searchContact: result});
			}
		});
	}

	getMobileNumber = (phoneNumbers) => {
		const result = _.filter(phoneNumbers, {label: "mobile"});

		if (_.isEmpty(phoneNumbers)){
			return "";
		}
		
		if (_.isEmpty(result) && phoneNumbers.length > 0){
			return `${phoneNumbers[0].number}`;
		}

		return `${result[0].number}`;
	}

	onMobilePress = (item) => {
		const {loading: {setInputMerge, checkPrefixes},
			actions, login: {session, currentAccount}} = this.props;
		const newInput = _.merge({}, setInputMerge);

		const mobile = this.getMobileNumber(item.phoneNumbers);
		const regex = /[\W_]/g;
		let lowRegStr = mobile.toLowerCase().replace(regex, "");

		if (lowRegStr.startsWith("09") && !_.isEmpty(lowRegStr)){
			lowRegStr = `63${lowRegStr.substr(1, lowRegStr.length)}`;
		}
		const countryData = _.filter(worldCountries, (country) => {
			return _.startsWith(lowRegStr, _.toString(country.callingCode) || null);
		});

		if (_.isEmpty(countryData)){
			Alert.alert("Notice", "Operator not available");
			
			return;
		}

		const mobileNum = lowRegStr.substr(_.toString(countryData[0].callingCode).length,
			lowRegStr.length);
		console.log("lowRegStr", lowRegStr, countryData);
		if (_.toString(countryData[0].currency) === "PHP" &&
		mobileNum.length === 10) {
			const pref = _.find(checkPrefixes, {id: `0${  mobileNum.slice(0, 3)}`});
			if (_.isEmpty(pref)) {
				Alert.alert("Invalid Number", "Please select a valid mobile number");
			} else {
				newInput.mobile = `${mobileNum}`;
				newInput.code = `${_.toString(countryData[0].currency)}`;
				newInput.prefix = `${_.toString(countryData[0].callingCode)}`;
				newInput.localprefix = newInput.code === "PHP" ? `0${newInput.mobile.substr(0, 3)}` : "";
				newInput.country = `${countryData[0].name.common}`;
				newInput.userLevel = `${currentAccount.userLevel}`;
				actions.selectNetwork("LOAD");
				actions.setInputMerge(newInput);
				actions.searchProduct(newInput);
			}
		} else if (_.toString(countryData[0].currency) === "PHP" && (mobileNum.length < 10 ||
			mobileNum.length > 10)) {
			Alert.alert("Invalid Number", "Please select a 10-digit mobile number");
		} else if (_.toString(countryData[0].currency) !== "PHP" &&
			!!(session.role === "retailer" ||
			session.role === "pinoy-dealer")) {
			Alert.alert("Access Denied", "You are not allowed to access international loading");
		} else {
			newInput.mobile = `${mobileNum}`;
			newInput.code = `${_.toString(countryData[0].currency)}`;
			newInput.prefix = `${_.toString(countryData[0].callingCode)}`;
			newInput.localprefix = newInput.code === "PHP" ? `0${newInput.mobile.substr(0, 3)}` : "";
			newInput.country = `${countryData[0].name.common}`;
			newInput.userLevel = `${currentAccount.userLevel}`;
			actions.selectNetwork("LOAD");
			actions.setInputMerge(newInput);
			actions.searchProduct(newInput);
		}
	
	}

  renderItem = ({item, index}) => {
  	const fullname = `${item.givenName} ${item.middleName} ${item.familyName}`;
  	
  	return (
  		<TouchableOpacity key={`idx${index}`} activeOpacity={0.8}
			 	onPress={() => this.onMobilePress(item)} style={styles.renderStyle}>
  			<Text style={styles.renderItemStyle}>{fullname}</Text>
  			<Text style={styles.renderItemStyle}>{this.getMobileNumber(item.phoneNumbers)}</Text>
  		</TouchableOpacity>
  	);
  }
	
	ListEmptyComponent = () => {
		const {isDenied} = this.state;
		
		if (isDenied){
			return (
				<View style={styles.padH30}>
					<Text style={styles.textDeniedTitle}>Permission denied!</Text>
					<Text style={styles.textDeniedSubtitle}>
						Please allow access contacts in your phone settings</Text>
				</View>
			);
		}

		return <Loading />;
	}

	onSearch = (e) => {
		const {contacts} = this.state;

		if (_.isEmpty(e)){
			this.setState({searchContact: contacts, search: e});
		} else {
			const searchContact = [];

			_.map(contacts, (item) => {
				_.map(item.data, (subitem) => {
					const fullname = `${subitem.givenName}${subitem.middleName}${subitem.familyName}`;
					
					if (_.includes(fullname.toLowerCase(), e.toLowerCase())){
						searchContact.push(item);
					}
				});
			});

			this.setState({searchContact, search: e});
		}
	}

	render(){
		const {visible, onClose, loading: {isSearchingProduct}} = this.props;
  	const {search, searchContact} = this.state;
		
  	return (
  		<Modal
				animationType={"slide"}
			 	visible={visible}
				onRequestClose={onClose}>
  			<SafeAreaView style={styles.container}>
  				<StatusBar barStyle={BarStyle} backgroundColor={Color.Header} />
  				<View style={styles.container}>
  					<View style={styles.headerStyle}>
  						<Text onPress={onClose} style={styles.headerBack}>Back</Text>
  						<Text style={styles.headerTitle}>CONTACTS</Text>
  						<Text style={{color: Color.white}}>Back</Text>
  					</View>
  					<View style={styles.headerSearch}>
  						<Icon name="search" type="evilicon" size={30} color={Color.LightBlue5}/>
							<TextInput style={styles.searchInput} value={search} onChangeText={this.onSearch}
							 placeholder="Search among contacts..." />
  					</View>
  					<View style={styles.bodyContact}>
  						<SectionList
								showsVerticalScrollIndicator={false}
  							sections={searchContact}
  							ListEmptyComponent={this.ListEmptyComponent}
  							keyExtractor={(item, index) => item + index}
								renderItem={this.renderItem}
								ListFooterComponent={<View style={styles.height30}/>}
  							renderSectionHeader={({ section: { title } }) => (
  								<View style={styles.sectionHeader}>
  									<Text style={styles.sectionTitle}>{title}</Text>
  								</View>
  							)}/>
  					</View>
  				</View>
					<LoaderModal loading={isSearchingProduct}/>
  			</SafeAreaView>
  		</Modal>
  	);
	}
}

Contact.propTypes = {
	visible: PropTypes.bool,
	onClose: PropTypes.func,
	loading: PropTypes.object,
	actions: PropTypes.object,
	login: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flex: 1, backgroundColor: "white"},
	headerStyle: {height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 20},
	headerBack: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 15, color: Color.colorPrimary},
	headerTitle: { flex: 1, fontFamily: "Montserrat-Medium", fontWeight: "bold", fontSize: 20, color: Color.Header, textAlign: "center"},
	headerSearch: {height: 43, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 10,
		borderWidth: 1, borderColor: Color.LightBlue5, marginHorizontal: 20, borderRadius: 25},
	searchInput: {flex: 1, fontFamily: "Roboto", fontSize: 16, marginLeft: 4, paddingVertical: 0},
	bodyContact: {flex: 1, marginTop: 20},
	sectionHeader: {backgroundColor: Color.Header, height: 40, justifyContent: "center", paddingHorizontal: 20},
	sectionTitle: {fontFamily: "Roboto", fontSize: 15, color: Color.white},
	renderStyle: {height: 37, flexDirection: "row", paddingHorizontal: 20, alignItems: "center", justifyContent: "space-between"},
	renderItemStyle: {fontFamily: "Roboto", fontSize: 15, color: Color.Header},
	padH30: {paddingHorizontal: 30},
	height30: {height: 30},
	textDeniedTitle: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 17, textAlign: "center", color: Color.Header},
	textDeniedSubtitle: {fontFamily: "Roboto", fontSize: 16, textAlign: "center", color: Color.Header},
});

export default Contact;
