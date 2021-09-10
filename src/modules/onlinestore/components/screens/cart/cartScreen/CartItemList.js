/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import PropTypes, { array } from 'prop-types';
import { CheckBox, Icon } from "react-native-elements";
import _ from "lodash";
import Resources from "__src/resources";
const { Color } = Resources;
import { Colors } from 'react-native-paper';
var { height, width } = Dimensions.get('window');

class CartItems extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      arr: []
    }
  }

  componentDidUpdate(prevProps) {
    const { actions, login: { session }, onlinestore: { changeCartItem } } = this.props;
    if ((!_.isEqual(changeCartItem.quantity, prevProps.onlinestore.changeCartItem.quantity))) {
      actions.fetchCartList(session.token);
    }
  }

  onSelection = (type, item, index) => {
    const { actions, onlinestore: { setInputDetails, getCartList, getProductList } } = this.props;
    const cb = _.merge({}, setInputDetails);
    let selectAll = _.merge({}, cb.selectcartAll);
    let selectEachAll = _.merge({}, cb.cartCB);
    let placeOrder = _.merge({}, cb.placeOrder);
    let shipCharge = _.merge({}, cb.deliveryCharge);

    if (_.isEqual(type, "all")) {
      _.map(item, (cartList, index) => {
        selectEachAll[cartList.id] = !setInputDetails.selectcartAll;
        placeOrder[cartList.id] = cartList;
        shipCharge[cartList.prod_id] = cartList.prod_id;
        cb.cartCB = selectEachAll;
        cb.placeOrder = placeOrder;
        cb.deliveryCharge = shipCharge;
      })
      selectAll = !setInputDetails.selectcartAll;
      if (selectAll === false) {
        cb.deliveryCharge = {};
        cb.cartCB = {}
        cb.placeOrder = []
      }
      cb.selectcartAll = selectAll;
      actions.setInputDetails(cb);
    }
    else {
      let selectedItem = { ...selectEachAll };
      let deliveryCharge = { ...shipCharge };
      let value = !selectedItem[item.id];
      if (value) {
        selectedItem[item.id] = true;
        deliveryCharge[item.prod_id] = item.prod_id;
        placeOrder[item.id] = item;
        if (Object.keys(selectedItem).length === getCartList.length) {
          selectAll = true;
          cb.selectcartAll = selectAll;
        }
      } else {
        delete selectedItem[item.id];
        delete placeOrder[item.id];
        delete deliveryCharge[item.prod_id];
        selectAll = false;
        cb.selectcartAll = selectAll;
      }
      cb.deliveryCharge = deliveryCharge;
      cb.placeOrder = placeOrder;
      cb.cartCB = selectedItem;
      actions.setInputDetails(cb);
    }
  }

  _renderCartItems = ({ item, index }) => {
    const { onlinestore: { setInputDetails } } = this.props;
    const price = _.isUndefined(item.quantity) ? {} : _.multiply(item.quantity, item.price);
    const totalprice = Number(parseFloat(price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
    const itemDesc = (!_.isNull(item.variation)) ? Object.values(item.variation) : "";
    const params = setInputDetails.cartCB;
    const selected = params[item.id] ? true : false;
    return (
      <View key={`${index}`} style={{
        flexDirection: "row", backgroundColor: "white", paddingVertical: 5,
        shadowOffset: { width: 1, height: 1, }, shadowColor: Colors.grey400, shadowOpacity: 1, borderRadius: 10, marginTop: 10
      }} >
        <CheckBox
          containerStyle={{ height: 50, width: 25, marginLeft: 0, }}
          checkedColor={Color.colorPrimary}
          checked={selected}
          onPress={() => this.onSelection("each", item, index)}
        />
        <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 5, marginTop: 5, }}>
          {/* <Image
            source={_.isEmpty(item.coverImg) ? null : { uri: item.coverImg }}
            resizeMode='stretch'
            style={{ height: 80, width: 70, alignSelf: "center", marginBottom: 5 }} /> */}
          <View style={{ width: "75%" }}>
            <Text style={{
              paddingLeft: 5, fontFamily: 'Roboto-Light', fontSize: 14, fontWeight: "bold", marginTop: 10,
              justifyContent: "center"
            }}> {item.name} </Text>
            {
              (!_.isNull(item.variation)) ? _.map(Object.keys(item.variation), (label, i) => {
                return <View key={i} style={{ marginLeft: 10, flexDirection: "row", width: "85%" }}>
                  {/* <Text style={{ marginLeft: 10, fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2 }}>{`${label}: `}</Text> */}
                  <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: "black" }}>{itemDesc[i]},</Text>
                </View>
              }) : null
            }
            <Text style={{
              paddingLeft: 10, fontFamily: 'Roboto-Light', fontSize: 14, fontWeight: "bold", marginVertical: 5,
              justifyContent: "center"
            }} >₱ {totalprice}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", paddingRight: 10, justifyContent: "flex-end", alignItems: "center" }} >
          <TouchableOpacity onPress={() => this._changeCartItem("subtract", item)} style={{
            justifyContent: "center", alignItems: "center", marginRight: 10,
            height: 25, width: 25, borderRadius: 15, backgroundColor: Colors.yellow100
          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: Color.colorPrimaryDark }}>-</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 14, marginLeft: 2, marginRight: 2 }}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => this._changeCartItem("add", item)} style={{
            justifyContent: "center", alignItems: "center", marginLeft: 10,
            height: 25, width: 25, borderRadius: 15, backgroundColor: Colors.yellow100
          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: Color.colorPrimaryDark }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _changeCartItem = (type, item) => {
    const { actions, login: { session } } = this.props;
    const params = {}
    let num;
    if (type === "add") {
      num = 1;
      params.prod_id = item.prod_id;
      _.isNull(item.variation) ? "" : params.variation = item.variation;
      params.quantity = num;
      actions.changeCartItem(params, session);
    }
    else {
      if (item.quantity > 1) {
        num = -1;
        params.prod_id = item.prod_id;
        _.isNull(item.variation) ? "" : params.variation = item.variation;
        params.quantity = num;
        actions.changeCartItem(params, session);
      }
    }
  }

  _deleteItem = () => {
    const { actions, login: { session }, onlinestore: { getCartList, setInputDetails } } = this.props;
    const param = {};
    param.id = Object.keys(setInputDetails.cartCB);
    _.filter(getCartList, (parent) => {
      _.map(param.id, child => {
        if (_.isEqual(parent.id, Number(child))) {
          actions.deleteCartItem(param, session);
          delete setInputDetails.cartCB[child];
          delete setInputDetails.placeOrder;
          actions.fetchCartList(session.token);
        }
      })
    });
  }

  render() {
    const { onlinestore: { getCartList, setInputDetails } } = this.props;
    console.log("STATE:", this.state.arr)
    return (
      <View>
        <View style={{
          flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center",
          backgroundColor: "white", paddingVertical: 3, paddingHorizontal: 15, shadowOffset: { width: 1, height: 1, },
          shadowColor: Colors.grey400, shadowOpacity: 1, borderRadius: 10, marginTop: 20
        }}>
          <CheckBox style={{}}
            containerStyle={{ padding: 0, borderColor: "transparent", backgroundColor: "transparent", marginLeft: -5, }}
            textStyle={{ color: 'black', fontFamily: "Roboto-Light", fontSize: 14, fontWeight: '100', textAlign: "center" }}
            title="Select All"
            checkedColor={Color.colorPrimary}
            checked={setInputDetails.selectcartAll}
            onPress={() => this.onSelection("all", getCartList)}
          />
          {
            (!_.isEqual(Object.keys(setInputDetails.cartCB).length, 0)) ?
              <TouchableOpacity onPress={() => this._deleteItem()} style={{ flexDirection: "row" }}>
                <Icon name='trash-o' type='font-awesome' color={"red"} size={18} />
                <Text style={{ marginLeft: 5, color: "red", fontFamily: "Roboto-Light", fontSize: 14 }}>Delete ({Object.keys(setInputDetails.cartCB).length})</Text>
              </TouchableOpacity>
              : null
          }
        </View>
        <FlatList
          data={getCartList}
          keyExtractor={(item, index) => `idx${index}`}
          renderItem={this._renderCartItems} />
      </View>
    );
  }
}

CartItems.propTypes = {
  onlinestore: PropTypes.object,
  navigation: PropTypes.object,
};

export default CartItems;