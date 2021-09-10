/* eslint-disable max-len */
import React, {PureComponent} from "react";
import {View, Text, FlatList, Image, Alert} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import {ListItem} from "react-native-elements";
import _ from "lodash";
import moment from "moment";
const {Res, Color} = Resource;

export default class Security extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showPass: true,
			error: {},
		};
	}

	componentDidMount(){
		const {actions, login} = this.props;

		actions.getDevices(login.session.userId);
	}

	avatar = (data) => {
		const len = data.loginHistories.length - 1;

		if (data.loginHistories[len].platform === "desktop"){
			if (data.os === "macOS"){
				return Res.get("mac_dektop");
			}
			
			return Res.get("windows_dektop");
		}
		if (data.os === "Android"){
			return Res.get("android_mobile");
		}
		
		return Res.get("apple_mobile");
	}

	_displayTime = (date) =>  {
		date = parseInt(date, 10);

		const diff = moment().diff(moment(date), "days");

		if (diff === 0){
			if (new Date().getDate() === new Date(moment(date)).getDate()){
				return `- ${moment(date).fromNow()}`;
			}
			
			return `- Yesterday at ${moment(date).format("h:mm A")}`;
			
		} else if (diff >= 364){
			const currDate = moment(date);

			return `- ${currDate.format("MMMM D YYYY")} at ${currDate.format("h:mm A")}`;
		}
		
		return `- ${moment(date).format("MMMM D")} at ${moment(date).format("h:mm A")}`;
	}

	_remove = async (data) => {
		const { actions } = this.props;

		await actions.getIdToRemove(data.id);
		this.componentDidMount();
	}

	onAlert = (item) => {
		const len = item.loginHistories.length - 1;

		Alert.alert(
			"Not You?",
			`OS: ${item.os}\nPlatform: ${item.loginHistories[len].platform}\nLocation: ${item.loginHistories[len].location} `,
			[
				{text: "CANCEL", onPress: () => console.log("Cancel Pressed")},
				{text: "REMOVE", onPress: () => this._remove(item)},
			],
			{ cancelable: false }
		);
	}

	renderRow = ({item, index}) => {
		const len = item.loginHistories.length - 1;
		const model = _.isEmpty(item.model) ? item.browser  : item.model;
		const title = `${item.os} - ${item.loginHistories[len].location}`;
		const active = _.isEmpty(item.loginHistories[len].logoutTime) ?
			(<Text style={styles.subtitleStyle2}>{model} -{ }
				<Text style={{color: Color.colorPrimary}}> Active now</Text></Text>)	:
			(<Text style={styles.subtitleStyle2}>
				{model}{ this._displayTime(item.loginHistories[len].logoutTime)}</Text>);
		const rightIcon = {color: Color.Standard2, type: "material-community", name: "dots-vertical"};

		return (
			<ListItem
				onPress={() => this.onAlert(item)}
				titleStyle={styles.titleStyle2}
				containerStyle={styles.liStyle}
				rightIcon={rightIcon}
				key={`idx ${index}`}
				title={title}
				subtitleStyle={styles.subtitleStyle}
				subtitle={active}
				leftAvatar={<Image style={styles.imgDesk} source={this.avatar(item)} resizeMode="contain" />} />
		);
	}

	render() {
  	const { account } = this.props;
		const { isLoadDevice, authorizedDevice } = account;
  	
		return (
  		<View style={styles.flex1marT30padH30}>
				<View style={styles.flex1}>
					<Text style={styles.title}>Authorized Login</Text>
  				<Text style={styles.subtitle}>
					If you notice any unfamiliar devices or location, click the three dot on right side corner and choose "Log out" to end th session
					</Text>
					<FlatList
						style={styles.ListContainerStyle}
						onRefresh={() => this.componentDidMount()}
						data={authorizedDevice}
						renderItem={this.renderRow}
						showsVerticalScrollIndicator={false}
						refreshing={isLoadDevice}
						ListEmptyComponent={<Text style={styles.txtNodata}>No list of authorize device yet</Text>}
						keyExtractor={(item) => `idx ${item.id}`} />
  			</View>
  		</View>
  	);
	}
}
Security.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
	account: PropTypes.object,
	login: PropTypes.object,
};
