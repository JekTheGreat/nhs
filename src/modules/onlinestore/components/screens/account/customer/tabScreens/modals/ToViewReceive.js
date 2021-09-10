/* eslint-disable */
import React, { PureComponent } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;

export default class ToViewReceive extends PureComponent {

    _renderItems = ({ item, ind }) => {
        const datePurchased = moment(item.date_purchased).format('MMMM DD');
        return (
            <View key={`${ind}`} style={{ marginHorizontal: 20, marginVertical: 10 }}>
                <View style={{ marginVertical: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            resizeMode='contain'
                            source={{ uri: item.coverImg }}
                            style={{ height: 50, width: 50 }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontWeight: "bold", fontFamily: 'Roboto-Light', fontSize: 13, }}> {item.prod_name} </Text>
                            <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2 }}>Date Purchased:
                             <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: Color.LightBlue }}> {datePurchased}</Text>
                            </Text>
                            <Text style={{ marginTop: 5, fontFamily: 'Roboto-Light', fontStyle: "italic", fontSize: 13 }}>₱ {Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })} </Text>
                        </View>
                    </View>
                    <Text style={{ fontFamily: 'Roboto-Light', fontWeight: "bold", fontSize: 13 }}>x{item.quantity} </Text>
                </View>
            </View>
        )
    }

    render() {
        const { selectedProduct } = this.props;
        return (
            <FlatList
                data={selectedProduct.items}
                style={[selectedProduct.items.length === 1 ? {} : { height: "30%" }, { borderBottomEndRadius: 5, borderBottomStartRadius: 5 }]}
                ItemSeparatorComponent={() => <View style={{ height: .5, backgroundColor: Color.Standard }} />}
                keyExtractor={ind => { ind }}
                renderItem={this._renderItems} />
        );
    }
}