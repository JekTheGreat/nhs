/* eslint-disable */
import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
// Get here [TODO ADD URL]
import Pagination from "./pagination/index";
import _ from "lodash";

const MockPersonList = new _.times(35, (i) => {
	return {
		id: i,
		index: i,
		group: `Family ${ i}`,
	};
});

export default class HorizontalPagedFlatListExample extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: MockPersonList,
			// Selected: (new Map(): Map<string, boolean>),
		};
	}
  // Render list seen here [TODO ADD URL]
  _renderItem = ({ item }) => {
  	return (
  		<View key={item.id} style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
  			<Text>{item.group}</Text>
  		</View>
  	);
  };
  // Map to some key. We use the "id" attribute of each item in our list created in our MockTweetList
  _keyExtractor = (item, index) => item.id.toString()
  // REQUIRED for ReactNativePagination to work correctly
  onViewableItemsChanged = ({ viewableItems, changed }) => {
  	console.log("viewableItems", [viewableItems[0]]);
  	this.setState({ viewableItems: [viewableItems[0]] });
  }
  render() {
  	return (
  		<View style={[ s.container ]}>
  			<FlatList
  				ref={(r) => this.refs = r}
  				data={this.state.items}
  				horizontal
  				keyExtractor={this._keyExtractor}
  				onViewableItemsChanged={this.onViewableItemsChanged}// Map your keys to whatever unique ids the have (mine is a "id" prop)
  				pagingEnabled
  				renderItem={this._renderItem}
  			/>
  			<Pagination
  				// DotThemeLight
  				horizontal
  				hideEmptyDots
  				dotEmptyHide
  				dotIconColorActive="white"
  				dotIconColorNotActive="blue"
  				// DotIconColorEmpty={"blue"}
  				dotIconSizeActive={16}
  				/*
           *  DotIconSizeNotActive={10}
           * StartDotIconSize={30}
           * EndDotIconSize={30}
           */
  				listRef={this.refs}// To allow React Native Pagination to scroll to item when clicked  (so add "ref={r=>this.refs=r}" to your list)
  				paginationVisibleItems={this.state.viewableItems}// Needs to track what the user sees
  				paginationItems={this.state.items}// Pass the same list as data
  				paginationItemPadSize={2}
  			/>
  		</View>);
  }
}
const s = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "grey", // <-- use with "dotThemeLight"
	},
});
