/* eslint-disable react-native/no-unused-styles */
/* eslint-disable max-len */
import React from "react";
import {View, Text, TouchableWithoutFeedback, StyleSheet,
	Modal, FlatList, Platform} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import {ListItem} from "react-native-elements";
import Resource from "__src/resources";
import worldCountries from "world-countries";
import numeral from "numeral";
const newCountries = _.orderBy(worldCountries, ["name.common"], ["asc"]);
const {Color, Res} = Resource;

class Wallets extends React.PureComponent{
	state = {
		isSearch: false,
		search: "", countries: newCountries,
		switchValue: false,
	}

  onItemClick = (item) => {
  	const {onItemClick, onClose} = this.props;

  	onItemClick(item);
  	onClose();
  }

  renderItem = ({ item }) => {
  	  if (parseFloat(item.balance) > 1) {

  		return (
  			<ListItem
  				containerStyle={styles.padH20}
  				leftAvatar={{
  					source: Res.get(_.toString(item.code)),
  					size: 25,
  				}}
  				onPress={() => this.onItemClick(item)}
  				title={`${item.name} (${numeral(item.balance).format("0,000.00")})`}
  				chevron
  				titleStyle={styles.titleStyle}
  			/>
  		);
  	  }
  		
  	return (
  			<ListItem
  				  containerStyle={styles.padH20}
  				  disabled
  				leftAvatar={{
  					source: Res.get(_.toString(item.code)),
  					size: 25,
  				}}
  				onPress={() => this.onItemClick(item)}
  				title={`${item.name} (${numeral(item.balance).format("0,000.00")})\nInsufficient Balance`}
  				chevron
  				titleStyle={styles.disabled}
  			/>
  		);
	  
  }
	
	onChangeText = (e) => {
		const {switchValue} = this.state;
		if (switchValue) {
			if (_.isEmpty(e)){
				this.setState({countries: newCountries, search: e});
			} else {
				const countries = _.filter(newCountries, (item) => {
					if (!_.isEmpty(item.callingCode)){
						return item.callingCode[0].startsWith(e);
					}
				});
				this.setState({countries, search: e});
			}
		} else if (_.isEmpty(e)) {
			this.setState({countries: newCountries, search: e});
		} else {
			const countries = _.filter(newCountries, (item) => {
				return _.includes(item.name.common.toLowerCase(), e.toLowerCase());
			});
			this.setState({countries, search: e});
		}
	}

	render() {
  	const {visible, onClose, wallets} = this.props;

  	return (
  		<Modal
  			transparent
  			animationType={"slide"}
  			visible={visible}
  			onRequestClose={onClose}>
  			<View style={styles.container}>
  				<TouchableWithoutFeedback onPress={onClose}>
  					<View style={styles.view1} />
  				</TouchableWithoutFeedback>
  				<View style={[styles.view2, styles.shadowStyle]}>
  					<View style={styles.view3}>
  						<TouchableWithoutFeedback onPress={onClose}>
  							<View style={styles.viewCancel}>
  								<Text style={styles.txtCancel}>Cancel</Text>
  							</View>
  						</TouchableWithoutFeedback>
  						<Text style={styles.txtHeader}>Select Wallet Currency</Text>
  					</View>
						{
							_.isEmpty(wallets) ?
								<Text style={[styles.txt4, styles.marT10]}>
								No item available!</Text> :
								<FlatList
									data={wallets}
  								keyExtractor={(item, idx) => `${idx}`}
									extraData={this.props}
  								renderItem={this.renderItem}/>
						}
  				</View>
  			</View>
  		</Modal>
  	);
	}
}

Wallets.propTypes = {
	visible: PropTypes.bool,
	onClose: PropTypes.func,
	onItemClick: PropTypes.func,
	wallets: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Wallets.defaultProps = {
	onItemClick: null,
};

const styles = StyleSheet.create({
	container: {flex: 1, height: "100%", flexDirection: "column", backgroundColor: "transparent" },
	view1: {flex: 1, height: "60%", backgroundColor: "transparent"},
	view2: {height: "40%", backgroundColor: Color.white, borderTopRightRadius: 25, borderTopLeftRadius: 25 },
	view3: {flexDirection: "row", alignItems: "center", justifyContent: "center", height: 50,
		borderBottomWidth: 0.7, borderBottomColor: Color.text1, paddingHorizontal: 20},
	viewCancel: {width: "22%", alignItems: "flex-start"},
	txtCancel: {flexShrink: 1, fontFamily: "Roboto-Medium", fontSize: 15, color: Color.LightBlue5},
	txtHeader: {flex: 1, fontFamily: "Montserrat-Medium", fontSize: 20, textAlign: "center", marginLeft: -20},
	titleStyle: {fontFamily: "Roboto", fontSize: 15, color: Color.Header},
	shadowStyle: {
		...Platform.select({
			ios: {shadowOffset: {width: 0, height: 5}, shadowColor: Color.text1,
				shadowOpacity: 1, shadowRadius: 5, zIndex: 4},
			android: {elevation: 5},
		}),
	},
	padH20: {paddingHorizontal: 20},
	disabled: {color: Color.gray02},
	txt4: {textAlign: "center", fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 14},
	marT10: {marginTop: 10},

});

export default Wallets;
