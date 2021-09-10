import React, {Component} from "react";
import {View, StyleSheet, Image, Text} from "react-native";
import Resource from "__src/resources";
const {Color} = Resource;

const url = {
	uri: "https://i.ytimg.com/vi/zVgZ0PGPhzU/maxresdefault.jpg",
};

export default class MapLocation extends Component{
	render(){
		return (
			<View style={styles.container}>
				<Image
					source={url}
					style={styles.image} />
				<View style={styles.body}>
					<View style={styles.flexCol}>
						<View style={styles.Wrapper}>
							<Text style={styles.time}>Check in</Text>
							<Text style={styles.time}>6PM - 11PM</Text>
						</View>
						<View style={styles.line}/>
					</View>
					<View style={styles.flexCol}>
						<View style={styles.Wrapper}>
							<Text style={styles.time}>Check out</Text>
							<Text style={styles.time}>4PM</Text>
						</View>
						<View style={styles.line}/>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: { minHeight: 100, marginBottom: 10 },
	body: {marginHorizontal: 20, marginTop: 10},
	flexCol: {flexDirection: "column"},
	Wrapper: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 10},
	line: {height: 1, backgroundColor: Color.gray04},
	image: {
		flexGrow: 1, height: 200, width: null,
		alignItems: "center", justifyContent: "center",
	  },
	time: {
		fontWeight: "100", fontSize: 14,
		fontFamily: "Roboto", color: Color.gray04,
	},
});
