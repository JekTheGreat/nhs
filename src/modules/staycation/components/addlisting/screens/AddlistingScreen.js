/* eslint-disable */
import React, {Component} from "react";
import {View, SafeAreaView} from "react-native";
import _ from "lodash";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import styles from "../../../styles.css";
import FirstScreen from "./First";
import SecondScreen from "./Second";
import ThirdScreen from "./Third";
import FourthScreen from "./Fourth";
import FifthScreen from "./Fifth";
import SixthScreen from "./Sixth";
import SeventhScreen from "./Seventh";
import EighthScreen from "./Eighth";
import NinthScreen from "./Ninth";
import TenthScreen from "./Tenth";
import EleventhScreen from "./Eleventh";
import TwelvethScreen from "./Twelveth";
import ThirteenthScreen from "./Thirteenth";
import FourtheenthScreen from "./Fourtheenth";
import FiftheenthScreen from "./Fiftheenth";
import AA from "./AA";
import Resources from "__src/resources";
const {Color} = Resources;

class AddlistingScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			hctiws: false,
		}
	}

	componentDidMount(){
		const {actions} = this.props;
		actions.fetchProperties();
	}

  renderScreen = () => {
  	const {staycation: {setStaycationScreen}} = this.props;
  	switch (setStaycationScreen){
		case "aa":
			return <AA ref={(e)=> this.aa=e} {...this.props}/>
		case "fiftheenth":
			return <FiftheenthScreen ref={(e)=> this.Fiftheenth=e} {...this.props}/>
		case "fourtheenth":
			return <FourtheenthScreen ref={(e)=> this.Fourtheenth=e} {...this.props}/>
		case "thirteenth":
			return <ThirteenthScreen ref={(e)=> this.Thirteenth=e} {...this.props}/>
		case "twelveth":
			return <TwelvethScreen ref={(e)=> this.Twelveth=e} {...this.props}/>
		case "eleventh":
			return <EleventhScreen ref={(e)=> this.Eleventh=e} {...this.props}/>
		case "tenth":
			return <TenthScreen ref={(e)=> this.Tenth=e} {...this.props}/>
		case "ninth":
			return <NinthScreen ref={(e)=> this.Ninth=e} {...this.props}/>
		case "eighth":
			return <EighthScreen ref={(e)=> this.Eighth=e} {...this.props}/>;
		case "seventh":
			return <SeventhScreen ref={(e)=> this.Seventh=e} {...this.props}/>;
		case "sixth":
			return <SixthScreen ref={(e)=> this.Sixth=e} {...this.props}/>;
		case "fifth":
			return <FifthScreen ref={(e)=> this.Fifth=e} {...this.props}/>;
		case "fourth":
			return <FourthScreen ref={(e)=> this.Fourth=e} {...this.props}/>;
		case "third":
			return <ThirdScreen ref={(e)=> this.Third=e} {...this.props}/>;
  	case "second":
			return <SecondScreen ref={(e)=> this.Second=e} {...this.props}/>;
  	case "first":
			default:
      return <FirstScreen ref={(e)=> this.First = e} {...this.props}/>;
  	}
	}

	onNext = () => {
		const {actions} =this.props;
		const {staycation: {setStaycationScreen}} = this.props;

  	switch (setStaycationScreen){
		case "aa":
		this.aa.onNext();
		break;
		case "fiftheenth":
		this.Fiftheenth.onNext();
		break;
		case "fourtheenth":
			this.Fourtheenth.onNext();
			break;
		case "thirteenth":
			this.Thirteenth.onNext();
			break;
		case "twelveth":
			this.Twelveth.onNext();
			break;
		case "eleventh":
			this.Eleventh.onNext();
			break;
		case "tenth":
			this.Tenth.onNext();
			break;
		case "ninth":
			this.Ninth.onNext();
			break;
		case "eighth":
			this.Eighth.onNext();
			break;
		case "seventh":
			this.Seventh.onNext();
			break;
		case "sixth":
			this.Sixth.onNext();
			break;
		case "fifth":
			this.Fifth.onNext();
			break;
		case "fourth":
			this.Fourth.onNext();
			break;
		case "third":
			this.Third.onNext();
			break;
		case "second":
			this.Second.onNext();
			break;
		default:
			this.First.onNext();
			break;
  	}
		
	}

	onBack = () => {
		const {actions} =this.props;
		const {staycation: {setStaycationScreen}} = this.props;

  	switch (setStaycationScreen){
		case "aa":
			actions.setStaycationScreen("fiftheenth");
			break;
		case "fiftheenth":
			actions.setStaycationScreen("fourtheenth");
			break;
		case "fourtheenth":
			actions.setStaycationScreen("thirteenth");
			break;
		case "thirteenth":
			actions.setStaycationScreen("twelveth");
			break;
		case "twelveth":
			actions.setStaycationScreen("eleventh");
			break;
		case "eleventh":
			actions.setStaycationScreen("tenth");
			break;
		case "tenth":
			actions.setStaycationScreen("ninth");
			break;
		case "ninth":
			actions.setStaycationScreen("eighth");
			break;
		case "eighth":
			actions.setStaycationScreen("seventh");
			break;
		case "seventh":
			actions.setStaycationScreen("sixth");
			break;
		case "sixth":
			actions.setStaycationScreen("fifth");
			break;
		case "fifth":
			actions.setStaycationScreen("fourth");
			break;
		case "fourth":
			actions.setStaycationScreen("third");
			break;
		case "third":
			actions.setStaycationScreen("second");
			break;
		case "second":
			actions.setStaycationScreen("first");
			break;
		case "first":
			actions.setStaycationScreen("aa");
			break;
  	}
	}

  render(){
  	return (
  		<View style={{flex:1}}>
				{this.renderScreen()}
        <View style={[styles.otpBottom, { bottom: 0, alignSelf: "center"}]}>
  					<Button onPress={this.onBack}
  						style={styles.btnback}
  						labelStyle={{color: Color.colorPrimary}} label="Back"/>
  					<Button onPress={this.onNext}  style={styles.width120} label="Next"/>
				</View>
  			<SafeAreaView style={styles.flex} />
  		</View>
  	);
  }
}

AddlistingScreen.propTypes = {
	staycation: PropTypes.object,
};

export default AddlistingScreen;