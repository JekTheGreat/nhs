/* eslint-disable no-inline-comments */
import React from "react";
import {View, StyleSheet, Modal, Text, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import TxtInput from "__src/components/TxtInput";
import _ from "lodash";
const {Color} = Resources;

class TransPass extends React.PureComponent{
	render(){
		const {onRequestClose, visible, value, error, title, subtitle,
			onChangeText, onCancel, onProceed, animate, isLoad, placeholder,
			maxLength } = this.props;
    
		return (
			<Modal animationType={animate} transparent visible={visible}
				onRequestClose={onRequestClose}>
				<View style={styles.container}>
					<View style={styles.modalSubContainer1}>
						<Text style={styles.title}>{title || "Transaction Pin"}</Text>
						<Text style={styles.label}>
							{subtitle || "Please enter your transaction pin below"}</Text>
						<TxtInput
							value={value}
							placeholder={placeholder || "Enter your pin"}
							err={error}
							secureTextEntry
							onChangeText={onChangeText}
							maxLength={maxLength}
							keyboardType={"number-pad"}
							compName={isLoad}/>
						<View style={styles.view2}>
							<TouchableOpacity activeOpacity={0.6}
								onPress={isLoad ? null : onCancel}>
								<Text style={styles.cancel}>CANCEL</Text>
							</TouchableOpacity>

							<TouchableOpacity activeOpacity={ _.isEmpty(value) ? 0.3 : 0.6}
								onPress={isLoad ? null : onProceed} disabled = {!!_.isEmpty(value)}>
								<Text style={ _.isEmpty(value) ? styles.proceedEmpty :
									styles.proceed}>PAY NOW</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}

TransPass.propTypes = {
	onRequestClose: PropTypes.func,
	onChangeText: PropTypes.func,
	visible: PropTypes.bool,
	isLoad: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.string,
	animate: PropTypes.string,
	onCancel: PropTypes.func,
	onProceed: PropTypes.func,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	placeholder: PropTypes.string,
	maxLength: PropTypes.number,
};

const styles = StyleSheet.create({
	container: {flexShrink: 1, justifyContent: "center", width: "100%", height: "100%",
		paddingHorizontal: 25, paddingVertical: "10%", backgroundColor: "rgba(0, 0, 0, 0.5)"},
	modalSubContainer1: {flexShrink: 1, backgroundColor: "#fff", borderRadius: 3, padding: 20},
	title: {fontSize: 23, fontFamily: "Roboto-Light", color: Color.colorPrimary},
	label: {fontSize: 13, fontFamily: "Roboto-Light", color: Color.Standard2, marginTop: 5},
	view2: {flexDirection: "row", alignSelf: "flex-end", marginTop: 20},
	cancel: {fontFamily: "Roboto-Light", fontSize: 16, color: Color.Standard2, padding: 5},
	proceed: {fontFamily: "Roboto-Light", fontSize: 16, color: Color.colorPrimary, padding: 5},
	proceedEmpty: {fontFamily: "Roboto-Light", fontSize: 16, color: Color.colorPrimary, padding: 5, opacity: 0.3},
});

export default TransPass;
