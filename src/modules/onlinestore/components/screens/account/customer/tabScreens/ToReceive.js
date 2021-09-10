/* eslint-disable */
import React, { PureComponent } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import ToReceiveModal from './modals/ToReceiveModal';
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;

class ToReceive extends PureComponent {

    state = {
        selectedProduct: [],
        isProcessingModalShowing: false,
        toView: false,
        toReturn: false,
        toReceived: false,
    }

    closeModal = () => {
        this.setState({ isProcessingModalShowing: false, toView: false, toReturn: false, toReceived: false });
    }
    toView = (product) => {
        this.setState({ selectedProduct: product, isProcessingModalShowing: true, toView: true });
    }
    toReturn = (product) => {
        this.setState({ selectedProduct: product, isProcessingModalShowing: true, toReturn: true });
    }
    toReceived = (product) => {
        this.setState({ selectedProduct: product, isProcessingModalShowing: true, toReceived: true });
    }

    _renderToReceive = ({ item, i }) => {
        const datePurchased = moment(item.date_purchased).format('MMMM DD');
        const total = Number(parseFloat(item.total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        return (
            <View key={`${i}`} style={{ margin: 20 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>{`Tracking No.${item.trackingno}`}</Text>
                        <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2 }}>Date Purchased:
                             <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: Color.LightBlue }}> {datePurchased}</Text>
                        </Text>
                    </View>
                    {_.isNull(item.delivery_receipt) ?
                        <TouchableOpacity onPress={() => this.toView(item)} style={{ backgroundColor: Color.colorPrimary, borderRadius: 5, }}>
                            <Text style={{ paddingVertical: 3, paddingHorizontal: 8, fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 12, color: "white" }}>View Order</Text>
                        </TouchableOpacity> :

                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => this.toReturn(item)} style={{ backgroundColor: Colors.yellow600, borderRadius: 5, }}>
                                <Text style={{ paddingVertical: 3, paddingHorizontal: 8, fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 11, color: "white" }}>Return</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.toReceived(item)} style={{ marginLeft: 5, backgroundColor: Color.colorPrimary, borderRadius: 5, }}>
                                <Text style={{ paddingVertical: 3, paddingHorizontal: 8, fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 11, color: "white" }}>Order Received</Text>
                            </TouchableOpacity>
                        </View>
                    }
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
            if (((item.status === "To Receive") && _.isNull(item.cancel_reason)) && _.isEmpty(toSearch)) {
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
                    renderItem={this._renderToReceive} />
                <ToReceiveModal
                    closeModal={this.closeModal}
                    isProcessingModalShowing={this.state.isProcessingModalShowing}
                    toView={this.state.toView}
                    toReturn={this.state.toReturn}
                    toReceived={this.state.toReceived}
                    selectedProduct={this.state.selectedProduct}
                    {...this.props} />
            </ScrollView>
        );
    }
}

ToReceive.propTypes = {
    onlinestore: PropTypes.object,
    navigation: PropTypes.object,
};

export default ToReceive;