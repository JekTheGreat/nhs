import React from "react";
import {View, StyleSheet, Modal, Text, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import TxtInput from "__src/components/TxtInput";
const {Color} = Resources;

class TransPass extends React.PureComponent{
	render(){
		const {onRequestClose, visible, value, error, 
			securityEntry, onChangeText, onCancel, onResend,
			onProceed, animate, isLoad, placeholder} = this.props;
    
		return (
			<Modal animationType={animate} transparent visible={visible}
				onRequestClose={onRequestClose}>
				<View style={styles.container}>
					<View style={styles.modalSubContainer1}>
						<Text style={styles.title}>{"One Time Password"}</Text>
						<Text style={[styles.label, styles.marT10]}>Reference Number: 
						<Text style={{fontWeight: "bold"}}> 123123123</Text></Text>
						<Text style={styles.label}>Please enter your one time password below.</Text>
						<Text suppressHighlighting onPress={onResend} 
							style={[styles.resend]}>Resend One Time Password</Text>
						<TxtInput
							style={styles.marT10}
							value={value}
							placeholder={"Enter your code here..."}
							err={error}
							securityEntry={securityEntry}
							onChangeText={onChangeText}
							compName={isLoad}/>
						<View style={styles.view2}>
							<TouchableOpacity activeOpacity={0.6}
								onPress={isLoad ? null : onCancel}>
								<Text style={styles.cancel}>CANCEL</Text>
							</TouchableOpacity>
							<TouchableOpacity activeOpacity={0.6}
								onPress={isLoad ? null : onProceed}>
								<Text style={styles.proceed}>VERIFY</Text>
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
};

const styles = StyleSheet.create({
	container: {flexShrink: 1, justifyContent: "center", width: "100%", height: "100%",
		paddingHorizontal: 25, paddingVertical: "10%", backgroundColor: "rgba(0, 0, 0, 0.5)"},
	modalSubContainer1: {flexShrink: 1, backgroundColor: "#fff", borderRadius: 3, padding: 20},
	title: {fontSize: 23, fontFamily: "Roboto-Light", color: Color.colorPrimary},
	label: {fontSize: 13, fontFamily: "Roboto-Light", color: Color.Standard2, marginTop: 5},
	resend: {fontSize: 14, fontFamily: "Roboto-Light", color: Color.LightBlue5, marginTop: 5},
	view2: {flexDirection: "row", alignSelf: "flex-end", marginTop: 20},
	cancel: {fontFamily: "Roboto-Light", fontSize: 16, color: Color.Standard2, padding: 5},
	proceed: {fontFamily: "Roboto-Light", fontSize: 16, color: Color.colorPrimary, padding: 5},
	marT10: {marginTop: 10}
});

export default TransPass;
