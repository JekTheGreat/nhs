/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import PropTypes, { array } from 'prop-types';
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import Dropdown from "__src/components/Dropdown";
import { CheckBox, Icon } from "react-native-elements";
import _ from "lodash";
// import ModalDeliveryAddress from "./ModalDeliveryAddress";
import Resources from "__src/resources";
const { Color } = Resources;
import { Colors } from 'react-native-paper';
var { height, width } = Dimensions.get('window');

export default class DeliveryAddress extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShoMore: false,
        }
    }

    _renderDeliveryDetails = ({ item, i }) => {
        return (
            <View key={i}>

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
                            style3={{ backgroundColor: Colors.grey50, borderColor: Color.Standard, borderRadius: 5, }}
                            round
                            isText
                            returnKeyType="next"
                            value={item.contactFName}
                            editable={false} />
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
                            style3={{ backgroundColor: Colors.grey50, borderColor: Color.Standard, borderRadius: 5, }}
                            round
                            isText
                            returnKeyType="next"
                            value={item.contactMName}
                            editable={false} />
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
                            style3={{ backgroundColor: Colors.grey50, borderColor: Color.Standard, borderRadius: 5, }}
                            round
                            isText
                            returnKeyType="next"
                            value={item.contactLName}
                            editable={false} />
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
                    style3={{ backgroundColor: Colors.grey50, borderColor: Color.Standard, borderRadius: 5, }}
                    round
                    isText
                    returnKeyType="next"
                    value={item.contactNo}
                    editable={false} />

                <Text style={{ marginTop: 10, fontSize: 13, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                    Email Address
                </Text>
                <TxtInput
                    style={{
                        marginTop: 10, shadowColor: Colors.grey300, shadowOpacity: 1, borderRadius: 5,
                        shadowOffset: { width: 1, height: 1, }
                    }}
                    style3={{ backgroundColor: Colors.grey50, borderColor: Color.Standard, borderRadius: 5, }}
                    round
                    returnKeyType="next"
                    isText
                    value={item.email}
                    editable={false} />

                <Text style={{ marginTop: 10, fontSize: 13, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                    Region
                </Text>
                <TxtInput
                    style={{
                        marginTop: 10, shadowColor: Colors.grey300, shadowOpacity: 1, borderRadius: 5,
                        shadowOffset: { width: 1, height: 1, }
                    }}
                    style3={{ backgroundColor: Colors.grey50, borderColor: Color.Standard, borderRadius: 5, }}
                    round
                    returnKeyType="next"
                    isText
                    value={item.region}
                    editable={false} />

                <Text style={{ marginTop: 10, fontSize: 13, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                    Municipality
                </Text>
                <TxtInput
                    style={{
                        marginTop: 10, shadowColor: Colors.grey300, shadowOpacity: 1, borderRadius: 5,
                        shadowOffset: { width: 1, height: 1, }
                    }}
                    style3={{ backgroundColor: Colors.grey50, borderColor: Color.Standard, borderRadius: 5, }}
                    round
                    returnKeyType="next"
                    isText
                    value={item.city}
                    editable={false} />

                <Text style={{ marginTop: 10, fontSize: 13, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                    Full Address
                </Text>
                <TxtInput
                    style={{
                        marginTop: 10, shadowColor: Colors.grey300, shadowOpacity: 1, borderRadius: 5,
                        shadowOffset: { width: 1, height: 1, }
                    }}
                    style3={{ backgroundColor: Colors.grey50, borderColor: Color.Standard, borderRadius: 5, }}
                    round
                    multiline
                    textContentType="addressCity"
                    isText
                    returnKeyType="next"
                    value={item.address}
                    editable={false} />
            </View>
        )
    }

    renderBase({ options }) {
        const { marketplace: { setInputDetails } } = this.props;
        return (
            <View style={{
                flexDirection: "row", width: "100%", height: 40, alignItems: "center", alignSelf: "center", borderColor: Color.Standard,
                borderWidth: 0.6, borderRadius: 5, paddingHorizontal: 5, marginTop: 10
            }}>
                {_.map(options, (isSelected, index) => {
                    if ((_.isEmpty(setInputDetails.selectedAddress) || _.isUndefined(setInputDetails.selectedAddress)) && isSelected.selected) {
                        return <Text key={`${isSelected.id}`} style={{ flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingLeft: 5 }}>
                            {isSelected.name}
                        </Text>
                    } else if (_.isEqual(setInputDetails.selectedAddress, isSelected.name)) {
                        return <Text key={`${isSelected.id}`} style={{ flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingLeft: 5 }}>
                            {isSelected.name}
                        </Text>
                    }
                    // else if ((_.isEmpty(setInputDetails.selectedAddress) || _.isUndefined(setInputDetails.selectedAddress)) && options[index].selected === false) {
                    //     return <Text key={`${isSelected.id}`} style={{ flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingLeft: 5 }}>
                    //         Please enter/select Address.
                    //     </Text>
                    // }
                })}
                <Icon type='material' name='expand-more' color={"black"} size={27} />
            </View>
        );
    }

    renderRow(rowData, rowID, highlighted) {
        const { marketplace: { setInputDetails } } = this.props;
        return (
            <View style={[{ paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white" },
            highlighted && { backgroundColor: Color.highlight }]}>
                <Text style={[{ margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center" },
                    highlighted]}>
                    {`${rowData.name}`}
                </Text>
            </View>
        );
    }

    onChange = (value) => {
        const { actions, marketplace: { setInputDetails } } = this.props;
        const newInput = _.merge({}, setInputDetails);
        let params = _.merge({}, newInput.selectedAddress);
        let toBuy = _.merge({}, newInput.deliveryParamsToBuy);
        params = value.name;
        toBuy.delivery_address = value.address;
        toBuy.delivery_city = value.city;
        toBuy.delivery_contact = value.contactNo;
        toBuy.delivery_person = value.contactPerson;
        toBuy.delivery_region = value.region;
        newInput.selectedAddress = params;
        newInput.deliveryParamsToBuy = toBuy;
        actions.setInputDetails(newInput);
    }


    render() {
        const { navigation, marketplace: { getDeliveryAddress, setInputDetails } } = this.props;
        const addressDetails = _.filter(getDeliveryAddress, (item, index) => {
            if ((_.isEmpty(setInputDetails.selectedAddress) || _.isUndefined(setInputDetails.selectedAddress)) && item.selected) {
                return item;
            }
            else if (_.isEqual(setInputDetails.selectedAddress, item.name)) {
                return item;
            }
        })
        console.log("QWE", getDeliveryAddress, addressDetails)
        return (
            <View style={{ paddingHorizontal: 15, paddingVertical: 20, borderBottomWidth: 1, borderColor: Colors.grey300 }}>
                <View style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Color.Standard2, fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 16 }}>Delivery Details</Text>
                    <Text onPress={() => navigation.navigate("ManageAddress")} style={{ color: Color.colorPrimaryMP, fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 12 }}>Manage Address</Text>
                </View>
                {!_.isEmpty(addressDetails) &&
                    <View>
                        <Text style={{ fontWeight: "bold", color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 }}>{addressDetails[0].contactPerson}</Text>
                        <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}>
                            <Icon type='font-awesome' name='phone' color={Color.colorPrimaryMP} size={15} />
                            <Text style={{ marginLeft: 5, color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 }}>{`+${addressDetails[0].contactNo}`}</Text>
                        </View>
                    </View>
                }
                <Text style={{ marginTop: 10, color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 }}>Address Name</Text>
                <Dropdown
                    animated={true}
                    renderBase={this.renderBase.bind(this)}
                    dropdownStyle={[getDeliveryAddress.length > 2 ? { height: 125 } : { height: 80 }]}
                    options={getDeliveryAddress}
                    renderButtonText={this.onChange.bind(this)}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={null} />

                {!_.isEmpty(addressDetails) &&
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 }}>Full Address</Text>
                        <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}>
                            <Icon type='font-awesome' name='map-marker' color={Color.colorPrimaryMP} size={15} />
                            <Text style={{ marginLeft: 5, color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 }}>{addressDetails[0].address}</Text>
                        </View>
                    </View>
                }

                {/* {this.state.isShoMore &&
                    <FlatList
                        data={addressDetails}
                        keyExtractor={i => { i }}
                        renderItem={this._renderDeliveryDetails} />}

                {!_.isEmpty(addressDetails) &&
                    <TouchableOpacity onPress={() => this.setState({ isShoMore: !this.state.isShoMore })}
                        style={{ marginTop: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ textAlign: "center", fontFamily: "Roboto-Light", fontWeight: "bold", marginRight: 5, fontSize: 14, color: Color.colorPrimaryMP }}>
                            {this.state.isShoMore ? "See Less" : "See More"}
                        </Text>
                        <Icon type='font-awesome' name={this.state.isShoMore ? 'chevron-up' : 'chevron-down'} color={Color.colorPrimaryMP} size={13} />
                    </TouchableOpacity>} */}
            </View>
        )
    }

}
