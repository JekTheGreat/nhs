import React from 'react';
import { View, Text, TouchableOpacity, Image, Easing, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
import MyCollectionList from './MyCollectionsListScreen';
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class MyCollections extends React.PureComponent {

    _onPress = () => {
        const { actions, navigation, login: { session } } = this.props;
        navigation.navigate("ViewCollection", { title: "Add New Album" })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }} >
                <MyCollectionList {...this.props} />
                <SafeAreaView style={{ flex: 1 }} />
                <TouchableOpacity onPress={this._onPress}
                    style={{ justifyContent: "center", alignItems: "center", backgroundColor: Color.colorPrimaryMP, width: width, height: 40 }} >
                    <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>+ Add New Album</Text>
                </TouchableOpacity>
            </View>
        )
    }
}