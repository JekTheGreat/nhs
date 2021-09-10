/* eslint-disable */
import React from "react";
import { ScrollView, View, Text, TouchableOpacity, TouchableWithoutFeedback, Modal, Dimensions, Image } from "react-native";
import TxtInput from "__src/components/TxtInput";
import _ from "lodash";
import Button from "__src/components/Button";
import { StackActions, NavigationActions } from "react-navigation";
import { Spinner } from "native-base";
import moment from "moment";
import Resources from "__src/resources";
import { Icon } from "react-native-elements";
import { Colors } from "react-native-paper";

const { Color, Res } = Resources;
const { width, height } = Dimensions.get('window');

class OTPModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    _onNext = () => {
        const { closeModal, isError, resendCode, navigation, actions } = this.props;
        if (isError) {
            resendCode();
        } else {
            const resetAction = StackActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({ routeName: "Login" })],
            });
            navigation.dispatch(resetAction);
            actions.reset2FAReg();
            actions.resetRegister();
        }
        closeModal();
    }

    render() {
        const { isOTPShowing, isError, closeModal } = this.props;
        let imageName;
        let content;
        let labelButton;
        if (isError) {
            imageName = "mascot_sad";
            content = "SORRY THIS VERIFICATION CODE IS NO LONGER VALID.";
            labelButton = "Resend OTP Code";
        } else {
            imageName = "mascot_happy";
            content = "HURRAY! YOUR EMAIL ADDRESS HAS BEEN SUCCESFULLY VERIFIED!";
            labelButton = "Let's get started!"
        }
        return (
            <Modal
                ref={"OTPModal"}
                visible={isOTPShowing}
                transparent
                animationType="fade"
                onRequestClose={closeModal}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "grey" }}>
                    <View style={{ borderRadius: 20, width: "90%", paddingVertical: 15, backgroundColor: Color.white, paddingHorizontal: 15 }}>
                        {isError &&
                            <View style={{}}>
                                <TouchableOpacity onPress={closeModal} style={{ position: "absolute", right: -25, top: -30, borderRadius: 30, backgroundColor: "red", padding: 10 }}>
                                    <Icon type='font-awesome' name='times' color={"white"} size={15} />
                                </TouchableOpacity>
                            </View>
                        }

                        <Image source={Res.get(imageName)} style={{ alignSelf: "center", width: "100%", height: 200, resizeMode: "contain" }} />

                        <Text style={{ textAlign: "center", marginVertical: 10, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 15, color: Color.colorPrimaryMP }}>
                            {content}
                        </Text>


                        <Button onPress={this._onNext} style={{ height: 35, width: "100%", backgroundColor: Color.colorPrimaryMP, borderRadius: 15 }}
                            labelStyle={{ fontSize: 12 }}
                            label={labelButton} />
                    </View>
                </View>
            </Modal>
        )
    }
}


export default OTPModal;