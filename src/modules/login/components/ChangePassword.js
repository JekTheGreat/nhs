import React, { PureComponent } from "react";
import { Text, Modal, View, ScrollView, Image, TextInput, TouchableOpacity, 
    TouchableWithoutFeedback } from "react-native";
import Button from "__src/components/Button";
import styles from "../styles.css";
import * as Animatable from "react-native-animatable";
import _ from "lodash";
import PropTypes from "prop-types";
import passwordValidator from "password-validator";


const schema = new passwordValidator();
schema
    .has().min(8)
	.has().uppercase()
	.has().lowercase()
	.has().digits()
	.has().symbols()
	.has().not().spaces();

class ChangePassword extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            viewOP: true,
            viewNP: true,
            viewRP: true,
            showPassInfo1: false,
            showPassInfo2: false,
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            error: {},
        }
    }

    componentDidMount() {
        this.setState({
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        });
    }

    componentDidUpdate(prevProps){
        const {login: {isLoggingIn}} = this.props;
        const error = {};

        if(!_.isEqual(prevProps.login.isLoggingIn, isLoggingIn) && isLoggingIn) {
            this.setState({
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: "",
                error: {},
                showPassInfo2: false,
            });
        }
    }

    toggle1 = () =>  {
		if(this.state.viewOP == true){
			this.setState({viewOP: false});
		}else{
			this.setState({viewOP: true});
		}
	}

    toggle2 = () =>  {
		if(this.state.viewNP == true){
			this.setState({viewNP: false});
		}else{
			this.setState({viewNP: true});
		}
	}

    toggle3 = () =>  {
		if(this.state.viewRP == true){
			this.setState({viewRP: false});
		}else{
			this.setState({viewRP: true});
		}
	}

    onShowPassInfo1 = () => {
        if(this.state.showPassInfo1)
            this.setState({showPassInfo1: false});
        else
            this.setState({showPassInfo1: true, showPassInfo2: false});
    }

    onShowPassInfo2 = () => {
        if(this.state.showPassInfo2)
            this.setState({showPassInfo2: false});
        else
            this.setState({showPassInfo2: true, showPassInfo1: false});

        this.setState({error: ""});
    }

    _onChangeInput = (type) => (value) => {

        this.setState({showPassInfo2: false});
        this.setState({error: ""});

        switch(type) {
            case 1:
                this.setState({oldPassword: value});
                break;
            case 2:
                this.setState({newPassword: value});
                break;
            case 3:
                this.setState({confirmNewPassword: value});
                break;
        }

    }

    _onClick = () => {
        const {oldPassword, newPassword, confirmNewPassword} = this.state;
        const {actions, login: {passwordExpired, inputLoginDetails}} = this.props;
        const params= {};
        const error = {};

        this.setState({showPassInfo2: false});

        if(!_.isEqual(inputLoginDetails.password, oldPassword)){
            error.message = "Old password is incorrect."
            this.setState({error});
        }else if(!schema.validate(newPassword)){
            this.onShowPassInfo2();
		}else if(!_.isEqual(newPassword, confirmNewPassword)){
			error.message = "New passwords does not match."
            this.setState({error});
		}

        if(_.isEmpty(error) && this.state.showPassInfo2 == false){
            params.oldPassword = oldPassword;
            params.newPassword = newPassword;
            params.confirmNewPassword = confirmNewPassword;

            actions.changeExpiredPassword(params, passwordExpired);
        }
    }

    renderError = () => {
        const { error } = this.state;

        return(
            <Animatable.View style={{flexDirection: "row", paddingVertical: 5, paddingHorizontal: 30}}>
                <Image
					style={{marginTop: 3, marginRight: 5, height: 12, width: 12, tintColor: "#F93131"}}
					source={require("__proj/src/resources/images/info.png")}
					resizeMode={"contain"}
				/>
                <Text style={{fontFamily: "Roboto", fontSize: 12, fontWeight: "bold", color: "#F44336"}}>
                    {error.message || error.message1}
                </Text>
            </Animatable.View>
        );
    }
    
    renderPassInfo = () => {

        return(
            <Animatable.View style={{flexDirection: "column", paddingVertical: 5, paddingHorizontal: 30}}>
                <Text style={{fontFamily: "Roboto", fontSize: 12, fontWeight: "bold", color: "#F44336"}}>Your password must be:</Text>
                <View style={{flexDirection: "row", marginTop: 3}}>
                    <Text style={{color: "#F44336", marginTop: 4, fontSize: 6}}>{'\u2B24'}</Text>
                    <Text style={{marginLeft: 5, fontFamily: "Roboto", fontSize: 12, fontWeight: "bold", color: "#F44336"}}>
                        Atleast 8 characters, with at least 1 uppercase, 1 lowercase, alphanumeric and 1 special character.
                    </Text>
                </View>
                <View style={{flexDirection: "row", marginTop: 3}}>
                    <Text style={{color: "#F44336", marginTop: 4, fontSize: 6}}>{'\u2B24'}</Text>
                    <Text style={{marginLeft: 5, fontFamily: "Roboto", fontWeight: "bold", fontSize: 12, color: "#F44336"}}>
                        New and not previously assigned.
                    </Text>
                </View>
                <View style={{flexDirection: "row", marginTop: 3}}>
                    <Text style={{color: "#F44336", marginTop: 4, fontSize: 6}}>{'\u2B24'}</Text>
                    <Text style={{marginLeft: 5, fontFamily: "Roboto", fontWeight: "bold", fontSize: 12, color: "#F44336"}}>
                        Must not contain your name, username, birthday or address.
                    </Text>
                </View>
            </Animatable.View>
        );
    }

    render(){
        const {visibleCP, onClose, login: {isChangingPassword}} = this.props;
        const {oldPassword, newPassword, confirmNewPassword} = this.state;

        return(
            <Modal animationType="fade" visible={visibleCP} transparent>
                <ScrollView contentContainerStyle={[styles.modalContainerCP]} showsVerticalScrollIndicator={false}>
                    <View style={[styles.modalViewCP]}>
                        <Image
                            tintColor="#F44336"
                            style={styles.topImage}
                            source={require("__proj/src/resources/images/info.png")}
                            resizeMode={"contain"}
                        />
                        <View style={{paddingHorizontal: 10}}>
                            <Text style={{marginTop: 20, marginHorizontal: 10, fontWeight: "bold", fontFamily: "Roboto", fontSize: 18, color: "#F44336", textAlign: "center"}}>
                                YOUR PASSWORD HAS EXPIRED AND MUST BE CHANGED
                            </Text>
                        </View>

                        <View style={{alignSelf: "center", flexDirection: "row", width: "85%"}}>
                            <View style={[styles.passwordFieldStyle, {width: "100%", height: 35}]}>
                                <View style={[{justifyContent: "center", width: "90%"}]}>
                                    <TextInput
                                        style={[styles.textInputStyle, {padding: 0}]}
                                        round
                                        onChangeText={this._onChangeInput(1)}
                                        value={this.state.oldPassword}
                                        returnKeyType="next"
                                        placeholder="Enter Old Password"
                                        placeholderTextColor="gray"
                                        secureTextEntry={this.state.viewOP}
                                        viewPass={() => this.setState({ viewOP: !this.state.viewOP })}
                                    />
                                </View>
                                <View style={{justifyContent: "center", width: "10%"}}>
                                    <TouchableOpacity onPress={this.toggle1}>
                                        {this.state.viewOP == true?
                                        <Image
                                            style={[styles.hidePass]}
                                            source={require("__proj/src/resources/images/hide_password.png")}
                                            resizeMode={"contain"}
                                        /> : 
                                        <Image
                                            style={[styles.showPass]}
                                            source={require("__proj/src/resources/images/show_password.png")}
                                            resizeMode={"contain"}
                                        />
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* <View style={{justifyContent: "center"}}>
                                <TouchableWithoutFeedback onPress={this.onShowPassInfo1}>
                                    <Image
                                        style={{marginTop: 10, paddingRight: 15, marginLeft: 5, height: 20, width: 10}}
                                        source={require("__proj/src/resources/images/info.png")}
                                        resizeMode={"contain"}
                                    />
                                </TouchableWithoutFeedback>
                            </View> */}
                        </View>
                        {!_.isEmpty(this.state.error.message1)? this.renderError() : null}
                        {this.state.showPassInfo1? this.renderPassInfo() : null}

                        <View style={{alignSelf: "center", flexDirection: "row", width: "85%"}}>
                            <View style={[styles.passwordFieldStyle, {width: "100%", height: 35}]}>
                                <View style={[{justifyContent: "center", width: "90%"}]}>
                                    <TextInput
                                        style={[styles.textInputStyle, {padding: 0}]}
                                        round
                                        onChangeText={this._onChangeInput(2)}
                                        value={this.state.newPassword}
                                        returnKeyType="next"
                                        placeholder="New Password"
                                        placeholderTextColor="gray"
                                        secureTextEntry={this.state.viewNP}
                                        viewPass={() => this.setState({ viewNP: !this.state.viewNP })}
                                    />
                                </View>
                                <View style={{justifyContent: "center", width: "10%"}}>
                                    <TouchableOpacity onPress={this.toggle2}>
                                        {this.state.viewNP == true?
                                        <Image
                                            style={[styles.hidePass]}
                                            source={require("__proj/src/resources/images/hide_password.png")}
                                            resizeMode={"contain"}
                                        /> : 
                                        <Image
                                            style={[styles.showPass]}
                                            source={require("__proj/src/resources/images/show_password.png")}
                                            resizeMode={"contain"}
                                        />
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{justifyContent: "center"}}>
                                <TouchableWithoutFeedback onPress={this.onShowPassInfo2}>
                                    <Image
                                        style={{marginTop: 10, paddingRight: 15, marginLeft: 5, height: 20, width: 10}}
                                        source={require("__proj/src/resources/images/info.png")}
                                        resizeMode={"contain"}
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        {this.state.showPassInfo2? this.renderPassInfo() : null}

                        <View style={[styles.passwordFieldStyle, {alignSelf: "center", width: "85%", height: 35}]}>
                            <View style={[{justifyContent: "center", width: "90%"}]}>
                                <TextInput
                                    style={[styles.textInputStyle, {padding: 0}]}
                                    round
                                    onChangeText={this._onChangeInput(3)}
                                    value={this.state.confirmNewPassword}
                                    returnKeyType="next"
                                    placeholder="Re-Enter Password"
                                    placeholderTextColor="gray"
                                    secureTextEntry={this.state.viewRP}
                                    viewPass={() => this.setState({ viewRP: !this.state.viewRP })}
                                />
                            </View>
                            <View style={{justifyContent: "center", width: "10%"}}>
                                <TouchableOpacity onPress={this.toggle3}>
                                    {this.state.viewRP == true?
                                    <Image
                                        style={[styles.hidePass]}
                                        source={require("__proj/src/resources/images/hide_password.png")}
                                        resizeMode={"contain"}
                                    /> : 
                                    <Image
                                        style={[styles.showPass]}
                                        source={require("__proj/src/resources/images/show_password.png")}
                                        resizeMode={"contain"}
                                    />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        {!_.isEmpty(this.state.error.message)? this.renderError() : null}
                        
                        <View style={{alignContent: "center"}}>
                            {(oldPassword && newPassword && confirmNewPassword) == ""?
                            <Button
                                disabled
                                style={[styles.welcomeBtnStyle, {height: 35, width: "85%", opacity: 0.6}]} 
                                label="Change Password"
                                labelStyle={styles.welcomeBtnLabel} />
                            :
                            <Button
                                loading={isChangingPassword}
                                onPress={this._onClick}
                                style={[styles.welcomeBtnStyle, {height: 35, width: "85%"}]}
                                label="Change Password"
                                labelStyle={styles.welcomeBtnLabel} />
                            }
                            <Button
                                onPress={onClose}
                                style={[styles.welcomeBtnStyle, {height: 35, width: "85%", backgroundColor: "#FFFFFF"}]}
                                label="Back"
                                labelStyle={[styles.welcomeBtnLabel, {color: "#FFC914"}]} />
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        );
    }
}

ChangePassword.propTypes = {
    actions: PropTypes.object,
    login: PropTypes.object,
};

export default ChangePassword;