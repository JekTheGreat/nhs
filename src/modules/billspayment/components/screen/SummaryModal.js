/* eslint-disable */
import React from "react";
import { View, Text, TouchableOpacity, Modal, Dimensions, Alert } from "react-native";
import TxtInput from "__src/components/TxtInput";
import _ from "lodash";
import { Spinner } from "native-base";
import Resources from "__src/resources";

const { Color } = Resources;
const { width, height } = Dimensions.get('window');

class SummaryModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
      isSecure: true,
    }
  }

  componentDidUpdate(prevProps) {
    const { actions, login: { session }, billspayment: { transactionFailed, submitPayment } } = this.props;
    const message = _.has(transactionFailed, "message.message") ? transactionFailed.message.message : transactionFailed.message;
    if ((!_.isEqual(prevProps.billspayment.transactionFailed, transactionFailed)) && (!_.isEmpty(transactionFailed))) {
      if (!_.has(transactionFailed, "message.status") && _.isEqual(transactionFailed.message, "Duplicate/Multiple transaction")) {
        Alert.alert(message, "There was an error with your information. Please check details entered. Note: To verify the status of your bills pay transaction, kindly check your transaction report and/or or retry after 10 minutes.");
      }
      else if (_.has(transactionFailed, "message.status") && !_.isEqual(transactionFailed.message, "Duplicate/Multiple transaction")) {
        alert(transactionFailed.message.reason);
      }
      else {
        alert(message);
      }
      delete transactionFailed.message;
    }
    else if (!_.isEmpty(submitPayment)) {
      actions.fetchTransactions(session);
      actions.setBillsPaymentScreen("final");
    }
    // delete transactionFailed.message;
  }

  transPassModal = () => {
    const { isSecure, error } = this.state;
    const { billspayment: { setInputDetails, transactionInProgress, transactionFailed }, isTransPassShowing, closeModal } = this.props;
    const transPass = _.has(setInputDetails, "summary.transPass") ? setInputDetails.summary.transPass : "";
    console.log("TEST: ", transactionFailed.message);
    return (
      <Modal
        ref={"transPassModal"}
        visible={isTransPassShowing}
        transparent
        onRequestClose={closeModal}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ padding: 10, borderRadius: 10, shadowRadius: 5, width: width - 60, height: 225, backgroundColor: "white" }}>

            <View style={{ marginTop: 10, }}>
              <Text style={{ paddingLeft: 10, fontFamily: "Roboto-Light", fontSize: 22, color: "#f6c933", fontWeight: "bold" }}>
                Confirmation Password
                            </Text>

              <Text style={{ marginTop: 10, paddingLeft: 10, fontFamily: "Roboto-Light", fontSize: 15, color: Color.Standard2 }}>
                Please enter your transaction password below to submit transaction.
                            </Text>
            </View>

            <View>
              <TxtInput
                style={{ marginTop: 15, paddingHorizontal: 10, }}
                style3={{ borderColor: Color.Standard }}
                err={error.message ? error.message : ""}
                value={transPass}
                secureTextEntry={isSecure}
                onPass={() => this.setState({ isSecure: !isSecure })}
                returnKeyType='done'
                icon="lock_icon"
                icon2="view_icon"
                compName="Password"
                placeholder="******"
                onChangeText={this._onChangeText}
              />
            </View>

            <View style={{ marginTop: 20, paddingHorizontal: 10, flex: 1, flexDirection: "row" }}>
              <TouchableOpacity style={{ paddingRight: 10 }} onPress={closeModal}>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 20, color: Color.Standard2 }}> Cancel </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ paddingLeft: 10 }} onPress={this._proceed || closeModal}>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 20, color: "#f6c933" }}> Proceed </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
        {transactionInProgress ?
          <View style={{
            position: "absolute",
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)', width: width, height: height
          }}>
            <Spinner
              color={"black"}
              size="small"
              animating={transactionInProgress} />
          </View> : null}
      </Modal>
    )
  }

  _onChangeText = (value) => {
    const { actions, billspayment: { setInputDetails } } = this.props;
    const newInput = _.merge({}, setInputDetails);
    const params = _.merge({}, newInput.summary);
    params.transPass = value.toString();
    newInput.summary = params;
    actions.setInputDetails(newInput);
  }


  _proceed = () => {
    const error = {};
    const { actions, login: { currentAccount, session, additionalDetails }, billspayment: { setInputDetails, transactionFailed, validateFields },
      wallet: { selectConvertToRecieve, walletSelected, selectConvertValueFrom } } = this.props;
    const transPass = _.has(setInputDetails, "summary.transPass") ? setInputDetails.summary.transPass : {};
    const params = {};
    if (_.isEmpty(transPass) || _.isUndefined(transPass)) {
      error.message = "Please input your transaction pin.";
      this.setState({ error: error });
    }
    else if (walletSelected.balance < Number(setInputDetails.filloutform.amount)) {
      alert(`Ooops!
      Insufficient Balance
      Your bills payment transaction error.
      Please try again.`);
    }
    else {
      params.accountId = currentAccount.id;
      params.billerId = JSON.stringify(setInputDetails.chooseBillers.id);
      params.currency = selectConvertValueFrom;
      params.channel = "Mobile";
      params.input = setInputDetails.filloutform;
      params.pin = setInputDetails.summary.transPass;
      params.userId = JSON.stringify(additionalDetails.individualId);
      params.userLevel = additionalDetails.type;
      params.walletId = "7f245858-e665-4328-b3f4-20e3d713cede";
      actions.submitPayment(params, session);
    }
  }

  render() {
    return (
      <View>
        {this.transPassModal()}
      </View>
    )
  }
}


export default SummaryModal;