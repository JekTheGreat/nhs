
import React from "react";
import {  View, StatusBar, FlatList } from "react-native";
import Resource from "__src/resources";
import styles from "../../styles.css";
import {ListItem} from "react-native-elements";
import PropTypes from "prop-types";
const {Res, Color} = Resource;
const list = [{
	name: "Authorized Login",
	icon: Res.get("ic_authorized"),
}, {
	name: "Alerts",
	icon: Res.get("ic_alert"),
}, {
	name: "Where You Logged In",
	icon: Res.get("ic_login"),
},
];

class Security extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			currentPosition: 0,
		};
	}
	
	click =(type) => {
		const {navigation} = this.props;

		switch (type){
		case "Authorized Login":
			navigation.navigate("Security", {title: type});
			break;
		case "Alerts":
			navigation.navigate("Security", {title: type});
			break;
		case "Where You Logged In":
			navigation.navigate("Security", {title: type});
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
					overlayContainerStyle: {backgroundColor: Color.white}}} />
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

Security.propTypes = {
	actions: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
};

export default Security;
