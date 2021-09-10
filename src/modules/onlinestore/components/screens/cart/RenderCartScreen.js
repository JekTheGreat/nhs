/* eslint-disable */import React, { PureComponent } from "react";
import { View, StyleSheet, Text, SafeAreaView, } from "react-native";
import Resource from "__src/resources";
import PropTypes from 'prop-types';
import _ from "lodash";
import CartScreen from './cartScreen/CartScreen';
import ModalTransactionSuccess from "./cartScreen/ModalTransactionSuccess";
const { Color, Res } = Resource;

export default class RenderCartScreen extends PureComponent {

    renderScreen = () => {
        const { onlinestore: { setOnlineStoreScreen } } = this.props;
        switch (setOnlineStoreScreen) {
            case "testScreen":
                return <Test ref={(e) => this.Test = e} {...this.props} />
            case "cartScreen":
            default:
                // return <ModalTransactionSuccess ref={(e) => this.ModalTransactionSuccess = e} {...this.props} />
                return <CartScreen ref={(e) => this.CartScreen = e}
                    goToPage={this.props.goToPage}
                    actions={this.props.actions}
                    navigation={this.props.navigation}
                    login={this.props.login}
                    onlinestore={this.props.onlinestore}
                    wallet={this.props.wallet} />
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Color.bg }}>
                {this.renderScreen()}
                {/* <Text>ASDF</Text> */}
                <SafeAreaView />
            </View>
        );
    }
}

RenderCartScreen.propTypes = {
    onlinestore: PropTypes.object,
};

