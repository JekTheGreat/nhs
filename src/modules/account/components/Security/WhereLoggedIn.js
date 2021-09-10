/* eslint-disable max-len */
import React, {PureComponent} from "react";
import {View, Text, FlatList, Image} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import {ListItem} from "react-native-elements";
import _ from "lodash";
import moment from "moment";
const {Res, Color} = Resource;

export default class WhereLoggedIn extends PureComponent {

	componentWillMount(){
		const { actions, login } = this.props;

		actions.getLoginHistory(login.session.userId, 0);
	}

	componentWillUnmount(){
		const { actions } = this.props;

		actions.resetLoginHistory();
	}

	_back =() => {
		const {navigation} = this.props;

		navigation.goBack();
	}

	avatar = (data) => {

		if (data.platform === "desktop"){
			if (data.device.os === "macOS"){
				return Res.get("mac_dektop");
			}
			
			return Res.get("windows_dektop");
		}
		if (data.device.os === "Android"){
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

	renderRow = ({item, index}) => {
		const model = _.isEmpty(item.model) ? item.device.browser  : item.device.model;
		const title = `${item.device.os} - ${item.location}`;
		const active = _.isEmpty(item.logoutTime) ?
			(<Text style={styles.subtitleStyle2}>{model} -
				<Text style={{color: Color.colorPrimary}}> Active now</Text></Text>)	:
			(<Text style={styles.subtitleStyle2}>
				{model} - { this._displayTime(item.logoutTime)}</Text>);

		return (
			<ListItem
				titleStyle={styles.titleStyle2}
				containerStyle={styles.liStyle}
				key={`idx ${index}`}
				title={title}
				subtitleStyle={styles.subtitleStyle}
				subtitle={active}
				leftAvatar={<Image style={styles.imgDesk} source={this.avatar(item)} resizeMode="contain" />} />
		);
	}

	_seeMore = () => {
		const { login, account: {loginHistories, loginHistoryCount}, actions} = this.props;

		if (loginHistoryCount > loginHistories.length){
			actions.seeMoreLoginHistory(login.session.userId, loginHistories.length);
		};
	}

	render() {
  	const { account } = this.props;
		const { isLoadDevice, loginHistories, loginHistoryCount } = account;
  	
		return (
  		<View style={styles.flex1marT30padH30}>
				<View style={styles.flex1}>
					<Text style={styles.title}>Where you logged in</Text>
					<Text style={styles.subtitle}>Review where you're currently logged in to Unified Products and Services.
					</Text>
					<FlatList
						style={styles.ListContainerStyle}
						data={loginHistories}
						renderItem={this.renderRow}
						refreshing={isLoadDevice}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={<Text style={styles.txtNodata}>No list of login device yet</Text>}
						ListFooterComponent={loginHistories.length <  loginHistoryCount ?
							<Text onPress={this._seeMore} style={styles.txtNodata}>See More</Text> : null}
						keyExtractor={(item) => `idx ${item.id}`} />
  			</View>
  		</View>
  	);
	}
}
WhereLoggedIn.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
	account: PropTypes.object,
	login: PropTypes.object,
};
