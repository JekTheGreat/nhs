/* eslint-disable */
import React, { PureComponent } from "react";
import {
	View, Text, ScrollView, Dimensions,
	StyleSheet, Image, FlatList, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon, ListItem } from "react-native-elements";
import _ from "lodash";
import Header from "./Header";
import BodyCustomer from "./customer/BodyCustomer";
import BodySeller from "./seller/BodySeller";
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;


var { width } = Dimensions.get('window');

class Profile extends PureComponent {

	_changeUserSide = () => {
		const { actions, onlinestore: { setUserSide } } = this.props;
		actions.setUserSide(!setUserSide);
	}

	render() {
		const { navigation, onlinestore: { setUserSide } } = this.props;
		const userSide = setUserSide ? "Customer" : "Seller";
		const userRole = setUserSide ? "Seller" : "Customer";
		const Body = setUserSide ? <BodySeller {...this.props} /> : <BodyCustomer {...this.props} />
		return (
			<ScrollView style={{ backgroundColor: Color.bg }}>
				<Header userSide={userRole} {...this.props} />

				<Text style={{ paddingLeft: 15, marginTop: 15, fontFamily: "Roboto", fontSize: 18, fontWeight: "bold" }}> Switch Account </Text>
				<TouchableOpacity onPress={() => this._changeUserSide()} style={{ justifyContent: "space-between", alignItems: "center", paddingLeft: 15, paddingVertical: 13, marginTop: 15, backgroundColor: "white", flexDirection: "row" }}>
					<View style={{ flexDirection: "row" }}>
						<Image style={{ width: 20, height: 20, }} source={Res.get("profile_user")} />
						<Text style={{ marginLeft: 15, color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light" }}>{userSide}</Text>
					</View>
					<Icon name='chevron-right' type='evilicon' color={Color.Standard2} size={25} containerStyle={{ marginRight: 15 }} />
				</TouchableOpacity>
				{Body}
				<View style={{ height: 100 }} />
			</ScrollView>

		);
	}
}

Profile.propTypes = {
	onlinestore: PropTypes.object,
	navigation: PropTypes.object,
	setTabPage: PropTypes.number,
};

const styles = StyleSheet.create({
	container: { height: 150, width: width, flexShrink: 1, backgroundColor: Color.Header },
	body: { flexShrink: 1, width: "100%", flexDirection: "row", alignItems: "center", paddingVertical: 20 },
	view1: { flexDirection: "column", justifyContent: "flex-start", width: "60%" },
	view2: { position: "absolute", right: 10, bottom: 15 },
	view3: { width: "40%", alignItems: "center", justifyContent: "center" },
	qrImg: { width: 18, height: 18, alignSelf: "center" },
	qrTxt: { fontFamily: "Roboto-Light", fontSize: 9, color: Color.Standard, textAlign: "center" },
	imagebackground: { width: "100%", height: "100%", position: "absolute", },
	status: { flexDirection: "row", marginTop: 5 },
	statusTxt1: { fontFamily: "Roboto-Light", fontSize: 10, color: Color.white, marginRight: 2 },
	statusTxt2: { fontFamily: "Roboto-Light", fontSize: 10, marginLeft: 5 },
	idTxt: { fontFamily: "Roboto", fontSize: 20, color: Color.colorPrimary, fontWeight: "bold" },
	name: { fontFamily: "Roboto", fontSize: 14, color: Color.white },
	type: { fontFamily: "Roboto-Light", fontSize: 12, color: Color.colorPrimary },
	viewId: { flexDirection: "row", justifyContent: "space-between", paddingRight: 50 },
	underline: { backgroundColor: Color.white, height: 1, width: 50, alignSelf: "flex-start", marginVertical: 5 },
});

export default Profile;