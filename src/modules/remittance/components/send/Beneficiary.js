/* eslint-disable max-len */
/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, FlatList,
	ScrollView} from "react-native";
import Button from "__src/components/Button";
import TxtInput from "__src/components/TxtInput";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import {Icon} from "react-native-elements";
import AddClient from "./screens/AddClient";
import SearchResult from "./screens/SearchResult";
import * as Animatable from 'react-native-animatable';
import _ from "lodash";
import Resources from "__src/resources";
const {Color} = Resources;
const AnimatedScrollview = Animatable.createAnimatableComponent(ScrollView);

class Beneficiary extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			fullname: "",
			error: {}, screen: "",
			isVisible: false,
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
				this.setState({screen: "searchbene"});
			}
		}
	}

	_fillUp = () => {
		this.setState({screen: "fillupbene"});
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
		const {actions, login: {additionalDetails, session}, 
			remittance: {inputDetails}} = this.props;
		const params = {}, error = {};

		params.fullname = this.state.fullname;
		params.company = "UPS";
		params.senderId = inputDetails.Sender.id;
		params.userId = additionalDetails.id;

		if (_.isEmpty(this.state.fullname)){
			error.fullname = "This field is required.";
		}

		this.setState({error});

		if (_.isEmpty(error)){
			actions.searchBeneficiary(params, session.token);
		}
	}

	render(){
		const {remittance: {isSearching}} = this.props;
		const {error, screen} = this.state;

		if(screen === "fillupbene"){
			return <AddClient type={screen} {...this.props} 
				onBack={() => this.setState({screen: ""})}/>
		}

		if(screen === "searchbene"){
			return <SearchResult type={screen} {...this.props}
				onBack={() => this.setState({screen: ""})}/>
		}

		return (
			<View style={styles.flex1marT30padH20}>
				<AnimatedScrollview animation="fadeInRight" showsVerticalScrollIndicator={false} style={[styles.flex1]}>
					<TxtInput
							value={this.state.fullname}
							labelStyle2={{fontSize: 16}}
							label='Search Previous Beneficiary'
							placeholder="Enter fullname"
							style={styles.marT15}
							autoCapitalize="characters"
							err={error.fullname}
							onChangeText={(e) => this.setState({fullname: e})}
							compName="Search2"/>

					<Text onPress={() => this.setState({screen: "searchbene"})} style={[styles.txtOR, styles.marT30]}>or</Text>

					<Text style={[styles.txtFillup, styles.marT30]}>
						Fill out the form if you've never processed our remittance or processing your remittance for the first time.
					</Text>

					<TouchableOpacity onPress={this._fillUp} style={[styles.btnFillup, styles.marT10, styles.marB20]}>
						<Icon name="file-document" type="material-community" size={15} color="white" />
						<Text style={{marginLeft: 5, color: "white", fontWeight: "500", fontFamily: "Roboto", fontSize: 14}}>Fill Up Form</Text>
					</TouchableOpacity>

				</AnimatedScrollview>

				<View style={styles.viewButton}>
					<Button
						onPress={this._proceed}
						style={styles.btnStyle}
						loading={isSearching}
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

Beneficiary.propTypes = {
	actions: PropTypes.object,
	remittance: PropTypes.object,
};

export default Beneficiary;
