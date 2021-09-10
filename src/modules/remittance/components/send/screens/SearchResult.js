/* eslint-disable react/prop-types */
/* eslint-disable max-len */
// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, SafeAreaView, FlatList, TouchableOpacity} from "react-native";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import styles from "../../../styles.css";
import moment from "moment";
import _ from "lodash";
import SearchDetail from "./SearchDetails";
import Resources from "__src/resources";
const {Color} = Resources;

class SearchResult extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			amount: "",
			provider: "",
			error: {},
			items: {},
			isVisible: false,
		};
	}

	onChangeText = (type) => (value) => {
		const {actions, remittance: {inputDetails}} = this.props;
		const newInput = _.merge({}, inputDetails);
		const error = {};

		if (value) {
			delete error[type];
		} else  if (type !== "suffix"){
			error[type] = "This field is required";
		}

		if (type === "birthday"){
			newInput[type] = +moment(new Date(value));
		} else {
			newInput[type] = _.isObject(value) ? value.name : value;
		}

		actions.inputDetails(newInput);
		this.setState({error});
	}
  
  renderSearchDetail = () => {
  	const {isVisible} = this.state;

  	return (
  		<SearchDetail ref={(e) => this.search = e} visible={isVisible}
  			onClose={() => this.setState({isVisible: false})}
  			onRequestClose={() => this.setState({isVisible: false})}
  			{...this.props}/>
  	);
  }
  
  onClickItem = (item) => {
  	const {type} = this.props;
  	this.setState({ isVisible: true});
  	this.search.setData({...item, type});
  }

	renderItem = ({item, index}) => {
		const color = index % 2 ? {backgroundColor: Color.LightBlue2} : null;
		const date = moment(new Date(item.DoB));

		return (
			<TouchableOpacity onPress={() => this.onClickItem(item)} activeOpacity={0.5}
				key={`idx ${index}`} style={[styles.SearchFoundItem, color]}>
  			<View style={styles.SearchFoundView1}>
  				<Text numberOfLines={2} style={styles.txtRemark}>Loyalty Card No: {item.loyaltyNo}</Text>
  				<Text style={styles.txtStatus}>{item.firstName} {item.middleName} {item.lastName}</Text>
  			</View>
  			<View style={styles.SearchFoundView2}>
  				<Text style={styles.txtTrack}>Birth Date:</Text>
  				<Text style={styles.txtTime}>{date.format("MM/DD/YYYY")}</Text>
  			</View>
  		</TouchableOpacity>
		);
	}


	render(){
		const {remittance: {SearchFound}, type, onBack} = this.props;
		const naming = type === "searchsender" ? "Sender" : "Beneficiary";

		return (
			<View style={styles.flex1}>
				<Text style={[styles.txtSearchFoundLabel, styles.marT15, styles.marB10, styles.padH20]}>Previous {naming} Result</Text>
				<FlatList
					data={SearchFound.D}
					renderItem={this.renderItem}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={<Text style={[styles.txt9, styles.marT10]}>
					No item available!</Text>}
					keyExtractor={(item, index) => `idx ${index}`} />

				<View style={styles.viewButton}>
					<Button
						onPress={() => onBack()}
						style={styles.btnCancel}
						label="Back"
						labelStyle={{color: Color.colorPrimaryDark}}/>
					
				</View>
				{this.renderSearchDetail()}
				<SafeAreaView style={styles.marB20}/>
			</View>
		);
	}

}

SearchResult.propTypes = {
	actions: PropTypes.object,
	remittance: PropTypes.object,
	type: PropTypes.string,
};

export default SearchResult;
