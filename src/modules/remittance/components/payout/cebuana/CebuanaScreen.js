
/* eslint-disable */
import React from "react";
import { View } from "react-native";
import Summary from "./Summary";
import UploadID from "./PODUploadID";
import PayoutID from "./screen/PayoutID";
import PropTypes from "prop-types";
import styles from "../../../styles.css";

class CebuanaScreen extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			currentPosition: 0,
		};
	}

	_renderContent = () => {
		const { remittance: { setPayoutChildScreen } } = this.props;

		switch (setPayoutChildScreen) {
		case "summary":
			return <Summary {...this.props}/>;
		case "payoutid":
			return <PayoutID {...this.props}/>;
		case "uploadid":
			return <UploadID {...this.props}/>;
		}
	}

	back = () => {
		const {navigation} = this.props;

		navigation.goBack();
	}
	

	render() {
		return (
			<View style={styles.flex1}>
					{this._renderContent()}
			</View>
		);
	}
}

CebuanaScreen.propTypes = {
	actions: PropTypes.object,
	login: PropTypes.object,
	remittance: PropTypes.object,
	navigation: PropTypes.object,
};

export default CebuanaScreen;
