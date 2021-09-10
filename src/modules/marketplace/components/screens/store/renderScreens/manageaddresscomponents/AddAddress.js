/* eslint-disable */
import React, { PureComponent } from "react";
import { ScrollView, View, Text, Dimensions, TouchableOpacity, Image, FlatList, Alert, SafeAreaView } from 'react-native';
import Button from "__src/components/Button";
import TxtInput from "__src/components/TxtInput";
import Dropdown from "__src/components/Dropdown";
import validator from "validator";
import PropTypes from 'prop-types';
import { CheckBox, Icon } from "react-native-elements";
import { regions, provinces, municipalities } from 'psgc';
import _ from "lodash";
import Resources from "__src/resources";
const { Color, Res } = Resources;
import { Colors } from 'react-native-paper';
var { height, width } = Dimensions.get('window');


export default class AddAddress extends PureComponent {


    state = {
        municipalities: [],
        error: {},
        param: {
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
    }

    componentDidUpdate(prevProps) {
        const { actions, login: { session, additionalDetails }, marketplace: { addAddress } } = this.props;
        const { param } = this.state;
        const params = _.merge({}, param)
        if (!_.isEqual(prevProps.marketplace.addAddress, addAddress) && !_.isEmpty(addAddress)) {
            if (_.isEqual(addAddress.status, 1)) {
                _.map(Object.keys(param), key => {
                    params[key] = "";
                })
                this.setState({ param: params })
                actions.getDeliveryAddress(session, additionalDetails.individualId);
                Alert.alert("Success", "Address Added Successfully.");
            }
            else {
                Alert.alert("Error", addAddress.result);
            }
            delete addAddress.status
        }
    }


    _saveChanges = () => {
        const { actions, login: { session, additionalDetails } } = this.props;
        const { param, error } = this.state;
        const err = _.merge({}, error)
        _.map(Object.keys(param), key => {
            console.log("key", _.isEmpty(param[key]))
            if (_.isEmpty(param[key])) {
                err[key] = "This field is required";
            }
        })
        this.setState({ error: err })
        if (_.isEmpty(err)) {
            actions.addAddress(session, param);
        }
    }

    _onChange = (val, paramType) => {
        const { param } = this.state;
        const params = _.merge({}, param);
        params[paramType] = val;
        this.setState({ param: params })
    }

    onLeave = (val, paramType) => {
        const { error, param } = this.state;
        const params = _.merge({}, param);
        const err = _.merge({}, error);
        const errMess = "This field is required.";
        const contactRegex = new RegExp('^[0-9]+$');
        delete err[paramType]
        if (!_.isEmpty(param[paramType]) && paramType === "email") {
            delete err[paramType]
            if (!validator.isEmail(param[paramType])) {
                err[paramType] = "Invalid Email Format";
            }
        }
        if (!_.isEmpty(param[paramType]) && paramType === "contactNo") {
            delete err[paramType]
            if (!params[paramType].match(contactRegex)) {
                err[paramType] = "Invalid Contact Number";
            }
        }
        else {
            if (_.isEmpty(param[paramType])) {
                err[paramType] = errMess;
            }
        }
        this.setState({ error: err });
    }

    _renderEdit = ({ item, index }) => {
        const { error, param } = this.state;
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
                    onBlur={() => this.onLeave(item, "name")}
                    placeholder={"Enter Address Name"}
                    err={error.name || ""}
                    compName={error.name ? "Error" : ""}
                    onChangeText={(value) => this._onChange(value, "name")}
                    value={param.name} />

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
                            placeholder={"Enter First Name"}
                            onBlur={() => this.onLeave(item, "contactFName")}
                            onChangeText={(value) => this._onChange(value, "contactFName")}
                            err={error.contactFName || ""}
                            compName={error.contactFName ? "Error" : ""}
                            value={param.contactFName} />
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
                            placeholder={"Enter Middle Name"}
                            onBlur={() => this.onLeave(item, "contactMName")}
                            onChangeText={(value) => this._onChange(value, "contactMName")}
                            err={error.contactMName || ""}
                            compName={error.contactMName ? "Error" : ""}
                            value={param.contactMName} />
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
                            placeholder={"Enter Last Name"}
                            onBlur={() => this.onLeave(item, "contactLName")}
                            err={error.contactLName || ""}
                            compName={error.contactLName ? "Error" : ""}
                            onChangeText={(value) => this._onChange(value, "contactLName")}
                            value={param.contactLName} />
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
                    keyboardType={"phone-pad"}
                    returnKeyType="next"
                    placeholder={"Enter Contact Number"}
                    onBlur={() => this.onLeave(item, "contactNo")}
                    onChangeText={(value) => this._onChange(value, "contactNo")}
                    err={error.contactNo || ""}
                    compName={error.contactNo ? "Error" : ""}
                    value={param.contactNo} />

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
                    placeholder={"Enter Email Address"}
                    onBlur={() => this.onLeave(item, "email")}
                    onChangeText={(value) => this._onChange(value, "email")}
                    err={error.email || ""}
                    compName={error.email ? "Error" : ""}
                    value={param.email} />

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
                    placeholder={"Enter Full Address"}
                    onBlur={() => this.onLeave(item, "address")}
                    onChangeText={(value) => this._onChange(value, "address")}
                    err={error.address || ""}
                    compName={error.address ? "Error" : ""}
                    value={param.address} />
            </View>
        )
    }

