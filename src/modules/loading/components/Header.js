import React, {useState} from "react";
import {View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Platform} from "react-native";
import Phonebook from "__src/resources/svg/buyload/Phonebook";
import PropTypes from "prop-types";
import {Icon} from "react-native-elements";
import Resource from "__src/resources";
const {Color, Res} = Resource;

const Header = (props) => {
	const {loading: {setInputMerge}, onChangeText, onPressCountry, onContactShow, onSearch} = props;
	const [edit, setEdit] = useState(false);
  
	return (
    <>
      <View style={[styles.container]}>
      	<TouchableOpacity activeOpacity={0.9}
      		onPress={edit ? onPressCountry : null}
      		style={[styles.view2, edit && styles.shadowStyle]}>
      		<Image style={styles.imageCurrency} source={Res.get(setInputMerge.code)}/>
      		<Text style={styles.txtNumber}>+ {setInputMerge.prefix}</Text>
      		<Icon name="chevron-down" type="feather" color={Color.LightBlue5} size={20}/>
      	</TouchableOpacity>
      	<View style={[styles.view3, edit && styles.shadowStyle]}>
      		<TextInput style={styles.input6} placeholder="Enter here..."
      			value={setInputMerge.mobile}
      			editable={edit}
      			keyboardType="number-pad" returnKeyType="done"
      			onChangeText={onChangeText}
      			onBlur={onSearch}
      			onSubmitEditing={onSearch} />
      		{setInputMerge.code === "PHP" && <Text style={styles.txtTelco}>{setInputMerge.mobileNetworkId}</Text>}
      		<View style={styles.separator}/>
      		<TouchableOpacity activeOpacity={0.8} style={styles.padL10}
      			onPress={edit ? onContactShow : null}>
      			<Phonebook size={18}/>
      			{/* {edit ? <Icon name="search" type="evilicon" size={20} color={Color.Header}/> :
      				<Phonebook size={18}/>} */}
      		</TouchableOpacity>
      	</View>
      	<TouchableOpacity activeOpacity={0.8} onPress={() => setEdit(!edit)}>
      	  <Text style={styles.txtEdit}>Edit</Text>
      	</TouchableOpacity>
      </View>
      <Text style={styles.txtNote}>SELECT AN OPTION FROM BELOW</Text>
    </>
	);
};

Header.propTypes = {
	loading: PropTypes.object,
	onChangeText: PropTypes.func,
	onPressCountry: PropTypes.func,
	onContactShow: PropTypes.func,
	onSearch: PropTypes.func,
	disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
	container: {flexDirection: "row", margin: 20, alignItems: "center", justifyContent: "space-between"},
	imageCurrency: {width: 26, height: 26},
	txtNumber: {flexShrink: 1, fontFamily: "Roboto", fontSize: 16, color: Color.Header, marginLeft: 7},
	input6: {flex: 1, borderRadius: 30, fontFamily: "Roboto", fontSize: 16,
		paddingVertical: 0, backgroundColor: Color.transparent},
	view2: {flexDirection: "row", flexShrink: 1, height: 37, minWidth: 30, alignItems: "center", backgroundColor: "white",
		justifyContent: "center", borderWidth: 0.5, borderColor: Color.text1, borderRadius: 25, paddingHorizontal: 8},
	view3: {flexDirection: "row", flex: 1, height: 37, alignItems: "center", justifyContent: "center", marginLeft: 8,
		borderWidth: 0.5, borderColor: Color.text1, borderRadius: 25, backgroundColor: "white", paddingHorizontal: 12},
	txtTelco: {fontFamily: "Roboto", fontSize: 13, marginHorizontal: 5, color: Color.text2},
	separator: {height: 37, width: 1, backgroundColor: Color.text1},
	padL10: {paddingLeft: 10},
	txtEdit: {fontFamily: "Roboto", fontSize: 14, marginLeft: 7, color: Color.colorPrimary},
	txtNote: {fontFamily: "Roboto", fontSize: 13, color: Color.Header, textAlign: "center", marginBottom: 10},
	shadowRemove: {backgroundColor: "white", borderColor: Color.border1},
	shadowStyle: {
		...Platform.select({
			ios: {shadowOffset: {width: 0, height: 5}, shadowColor: Color.text1,
				shadowOpacity: 0.5, shadowRadius: 5, zIndex: 4},
			android: {elevation: 5},
		}),
	},
});

export default Header;
