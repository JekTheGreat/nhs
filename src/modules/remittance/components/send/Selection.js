/* eslint-disable */
import React from "react";
import {View, Text, SafeAreaView, TextInput, Image} from "react-native";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import Dropdown from "__src/components/Dropdown";
import DropDownItem from "__src/components/DropDownItem";
import {Icon} from "react-native-elements";
import _ from "lodash";
import styles from "../../styles.css";
import Resources from "__src/resources";
const {Color, Res} = Resources;

class Selection extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			amount: "",
			provider: "",
			error: {},
			ratefrom: false,
			rateto: false
		};
	}

	componentDidMount(){
		const {actions} = this.props;

		actions.convertAmountInput(0);
	}

	renderBase = () => {
		const {remittance: {inputDetails}} = this.props;
		const color = inputDetails.provName ? null : Color.Standard;
		
		return (
			<View style={styles.renderBaseWrapper}>
				<Text style={[styles.input, {color}]}>
					{inputDetails.provName || "-- Select Partner --"}
				</Text>
				<Image source={{uri: inputDetails.logo}} style={{width: 60, height: 30}} 
					resizeMode="stretch"/>
				<Icon name='arrow-drop-down' color="black" size={27} />
			</View>
		);
	}
  
	renderRow = (rowData, rowID, highlighted) => {
		return (
			<View style={[styles.renderRow, highlighted && {backgroundColor: Color.highlight}]}>
				<Text style={[styles.renderRowTxt,
					highlighted && styles.highlighted ]}>
					{rowData.name}
				</Text>
				<Image source={{uri: rowData.logo}} style={{width: 60, height: 30}} 
					resizeMode="stretch"/>
			</View>
		);
	}

	onChangeText = (type) => (value) => {
		const {actions, remittance: {inputDetails}, wallet: {walletSelected}} = this.props;
		const newInput = _.merge({}, inputDetails);
		const error = {};

		switch(type){
			case "amount":
				newInput.amount = value.trim();

				setTimeout(() => {
					actions.convertAmountInput(value.trim());
				},800)
			break;
			case "provider":
				newInput.provId = value.id;
				newInput.provName = value.name;
				newInput.api = value.api;
				newInput.logo = value.logo;
				newInput.code = walletSelected.code;

				if(value.api.startsWith("v3/remittance")){
					const split = _.split(value.api, "v3/remittance");
					newInput.api = split[1];
				}else{
					newInput.api = value.api;
				}
			break;
		}

		actions.inputDetails(newInput);
		this.setState({error});
	}

	_handleOk = () => {
		const { actions, remittance: { inputDetails, setSelectedScreen }, 	
			login: {session} } = this.props;
		const error = {};

		if(_.isEmpty(inputDetails.provName)){
			error.err = "Provider is required."
		} else if(_.isEmpty(inputDetails.amount)){
			error.err = "Amount is required."
		} else if(_.toInteger(inputDetails.amount) < 1 || _.toInteger(inputDetails.amount) > 50000){
			error.err = "The amount must be greater than 1 but not less than 50,000"
		}

		this.setState({error});

		if(_.isEmpty(error)){
			const params = {
				amount: inputDetails.amount
			}
			actions.validateAmount(params, session.token);
		}
	}

	renderError = () => {
		const {error} = this.state;

		if (!_.isEmpty(error)){
			return (
				<View style={styles.inpuView1}>
					<Icon containerStyle={styles.iconContainerStyle}
						name='close-circle' type="material-community" color={Color.red} size={15} />
					<Text style={[styles.txt3, {color: Color.red}, styles.flex1]}>
						{error.err}</Text>
				</View>
			);
		}
		
		return null;
	}

	render(){
		const {remittance: {fetchProvider, inputDetails, isValidatingAmount}, navigation,
			wallet: {walletSelected, convertAmountInput, convertedValuetoRecieved, selectedTarget}} = this.props;
		const walletcode = _.isEmpty(walletSelected) ? "" : walletSelected.code;
  	const error2 = this.state.error.amount ? {color: Color.red} : null;

		return (
			<View style={styles.flex1marT30padH20}>
				<View style={styles.flex1}>

				<Text style={[styles.labelStyle, styles.marT10, 
					{fontWeight: "bold", fontSize: 19}]}>
					Fast, safe and convenient way of sending money.
				</Text>
				<Text style={[styles.labelStyle, styles.marT5]}>
					Transfer and get your cash instantly through our accredited 
					remittance partners and outlets nationwide.</Text>

					<View style={styles.marT20}>
  					<Text style={[styles.labelStyle]}>Select / Choose Provider</Text>
						<Dropdown
							animated={false}
							showsVerticalScrollIndicator={false}
							renderBase={this.renderBase}
							dropdownStyle={styles.dropDownStyle}
							options={fetchProvider}
							renderButtonText={this.onChangeText("provider")}
							renderRow={this.renderRow}
							renderSeparator={null} />
  				</View>
					<View style={styles.marT20}>
  					<Text style={[styles.txtLabel3, error2]}>Amount</Text>
  					<View style={[styles.viewTarget, error2]}>
  						<Text style={styles.txtCode}>PHP </Text>
  						<TextInput
  							onFocus={() => this.setState({amt: true})}
  							onBlur={() => this.setState({amt: false})}
								isFocus={this.state.amt}
  							style={styles.txtInput}
  							onChangeText={this.onChangeText("amount")}
								value={inputDetails.amount}
								returnKeyType="done"
								placeholder="0"
								keyboardType='numeric'
  							underlineColorAndroid='transparent'/>
  					</View>
  				</View>
						{this.renderError()}
				</View> 

				<View style={{width: "100%", alignSelf: "center"}}>
					<Button
						onPress={this._handleOk}
						loading={isValidatingAmount}
						style={styles.btnStyle}
						label="Proceed"/>
					<Button
						style={styles.btnCancel}
						label="Back"
						onPress={() => navigation.goBack()}
						labelStyle={{color: Color.colorPrimaryDark}}/>
				</View>
				<SafeAreaView style={styles.marB5} />
			</View>
		);
	}
}

Selection.propTypes = {
	actions: PropTypes.object,
};

export default Selection;
