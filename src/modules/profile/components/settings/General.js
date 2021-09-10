
import React from "react";
import {  View, StatusBar, FlatList } from "react-native";
import Resource from "__src/resources";
import styles from "../../styles.css";
import {ListItem} from "react-native-elements";
import PropTypes from "prop-types";
const {Res, Color} = Resource;

const list = [{
// 	name: "Change Email Address",
// 	icon: Res.get("ic_email"),
// }, {
// 	name: "Change Mobile Number",
// 	icon: Res.get("ic_mobile"),
// }, {
	name: "Change Password",
	icon: Res.get("ic_key"),
}, {
	name: "Change Transaction Pin",
	icon: Res.get("ic_key"),
},
];

class General extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			currentPosition: 0,
		};
	}
	
	click =(type) => {
		const {navigation} = this.props;

		switch (type){
		// case "Change Email Address":
		// 	navigation.navigate("ChangeEmail", {title: type});
		// 	break;
		// case "Change Mobile Number":
		// 	navigation.navigate("ChangeMobile", {title: type});
		// 	break;
		case "Change Password":
			navigation.navigate("ChangePassword", {title: type});
			break;
		case "Change Transaction Pin":
			navigation.navigate("ChangeTransactionPin", {title: type});
			break;
		}
	}
	
	renderRow = ({item}) => {
		return (
			<ListItem onPress={() => this.click(item.name)}
				titleStyle={styles.titleStyle2}
				containerStyle={styles.liStyle}
				rightIcon={{color: Color.Standard2}}
				key={`idx ${item.name}`} title={item.name}
				leftAvatar={{source: item.icon, size: 30,
					overlayContainerStyle: {backgroundColor: Color.white}}}
				// avatar={item.icon}
				// avatarStyle={styles.avatarStyle}
				// avatarOverlayContainerStyle={{backgroundColor: Color.white}}
			/>
		);
	}
	
	render() {

  	return (
  		<View style={styles.container}>
  			<StatusBar backgroundColor={Color.StatusBar} barStyle="light-content" />
  			<View style={styles.body}>
					<FlatList
						style={styles.containerStyle}
						scrollEnabled={false}
						data={list}
						renderItem={this.renderRow}
						keyExtractor={(item) => item.name} />
  			</View>
  		</View>
  	);
	}
}

General.propTypes = {
	actions: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
};

export default General;
