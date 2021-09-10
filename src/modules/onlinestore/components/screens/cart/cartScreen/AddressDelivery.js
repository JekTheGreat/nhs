/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import PropTypes, { array } from 'prop-types';
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import Dropdown from "__src/components/Dropdown";
import { CheckBox, Icon } from "react-native-elements";
import _ from "lodash";
import ModalDeliveryAddress from "./ModalDeliveryAddress";
import Resources from "__src/resources";
const { Color } = Resources;
import { Colors } from 'react-native-paper';
var { height, width } = Dimensions.get('window');

class AddressDelivery extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isModalShowing: false,
        }
    }



    renderBase({ options }) {
        const { onlinestore: { setInputDetails } } = this.props;
        return (
            <View style={{
                flexDirection: "row", width: "100%", height: 40, alignItems: "center", alignSelf: "center", borderColor: Color.Standard,
                borderWidth: 0.6, borderRadius: 5, paddingHorizontal: 5, marginTop: 10
            }}>
                <Text style={{ flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingLeft: 5 }}>
                    {_.isEmpty(options) || _.isUndefined(options) ? "Please register address first." :
                        _.isEmpty(setInputDetails.selectedAddress) || _.isUndefined(setInputDetails.selectedAddress) ? options[options.length - 1].name :
                            setInputDetails.selectedAddress
                    }
                </Text>
                <Icon type='material' name='expand-more' color={"black"} size={27} />
            </View>
        );
    }

    renderRow(rowData, rowID, highlighted) {
        const { onlinestore: { setInputDetails } } = this.props;
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
        const { actions, onlinestore: { setInputDetails } } = this.props;
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

    closeModal = () => {
        this.setState({ isModalShowing: false });
    }

    _manageAdress = () => {
        this.setState({ isModalShowing: true });
    }

    _renderDeliveryDetails = ({ item, i }) => {
        return (
            <View key={i}>
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
                    placeholder="Register address first."
                    returnKeyType="next"
                    value={item.contactFName}
                    editable={false} />

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
                    placeholder="Register address first."
                    returnKeyType="next"
                    value={item.contactLName}
                    editable={false} />

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
                    placeholder="Register address first."
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
                    placeholder="Register address first."
                    returnKeyType="next"
                    isText
                    value={item.email}
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
                    placeholder="Register address first."
                    returnKeyType="next"
                    value={item.address}
                    editable={false} />
            </View>
        )
    }

    render() {
        const { onlinestore: { getDeliveryAddress, setInputDetails } } = this.props;
        const addressDP = _.map(getDeliveryAddress, addressName => {
            return addressName;
        })
        const addressDetails = _.filter(getDeliveryAddress, (item, index) => {
            if (_.isEmpty(setInputDetails.selectedAddress) || _.isUndefined(setInputDetails.selectedAddress)) {
                if (index === getDeliveryAddress.length - 1) {
                    return item;
                }
            }
            else if (_.isEqual(setInputDetails.selectedAddress, item.name)) {
                return item;
            }
        })

        return (
            <View>
                <Text style={{ color: Color.Standard2, fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 13 }}>Address Name</Text>
                <Dropdown
                    animated={true}
                    renderBase={this.renderBase.bind(this)}
                    dropdownStyle={{ height: 125 }}
                    options={addressDP}
                    renderButtonText={this.onChange.bind(this)}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={null} />

                <FlatList
                    data={addressDetails}
                    keyExtractor={i => { i }}
                    renderItem={this._renderDeliveryDetails} />

                <Button onPress={() => this._manageAdress()}
                    style={{ marginTop: 20, width: "100%", borderColor: Color.colorPrimaryDark, borderWidth: 0.5, backgroundColor: Color.white, marginRight: 10 }}
                    labelStyle={{ color: Color.colorPrimary }}
                    label="Manage Address" />

                <ModalDeliveryAddress closeModal={this.closeModal} isModalShowing={this.state.isModalShowing} {...this.props} />
            </View>
        )
    }

}

export default AddressDelivery;