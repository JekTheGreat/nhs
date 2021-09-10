import React, {PureComponent} from "react";
import {Text, View, FlatList,  TouchableOpacity, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import Resource from "__src/resources";
import moment from "moment";
const {Color} = Resource;

export default class HistoryScreen extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showFilter: false,
			transaction: "",
			currency: "",
			date: "",
		};
	}
	componentDidMount() {
		const { actions, login: { additionalDetails: { client } } } = this.props;

		actions.getClaimHistory(client.id);
	}

	onClick =(item) => {
		const {navigation} = this.props;

		navigation.navigate("ALDetails", {title: "Add Legacy Account", item});
	}

	status = (item) => {
		if (_.isEqual(item.status, "WAITINGFORAPPROVAL")) {
			return (<Text style={[styles.txtStatus, {color: Color.colorPrimaryDark}]}>
				{item.status}</Text>);
		} else if (_.isEqual(item.status, "COMPLETED")) {
			return <Text style={[styles.txtStatus, {color: Color.green}]}>{item.status}</Text>;
		}
		
		return <Text style={[styles.txtStatus]}>{item.status}</Text>;
	}

	renderItem = ({item, index}) => {
		const color = index % 2 ? {backgroundColor: Color.LightBlue2} : null;
		const date = moment(new Date(item.createdAt));

		return (
			<TouchableOpacity onPress={() => this.onClick(item)} activeOpacity={0.5}
				key={`idx ${index}`} style={[styles.container, color]}>
  			<View style={styles.view1}>
  				<Text numberOfLines={1} style={styles.txtRemark}>Regcode: {item.accountId}</Text>
  				<Text numberOfLines={1} style={styles.txtRemark}>
					Account name: {item.client.firstName} {item.client.lastName}</Text>
  				{this.status(item)}
  			</View>
  			<View style={styles.view2}>
  				<Text style={styles.txtTrack}>Date Processed</Text>
  				<Text style={styles.txtTime}>{date.format("h:mm A")}</Text>
  				<Text style={styles.txtTime}>{date.format("MM/DD/YYYY")}</Text>
  			</View>
  		</TouchableOpacity>
		);
	}

	render() {
		const {addlegacy: {getClaimHistory, gettingClaimHistory}} = this.props;

		return (
  		<View style={styles.flex1}>
				<View style={styles.top}>
					<View style={styles.topView1}>
						<Text style={styles.topTxt1}>Recent Activity</Text>
					</View>
					
				</View>
			
  			<View style={styles.flex1}>
					<FlatList
						data={getClaimHistory}
						renderItem={this.renderItem}
						showsVerticalScrollIndicator={false}
						onRefresh={() => this.componentDidMount()}
						refreshing={gettingClaimHistory}
						ListEmptyComponent={<Text style={[styles.txt4, styles.marT10]}>
						No data</Text>}
						keyExtractor={(item, index) => `idx ${index}`} />
  			</View>
  		</View>
  	);
	}
}

HistoryScreen.propTypes = {
	actions: PropTypes.object,
	addlegacy: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flexShrink: 1, padding: 15, flexDirection: "row",
		justifyContent: "center", alignItems: "center", backgroundColor: Color.white},
	view1: {flexDirection: "column", flex: 1},
	view2: {flexDirection: "column", flexShrink: 1, marginLeft: 10},
	top: {paddingTop: 30, paddingBottom: 10, paddingHorizontal: 15 },
	topView1: {flexShrink: 1, justifyContent: "space-between", flexDirection: "row"},
	topTxt1: {fontSize: 16, fontFamily: "Roboto", color: Color.Standard2},
	flex1: {flex: 1, backgroundColor: Color.bg},
	txtRemark: {flex: 1, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light"},
	txtStatus: {fontSize: 9, color: Color.red, fontFamily: "Roboto-Light"},
	txtTrack: {fontSize: 10, color: Color.LightBlue, textAlign: "right", fontFamily: "Roboto-Light"},
	txtTime: {fontSize: 10, color: Color.Standard2, textAlign: "right", fontFamily: "Roboto-Light"},
});

