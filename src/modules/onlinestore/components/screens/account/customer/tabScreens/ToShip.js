/* eslint-disable */
import React, { PureComponent } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;

class ToShip extends PureComponent {

    _renderToShip = ({ item, i }) => {
        const datePurchased = moment(item.date_purchased).format('MMMM DD');
        const total = Number(parseFloat(item.total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        return (
            <View key={`${i}`} style={{ margin: 20 }}>
                <View style={{ justifyContent: "center" }}>
                    <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>{`Tracking No.${item.trackingno}`}</Text>
                    <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2 }}>Date Purchased:
                             <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: Color.LightBlue }}> {datePurchased}</Text>
                    </Text>
                </View>

                {_.map(item.items, (productDetails, ind) => {
                    return (
                        <View key={ind} style={{ marginVertical: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                {/* <Image
                                    resizeMode='contain'
                                    source={{ uri: productDetails.coverImg }}
                                    style={{ height: 80, width: 100 }} /> */}
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontWeight: "bold", fontFamily: 'Roboto-Light', fontSize: 13, }}> {productDetails.prod_name} </Text>
                                    <Text style={{ marginTop: 5, fontFamily: 'Roboto-Light', fontStyle: "italic", fontSize: 13 }}>₱ {Number(parseFloat(productDetails.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })} </Text>
                                </View>
                            </View>
                            <Text style={{ fontFamily: 'Roboto-Light', fontWeight: "bold", fontSize: 13 }}>x{productDetails.quantity} </Text>
                        </View>
                    )
                })}
                <Text style={{ textAlign: "right", fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2 }}>{`${item.items.length} Items, Total: `}
                    <Text style={{ fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 12, color: Color.colorPrimary }}>₱ {total}</Text>
                </Text>
            </View>
        )
    }

    render() {
        const { onSearch, toSearch, onlinestore: { getPurchaseList } } = this.props
        const data = _.filter(getPurchaseList.data, item => {
            if (((item.status === "To Ship") && _.isNull(item.cancel_reason)) && _.isEmpty(toSearch)) {
                return item;
            }
        })
        const toDisplay = _.isEmpty(onSearch) ? data : onSearch;
        return (
            <ScrollView style={{ backgroundColor: "white" }}>
                <FlatList
                    data={toDisplay}
                    ItemSeparatorComponent={() => <View style={{ height: .5, backgroundColor: Color.Standard2 }} />}
                    keyExtractor={i => { i }}
                    renderItem={this._renderToShip} />
            </ScrollView>
        );
    }
}

ToShip.propTypes = {
    onlinestore: PropTypes.object,
    navigation: PropTypes.object,
};

export default ToShip;