/* eslint-disable*/
/* eslint-disable react/prefer-es6-class */
import React from "react";
import { StyleSheet, Text, View, Animated, Image, Alert, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import Header from './Header';
import ProfilePicture from './ProfilePicture';
import ListItems from './ListItems';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

class RenderAccount extends React.PureComponent {

    componentWillMount() {
        const { actions, login: { session } } = this.props;
        actions.getSettings(session);
    }

    componentDidUpdate(prevProps) {
        const { actions, tabLabel, navigation, login: { session }, marketplace: { setSelectedItems, setInputDetails, postSelectedProducts, countCart } } = this.props;
        console.log("PROPS", this.props)
        if (setInputDetails.route === "Account" && !_.isEmpty(postSelectedProducts) && !_.isEqual(prevProps.marketplace.postSelectedProducts, postSelectedProducts)) {
            if (postSelectedProducts.status === 0) {
                Alert.alert("Error", postSelectedProducts.result);
            } else {
                actions.getFavorites(session)
                navigation.navigate("PreviewProducts", { header: setSelectedItems.header, countCart: countCart });
            }
            delete postSelectedProducts.status;
            delete postSelectedProducts.total;

        }
    }

    _changeUserSide = () => {
        const { actions, marketplace: { setUserSide } } = this.props;
        actions.setUserSide(!setUserSide);
    }


    render() {
        const { navigation, marketplace: { setUserSide } } = this.props;
        const userSide = setUserSide ? "Customer" : "Seller";
        const userRole = setUserSide ? "Seller" : "Customer";
        return (
            <View style={{ flex: 1, backgroundColor: "white" }} >
                <Header {...this.props} />
                <ProfilePicture userRole={userRole} {...this.props} />
                <ListItems changeUserSide={this._changeUserSide} userRole={userRole} userSide={userSide} {...this.props} />
            </View>
        );
    }
};

export default RenderAccount;
