import React from 'react';
import { View, Image, Text, StyleSheet, StatusBar } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import Button from "__src/components/Button";
import Resource from "__src/resources";
const { Color, Res } = Resource;


export default class LoginButtons extends React.PureComponent {


    _goto = (type) => {
        const { navigation } = this.props;
        navigation.navigate(type);
    }

    renderImage = () => {
        const { login: { isLoggedIn }, marketplace: { setUserSide } } = this.props;
        if (!isLoggedIn) {
            return (
                <Text style={styles.txtStyle}>Login to unlock best experience!</Text>
            )
        }
    }

    renderBody = () => {
        const { login: { isLoggedIn }, marketplace: { setUserSide } } = this.props;
        if (!isLoggedIn) {
            return (
                <View style={styles.container3}>
                    <Button
                        onPress={() => this._goto("Login")}
                        style={styles.btnLogin}
                        label={"Login"}
                        labelStyle={styles.btnLoginTxt} />
                    <Button onPress={() => this._goto("RegisterScreen")}
                        style={styles.btnReg}
                        labelStyle={styles.btnRegTxt}
                        label="Sign Up" />
                </View>
            )
        } else {
            return (<Text>ASDFASFD</Text>)
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.container2}>
                    <View style={styles.imgContainer}>
                        <Icon type='ionicons' name='person' size={40} color={Color.colorPrimaryMP} />
                    </View>
                    {this.renderImage()}
                </View>

                {this.renderBody()}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { marginTop: 30 },
    container2: { flexDirection: "row", marginHorizontal: 20, justifyContent: "center", alignItems: "center", },
    container3: { flexDirection: "row", marginHorizontal: 20, justifyContent: "flex-end", alignItems: "center", },
    imgContainer: { backgroundColor: "#474F70", padding: 5, borderRadius: 30 },
    txtStyle: { marginLeft: 15, fontSize: 15, fontWeight: "bold", fontFamily: "Roboto-Light" },
    btnLogin: { width: "35%", height: 30, paddingHorizontal: 10, elevation: 7, },
    btnLoginTxt: { color: Color.white, fontWeight: "bold", fontSize: 13, fontFamily: "Roboto-Light" },
    btnReg: { backgroundColor: "white", width: "35%", height: 30, marginLeft: 10, elevation: 7, },
    btnRegTxt: { color: Color.colorPrimaryMP, fontWeight: "bold", fontSize: 13, fontFamily: "Roboto-Light" },

});