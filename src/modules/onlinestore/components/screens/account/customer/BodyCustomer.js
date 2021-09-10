import React from 'react';
import { View, Text, ScrollView, Dimensions, Alert, TouchableOpacity, StyleSheet, Image, ImageBackground, FlatList } from 'react-native';
import { CheckBox, Icon, Avatar, ListItem } from "react-native-elements";
import _ from "lodash";
import PropTypes from 'prop-types';
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;
var { height, width } = Dimensions.get('window');
const myPurchasesList = ["Processing", "To Ship", "To Receive", "Delivered"];
const ReturnDisputeList = ["Return/Refund Pending", "Return/Refund Approved", "Return/Refund Declined", "Dispute Pending", "Dispute Approved", "Dispute Declined"];


export default class BodyCustomer extends React.PureComponent {

    click = (type, item, data, i) => {
        const { setInitialPage, dataFrom, label, navigation, actions } = this.props;
        console.log("click: ", type, item, data, i);
        setInitialPage(i);
        dataFrom(data);
        label(type);
        actions.setProfileScreen("renderTabs");
    }

    renderRow = (type, data) => ({ item, index }) => {
        let image;
        if (item === "Processing") {
            image = "processing";
        }
        else if (item === "To Ship") {
            image = "shipped";
        }
        else if (item === "To Receive") {
            image = "to_ship";
        }
        else if (item === "Delivered") {
            image = "delivered";
        }
        else if (item === "Return/Refund Pending") {
            image = "refund_pending";
        }
        else if (item === "Return/Refund Approved") {
            image = "refund_approved";
        }
        else if (item === "Return/Refund Declined") {
            image = "refund_declined";
        }
        else if (item === "Dispute Pending") {
            image = "despute_pending";
        }
        else if (item === "Dispute Approved") {
            image = "despute_approved";
        }
        else if (item === "Dispute Declined") {
            image = "despute_declined";
        }

        if (type === "My Purchases") {
            return (
                <ListItem onPress={() => this.click(type, item, data, index)}
                    titleStyle={{ color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light" }}
                    containerStyle={{ backgroundColor: Color.white, borderBottomColor: Colors.grey300, borderBottomWidth: .5 }}
                    key={`idx ${item}`} title={item}
                    chevron={<Icon name='chevron-right' type='evilicon' color={Color.Standard2} size={25} />}
                    leftAvatar={<Image style={{ width: 23, height: 23, padding: 2 }} source={Res.get(image)} resizeMode='contain' />}
                />
            );
        }
        else {
            return (
                <ListItem onPress={() => this.click(type, item, data, index)}
                    titleStyle={{ color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light" }}
                    containerStyle={{ backgroundColor: Color.white, borderBottomColor: Colors.grey300, borderBottomWidth: .5 }}
                    key={`idx ${item}`} title={item}
                    chevron={<Icon name='chevron-right' type='evilicon' color={Color.Standard2} size={25} />}
                    leftAvatar={<Image style={{ width: 23, height: 23, padding: 2 }} source={Res.get(image)} resizeMode='contain' />}
                />
            );
        }
    }

    render() {
        return (
            <View>
                <Text style={{ paddingLeft: 15, marginTop: 15, fontFamily: "Roboto", fontSize: 17, fontWeight: "bold" }}> My Purchases </Text>
                <View style={{ backgroundColor: Color.bg }}>
                    <FlatList
                        contentContainerStyle={{ marginTop: 15 }}
                        ListFooterComponent={<View style={{ backgroundColor: "transparent" }} />}
                        data={myPurchasesList}
                        renderItem={this.renderRow("My Purchases", myPurchasesList)}
                        keyExtractor={(item) => item} />
                </View>

                <Text style={{ paddingLeft: 15, marginTop: 15, fontFamily: "Roboto", fontSize: 17, fontWeight: "bold" }}> Returns/Dispute </Text>
                <View style={{ backgroundColor: Color.bg }}>
                    <FlatList
                        contentContainerStyle={{ marginTop: 15 }}
                        ListFooterComponent={<View style={{ backgroundColor: "transparent" }} />}
                        data={ReturnDisputeList}
                        renderItem={this.renderRow("Returns/Dispute", ReturnDisputeList)}
                        keyExtractor={(item) => item} />
                </View>
            </View>
        )
    }
}

BodyCustomer.propTypes = {
    onlinestore: PropTypes.object,
    navigation: PropTypes.object,
};