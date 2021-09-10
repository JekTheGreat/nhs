import React from "react";
import {View, Text, Image, ScrollView,
	 TextInput, Dimensions, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import TxtInput from "__src/components/TxtInput";
import Guest from "../screens/guest";
import Banner01 from "__src/resources/svg/staycation/Banner01";
import Button from "__src/components/Button";
import moment from "moment";
import DateRangePicker from "../screens/DateRangePicker";
import {Icon} from "react-native-elements";
import Resource from "__src/resources";
const {Res, Color} = Resource;
const SCREEN_WIDTH = Dimensions.get("window").width;

class SearchScreen extends React.PureComponent{
	constructor(props) {
		super(props);
		this.state = {
			startDate: null,
			endDate: null,
			displayedDate: moment(),
		};
	}
  
  setDates = (dates) => {
  	this.setState({
  		...dates,
  	});
  };

  render(){
  	const { startDate, endDate, displayedDate } = this.state;
    
  	return (
  		<ScrollView style={{flex: 1, paddingHorizontal: 20, paddingTop: 25 }}>
  			<Banner01 width={SCREEN_WIDTH - 40} height={270}/>

  			<View style={{marginTop: 20}}>
  				<Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 25, color: Color.text2}}>Where Do You Want</Text>
  				<Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 25, color: Color.text2}}>To Stay?</Text>
  				<Text style={{fontFamily: "Roboto-Light", fontSize: 18, color: Color.text2, marginTop: 15}}>First, let's narrow things down.</Text>

  				<Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 14, color: Color.text2, marginTop: 15}}>Where</Text>
  				<View style={{flexDirection: "row", height: 40, borderWidth: 1, borderColor: Color.text3, borderRadius: 5, alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, marginTop: 10}}>
  					<TextInput style={{ flex: 1,  fontSize: 14, paddingVertical: 0, fontFamily: "Roboto-Light"}}
  						placeholder="Search here..."/>
  					<Image style={{width: 22, height: 22}} source={Res.get("PHP")}/>
  				</View>

  				<Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 14, color: Color.text2, marginTop: 20}}>Home Type</Text>
  				<View style={{flexDirection: "row", height: 40, borderWidth: 1, borderColor: Color.text3, borderRadius: 5, alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, marginTop: 10}}>
  					<TextInput style={{ flex: 1,  fontSize: 14, paddingVertical: 0, fontFamily: "Roboto-Light"}}
  						placeholder="Home type..."/>
  					<Icon name="down" size={20} color={Color.text2}/>
  				</View>
  			</View>

  			<DateRangePicker
  				onChange={this.setDates}
  				endDate={endDate}
  				startDate={startDate}
  				displayedDate={displayedDate}
  				range >
  				<Text>Click me!</Text>
  			</DateRangePicker>

  			<View>
  				<Guest label="Adults" counter={131}/>
  				<Guest label="Children (Age 2 to 12)" counter={3}/>
  				<Guest label="Infant (Under 2)" counter={3}/>
  			</View>
				<Button label="Search"
					style={styles.done} onPress={() => this.props.navigation.navigate("SearchList", {title: "Staycation"})}/>
  			<View style={{height: 60}}/>
  		</ScrollView>
  	);
  }
}

const styles = StyleSheet.create({
	padH15: {padding: 20},
	done: {borderBottomWidth: 0, marginTop: 30, backgroundColor: Color.colorPrimaryLight2, height: 38},
});

export default SearchScreen;
