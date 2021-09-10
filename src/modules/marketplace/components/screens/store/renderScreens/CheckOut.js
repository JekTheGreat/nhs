import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Button from "__src/components/Button";
import _ from 'lodash';
import { Spinner } from 'native-base';
import CheckOutList from './checkoutcomponents/CheckOutList';
import BottomComponent from './checkoutcomponents/BottomComponent';
import { Icon, CheckBox } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
var { height, width } = Dimensions.get('window');

export default class CheckOut extends React.PureComponent {

    state = {
        isSelectAll: false,
        payment: "e2e",
        bank: {},
        isCheck: false,
        tp: "",
        error: {},
    }

    selectPayment = (paymentMethod) => {
        this.setState({ payment: paymentMethod });
    }

    selectBank = (bank) => {
        this.setState({ bank: bank });
        delete this.state.error.bank
    }

    onCheck = () => {
        this.setState({ isCheck: !this.state.isCheck })
    }

    agreeInTermsModal = () => {
        this.setState({ isCheck: true })
    }

    onChangeText = (text) => {
        this.setState({ tp: text })
    }

    onErr = (err) => {
        this.setState({ error: err })
    }

    render() {
        const { marketplace: { transactionInProgress } } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: "white", height: height, width: width }}>
                <CheckOutList
                    onChangeText={this.onChangeText}
                    transactionPass={this.state.tp}
                    errTP={this.state.error}
                    onCheck={this.onCheck}
                    agreeInTermsModal={this.agreeInTermsModal}
                    isCheck={this.state.isCheck}
                    onSelectPayment={this.selectPayment}
                    selectedPayment={this.state.payment}
                    onSelectBank={this.selectBank}
                    selectedBank={this.state.bank}
                    {...this.props} />
                <BottomComponent
                    isCheck={this.state.isCheck}
                    onErr={this.onErr}
                    transactionPass={this.state.tp}
                    selectedBank={this.state.bank}
                    selectedPayment={this.state.payment}
                    {...this.props} />

                {transactionInProgress &&
                    <View style={{
                        position: "absolute",
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.2)', width: width, height: height
                    }}>
                        <Spinner
                            color={"black"}
                            size="small"
                            animating={transactionInProgress} />
                    </View>}
            </View>
        )
    }
}