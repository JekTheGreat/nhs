import React from "react";
import {View, SafeAreaView, ScrollView, Text, StyleSheet, ImageBackground} from "react-native";
import Guest from "./Guest";
import Resource from "__src/resources";
import ExtraDescription from "../profile/ExtraDescription";
import Button from "__src/components/Button";
import profile from "../../../../profile.json";
import { staycation } from "../../../../index";
const {Color, Res} = Resource;
const homes = profile.homes;

class GuestDetail extends React.PureComponent{
	renderGuest = () => {
		const {staycation: {setUserInput}} = this.props;
		const result = [];
		const adult = setUserInput.adult;
		const children = setUserInput.children;
		const infant = setUserInput.infant;

		for (let x = 0; x < adult; x++){
  		result.push(<Guest key={`${x}`} index={x} setGuest={{}} error={{}} labelName="Adult" />);
		}
		
		for (let x = 0; x < children; x++){
			result.push(<Guest key={`${adult + x}`} index={x} setGuest={{}} error={{}} labelName="Children" />);
		}

		for (let x = 0; x < infant; x++){
			result.push(<Guest key={`${adult + children + x}`} index={x} setGuest={{}} error={{}} labelName="Infant" />);
		}

		return result;
	}

	render(){
		return (
			<SafeAreaView style={[styles.container, styles.padH20]}>
				<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
					<Text style={styles.txtHeader}>Guest Details</Text>
					<ImageBackground style={{flex: 1, width: "100%", height: 200}} resizeMode="stretch" source={Res.get("guest_ads")}>
            
					</ImageBackground>

					<Text style={{fontFamily: "Roboto-Light", fontSize: 16, color: Color.text2, marginTop: 15}}>4 night/s in Quezon City, Metro Manila</Text>

					{this.renderGuest()}

					<ExtraDescription title={"House Description"} description={homes.homeType.description} />
					<Button label="Continue"
						style={styles.btnContinue} onPress={{}}/>
					<Button label="Cancel" labelStyle={{color: Color.colorPrimaryLight2}}
						style={styles.btnCancel} onPress={{}}/>
					<View style={{}}/>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {flex: 1,  backgroundColor: "white"},
	padH20: {paddingHorizontal: 20},
	txtHeader: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 20, color: Color.text2, marginVertical: 20},
	btnContinue: {borderBottomWidth: 0, marginTop: 20,
		backgroundColor: Color.colorPrimaryLight2, height: 38},
	btnCancel: {borderBottomWidth: 2, borderBottomColor: Color.colorPrimaryLight2, marginTop: 7,
		backgroundColor: Color.transparent,
		borderWidth: 2, borderColor: Color.colorPrimaryLight2, height: 38, marginBottom: 25},

	buttonOuter: {
		flexDirection: "row",
		flexWrap: "wrap",
		borderRadius: 12,
		shadowOffset: {width: 1, height: 1},
		shadowColor: "#489dcf",
		shadowOpacity: 1.0,
		shadowRadius: 1,
		marginTop: 12,
		marginBottom: 12,
	},
	buttonInner: {
		backgroundColor: "#55b9f3",
		borderRadius: 12,
		shadowOffset: {width: -1, height: -1},
		shadowColor: "#62d5ff",
		shadowOpacity: 1,
		shadowRadius: 1,
	},
});

export default GuestDetail;
