import React, {Component} from "react";
import {View, StyleSheet, Image, Text, TouchableOpacity} from "react-native";
import Resource from "__src/resources";
import  Comp  from "__src/components";
import propTypes from "prop-types";
const {Color, Res, ReadMore} = Resource;


export default class Amenities extends Component{
	

	render(){
		return (
			<View style={styles.container}>
				<Text style={styles.type}>Reviews</Text>
				<View style={styles.Wrapper01}>
					<Image source={Res.get("mapcircle")} style={styles.imageProfile} />
					<View style={styles.flexCol}>
						<Text style={styles.author}>John Smith</Text>
						<Text style={styles.date}>July 2018</Text>
					</View>
				</View>
				
				<ReadMore
					numberOfLines={3}>
					<Text style={styles.show}>
                        Quezon city, Manila, Philippines Quezon city, Manila,
                        Philippines Quezon city, Manila, Philippines
                        Quezon city, Manila, Philippines Quezon city,
                        Manila, PhilippinesQuezon city, Manila, Philippines
					</Text>
				</ReadMore>

				<View style={styles.Wrapper02}>
					<Text style={styles.readall}>Read all 108 reviews</Text>
					<Comp.Stars
						votes={10}
						size={12}
						color={Color.bg} />
				</View>
				<View style={styles.flexCol}>
					<View style={styles.Wrapper03}>
						<Text style={styles.show}>House rules</Text>
						<TouchableOpacity>
							<Text style={styles.readall}>Read</Text>
						</TouchableOpacity>

					</View>
					<View style={styles.line}/>
				</View>
				<View style={styles.flexCol}>
					<View style={styles.Wrapper03}>
						<Text style={styles.show}>Cancellation policy</Text>
						<TouchableOpacity>
							<Text style={styles.readall}>Moderate</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.line}/>
				</View>
				<View style={styles.flexCol}>
					<View style={styles.Wrapper03}>
						<Text style={styles.show}>Additional prices</Text>
						<TouchableOpacity>
							<Text style={styles.readall}>See</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.line}/>
				</View>
				<View style={styles.flexCol}>
					<View style={styles.Wrapper03}>
						<Text style={styles.show}>Contact host</Text>
						<TouchableOpacity>
							<Text style={styles.readall}>Message</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.line}/>
				</View>
				<View style={styles.flexCol}>
					<View style={styles.Wrapper03}>
						<Text style={styles.show}>Report this listing</Text>
						<TouchableOpacity>
							<Text style={styles.readall}>Report</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.line}/>
				</View>
			</View>
		);
	}
}

Amenities.propTypes = {
	navigation: propTypes.object,
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20, minHeight: 10, marginBottom: 15,
	},
	Wrapper01: {flexDirection: "row", alignItems: "center", marginVertical: 10},
	Wrapper02: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 10},
	Wrapper03: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 11},
	imageProfile: {width: 43, height: 43, marginRight: 10},
	flexCol: {flexDirection: "column"},
	line: {height: 1, backgroundColor: Color.gray04},
	type: {
		fontWeight: "700", fontSize: 15,
		fontFamily: "Roboto", color: Color.txt,
	},
	author: {
		fontSize: 12, fontWeight: "bold",
		fontFamily: "Roboto", color: "black",
	},
	date: {
		fontWeight: "100", fontSize: 14,
		fontFamily: "Roboto", color: Color.gray04,
	},
	show: {
		fontWeight: "600", fontSize: 14,
		fontFamily: "Roboto", color: Color.txt,
	},
	readall: {
		fontWeight: "600", fontSize: 14,
		fontFamily: "Roboto", color: Color.bg,
	},
});
