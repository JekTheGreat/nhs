/* eslint-disable */
import React, {Component} from "react";
import {View, Animated, TouchableWithoutFeedback, TouchableOpacity, Image, Text, StyleSheet} from "react-native";
import  Stars  from "__src/components/Stars";
import  Resources from "__src/resources";
const {Res, Color} = Resources;

export default class Guideline extends Component{
	constructor(props){
		super(props);

		this.handlePressIn = this.handlePressIn.bind(this);
		this.handlePressOut = this.handlePressOut.bind(this);
	}

	componentWillMount(){
		this.animatePress = new Animated.Value(1);
	}

	handlePressIn(){
		Animated.spring(this.animatePress, {
			toValue: 0.9,
		}).start();
	}
	
	handlePressOut(){
		Animated.spring(this.animatePress, {
			toValue: 1,
		}).start();
	}
	render(){
		const animatedStyle = {
			transform: [{ scale: this.animatePress}],
		};

		return (
			<View style={styles.container}>
				<Text style={styles.txtReviewTitle}>HOTELS IN PHILIPPINES</Text>
				<View style={styles.viewColumn}>
					<View style={styles.viewRow}>

						<TouchableWithoutFeedback
							onPressIn={this.handlePressIn}
							onPressOut={this.handlePressOut}>
							<Animated.View style={[styles.imageHotelRight, animatedStyle]}>
								<Image source={Res.get("home_image_3")} style={{height: 100, width: null, borderRadius: 3}} resizeMode="cover" />
								<View style={{backgroundColor: "white", marginTop: 3}}>
									<Text style={{fontSize: 9, color: Color.Standard2, fontFamily: "Roboto-Light"}}>
									PRIVATE ROOM * CASABLANCA
									</Text>
									<Text numberOfLines={3}
										style={{fontSize: 12, fontWeight: "bold", color: Color.Standard2, fontFamily: "Roboto-Light"}}>
									Explore Old Barcelona from a Loft-Style Student
									Hello makati bukaret
									</Text>
									<Text style={{fontSize: 9, color: Color.Standard2, fontFamily: "Roboto-Light"}}>
									P2,981 per night * Free Cancellation
									</Text>
									<Stars
										txtVote
										votes={5}
										size={10}
										color={Color.colorPrimary} />
								</View>
							</Animated.View>
						</TouchableWithoutFeedback>

						<TouchableWithoutFeedback
							onPressIn={this.handlePressIn}
							onPressOut={this.handlePressOut}>
							<Animated.View style={[styles.imageHotelLeft, animatedStyle]}>
								<Image source={Res.get("home_image_1")} style={{height: 100, width: null, borderRadius: 3}} resizeMode="cover" />
								<View style={{backgroundColor: "white", marginTop: 3}}>
									<Text style={{fontSize: 9, color: Color.Standard2, fontFamily: "Roboto-Light"}}>
									PRIVATE ROOM * CASABLANCA
									</Text>
									<Text numberOfLines={2}
										style={{fontSize: 12, fontWeight: "bold", color: Color.Standard2, fontFamily: "Roboto-Light"}}>
									Explore Old Barcelona from a Loft-Style Student
									</Text>
									<Text style={{fontSize: 9, color: Color.Standard2, fontFamily: "Roboto-Light"}}>
									P2,981 per night * Free Cancellation
									</Text>
									<Stars
										txtVote
										votes={5}
										size={10}
										color={Color.colorPrimary} />
								</View>
							</Animated.View>
						</TouchableWithoutFeedback>
					</View>
				

					<View style={styles.viewRow}>
						<View style={styles.imageHotelRight}>
							<Image source={Res.get("home_image_2")} style={{height: 100, width: null, borderRadius: 3}} resizeMode="cover" />
							<View style={{backgroundColor: "white", marginTop: 3}}>
								<Text style={{fontSize: 9, color: Color.Standard2, fontFamily: "Roboto-Light"}}>
									PRIVATE ROOM * CASABLANCA
								</Text>
								<Text numberOfLines={2}
									style={{fontSize: 12, fontWeight: "bold", color: Color.Standard2, fontFamily: "Roboto-Light"}}>
									Explore Old Barcelona from a Loft-Style Student
								</Text>
								<Text style={{fontSize: 9, color: Color.Standard2, fontFamily: "Roboto-Light"}}>
									P2,981 per night * Free Cancellation
								</Text>
								<Stars
									txtVote
									votes={5}
									size={10}
									color={Color.colorPrimary} />
							</View>
						</View>

						<View style={styles.imageHotelLeft}>
							<Image source={Res.get("home_image_3")} style={{height: 100, width: null, borderRadius: 3}} resizeMode="cover" />
							<View style={{backgroundColor: "white", marginTop: 3}}>
								<Text style={{fontSize: 9, color: Color.Standard2, fontFamily: "Roboto-Light"}}>
									PRIVATE ROOM * CASABLANCA
								</Text>
								<Text numberOfLines={3}
									style={{fontSize: 12, fontWeight: "bold", color: Color.Standard2, fontFamily: "Roboto-Light"}}>
									Explore Old Barcelona from a Loft-Style Student
									Hello world
								</Text>
								<Text style={{fontSize: 9, color: Color.Standard2, fontFamily: "Roboto-Light"}}>
									P2,981 per night * Free Cancellation
								</Text>
								<Stars
									txtVote
									votes={5}
									size={10}
									color={Color.colorPrimary} />
							</View>
						</View>
					</View>
				</View>
				<TouchableOpacity style={styles.btnViewAll}>
					<Text style={styles.txtViewAll}>Show all (2000+)</Text>
				</TouchableOpacity>
			</View>
       
		);
	}
}

const styles = StyleSheet.create({
	container: { marginHorizontal: 20, flex: 1 },
	txtReviewTitle: {
		marginVertical: 10, fontSize: 20,
		fontWeight: "bold", fontFamily: "Roboto-Light", color: "black",
	},
	imageHotelRight: {
		flex: 1, minHeight: 200,
		width: "50%", marginRight: 3,
	  },
	imageHotelLeft: {
		flex: 1, minHeight: 200,
		width: "50%", marginLeft: 3,
	  },
	txtHotelTitle: {
		position: "absolute", bottom: 0,
		left: 5, color: "white",
		fontSize: 20, fontFamily: "Roboto-Light",
	},
	viewRow: {flexDirection: "row", marginVertical: 3, width: "100%"},
	viewColumn: {flexDirection: "column", alignItems: "center", flex: 1},
	btnViewAll: {
		marginVertical: 15, paddingHorizontal: 20, flex: 1,
		height: 40, alignItems: "center", justifyContent: "center",
		backgroundColor: Color.colorPrimary, borderRadius: 3,
	},
	txtViewAll: {
		fontSize: 14, fontFamily: "Roboto-Light",
		paddingHorizontal: 5, color: "white"},
});
