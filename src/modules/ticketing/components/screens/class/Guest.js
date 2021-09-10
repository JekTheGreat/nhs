/* eslint-disable max-len */
import React from "react";
import {View, StyleSheet, Text, Platform, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import {Icon} from "react-native-elements";
import Resource from "__src/resources";
const {Color} = Resource;

class Guest extends React.PureComponent{

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
				<View style={[styles.view1, styles.marT20]}>
					<TouchableOpacity onPress={() => !this.disableStyle("adult-") && onAdultPress(-1)}
						activeOpacity={0.8} style={[styles.btn1, styles.shadowStyle, this.disableStyle("adult-")]}>
						<Icon name="remove" size={17} color="white" />
					</TouchableOpacity>
					<View style={styles.view2}>
						<Text style={styles.txt1}>{setTicketingInput.adults}</Text>
						<Text style={styles.txt2}>Adult 12 - above</Text>
					</View>

					<TouchableOpacity onPress={() => !disableAdd && !disableAll && onAdultPress(+1)}
						activeOpacity={0.8} style={[styles.btn1, styles.shadowStyle, disableAdd, this.disableStyle("adult+"), disableAll]}>
						<Icon name="add" size={17} color="white" />
					</TouchableOpacity>
				</View>

				<View style={[styles.view1, styles.marT20]}>
					<TouchableOpacity onPress={() => !this.disableStyle("child-") && onChildPress(-1)}
						activeOpacity={0.8}  style={[styles.btn1, styles.shadowStyle, this.disableStyle("child-")]}>
						<Icon name="remove" size={17} color="white" />
					</TouchableOpacity>
					<View style={styles.view2}>
						<Text style={styles.txt1}>{setTicketingInput.children}</Text>
						<Text style={styles.txt2}>Children 2 - 11</Text>
					</View>

					<TouchableOpacity onPress={() => !disableAdd && !disableAll && onChildPress(+1)}
						activeOpacity={0.8}  style={[styles.btn1, styles.shadowStyle, disableAdd, this.disableStyle("child+"), disableAll]}>
						<Icon name="add" size={17} color="white" />
					</TouchableOpacity>
				</View>

				<View style={[styles.view1, styles.marT20]}>
					<TouchableOpacity onPress={() => !this.disableStyle("infant-") && onInfantPress(-1)}
						activeOpacity={0.8}  style={[styles.btn1, styles.shadowStyle, this.disableStyle("infant-")]}>
						<Icon name="remove" size={17} color="white" />
					</TouchableOpacity>
					<View style={styles.view2}>
						<Text style={styles.txt1}>{setTicketingInput.infants}</Text>
						<Text style={styles.txt2}>Infant 0 - 2</Text>
					</View>

					<TouchableOpacity onPress={() => {
						!disableAdd && !this.disableStyle("infant+") && !disableAll &&
						onInfantPress(+1);
					}}
					activeOpacity={0.8}  style={[styles.btn1, styles.shadowStyle, disableAdd, this.disableStyle("infant+"), disableAll]}>
						<Icon name="add" size={17} color="white" />
					</TouchableOpacity>
				</View>

				{/* <View style={[styles.view1, styles.marT20]}>
					<TouchableOpacity onPress={() => !this.disableStyle("senior-") && onSeniorPress(-1)}
						activeOpacity={0.8}  style={[styles.btn1, styles.shadowStyle, this.disableStyle("senior-")]}>
						<Icon name="remove" size={17} color="white" />
					</TouchableOpacity>
					<View style={styles.view2}>
						<Text style={styles.txt1}>{setTicketingInput.seniors}</Text>
						<Text style={styles.txt2}>Senior 60+</Text>
					</View>

					<TouchableOpacity onPress={() => {
						!disableAdd && !this.disableStyle("senior+") && !disableAll &&
						onSeniorPress(+1);
					}}
					activeOpacity={0.8}  style={[styles.btn1, styles.shadowStyle, disableAdd, this.disableStyle("senior+"), disableAll]}>
						<Icon name="add" size={17} color="white" />
					</TouchableOpacity>
				</View> */}
			</View>
		);
	}
}

Guest.propTypes = {
	ticketing: PropTypes.object,
	onAdultPress: PropTypes.func,
	onChildPress: PropTypes.func,
	onInfantPress: PropTypes.func,
	onSeniorPress: PropTypes.func,
};

const styles = StyleSheet.create({
	view1: {flexDirection: "row", alignItems: "center"},
	view2: {flex: 1, alignItems: "center", justifyContent: "center"},
	txt1: {fontFamily: "Roboto", fontSize: 20, color: Color.Header},
	txt2: {fontFamily: "Roboto", fontSize: 10, color: Color.Header},
	marT20: {marginTop: 20},
	btn1: {width: 30, height: 30, borderRadius: 15, backgroundColor: Color.LightBlue5, alignItems: "center", justifyContent: "center"},
	shadowStyle: {
		...Platform.select({
			ios: {shadowOffset: {width: 0, height: 5}, shadowColor: Color.LightBlue5,
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
});

export default Guest;
