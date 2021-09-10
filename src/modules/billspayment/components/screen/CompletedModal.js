/* eslint-disable */
import React from "react";
import { View, Text, TouchableOpacity, Modal, Dimensions } from "react-native";
import TxtInput from "__src/components/TxtInput";
import _ from "lodash";
import Dash from "react-native-dash";
import { Spinner } from "native-base";
import moment from "moment";
import Resources from "__src/resources";
import { Icon } from "react-native-elements";
import { Colors } from "react-native-paper";

const { Color } = Resources;
const { width, height } = Dimensions.get('window');

class CompletedModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  startAgain = () => {
    const { actions, billspayment: { setBillsPaymentScreen, setInputDetails } } = this.props;
    delete this.props.billspayment.submitPayment;
    delete setInputDetails.chooseBillers.biller;
    delete this.props.billspayment.validateFields;
    actions.setBillsPaymentScreen("choosebiller");
  }

  render() {
    const { billspayment: { setInputDetails, submitPayment, getRates }, isModalShowing, closeModal } = this.props;
    const date = !_.isUndefined(submitPayment.apiResponse.data) ? moment(submitPayment.apiResponse.data.meta.TransactionDateTime).format('MMMM Do YYYY, h:mm a') :
      moment().format('MMMM Do YYYY, h:mm a');
    return (
      <Modal
        ref={"completedModal"}
        visible={isModalShowing}
        transparent
        onRequestClose={closeModal}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ padding: 10, width: width - 30, backgroundColor: "white" }}>
            <View style={{
              flexDirection: "row", marginTop: 30, paddingVertical: 15, marginHorizontal: 10, paddingHorizontal: 20, backgroundColor: Colors.green50,
              borderColor: Colors.green200, borderWidth: 1, borderRadius: 5
            }}>
              <Icon type='evilicons' name='check-circle' color={"green"} size={23} />
              <Text style={{ marginLeft: 10, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 17, color: "black" }}>
                Transaction Completed
                      </Text>
            </View>

            <View style={{ marginHorizontal: 5, marginTop: 5, paddingVertical: 15, paddingHorizontal: 10, }}>

              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: "black" }}>
                  Status
                      </Text>
                <View style={{ padding: 5, backgroundColor: Colors.green50, borderColor: Colors.green200, borderWidth: 1, borderRadius: 5 }}>
                  <Text style={{ fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 13, color: Colors.green500 }}>
                    {submitPayment.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Dash style={{ height: .2, marginVertical: 10 }} />

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: "black" }}>
                  Transaction ID
                      </Text>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: "black" }}>
                  {submitPayment.transactionNo}
                </Text>
              </View>

              <Dash style={{ height: .2, marginVertical: 10 }} />

              <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: "black" }}>
                  Payment via
                      </Text>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: "black" }}>
                  BILLSPAYMENT
                      </Text>
              </View>

              <Dash style={{ height: .2, marginVertical: 10 }} />

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ width: "20%", fontFamily: "Roboto-Light", fontSize: 13, color: "black" }}>
                  Paid to
                      </Text>
                <Text style={{ textAlign: "right", width: "80%", fontFamily: "Roboto-Light", fontSize: 13, color: "black" }}>
                  {setInputDetails.chooseBillers.biller}
                </Text>
              </View>

              <Dash style={{ height: .2, marginVertical: 10 }} />

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: "black" }}>
                  Date
                      </Text>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: "black" }}>
                  {date}
                </Text>
              </View>

              <Dash style={{ height: .2, marginVertical: 10 }} />

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: "black" }}>
                  Amount
                      </Text>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: "black" }}>
                  {` PHP ${Number(parseFloat(submitPayment.amount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}`}
                </Text>
              </View>

              <Dash style={{ height: .2, marginVertical: 10 }} />

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: "black" }}>
                  Convenience Fee </Text>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: "black" }}>
                  {`PHP ${getRates.serviceCharge.toFixed(2)}`}
                </Text>
              </View>

              <Dash style={{ height: .2, marginVertical: 10 }} />

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: "black" }}>
                  Total Amount
                      </Text>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: "black" }}>
                  {`PHP ${Number(parseFloat(submitPayment.totalAmount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}`}
                </Text>
              </View>
            </View>

            <TouchableOpacity style={{
              marginTop: 30, bottom: 10, alignSelf: "center", borderRadius: 5,
              borderBottomColor: Color.colorPrimaryDark, alignItems: "center", justifyContent: "flex-end",
              backgroundColor: Color.colorPrimary, paddingVertical: 10, paddingHorizontal: 20, borderBottomWidth: 5
            }}
              onPress={this.startAgain}>
              <Text style={{ fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 17, color: "white" }}> Done </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}


export default CompletedModal;