/* eslint-disable */
import React from "react";
import { ScrollView, View, Text, BackHandler, Modal, Image } from "react-native";
import _ from "lodash";
import Button from "__src/components/Button";
import { StackActions, NavigationActions } from "react-navigation";
import Resources from "__src/resources";
import styles from "../../styles.css";
const { Color, Res } = Resources;



class EmailVerificationModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 5,
        }
    }

    componentDidMount() {
        BackHandler.removeEventListener('hardwareBackPress', () => { return true })
    }

    countDown = () => {
        const { closeModal, navigation, actions, register: { isRegistered } } = this.props;
        let seconds = 0;
        this.interval = setInterval(() => {
            if (this.state.seconds === 1) {
                clearInterval(this.interval);
                this.setState({ seconds });
                navigation.navigate("EmailActivation");
                closeModal();
            } else {
                this.setState({ seconds: this.state.seconds - 1 });
            }
        }, 1000);
    }


    _resendEmail = () => {
        const { navigation, actions, register: { isRegistered } } = this.props;
        // navigation.dispatch({ type: "register/types/REG_2FA" });
        actions.resendCode(isRegistered.token);
    }

    render() {
        const { isEmailActivationShowing, register: { registerNewInput, isResendingCode } } = this.props;
        return (
            <Modal
                ref={"EmailVerificationModal"}
                visible={isEmailActivationShowing}
                transparent
                animationType="fade"
                onShow={() => this.countDown()} >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                    <Text style={{ position: "absolute", top: 10, textAlign: "center", color: "black", fontWeight: "bold", fontSize: 20, fontFamily: "Roboto" }}>
                        REGISTER
                    </Text>
                    <View style={{
                        borderRadius: 20, width: "90%", paddingVertical: 20, backgroundColor: "white",
                        paddingHorizontal: 15, elevation: 9,
                    }}>
                        <ScrollView showsVerticalScrollIndicator={false} >
                            <Image source={Res.get("mascot_happy")} style={{ alignSelf: "center", width: "100%", height: 200, resizeMode: "contain" }} />

                            <Text style={{
                                marginVertical: 10, textAlign: "center", fontWeight: "bold", color: Color.colorPrimaryMP,
                                fontFamily: "Roboto", fontSize: 13,
                            }}>
                                {"YOU'RE ALMOST THERE! WE HAVE SENT AN EMAIL TO "}
                                <Text style={{ fontFamily: "Roboto", fontSize: 13, textDecorationLine: "underline" }}>
                                    {registerNewInput.email || "[REGISTERED EMAIL ADDRESS]"}
                                </Text>
                            </Text>

                            <Text style={{
                                marginVertical: 5, textAlign: "center", fontWeight: "bold",
                                fontFamily: "Roboto", fontSize: 13, color: "black"
                            }}>
                                Please click on the link and enter your OTP Code to complete your sign up
                            </Text>

                            <Text style={{
                                marginVertical: 10, textAlign: "center", fontWeight: "bold",
                                fontFamily: "Roboto", fontSize: 13, color: "black"
                            }}>
                                Still can't find the email?
                            </Text>

                            <Button onPress={this._resendEmail}
                                style={styles.btnSub}
                                loading={isResendingCode}
                                label={"Resend code."} />

                            <Text style={{
                                marginVertical: 10, textAlign: "center", fontWeight: "bold",
                                fontFamily: "Roboto", fontSize: 13, color: "black"
                            }}>
                                Need help?
                                <Text onPress={() => console.log("CONTACT US")} style={{ fontFamily: "Roboto", fontSize: 13, color: Color.colorPrimaryMP, textDecorationLine: "underline" }}>
                                    {" Contact us."}
                                </Text>
                            </Text>
                        </ScrollView>

                    </View>
                </View>
            </Modal>
        )
    }
}


export default EmailVerificationModal;