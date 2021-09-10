/* eslint-disable max-len */
import React from "react";
import {View, StyleSheet, Text, Platform, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import {Icon} from "react-native-elements";
import Resource from "__src/resources";
const {Color} = Resource;

class AddGuest extends React.PureComponent{

	disableStyle = (type) => {
		const {ticketing: {setTicketingInput}} = this.props;

		switch (type){
		case "adult-":
			if (setTicketingInput.adults <= 1){
				return styles.shadowDisable;
			}
				
			return null;
		case "adult+":
			if (setTicketingInput.adults >= 9 || setTicketingInput.seniors > 0){
				return styles.shadowDisable;
			}
			
			return null;
		case "child-":
			if (setTicketingInput.children <= 0){
				return styles.shadowDisable;
			}
				
			return null;
		case "child+":
			if (setTicketingInput.children >= 6 || setTicketingInput.seniors > 0){
				return styles.shadowDisable;
			}
			
			return null;
		case "infant-":
			if (setTicketingInput.infants <= 0){
				return styles.shadowDisable;
			}
				
			return null;
		case "infant+":
			if (setTicketingInput.infants >= setTicketingInput.adults){
				return styles.shadowDisable;
			}
			
			return null;
		case "senior-":
			if (setTicketingInput.seniors <= 0){
				return styles.shadowDisable;
			}
				
			return null;
		case "senior+":
			if (setTicketingInput.seniors >= 9){
				return styles.shadowDisable;
			}
			
			return null;
		}
	}

	render(){
		const {onAdultPress, onChildPress, onInfantPress, onSeniorPress, ticketing: {setTicketingInput}} = this.props;
		const countPassenger = setTicketingInput.adults + setTicketingInput.children + setTicketingInput.infants;
		const disableAdd = countPassenger >= 9 ? styles.shadowDisable : null;
		const disableAll = setTicketingInput.bookformyself && styles.shadowDisable;

		return (
			<View>
				<Text style={styles.txtHeader}>Number of Guest</Text>
				<View style={[styles.view1, styles.marT20]}>
					<Text style={styles.txt2}>Adults</Text>
					<TouchableOpacity onPress={() => !this.disableStyle("adult-") && onAdultPress(-1)}
						activeOpacity={0.8} style={[styles.btn1, styles.shadowStyle, this.disableStyle("adult-")]}>
						<Icon name="remove" size={17} color="white" />
					</TouchableOpacity>
					<Text style={styles.txt1}>22</Text>
					<TouchableOpacity onPress={() =>  onAdultPress(+1)}
						activeOpacity={0.8} style={[styles.btn1, styles.shadowStyle, disableAdd, this.disableStyle("adult+"), disableAll]}>
						<Icon name="add" size={17} color="white" />
					</TouchableOpacity>
				</View>

				<View style={[styles.view1, styles.marT20]}>
					<Text style={styles.txt2}>Children (Age 2 to 12)</Text>
					<TouchableOpacity onPress={() => !this.disableStyle("child-") && onChildPress(-1)}
						activeOpacity={0.8}  style={[styles.btn1, styles.shadowStyle, this.disableStyle("child-")]}>
						<Icon name="remove" size={17} color="white" />
					</TouchableOpacity>
					<Text style={styles.txt1}>{setTicketingInput.children}</Text>
					<TouchableOpacity onPress={() =>  onChildPress(+1)}
						activeOpacity={0.8}  style={[styles.btn1, styles.shadowStyle, disableAdd, this.disableStyle("child+"), disableAll]}>
						<Icon name="add" size={17} color="white" />
					</TouchableOpacity>
				</View>

				<View style={[styles.view1, styles.marT20]}>
					<Text style={styles.txt2}>Infant (Under 2)</Text>
					<TouchableOpacity onPress={() => !this.disableStyle("infant-") && onInfantPress(-1)}
						activeOpacity={0.8}  style={[styles.btn1, styles.shadowStyle, this.disableStyle("infant-")]}>
						<Icon name="remove" size={17} color="white" />
					</TouchableOpacity>
					<Text style={styles.txt1}>{setTicketingInput.infants}</Text>
					<TouchableOpacity onPress={() => {
					 !this.disableStyle("infant+") && onInfantPress(+1);
					}}
					activeOpacity={0.8}  style={[styles.btn1, styles.shadowStyle, disableAdd, this.disableStyle("infant+"), disableAll]}>
						<Icon name="add" size={17} color="white" />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

AddGuest.propTypes = {
	ticketing: PropTypes.object,
	onAdultPress: PropTypes.func,
	onChildPress: PropTypes.func,
	onInfantPress: PropTypes.func,
	onSeniorPress: PropTypes.func,
};

const styles = StyleSheet.create({
	view1: {flexDirection: "row", alignItems: "center", paddingHorizontal: 20},
	txt1: {fontFamily: "Roboto", fontSize: 17, color: Color.Header, width: 50, textAlign: "center"},
	txt2: {flex: 1, fontFamily: "Roboto-Light", fontSize: 18, color: Color.text2},
	marT20: {marginTop: 20},
	btn1: {width: 30, height: 30, borderRadius: 15, backgroundColor: Color.colorPrimaryLight2, alignItems: "center", justifyContent: "center"},
	shadowStyle: {
		...Platform.select({
			ios: {shadowOffset: {width: 0, height: 5}, shadowColor: Color.colorPrimaryLight2,
				shadowOpacity: .5, shadowRadius: 5, zIndex: 4},
			android: {elevation: 5},
		}),
	},
	shadowDisable: {
		...Platform.select({
			ios: {shadowOffset: {width: 0, height: 0}, shadowColor: Color.transparent,
				shadowOpacity: 0, shadowRadius: 0, zIndex: 0, backgroundColor: Color.gray05},
			android: {elevation: 0, backgroundColor: Color.gray05},
		}),
	},
	txtHeader: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 20, color: Color.text2, marginTop: 10, paddingHorizontal: 20},
});

export default AddGuest;
