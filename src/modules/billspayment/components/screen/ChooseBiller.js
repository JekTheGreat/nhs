/* eslint-disable */
import React from "react";
import {
  View, Text, TouchableOpacity, ScrollView, FlatList,
  Dimensions, Platform, Image, Alert
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { Icon } from "react-native-elements";
import TxtInput from "__src/components/TxtInput";
import styles from "../../styles.css";
import _ from "lodash";
import Modal from "react-native-modalbox";
import Resources from "__src/resources";
const { Color } = Resources;
import PropTypes from "prop-types";
import ModelScreen from "./ModelScreen";
import { Colors } from "react-native-paper";
var screenSize = Dimensions.get('window');
const { height, width } = Dimensions.get('screen');

class ChooseBillerScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
      billersName: [],
      categoriesArray: [],
      categ: "",
      isBillerModal: false,
      isCategoryModal: false,
    };
  }


  onNext = () => {
    const { actions, billspayment: { setBillsPaymentScreen, getRates, getFields, setInputDetails } } = this.props;
    const billers = _.has(setInputDetails, "chooseBillers.biller") ? setInputDetails.chooseBillers.biller : {};
    const error = {};
    if (_.isEmpty(billers)) {
      error.biller = "Biller is required!"
    }
    this.setState({ error });
    if (_.isEmpty(error) && !_.isEmpty(getFields)) {
      delete this.props.billspayment.uploadImage;
      delete this.props.billspayment.validateFields;
      delete setInputDetails.imageFileName;
      delete setInputDetails.filloutform;
      delete setInputDetails.getDP;
      actions.setBillsPaymentScreen("filloutform");
    }
  }

  _onchangeText = (value) => {
    let data;
    const { error, billersName } = this.state;
    const { billspayment: { setInputDetails, getBillers } } = this.props;
    const newBiller = _.filter(getBillers, (item) => {
      if (item.is_active === 1) {
        return item;
      }
    })
    delete error.biller
    delete setInputDetails.chooseBillers;
    if (_.isEmpty(value)) {
      this.setState({ isBillerModal: false });
      data = newBiller;
    }
    else {
      data = _.filter(newBiller, (item) => {
        return item.name.toUpperCase().startsWith(value.toUpperCase());
      });
    }
    this.setState({ billersName: data, isBillerModal: true });
  }


  _renderCategories = ({ item, index }) => {
    return (
      <View key={`${index}`} style={[Platform.OS === 'android' ? { width: "50%" } : { width: width / 3 }, { flex: 1, marginVertical: 10, }]}>
        <TouchableOpacity style={[Platform.OS === 'android' ? { width: "95%" } : { width: 150 }, {
          borderWidth: 1, borderColor: "#ccc", borderRadius: 5, alignSelf: "center"
        }]}
          onPress={() => this._onCategoriesPress(item, index)}>
          <Text style={{ marginTop: 10, fontFamily: "Roboto-Light", fontSize: 13, alignSelf: "center" }}>
            {item.name}
          </Text>
          <Image style={{ marginVertical: 10, width: 50, height: 50, alignSelf: "center" }} resizeMode={"contain"} source={{ uri: item.logo }} />
        </TouchableOpacity>
      </View>
    );
  }

  _onCategoriesPress = async (item, index) => {
    const { actions, billspayment: { setInputDetails, getBillers, getFields } } = this.props;
    let data;
    let text = item.name;
    this.setState({ categ: text, isBillerModal: false, isCategoryModal: true });

    const newBiller = await _.filter(getBillers, (kid) => {
      if (_.isEqual(item.id, kid.category_id)) {
        return item;
      }
    })
    this.setState({ categoriesArray: newBiller })



    //  _.map(getBillers, (child) => {
    //   console.log("CHILD: ", child)
    //   if(_.isEqual(item.id, child.category_id)){
    //     _.filter(getBillers, (billername) => {
    //       console.log("EQUAL: ", _.isEqual(item.id, child.category_id), billername.name,)
    //     })
    //   }
    //   else {
    //     console.log("NOTEQUAL: ", )
    //   }
    // })


    // _.map(getBillers, child=>{
    //   console.log("ITEM: ", item, "CHILD: ", child);
    //   if(child.category_id===item.id){
    //     data = _.filter(getBillers, (item) => {
    //       return item.name
    //     });
    //     this.setState({categoriesArray: data});  
    //   }
    //   else{        
    //     console.log("DATA!!!: ", data);
    //     this.setState({categoriesArray:data});
    //   }
    // });
  }

  closeModal = () => {
    this.setState({ isCategoryModal: false, isBillerModal: false });
  }

  openBillerModal = () => {
    this.setState({ isBillerModal: !this.state.isBillerModal, isCategoryModal: false });
  }

  _selectItem = (parent, index) => {
    const { actions, billspayment: { setInputDetails, getFields } } = this.props;
    const { error } = this.state;
    const newInput = _.merge({}, setInputDetails);
    const params = _.merge({}, newInput.chooseBillers);
    params.biller = parent.name;
    params.id = parent.id;
    newInput.chooseBillers = params;
    actions.setInputDetails(newInput);
    actions.getFields(parent.id);
    this.setState({ isBillerModal: false });
    delete error.biller
  }

  renderFlatlistBillers = ({ item, index }) => {
    const imageSrc = !_.isEmpty(item.logo) && !_.isEqual(item.logo, " ") ? { uri: item.logo } :
      !_.isEmpty(item.bc_logo) ? { uri: item.bc_logo } : require('../../../../resources/images/logo/ups_logo.png');
    return (
      <TouchableOpacity key={`${index}`} style={{ width: "100%", flexDirection: "row" }} onPress={() => this._selectItem(item, index)}>
        <Image style={{ width: 20, height: 20 }} resizeMode={"stretch"} source={imageSrc} />
        <Text style={{ fontFamily: "Roboto-Light", color: Color.Standard2 }}> {item.name} </Text>
      </TouchableOpacity>
    )
  }

  _emptyCategory = () => {
    return (
      <View style={{ marginTop: 50, justifyContent: "center", alignItems: "center" }}>
        <Icon type='ionicon' name={"ios-mail-open"} size={50} color={Colors.grey200} />
        <Text style={{ fontFamily: "Roboto-Light", fontSize: 15, color: Colors.grey400 }}>No Data</Text>
      </View>
    );
  }

  render() {
    const { error, isBillerModal, billersName } = this.state;
    const { billspayment: { setInputDetails, getFields, getCategories, getBillers } } = this.props;
    const billers = _.has(setInputDetails, "chooseBillers.biller") ? setInputDetails.chooseBillers.biller : {};
    const newBiller = _.filter(getBillers, (item) => {
      if (item.is_active === 1) {
        // console.log("GETBILLERS: ", item.name);
        return item;
      }
    })
    return (
      <ScrollView style={{ paddingHorizontal: 20, }}>
        <View style={{ marginTop: 20, }}>
          <Text style={{ fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 20, }}>
            Pay your bills easier than before.
          </Text>
          <Text style={{ marginTop: 10, fontFamily: "Roboto-Light", fontSize: 16, }}>
            Choose to our biller partner you want to pay to.
          </Text>

          <View style={[{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, borderWidth: .5 },
          _.isEmpty(error.biller) || (!_.isEmpty(billers)) ?
            { borderColor: Color.Standard } : { borderColor: Color.red }]} >
            <TxtInput
              style={{ alignSelf: "flex-start", width: width - 85, }}
              style3={{ borderColor: Color.white, }}
              round
              placeholder="e.g Meralco"
              returnKeyType="search"
              value={billers}
              onChangeText={(value) => this._onchangeText(value)} />

            <TouchableOpacity style={{ alignSelf: "center", justifyContent: "center", width: "10%" }}
              onPress={() => this.setState({ isBillerModal: !this.state.isBillerModal })}>
              <Icon name={error.biller ? 'close-o' : (!isBillerModal) ? 'chevron-down' : 'chevron-up'} type='evilicon' color={_.isEmpty(error.biller) || (!_.isEmpty(billers)) ? Color.Standard : "red"} size={27} />
            </TouchableOpacity>

          </View>
          {error.biller ? <Text style={{ color: "red", fontSize: 13, fontFamily: "Roboto-Light" }}>{error.biller}</Text> : null}
          <View style={{ flexDirection: "row", marginTop: 15, justifyContent: "center", alignItems: "center" }}>
            <View style={{ height: 1, width: 50, backgroundColor: Colors.grey400, marginRight: 20 }}></View>
            <Text style={{ fontFamily: "Roboto-Light", fontSize: 15, color: "black" }}>or</Text>
            <View style={{ height: 1, width: 50, backgroundColor: Colors.grey400, marginLeft: 20 }}></View>
          </View>
          <Text style={{ textAlign: "center", marginTop: 15, fontFamily: "Roboto-Light", fontSize: 20, color: "black" }}>
            Choose biller from category
          </Text>

          <FlatList
            contentContainerStyle={{ marginTop: 20 }}
            data={getCategories}
            numColumns={Platform.OS === 'ios' ? 3 : 2}
            keyExtractor={(item, index) => `idx${index}`}
            renderItem={this._renderCategories} />

          <ModelScreen
            {...this.props}
            categoriesArray={this.state.categoriesArray}
            categ={this.state.categ}
            closeModal={this.closeModal}
            isCategoryModal={this.state.isCategoryModal} />
        </View>

        <Modal
          ref={"billerSearchModal"}
          style={[Platform.OS === "android" ? { marginTop: 150 } : { marginTop: 140 },
          { width: "100%", padding: 10, height: 200, borderWidth: .5, borderColor: Color.Standard, }]}
          position="top"
          backdrop={false}
          animationDuration={0}
          backButtonClose={false}
          isOpen={this.state.isBillerModal} >
          {_.isEmpty(billersName) && _.isEmpty(newBiller) ? this._emptyCategory() :
            <FlatList
              scrollEnabled={true}
              keyExtractor={(item, index) => `${index}`}
              data={_.isEmpty(billersName) ? newBiller.sort((a, b) => a.name.localeCompare(b.name)) || []
                : billersName.sort((a, b) => a.name.localeCompare(b.name)) || []}
              renderItem={this.renderFlatlistBillers} />}
        </Modal>
      </ScrollView>
    );
  }
}


ChooseBillerScreen.propTypes = {
  billspayment: PropTypes.object,
};

export default ChooseBillerScreen;