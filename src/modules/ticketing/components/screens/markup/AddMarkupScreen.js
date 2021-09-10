import React from "react";
import {View, Modal, Text, StyleSheet} from "react-native";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import _ from "lodash";
import PropTypes from "prop-types";
import RNPickerSelect from "__src/components/rnpicker/index";
import Resource from "__src/resources";
const {Color} = Resource;

class AddMarkupScreen extends React.PureComponent{
	render(){
		const {visible, onClose, error, setInput, onChangeText,
			ticketing: {isAddMarkup}, wallet: {addedWallet}, onSubmit, submitFailed} = this.props;
		const transform = _.chain(addedWallet).transform((result, value) => {
			result.push({label: value.code, value: value.code});
		}, []).value();
			
		return (
			<Modal animated="slide" transparent visible={visible} onRequestClose={onClose}>
				<View style={styles.container}>
					<View style={styles.view1}>
						<Text style={styles.txtHeader}>ADD MARKUP</Text>
						<Text style={styles.error}>{submitFailed}</Text>
						<View style={styles.marT15}>
							<Text style={styles.label}><Text style={{color: Color.red}}>* </Text>
							 Currency</Text>
							<RNPickerSelect
								onValueChange={onChangeText("currency")}
								placeholder={{}}
								value={setInput.currency}
								useNativeAndroidPickerStyle={false}
								items={transform} >
								<TxtInput
									round
									isText
									style={styles.marT7}
									style3={styles.style3}
									value={setInput.currency}
									placeholder="Currency"
									returnKeyType="next"
									compName="ArrowDown"
									err={ error.currency}/>
							</RNPickerSelect>
							
						</View>

						<View style={styles.marT15}>
							<Text style={styles.label}><Text style={{color: Color.red}}>* </Text>
							 Domestic Markup</Text>
							<TxtInput
								round
								style={styles.marT7}
								value={setInput.domestic}
								style3={styles.style3}
								onChangeText={onChangeText("domestic")}
								keyboardType="numeric"
								placeholder="Domestic Markup"
								returnKeyType="next"
								err={ error.domestic}/>
						</View>

						<View style={styles.marT15}>
							<Text style={styles.label}><Text style={{color: Color.red}}>* </Text>
							 International Markup</Text>
							<TxtInput
								round
								style={styles.marT7}
								value={setInput.international}
								style3={styles.style3}
								keyboardType="numeric"
								onChangeText={onChangeText("international")}
								placeholder="International Markup"
								returnKeyType="next"
								err={ error.international}/>
						</View>

						<Button
							label="Submit"
							style={styles.submit}
							loading={isAddMarkup}
							onPress={onSubmit}/>

						<Button
							label="Cancel"
							style={styles.cancel}
							labelStyle={{color: Color.colorPrimaryDark}}
							onPress={onClose}/>
					</View>
				</View>
			</Modal>
		);
	}
}

AddMarkupScreen.propTypes = {
	onClose: PropTypes.func,
	visible: PropTypes.bool,
	error: PropTypes.object,
	ticketing: PropTypes.object,
	wallet: PropTypes.object,
	setInput: PropTypes.object,
	onChangeText: PropTypes.func,
	onSubmit: PropTypes.func,
	submitFailed: PropTypes.string,
};

const styles = StyleSheet.create({
	container: {flex: 1, backgroundColor: "rgba(0,0,0,0.5)"},
	view1: {position: "absolute", bottom: 0, width: "100%", backgroundColor: "white",
		padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30},
	txtHeader: {textAlign: "center", fontFamily: "Montserrat-Medium", fontWeight: "bold", fontSize: 25, color: Color.Header},
	marT15: {marginTop: 15},
	label: {fontFamily: "Roboto", fontSize: 16, color: Color.text2},
	marT7: {marginTop: 7},
	style3: {height: 35, borderRadius: 6},
	submit: {borderBottomWidth: 0, marginTop: 20, height: 37},
	cancel: {borderBottomWidth: 0, marginTop: 5, marginBottom: 5, height: 37, backgroundColor: "white"},
	error: {fontFamily: "Roboto", fontSize: 16, color: Color.red},
});

export default AddMarkupScreen;
