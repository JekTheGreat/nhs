/* eslint-disable max-len */
/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView} from "react-native";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import TxtInput from "__src/components/TxtInput";
import AddClient from "./screens/AddClient";
import SearchResult from "./screens/SearchResult";
import styles from "../../styles.css";
import {Icon} from "react-native-elements";
import _ from "lodash";
import Resources from "__src/resources";
import * as Animatable from 'react-native-animatable';
const AnimatedScrollview = Animatable.createAnimatableComponent(ScrollView);
const {Color} = Resources;

class SenderScreen extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			fullname: "",
			error: {}, screen: ""
		};
	}

	componentDidUpdate(prevProp){
		const {remittance: {SearchFound}, actions} = this.props;

		if (prevProp.remittance.SearchFound !== SearchFound && !_.isEmpty(SearchFound)){
			if(SearchFound.S === 0){
				const error = {
					fullname: "No record found"
				}
				this.setState({error});
			}else{
				this.setState({screen: "searchsender"});
			}
		}
	}

	_fillUp = () => {
		this.setState({screen: "fillupsender"});
	}

	_handleCancel = () => {
		const {actions} = this.props;

		actions.setSelectedScreen(this.getScreen(-1));
	}

	getScreen = (num) => {
		const {remittance: { setSelectedScreen, selectProvider } } = this.props;
		const index = _.findIndex(selectProvider, {value: setSelectedScreen});

		return selectProvider[index + num].value;
	}

	_proceed = () => {
		const {actions, login: {additionalDetails, session}} = this.props;
		const params = {}, error = {};
		params.fullname = this.state.fullname;
		params.company = "UPS";
		params.userId = additionalDetails.id;

		if (_.isEmpty(this.state.fullname)){
			error.fullname = "This field is required.";
		}


		this.setState({error});

		if (_.isEmpty(error)){
			// actions.setSelectedScreen(this.getScreen(+1));
			actions.searchClient(params, session.token);
		}
	}

	render(){
		const {remittance: {isSearching}} = this.props;
		const {error, screen} = this.state;

		if(screen === "fillupsender"){
			return <AddClient type={screen} {...this.props} 
				onBack={() => this.setState({screen: ""})}/>
		}

		if(screen === "searchsender"){
			return <SearchResult type={screen} {...this.props}
				onBack={() => this.setState({screen: ""})}/>
		}

		return (
			<View style={styles.flex1marT30padH20}>
				<AnimatedScrollview animation="fadeInRight" style={styles.flex1}>
					<TxtInput
						value={this.state.fullname}
						labelStyle2={{fontSize: 16}}
						label='Search Previous Sender'
						placeholder="Enter fullname"
						style={styles.marT15}
						autoCapitalize="characters"
						err={error.fullname}
						onChangeText={(e) => this.setState({fullname: e})}
						compName="Search2"/>
			
					<Text onPress={() => this.setState({screen: "searchsender"})} style={[styles.txtOR, styles.marT30]}>or</Text>

					<Text style={[styles.txtFillup, styles.marT30]}>
					Fill out the form if you've never processed our remittance or processing your remittance for the first time.
					</Text>

					<TouchableOpacity onPress={this._fillUp} style={[styles.btnFillup, styles.marT10]}>
						<Icon name="file-document" type="material-community" size={15} color="white" />
						<Text style={{marginLeft: 5, color: "white", fontWeight: "500", fontFamily: "Roboto", fontSize: 14}}>Fill Up Form</Text>
					</TouchableOpacity>

				</AnimatedScrollview>

				<View style={styles.viewButton}>
					<Button
						onPress={this._proceed}
						loading={isSearching}
						style={styles.btnStyle}
						label="Proceed"/>
				 <Button
						onPress={this._handleCancel}
						style={styles.btnCancel}
						label="Back"
						labelStyle={{color: Color.colorPrimaryDark}}/>
				</View>
				<SafeAreaView style={styles.marB5} />
			</View>
		);
	}
}

SenderScreen.propTypes = {
	actions: PropTypes.object,
	remittance: PropTypes.object,
};

export default SenderScreen;
