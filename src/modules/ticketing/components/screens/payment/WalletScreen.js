/* eslint-disable import/default */
import React from "react";
import {View, StyleSheet, Image, Text } from "react-native";
import PropTypes from "prop-types";
import RNPickerSelect from "__src/components/rnpicker/index";
import _ from "lodash";
import numeral from "numeral";
import Detail from "__src/components/Detail";
import {Icon} from "react-native-elements";
import Resource from "__src/resources";
const {Color, Res} = Resource;

class WalletScreen extends React.PureComponent{
	getCurrencies = () => {
		const {wallet: {addedWallet}} = this.props;
		const currencies = _.chain(addedWallet).transform((result, value) => {
  		result.push({label: value.code, value: value.code});
		}, []).orderBy(["name.common"], ["asc"]).value();
		
		return currencies;
	}

	getBalance = () => {
		const {currency, wallet: {addedWallet}} = this.props;

		const result = _.filter(addedWallet, {code: currency});

		if (_.isEmpty(result)){
			return 0.00;
		}

		return numeral(result[0].balance).format("0,000.00");
	}

	render(){
  	const {onValueChange, currency, subtotal } = this.props;
		
  	return (
  		<View style={styles.container}>
				<Text style={styles.txtTitle}>Ecash Wallet</Text>
				<Text style={styles.txt1}>Selected Wallet:</Text>
  			<RNPickerSelect
  				onValueChange={onValueChange}
  				useNativeAndroidPickerStyle={false}
  				placeholder={{}}
  				items={this.getCurrencies()} >
  				<View style={[styles.view1, styles.marT10]}>
						<Text style={styles.txtCurrency}>{currency}</Text>
  					<Icon name="chevron-down" type="evilicon" size={25} color={Color.LightBlue5}/>
  					<Image style={styles.imageCurrency} source={Res.get(currency)}/>
  					{/* <Text style={styles.txtLabel}>Select Wallet</Text> */}
  				</View>
  			</RNPickerSelect>
				<Text style={styles.txt2}>Wallet Balance: {this.getBalance()} {currency}</Text>
				<View style={styles.viewDivider} />

				<Detail label="Subtotal:" labelStyle2={{color: Color.Header}} value={`${currency} ${numeral(subtotal).format("0,000.00")}`}
					valueStyle2={{color: Color.Header}}/>
				<Detail label="Processing fee:" labelStyle2={{color: Color.Header}}
					value="PHP 0.00" valueStyle2={{color: Color.Header}}/>
				<Detail label="Total:" labelStyle2={styles.total}
					value={`${currency} ${numeral(subtotal).format("0,000.00")}`} valueStyle2={styles.valueTotal}/>
  		</View>
  	);
	}
}

WalletScreen.propTypes = {
	onValueChange: PropTypes.func,
	wallet: PropTypes.object,
	currency: PropTypes.string,
};

const styles = StyleSheet.create({
	container: {flex: 1, paddingHorizontal: 20},
	view1: {flexDirection: "row", width: 150, height: 40, backgroundColor: Color.white, alignItems: "center", justifyContent: "center", borderRadius: 6, paddingHorizontal: 10},
	txtCurrency: {fontFamily: "Roboto", flex: 1, fontSize: 15, color: Color.black3},
	imageCurrency: {width: 20, height: 20},
	txtLabel: {position: "absolute", top: -8, left: 10, fontFamily: "Roboto-Medium", fontSize: 15, color: Color.Header},
	marT10: {marginTop: 10},
	total: {color: Color.Header, fontWeight: "bold", fontSize: 20},
	valueTotal: {color: Color.Header, fontWeight: "bold", fontSize: 20},
	viewDivider: {height: 0.7, backgroundColor: Color.black3, marginVertical: 20},
	txtTitle: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 17, color: Color.Header, marginTop: 20},
	txt1: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 15, color: Color.Header, marginTop: 20},
	txt2: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.Header, marginTop: 10},
});

export default WalletScreen;
