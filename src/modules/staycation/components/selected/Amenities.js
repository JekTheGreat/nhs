import React, {Component} from "react";
import {View, StyleSheet, Image, Text, TouchableOpacity} from "react-native";
import Resource from "__src/resources";

const {Color, Res} = Resource;

export default class Amenities extends Component{
	render(){
		return (
			<View style={styles.container}>
				<Text style={styles.type}>Amenities</Text>
				
				<View style={styles.body}>
					<View style={styles.Wrapper}>
						<View style={styles.Wrapper01}>
							<Image source={Res.get("guesticongold")} style={styles.image} />
							<Text style={styles.label}>Wifi </Text>
						</View>
						<View style={styles.Wrapper02}>
							<Image source={Res.get("bedroomicongold")} style={styles.image} />
							<Text style={styles.label}>Aircondition </Text>
						</View>
						<View style={styles.Wrapper01}>
							<Image source={Res.get("bedroomicongold")} style={styles.image} />
							<Text style={styles.label}>Restaurant </Text>
						</View>
					</View>
					<View style={styles.Wrapper}>
						<View style={styles.Wrapper01}>
							<Image source={Res.get("guesticongold")} style={styles.image} />
							<Text style={styles.label}>Parking </Text>
						</View>
						<View style={styles.Wrapper02}>
							<Image source={Res.get("bedroomicongold")} style={styles.image} />
							<Text style={styles.label}>Kitchen </Text>
						</View>
						<View style={styles.Wrapper01}>
							<Image source={Res.get("bedroomicongold")} style={styles.image} />
							<Text style={styles.label}>Pet Allowed </Text>
						</View>
					</View>
					<View style={styles.Wrapper}>
						<View style={styles.Wrapper01}>
							<Image source={Res.get("guesticongold")} style={styles.image} />
							<Text style={styles.label}>TV </Text>
						</View>
						<View style={styles.Wrapper02}>
							<Image source={Res.get("bedroomicongold")} style={styles.image} />
							<Text style={styles.label}>Breakfast </Text>
						</View>
						<View style={styles.Wrapper01}>
							<Image source={Res.get("bedroomicongold")} style={styles.image} />
							<Text style={styles.label}>Hangers </Text>
						</View>
					</View>
					<TouchableOpacity>
						<Text style={styles.show}>Show all amenities...</Text>
					</TouchableOpacity>
				</View>
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20, minHeight: 10,
		marginBottom: 10,
	},
	body: {flexDirection: "column", marginVertical: 8},
	Wrapper: {flexDirection: "row", marginVertical: 3},
	Wrapper01: {flexDirection: "row", alignItems: "center", minWidth: 100},
	Wrapper02: {flexDirection: "row", alignItems: "center", minWidth: 110},
	label: {fontSize: 13, fontFamily: "Roboto", color: Color.txt },
	image: {width: 10, height: 10, marginRight: 5},
	type: {
		fontWeight: "700", fontSize: 15,
		fontFamily: "Roboto", color: Color.txt,
	},
	show: {
		fontWeight: "600", fontSize: 13,
		fontFamily: "Roboto", color: Color.bg,
	},
});
