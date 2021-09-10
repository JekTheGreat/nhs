/* eslint-disable*/
/* eslint-disable react/prefer-es6-class */
import React from "react";
import { StyleSheet, Text, View, Animated, Image, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import Header from './Header';
import RenderTabsScreen from './RenderTabsScreen';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

class RenderNotifications extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const { actions, login: { session }, marketplace: { patchNotifications } } = this.props;
        if (!_.isEmpty(patchNotifications) && !_.isEqual(patchNotifications, prevProps.marketplace.patchNotifications)) {
            actions.getNotifications(session)
            delete patchNotifications.status;
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <Header {...this.props} />
                <RenderTabsScreen {...this.props} />
            </View>
        );
    }
};

export default RenderNotifications;
