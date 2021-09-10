/* eslint-disable max-len */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-inline-comments */
/* eslint-disable react/prop-types */
import React, {PureComponent} from "react";
import {View, Image, Text, StyleSheet} from "react-native";
import styles from "../../styles.css";
import Resource from "__src/resources";
import _ from "lodash";
import moment from "moment";

const {Res, Color} = Resource;

export default class TransactionDetail extends PureComponent{
	render() {
		const {params} = this.props.navigation.state;
		const transNo = _.has(params.item, "transactionNumber") ? params.item.transactionNumber : "";
		const date = moment(new Date(params.item.createdAt));
		let  loadAmount = 0;
		if (_.has(params.item.meta, "amountWMarkupToDisplay")) {
			loadAmount = _.isEmpty(params.item.meta.amountWMarkupToDisplay) ||
				params.item.meta.amountWMarkupToDisplay.includes("N/A") ||
				params.item.meta.amountWMarkupToDisplay.includes("NaN")  ?
				params.item.meta.convertedAmount :
				params.item.meta.amountWMarkupToDisplay;
		} else {
			loadAmount = params.item.meta.loadAmount;
		}
		
		return (
			<View style={styles.flex1marT30padH20}>
				<View style={styles.flex1allCenter}>
					<Image style={styles.imgsuccess} source={Res.get("circle_wallet")} resizeMode={"contain"} />
					{/* <Text style={styles.txtsuccess}>Transaction Details</Text> */}
  		  </View>
					
				<View style={styles.flex1marT15}>
					<View style={[styles1.flex1]}>
						<View style={[styles1.Wrapper1]}>
							<Text style={[styles1.labelStyle]}>
								{"Transaction no:"}
							</Text>
							<Text selectable style={[styles1.valueStyle]}>
								{`${transNo}`}</Text>
						</View>
					</View>
					<View style={[styles1.flex1]}>
						<View style={[styles1.Wrapper1]}>
							<Text style={[styles1.labelStyle]}>
								{"Date and time:"}
							</Text>
							<Text selectable style={[styles1.valueStyle]}>
								{`${date.format("MMM DD, YYYY h:mm A")}`}</Text>
						</View>
					</View>
					<View style={[styles1.flex1]}>
						<View style={[styles1.Wrapper1]}>
							<Text style={[styles1.labelStyle]}>
								{"Plancode:"}
							</Text>
							<Text selectable style={[styles1.valueStyle]}>
								{`${params.item.meta.plancode}`}</Text>
						</View>
					</View>
					<View style={[styles1.flex1]}>
						<View style={[styles1.Wrapper1]}>
							<Text style={[styles1.labelStyle]}>
								{"Amount:"}
							</Text>
							<Text selectable style={[styles1.valueStyle]}>
								{`${loadAmount}`}</Text>
						</View>
					</View>
					{
						params.item.meta.mobile.slice(0, 2) === "63" ? null :
							<View style={[styles1.flex1]}>
								<View style={[styles1.Wrapper1]}>
									<Text style={[styles1.labelStyle]}>
										{"Converted Amount:"}
									</Text>
									<Text selectable style={[styles1.valueStyle]}>
										{`${params.item.meta.convertedAmount}`}</Text>
								</View>
							</View>
					}
					<View style={[styles1.flex1]}>
						<View style={[styles1.Wrapper1]}>
							<Text style={[styles1.labelStyle]}>
								{"Debit:"}
							</Text>
							<Text selectable style={[styles1.valueStyle]}>
								{`${params.item.amount} ${params.item.currency}`}</Text>
						</View>
					</View>
					<View style={[styles1.flex1]}>
						<View style={[styles1.Wrapper1]}>
							<Text style={[styles1.labelStyle]}>
								{"User Income:"}
							</Text>
							<Text selectable style={[styles1.valueStyle]}>
								{`${params.item.detailed_transactions[0].amount} ${params.item.currency}`}</Text>
						</View>
					</View>
					<View style={[styles1.flex1]}>
						<View style={[styles1.Wrapper1]}>
							<Text style={[styles1.labelStyle]}>
								{"Before Balance:"}
							</Text>
							<Text selectable style={[styles1.valueStyle]}>
								{`${params.item.descriptions[0].meta.beforeBalance} ${params.item.currency}`}</Text>
						</View>
					</View>
					<View style={[styles1.flex1]}>
						<View style={[styles1.Wrapper1]}>
							<Text style={[styles1.labelStyle]}>
								{"After Balance:"}
							</Text>
							<Text selectable style={[styles1.valueStyle]}>
								{`${params.item.descriptions[0].meta.afterBalance} ${params.item.currency}`}</Text>
						</View>
					</View>
					{/* <Detail horizontal labelStyle2={styles.labelStyle2} label={"Amount:"}
								 value={"PHP 1000"} valueStyle2={styles.labelStyle2}  /> */}
				</View>

				{/* <TouchableOpacity style={styles.dlWrapper}>
					<Image style={styles.img35} source={Res.get("qr_download")}/>
					<Text style={styles.txtDownload}>Download a copy of your receipt</Text>
				</TouchableOpacity> */}
			</View>
		);
	}
}

const styles1 = StyleSheet.create({
	flex1: {flexShrink: 1},
	Wrapper1: {width: "100%", flexDirection: "row", marginTop: 10},
	labelStyle: {color: Color.black, fontFamily: "Roboto-Light",
		fontSize: 14, fontWeight: "bold"},
	valueStyle: {flex: 1, color: Color.Standard2,
		fontFamily: "Roboto",  textAlign: "right", fontSize: 14},
});
