/* eslint-disable */
import React, { Component } from "react";
import Color from "__src/resources/styles/color";
import  Comp  from "__src/components";
import { PropTypes } from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import ElevateView from "__src/resources/customize/ElevatedView";
import {
	View, Text, TouchableHighlight,
	TouchableOpacity, ScrollView,
	Image, StyleSheet, Dimensions,
} from "react-native";
import {Card} from "native-base";
const {width, height} = Dimensions.get("window");

export default class Listings extends Component {
	constructor(props) {
		super(props);
	}
	renderLatestProd = () => {
		const { productname,
			listings, showAddToFav, handleAddToFav, favouriteListings,
		} = this.props;
    
		return listings.map((listing, index) => (
			<Card 
				style={styles.card}
				key={`listing-${index}`}>
				<View style={{flex: 1, alignItems: "center"}}>
					{showAddToFav ? (
							<View style={styles.addToFavoriteBtn}>
								<Comp.HeartButton
									size={9}
									color={Color.gray04}
									selectedColor={Color.pink}
									selected={favouriteListings.indexOf(listing.id) > -1}
									onPress={() => handleAddToFav(listing)} />
							</View>
						) :
						null}
					<Image
						style={styles.image}
						resizeMode="contain"
						source={listing.photo} />
					<Text style={styles.title}>
						{productname}
					</Text>
				</View>
				<View style={{flexDirection: "row", justifyContent: "space-between"}}>
					<View style={{flexDirection: "column"}}>
						<Text style={styles.priceBefore}>
								P230,489.00
						</Text>
						<Text style={styles.priceAfter}>
								P130,489.00
						</Text>
					</View>

					<View style={{flexDirection: "column", alignItems: "flex-end"}}>
						<Text style={styles.priceBefore}>
								156 Views
						</Text>
						<Comp.Stars
							votes={5}
							size={6}
							color={Color.colorPrimary} />
					</View>
				</View>
			</Card>
		));
	}

	renderPopular = () => {
		const {listings} = this.props;
    
		return listings.map((listing, index) => (
			<Card key={`listing-${index}`}
				style={styles.card2}>
				<View style={{flex: 1, alignItems: "center"}}>
					<Image
						style={styles.image2}
						resizeMode="contain"
						source={listing.photo} />
				</View>
			</Card>
		));
	}

	renderImage = () => {
		const {listings} = this.props;
    
		return listings.map((listing, index) => (
			<View key={`listing-${index}`}
				style={styles.cardImage} >
				<Image
					style={styles.image3}
					resizeMode="stretch"
					source={listing.photo} />
			</View>
		));
	}

	renderService = () => {
		const {listings} = this.props;
    
		return listings.map((listing, index) => (
			<View key={`listing-${index}`}
				style={styles.cardService} >
				<Image
					style={styles.image4}
					resizeMode="contain"
					source={listing.photo} />
			</View>
		));
	}

	_renderByCategory =() => {
		const {category} = this.props;
		switch(category){
			case "Latest":
				return this.renderLatestProd();
			case "Popular":
				return this.renderPopular();
			case "Image":
				return this.renderImage();
			case "Service":
				return this.renderService();
		}
	}

	render() {
		const { title } = this.props;
    
		return (
			<View style={styles.wrapper}>
				<View style={styles.titleWrapper}>
					<Text style={styles.seeAllBtnText}>
              {title}
					</Text>
				</View>
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.contentContainerStyle}
					horizontal
					showsHorizontalScrollIndicator={false} >
					{this._renderByCategory()}
				</ScrollView>
			</View>
		);
	}
}

Listings.propTypes = {
	title: PropTypes.string,
	productname: PropTypes.string,
	boldTitle: PropTypes.bool,
	listings: PropTypes.array,
	showAddToFav: PropTypes.bool,
	handleAddToFav: PropTypes.func,
	favouriteListings: PropTypes.array,
};

const styles = StyleSheet.create({
	wrapper: {display: "flex"},
	contentContainerStyle: { paddingRight: 30 },
	titleWrapper: {
		display: "flex", flexDirection: "row",
		alignItems: "center", justifyContent: "center",
		paddingHorizontal: 21,
	},
	title: {color: Color.gray04, textAlign: "center", fontFamily: "Roboto", fontSize: 8},
	seeAllBtnText: {
		textAlign: "center", fontWeight: "bold",
		color: Color.Standard2, marginRight: 5,
	},
	scrollView: {
		marginTop: 5,
		marginBottom: 10,
	},
	cardImage: {
		marginRight: 4, marginLeft: 4, width: (width - 44) / 3, minHeight: 80,
		backgroundColor: "red"
	},
	card: {
		marginRight: 2, marginLeft: 2, width: (width - 36) / 4,
		flexDirection: "column", minHeight: 100, padding: 5,
		backgroundColor: "white", borderRadius: 3,
	},
	card2: {
		marginRight: 2, marginLeft: 2, width: (width - 36) / 4,
		flexDirection: "column", minHeight: 100, padding: 5,
		backgroundColor: "white", borderRadius: 3,
	},
	cardService: {
		marginRight: 2, marginLeft: 2, width: (width - 36) / 4, minHeight: 30,
		backgroundColor: "white", flexDirection: "row", borderRadius: 5, borderWidth: StyleSheet.hairlineWidth,
		justifyContent: "center",alignItems: "center", borderColor: Color.gray04
	},
	image: {width: 65, height: 60},
	image2: {width: 75, height: 110},
	image3: {width: (width - 44) / 3, height: 80},

	image4: {width: (width - 90) / 4, height: 25},
					
	addToFavoriteBtn: { position: "absolute", left: 0,
		top: 0, zIndex: 2},
	priceBefore: {
		fontSize: 5,
		color: Color.gray04, marginTop: 2,
	},
	priceAfter: {
		color: "#0080ff", fontSize: 6,
	},
});

