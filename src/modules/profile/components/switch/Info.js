/* eslint-disable max-len */
/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, Image, ImageBackground,
	 StyleSheet, TouchableOpacity} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import {getStatusBarHeight} from "__src/resources/customize/StatusBarHeight";
import {Icon, Avatar} from "react-native-elements";
import * as globals from "__src/globals";

const {Color, Res} = Resource;

export default class Info extends PureComponent{
 
	transformImage = (photo) => {
		return globals.CloudUpload.imageTransform(
			photo,
			"c_fill,g_face,w_140,h_140");
	}

	render(){
		// const {login: {currentAccount, additionalDetails}, navigation} = this.props;
		// const color = additionalDetails.client.idSelfieStatus === "APPROVED" ? Color.lightgreen : Color.red;
		// const status = additionalDetails.client.idSelfieStatus === "APPROVED" ? "Verified" : "Unverified";
		// const photo = additionalDetails.client.profilePhoto ?
		// 	{uri: this.transformImage(additionalDetails.client.profilePhoto)} : Res.get("user_icon");

  	return (
			<View style={styles.container}>
				{/* <ImageBackground style={{flex: 1, justifyContent: "center", alignItems: "center", paddingTop: getStatusBarHeight(true)}} source={Res.get("bg_header")} resizeMode="stretch">
					<ImageBackground style={styles.padding5} source={Res.get("profile_circle")}>
						<Avatar
							rounded
							width={100}
							height={100}
							source={photo}
						/>
					</ImageBackground>
					<Text adjustsFontSizeToFit style={styles.name}>
						{additionalDetails.firstName.toUpperCase()} {additionalDetails.lastName.toUpperCase()}
					</Text>
					<Text adjustsFontSizeToFit style={styles.type}>{currentAccount.subType.split("_").join(" ")}</Text>
					<TouchableOpacity style={styles.status} onPress={() => navigation.navigate("Verification", {title: "Verification"})}>
						<Text style={styles.statusTxt1}>Status</Text>
						<Icon name='question-circle' type='font-awesome' color={Color.white} size={11} />
						<Text style={[styles.statusTxt2, {color}]}>
							{status}
						</Text>
					</TouchableOpacity>
					<Text adjustsFontSizeToFit style={styles.idTxt}>{currentAccount.id}</Text>
				</ImageBackground> */}
			</View>
  	);
	}
}

Info.propTypes = {
	login: PropTypes.object,
	navigation: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flex: 1},
	status: {flexDirection: "row", marginTop: 5},
	statusTxt1: {fontFamily: "Roboto-Light", fontSize: 10, color: Color.white, marginRight: 2},
	statusTxt2: {fontFamily: "Roboto-Light", fontSize: 10, marginLeft: 5},
	idTxt: {fontFamily: "Roboto", fontSize: 25, color: Color.colorPrimary, fontWeight: "bold", marginTop: 7},
	name: {fontFamily: "Roboto", fontSize: 15, color: Color.white, marginTop: 7},
	type: {fontFamily: "Roboto-Light", fontSize: 10, color: Color.colorPrimary},
	padding5: {padding: 5},
});
