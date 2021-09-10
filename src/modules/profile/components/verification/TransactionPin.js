import React, { PureComponent } from "react";
import { View, Text, Image, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "__src/components/Button";
import styles from "../../styles.css";
import _ from "lodash";

export default class TransactionPin extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            height: 360,
            transactPin: "",
            isConfirmPin: false,
            error: {},
        }
    }

    renderTitleMsg1 = () => {
        return (
            <View>
                <Text style={[styles.textStylePin]}>Please set up your transaction PIN.</Text>
                <Text style={[styles.textStylePin]}>Remember this 6-digit PIN.</Text>
                <Text style={[styles.textStylePin]}>You will need this to authorize your future transactions.</Text>
            </View>
        );
    }
    renderTitleMsg2 = () => {
        return (
            <View>
                <Text style={[styles.textStylePin]}>Please re-enter your Transaction PIN.</Text>
            </View>
        );
    }

    _onChangeText = (type) => (value) => {
        switch(type){
            case 1:
                this.setState({transactPin: value});
        }
    }

    _onClick = () => {
        if(!this.state.isConfirmPin){
            this.setState({isConfirmPin: true, height: 290});
        }else{
            return;
        }
    }

    _goBack = () => {
        const { navigation } = this.props;

        navigation.goBack();
    }

    _back = () => {
        this.setState({isConfirmPin: false, height: 360});
    }

    render() {
        const { isConfirmPin, height } = this.state;
        const mTop = !isConfirmPin? "" : {marginTop: 7};
        const h = {height: height};

        return(
            <KeyboardAwareScrollView contentContainerStyle={[styles.pinContainer, h]}>
                <View style={[mTop, {alignItems: "center", height: 100, width: "100%"}]}>
                    <Image
                        style={styles.imgStyle}
                        source={require("__proj/src/resources/images/forgot_password.png")}
                        resizeMode={"contain"}
                    />
                </View>
                <View style={styles.pinViewContainer}>

                    {!isConfirmPin? this.renderTitleMsg1() : this.renderTitleMsg2() }

                    <View style={styles.inputFieldStyle}>
                        <TextInput
                            value={this.state.transactPin}
                            onChangeText={this._onChangeText(1)}
                            keyboardType="number-pad"
                            returnKeyType="next"
                            style={{padding: 0, fontFamily: "Roboto", fontSize: 14, color: "000000" }}
                            placeholder={!isConfirmPin? "Enter Transaction Pin" : "Re-Enter Transaction Pin"}
                            placeholderTextColor="grey" />
                    </View>

                    <View style={styles.btnView}>
                        <Button
                            onPress={this._onClick}
                            label={!isConfirmPin? "Next" : "Confirm" }
                            labelStyle={styles.labelStylePin}
                            style={styles.btnStylePin} />
                            
                        <Button
                            onPress={this._back}
                            label="Cancel"
                            labelStyle={[styles.labelStylePin, {color: "#FFC914"}]}
                            style={[styles.btnStylePin, {marginTop: 10, backgroundColor: "#FFFFFF"}]} />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}