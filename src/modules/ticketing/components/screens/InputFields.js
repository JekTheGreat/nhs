/* eslint-disable max-len */
import React from "react";
import {View, Image} from "react-native";
import styles from "../../styles.css";
import TouchableComponent from "./TouchableComponent";
import {CheckBox} from "react-native-elements";
import ButtonTrip from "./ButtonTrip";
import Resource from "__src/resources";
import PropTypes from "prop-types";
const {Res, Color} = Resource;

class InputFields extends React.PureComponent{

	classValue = () => {
		const {ticketing: {setTicketingInput}} = this.props;
		const child = setTicketingInput.children > 0 ? ` and ${setTicketingInput.children} Child` : "";
		const infant = setTicketingInput.infants > 0 ? ` and ${setTicketingInput.infants} Infant` : "";

		return `${setTicketingInput.bookingClass} ——— ${setTicketingInput.adults} Adult${child}${infant}, All Airlines`;
	}

	originValue = () => {
		const {ticketing: {setTicketingInput}} = this.props;
		if (setTicketingInput.origin.iata){
			return `${setTicketingInput.origin.iata} — ${setTicketingInput.origin.name}`;
		}
		
		return "";
	}

	destinationValue = () => {
		const {ticketing: {setTicketingInput}} = this.props;
		if (setTicketingInput.destination.iata){
			return `${setTicketingInput.destination.iata} — ${setTicketingInput.destination.name}`;
		}
		
		return "";
	}
	
	render(){
		const {onDeparturePress, onReturnPress, onClassPress, ticketing: {setTicketingInput}, onCheckPress} = this.props;

		return (
			<View style={styles.SCView1}>
				<View style={styles.SCView2}>
					<Image style={styles.SCImage1} source={Res.get("dot")} resizeMode="contain"/>
					<View style={styles.SCLine}/>
					<View style={styles.SCLine}/>
					<View style={styles.SCLine}/>
					<Image style={styles.SCImage1} source={Res.get("place")} resizeMode="contain"/>
					<View style={styles.SCLine}/>
					<View style={styles.SCLine}/>
					<View style={styles.SCLine}/>
					<Image style={styles.SCImage1} source={Res.get("flight")} resizeMode="contain"/>
					<View style={styles.SCLine}/>
					<View style={styles.SCLine}/>
					<View style={styles.SCLine}/>
					<Image style={styles.SCImage1} source={Res.get("calendar")} resizeMode="contain"/>
					<View style={styles.SCLine}/>
					<View style={styles.SCLine}/>
					<View style={styles.SCLine}/>
					<Image style={styles.SCImage1} source={Res.get("suitcase")} resizeMode="contain"/>
				</View>

				<View style={styles.SCView3}>
					<TouchableComponent value={this.originValue()} onPress={() => onDeparturePress("From")} label="From"/>
					<TouchableComponent value={this.destinationValue()} onPress={() => onReturnPress("To")} style={styles.marT27} label="To"/>
					<ButtonTrip style={styles.marT27} label="To" {...this.props}/>
					<TouchableComponent onPress={onClassPress} value={this.classValue()}
						style={styles.marT27} label="Economy  —————  1 Adult, All Airlines"/>
					<CheckBox
						onPress={onCheckPress}
						containerStyle={styles.containerStyle}
						title='Book for my self'
						checkedIcon='dot-circle-o'
						fontFamily="Roboto"
						textStyle={{color: Color.Header}}
						uncheckedIcon='circle-o'
						checkedColor={Color.LightBlue5}
						checked={setTicketingInput.bookformyself} />
				</View>
			</View>
		);
	}
}

InputFields.propTypes = {
	onDeparturePress: PropTypes.func,
	onReturnPress: PropTypes.func,
	onClassPress: PropTypes.func,
	onCheckPress: PropTypes.func,
	ticketing: PropTypes.object,
};

export default InputFields;
