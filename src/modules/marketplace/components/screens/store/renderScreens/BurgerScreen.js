import React from 'react';
import { ScrollView, View, Image, ImageBackground, Text, SafeAreaView, TouchableOpacity, StyleSheet, StatusBar, BackHandler } from 'react-native';
import _ from 'lodash';
import { withNavigationFocus } from 'react-navigation';
import { Icon } from 'react-native-elements';
import LoginButtons from './burgercomponents/LoginButtons';
import Resource from "__src/resources";
const { Color, Res } = Resource;


class BurgerMenu extends React.PureComponent {
    constructor(props) {
        super(props);
        // this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => { StatusBar.setTranslucent(false) });
    }

    // componentDidMount() {
    //     StatusBar.setTranslucent(true);
    // }

    // componentWillUnmount() {
    //     this.backHandler.remove()
    // }

    // componentDidUpdate(prevProps) {
    //     const { isFocused, navigation } = this.props;
    //     if (prevProps.isFocused !== isFocused && isFocused) {
    //         StatusBar.setTranslucent(true);
    //     } 
    // }

    _onBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
        // StatusBar.setTranslucent(false);
    }

    render() {
        return (
            // <ImageBackground style={styles.imgBG} source={Res.get("background_mp")} >
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={this._onBack}
                    style={styles.btnBack} >
                    <Icon type='ionicons' name='arrow-back' size={20} color='white' />
                </TouchableOpacity>
                <LoginButtons navigation={this.props.navigation} login={this.props.login} marketplace={this.props.marketplace} />
            </SafeAreaView>
            // </ImageBackground >
        )
    }
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white" },
    imgBG: { flex: 1, resizeMode: "stretch" },
    btnBack: { marginTop: 15, marginLeft: 20, backgroundColor: "#FFC914", width: 30, paddingVertical: 5, elevation: 10, borderRadius: 20 },

});


export default withNavigationFocus(BurgerMenu);