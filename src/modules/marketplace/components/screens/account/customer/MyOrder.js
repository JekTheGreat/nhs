import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Alert, FlatList, RefreshControl, Dimensions, StyleSheet } from 'react-native';
import _ from 'lodash';
import Dropdown from "__src/components/Dropdown";
import { Tab, Tabs, ScrollableTab, Spinner } from 'native-base';
import ToReturnScreen from './MyPurchaseToReceive';
import MyOrderBankList from './MyOrderBankList';
import { Icon, CheckBox, Tooltip } from "react-native-elements";
import moment from 'moment';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class MyOrder extends React.PureComponent {

    state = { isCheck: false, reason: "", error: "", isDisable: false }

    componentWillMount() {
        const { actions, marketplace: { setSelectedTransaction } } = this.props;
        let istrue;
        const test = _.map(setSelectedTransaction.items.items, (product, index) => {
            return product.status
        })
        if (test.includes("Return-Pending")) {
            for (let i = 0; i < test.length; i++) {
                if (test[0] !== test[i]) {
                    istrue = false
                } else {
                    istrue = true;
                }
            }
            this.setState({ isDisable: istrue });
        } else {
            this.setState({ isDisable: istrue });
        }
    }

    componentDidUpdate(prevProps) {
        const { actions, navigation, login: { session }, marketplace: { patchTransactions, productRate, productReview } } = this.props;
        if (!_.isEmpty(patchTransactions) && !_.isEqual(patchTransactions, prevProps.marketplace.patchTransactions)) {
            if (patchTransactions.status === 1) {
                actions.getPurchaseList(session);
                navigation.goBack();
            } else {
                Alert.alert("ERROR", patchTransactions.data.message)
            }
            delete patchTransactions.status;
        }

        if ((!_.isEmpty(productRate) && !_.isEqual(prevProps.marketplace.productRate, productRate))
            || (!_.isEmpty(productReview) && !_.isEqual(prevProps.marketplace.productReview, productReview))) {
            actions.getPurchaseList(session);
            navigation.goBack();
        }
    }

    _onPress = () => {
        const { actions, login: { session }, marketplace: { setSelectedTransaction } } = this.props;
        const { reason, isCheck } = this.state;
        let param = {};
        if (setSelectedTransaction.type === "View") {
            if (_.isEmpty(reason)) {
                this.setState({ error: "Select reason to cancel first." })
            } else {
                param.action = "Cancelled"
                param.cancel_reason = reason;
                actions.patchTransactions(session, setSelectedTransaction.items.id, param)
            }
        } else if (setSelectedTransaction.type === "Received") {
            if (!isCheck) {
                this.setState({ error: "Agree in terms and condition first." })
            } else {
                param.action = "Delivered"
                actions.patchTransactions(session, setSelectedTransaction.items.id, param)
            }
        }
    }

    renderBase() {
        const { marketplace: { setSelectedTransaction } } = this.props;
        const { reason, error } = this.state;
        return (
            <View style={[!_.isEmpty(error) ? { borderColor: "red" } : { borderColor: Color.Standard }, {
                flexDirection: "row", height: 30, justifyContent: "space-between", alignItems: "center", alignSelf: "center",
                borderWidth: 0.6, borderRadius: 3, marginTop: 10, paddingLeft: 10, paddingRight: 5
            }]}>
                <Text style={[!_.isEmpty(error) ? { color: "red" } : _.isEmpty(error) && _.isEmpty(reason) ? { color: Color.Standard } : { color: "black" }, { flex: 1, fontFamily: "Roboto-Light", fontSize: 12, }]}>
                    {`${reason}` || `Select reason to cancel`}
                </Text>
                {!_.isEmpty(error) ? <Icon name='close-o' type='evilicon' color="red" size={20} /> :
                    <Icon type='material' name='expand-more' color={Color.Standard} size={20} />}
            </View>
        );
    }

    renderRow(rowData, rowID, highlighted) {
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

    onChange(value) {
        this.setState({ reason: value.name, error: "" })
    }

    _productOptions = (items) => ({ item, index }) => {
        return (
            <View key={`idx ${index}`} style={{ marginTop: 5 }}>
                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>
                    {`${item}: ${items.variation[item]}, `}
                </Text>
            </View>
        )
    }

    _writeReview = (item) => {
        const { actions, navigation, marketplace: { setInputDetails } } = this.props;
        const review = _.merge({}, setInputDetails);
        let data = _.merge({}, review.toReview);
        data = item;
        review.toReview = data;
        actions.setInputDetails(review);
        navigation.navigate("WriteReview")
    }

    renderItems = ({ item, index }) => {
        const { marketplace: { setSelectedTransaction } } = this.props;
        const price = Number(parseFloat(item.total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        const productCreated = moment(setSelectedTransaction.items.CreatedAt).format('MMM DD')
        const expectedDelivery = moment(setSelectedTransaction.items.CreatedAt).add(item.delivery_days, 'days').format('DD')
        const Estimated = `${productCreated} - ${expectedDelivery}`;
        return (
            <View style={{ paddingVertical: 10, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }}>
                <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    {item.status === "Return-Pending" &&
                        <Tooltip overlayColor='transparent' backgroundColor={Color.Standard2}
                            popover={<Text style={{ color: "white", fontSize: 10 }}>You already returned this item</Text>}>
                            <Icon type='font-awesome' name='info-circle' color={"red"} size={15} />
                        </Tooltip>
                    }
                    {/* <Image source={{ uri: item.coverImg }} style={{ width: "20%", height: 60 }} resizeMode='stretch' /> */}
                    <View style={{ backgroundColor: "pink", width: "20%", height: 60 }} />
                    <View style={{ width: "75%", }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.prod_name}</Text>
                        <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`Qty: ${item.quantity}`}</Text>
                        <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`₱ ${price}`}</Text>
                    </View>

                </View>
                { !_.isNull(item.variation) &&
                    <FlatList
                        data={Object.keys(item.variation)}
                        keyExtractor={(index) => `idx ${index}`}
                        style={{ flexDirection: 'row' }}
                        renderItem={this._productOptions(item)} />}

                <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Estimated Arrival: </Text>
                    <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: Color.colorPrimaryMP }}>
                        {Estimated}
                    </Text>
                </View>

                {(item.status === "Delivered" && _.isNull(item.rate_id) && _.isNull(item.review_id)) ?
                    <TouchableOpacity onPress={() => this._writeReview(item)}
                        style={{ marginVertical: 10, alignItems: "center", width: "50%", backgroundColor: Color.colorPrimaryMP, borderRadius: 3, paddingVertical: 5 }} >
                        <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>Write a Review</Text>
                    </TouchableOpacity> :
                    (item.status === "Delivered" && !_.isNull(item.rate_id) && !_.isNull(item.review_id)) ?
                        < TouchableOpacity activeOpacity={1}
                            style={{ marginVertical: 10, alignItems: "center", width: "50%", backgroundColor: "white", borderColor: Color.colorPrimaryMP, borderWidth: 1, borderRadius: 3, paddingVertical: 5 }} >
                            <Text style={{ textAlign: "center", fontSize: 12, color: Color.colorPrimaryMP }}>Reviewed</Text>
                        </TouchableOpacity> : null
                }
            </View>
        )
    }


    ViewOrder = () => {
        const { marketplace: { setSelectedTransaction, getReasonList, transactionInProgress } } = this.props;
        const sumTotal = _.sum([setSelectedTransaction.items.total_price, setSelectedTransaction.items.ship_fee]);
        const total = Number(parseFloat(sumTotal).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ padding: 15 }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Transaction Number</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setSelectedTransaction.items.trackingno}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Status</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setSelectedTransaction.items.status}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Date Purchased</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setSelectedTransaction.items.date_purchased}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Payment Method</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setSelectedTransaction.items.payment_method}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Total Order Quantity</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setSelectedTransaction.items.total_qty}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Shipping Fee</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>₱ {Number(parseFloat(setSelectedTransaction.items.ship_fee).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Total Price</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>₱ {total}</Text>
                    </View>
                </View>

                <View style={{ padding: 15, backgroundColor: "#8E8E8E0D" }}>
                    <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Delivery Address</Text>
                    <Text style={{ marginTop: 5, fontSize: 12, fontFamily: "Roboto-Light", color: Color.colorPrimaryMP }}>Home Address</Text>
                    <Text style={{ marginTop: 5, fontSize: 12, fontFamily: "Roboto-Light", color: Color.colorPrimaryMP }}>{setSelectedTransaction.items.delivery_address}</Text>
                </View>

                <View style={{ padding: 15, }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Merchant Name</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setSelectedTransaction.items.shop_person}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Shop Name</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setSelectedTransaction.items.shop_name}</Text>
                    </View>
                    <View style={{ marginTop: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Contact Number</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{setSelectedTransaction.items.shop_contact}</Text>
                    </View>
                </View>

                {setSelectedTransaction.items.status === "Processing" && setSelectedTransaction.type === "View" &&
                    <View style={{ marginHorizontal: 15 }}>
                        <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 }}>Reason</Text>
                        <Dropdown
                            animated={true}
                            renderBase={this.renderBase.bind(this)}
                            dropdownStyle={{ height: 125, marginHorizontal: 15 }}
                            options={getReasonList}
                            renderButtonText={this.onChange.bind(this)}
                            renderRow={this.renderRow.bind(this)}
                            renderSeparator={null} />
                    </View>}

                {setSelectedTransaction.type === "Received" &&
                    <View style={{ marginHorizontal: 15 }}>
                        <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 }}>Uploaded Signed DR</Text>
                        <Image resizeMode='stretch'
                            source={{ uri: setSelectedTransaction.items.delivery_receipt }}
                            style={{ alignSelf: "center", marginTop: 10, width: "100%", height: 125 }} />
                    </View>
                }

                {setSelectedTransaction.type === "Return" ? <ToReturnScreen {...this.props} /> :
                    <FlatList
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        data={setSelectedTransaction.items.items}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `items_idx ${index}`}
                        renderItem={this.renderItems} />}



                {setSelectedTransaction.items.status === "Processing" && setSelectedTransaction.type === "View" &&
                    <View>
                        <View style={{ padding: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Item Subtotal </Text>
                            <Text style={{ fontSize: 12, color: Color.colorPrimaryMP }}>
                                ₱ {Number(parseFloat(setSelectedTransaction.items.total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => this._onPress()}
                            style={{ marginHorizontal: 15, marginBottom: 10, alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 3, paddingVertical: 5 }} >
                            <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>Cancel Order</Text>
                        </TouchableOpacity>
                    </View>}

                {(setSelectedTransaction.type === "Received" && !this.state.isDisable) &&
                    <View>
                        <CheckBox
                            containerStyle={{ paddingHorizontal: 15, paddingVertical: 0, marginBottom: 0, borderColor: "transparent", backgroundColor: "transparent" }}
                            checkedColor={Color.colorPrimaryMP}
                            checked={this.state.isCheck}
                            title={<Text style={{ fontFamily: "Roboto-Light", fontSize: 12 }}
                                onPress={() => this.setState({ isCheck: true, error: "" })}> I agree with the Terms and Conditions. </Text>}
                            onPress={() => this.setState({ isCheck: !this.state.isCheck, error: "" })} />

                        {!_.isEmpty(this.state.error) &&
                            <Text style={{ marginLeft: 50, fontFamily: "Roboto-Light", fontSize: 12, color: "red" }}>{this.state.error}</Text>}

                        <TouchableOpacity onPress={() => this._onPress()}
                            style={{ marginHorizontal: 15, marginVertical: 10, alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 3, paddingVertical: 5 }} >
                            <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>Order Received</Text>
                        </TouchableOpacity>
                    </View>}

                {/* {transactionInProgress &&
                    <View style={{
                        position: "absolute",
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.2)', width: width, height: height
                    }}>
                        <Spinner
                            color={"black"}
                            size="small"
                            animating={transactionInProgress} />
                    </View>} */}
            </ScrollView>
        )
    }

    render() {
        const { marketplace: { setSelectedTransaction } } = this.props;
        console.log("setSelectedTransaction", setSelectedTransaction.items)
        // if (setSelectedTransaction.type === "View") {
        if (setSelectedTransaction.items.verified !== "Pending" && _.isNull(setSelectedTransaction.items.bank)) {
            return this.ViewOrder();
        } else {
            return <MyOrderBankList {...this.props} />
        }
        // }
        // else if (setSelectedTransaction.type === "Return") {
        //     this.ReturnOrder();
        // }
        // else if (setSelectedTransaction.type === "Received") {
        //     this.ReceivedOrder();
        // }
    }
}
