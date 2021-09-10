import React from "react";
import {View, Text, Image, StyleSheet} from "react-native";
import {Avatar} from "react-native-elements";
import Stars from "__src/components/Stars";
import PropTypes from "prop-types";
import Resource from "__src/resources";
const {Color} = Resource;
const avatar = "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg";

class Rating extends React.PureComponent{
  render(){
    const {homes} = this.props;
		const source = {uri: avatar};

    return(
      <View style={styles.container}>
				<View style={styles.view1}>
					<Avatar
						rounded
						overlayContainerStyle={styles.overlayContainerStyle}
						size="medium"
						source={source}/>
					<View style={styles.view2}>
						<Text style={styles.txtName}>{homes.homeType.name}</Text>
						{/* <Stars votes={item.star} size={15} color={Color.colorPrimaryLight2} /> */}
					</View>
					<Text style={styles.txtDate}>27 Nov. 2019</Text>
				</View>
			</View>
    )
  }
}

const styles = StyleSheet.create({
	container: {minHeight: 50, marginTop: 15},
	view1: {flexDirection: "row", justifyContent: "space-between"},
	view2: {flex: 1, marginLeft: 10, flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start"},
	overlayContainerStyle: {backgroundColor: "blue", borderWidth: 2, borderColor: Color.colorPrimaryLight2},
	txtName: {fontFamily: "Roboto", fontSize: 14, color: Color.text2, marginVertical: 3},
	txtDate: {fontFamily: "Roboto-Light", fontSize: 12, color: Color.text2},
	txtComment: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2, marginTop: 10},
});

export default Rating;