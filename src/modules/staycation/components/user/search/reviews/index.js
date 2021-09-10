import React from "react";
import {View, FlatList, Text, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import Resource from "__src/resources";
import Comment from "./Comment";
const {Color, Res} = Resource;
const Datas = [
	{
		name: "Sol Caliber",
		star: 4,
		date: "2019-11-29",
		comment: "Hello there, you use to be my nightmare.",
		avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
	},
	{
		name: "Michael Jogn Jacson",
		star: 4,
		date: "2019-11-29",
		comment: "Qkkajshfkajh aksjfhkaj askfjhaskfjh aksjfhaksjhf akjshfaksjhf akjshfaksjhf akjshfakjshf akjshfakjsh.",
		avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
	},
];

class ReviewScreen extends React.PureComponent{
	render(){
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Reviews</Text>
				<FlatList
					data={Datas}
					keyExtractor={(item, index) => `idx${index}`}
					renderItem={({item}) => <Comment {...{item}}/>}
				/>
				<Text style={{fontFamily: "Roboto", fontSize: 14, color: Color.colorPrimaryLight2, marginVertical: 10}} suppressHighlighting>Show More Reviews</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {minHeight: 100},
	title: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 16, color: Color.text2, marginTop: 18},
});

export default ReviewScreen;

