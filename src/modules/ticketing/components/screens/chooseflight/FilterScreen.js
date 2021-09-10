import React from "react";
import {View, Text, TouchableWithoutFeedback, StyleSheet, Modal, FlatList} from "react-native";
import PropTypes from "prop-types";
import {ListItem} from "react-native-elements";
import Resource from "__src/resources";
const {Color} = Resource;
const datas = ["Any", "Lowest Fare", "Earliest Time", "Non Stop/Direct", "With Stop/Connecting"];

class FilterScreen extends React.PureComponent{
  onItemClick = (item) => {
  	const {onItemClick, onClose} = this.props;

  	onItemClick(item);
  	onClose();
  }

  renderItem = ({ item }) => {
  	return (
  		<ListItem
  			onPress={() => this.onItemClick(item)}
  			title={item}
  			chevron
  			titleStyle={styles.titleStyle}
  		/>
  	);
  }
  render(){
  	const {visible, onClose} = this.props;

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
  				<View style={styles.view2}>
  					<View style={styles.view3}>
  						<TouchableWithoutFeedback onPress={onClose}>
  							<View style={styles.viewCancel}>
  								<Text style={styles.txtCancel}>Cancel</Text>
  							</View>
  						</TouchableWithoutFeedback>
  						<Text style={styles.txtHeader}>Choose an Option</Text>
  						<View style={styles.wid25} />
  					</View>

  					<FlatList
  						data={datas}
  						keyExtractor={(item, idx) => `${idx}`}
  						extraData={this.props}
  						renderItem={this.renderItem}/>
  				</View>
  			</View>
  		</Modal>
  	);
  }
}

FilterScreen.propTypes = {
	visible: PropTypes.bool,
	onClose: PropTypes.func,
	onItemClick: PropTypes.func,
};

FilterScreen.defaultProps = {
	onItemClick: null,
};

const styles = StyleSheet.create({
	container: {flex: 1, height: "100%", flexDirection: "column", backgroundColor: "transparent" },
	view1: {flex: 1, height: "60%", backgroundColor: "transparent"},
	view2: {height: "40%", backgroundColor: Color.white, borderTopRightRadius: 15, borderTopLeftRadius: 15 },
	view3: {flexDirection: "row", alignItems: "center", height: 50, borderBottomWidth: 1, borderBottomColor: Color.text1},
	viewCancel: {width: "25%", alignItems: "center"},
	txtCancel: {fontFamily: "Roboto-Medium", fontSize: 15, color: Color.LightBlue5},
	txtHeader: {width: "50%", fontFamily: "Montserrat-Medium", fontSize: 20, textAlign: "center"},
	wid25: {width: "25%"},
	titleStyle: {fontFamily: "Roboto", fontSize: 15, color: Color.Header},
});

export default FilterScreen;
