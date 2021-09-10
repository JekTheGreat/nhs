/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import PropTypes, { array } from 'prop-types';
import { CheckBox, Icon } from "react-native-elements";
import _ from "lodash";
import Resources from "__src/resources";
const { Color } = Resources;
import { Colors } from 'react-native-paper';
var { height, width } = Dimensions.get('window');

class PlaceOrderFromPreview extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    // componentWillUnmount() {
    //     this.props.navigation.navigate('Online Store')
    // }




    renderItem = ({ item, ind }) => {
        const { countTotalPrice, countCartFunc, onlinestore: { setSelectedItems, setInputDetails } } = this.props;
        const product = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
        const itemDesc = !_.isEmpty(product.variation) ? Object.values(setInputDetails.options) : [];
        countCartFunc(item.quantity);
        countTotalPrice(_.multiply(item.quantity, item.price));
        return (
            <View key={ind}>
                <View style={{
                    flexDirection: "row", backgroundColor: "white", paddingVertical: 5,
                    shadowOffset: { width: 1, height: 1, }, shadowColor: Colors.grey400, shadowOpacity: 1, borderRadius: 10, marginTop: 10
                }} >
                    <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 5, marginTop: 5, }}>
                        {/* <Image
                                    source={_.isEmpty(item.coverImg) ? null : { uri: item.coverImg }}
                                    resizeMode='stretch'
                                    style={{ height: 80, width: 90, alignSelf: "center", marginBottom: 5 }} /> */}
                        <View style={{ width: "75%" }}>
                            <Text style={{
                                paddingLeft: 5, fontFamily: 'Roboto-Light', fontSize: 14, fontWeight: "bold", marginTop: 10,
                                justifyContent: "center"
                            }}> {item.name} </Text>
                            {
                                (!_.isEmpty(item.variation)) ? _.map(Object.keys(setInputDetails.options), (label, index) => {
                                    return <View style={{ marginLeft: 10, flexDirection: "row", width: "85%" }}>
                                        <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: "black" }}>{itemDesc[index]},</Text>
                                    </View>
                                }) : null
                            }
                            <Text style={{
                                paddingLeft: 10, fontFamily: 'Roboto-Light', fontSize: 14, fontWeight: "bold", marginVertical: 5,
                                justifyContent: "center"
                            }} >₱ {Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", paddingRight: 10, justifyContent: "flex-end", alignItems: "center" }} >
                        <TouchableOpacity disabled style={{
                            justifyContent: "center", alignItems: "center", marginRight: 10,
                            height: 25, width: 25, borderRadius: 15, backgroundColor: Colors.yellow100
                        }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: Color.colorPrimaryDark }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 14, marginLeft: 2, marginRight: 2 }}>{item.quantity}</Text>
                        <TouchableOpacity disabled style={{
                            justifyContent: "center", alignItems: "center", marginLeft: 10,
                            height: 25, width: 25, borderRadius: 15, backgroundColor: Colors.yellow100
                        }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: Color.colorPrimaryDark }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }

    render() {
        const { onlinestore: { setSelectedItems, getCartList, changeCartItem } } = this.props;
        const product = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
        const countCart = _.filter(getCartList, cart => {
            if (cart.id === changeCartItem.id) {
                return cart.quantity;
            }
        })

        return (
            <FlatList
                data={countCart}
                keyExtractor={ind => { ind }}
                renderItem={this.renderItem} />
        );
    }
}

PlaceOrderFromPreview.propTypes = {
    onlinestore: PropTypes.object,
    navigation: PropTypes.object,
};

export default PlaceOrderFromPreview;