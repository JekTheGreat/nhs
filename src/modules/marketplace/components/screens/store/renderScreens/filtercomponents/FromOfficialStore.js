import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import HeaderShopDetails from './OfficialStoreComponents/HeaderShopDetails';
import TabsBody from './OfficialStoreComponents/TabsBody';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

export default class FromOfficialStore extends React.PureComponent {

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <HeaderShopDetails {...this.props} />
                <TabsBody {...this.props} />
            </View>
        )
    }
}