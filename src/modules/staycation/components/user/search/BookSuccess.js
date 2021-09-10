import React from "react";
import {View, SafeAreaView, ScrollView, Text, StyleSheet, ImageBackground} from "react-native";
import Resource from "__src/resources";
import ExtraDescription from "./profile/ExtraDescription";
import { NavigationActions, StackActions } from 'react-navigation';
import Detail from "__src/components/Detail";
import Button from "__src/components/Button";
const {Color, Res} = Resource;

class BookSuccess extends React.PureComponent{

	onDone = () => {
		const {navigation} = this.props;

		const resetAction = StackActions.reset({
		  index: 0,
		  actions: [NavigationActions.navigate({routeName: "UserScreen"})],
		});

		const popAction = StackActions.pop({
			n: 3,
		});
		
		navigation.dispatch(resetAction);

		// navigation.goBack("UserScreen");
	}

	render(){
		return (
			<SafeAreaView style={[styles.container, styles.padH20]}>
				<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
					<ImageBackground style={styles.imageBackground} resizeMode="stretch" source={Res.get("track_bg")}>
						<View style={styles.viewTracking}>
							<Text style={styles.txtTrackno}>UPS1551061231</Text>
							<Text style={styles.txtTrackLabel}>Tracking Number</Text>
						</View>
					</ImageBackground>

					<ExtraDescription title={"Successfully Booked!"} titleStyle={styles.fontSize25} descStyle={styles.fontSize18}
						description="Thank you for using Unified Staycation the Electric Voucher has been successfully sent to your lead guest email." />

					<View style={styles.viewDivider}/>
        
					<View style={styles.view2}>
						<View style={styles.viewLeft}>
							<Text style={styles.txtDate}>November 15</Text>
							<Text style={styles.txtDate}>2019</Text>
							<Text style={styles.txtDate2}>Check In Date</Text>
						</View>
						<View style={styles.viewRight}>
							<Text style={styles.txtDate}>November 15</Text>
							<Text style={styles.txtDate}>2019</Text>
							<Text style={styles.txtDate2}>Check Out Date</Text>
						</View>
					</View>

					<View style={styles.viewDivider}/>
					<Detail Wrapper2={{marginTop: 0}} label="Adult"
						labelStyle2={styles.txtGuest}
						value="x3"
						valueStyle2={styles.txtGuest} />

					<Detail Wrapper2={{marginTop: 10}} label="Children (Age 2 to 12)"
						labelStyle2={styles.txtGuest}
						value="x3"
						valueStyle2={styles.txtGuest} />

					<Detail Wrapper2={{marginTop: 10}} label="Infant (Under 2)"
						labelStyle2={styles.txtGuest}
						value="x3"
						valueStyle2={styles.txtGuest} />

					<View style={styles.viewDivider}/>

					<Detail Wrapper2={{marginTop: 0}} label="Total Amount"
						labelStyle2={styles.txtGuest}
						value="P4,600.00"
						valueStyle2={styles.txtAmount} />

					<Button label="Done"
						style={styles.btnContinue} onPress={this.onDone}/>
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
	btnContinue: {borderBottomWidth: 0, marginTop: 25,
		backgroundColor: Color.colorPrimaryLight2, height: 38},
	btnCancel: {borderBottomWidth: 2, borderBottomColor: Color.colorPrimaryLight2, marginTop: 7,
		backgroundColor: Color.transparent,
		borderWidth: 2, borderColor: Color.colorPrimaryLight2, height: 38, marginBottom: 25},

	view2: {flexDirection: "row", justifyContent: "space-between"},
	viewLeft: {flex: 1, alignItems: "flex-start"},
	viewRight: {flex: 1, alignItems: "flex-end"},
	txtDate: {fontFamily: "Roboto-Light", fontSize: 16, color: Color.text2},
	txtDate2: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.colorPrimaryLight2, marginTop: 5},
	txtGuest: { fontFamily: "Roboto-Light", color: Color.text2, fontSize: 16},
  
	viewDivider: {height: 0.8, backgroundColor: Color.text3, marginVertical: 25},
	imageBackground: {flex: 1, width: "100%", height: 150, marginTop: 16},
	viewTracking: {flex: 1, alignItems: "center", justifyContent: "center", padding: 20},
	txtTrackno: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 25, color: Color.colorPrimaryLight2},
	txtTrackLabel: {fontFamily: "Roboto-Light", fontSize: 18, color: Color.text2},
  
	fontSize25: {fontSize: 25},
	fontSize18: {fontSize: 18},
	txtAmount: { fontFamily: "Roboto", fontWeight: "bold", color: Color.colorPrimaryLight2, fontSize: 16},
});

export default BookSuccess;
