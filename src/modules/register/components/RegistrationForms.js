/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, StatusBar, ScrollView, SafeAreaView, Linking, KeyboardAvoidingView, Dimensions, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import TermsAndConditionModal from './modals/TermsAndConditionModal';
import PolicyAndPrivacyModal from './modals/PolicyAndPrivacyModal';
import CapchaModal from './modals/CapchaModal';
import EmailVerificationModal from './modals/EmailVerificationModal';
import Color from "__src/resources/styles/color";
import { Icon, CheckBox } from "react-native-elements";
import passwordValidator from "password-validator";
import validator from 'validator';
import PropTypes from "prop-types";
import styles from "../styles.css";
import _ from "lodash";

const { height, width } = Dimensions.get('window');
const errorMessage = "This field is required."
const passValidatorError = "Your password must be at least 8 characters, with at least 1 uppercase, 1 lowercase, alphanumeric and 1 special character.";
const emailValidatorError = "Your Email Address is invalid."
const fNameValidatorError = "Invalid first name."
const lNameValidatorError = "Invalid last name."
const regex = new RegExp("^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$")
const schema = new passwordValidator();
schema
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces();

export default class RegistrationForms extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: {},
            isKeyBoardShowing: false,
            isPassShowing: true,
            isPass2Showing: true,
            isTermsShowing: false,
            isPoliciyShowing: false,
            isCapchaShowing: false,
            isEmailActivationShowing: false,
            isCheckedTerms: false,
            isCheckedPrivacy: false,
        };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );
    }

    componentWillUnmount() {
        const { navigation, actions } = this.props;
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        actions.resetRegister();

    }

    _keyboardDidShow = () => {
        this.setState({ isKeyBoardShowing: true })
    }

    _keyboardDidHide = () => {
        this.setState({ isKeyBoardShowing: false })
    }

    componentDidUpdate(prevProps, prevState) {
        const { register: { isRegistered, isRegisterFailed, SendCodeSuccess }, navigation } = this.props;
        const { isCheckedTerms, isCheckedPrivacy, error } = this.state;
        if (!_.isEqual(prevProps.register.isRegistered, isRegistered) && !_.isEmpty(isRegistered)) {
            this.setState({ isCapchaShowing: true });
        }

        if (!_.isEqual(prevProps.register.isRegisterFailed, isRegisterFailed) && !_.isEmpty(isRegisterFailed)) {
            const error1 = {}
            if (_.has(isRegisterFailed, "errors")) {
                _.map(isRegisterFailed.errors, errs => {
                    error1[errs.key] = errs.message;
                })
            } else {
                if (isRegisterFailed.message.toLowerCase().includes("username")) {
                    error1.username = isRegisterFailed.message
                } else if (isRegisterFailed.message.toLowerCase().includes("email")) {
                    error1.email = isRegisterFailed.message
                } else if (isRegisterFailed.message.toLowerCase().includes("password")) {
                    error1.password = isRegisterFailed.message
                }
            }
            this.setState({ error: error1 })
        }
    }

    _onBack = () => {
        const { navigation, actions } = this.props;
        navigation.goBack();
    }

    _onChangeText = (type) => (val) => {
        const { register: { registerNewInput }, actions } = this.props;
        const error1 = _.merge({}, this.state.error);
        delete error1[type];
        const newInput = _.merge({}, registerNewInput);
        // if (type === "firstName" && !_.isEmpty(val) && !val.match(regex)) {
        //     error1[type] = fNameValidatorError;
        // }
        // if (type === "lastName" && !_.isEmpty(val) && !val.match(regex)) {
        //     error1[type] = lNameValidatorError;
        // }
        // if (type === "email" && !_.isEmpty(val) && !validator.isEmail(val)) {
        //     error1[type] = emailValidatorError;
        // }
        // if (type === "password" && !_.isEmpty(val) && !schema.validate(val)) {
        //     error1[type] = passValidatorError;
        // } else if (type === "password" && !_.isEmpty(val) && !_.isEqual(val, registerNewInput.confirmPassword)) {
        //     error1[type] = "Confirm Password does not match.";
        // } else {
        //     delete error1.confirmPassword;
        // }
        // if (type === "confirmPassword" && !_.isEmpty(val) && !_.isEqual(val, registerNewInput.password)) {
        //     error1[type] = "Password does not match.";
        // } else if (type === "confirmPassword" && !_.isEmpty(val) && _.isEqual(val, registerNewInput.password)) {
        //     delete error1.password;
        // }
        // if (_.isEmpty(val)) {
        //     error1[type] = errorMessage;
        // }
        newInput[type] = val;
        this.setState({ error: error1 });
        actions.setRegisterInput(newInput);
    }

    _submit = () => {
        const { actions, register: { registerNewInput } } = this.props;
        const { isCheckedTerms, isCheckedPrivacy } = this.state;
        const error1 = _.merge({}, this.state.error);
        if (registerNewInput.firstName === "") {
            error1.firstName = errorMessage;
        } else if (!registerNewInput.firstName.match(regex)) {
            error1.firstName = fNameValidatorError;
        }
        if (registerNewInput.lastName === "") {
            error1.lastName = errorMessage;
        } else if (!registerNewInput.lastName.match(regex)) {
            error1.lastName = lNameValidatorError;
        }
        if (registerNewInput.email === "") {
            error1.email = errorMessage;
        } else if (!validator.isEmail(registerNewInput.email)) {
            error1.email = emailValidatorError;
        }
        if (registerNewInput.password === "") {
            error1.password = errorMessage;
        } else if (!schema.validate(registerNewInput.password) || registerNewInput.password.length < 8) {
            error1.password = passValidatorError
        } else {
            delete error1.password;
        }
        if (registerNewInput.confirmPassword === "") {
            error1.confirmPassword = errorMessage;
        } else if (!_.isEqual(registerNewInput.password, registerNewInput.confirmPassword)) {
            error1.confirmPassword = "Password does not match.";
        } else {
            delete error1.confirmPassword;
        }
        if (!(isCheckedTerms && isCheckedPrivacy) || !_.isEqual(isCheckedTerms, isCheckedPrivacy)) {
            error1.isChecked = "Please accept Terms and Conditions and Privacy Policy."
        } else if (isCheckedTerms && isCheckedPrivacy) {
            delete error1.isChecked;
        }
        this.setState({ error: error1 });
        console.log("ASDASD", (!(isCheckedTerms && isCheckedPrivacy) || !_.isEqual(isCheckedTerms, isCheckedPrivacy)))

        if (_.isEmpty(error1)) {
            let param = {}
            param.firstName = registerNewInput.firstName
            param.lastName = registerNewInput.lastName
            param.email = registerNewInput.email
            param.password = registerNewInput.password
            param.confirmPassword = registerNewInput.confirmPassword
            actions.register(param)
        }

    }

    _warning = () => {
        const error1 = _.merge({}, this.state.error)
        if (!_.has(this.state.error, "password")) {
            error1.password = passValidatorError
        } else {
            delete error1.password;
        }
        this.setState({ error: error1 })
    }

    closeModal = () => {
        this.setState({ isCapchaShowing: false, isEmailActivationShowing: false });
    }

    _openTerms = () => {
        this.setState({ isTermsShowing: true });
    }

    _openPolicy = () => {
        this.setState({ isPoliciyShowing: true });
    }

    agreeTerms = () => {
        const { isCheckedPrivacy } = this.state;
        this.setState({ isCheckedTerms: true, isTermsShowing: false });
        if (!isCheckedPrivacy) {
            this.setState({ isPoliciyShowing: true });
        }
    }

    agreePolicy = () => {
        const { isCheckedTerms } = this.state;
        this.setState({ isCheckedPrivacy: true, isPoliciyShowing: false });
        if (!isCheckedTerms) {
            this.setState({ isTermsShowing: true });
        }
    }

    showEmailVerification = () => {
        this.setState({ isCapchaShowing: false, isEmailActivationShowing: true });
    }

    _test = () => {
        const { actions, register: { registerNewInput } } = this.props;
        Linking.openURL(`mailto:?to=${registerNewInput.email}`);
    }

    _onTick = () => {
        const { isCheckedTerms, isCheckedPrivacy } = this.state;
        let checked = (isCheckedTerms && isCheckedPrivacy);
        if (checked) {
            checked = false
        } else {
            checked = true
            delete this.state.error.isChecked;
        }
        this.setState({ isCheckedTerms: checked, isCheckedPrivacy: checked })
    }


    render() {
        const { navigation, register: { registerNewInput, isRegistering } } = this.props;
        const isButtonDisabled = (_.isEmpty(registerNewInput.firstName) && _.isEmpty(registerNewInput.lastName) && _.isEmpty(registerNewInput.email)
            && _.isEmpty(registerNewInput.password) && _.isEmpty(registerNewInput.confirmPassword)) ? true : false;
        const { error, isKeyBoardShowing, isCheckedTerms, isCheckedPrivacy } = this.state;
        const isChecked = (isCheckedTerms && isCheckedPrivacy) ? true : false;
        if (isChecked) {
            delete error.isChecked;
        }
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    enableOnAndroid
                    extraHeight={80}
                    style={{ height: isKeyBoardShowing ? height : "50%" }}
                    contentContainerStyle={styles.bodyContainer}
                    keyboardShouldPersistTaps='handled' >

                    <TxtInput
                        onChangeText={this._onChangeText("firstName")}
                        onFocus={() => this.setState({ fNameFocus: true })}
                        onBlur={() => this.setState({ fNameFocus: false })}
                        isFocus={this.state.fNameFocus}
                        value={registerNewInput.firstName}
                        placeholder="First Name"
                        onRef={(e) => this.firstName = e}
                        refname={this.lastName}
                        returnKeyType='next'
                        err={error.firstName}
                        round
                        errIcon="Warning"
                        style={{ backgroundColor: "white" }}
                        style3={
                            [this.state.fNameFocus ? { borderColor: Color.colorPrimary } : { borderColor: Color.Standard },
                            styles.inputStyle5]
                        }
                        style4={styles.errStyleContainer} />
                    <TxtInput
                        onChangeText={this._onChangeText("lastName")}
                        onFocus={() => this.setState({ lNameFocus: true })}
                        onBlur={() => this.setState({ lNameFocus: false })}
                        isFocus={this.state.lNameFocus}
                        value={registerNewInput.lastName}
                        placeholder="Last Name"
                        onRef={(e) => this.lastName = e}
                        refname={this.email}
                        returnKeyType='next'
                        err={error.lastName}
                        round
                        errIcon="Warning"
                        style={{ marginTop: 10, backgroundColor: "white" }}
                        style3={
                            [this.state.lNameFocus ? { borderColor: Color.colorPrimary } : { borderColor: Color.Standard },
                            styles.inputStyle5]
                        }
                        style4={styles.errStyleContainer} />
                    <TxtInput
                        onChangeText={this._onChangeText("email")}
                        onFocus={() => this.setState({ emailFocus: true })}
                        onBlur={() => this.setState({ emailFocus: false })}
                        isFocus={this.state.emailFocus}
                        value={registerNewInput.email}
                        placeholder="Email"
                        onRef={(e) => this.email = e}
                        refname={this.password}
                        returnKeyType='next'
                        err={error.email}
                        round
                        errIcon="Warning"
                        style={{ marginTop: 10, backgroundColor: "white" }}
                        style3={
                            [this.state.emailFocus ? { borderColor: Color.colorPrimary } : { borderColor: Color.Standard },
                            styles.inputStyle5]
                        }
                        style4={styles.errStyleContainer} />

                    <View  >
                        <TxtInput
                            logintype
                            onChangeText={this._onChangeText("password")}
                            onFocus={() => this.setState({ passwordFocus: true })}
                            onBlur={() => this.setState({ passwordFocus: false })}
                            isFocus={this.state.passwordFocus}
                            value={registerNewInput.password}
                            placeholder="Password"
                            onRef={(e) => this.password = e}
                            refname={this.confirmPassword}
                            returnKeyType='next'
                            err={error.password}
                            icon2={this.state.isPassShowing ? "hide_icon_new" : "view_icon_new"}
                            errIcon="Warning"
                            onSubmitEditing={() => this.confirmPassword.focus()}
                            secureTextEntry={this.state.isPassShowing}
                            viewPass={() => this.setState({ isPassShowing: !this.state.isPassShowing })}
                            style={{ marginTop: 10 }}
                            style3={
                                [this.state.passwordFocus ? { borderColor: Color.colorPrimary } : { borderColor: Color.Standard },
                                styles.passwordStyle]
                            }
                            style4={styles.errStyleContainer} />

                        <Icon onPress={this._warning}
                            type='evilicon'
                            name='exclamation'
                            color={Color.Standard2}
                            size={20}
                            containerStyle={{ position: "absolute", right: -20, top: 22 }} />
                    </View>

                    <TxtInput
                        logintype
                        onChangeText={this._onChangeText("confirmPassword")}
                        onFocus={() => this.setState({ confirmPasswordFocus: true })}
                        onBlur={() => this.setState({ confirmPasswordFocus: false })}
                        isFocus={this.state.confirmPasswordFocus}
                        value={registerNewInput.confirmPassword}
                        placeholder="Re-Enter Password"
                        onRef={(e) => this.confirmPassword = e}
                        returnKeyType='next'
                        err={error.confirmPassword}
                        icon2={this.state.isPass2Showing ? "hide_icon_new" : "view_icon_new"}
                        errIcon="Warning"
                        secureTextEntry={this.state.isPass2Showing}
                        viewPass={() => this.setState({ isPass2Showing: !this.state.isPass2Showing })}
                        style={{ marginTop: 10, }}
                        style3={
                            [this.state.confirmPasswordFocus ? { borderColor: Color.colorPrimary } : { borderColor: Color.Standard },
                            styles.passwordStyle]
                        }
                        style4={styles.errStyleContainer} />

                    <View style={styles.containerTermsPolicy}>
                        <CheckBox
                            containerStyle={{ margin: 0, padding: 0, marginLeft: 0, marginRight: 0, }}
                            iconType='material'
                            checkedIcon='check-box'
                            checkedColor={Color.colorPrimaryMP}
                            uncheckedIcon='check-box-outline-blank'
                            onPress={() => this._onTick()}
                            checked={isChecked} />
                        <Text style={styles.txtTermsPolicyContainer}>I have read and agree to the
							<Text onPress={this._openTerms} style={styles.txtTermPolicy}> Terms and Conditions</Text> and
							<Text onPress={this._openPolicy} style={styles.txtTermPolicy}> Privacy Policy.</Text>
                        </Text>
                    </View>
                    {_.has(this.state.error, "isChecked") &&
                        <Text style={styles.cbError}>
                            {this.state.error.isChecked}
                        </Text>
                    }
                </KeyboardAwareScrollView>

                <SafeAreaView style={{ flex: 1 }} />

                <View style={styles.buttonsContainer}>
                    <Button
                        onPress={this._submit}
                        loading={isRegistering}
                        disabled={isButtonDisabled}
                        style={styles.btnSub}
                        label={"Create Account"}
                        labelStyle={{ color: Color.white, fontWeight: "bold" }} />
                    {/* <Button onPress={this._onBack}
                        style={styles.btnCancel}
                        loading={isRegistering}
                        color={Color.colorPrimaryMP}
                        labelStyle={{ color: Color.colorPrimaryMP, fontWeight: "bold" }}
                        label="Back" /> */}

                    {/* <Text onPress={() => this.setState({ isCapchaShowing: true })} style={styles.txtTermsPolicyContainer}>Already have an account? */}
                    <Text style={styles.txtTermsPolicyContainer}>Already have an account?
                        <Text onPress={this._onBack} style={styles.txtTermPolicy}> Login</Text>
                    </Text>
                </View>

                <PolicyAndPrivacyModal
                    agreeTerms={this.agreePolicy}
                    closeModal={() => this.setState({ isPoliciyShowing: false })}
                    isPoliciyShowing={this.state.isPoliciyShowing} />
                <TermsAndConditionModal
                    agreeTerms={this.agreeTerms}
                    closeModal={() => this.setState({ isTermsShowing: false })}
                    isTermsShowing={this.state.isTermsShowing} />
                <CapchaModal
                    closeModal={this.closeModal}
                    showEmailVerification={this.showEmailVerification}
                    isCapchaShowing={this.state.isCapchaShowing}
                    isKeyBoardShowing={isKeyBoardShowing}
                    {...this.props} />
                <EmailVerificationModal
                    closeModal={this.closeModal}
                    isEmailActivationShowing={this.state.isEmailActivationShowing}
                    {...this.props} />
            </View >
        );
    }
}
RegistrationForms.propTypes = {
    actions: PropTypes.object,
    InputedData: PropTypes.object,
    navigation: PropTypes.object,
};
