/* eslint-disable no-const-assign */
// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, ScrollView, TouchableOpacity, Image} from "react-native";
import styles from "../../styles.css";
import TxtInput from "__src/components/TxtInput";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import moment from "moment";
const {Res} = Resource;

export default class ProfileDetail extends PureComponent{

	address = (type) => {
		const { login: {  additionalDetails }  } = this.props;

		if (type === "address") {
			const { address, barangay, city, country,
				province } = additionalDetails.individual;
				
			let content = address;
	
			if (barangay) {
				if (content) {
					content = content.concat(", ", barangay);
				} else {
					content = barangay;
				}
			}
	
			if (city) {
				if (content) {
					content = content.concat(", ", city);
				} else {
					content = city;
				}
			}

			if (province) {
				if (content) {
					content = content.concat(", ", province);
				} else {
					content = province;
				}
			}
	
			if (country) {
				if (content) {
					content = content.concat(", ", country);
				} else {
					content = country;
				}
			}
			
			return content;
		}
	}
	
	render(){
		const { login: {  additionalDetails }, onEditChange  } = this.props;
		const { firstName, lastName} = additionalDetails.individual;
		const { username, email} = additionalDetails.metadata;
		const { birthDate} = additionalDetails.individual;
		const birth = birthDate ? moment(birthDate).format("YYYY-MM-DD") : "";
		
		return (
			<ScrollView showsVerticalScrollIndicator={false} style={styles.flex1bg}>
				<View style={styles.view1}>
					<TouchableOpacity onPress={() => onEditChange()}
						activeOpacity={0.7} style={styles.btnUpdate}>
						<Image style={styles.imgUpdate} source={Res.get("button_update")} resizeMode="contain" />
					</TouchableOpacity>
					<Text style={styles.txt2}>PERSONAL DETAILS</Text>
					<TxtInput
						label='Full Name'
						value={firstName.concat(" ", lastName)}
						isText
						style={styles.marginTop10}
						style3={styles.borderWidth0}/>

					<TxtInput
						label='Birthday'
						value={birth}
						isText
						style={styles.marginTop10}
						style3={styles.borderWidth0}/>
				</View>

				<View style={styles.view1}>
					<Text style={styles.txt2}>ACCOUNT DETAILS</Text>
					<TxtInput
						label='Username'
						value={username}
						isText
						style={styles.marginTop10}
						style3={styles.borderWidth0}/>

					<TxtInput
						label='Email'
						value={email}
						isText
						style={styles.marginTop10}
						style3={styles.borderWidth0}/>
				</View>
				
				<View style={styles.view1}>
					<Text style={styles.txt2}>ADDRESS</Text>
					<TxtInput
						label='Permanent Address'
						value={this.address("address")}
						isText
						style={styles.marginTop10}
						style3={styles.borderWidth0}/>

				</View>
			</ScrollView>
		);
	}
}

ProfileDetail.propTypes = {
	login: PropTypes.object,
	onEditChange: PropTypes.func,
};
