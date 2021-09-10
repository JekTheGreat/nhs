/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, ScrollView, Dimensions, Alert, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { CheckBox, Icon } from "react-native-elements";
import { Spinner } from 'native-base';
import _ from "lodash";
import numeral from "numeral";
import CartItems from './CartItems';
import Resources from "__src/resources";
import Dropdown from "__src/components/Dropdown";
const { Color, Res } = Resources;
import { Colors } from 'react-native-paper';
var { height, width } = Dimensions.get('window');

class CartScreen extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isTransactionCompleteModal: false,
    }
  }

  closeTransactionCompleteModal = () => {
    this.setState({ isTransactionCompleteModal: false });
  }

  componentDidUpdate(prevProps) {
    const { actions, onlinestore: { setInputDetails, buyNowResponse }, login: { session } } = this.props;
    if (!_.isEqual(prevProps.onlinestore.buyNowResponse, buyNowResponse) && !_.isEmpty(buyNowResponse)) {
      if (Number(buyNowResponse.status) === 0) {
        Alert.alert("Error", buyNowResponse.data);
        delete buyNowResponse.status;
      }
      else {
        this.setState({ isTransactionCompleteModal: true });
        const param = {}
        param.id = Object.keys(setInputDetails.placeOrder);
        actions.deleteCartItem(param, session);
      }
    }

  }

  renderBase() {
    const { selectConvertToRecieve, walletSelected } = this.props.wallet;
    const codeReceive = selectConvertToRecieve ? selectConvertToRecieve.code : walletSelected.code;
    const nameReceive = selectConvertToRecieve ? selectConvertToRecieve.name : walletSelected.name;
    const balanceReceive = selectConvertToRecieve ? selectConvertToRecieve.balance : walletSelected.balance;
    let active, color;
    if (!_.isEmpty(walletSelected)) {
      active = codeReceive === walletSelected.code ? "Active Wallet" : "Active Wallet";
      color = codeReceive === walletSelected.code ? { color: Color.lightgreen } : { color: Color.lightgreen };
    }

    return (
      <View style={{ paddingHorizontal: 15, flexShrink: 1, marginLeft: 5, height: 40, }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image style={styles.conRBImg} source={Res.get(codeReceive)} />
            <Text style={styles.conRBTxt1}>
              {`${nameReceive} Wallet`}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.conRBTxt1}>{numeral(balanceReceive).format("0,000.0000")}</Text>
            <Icon name='menu-down' type='material-community' color={Color.Standard2} size={27} />
          </View>
        </View>

        <View style={{ paddingHorizontal: 15, flexDirection: "row", marginTop: 5, justifyContent: "space-between", alignItems: "center" }}>
          <Text style={[styles.textStatus, color]}>{active}</Text>
          <Text style={{ color: Color.Standard2, fontSize: 13, fontFamily: "Roboto-Light" }}>{`Last Update: `}
            <Text style={{ color: 'black', fontSize: 13, fontFamily: "Roboto-Light" }}>Today</Text></Text>
        </View>
      </View>
    );
  }

  renderRow(rowData, rowID, highlighted) {
    return (
      <View style={{ paddingLeft: 7, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "flex-start", backgroundColor: "white" }}>
        <Image style={styles.conRBImg} source={Res.get(rowData.code)} />
        <Text style={[styles.conRRTxt,
        highlighted && { color: Color.black }]}>
          {`${rowData.name} Wallet`}
        </Text>
      </View>
    );
  }

  _SelectedValueToRecieve = (value) => {
    const { actions, wallet: { addedWallet } } = this.props;
    const selectedWallet = _.filter(addedWallet, (data) => {
      return data.code === value;
    });
    actions.selectedConvertToRecieved(selectedWallet[0]);
  }

  render() {
    const { wallet: { walletSelected, addedWallet }, onlinestore: { transactionInProgress } } = this.props;
    console.log("NAV:", this.props.navigation)
    return (
      <View style={{ flex: 1, backgroundColor: Color.bg }}>
        <View style={{
          height: 85, width: width, backgroundColor: 'white', shadowOffset: { width: 1, height: 1, },
          shadowColor: Colors.grey400, shadowOpacity: 1,
        }}>
          <Dropdown
            animated={false}
            style={{ width: width, marginTop: 15 }}
            showsVerticalScrollIndicator={false}
            renderBase={this.renderBase.bind(this)}
            dropdownStyle={{ height: 50, width: 70 }}
            options={_.filter(addedWallet, (item) => {
              // return item.code;
              if (_.isEqual(item.code, "PHP")) {
                return item.code;
              }
            })}
            renderButtonText={(e) =>
              this._SelectedValueToRecieve(e.code)}
            renderRow={this.renderRow.bind(this)}
            renderSeparator={null} />
        </View>
        <CartItems
          isTransactionCompleteModal={this.state.isTransactionCompleteModal}
          closeTransactionCompleteModal={this.closeTransactionCompleteModal}
          {...this.props} />

        {transactionInProgress ?
          <View style={{
            position: "absolute",
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)', width: width, height: height
          }}>
            <Spinner
              color={"white"}
              size="small"
              animating={transactionInProgress} />
          </View> : null}
        <SafeAreaView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conRBImg: { width: 22, height: 22 },
  conRBTxt1: { marginLeft: 5, fontFamily: "Roboto-Light", fontSize: 16, color: Color.Standard2, fontWeight: "bold" },
  conRRTxt: { margin: 4, fontSize: 13, color: Color.Standard, fontFamily: "Roboto", textAlignVertical: "center" },
  textStatus: { fontSize: 13, color: Color.LightBlue, fontFamily: "Roboto-Light" },
});

CartScreen.propTypes = {
  onlinestore: PropTypes.object,
  navigation: PropTypes.object,
};

export default CartScreen;