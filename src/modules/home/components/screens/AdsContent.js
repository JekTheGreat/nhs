import React from "react";
import {View, ImageBackground, Image} from "react-native";
import styles from "../../styles.css";
import Resource from "__src/resources";
const {Res} = Resource;

const AdsContent = () => {
	return (
		<View style={styles.viewAdsWrapper}>
			<ImageBackground source={Res.get("slider_1")} resizeMode="stretch" blurRadius={70} style={[styles.cover, styles.imgbg]}>
				<Image source={Res.get("slider_1")} style={styles.cover} resizeMode="stretch"/>
			</ImageBackground>
		</View>
	);
};

export default AdsContent;
