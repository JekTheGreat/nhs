/* eslint-disable */
import React, {PureComponent} from "react";
import {View, FlatList} from "react-native";
import Hotels from "__src/resources/data/hotels.json";
import HotelDetails from "./HotelDetails";
import ImagePages from "./ImagePages";
import styles from "./styles.css";
import { TouchableOpacity } from "react-native-gesture-handler";

const data = Hotels.data.hotels.rows;

export default class HomePage extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			search: "",
            favouriteListings: [],
		};
		this.handleAddToFav = this.handleAddToFav.bind(this);
    }

	handleAddToFav(listing) {
		let { favouriteListings } = this.state;
	
		const index = favouriteListings.indexOf(listing.id);
		if (index > -1) {
			favouriteListings = favouriteListings.filter(item => item !== listing.id);
			this.setState({ favouriteListings });
		} else {
		//   navigate('CreateList', { listing, onCreateListClose: this.onCreateListClose });
		}
	}

	// renderListings() {
	// 	return (
	// 		<Listings
	// 			listings={data}
	// 			showAddToFav={true}
	// 			handleAddToFav={this.handleAddToFav}
	// 			favouriteListings={this.state.favouriteListings} />
	// 	);
	// }

	_keyExtractor = (item, index) => item.id;


	renderListings = ({item, index}) => {
		console.log(item);
		const {
			showAddToFav, handleAddToFav, favouriteListings,
			navigation} = this.props;

			return (
				<View key={`idx${index}`}>
					<TouchableOpacity onPress={() => navigation.navigate("Selected")} style={styles.card}>
						<ImagePages listing={item} {...this.props}
							showAddToFav={true}
							handleAddToFav={this.handleAddToFav}
							favouriteListings={this.state.favouriteListings} />
						<HotelDetails listing={item}/>
					</TouchableOpacity>
				</View>
			);
	}

	render(){
		const {
			listings, showAddToFav, handleAddToFav, favouriteListings,
		} = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.body}>
				{/* {this.renderListings()} */}
					<FlatList 
						style={styles.scrollView}
						showsVerticalScrollIndicator={false}
						data={data} 
						renderItem={this.renderListings} 
						keyExtractor={(item, index) => `idx${index}`} />
				</View>
			</View>
		);
	}
}
