/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image, BackHandler, StatusBar, ScrollView } from "react-native";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import OTPModal from "./modals/OTPModal";
import Resources from "__src/resources";
import styles from "../styles.css";
import _ from "lodash";
const { Color, Res } = Resources;

export default class EmailVerificationScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            error: {},
            code: "",
            isOTPShowing: false,
            isError: false,
        };
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => { return true });
    }

    componentDidUpdate(prevProps) {
        const { actions, register: { SendCodeFailed, SendCodeSuccess } } = this.props;
        if (!_.isEmpty(SendCodeFailed) && !_.isEqual(prevProps.register.SendCodeFailed, SendCodeFailed)) {
            const error = {};
            if (SendCodeFailed.includes("code has already expired")) {
                this.setState({ isOTPShowing: true, isError: true })
            } else {
                error.code = SendCodeFailed;
            }
            this.setState({ error });
        }
        if (!_.isEmpty(SendCodeSuccess) && !_.isEqual(prevProps.register.SendCodeSuccess, SendCodeSuccess)) {
            this.setState({ isOTPShowing: true, isError: false })
        }

    }

    componentWillUnmount() {
        this.backHandler.remove();
        clearInterval(this.interval);
    }


    closeModal = () => {
        this.setState({ isOTPShowing: false })
    }

    countDown = () => {
        let seconds = 0;
        this.interval = setInterval(() => {
            if (this.state.seconds < 1) {
                clearInterval(this.interval);
                this.setState({ seconds });
            } else {
                this.setState({ seconds: this.state.seconds - 1 });
            }
        }, 1000);
    }

    _submitCode = () => {
        const { navigation, actions, register: { isRegistered } } = this.props;
        const error = {};
        if (_.isEmpty(this.state.code)) {
            error.code = "Verification code is required";
        }
        this.setState({ error });
        if (_.isEmpty(error)) {
            const params = { code: this.state.code };
            actions.sendCode(params, isRegistered.token);
        }
    }

    _resendCode = () => {
        const { navigation, actions, register: { isRegistered } } = this.props;
        this.setState({ seconds: 60 });
        this.countDown();
        actions.resendCode(isRegistered.token);
    }


    _setCode = (value) => {
        const error = {};
        if (_.isEmpty(value)) {
            error.code = "Verification code is required.";
        }
        this.setState({ code: value.trim() });
    }


    test = () => {
        this.setState({ isOTPShowing: true })
    }

    render() {
        const { register: { registerNewInput, isSendingCode, isResendingCode, SendCodeFailed } } = this.props;
        const { seconds, error, code } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: "white" }} >
                <StatusBar barStyle="dark-content" backgroundColor={Color.white} />
                <View style={{ marginHorizontal: 15, marginTop: 30, width: "90%", padding: 15, backgroundColor: "white", elevation: 9, borderRadius: 20 }}>
                    <Image source={Res.get("otp_image")} style={{ alignSelf: "center", width: "100%", height: 150, resizeMode: "contain" }} />

                    <Text onPress={this.test} style={{ marginVertical: 10, textAlign: "center", alignSelf: "center", fontWeight: "bold", fontSize: 14 }} >
                        Input code sent to your email
                    </Text>
                    <TxtInput
                        onChangeText={this._setCode}
                        onFocus={() => this.setState({ codeFocus: true })}
                        onBlur={() => this.setState({ codeFocus: false })}
                        isFocus={this.state.codeFocus}
                        value={this.state.code}
                        placeholder="Enter OTP Code"
                        onRef={(e) => this.code = e}
                        maxLength={4}
                        returnKeyType='done'
                        err={error.code}
                        round
                        style={{ marginTop: 5 }}
                        style3={
                            [this.state.codeFocus ? { borderColor: Color.colorPrimary } : { borderColor: Color.white },
                            styles.inputStyleOTP]
                        }
                        style4={styles.errStyleContainer} />

                    <Button onPress={this._submitCode}
                        style={[_.isEmpty(code) ? { opacity: 0.7 } : {}, styles.btnSubOTP]}
                        loading={isSendingCode || isResendingCode}
                        disabled={_.isEmpty(code)}
                        label={"Submit"} />

                    {seconds === 0 ?
                        <Text onPress={this._resendCode} style={{
                            textAlign: "center", alignSelf: "center", fontFamily: "Roboto-Light",
                            fontWeight: "bold", color: Color.colorPrimaryMP, fontSize: 12
                        }}>Resend Code?
                        </Text> :
                        <Text style={{ textAlign: "center", alignSelf: "center", fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 12 }}>
                            Resend code in <Text style={{ fontWeight: "bold", color: Color.colorPrimaryMP, fontSize: 12 }}>{seconds} </Text>second(s).
                    </Text>
                    }

                </View>

                <OTPModal
                    closeModal={this.closeModal}
                    isOTPShowing={this.state.isOTPShowing}
                    isError={this.state.isError}
                    resendCode={this._resendCode}
                    {...this.props} />
            </View >
        );
    }
}
EmailVerificationScreen.propTypes = {
};
