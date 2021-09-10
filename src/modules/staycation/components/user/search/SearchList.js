import React from "react";
import {View, FlatList, TouchableOpacity, Text} from "react-native";
import PropTypes from "prop-types";
import datas from "../../../data.json";
import LocationFloat from "__src/resources/svg/staycation/LocationFloat";
import SearchItem from "./SearchItem";
import Resources from "__src/resources";
const {Color, Res} = Resources;

const SearchList = (props) => {

	return (
		<View style={{flex: 1}}>

			<FlatList
				style={{paddingHorizontal: 20}}
				data={datas}
				keyExtractor={(item) => `${item.id}`}
				renderItem={({item}) => (<SearchItem key={item.id}
					listing={item} {...props}/>)}
				ListHeaderComponent={<Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 20, color: Color.text2, marginTop: 20}}>232 Available Place</Text>}
			/>

			<TouchableOpacity style={{position: "absolute", bottom: 10, right: 10, alignItems: "center", justifyContent: "center"}}>
				<LocationFloat size={75} />
			</TouchableOpacity>
		</View>
	);
};

export default SearchList;
