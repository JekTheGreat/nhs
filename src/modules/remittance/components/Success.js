/* eslint-disable no-nested-ternary */
/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, ScrollView, TouchableOpacity,
	 Image, StyleSheet} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";

const {Res, Color} = Resource;

export default class RemittanceSuccess extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			error: {},
			inputTransferReason: "",
			isConfirm: false,
			selectAccountWallet: {},
		};
	}
	
	render() {
		const {onPressOk, onPressDownload} = this.props;

		return (
			<View style={styles.renderSuccessWrapper}>
				{this.props.children}
				<View style={styles.renderSuccessWrapper2}>
					<TouchableOpacity activeOpacity={0.7}
						onPress={onPressDownload} style={styles.bottom}>
						<Image style={styles.imgqrdownload} source={Res.get("qr_download")}/>
						<Text style={styles.txt5}>Download a copy of your receipt</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={onPressOk}>
						<Text style={styles.txtok}>Ok</Text>
					</TouchableOpacity>
				</View>
			</View>
  	);
	}
}

const styles = StyleSheet.create({
	renderSuccessWrapper: {flex: 1, padding: 30, flexDirection: "column", justifyContent: "space-between"},
	renderSuccessWrapper2: {justifyContent: "center", alignItems: "center", marginBottom: 20},
	txtok: {color: Color.colorPrimary, fontSize: 18, alignSelf: "center", paddingHorizontal: 30, paddingVertical: 10},
	bottom: {flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 10},
	imgqrdownload: {width: 30, height: 30},
	txt5: {textAlign: "center", fontSize: 10, fontFamily: "Roboto-Light", color: Color.LightBlue5, marginTop: 7},
	
});

RemittanceSuccess.propTypes = {
	actions: PropTypes.object,
	remittance: PropTypes.object,
	onPressOk: PropTypes.func,
	onPressDownload: PropTypes.func,
	children: PropTypes.element,
};
