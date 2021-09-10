import React, {PureComponent} from "react";
import {View, Image, Text} from "react-native";
import ProfileDetail from "./ProfileDetail";
import ProfileDetailEditable from "./ProfileDetailEditable";
import styles from "../../styles.css";
import ProfileImage from "./ProfileImage";
import PropTypes from "prop-types";
import Button from "__src/components/Button";
import Resource from "__src/resources";
import _ from "lodash";
const {Res} = Resource;

export default class ProfileScreen extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			isEdit: false,
			showSuccess: false,
		};
	}

	componentDidMount(){
		const {actions} = this.props;
		
		actions.resetChangeProfileInputs();
	}

	componentDidUpdate(prevProps) {
		const { profile: { successSavingProfileChanges }, actions, login: {session} } = this.props;

		if (!_.isEqual(prevProps.profile.successSavingProfileChanges,
			successSavingProfileChanges) && successSavingProfileChanges) {
			actions.getAdditionalDetails(session);

			this.setState({ showSuccess: true, isEdit: false });
		}
	}

	Ok = () => {
		const {actions} = this.props;

		this.setState({isEdit: false, showSuccess: false});
		actions.resetChangeProfileInputs();
	}

	renderDone =() => (
  	<View style={[styles.flex1mar30pad30, styles.marginTop60]}>
  		<View style={styles.flex1}>
  			<Text style={styles.success1}>Profile Updates!</Text>
  			<Text style={styles.success2}>Success!</Text>
  			<Image style={styles.imgsuccess} source={Res.get("check_icon")} resizeMode={"contain"} />
  		</View>
			<View style={styles.marb30}>
				<Button
					onPress={this.Ok}
					style={styles.btnStyle3}
					labelStyle={styles.btnLabelStyle}
					label="Ok"/>
			</View>
  	</View>
	);
  
  onEditChange = () => {
  	this.setState({isEdit: !this.state.isEdit});
  }

  renderProfileEditable = () => {
  	return <ProfileDetailEditable {...this.props} onEditChange={this.onEditChange} />;
  }

  renderProfile = () => {
  	return <ProfileDetail {...this.props} onEditChange={this.onEditChange}/>;
  }
	
	renderChild = () => {
  	const {isEdit, showSuccess} = this.state;

		if (showSuccess){
			return this.renderDone();
		}

		return isEdit ? this.renderProfileEditable() : this.renderProfile();
	}
	
	render(){
  	const {isEdit} = this.state;
  	const zindex = {zIndex: 999};
		
  	return (
  		<View style={styles.flex1}>
				<View style={ zindex }>
					<ProfileImage {...this.props} isEdit={isEdit}  />
				</View>
  				{this.renderChild()}
  		</View>
  	);
	}
}

ProfileScreen.propTypes = {
	profile: PropTypes.object,
	actions: PropTypes.object,
	login: PropTypes.object,
};
