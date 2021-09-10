/* eslint-disable max-len */
import React from "react";
import {View, StyleSheet, Modal, Dimensions, Text,
	TextInput, Linking, Image} from "react-native";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import _ from "lodash";
import {Icon} from "react-native-elements";
import Resource from "__src/resources";
const {Color, Res} = Resource;
const SCREEN_WIDTH = Dimensions.get("window").width;

class SuccessScreen extends React.PureComponent{
	state = {
		onShow: true,
	}

	openReciept = () => {
		const {BookSuccess} = this.props;
		const url = `http://10.10.1.119:8008/transactions/generate-pdf/${BookSuccess.bookingReferenceNumber}`;

		Linking.openURL(url).catch((err) => console.log("An error occurred", err));
	}

	onBookAgain = () => {
		const {actions, onClose} = this.props;

		onClose();
		actions.setScreen("");
		actions.resetTicketing();
	}

	renderSuccess(){
		const {BookSuccess} = this.props;
		const source = BookSuccess.statusCode === 201 ? "ic_warning" : "check_icon";

		return (
			<View style={styles.view1}>
				<Image style={styles.imageStyle} source={Res.get(source)} resizeMode={"contain"} />
				<Text style={styles.txt1}>{BookSuccess.message}</Text>
				<Text style={styles.txtSubtitle}>{BookSuccess.subMessage}</Text>
				<Text style={styles.txt2}>Booking Reference Number:</Text>
				<Text style={styles.txtRefence}>{BookSuccess.bookingReferenceNumber}</Text>
				{BookSuccess.statusCode === 201 ?
					<Button style={styles.btnSubmit} onPress={this.onBookAgain} label="Book Again"/> :
				<>
				<Button style={styles.btnSubmit} onPress={this.openReciept} label="Print Receipt"/>
				<Button style={styles.btnCancel} onPress={this.onBookAgain}
					label="Book Again" labelStyle={{color: Color.colorPrimaryDark}}/>
				</>
				}
			</View>
		);
	}

	renderPassword = () => {
		const {onClose, loading, onPressSubmit,
			transpass, onChangeText, err} = this.props;
		const {onShow} = this.state;
		const iconname = onShow ? "ios-eye" : "ios-eye-off";
		const errStyle = err ? {borderColor: Color.red} : null;

		return (
			<View style={styles.view1}>
				<Text style={styles.title}>CONFIRM PASSWORD</Text>
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
				<Text style={styles.errorStyle}>{err}</Text>
				<Text style={styles.txtTerms}>By clicking submit, you agree to our
					<Text style={{color: Color.LightBlue5}}> Terms and Conditions
					</Text></Text>
				<Button style={styles.btnSubmit} onPress={onPressSubmit}
					loading={loading} label="Submit"/>
				<Button style={styles.btnCancel} label="Cancel" onPress={onClose}
					labelStyle={{color: Color.colorPrimaryDark}}/>
			</View>
		);
	}

	render(){
		const {onClose, visible, BookSuccess} = this.props;
    
		return (
			<Modal
  			transparent
  			animationType={"slide"}
  			visible={visible}
  			onRequestClose={onClose}>
  			<View style={styles.container}>
					{_.isEmpty(BookSuccess) ? this.renderPassword() : this.renderSuccess()}
  			</View>
  		</Modal>
		);
	}
}

SuccessScreen.propTypes = {
	visible: PropTypes.bool,
	isSuccess: PropTypes.bool,
	loading: PropTypes.bool,
	onClose: PropTypes.func,
	transpass: PropTypes.string,
	actions: PropTypes.object,
	BookSuccess: PropTypes.object,
	err: PropTypes.string,
	onPressSubmit: PropTypes.func,
	onChangeText: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {flex: 1, height: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.2)" },
	view1: {width: SCREEN_WIDTH - 25, minHeight: 200, backgroundColor: "white", padding: 15,
		borderRadius: 15},
	title: {fontFamily: "Montserrat-Medium", fontWeight: "bold", fontSize: 25, color: Color.LightBlue5, textAlign: "center"},
	txtSubtitle: {fontFamily: "Roboto", fontSize: 15, color: Color.black3, textAlign: "center", marginTop: 10},
	viewPass: {flexDirection: "row", height: 40, borderWidth: 0.7, borderColor: Color.text1,
		borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center", paddingHorizontal: 15},
	inputPass: {flex: 1, fontFamily: "Roboto", fontSize: 15, color: Color.Header, paddingVertical: 0},
	txtTerms: {fontFamily: "Roboto", fontSize: 12, color: Color.text2, marginTop: 15},
	btnSubmit: {marginTop: 25, borderBottomWidth: 0},
	btnCancel: {marginTop: 5, borderBottomWidth: 0, backgroundColor: "transparent"},
	txt1: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 15, color: Color.text6, textAlign: "center", marginTop: 6},
	txt2: {fontFamily: "Roboto", fontSize: 13, color: Color.Header, textAlign: "center", marginTop: 16},
	txtRefence: {fontFamily: "Montserrat-Medium", fontSize: 25, color: Color.LightBlue5, textAlign: "center", marginTop: 6},
	errorStyle: {fontFamily: "Roboto", fontSize: 13, color: Color.red, marginTop: 5},

	imageStyle: {width: 80, height: 80, alignSelf: "center"},
});

export default SuccessScreen;
