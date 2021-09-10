import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
// import { Header, Listing } from "./components";
import ListingItem from "./ListingItem";
import Header from "./Header";

const listings = [
	{
		id: "tiny-home",
		title: "Tiny Home",
		subtitle: "Entire Flat · 1 Bed",
		picture: "https://i.imgur.com/SsJmZ9jl.jpg",
		rating: 4.93,
		ratingCount: 861,
	},
	{
		id: "cook-house",
		title: "Cook House",
		subtitle: "Entire Flat · 1 Bed",
		picture: "https://www.gstatic.com/webp/gallery/4.jpg",
		rating: 4.93,
		ratingCount: 861,
	},
];
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
	},
});

const Explore = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Header />
			<ScrollView>
				{listings.map((listing) => (
					<ListingItem key={listing.id} {...{ listing }} />
				))}
				<View style={{height: 100}}/>
			</ScrollView>
			
		</SafeAreaView>
	);
};

export default Explore;
