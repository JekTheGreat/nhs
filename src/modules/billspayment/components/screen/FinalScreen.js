/*eslint-disable*/
import React from 'react';
import { Image, Text, View, ScrollView, TouchableOpacity, FlatList, Linking } from "react-native";
import styles from "../../../wallet/styles.css";
import Resource from "__src/resources";
import Dash from "react-native-dash";
import _ from "lodash";
import ViewImageModal from "./ViewImageModal";
import TransactionComplete from "./CompletedModal";
const { Res, Color } = Resource;

class FinalScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: "",
      viewImage: false,
      isModalShowing: false,
    }
  }

  onNext = () => {
    this.setState({ isModalShowing: true });
  }

  closeModal = () => {
    this.setState({ isModalShowing: false, viewImage: false });
  }

  _ViewImage = (item) => {
    const { billspayment: { setInputDetails, getRates, validateFields } } = this.props;
    this.setState({ imageURL: item, viewImage: true });
  }

  renderItem = ({ item, index }) => {
    const { billspayment: { setInputDetails, getRates } } = this.props;
    const field = _.has(setInputDetails, "filloutform") ? setInputDetails.filloutform : [];
    return (
      <View key={`${index}`} style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
        <Text style={{ width: "50%", fontWeight: "bold", fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard2 }}>{item.field.name}:</Text>
        {item.field.input === "image" ?
          <Text onPress={() => this._ViewImage(field[item.field.varname])} style={{ width: "50%", textAlign: "right", flexShrink: 1, fontSize: 14, fontFamily: "Roboto-Light", color: Color.LightBlue }}>
            View Image
					</Text> :
          <Text style={{ width: "50%", textAlign: "right", flexShrink: 1, fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard2 }}>
            {item.field.varname === "amount" ? Number(field[item.field.varname]).toFixed(2) :
              item.field.input === "Dropdown" ? setInputDetails.getDP[item.field.varname] :
                field[item.field.varname]}
          </Text>}
      </View>
    )
  }

  render() {
    const { actions, billspayment: { setInputDetails, getRates, getFields, submitPayment }, login: { currentAccount } } = this.props;
    const fields = _.has(getFields, "fields") ? getFields.fields : {};
    const amount = eval(setInputDetails.filloutform.amount) + eval(getRates.serviceCharge);

    return (
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={[styles.flex1marT30padH20, { marginTop: 10 }]}>
          <View style={styles.flex1allCenter}>
            <Image style={{ width: 60, height: 60, alignSelf: "center", marginVertical: 10 }}
              source={Res.get("check_icon")} resizeMode={"contain"} />
            <Text style={{ marginTop: 5, alignSelf: "center", fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 20, }}>Transaction Successful</Text>
          </View>

          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 50 }}>
            <Text style={{ fontSize: 14, fontFamily: "Roboto-Light", fontWeight: "bold", color: "black" }}> Tracking Number: </Text>
            <Text style={{ textAlign: "right", flexShrink: 1, fontSize: 14, fontFamily: "Roboto-Light", color: "black" }}>{submitPayment.transactionNo}</Text>
          </View>

          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            <Text style={{ fontSize: 14, fontFamily: "Roboto-Light", fontWeight: "bold", color: "black" }}> Transaction Type: </Text>
            <Text style={{ textAlign: "right", flexShrink: 1, fontSize: 14, fontFamily: "Roboto-Light", color: "black" }}>{getFields.name}</Text>
          </View>

          {/* <View style={styles.flex1marT15}> */}

          {/* <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 30}}>
            <View>
              <Text style={{fontSize: 20, fontFamily: "Roboto-Light",  color: Color.Standard2}}> User Level: </Text>
            </View>
            <View>
              <Text style={{fontSize: 20, fontFamily: "Roboto-Light",  color: Color.Standard2}}>{currentAccount.subType}</Text>
            </View>
          </View> */}

          <FlatList
            data={fields}
            keyExtractor={(item, index) => `idx${index}`}
            renderItem={this.renderItem} />

          {/* <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            <View>
              <Text style={{ fontSize: 14, fontFamily: "Roboto-Light", color: "black", fontWeight: "bold" }}> Convenience Fee:</Text>
            </View>
            <View>
              <Text style={{ fontSize: 14, fontFamily: "Roboto-Light", color: "black" }}>{getRates.serviceCharge.toFixed(2)}</Text>
            </View>
          </View> */}

          {/* </View> */}

          <View style={{ marginTop: 10, }}>
            <Dash style={{ height: .1, marginTop: 20 }} />
          </View>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2 }}> Transaction Amount </Text>
            {_.isNaN(amount) ? null : <Text style={{ fontSize: 14, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2 }}>
              {`PHP ${Number(parseFloat(amount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}`}</Text>}
          </View>

          <TouchableOpacity onPress={() => Linking.openURL(`http://10.10.20.21:5002/v1/receipts/${submitPayment.transactionNo}`)} style={{ flexDirection: "column", justifyContent: "flex-end", alignItems: "center", marginTop: 40 }}>
            {/* <TouchableOpacity onPress={() => actions.getReceipt(submitPayment.transactionNo)} style={{ flexDirection: "column", justifyContent: "flex-end", alignItems: "center", marginTop: 40 }}> */}
            <Image style={{ width: 35, height: 35 }} source={Res.get("qr_download")} />
            <Text style={{ color: Color.LightBlue, fontFamily: "Roboto-Light", fontSize: 15, fontWeight: "bold", marginTop: 10 }}>Download a copy of your receipt</Text>
          </TouchableOpacity>
        </View>

        <TransactionComplete
          {...this.props}
          isModalShowing={this.state.isModalShowing}
          closeModal={this.closeModal}
        />

        <ViewImageModal
          closeModal={this.closeModal}
          viewImage={this.state.viewImage}
          imageURL={this.state.imageURL}
        />
      </ScrollView>
    );
  }
}

export default FinalScreen;