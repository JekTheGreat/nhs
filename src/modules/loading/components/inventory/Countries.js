import React from "react";
import {View, Text, TouchableWithoutFeedback, StyleSheet,
	Modal, FlatList, Platform, TextInput, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import {ListItem, Icon} from "react-native-elements";
import Resource from "__src/resources";
import worldCountries from "world-countries";
const newCountries = _.orderBy(worldCountries, ["name.common"], ["asc"]);
const {Color, Res} = Resource;

class Countries extends React.PureComponent{
	state = {
		isSearch: false,
		search: "", countries: newCountries,
	}

  onItemClick = (item) => {
  	const {onItemClick, onClose} = this.props;

  	onItemClick(item);
  	onClose();
  }

  renderItem = ({ item }) => {
  	return (
  		<ListItem
  			containerStyle={styles.padH20}
  			leftAvatar={{
  				source: Res.get(_.toString(item.currency)),
  				size: 25,
  			}}
  			onPress={() => this.onItemClick(item)}
  			title={item.name.common}
  			chevron
  			titleStyle={styles.titleStyle}
  		/>
  	);
  }
	
	onChangeText = (e) => {
		if (_.isEmpty(e)){
			this.setState({countries: newCountries, search: e});
		} else {
			const countries = _.filter(newCountries, (item) => {
				return _.includes(item.name.common.toLowerCase(), e.toLowerCase());
			});
			this.setState({countries, search: e});
		}
	}

	render(){
  	const {visible, onClose} = this.props;
  	const { isSearch, search, countries } = this.state;

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
  						{isSearch ? <TextInput ref={(e) => this.search = e} style={styles.search} placeholder="Search here..."
  							value={search} onChangeText={this.onChangeText}/> :
  							<Text style={styles.txtHeader}>Select Country</Text>}
  						
							<TouchableOpacity activeOpacity={0.8} style={styles.wid25}
								onPress={() => this.setState({isSearch: !isSearch}, () => {
									if (this.state.isSearch){
										this.search.focus();
									}
								})}>
  							<Icon name="search" type="evilicon" size={21} color={Color.Header}/>
  						</TouchableOpacity>
  					</View>

  					<FlatList
  						data={countries}
  						keyExtractor={(item, idx) => `${idx}`}
  						extraData={this.props}
  						renderItem={this.renderItem}/>
  				</View>
  			</View>
  		</Modal>
  	);
	}
}

Countries.propTypes = {
	visible: PropTypes.bool,
	onClose: PropTypes.func,
	onItemClick: PropTypes.func,
};

Countries.defaultProps = {
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
	txtHeader: {flex: 1, fontFamily: "Montserrat-Medium", fontSize: 20, textAlign: "center"},
	search: {flex: 1, fontFamily: "Montserrat-Medium", fontSize: 16, textAlign: "center"},
	wid25: {width: "22%", alignItems: "flex-end"},
	titleStyle: {fontFamily: "Roboto", fontSize: 15, color: Color.Header},
	shadowStyle: {
		...Platform.select({
			ios: {shadowOffset: {width: 0, height: 5}, shadowColor: Color.text1,
				shadowOpacity: 1, shadowRadius: 5, zIndex: 4},
			android: {elevation: 5},
		}),
	},
	padH20: {paddingHorizontal: 20},
});

export default Countries;
