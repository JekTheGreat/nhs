/* eslint-disable react-native/no-inline-styles */

import React, { PureComponent } from "react";
import { Text, View, Image, Modal } from "react-native";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import styles from "../styles.css";
import Icon from "react-native-vector-icons/FontAwesome";
import _ from "lodash";

export default class Welcome extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            height: 435,
            os: {},
        }
    }

    componentDidMount(){
        const { actions, login } = this.props;
        
    }

    componentDidUpdate(prevProps) {
        const { actions, login } = this.props;
        const { simultaneousLoginMsg, simultaneousLogin, inputLoginDetails, logoutOtherDevices, is2FALogin } = login;

        if(prevProps.login.simultaneousLogin !== simultaneousLogin && !_.isEmpty(simultaneousLogin)){
            this.setState({os: {...simultaneousLogin}});
        }

    }

    back = () => {
		const { actions } = this.props;

		actions.reset2FALogin();
	}

    logoutDevices = () => {
        const { actions, login } = this.props;
        const params = {};

        params.email = login.inputLoginDetails.username;
        params.os = this.state.os.data;

        actions.logoutOtherDevices(params);
    }

    renderBtn = () => {
        const { login: {blockAccess, loggingOutDevices}, onClickForgot } = this.props;

        if(!_.isEmpty(blockAccess)){
            return (
                <Button
                    onPress={onClickForgot}
                    style={[styles.welcomeBtnStyle, {marginTop: 20}]}
                    label={"Forgot Password"}
                    labelStyle={styles.welcomeBtnLabel} />
            );
        }else{
            return (
                <Button
                    loading={loggingOutDevices}
                    onPress={this.logoutDevices}
                    style={styles.welcomeBtnStyle}
                    label={"Yes"}
                    labelStyle={styles.welcomeBtnLabel} />
            );
        }
    }

    render(){
        const {login, visible, onClickHome, onClose} = this.props;
        const { simultaneousLoginMsg, session, logoutOtherDevices, inputLoginDetails, blockAccess } = login;
        const {height} = this.state;
        let welcomeMsg = "";
        let logo = require("__proj/src/resources/images/mascot/happy_mascot.png");

        if((!_.isEmpty(simultaneousLoginMsg) || !_.isEmpty(blockAccess) ) && !logoutOtherDevices){
            welcomeMsg = simultaneousLoginMsg.toUpperCase() || blockAccess.toUpperCase();
            logo = require("__proj/src/resources/images/mascot/surprised_mascot.png");
            
            if(!_.isEmpty(blockAccess)){
                this.setState({height: 480});
            }else{
                this.setState({height: 500});
            }
        }else if(session.authType == "VRC"){
            welcomeMsg = "WELCOME TO UNIFIED,";
            this.setState({height: 435});
        }else{
            welcomeMsg = "WELCOME BACK,";
            this.setState({height: 435});
        }

        return(
            <Modal animationType="fade" visible={visible} transparent>
                <View style={styles.welcomeBG}>
                    {/* <View style={styles.clsBtnView}>
                        <Button onPress={onClose} style={styles.welcomeCloseBtn}>
                            <Icon name="times" size={25} color="white"/>
                        </Button>
                    </View> */}
                    <View style={[{height: height}, styles.welcomeBody]}>
                        <Image
                            style={styles.welcomeIMG}
                            source={logo}
                            resizeMode={"contain"}
                        />
                        {(!_.isEmpty(simultaneousLoginMsg) || !_.isEmpty(blockAccess) ) && !logoutOtherDevices?
                            <View style={{marginTop: 20}}>
                                <Text style={[styles.welcomeMsg, {fontSize: 18, paddingHorizontal: 30}]}>{welcomeMsg}</Text>
                            </View> 
                        :
                            <View style={{marginTop: 10}}>
                                <Text style={styles.welcomeMsg}>{welcomeMsg}</Text>
                                <Text style={styles.welcomeMsg}>{session.firstName}!</Text>
                            </View>
                        }
                        {(!_.isEmpty(simultaneousLoginMsg) || !_.isEmpty(blockAccess)) 
                                && !logoutOtherDevices?
                                this.renderBtn()
                            :
                        <Button
                            onPress={onClickHome}
                            style={styles.welcomeBtnStyle}
                            label={"Home"}
                            labelStyle={styles.welcomeBtnLabel} />
                        }
                        {!_.isEmpty(simultaneousLoginMsg) && !logoutOtherDevices?
                            <Button
                                onPress={onClose}
                                style={[styles.welcomeBtnStyle, {backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderWidth: 1, borderBottomColor: "#FFC914", borderColor: "#FFC914"}]}
                                label="No"
                                labelStyle={[styles.welcomeBtnLabel, {color: "#FFC914"}]} />
                        : null }
                    </View>
                </View>
            </Modal>
        );
    }
}

Welcome.propTypes = {
	actions: PropTypes.object,
	login: PropTypes.object,
	navigation: PropTypes.object,
    os: PropTypes.array,
};



