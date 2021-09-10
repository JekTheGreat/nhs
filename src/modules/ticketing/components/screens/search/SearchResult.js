/* eslint-disable max-len */
import React from "react";
import {View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import Resource from "__src/resources";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.locale(en);
const timeAgo = new TimeAgo("en-US");
const {Color, Res} = Resource;

class SearchResult extends React.PureComponent{

  renderItem = ({item, index}) => {
  	const {onItemPress} = this.props;
		
  	return (
  		<TouchableOpacity key={`${index}`} onPress={() => onItemPress(item)} style={styles.buttonItem}>
  			<View style={styles.view4}>
  				<Image style={styles.image2} source={Res.get("flight")} resizeMode="stretch"/>
  				<Text style={styles.txtIata}>{item.iata} - </Text>
  				<Text style={styles.txt2}>{item.name}</Text>
  			</View>
  			<View style={styles.view1}>
  				<Text style={styles.txtLocation}>{item.location}</Text>
  				<Text style={styles.txtTime}>{timeAgo.format(item.updatedAt)}</Text>
  			</View>
  		</TouchableOpacity>
  	);
  }
		
	renderItemResult = ({item, index}) => {
		const {onItemPress} = this.props;

		return (
			<TouchableOpacity key={`${index}`} onPress={() => onItemPress(item)} style={styles.buttonItem}>
				<View style={styles.view4}>
					<Image style={styles.image2} source={Res.get("flight")} resizeMode="stretch"/>
					<Text style={styles.txtIata}>{item.iata} - </Text>
					<Text style={styles.txt2}>{item.name}</Text>
				</View>
				<Text style={styles.txtLocation}>{item.location}</Text>
			</TouchableOpacity>

		);
	}
	
	renderResult = () => {

		const {ticketing: {searchCountry}} = this.props;

		return (
  		<View style={styles.container}>
  			<Text style={styles.txtLabel}>Search Found</Text>
  			<FlatList
  				data={searchCountry}
  				keyExtractor={(item, index) => `${index}`}
  				renderItem={this.renderItemResult}/>
  		</View>
  	);
	}
  
	render(){
		const {ticketing: {searchCountry, setPreviousSearch}} = this.props;

		if (!_.isEmpty(searchCountry)){
			return this.renderResult();
		}

  	return (
  		<View style={styles.container}>
  			<Text style={styles.txtLabel}>Top Search</Text>
  			<FlatList
  				data={setPreviousSearch}
  				keyExtractor={(item, index) => `${index}`}
  				renderItem={this.renderItem}/>
  		</View>
  	);
	}
}

SearchResult.propTypes = {
	ticketing: PropTypes.object,
	actions: PropTypes.object,
	onItemPress: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {flex: 1, marginTop: 15, marginHorizontal: 10, paddingBottom: 20},
	txtLabel: {fontFamily: "Montserrat-Regular", fontSize: 12, color: Color.Header, marginBottom: 5},
	view4: {flexDirection: "row", alignItems: "center"},
	view1: {flexDirection: "row", alignItems: "center", justifyContent: "space-between"},
	image2: {height: 15, width: 15},
	buttonItem: {height: 50, justifyContent: "center"},
	txtIata: {fontFamily: "Roboto-Medium", fontSize: 15, color: Color.Header, marginLeft: 5},
	txtLocation: {fontStyle: "italic", fontSize: 13, color: Color.Header, flex: 1 },
	txtTime: {fontFamily: "Roboto", fontSize: 13, color: Color.Header},
});

export default SearchResult;
