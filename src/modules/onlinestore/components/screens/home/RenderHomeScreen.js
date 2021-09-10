/* eslint-disable */import React, { PureComponent } from "react";
import { View, StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import Resource from "__src/resources";
import PropTypes from 'prop-types';
import { Spinner } from "native-base";
import _ from "lodash";
import HomeScreen from "./homeScreen/HomeScreen";
import PreviewProducts from "./homeScreen/PreviewProducts";
import SelectedCategory from "./homeScreen/SelectedCategory";
import SearchScreen from './homeScreen/SearchScreen';
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class RenderHomeScreen extends PureComponent {


	renderScreen = () => {
		const { navigation, onlinestore: { setOnlineStoreScreen } } = this.props;
		switch (setOnlineStoreScreen) {

			case "selectedCategory":
				return <SelectedCategory ref={(e) => this.SelectedCategory = e} {...this.props} />
			case "searchScreen":
				return <SearchScreen ref={(e) => this.SearchScreen = e} {...this.props} />
			case "previewproducts":
				return <PreviewProducts ref={(e) => this.PreviewProductsScreen = e} {...this.props} />;
			case "main":
			default:
				return <HomeScreen ref={(e) => this.HomeScreen = e} {...this.props} />
		}
	}

	render() {
		const { onlinestore: { setInputDetails, transactionInProgress } } = this.props;
		return (
			<View style={{ flex: 1, backgroundColor: Color.bg }}>
				{this.renderScreen()}
				{/* <Text>ASDF</Text> */}
				<SafeAreaView />
				{transactionInProgress ?
					<View style={{
						position: "absolute",
						justifyContent: 'center',
						backgroundColor: 'rgba(0,0,0,0.2)', width: width, height: height
					}}>
						<Spinner
							color={"black"}
							size="small"
							animating={transactionInProgress} />
					</View> : null}
			</View>
		);
	}
}

RenderHomeScreen.propTypes = {
	onlinestore: PropTypes.object,
};

