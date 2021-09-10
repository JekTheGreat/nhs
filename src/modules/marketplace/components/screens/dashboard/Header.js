import React from 'react';
import { View, Text, TouchableOpacity, Image, Easing, StyleSheet } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

export default class Header extends React.PureComponent {

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ height: 50, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: Color.colorPrimaryMP }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 13 }}>
                    <Image style={{ width: 18, height: 18, }} source={Res.get("back")} resizeMode="contain" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, color: "black", fontWeight: "bold", fontFamily: "Roboto" }}>Dashboard</Text>
            </View>
        )
    }
}