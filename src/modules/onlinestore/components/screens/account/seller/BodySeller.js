import React from 'react';
import { View, Text, ScrollView, Dimensions, Alert, TouchableOpacity, StyleSheet, Image, ImageBackground, FlatList } from 'react-native';
import { CheckBox, Icon, Avatar, ListItem } from "react-native-elements";
import _ from "lodash";
import PropTypes from 'prop-types';
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;
var { height, width } = Dimensions.get('window');
const myProductsList = ["Add New Product", "Manage Product"];
const mySalesList = ["Processing", "To Ship", "To Receive", "Delivered", "Cancelled"];
const Returns = ["Return/Refund Pending", "Return/Refund Approved", "Return/Refund Declined"];


export default class BodySeller extends React.PureComponent {

    click = (type, i) => {
        const { navigation } = this.props;
        console.log("click: ", type, i);

        // switch (type) {
        // 	case "Processing":
        // 		navigation.navigate("Processing", { title: type });
        // 		break;
        // 	default:
        // 		Alert.alert("Notice", "This service is under construction.");
        // 		break;
        // }
    }

    renderRow = (type) => ({ item, index }) => {
        let image;
        switch (item) {
            case "Add New Product":
                image = "add_product";
                break;
            case "Manage Product":
                image = "manage_product";
                break;

            case "Processing":
                image = "processing";
                break;
            case "To Ship":
                image = "shipped";
                break;
            case "To Receive":
                image = "to_ship";
                break;
            case "Delivered":
                image = "delivered";
                break;
            case "Cancelled":
                image = "store_cancelled";
                break;

            case "Return/Refund Pending":
                image = "refund_pending";
                break;
            case "Return/Refund Approved":
                image = "refund_approved";
                break;
            case "Return/Refund Declined":
                image = "refund_declined";
                break;

        }


        if (type === "myProducts") {
            return (
                <ListItem onPress={() => this.click(item, index)}
                    titleStyle={{ color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light" }}
                    containerStyle={{ backgroundColor: Color.white, borderBottomColor: Colors.grey300, borderBottomWidth: .5 }}
                    key={`idx ${item}`} title={item}
                    chevron={<Icon name='chevron-right' type='evilicon' color={Color.Standard2} size={25} />}
                    leftAvatar={<Image style={{ width: 23, height: 23, padding: 2 }} source={Res.get(image)} resizeMode='contain' />}
                />
            );
        }
        else if (type === "mySales") {
            return (
                <ListItem onPress={() => this.click(item, index)}
                    titleStyle={{ color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light" }}
                    containerStyle={{ backgroundColor: Color.white, borderBottomColor: Colors.grey300, borderBottomWidth: .5 }}
                    key={`idx ${item}`} title={item}
                    chevron={<Icon name='chevron-right' type='evilicon' color={Color.Standard2} size={25} />}
                    leftAvatar={<Image style={{ width: 23, height: 23, padding: 2 }} source={Res.get(image)} resizeMode='contain' />}
                />
            );
        }
        else if (type === "returns") {
            return (
                <ListItem onPress={() => this.click(item, index)}
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
                <Text style={{ paddingLeft: 15, marginTop: 15, fontFamily: "Roboto", fontSize: 17, fontWeight: "bold" }}> My Products </Text>
                <View style={{ backgroundColor: Color.bg }}>
                    <FlatList
                        contentContainerStyle={{ marginTop: 15 }}
                        ListFooterComponent={<View style={{ backgroundColor: "transparent" }} />}
                        data={myProductsList}
                        renderItem={this.renderRow("myProducts")}
                        keyExtractor={(item) => item} />
                </View>

                <Text style={{ paddingLeft: 15, marginTop: 15, fontFamily: "Roboto", fontSize: 17, fontWeight: "bold" }}> My Sales </Text>
                <View style={{ backgroundColor: Color.bg }}>
                    <FlatList
                        contentContainerStyle={{ marginTop: 15 }}
                        ListFooterComponent={<View style={{ backgroundColor: "transparent" }} />}
                        data={mySalesList}
                        renderItem={this.renderRow("mySales")}
                        keyExtractor={(item) => item} />
                </View>

                <Text style={{ paddingLeft: 15, marginTop: 15, fontFamily: "Roboto", fontSize: 17, fontWeight: "bold" }}> Returns </Text>
                <View style={{ backgroundColor: Color.bg }}>
                    <FlatList
                        contentContainerStyle={{ marginTop: 15 }}
                        ListFooterComponent={<View style={{ backgroundColor: "transparent" }} />}
                        data={Returns}
                        renderItem={this.renderRow("returns")}
                        keyExtractor={(item) => item} />
                </View>
            </View>
        )
    }
}

BodySeller.propTypes = {
    onlinestore: PropTypes.object,
    navigation: PropTypes.object,
};