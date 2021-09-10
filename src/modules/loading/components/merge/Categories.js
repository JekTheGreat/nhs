/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text,
	FlatList, ScrollView} from "react-native";
import styles from "../../styles.css";
import {Card} from "native-base";
import Resources from "__src/resources";
import {Icon} from "react-native-elements";
import _ from "lodash";
import RenderItem from "./RenderItem";
import PropTypes from "prop-types";
import Loading from "__src/components/Loading";
const { Color } = Resources;

export default class Categories extends PureComponent{
	constructor(props){
		super(props);

		this.state = {
			selectedItem: {},
			amount: "",
			error: {},
		};
	}

  onSelection = (item) => {
  	const {actions} = this.props;
  	const selectedItem = {};
  	const value = !selectedItem[item.code];

  	if (value) {
  		selectedItem[item.code] = true;
  		actions.selectIntSubCategories(item);
  	}
  	this.setState({selectedItem, error: {}});
  }

  renderItem = ({item, index}) => {
  	const {selectedItem} = this.state;
  	const selected = selectedItem[item.code] ? {backgroundColor: Color.LightBlue} : null;
		
  	return (
  		<RenderItem	key={`key${index}`}
  	 		onPress={() => this.onSelection(item)}
  			item={item}
  			selected={selected}
  		/>
  	);
  }

	onSubmit = () => {
		const {actions} = this.props;
		const {selectedItem} = this.state;
		const error = {};

		if (_.isEmpty(selectedItem)){
			error.amount = "Please select plancode.";
		}

		if (_.isEmpty(error)){
			actions.setIntScreen("Product");
		} else {
			this.setState({error});
		}
	}

	renderError = () => {
		const {error} = this.state;

		if (!_.isEmpty(error)){
			return (
				<Card style={[styles.inpuView1, styles.cardView3]}>
					<Icon containerStyle={styles.iconContainerStyle}
						name='close-circle' type="material-community" color={Color.red} size={15} />
					<Text style={[styles.txt3, {color: Color.red}, styles.flex1]}>
						{error.amount}</Text>
				</Card>
			);
		}
	}

	render(){
		const {loading: {isPlancodeLoad, IntCategories}} = this.props;

		console.log("INTECAT", IntCategories);

		if (isPlancodeLoad){
			return <Loading size="small"/>;
		}

  	return (
  		<View style={styles.mainContainer}>
				<View style={styles.zIndex1}>
					{this.renderError()}
				</View>
				<FlatList
					showsVerticalScrollIndicator={false}
					style={styles.marB20}
					data={IntCategories.data || []}
					extraData={this.state}
					ListEmptyComponent={<Text style={[styles.txt4, styles.marT10]}>
					No item available!</Text>}
					renderItem={this.renderItem}
					keyExtractor={(item, index) => `idx ${index}`}/>
  		</View>
  	);
	}
}

Categories.propTypes = {
	actions: PropTypes.object,
	loading: PropTypes.object,
	item: PropTypes.object,
};
