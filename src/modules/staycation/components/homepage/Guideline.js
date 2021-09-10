import React, {Component} from "react";
import {View, Image, Text, StyleSheet} from "react-native";
import  Resources from "__src/resources";
const {Res, Color} = Resources;

export default class Guideline extends Component{
	render(){
		return (
			<View style={styles.container}>
				<View style={styles.card}>
					<Image source={Res.get("pricecircle")} style={styles.imageReview} resizeMode="contain" />
					<Text style={styles.txtBestPrice}>
						BEST PRICE GUARANTEE
					</Text>
					<Text style={styles.txtImageSubTitle}>
						Lorem ipsum dotoreit ad duo fugtanque
						fabulas lucitas pri veniam delectus eivis.
					</Text>
				</View>
				<View style={styles.card}>
					<Image source={Res.get("securecircle")} style={styles.imageReview} resizeMode="contain" />
					<Text style={styles.txtBestPrice}>
						SAFE AND SECURE
					</Text>
					<Text style={styles.txtImageSubTitle}>
						Lorem ipsum dotoreit ad duo fugtanque
						fabulas lucitas pri veniam delectus eivis.
					</Text>
				</View>
				<View style={styles.card}>
					<Image source={Res.get("mapcircle")} style={styles.imageReview} resizeMode="contain" />
					<Text style={styles.txtBestPrice}>
						TRAVEL GUIDELINES
					</Text>
					<Text style={styles.txtImageSubTitle}>
						Lorem ipsum dotoreit ad duo fugtanque
						fabulas lucitas pri veniam delectus eivis.
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 15,
		padding: 20,
		borderBottomWidth: 0.5,
		borderTopWidth: 0.5,
		borderColor: Color.border,
		alignItems: "center",
	},
	card: {
		alignItems: "center", justifyContent: "center",
		flexDirection: "column",
		minHeight: 210,
	},
	imageReview: {width: 100, height: 100},
	txtImageSubTitle: {textAlign: "center", fontSize: 13, color: "black", fontFamily: "Roboto"},
    
	txtBestPrice: {
		textAlign: "center",
		color: "black",
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "Roboto-Light",
		marginTop: 15,
	},
});
