import React, { PureComponent } from "react";
import { ScrollView, View, Text, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import Button from "__src/components/Button";
import PropTypes from 'prop-types';
import { CheckBox, Icon } from "react-native-elements";
import _ from "lodash";
import Resources from "__src/resources";
const { Color, Res } = Resources;
import { Colors } from 'react-native-paper';
var { height, width } = Dimensions.get('window');


export default class MainScreenRegistered extends PureComponent {


    _onCheck = (item, index) => {
        const { actions, marketplace: { setCartListOnCheck }, login: { session, additionalDetails } } = this.props;
        let param = {};
        param.selected = true;
        actions.patchAddress(item.id, session, param)
    }

    _deleteAddress = (item) => {
        const { actions, login: { session } } = this.props;
        actions.deleteAddress(item.id, session);
    }

    _editAddress = (item) => {
        const { setAddress, actions, marketplace: { setManageAddressScreen } } = this.props;
        setAddress({
            id: item.id, name: item.name, address: item.address, city: item.city, contactFName: item.contactFName,
            contactLName: item.contactLName, contactMName: item.contactMName, contactNo: item.contactNo, region: item.region, email: item.email
        });
        actions.setManageAddressScreen("editAddress");
    }

    _renderRegAddress = ({ item, index }) => {
        return (
            <View key={`reg_address_id ${index}`} style={{ flexDirection: "row", alignItems: "center" }} >
                <CheckBox
                    containerStyle={{ paddingVertical: 0, borderColor: "transparent", backgroundColor: "transparent" }}
                    checkedColor={Color.colorPrimaryMP}
                    checked={item.selected}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={() => this._onCheck(item, index)} />
                <Text style={{ marginLeft: 5, width: "65%", fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2 }}>
                    {item.name}
                </Text>
                <View style={{ width: "15%", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }} >
                    <TouchableOpacity onPress={() => this._editAddress(item)}>
                        <Image source={Res.get("edit_address")} style={{ height: 15, width: 15, }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this._deleteAddress(item)}>
                        <Image source={Res.get("delete_address")} style={{ height: 15, width: 10 }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { marketplace: { getDeliveryAddress } } = this.props;
        return (
            <View style={{ backgroundColor: "white" }}>
                <View style={{ flexDirection: "row", alignItems: "center", height: 50, width: width, borderBottomWidth: 1, borderBottomColor: Colors.grey400 }}>
                    <Text style={{ width: "20%", textAlign: "center", fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2 }}>Default</Text>
                    <Text style={{ width: "60%", fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2 }}>Address Name</Text>
                    <Text style={{ width: "20%", textAlign: "center", fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2 }}>Controls</Text>
                </View>
                <FlatList
                    style={{ paddingHorizontal: 10, marginTop: 10 }}
                    data={getDeliveryAddress}
                    keyExtractor={(index) => { `reg_address_id ${index}` }}
                    renderItem={this._renderRegAddress} />
            </View >
        )
    }
}