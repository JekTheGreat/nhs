/* eslint-disable */
import React from "react";
import { ScrollView, View, Text, TouchableOpacity, BackHandler, Modal, Platform, Dimensions } from "react-native";
import TxtInput from "__src/components/TxtInput";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import _ from "lodash";
import { StackActions, NavigationActions } from "react-navigation";
import Resources from "__src/resources";
import styles from "../../styles.css";
const { Color, Res } = Resources;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const { height, width } = Dimensions.get('window');

class CapchaModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            captcha: "",
            capchaError: "",
            text: "",
        },
            this.generateCaptchaCode();
    }

    componentDidUpdate(prevProps) {
        const { isCapchaShowing, closeModal } = this.props;
        if (!_.isEqual(isCapchaShowing, prevProps.isCapchaShowing)) {
            this.generateCaptchaCode();
            this.setState({ capchaError: "" })
        }
    }

    componentDidMount() {
        BackHandler.removeEventListener('hardwareBackPress', () => { return true })
    }


    generateCaptchaCode = () => {
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        this.setState({ captcha: result })
    }

    _setCaptcha = (value) => {
        this.setState({ text: value })
    }

    _signUp = () => {
        const { closeModal, navigation, actions, showEmailVerification } = this.props;
        const { capchaError, text, captcha } = this.state;
        if (!_.isEqual(text, captcha)) {
            console.log("text", text);
            console.log("captcha", captcha);
            this.setState({ capchaError: "Captcha not matched!" });
        } else {
            navigation.dispatch({ type: "register/types/REG_2FA" });
            showEmailVerification();

            // const resetAction = StackActions.reset({
            //     index: 0,
            //     key: null,
            //     actions: [NavigationActions.navigate({ routeName: "Login" })],
            // });
            // navigation.dispatch(resetAction);
        }
        console.log("Qwe", text, captcha)
    }

    render() {
        const { isCapchaShowing, closeModal, isKeyBoardShowing } = this.props;
        return (
            <Modal
                ref={"CapchaModal"}
                visible={isCapchaShowing}
                transparent
                animationType="fade">
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "grey" }}>
                    <View style={{ borderRadius: 20, width: "90%", height: isKeyBoardShowing ? "95%" : "60%", backgroundColor: "#E0E4EF", paddingVertical: 10, paddingHorizontal: 15 }}>
                        <KeyboardAwareScrollView
                            showsVerticalScrollIndicator={false}
                            extraHeight={80}
                            style={Platform.OS === 'ios' && isKeyBoardShowing ? { height: "80%" } : {}}
                            keyboardShouldPersistTaps='handled' >
                            <Text style={{ marginVertical: 5, textAlign: "left", fontFamily: "Roboto", fontWeight: "bold", fontSize: 13, color: "black" }}>
                                Security Check
                            </Text>
                            <Text style={{ textAlign: "left", fontFamily: "Roboto", fontSize: 13, color: "black" }}>Enter characters shown below.</Text>
                            <View style={{ marginTop: 5, paddingVertical: 30, backgroundColor: "white" }} >
                                <Text style={{ textAlign: "center", fontFamily: Platform.OS === "ios" ? "Zapfino" : "sans-serif-thin", fontStyle: "italic", fontWeight: "bold", fontSize: 35, color: "black" }}>
                                    {this.state.captcha || "ASDF24"}
                                </Text>
                            </View>
                            <Text style={{ marginTop: 10, marginBottom: 5, textAlign: "left", fontFamily: "Roboto", fontSize: 13, color: "black" }}>
                                Text in a box:
                            </Text>
                            <TxtInput
                                onChangeText={this._setCaptcha}
                                onFocus={() => this.setState({ captchaFocus: true })}
                                onBlur={() => this.setState({ captchaFocus: false })}
                                isFocus={this.state.captchaFocus}
                                value={this.state.text}
                                placeholder="Insert captcha here..."
                                onRef={(e) => this.captcha = e}
                                maxLength={6}
                                returnKeyType='next'
                                err={this.state.capchaError}
                                round
                                style={{ marginTop: 5 }}
                                style3={
                                    [this.state.captchaFocus ? { borderColor: Color.colorPrimary } : { borderColor: Color.white },
                                    styles.captchaStyle]
                                }
                                style4={styles.errStyleContainer} />
                            <Text style={{ marginVertical: 10, textAlign: "left", fontFamily: "Roboto", fontSize: 13, color: "black" }}>
                                Can't read this? <Text onPress={() => this.generateCaptchaCode()} style={{ marginVertical: 10, textAlign: "left", fontFamily: "Roboto", fontSize: 13, color: Color.colorPrimaryMP }}>
                                    Try another.
                            </Text>
                            </Text>
                            <View style={{ paddingTop: 10, justifyContent: "center", alignItems: "center", width: "100%" }}>
                                <TouchableOpacity onPress={this._signUp} style={{ width: "50%", paddingVertical: 5, borderRadius: 15, backgroundColor: "#66A54A" }}>
                                    <Text style={{ alignSelf: "center", textAlign: "center", fontWeight: "bold", color: Color.white, fontSize: 12 }}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                </View>
            </Modal>
        )
    }
}


export default CapchaModal;