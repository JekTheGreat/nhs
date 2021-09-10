/* eslint-disable */
import React, { PureComponent } from "react";
import { ScrollView, View, Text, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import Button from "__src/components/Button";
import PropTypes from 'prop-types';
import { CheckBox, Icon } from "react-native-elements";
import MainScreenRegistered from "./MainScreenRegistered";
import EditRegistered from "./EditRegistered";
import _ from "lodash";
import Resources from "__src/resources";
const { Color, Res } = Resources;
import { Colors } from 'react-native-paper';
var { height, width } = Dimensions.get('window');


export default class RegisteredAddress extends PureComponent {
    state = { address: [] }

    setAddress = (to_change) => {
        this.setState({ address: to_change });
    }

    renderScreen = () => {
        const { actions, marketplace: { setManageAddressScreen } } = this.props;
        switch (setManageAddressScreen) {
            case "editAddress":
                return <EditRegistered addressID={this.state.address} ref={(e) => this.EditRegistered = e} {...this.props} />

            case "main":
            default:
                return <MainScreenRegistered setAddress={this.setAddress} ref={(e) => this.MainScreenRegistered = e} {...this.props} />
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: "white" }}>
                {this.renderScreen()}
            </View >
        )
    }
}
