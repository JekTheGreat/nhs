
/* eslint-disable */
import React from "react";
import { View } from "react-native";
import Summary from "./Summary";
import PrimaryID from "./PrimaryID";
import SecondaryID from "./SecondaryID";
import PropTypes from "prop-types";
import styles from "../../../styles.css";

class RemitScreen extends React.PureComponent {
	_renderContent = () => {
		const { remittance: { setPayoutChildScreen } } = this.props;

		switch (setPayoutChildScreen) {
		case "summary":
			return <Summary {...this.props}/>;
		case "payoutid":
			return <PrimaryID {...this.props}/>;
		case "secondaryid":
			return <SecondaryID {...this.props}/>;
		}
	}
	
	render() {
		return (
			<View style={styles.flex1}>
					{this._renderContent()}
			</View>
		);
	}
}

RemitScreen.propTypes = {
	actions: PropTypes.object,
	login: PropTypes.object,
	remittance: PropTypes.object,
	navigation: PropTypes.object,
};

export default RemitScreen;
