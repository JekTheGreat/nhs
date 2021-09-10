
import React, {PureComponent} from "react";
import {View, Text, TouchableOpacity,
	 Image} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import styles from "../../styles.css";
const {Res} = Resource;

export default class EcashToEcash extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			error: {},
			inputTransferReason: "",
			isConfirm: false,
			selectAccountWallet: {},
		};
	}

	ok = () => {
		const {actions } = this.props;

		actions.closeModal();
	}

	render() {
		return (
			<View style={styles.renderSuccessWrapper}>
				<View style={styles.flex1}>
					<Text style={styles.txt3_1}>Add Account On Progress</Text>
					<Image style={[styles.img1, styles.marT20]} source={Res.get("check_icon")} resizeMode={"contain"} />
					<Text style={[styles.txt4, styles.marT20]}>
              Thank you! Your request is currently in process. Please wait to be verified
					</Text>
				</View>
				<View style={styles.renderSuccessWrapper2}>
					<TouchableOpacity onPress={this.ok}>
						<Text style={styles.txtok}>Ok</Text>
					</TouchableOpacity>
				</View>
  	</View>
  	);
	}
}

EcashToEcash.propTypes = {
	actions: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
	addlegacy: PropTypes.object,
	profile: PropTypes.object,
};
