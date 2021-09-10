import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import Resource from "__src/resources";
const { Color, Res } = Resource;


export default class ShortcutButtons extends React.PureComponent {

    _gotoServices = () => {
        const { login: { isLoggedIn }, navigation } = this.props;
        if (!isLoggedIn) {
            navigation.navigate("BurgerMenu")
        }
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._gotoServices} style={styles.btnStyles}>
                    <Image style={styles.imgStyles} source={Res.get('services')} />
                    <Text>
                        Unified Services
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("ShopList")} style={styles.btnStyles}>
                    <Icon type='font-awesome' name='shopping-cart' size={20} color={Color.colorPrimaryMP} />
                    <Text>
                        Unified Stores
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginVertical: 10,
    },
    btnStyles: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-evenly",
        paddingVertical: 5, borderRadius: 10, backgroundColor: "white", elevation: 7, width: "40%"
    },
    imgStyles: { width: 20, height: 20, resizeMode: 'contain' },
})