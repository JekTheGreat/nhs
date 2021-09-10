/* eslint-disable */
import React, { PureComponent } from "react";
import { ScrollView, View, Text, Dimensions, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import Button from "__src/components/Button";
import TxtInput from "__src/components/TxtInput";
import Dropdown from "__src/components/Dropdown";
import PropTypes from 'prop-types';
import validator from "validator";
import { CheckBox, Icon } from "react-native-elements";
import { regions, provinces, municipalities } from 'psgc';
import _ from "lodash";
import Resources from "__src/resources";
const { Color, Res } = Resources;
import { Colors } from 'react-native-paper';
var { height, width } = Dimensions.get('window');


export default class EditRegistered extends PureComponent {

    state = {
        error: {},
        municipalities: [],
        name: "",
        contactFName: "",
        contactMName: "",
        contactLName: "",
        contactNo: "",
        email: "",
        region: "",
        city: "",
        address: "",
    }


    componentWillMount() {
        const { addressID, actions, marketplace: { setInputDetails } } = this.props;
        let prov = []
        provinces.all().filter((loc) => addressID.region === loc.region).find((mun, i, item) =>
            _.map(item, (municip) => {
                prov.push(municip.municipalities)
            })
        )
        const merged = prov.flat(1);
        this.setState({ municipalities: merged });
    }

    _saveChanges = () => {
        const { addressID, actions, login: { session, additionalDetails } } = this.props;
        const { error, name, contactFName, contactMName, contactLName, contactNo, email, region, city, address } = this.state;
        let param = {}
        const err = _.merge({}, error);
        const contactRegex = new RegExp('^[0-9]+$');
        if (!_.isEmpty(email)) {
            delete err.email
            if (!validator.isEmail(email)) {
                err.email = "Invalid Email Format";
            }
        }
        if (!_.isEmpty(contactNo)) {
            delete err.contactNo
            if (!contactNo.match(contactRegex)) {
                err.contactNo = "Invalid Contact Number";
            }
        }
        this.setState({ error: err });
        console.log("addressID", addressID.city)
        if (_.isEmpty(err)) {
            param.name = !_.isEmpty(name) ? name : addressID.name;
            param.contactFName = !_.isEmpty(contactFName) ? contactFName : addressID.contactFName;
            param.contactMName = !_.isEmpty(contactMName) ? contactMName : addressID.contactMName;
            param.contactLName = !_.isEmpty(contactLName) ? contactLName : addressID.contactLName;
            param.contactNo = !_.isEmpty(contactNo) ? contactNo : addressID.contactNo;
            param.email = !_.isEmpty(email) ? email : addressID.email;
            param.region = !_.isEmpty(region) ? region : addressID.region;
            param.city = !_.isEmpty(city) ? city : !_.isUndefined(addressID.city) ? addressID.city : "";
            param.address = !_.isEmpty(address) ? address : addressID.address;
            actions.patchAddress(addressID.id, session, param)
        }
    }

    _onChange = (val, paramType) => {
        switch (paramType) {
            case "name":
                this.setState({ name: val })
                break;
            case "contactFName":
                this.setState({ contactFName: val })
                break;
            case "contactMName":
                this.setState({ contactMName: val })
                break;
            case "contactLName":
                this.setState({ contactLName: val })
                break;
            case "contactNo":
                this.setState({ contactNo: val })
                break;
            case "email":
                this.setState({ email: val })
                break;
            case "address":
                this.setState({ address: val })
                break;
        }
    }

    onLeave = (val, paramType) => {
        const { error, contactNo, email } = this.state;
        const err = _.merge({}, error);
        const contactRegex = new RegExp('^[0-9]+$');
        if (!_.isEmpty(email) && paramType === "email") {
            delete err[paramType]
            if (!validator.isEmail(email)) {
                err[paramType] = "Invalid Email Format";
            }
        }
        if (!_.isEmpty(contactNo) && paramType === "contactNo") {
            delete err[paramType]
            if (!contactNo.match(contactRegex)) {
                err[paramType] = "Invalid Contact Number";
            }
        }
        this.setState({ error: err });
    }

    _renderEdit = ({ item, index }) => {
        const { actions, addressID } = this.props;
        const { error, name, contactFName, contactMName, contactLName, contactNo, email, city, address } = this.state;
        return (
            <View key={`edit_address_id ${index}`}>

                <Text style={{ marginTop: 10, fontSize: 13, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                    Address Name
                    </Text>
                <TxtInput
                    style={{
                        marginTop: 10, shadowColor: Colors.grey300, shadowOpacity: 1, borderRadius: 5,
                        shadowOffset: { width: 1, height: 1, }
                    }}
                    style3={{ backgroundColor: "white", borderColor: Color.Standard, borderRadius: 5, }}
                    round
                    isText
                    returnKeyType="next"
                    placeholder={item.name || "Enter Address Name"}
                    onChangeText={(value) => this._onChange(value, "name")}
                    value={name} />

                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ width: width / 3.5 }}>
                        <Text style={{ marginTop: 10, fontSize: 13, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                            First Name
                        </Text>
                        <TxtInput
                            style={{
                                marginTop: 10, shadowColor: Colors.grey300, shadowOpacity: 1, borderRadius: 5,
                                shadowOffset: { width: 1, height: 1, }
                            }}
                            style3={{ backgroundColor: "white", borderColor: Color.Standard, borderRadius: 5, }}
                            round
                            isText
                            returnKeyType="next"
                            placeholder={item.contactFName || "Enter First Name"}
                            onChangeText={(value) => this._onChange(value, "contactFName")}
                            value={contactFName} />
                    </View>

                    <View style={{ width: width / 3.5 }}>
                        <Text style={{ marginTop: 10, fontSize: 13, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                            Middle Name
                        </Text>
                        <TxtInput
                            style={{
                                marginTop: 10, shadowColor: Colors.grey300, shadowOpacity: 1, borderRadius: 5,
                                shadowOffset: { width: 1, height: 1, }
                            }}
                            style3={{ backgroundColor: "white", borderColor: Color.Standard, borderRadius: 5, }}
                            round
                            isText
                            returnKeyType="next"
                            placeholder={item.contactMName || "Enter Middle Name"}
                            onChangeText={(value) => this._onChange(value, "contactMName")}
                            value={contactMName} />
                    </View>

                    <View style={{ width: width / 3.5 }}>
                        <Text style={{ marginTop: 10, fontSize: 13, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                            Last Name
                        </Text>
                        <TxtInput
                            style={{
                                marginTop: 10, shadowColor: Colors.grey300, shadowOpacity: 1, borderRadius: 5,
                                shadowOffset: { width: 1, height: 1, }
                            }}
                            style3={{ backgroundColor: "white", borderColor: Color.Standard, borderRadius: 5, }}
                            round
                            isText
                            returnKeyType="next"
                            placeholder={item.contactLName || "Enter Last Name"}
                            onChangeText={(value) => this._onChange(value, "contactLName")}
                            value={contactLName} />
                    </View>
                </View>


                <Text style={{ marginTop: 10, fontSize: 13, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                    Contact Number
                </Text>
                <TxtInput
                    style={{
                        marginTop: 10, shadowColor: Colors.grey300, shadowOpacity: 1, borderRadius: 5,
                        shadowOffset: { width: 1, height: 1, }
                    }}
                    style3={{ backgroundColor: "white", borderColor: Color.Standard, borderRadius: 5, }}
                    round
                    isText
                    returnKeyType="next"
                    keyboardType={"phone-pad"}
                    placeholder={item.contactNo || "Enter Contact Number"}
                    onBlur={() => this.onLeave(item, "contactNo")}
                    err={error.contactNo || ""}
                    compName={error.contactNo ? "Error" : ""}
                    onChangeText={(value) => this._onChange(value, "contactNo")}
                    value={contactNo} />

                <Text style={{ marginTop: 10, fontSize: 13, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                    Email Address
                </Text>
                <TxtInput
                    style={{
                        marginTop: 10, shadowColor: Colors.grey300, shadowOpacity: 1, borderRadius: 5,
                        shadowOffset: { width: 1, height: 1, }
                    }}
                    style3={{ backgroundColor: "white", borderColor: Color.Standard, borderRadius: 5, }}
                    round
                    returnKeyType="next"
                    isText
                    onBlur={() => this.onLeave(item, "email")}
                    err={error.email || ""}
                    compName={error.email ? "Error" : ""}
                    placeholder={item.email || "Enter Email Address"}
                    onChangeText={(value) => this._onChange(value, "email")}
                    value={email} />

                <Text style={{ marginTop: 10, fontSize: 13, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                    Region
                </Text>
                <Dropdown
                    animated={true}
                    renderBase={this.renderBase.bind(this, "region")}
                    dropdownStyle={{ height: 125 }}
                    options={regions.all()}
                    renderButtonText={this.onChange.bind(this, "region")}
                    renderRow={this.renderRow.bind(this, "region")}
                    renderSeparator={null} />

                <Text style={{ marginTop: 10, fontSize: 13, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                    Municipality
                </Text>

                <Dropdown
                    animated={true}
                    renderBase={this.renderBase.bind(this, "city")}
                    dropdownStyle={{ height: 125 }}
                    options={this.state.municipalities}
                    renderButtonText={this.onChange.bind(this, "city")}
                    renderRow={this.renderRow.bind(this, "city")}
                    renderSeparator={null} />

                <Text style={{ marginTop: 10, fontSize: 13, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                    Full Address
                </Text>
                <TxtInput
                    style={{
                        marginTop: 10, shadowColor: Colors.grey300, shadowOpacity: 1, borderRadius: 5,
                        shadowOffset: { width: 1, height: 1, }
                    }}
                    style3={{ backgroundColor: "white", borderColor: Color.Standard, borderRadius: 5, }}
                    round
                    multiline
                    textContentType="addressCity"
                    isText
                    returnKeyType="next"
                    placeholder={item.address || "Enter Full Address"}
                    onChangeText={(value) => this._onChange(value, "address")}
                    value={address} />
            </View>
        )
    }

    renderBase(type) {
        const { addressID, marketplace: { setInputDetails } } = this.props;
        const { region, city } = this.state;
        if (type === "region") {
            return (
                <View style={{
                    flexDirection: "row", width: "100%", height: 40, alignItems: "center", alignSelf: "center", borderColor: Color.Standard,
                    borderWidth: 0.6, borderRadius: 5, paddingHorizontal: 5, marginTop: 10
                }}>
                    <Text style={[_.isEmpty(region) ? { color: Colors.grey500 } : {}, { flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingLeft: 5 }]}>
                        {_.isEmpty(region) ? addressID.region : !_.isEmpty(region) ? `${region}` :
                            (_.isEmpty(region) && _.isEmpty(addressID.region)) && "Enter Region"}
                    </Text>
                    <Icon type='material' name='expand-more' color={"black"} size={27} />
                </View>
            );
        } else {
            return (
                <View style={{
                    flexDirection: "row", width: "100%", height: 40, alignItems: "center", alignSelf: "center", borderColor: Color.Standard,
                    borderWidth: 0.6, borderRadius: 5, paddingHorizontal: 5, marginTop: 10
                }}>
                    <Text style={[_.isEmpty(city) ? { color: Colors.grey500 } : {}, { flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingLeft: 5 }]}>
                        {_.isEmpty(city) ? addressID.city : !_.isEmpty(city) ? `${city}` :
                            ((_.isEmpty(city) && _.isEmpty(addressID.city))) && "Enter City"}
                    </Text>
                    <Icon type='material' name='expand-more' color={"black"} size={27} />
                </View>
            );
        }

    }

    renderRow(type, rowData, rowID, highlighted) {
        if (type === "region") {
            return (
                <View style={[{ paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white" },
                highlighted && { backgroundColor: Color.highlight }]}>
                    <Text style={[{ margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center" },
                        highlighted]}>
                        {`${rowData.designation}`}
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={[{ paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white" },
                highlighted && { backgroundColor: Color.highlight }]}>
                    <Text style={[{ margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center" },
                        highlighted]}>
                        {`${rowData}`}
                    </Text>
                </View>
            );
        }
    }

    onChange(type, value) {
        const { addressID } = this.props;
        if (type === "region") {
            if (value.designation !== addressID.region) {
                delete addressID.city;
            }
            this.setState({ region: value.designation, city: "" })
            let prov = []
            provinces.all().filter((loc) => value.designation === loc.region).find((mun, i, item) =>
                _.map(item, (municip) => {
                    prov.push(municip.municipalities)
                })
            )
            const merged = prov.flat(1);
            this.setState({ municipalities: merged });
        } else {
            this.setState({ city: value })
        }
    }


    render() {
        const { addressID, actions } = this.props;
        return (
            <View style={{ backgroundColor: "white" }}>
                <View style={{ height: "80%" }}>
                    <FlatList
                        style={{ paddingHorizontal: 15 }}
                        data={[addressID]}
                        keyExtractor={(index) => { `edit_address_id ${index}` }}
                        renderItem={this._renderEdit} />
                </View>

                <View style={{ height: "20%", justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => this._saveChanges()} style={{ justifyContent: "center", alignItems: "center", height: 30, width: "90%", backgroundColor: Color.colorPrimaryMP, borderRadius: 5 }}>
                        <Text style={{ color: "white" }}> Save Changes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => actions.setManageAddressScreen("main")} style={{ marginTop: 10, justifyContent: "center", alignItems: "center", height: 30, width: "90%", backgroundColor: "white", borderRadius: 5, borderWidth: 1, borderColor: Color.colorPrimaryMP }}>
                        <Text style={{ color: Color.colorPrimaryMP }}>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </View >
        )
    }
}
