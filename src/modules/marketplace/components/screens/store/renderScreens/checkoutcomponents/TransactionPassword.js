import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import _ from 'lodash';
import { Icon, CheckBox } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
var { height, width } = Dimensions.get('window');


export default class TransactionPassword extends React.PureComponent {

    state = {
        isSecure: true,

    }
    render() {
        const { transactionPass, errTP, onChangeText } = this.props;
        return (
            <View style={{ paddingHorizontal: 15, paddingVertical: 15, borderWidth: 1, borderColor: Colors.grey200 }}>
                <Text style={{ marginBottom: 15, color: Color.Standard2, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 16 }}>Transaction Password</Text>
                <TxtInput
                    style={{
                        backgroundColor: Colors.grey50, shadowOffset: { width: 1, height: 1, },
                        shadowColor: Colors.grey300, shadowOpacity: 1, borderRadius: 5, marginBottom: 15,
                    }}
                    style3={{ borderColor: Color.Standard, borderRadius: 5 }}
                    round
                    secureTextEntry={this.state.isSecure}
                    onPass={() => this.setState({ isSecure: !this.state.isSecure })}
                    returnKeyType='done'
                    icon="lock_icon"
                    icon2="view_icon"
                    err={errTP.tp}
                    compName="Password"
                    placeholder="******"
                    value={transactionPass}
                    onChangeText={(value) => onChangeText(value)}
                />
            </View>
        )
    }
}