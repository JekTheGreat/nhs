/* eslint-disable max-len */
import React, {PureComponent} from "react";
import {View, Text, TouchableOpacity, SafeAreaView} from "react-native";
import Detail from "__src/components/Detail";
import styles from "../../styles.css";
import Resource from "__src/resources";
import moment from "moment";
import _ from "lodash";
import PropTypes from "prop-types";
import {Icon} from "react-native-elements";
const {Color} = Resource;

export default class TransactionDetail extends PureComponent{
	ok = () => {
		const {navigation } = this.props;

		navigation.goBack();
	}

	status = () => {
		const {status} = this.props.navigation.state.params.item;
		if (_.isEqual(status, "WAITINGFORAPPROVAL")) {
			return {color: Color.colorPrimary};
		} else if (_.isEqual(status, "COMPLETED")) {
			return {color: Color.green};
		}
		
		return {color: Color.red};
	}

	render() {
		const {status, client, createdAt, remarks,
			accountId} = this.props.navigation.state.params.item;
		const date = moment(new Date(createdAt));
			
		return (
			<View style={styles.flex1marT30padH20}>
				<View style={[styles.flex1allCenter0]}>
					<Text style={[styles.txtsuccess]}>Added Legacy Account</Text>
  		  </View>
					
				<View style={styles.flex1marT15} >
					<Detail horizontal  label={"Status:"} labelStyle2={styles.labelStyle2} value={status} valueStyle2={this.status()} />
					<Detail horizontal  label={"Regcode:"} value={accountId} />
					<Detail horizontal  label={"Account Name:"} value={`${client.firstName} ${client.lastName}`} />
					<Detail horizontal  label={"Date Processed:"} value={moment(date).format("M/DD/YYYY kk:mm A")} />
					<Detail horizontal  label={"Remarks:"} value={remarks} />

					<View style={[styles.inpuView1, {backgroundColor: Color.LightBlue3},
						styles.marT25]}>
						<Icon containerStyle={styles.iconContainerStyle}
							name='info' color={Color.LightBlue4} size={15} />
						<Text style={[styles.txt3, {color: Color.LightBlue4}, styles.flex1]}>
							Note: Please contact CSR for other information{"\n"}
							CSR hotlines are: 02-998-0991, 0919-081-5158, 0917-783-1922, & 0933-995-2860</Text>
					</View>
				</View>

				<View style={styles.renderSuccessWrapper2}>
					<TouchableOpacity onPress={this.ok}>
						<Text style={styles.txtok}>Back</Text>
					</TouchableOpacity>
				</View>
				<SafeAreaView />
			</View>
		);
	}
}

TransactionDetail.propTypes = {
	navigation: PropTypes.object,
};
