import React, {Component} from "react";
import {View, StyleSheet, Image, Text} from "react-native";
import Resource from "__src/resources";
const {Color, Res} = Resource;

export default class FrontProfile extends Component{
	render(){
		return (
			<View style={styles.container}>
				<Text style={styles.type}>ENTIRE APARTMENT</Text>
				<Text style={styles.title}>Eurotel Vivaldi</Text>
				<View style={styles.body}>
					<View style={styles.flexCol}>
						<Text style={styles.type}>Quezon city, Manila, Philippines</Text>
						<Text style={styles.type}>Hosted by Arjay</Text>
					</View>
					<Image source={Res.get("mapcircle")} style={styles.imageProfile} />
				</View>
				<View style={styles.flexCol}>
					<View style={styles.Wrapper}>
						<View style={styles.Wrapper01}>
							<Image source={Res.get("guesticongold")} style={styles.imageIcon} />
							<Text style={styles.label}>4 guests </Text>
						</View>
						<View style={styles.Wrapper01}>
							<Image source={Res.get("bedroomicongold")} style={styles.imageIcon} />
							<Text style={styles.label}>2 bedrooms </Text>
						</View>
					</View>
					<View style={styles.Wrapper}>
						<View style={styles.Wrapper01}>
							<Image source={Res.get("bedicongold")} style={styles.imageIcon} />
							<Text style={styles.label}>2 beds </Text>
						</View>
						<View style={styles.Wrapper01}>
							<Image source={Res.get("bathicongold")} style={styles.imageIcon} />
							<Text style={styles.label}>2 baths </Text>
						</View>
					</View>
				</View>
				<View>
					<Text style={styles.type}>
						Quezon city, Manila, Philippines Quezon city, Manila,
						Philippines Quezon city, Manila, Philippines
						Quezon city, Manila, Philippines Quezon city, Manila,
						PhilippinesQuezon city, Manila, Philippines
					</Text>
					<View style={styles.line}/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 10, marginHorizontal: 20,
	},
	body: {flexDirection: "row", alignItems: "center", justifyContent: "space-between"},
	flexCol: {flexDirection: "column"},
	imageProfile: {width: 43, height: 43, marginRight: 10},
	Wrapper: {flexDirection: "row", marginVertical: 8},
	Wrapper01: {flexDirection: "row", alignItems: "center", minWidth: 100},
	imageIcon: {width: 10, height: 10, marginRight: 5},
	label: {fontSize: 12, fontFamily: "Roboto", color: Color.txt },
	line: {marginTop: 15, width: "100%", height: 1, backgroundColor: Color.gray03},
	type: {
		fontWeight: "700", fontSize: 12,
		fontFamily: "Roboto", color: Color.txt,
	},
	title: {
		fontWeight: "bold", fontSize: 16,
		fontFamily: "Roboto", color: "black",
	},
});
