import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, Alert, TextInput } from 'react-native';
import _ from 'lodash';
import Stars2 from "__src/components/Stars2";
import { Rating } from 'react-native-ratings';
import ToggleSwitch from 'toggle-switch-react-native';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');
export default class WriteReview extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            rate: 0,
            comments: "",
            error: {}
        }
        this.baseState = this.state
    }

    componentDidUpdate(prevProps) {
        const { actions, login: { session }, navigation, marketplace: { productRate, productReview } } = this.props;
        if ((!_.isEmpty(productRate) && !_.isEqual(prevProps.marketplace.productRate, productRate))
            || (!_.isEmpty(productReview) && !_.isEqual(prevProps.marketplace.productReview, productReview))) {
            actions.getPurchaseList(session);
            navigation.goBack();
        }
    }

    _toRate = (value) => {
        if (this.state.rate === value) {
            this.setState({ rate: 0 })
        } else {
            this.setState({ rate: value })
        }
    }

    _onChange = (value) => {
        this.setState({ comments: value });
    }

    _submit = () => {
        const { actions, login: { session }, marketplace: { setInputDetails, setSelectedTransaction } } = this.props;
        let newErr = {}
        if (_.isEqual(this.state.rate, 0)) {
            newErr.rate = "Rating is required.";
        }
        if (_.isEmpty(this.state.comments)) {
            newErr.comments = "Comment is required.";
        }
        this.setState({ error: newErr })
        if (_.isEmpty(newErr)) {
            console.log("TEST", { rate: this.state.rate }, { comment: this.state.comments })
            actions.productRate(session, { rate: this.state.rate }, setInputDetails.toReview.id)
            actions.productReview(session, { comment: this.state.comments }, setInputDetails.toReview.id)
        }
    }

    render() {
        const { marketplace: { setInputDetails, setSelectedTransaction } } = this.props;
        console.log("STATE", this.state)
        return (
            <ScrollView style={{ paddingVertical: 15, backgroundColor: "white", width: "100%", height: "100%" }}>
                <Image source={{ uri: setInputDetails.toReview.coverImg }} resizeMode='stretch' style={{ alignSelf: "center", width: "60%", height: 150 }} />
                <Text style={{ textAlign: "center", alignSelf: "center", fontSize: 16, color: "black", fontWeight: "bold" }}>
                    {setInputDetails.toReview.prod_name}
                </Text>
                <View style={{ marginTop: 15, paddingHorizontal: 15, paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.grey300, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: "black" }}>Shop Name</Text>
                    <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: "black" }}>
                        {setSelectedTransaction.items.shop_name}
                    </Text>
                </View>


                <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                    <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: "black" }}>Rate</Text>
                    <Stars2
                        rates={this.state.rate}
                        color={Color.colorPrimaryMP}
                        size={40}
                        txtVote={false}
                        style={{ marginTop: 5, justifyContent: "center", alignItems: "center" }}
                        iconStyle={{ alignSelf: "center", marginHorizontal: 15 }}
                        toRate={(value) => this._toRate(value)} />
                    {_.has(this.state.error, "rate") &&
                        <Text style={{ marginTop: 5, fontFamily: "Roboto-Light", fontSize: 12, color: "red" }}>{this.state.error.rate}</Text>}

                </View>

                <View style={{ paddingHorizontal: 15 }}>
                    <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: "black" }}>Comments</Text>
                    <View style={{ marginTop: 5, width: "100%", height: 125, borderWidth: 1, borderColor: Colors.grey300 }}>
                        <TextInput
                            style={{ paddingHorizontal: 10, fontSize: 12 }}
                            placeholder="Type your review here..."
                            multiline
                            value={this.state.comments}
                            onChangeText={this._onChange} />
                    </View>
                    {_.has(this.state.error, "comments") &&
                        <Text style={{ marginTop: 5, fontFamily: "Roboto-Light", fontSize: 12, color: "red" }}>{this.state.error.comments}</Text>}

                </View>

                <TouchableOpacity onPress={() => this._submit()}
                    style={{ marginHorizontal: 15, marginVertical: 10, alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 3, paddingVertical: 5 }} >
                    <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}