    renderBase(type) {
        const { addressID, marketplace: { setInputDetails } } = this.props;
        const { param, error } = this.state;
        return (
            <View style={[!_.isEmpty(error[type]) ? { borderColor: "red" } : { borderColor: Color.Standard }, {
                flexDirection: "row", width: "100%", height: 40, alignItems: "center", alignSelf: "center",
                borderWidth: 0.6, borderRadius: 5, paddingHorizontal: 5, marginTop: 10
            }]}>
                <Text style={[_.isEmpty(param[type]) ? { color: Colors.grey500 } : { color: "black" }, { flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingLeft: 5 }]}>
                    {!_.isEmpty(param[type]) ? `${param[type]}` :
                        _.isEmpty(param[type]) && `Enter ${type}`}
                </Text>
                {!_.isEmpty(error[type]) ? <Icon name='close-o' type='evilicon' color="red" size={27} /> :
                    <Icon type='material' name='expand-more' color={"black"} size={27} />}
            </View>
        );
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
        const { param } = this.state;
        const params = _.merge({}, param)
        if (type === "region") {
            params[type] = value.designation;
            params.city = ""
            this.setState({ param: params })
            let prov = []
            provinces.all().filter((loc) => value.designation === loc.region).find((mun, i, item) =>
                _.map(item, (municip) => {
                    prov.push(municip.municipalities)
                })
            )
            const merged = prov.flat(1);
            this.setState({ municipalities: merged });
        } else {
            params[type] = value;
            this.setState({ param: params })
        }
        delete this.state.error[type];
    }


    render() {
        const { actions, navigation } = this.props;
        const { param, error } = this.state;
        console.log("ERR", error)
        console.log("STATE", this.state)
        console.log("PARAM", param)
        return (
            <View style={{ backgroundColor: "white" }}>
                <View style={{ height: "80%" }}>
                    <FlatList
                        style={{ paddingHorizontal: 15 }}
                        data={[param]}
                        keyExtractor={(index) => { `edit_address_id ${index}` }}
                        renderItem={this._renderEdit} />
                </View>

                <View style={{ height: "20%", justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => this._saveChanges()} style={{ justifyContent: "center", alignItems: "center", height: 30, width: "90%", backgroundColor: Color.colorPrimaryMP, borderRadius: 5 }}>
                        <Text style={{ color: "white" }}> Save Changes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("CheckOut")} style={{ marginTop: 10, justifyContent: "center", alignItems: "center", height: 30, width: "90%", backgroundColor: "white", borderRadius: 5, borderWidth: 1, borderColor: Color.colorPrimaryMP }}>
                        <Text style={{ color: Color.colorPrimaryMP }}>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </View >
        )
    }
}
