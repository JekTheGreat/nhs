/* eslint-disable max-len */
import React from "react";
import {View, StyleSheet, Modal, Dimensions, 
	Text, TextInput, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import PropTypes from "prop-types";
import Loading from "__src/components/Loading";
import {Icon, CheckBox} from "react-native-elements";
import Resource from "__src/resources";
const {Color} = Resource;
const SCREEN_WIDTH = Dimensions.get("window").width;

class Confirmation extends React.PureComponent{
	state = {
		onShow: true, isAgreed: true,
	}

	renderPassword = () => {
		const {loading, onClose, onSubmit,
			transpass, onChangeText, err} = this.props;
		const {onShow, isAgreed} = this.state;
		const iconname = onShow ? "ios-eye" : "ios-eye-off";
		const errStyle = err ? {borderColor: Color.red} : null;

		return (
			<View style={styles.view1}>
				<View style={styles.padH20}>
					<Text style={styles.title}>Confirmation Password</Text>
					<Text style={styles.txtSubtitle}>Please enter your transaction pin below</Text>
					<View style={[styles.viewPass, errStyle]}>
						<TextInput style={styles.inputPass}
							secureTextEntry={onShow}
							value={transpass}
							onChangeText={onChangeText}
							keyboardType="numeric"
							returnKeyType="done"
							placeholder="xxxxxx"/>
						<Icon onPress={() => this.setState({onShow: !onShow})}
							name={iconname} type="ionicon" size={25} color={Color.black3}/>
					</View>
					{err && <Text style={styles.errorStyle}>{err}</Text>}
					<View style={styles.pad15}>
						<CheckBox
							Component={TouchableWithoutFeedback}
							center onIconPress={() => this.setState({isAgreed: !isAgreed})}
							title={<Text style={styles.txtTerms}>I agree with the
								<Text suppressHighlighting style={{color: Color.LightBlue5}}> Terms and Conditions and Cancellation Policy
								</Text> that i have read.</Text>}
							checkedColor={Color.colorPrimaryLight2}
							containerStyle={styles.containerStyle}
							checked={isAgreed}/>
					</View>
					
				</View>
				<View style={styles.viewAction}>
					<TouchableOpacity activeOpacity={0.8}
						onPress={onClose} style={styles.btnCancel}>
						{loading ? <Loading /> :
							<Text style={styles.textLabel}>Cancel</Text> }
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.8}
						onPress={onSubmit}
					 style={styles.btnConfirm}>
						{loading ? <Loading /> :
							<Text style={styles.textLabel}>Confirm</Text>}
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	render(){
		const {onClose, visible} = this.props;
    
		return (
			<Modal
  			transparent
  			animationType={"slide"}
  			visible={visible}
  			onRequestClose={onClose}>
  			<View style={styles.container}>
					{this.renderPassword()}
  			</View>
  		</Modal>
		);
	}
}

Confirmation.propTypes = {
	visible: PropTypes.bool,
	isSuccess: PropTypes.bool,
	loading: PropTypes.bool,
	onClose: PropTypes.func,
	transpass: PropTypes.string,
	err: PropTypes.string,
	onPressSubmit: PropTypes.func,
	onChangeText: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {flex: 1, height: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.2)" },
	view1: {width: SCREEN_WIDTH - 25, minHeight: 200, backgroundColor: "white",
		borderRadius: 15},
	title: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 20, color: Color.text2, marginTop: 25},
	txtSubtitle: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2, marginTop: 13},
	viewPass: {flexDirection: "row", height: 40, borderWidth: 0.7, borderColor: Color.text1,
		borderRadius: 5, marginTop: 20, alignItems: "center", justifyContent: "center", paddingHorizontal: 15},
	inputPass: {flex: 1, fontFamily: "Roboto", fontSize: 15, color: Color.Header, paddingVertical: 0},
	txtTerms: {fontFamily: "Roboto", fontSize: 12, color: Color.text2, marginLeft: 5, marginTop: 10},
	errorStyle: {fontFamily: "Roboto", fontSize: 13, color: Color.red, marginTop: 5},
	pad15: {padding: 15},
	padH20: {paddingHorizontal: 20},
	containerStyle: {backgroundColor: "transparent", borderWidth: 0, marginTop: 0, margin: 0},
	viewAction: {flexDirection: "row",  height: 50, marginTop: 10, justifyContent: "space-between", borderBottomLeftRadius: 15, borderBottomRightRadius: 15},
	btnCancel: {flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: Color.Header, borderBottomLeftRadius: 15},
	btnConfirm: {flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: Color.colorPrimaryLight2, borderBottomRightRadius: 15},
	textLabel: { fontFamily: "Roboto", fontSize: 17, color: Color.white},
});

export default Confirmation;
