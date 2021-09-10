
import React from "react";
import { View, StatusBar, FlatList } from "react-native";
import Color from "__src/resources/styles/color";
import styles from "../../styles.css";
import { ListItem } from "react-native-elements";
import PropTypes from "prop-types";

const list = [
	{
		name: "General Settings",
		subtitle: "Change email, change phone number and change password",
	},
	// {
	// 	name: "Security Settings",
	// 	subtitle: "Other actions to add more security to your account",
	// },
];

class Settings extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			currentPosition: 0,
		};
	}

	click = (type) => {
		const { navigation } = this.props;

		switch (type) {
			case "General Settings":
				navigation.navigate("General", { title: type });
				break;
			// case "Security Settings":
			// 	navigation.navigate("SecuritySetting", {title: type});
			// 	break;
		}
	}

	renderRow = ({ item }) => {
		return (
			<ListItem onPress={() => this.click(item.name)}
				titleStyle={styles.titleStyle}
				containerStyle={styles.liStyle}
				subtitleStyle={styles.subtitleStyle}
				subtitle={item.subtitle}
				rightIcon={{ color: Color.Standard2 }}
				key={`idx ${item.name}`} title={item.name} />
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
						keyExtractor={(item) => item.name}
					/>
				</View>
			</View>
		);
	}
}

Settings.propTypes = {
	actions: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
};

export default Settings;
