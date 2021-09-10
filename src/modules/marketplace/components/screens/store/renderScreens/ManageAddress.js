/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, Dimensions, TouchableOpacity, Alert, SafeAreaView, Image, FlatList, StyleSheet } from 'react-native';
import Button from "__src/components/Button";
import PropTypes from 'prop-types';
import { Tab, Tabs, Spinner } from "native-base";
import { CheckBox, Icon } from "react-native-elements";
import _ from "lodash";
import AddAddress from './manageaddresscomponents/AddAddress';
import RegisteredAddress from './manageaddresscomponents/RegisteredAddress';
import Resources from "__src/resources";
const { Color, Res } = Resources;
import { Colors } from 'react-native-paper';
var { height, width } = Dimensions.get('window');
const tabLabels = ["Add New Address", "Registered Address"];

export default class ManageAddress extends PureComponent {

    componentWillUnmount() {
        const { actions } = this.props;
        actions.setManageAddressScreen("main");
    }

    componentDidUpdate(prevProps) {
        const { actions, login: { session, additionalDetails }, marketplace: { patchAddress, setManageAddressScreen, deleteAddress } } = this.props;
        if (!_.isEqual(prevProps.marketplace.patchAddress, patchAddress) && !_.isEmpty(patchAddress)) {
            if (_.isEqual(patchAddress.status, 1)) {
                actions.getDeliveryAddress(session, additionalDetails.individualId);
                if (setManageAddressScreen === "editAddress") {
                    Alert.alert("Address Update Status", patchAddress.result);
                    actions.setManageAddressScreen("main");
                } else {
                    actions.setInputDetails({});
                }
            }
            else {
                Alert.alert("Error", patchAddress.result);
            }
            delete patchAddress.status
        }

        if (!_.isEqual(prevProps.marketplace.deleteAddress, deleteAddress) && !_.isEmpty(deleteAddress)) {
            if (_.isEqual(deleteAddress.status, 1)) {
                actions.getDeliveryAddress(session, additionalDetails.individualId);
                Alert.alert("Address Status", deleteAddress.result);
                actions.setManageAddressScreen("main");
                actions.setInputDetails({});
            }
            else {
                Alert.alert("Error", deleteAddress.result);
            }
            delete deleteAddress.status
        }
    }

    renderTab = (item) => {
        switch (item) {
            case "Add New Address":
                return <AddAddress key={item} tabLabel={item} ref={(e) => this.AddAddress = e} {...this.props} />;
            case "Registered Address":
                return <RegisteredAddress key={item} tabLabel={item} ref={(e) => this.RegisteredAddress = e} {...this.props} />;
        }
    }


    renderTabs = () => {
        return <Tabs
            tabBarUnderlineStyle={styles2.tabBarUnderlineStyle}
            style={styles2.TabsStyle}
            locked
            tabBarActiveTextColor={Color.colorPrimaryMP}
            tabBarInactiveTextColor={Color.Standard2}>
            {tabLabels.map((item, idx) => {
                return (
                    <Tab key={`idx ${idx}`}
                        heading={`${item}`}
                        tabStyle={styles2.tabStyle}
                        textStyle={styles2.textStyle}
                        activeTextStyle={{ fontSize: 14, color: Color.colorPrimaryMP }}
                        activeTabStyle={{ backgroundColor: Color.white }}>
                        {this.renderTab(item)}
                    </Tab>
                );
            })}
        </Tabs>;
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                {this.renderTabs()}
                {/* {transactionInProgress ?
                <View style={{
                    position: "absolute",
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)', width: width, height: height
                }}>
                    <Spinner
                        color={"black"}
                        size="small"
                        animating={transactionInProgress} />
                </View> : null} */}
            </View>
        )
    }
}


const styles2 = StyleSheet.create({
    tabBarUnderlineStyle: { height: 1, backgroundColor: Color.colorPrimaryMP },
    tabStyle: { backgroundColor: Color.white },
    TabsStyle: { backgroundColor: Color.white, alignItems: "center", justifyContent: "center" },
    textStyle: { color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12, fontWeight: "bold" },
});