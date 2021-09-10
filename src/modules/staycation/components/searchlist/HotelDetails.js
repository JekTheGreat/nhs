import React, {Component} from "react";
import {View, Text} from "react-native";
import  Stars  from "__src/components/Stars";
import PropTypes from "prop-types";

import styles from "./styles.css";
import Resource from "__src/resources";
const {Color} = Resource;

export default class HotelDetails extends Component{
	render(){
		const {listing} = this.props;
		const stars = parseInt(listing.categoryCode, 10);

		return (
			<View>
				<Text style={[{ color: listing.color }, styles.listingType]}>
					{listing.rooms[0].name} · {listing.rooms[0].rates[0].boardName}
				</Text>
				<Text style={styles.title}
					numberOfLines={2}>
					{listing.name}
				</Text>
				<Text style={styles.address}
					numberOfLines={2}>
					{listing.address}
				</Text>
				<Text style={styles.listingPrice}>
					{`PHP ${listing.rooms[0].rates[0].sellingAmount} `}
				</Text>
				{stars > 0 ?
					(
						<Stars
							txtVote
							votes={stars}
							size={10}
							color={Color.colorPrimary} />
					) :
					null}
			</View>
		);
	}
}

HotelDetails.propTypes = {
	listing: PropTypes.object,
};
