import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Modal} from "react-native";
import {CalendarList} from "react-native-calendars";
import {Icon} from "react-native-elements";
import moment from "moment";
import PropTypes  from "prop-types";
import Resource from "__src/resources";
const {Color} = Resource;

class CalendarScreen extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			selected: props.selected,
		};
	}
  
  onDayPress = (day) => {
  	console.log("day", day, +moment());

  	this.props.onConfirm({type: this.getType(),
  		currentDate: day.dateString, formatedDate: moment(day.dateString).format("D MMMM, dddd") });
  	this.setState({selected: day.dateString});
  	this.setDate(day.dateString);
  }
	
  setDate(date, type) {
  	this.inputdate = date;
  	this.inputtype = type;
  }

  getDate() {
  	return this.inputdate || "";
  };

  getType() {
  	return this.inputtype || "";
  };
	
  setModalVisible = (visible) => {
  	this.setState({ modalVisible: visible });
  };

  render(){
  	const {onClose, visible, ticketing: {setTicketingInput}} = this.props;
  	const minDate = this.getType() === "departure" ? new Date() : setTicketingInput.departure || new Date();
  	console.log(this.getType());
    
  	return (
  		<Modal
  			animationType="slide"
  			onRequestClose={onClose}
  			transparent
  			visible={visible}>
  			<View style={{flex: 1}}>
  				<View style={{position: "absolute", bottom: 0, borderTopWidth: 0.5, borderTopColor: Color.AFAAAA }}>
  					<View style={styles.headCoverContainer}>
  						<View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", paddingTop: 15}}>
  							<Text style={{width: "30%", alignSelf: "flex-end", fontFamily: "Roboto", fontSize: 15, color: Color.black3}}>Choose a date</Text>
  							<View style={{width: "40%", alignItems: "center", marginTop: 6}}>
  								<View style={{width: 50, height: 4, borderRadius: 7, backgroundColor: Color.gray05}}/>
  							</View>
  							<View style={{width: "30%", alignItems: "flex-end"}}>
  								<TouchableOpacity activeOpacity={0.8} onPress={onClose} style={{width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: Color.LightBlue5}}>
  									<Icon color={Color.white} name="close" size={16}/>
  								</TouchableOpacity>
  							</View>
  						</View>
  					</View>
          
  					<CalendarList
  						current={this.getDate() || setTicketingInput.departure}
  						minDate={minDate}
  						pastScrollRange={24}
  						futureScrollRange={24}
  						horizontal
  						hideArrows={false}
  						returnFormat={"D MMMM, dddd"}
  						disableMonthChange={false}
  						onDayPress={this.onDayPress}
  						markedDates={{[this.getDate()]: {selected: true, disableTouchEvent: true, selectedDotColor: "orange"}}}
  						pagingEnabled
  						theme={{ textMonthFontFamily: "Roboto", textMonthFontSize: 15, monthTextColor: Color.black2, textMonthFontWeight: "bold", arrowColor: Color.LightBlue5,
  							textDayFontFamily: "Roboto", textDayFontSize: 13, textDayFontWeight: "bold", textDayHeaderFontSize: 13, textDayHeaderFontWeight: "bold", textDayHeaderFontFamily: "Roboto" }}
  					/>
  				</View>
  		  </View>
  		</Modal>
  	);
  }
}

CalendarScreen.propTypes = {
	onConfirm: PropTypes.func,
	onClose: PropTypes.func,
	visible: PropTypes.bool,
	selected: PropTypes.string,
	type: PropTypes.string,
};

const styles = StyleSheet.create({
	headCoverContainer: {
		height: 50,
		width: "100%",
		justifyContent: "center",
		backgroundColor: "white",
		paddingHorizontal: 20,
	},
});

export default CalendarScreen;
