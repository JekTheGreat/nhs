/* eslint-disable */
import React from "react";
import { View, Text, TouchableOpacity, Modal, Platform, Alert, FlatList, Dimensions } from "react-native";
import TxtInput from "__src/components/TxtInput";
import _ from "lodash";
import Dash from "react-native-dash";
import Resources from "__src/resources";
import { Icon } from "react-native-elements";
import { Colors } from "react-native-paper";
import Tab1 from './EmptyCartScreen';
import Tab2 from './EmptyCartScreen';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
const { Color } = Resources;
const { width, height } = Dimensions.get('window');
const test = ["1", "2", "3", "4", "5"];

class Test2 extends React.PureComponent {

    test = () => {
        Alert.alert("TEST")
        console.log("TEST")
    }

    render() {
        return (
            <View>
                <Text onPress={() => alert("FUCKTHISSHIT")} >Test2</Text>

                {_.map(test, (item, index) => {
                    return <View key={`${index}`} style={{ marginVertical: 10, flex: 1, flexDirection: "row", justifyContent: "space-between", }}>
                        <TouchableOpacity style={[Platform.OS = 'android' ? { width: 155 } : { width: 120 }, {
                            borderWidth: 1, borderColor: "#ccc", borderRadius: 5,
                        }]}
                            onPress={() => this.test()}>
                            <Text style={{ marginTop: 10, fontFamily: "Roboto-Light", fontSize: 13, alignSelf: "center" }}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    </View>
                })}

            </View>
        )
    }

}

export default Test2;