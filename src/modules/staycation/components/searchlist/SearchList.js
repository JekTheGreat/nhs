import Resource from "__src/resources";

import React, { Component } from "react";
import { PropTypes } from "prop-types";
// import  Comp  from "__src/components.stars";

import {
	View, ScrollView,
} from "react-native";

import styles from "./styles.css";
// import HotelDetails from "./HotelDetails";
// import ImagePages from "./ImagePages";

const {Color} = Resource;


export default class Listings extends Component {
	constructor(props) {
		super(props);
		this.renderListings = this.renderListings.bind(this);
	}


	renderListings() {
		const {
			listings, showAddToFav, handleAddToFav, favouriteListings,
		} = this.props;

		return listings.map((listing, index) => {
			return (
				<View
					key={`listing-${index}`}>
					<View style={styles.card}>
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
						{/* <ImagePages listing={listing} {...this.props} />
						<HotelDetails listing={listing}/> */}
					</View>
					
				</View>
			);
		});
	}

	_keyExtractor = (item) => item.id;

	render() {
		return (
			<View style={styles.wrapper}>
				<ScrollView
					style={styles.scrollView}
					showsVerticalScrollIndicator={false} >
					
					{this.renderListings()}
				</ScrollView>
			</View>
		);
	}
}

Listings.propTypes = {
	name: PropTypes.string,
	boldTitle: PropTypes.bool,
	listings: PropTypes.array,
	showAddToFav: PropTypes.bool,
	handleAddToFav: PropTypes.func,
	favouriteListings: PropTypes.array,
};

