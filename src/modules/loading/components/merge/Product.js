import React, {PureComponent} from "react";
import {View, Text, FlatList, Alert} from "react-native";
import styles from "../../styles.css";
import {Card} from "native-base";
import Resources from "__src/resources";
import {Icon} from "react-native-elements";
import _ from "lodash";
import RenderItem from "./RenderItem";
import PropTypes from "prop-types";
import Loading from "__src/components/Loading";
const { Color } = Resources;

export default class Product extends PureComponent{
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
		const value = !selectedItem[item.name];

		if (value) {
			selectedItem[item.name] = true;
			actions.selectedIntProduct(item);
		}
		this.setState({selectedItem, error: {}});
	}

  renderItem = ({item, index}) => {
  	const {selectedItem} = this.state;
  	const selected = selectedItem[item.name] ? {backgroundColor: Color.LightBlue} : null;
		
  	return (
  		<RenderItem	key={`key${index}`}
  	 		onPress={() => this.onSelection(item)}
  			item={item}
  			nosub
  			selected={selected}
  		/>
  	);
  }

	onSubmit = () => {
		const {actions} = this.props;
		const {selectedItem} = this.state;
		const error = {};

		if (_.isEmpty(selectedItem)){
			error.amount = "Please select product.";
			this.setState({error});
			Alert.alert("Notice", "Please select product.");
		}

		if (_.isEmpty(error)){
			actions.setIntScreen("SubCategory");
		}
	}

	renderError = () => {
		const {error} = this.state;

		if (!_.isEmpty(error)){
			return (
				<Card style={[styles.inpuView1, styles.cardView3]}>
					<Icon containerStyle={styles.iconContainerStyle}
						name="close-circle" type="material-community" color={Color.red} size={15} />
					<Text style={[styles.txt3, {color: Color.red}, styles.flex1]}>
						{error.amount}</Text>
				</Card>
			);
		}
	}

	getProduct = () => {
		const {loading: {IntSubCategories}} = this.props;
		const array = [];
		if (!_.isEmpty(IntSubCategories)) {
			if (!_.isEmpty(IntSubCategories.categories.bundle)){
				array.push({name: "Bundle", product: IntSubCategories.categories.bundle });
			}
	
			if (!_.isEmpty(IntSubCategories.categories.data)){
				array.push({name: "Data", product: IntSubCategories.categories.data });
			}
	
			if (!_.isEmpty(IntSubCategories.categories.topup)){
				array.push({name: "Topup", product: IntSubCategories.categories.topup });
			}
		}

		return array;
	}

	render(){
		const {loading: {isPlancodeLoad}} = this.props;

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
					data={this.getProduct()}
					extraData={this.state}
					ListEmptyComponent={<Text style={[styles.txt4, styles.marT10]}>
					No item available!</Text>}
					renderItem={this.renderItem}
					keyExtractor={(item, index) => `idx ${index}`}/>
  		</View>
  	);
	}
}

Product.propTypes = {
	actions: PropTypes.object,
	loading: PropTypes.object,
	item: PropTypes.object,
};
