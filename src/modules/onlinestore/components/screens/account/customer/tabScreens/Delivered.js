/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;

class Delivered extends PureComponent {

    render() {
        const { onSearch, toSearch, onlinestore: { getPurchaseList } } = this.props
        const data = _.filter(getPurchaseList.data, item => {
            if ((item.status === "Delivered") && _.isEmpty(toSearch)) {
                return item;
            }
        })
        const toDisplay = _.isEmpty(onSearch) ? data : onSearch;
        console.log("onDelivering", toDisplay)
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <Text> Delivered </Text>
                <SafeAreaView style={{ flex: 1 }} />
            </View>

        );
    }
}

Delivered.propTypes = {
    onlinestore: PropTypes.object,
    navigation: PropTypes.object,
};

export default Delivered;