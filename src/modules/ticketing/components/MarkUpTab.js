import React from "react";
import {View, FlatList, StyleSheet, Text, TouchableWithoutFeedback} from "react-native";
import Detail from "__src/components/Detail";
import {Icon} from "react-native-elements";
import _ from "lodash";
import AddMarkupScreen from "./screens/markup/AddMarkupScreen";
import moment from "moment";
import Resource from "__src/resources";
import PropTypes from "prop-types";
const {Color} = Resource;

class MarkUpTab extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			isAddCurrency: false,
			error: {}, submitFailed: "",
			setInput: {},
		};
	}

	componentDidMount(){
		this.onRefresh();
	}

	componentDidUpdate(prevProps){
		const {ticketing: {addMarkupFailed, addMarkupSuccess}} = this.props;

		if (!_.isEqual(prevProps.ticketing.addMarkupFailed, addMarkupFailed) &&
			!_.isEmpty(addMarkupFailed)){
			this.setState({submitFailed: addMarkupFailed});
		}
		if (!_.isEqual(prevProps.ticketing.addMarkupSuccess, addMarkupSuccess) &&
			!_.isEmpty(addMarkupSuccess)){
			this.setState({isAddCurrency: false, submitFailed: ""});
		}
	}

	onRefresh = () => {
		const {actions, login: {session}} = this.props;

		actions.getListMarkup(session.token);
	}
  
  onChangeText = (type) => (val) => {
  	const {setInput} = this.state;
  	const newInput = _.merge({}, setInput);
		
  	newInput[type] = val;
  	this.setState({setInput: newInput});
  }
	
  renderItem = ({item}) => {
  	const created = moment(item.createdAt).format("DD MMMM, YYYY");
  	const time = moment(item.createdAt).format("hh:mm:ss A");
  	const color = item.status ? Color.green : Color.red;
  	const status = item.status ? "Active" : "Inactive";

  	return (
  		<View key={item.id} style={styles.renderItem}>
      	<Detail label={"Date and Time"} numberOfLines={2} value={`${created}\n${time}`}
      		labelStyle2={styles.labelStyle} valueStyle2={styles.labelStyle}/>
      	<Detail label={"Currency"} value={item.currency}
      		labelStyle2={styles.labelStyle} valueStyle2={styles.labelStyle}/>
  			<Detail label={"Domestic Markup"} value={item.domestic}
      		labelStyle2={styles.labelStyle} valueStyle2={styles.labelStyle}/>
  			<Detail label={"International Markup"} value={item.international}
      		labelStyle2={styles.labelStyle} valueStyle2={styles.labelStyle}/>
      	<Detail label={"Status"} value={status}
      		labelStyle2={styles.labelStyle} valueStyle2={[styles.labelStyle, {color}]}/>
  		</View>
  	);
  }
	
	onSubmit = () => {
		const {actions, login: {session}} = this.props;
		const {setInput} = this.state;
		const error = {};

		if (_.isEmpty(setInput.currency)){
			error.currency = "This field is required.";
		} else if (_.isEmpty(setInput.domestic)){
			error.domestic = "This field is required.";
		} else if (_.isEmpty(setInput.international)){
			error.international = "This field is required.";
		}

		this.setState({error});
		if (_.isEmpty(error)){
			actions.addMarkupCurrency(setInput, session.token);
		}
	}

	render(){
  	const {ticketing: {isGettingMarkup, markupList}} = this.props;
  	const {isAddCurrency, error, setInput, submitFailed} = this.state;
  	const emptyMessage = isGettingMarkup ? "Refreshing.." : "No data found!";
  	
  	return (
  		<View style={styles.container}>
  			<View style={styles.view1}>
  				<View style={styles.flex1}/>
  				<TouchableWithoutFeedback onPress={() => this.setState({isAddCurrency: true})}>
  					<View style={styles.view2}>
  						<View style={styles.viewPlus}>
  							<Icon name="add" color="white" size={22}/>
  						</View>
  						<Text style={styles.textAdd}>Add Markup</Text>
  					</View>
  				</TouchableWithoutFeedback>
  			</View>
  			
  			<FlatList
  				data={_.orderBy(markupList, ["id"], ["desc"])}
  				showsVerticalScrollIndicator={false}
  				refreshing={isGettingMarkup}
  				onRefresh={this.onRefresh}
  				keyExtractor={(item) => `${item.id}` }
  				ItemSeparatorComponent={() => <View style={styles.separator}/>}
  				ListEmptyComponent={() => <Text style={styles.nodata}>{emptyMessage}</Text>}
  				ListFooterComponent={() => <View style={styles.height30}/>}
  				renderItem={this.renderItem}/>

  			<AddMarkupScreen visible={isAddCurrency} submitFailed={submitFailed}
  				error={error} setInput={setInput} onSubmit={this.onSubmit}
  				onChangeText={this.onChangeText} {...this.props}
  				onClose={() => this.setState({isAddCurrency: false})}/>
  		</View>
  	);
	}
}

MarkUpTab.propTypes = {
	login: PropTypes.object,
	actions: PropTypes.object,
	ticketing: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flex: 1, paddingHorizontal: 15},
	renderItem: {alignItems: "center", justifyContent: "space-between", marginTop: 14},
	labelStyle: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2},
	view1: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20, paddingBottom: 5},
	view2: {flexDirection: "row", flexShrink: 1, justifyContent: "flex-end", alignItems: "center"},
	flex1: {flex: 1},
	viewPlus: {width: 22, height: 22, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: Color.Header},
	textAdd: {fontFamily: "Roboto", fontSize: 15, color: Color.Header, marginLeft: 7},
	separator: {height: 0.5, backgroundColor: Color.Standard, marginTop: 3},
	height30: {height: 30},
	nodata: {fontFamily: "Roboto", fontSize: 15, color: Color.text2, marginTop: 10, textAlign: "center"},
});

export default MarkUpTab;
