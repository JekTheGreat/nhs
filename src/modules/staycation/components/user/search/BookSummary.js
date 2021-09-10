import React, { useRef, useState } from "react";
import {View, SafeAreaView, Text, StyleSheet, Image} from "react-native";
import Resource from "__src/resources";
import HeaderImage, { HEADER_IMAGE_HEIGHT } from "./profile/HeaderImage";
import Detail from "__src/components/Detail";
import Button from "__src/components/Button";
import Confirmation from "./Confirmation";

import Animated from "react-native-reanimated";
import { useValues, onScroll} from "__redash";

const {Color, Res} = Resource;


const BookSummary = (props) => {
	const {navigation} = props;
	const scrollView = useRef(null);
	const [y] = useValues([0], [])
	const [open, setOpen] = useState(false)

	// return <Confirmation />
  
	return (
		<SafeAreaView style={[styles.container, styles.padH20]}>
			<HeaderImage {...{ y }} />
			<Animated.ScrollView
				ref={scrollView}
				showsVerticalScrollIndicator={false}
				style={StyleSheet.absoluteFill}
				onScroll={onScroll({ y })}
				scrollEventThrottle={1}
			>
				<View style={styles.view1}>
					<View style={{height: HEADER_IMAGE_HEIGHT + 20}}/>
					<Text style={styles.txtEntire}>Entire Place</Text>
					<Text style={styles.txtCondo}>A Beautiful Luxury Villa in Quezon City</Text>
					<View style={styles.view3}>
						<Image style={styles.imageLocation} source={Res.get("ic_location")} resizeMode="contain"/>
						<Text style={styles.txtAddress}>Quezon City, Metro Manila</Text>
					</View>
					<View style={styles.viewDivider}/>
					<Detail Wrapper2={styles.marT0} label="Jose Mario Dimaculangan"
						labelStyle2={styles.txtGuest}
						value="Adult"
						valueStyle2={styles.txtGuest} />
            
					<Detail Wrapper2={styles.marT10} label="Isabella Dimaculangan"
						labelStyle2={styles.txtGuest}
						value="Adult"
						valueStyle2={styles.txtGuest} />

					<Detail Wrapper2={styles.marT10} label="Juan Carlo Dimaculangan"
						labelStyle2={styles.txtGuest}
						value="Adult"
						valueStyle2={styles.txtGuest} />

					<Detail Wrapper2={styles.marT10} label="Isabella Dimaculangan"
						labelStyle2={styles.txtGuest}
						value="Adult"
						valueStyle2={styles.txtGuest} />

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
					<Detail Wrapper2={styles.marT0} label="Adult"
						labelStyle2={styles.txtGuest}
						value="x3"
						valueStyle2={styles.txtGuest} />

					<Detail Wrapper2={styles.marT10} label="Children (Age 2 to 12)"
						labelStyle2={styles.txtGuest}
						value="x3"
						valueStyle2={styles.txtGuest} />

					<Detail Wrapper2={styles.marT10} label="Infant (Under 2)"
						labelStyle2={styles.txtGuest}
						value="x3"
						valueStyle2={styles.txtGuest} />

					<View style={styles.viewDivider}/>

					<Detail Wrapper2={styles.marT0} label="1075 x 4 night/s"
						labelStyle2={styles.txtGuest}
						value="x3"
						valueStyle2={styles.txtGuest} />

					<View style={styles.viewDivider}/>

					<Detail Wrapper2={styles.marT0} label="Service Fee"
						labelStyle2={styles.txtGuest}
						value="x3"
						valueStyle2={styles.txtGuest} />

					<View style={styles.viewDivider}/>

					<Detail Wrapper2={styles.marT0} label="Tax"
						labelStyle2={styles.txtGuest}
						value="x3"
						valueStyle2={styles.txtGuest} />

					<View style={styles.viewDivider}/>

					<Detail Wrapper2={styles.marT0} label="Total"
						labelStyle2={styles.txtAmount}
						value="P4,600.00"
						valueStyle2={styles.txtAmount} />

					<Button label="Done"
						style={styles.btnContinue} onPress={() => setOpen(true)}/>
					<Button label="Cancel" labelStyle={{color: Color.colorPrimaryLight2}}
						style={styles.btnCancel} onPress={() => navigation.goBack()}/>
				</View>
			</Animated.ScrollView>
			<Confirmation visible={open} onClose={() => setOpen(false)}
				onSubmit={() => navigation.navigate("BookSuccess")} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {flex: 1,  backgroundColor: "white"},
	padH20: {paddingHorizontal: 20},
	btnContinue: {borderBottomWidth: 0, marginTop: 25,
		backgroundColor: Color.colorPrimaryLight2, height: 38},
	btnCancel: {borderBottomWidth: 2, borderBottomColor: Color.colorPrimaryLight2, marginTop: 7,
		backgroundColor: Color.transparent,
		borderWidth: 2, borderColor: Color.colorPrimaryLight2, height: 38, marginBottom: 25},
	view1: {flex: 1, paddingHorizontal: 20},
	view2: {flexDirection: "row", justifyContent: "space-between"},
	view3: {flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: 7},
	viewLeft: {flex: 1, alignItems: "flex-start"},
	viewRight: {flex: 1, alignItems: "flex-end"},
	txtDate: {fontFamily: "Roboto-Light", fontSize: 16, color: Color.text2},
	txtDate2: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.colorPrimaryLight2, marginTop: 5},
	txtGuest: { fontFamily: "Roboto-Light", color: Color.text2, fontSize: 16},
	txtEntire: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 14, color: Color.colorPrimaryLight2},
	txtCondo: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 25, color: Color.text2, marginTop: 7},
	txtAddress: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2, marginLeft: 5},
	viewDivider: {height: 0.8, backgroundColor: Color.text3, marginVertical: 25},
	txtAmount: { fontFamily: "Roboto", fontWeight: "bold", color: Color.colorPrimaryLight2, fontSize: 17},
	marT0: {marginTop: 0},
	marT10: {marginTop: 15},
	imageLocation: {width: 18, height: 18},
});

export default BookSummary;
