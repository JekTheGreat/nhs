import Resources from "__src/resources";
// import  Comp  from "__src/components/index";
import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import {
	View, Text, TouchableHighlight,
	TouchableOpacity, ScrollView,
	Image, StyleSheet,
} from "react-native";
const { Color } = Resources;

export default class Listings extends Component {
	constructor(props) {
		super(props);
		this.renderListings = this.renderListings.bind(this);
	}
	renderListings() {
		const {
			listings, showAddToFav, handleAddToFav, favouriteListings,
		} = this.props;

    
		return listings.map((listing, index) => (
			<TouchableHighlight
				style={styles.card}
				key={`listing-${index}`}>
				<View>
					{showAddToFav ?
						(
							<View style={styles.addToFavoriteBtn}>
								{/* <Comp.HeartButton
									color={Color.white}
									selectedColor={Color.pink}
									selected={favouriteListings.indexOf(listing.id) > -1}
									onPress={() => handleAddToFav(listing)} /> */}
							</View>
						) :
						null}
					<Image
						style={styles.image}
						resizeMode="contain"
						source={listing.photo} />
					<Text style={[{ color: listing.color }, styles.listingType]}>
						{listing.type}
					</Text>
					<Text style={styles.listingTitle}
						numberOfLines={2}>
						{listing.title}
					</Text>
					<Text style={styles.listingPrice}>
						{`$${listing.price} ${listing.priceType}`}
					</Text>
					{listing.stars > 0 ?
						(
							<Comp.Stars
								votes={listing.stars}
								size={10}
								color={Color.green02} />
						) :
						null}
				</View>
			</TouchableHighlight>
		));
	}

	render() {
		const { title, boldTitle } = this.props;
		const titleStyle = boldTitle ? { fontSize: 22, fontWeight: "600" } : { fontSize: 18 };

    
		return (
			<View style={styles.wrapper}>
				<View style={styles.titleWrapper}>
					<Text style={[titleStyle, styles.title]}>
						{title}
					</Text>
					<TouchableOpacity style={styles.seeAllBtn}>
						<Text style={styles.seeAllBtnText}>
                        See all
						</Text>
						<Icon
							name="angle-right"
							size={18}
							color={Color.gray04}
						/>
					</TouchableOpacity>
				</View>
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.contentContainerStyle}
					horizontal
					showsHorizontalScrollIndicator={false} >
					{this.renderListings()}
				</ScrollView>
			</View>
		);
	}
}

Listings.propTypes = {
	title: PropTypes.string.isRequired,
	boldTitle: PropTypes.bool,
	listings: PropTypes.array.isRequired,
	showAddToFav: PropTypes.bool,
	handleAddToFav: PropTypes.func,
	favouriteListings: PropTypes.array,
};

const styles = StyleSheet.create({
	wrapper: {display: "flex"},
	contentContainerStyle: { paddingRight: 30 },
	titleWrapper: {
		display: "flex", flexDirection: "row",
		alignItems: "center", justifyContent: "space-between",
		paddingHorizontal: 21,
	},
	title: {color: Color.gray04},
	seeAllBtn: {
		marginTop: 2, flexDirection: "row",
		alignItems: "center", justifyContent: "space-between",
	},
	seeAllBtnText: {
		color: Color.gray04, marginRight: 5,
	},
	scrollView: {
		marginTop: 20, marginLeft: 15,
		marginBottom: 40,
	},
	card: {
		marginRight: 6, marginLeft: 6, width: 157,
		flexDirection: "column", minHeight: 100,
	},
	image: {
		width: undefined, flex: 1,
		height: 100, borderRadius: 8,
		marginBottom: 7,
	},
	listingTitle: {
		fontSize: 14, fontWeight: "700",
		color: Color.gray04, marginTop: 2,
	},
	listingType: {
		fontWeight: "700", fontSize: 10,
	},
	addToFavoriteBtn: {
		position: "absolute", right: 12,
		top: 7, zIndex: 2,
	},
	listingPrice: {
		color: Color.gray04, marginTop: 4,
		marginBottom: 2, fontSize: 12,
		fontWeight: "300",
	},
});

