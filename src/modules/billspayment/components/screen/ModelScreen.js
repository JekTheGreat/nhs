/* eslint-disable */
import React from "react";
import {
  View, Text, TouchableOpacity, TouchableWithoutFeedback,
  StyleSheet, Modal, FlatList, Platform, Dimensions, Image
} from "react-native";
import _ from "lodash";
import Resources from "__src/resources";
import { Icon } from "react-native-elements";
import { Colors } from "react-native-paper";
const { Color } = Resources;
const { width, height } = Dimensions.get('window');

class ModelScreen extends React.PureComponent {

  categoriesModal = () => {
    const { billspayment: { getBillers, setInputDetails, getFields },
      categ, isCategoryModal, closeModal, categoriesArray } = this.props;
    return (
      <Modal
        ref={"categoriesModal"}
        visible={isCategoryModal}
        transparent
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <TouchableWithoutFeedback onPress={() => console.log("")}>
              <View style={{ padding: 10, borderRadius: Platform.OS === "ios" ? 10 : 0, shadowRadius: 5, width: width - 45, height: height / 2, backgroundColor: "white" }}>
                <Text style={{ marginTop: 10, fontSize: 16, }}>Choose a biller from <Text style={{ fontWeight: "bold" }}>{categ}</Text></Text>
                {_.isEmpty(categoriesArray) ? this._emptyCategory() : this._renderCategoryFlatlist()}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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

  _renderCategoryFlatlist = () => {
    const { actions, billspayment: { getBillers, setInputDetails }, categoriesArray } = this.props;
    delete setInputDetails.filloutform;
    return (
      <View style={{ marginTop: 10 }}>
        <FlatList
          style={{ paddingRight: 10, flexShrink: 1 }}
          data={categoriesArray.sort((a, b) => a.name.localeCompare(b.name)) || []}
          extraData={{ ...this.billspayment }}
          keyExtractor={(item, index) => `idx${index}`}
          renderItem={this._renderCategoriesItem} />
      </View>
    );
  }

  _renderCategoriesItem = ({ item, index }) => {
    const test = " ";
    const imageSrc = !_.isEmpty(item.logo) && !_.isEqual(item.logo, " ") ? { uri: item.logo } :
      !_.isEmpty(item.bc_logo) ? { uri: item.bc_logo } : require('../../../../resources/images/logo/ups_logo.png');
    return (
      <View style={{ marginVertical: 5 }}>
        <View key={`${index}`} style={{ borderColor: Color.Standard }}>
          <TouchableOpacity style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", }}
            onPress={() => this._selectItemByCategory(item, index)}>
            <Image style={{ width: 30, height: 30, marginRight: 5 }} resizeMode={"contain"} source={imageSrc} />
            <Text style={{ flex: 1 }}> {item.name} </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 1, backgroundColor: Colors.grey400, marginTop: 10 }}></View>
      </View>
    );
  }

  _selectItemByCategory = (item, index) => {
    const { closeModal, actions, billspayment: { setInputDetails, setBillsPaymentScreen, getFields } } = this.props;
    actions.getFields(item.id);
    const newInput = _.merge({}, setInputDetails);
    const params = _.merge({}, newInput.chooseBillers);
    params.biller = item.name;
    params.id = item.id;
    newInput.chooseBillers = params;
    actions.setInputDetails(newInput);
    closeModal();
    // actions.setBillsPaymentScreen("filloutform");

  }

  // billerSearchModal = () => {
  //   const {billersName, isBillerModal, closeModal, billspayment: {getBillers}} = this.props;
  //   return (
  //     <Modal
  //       ref={"billerSearchModal"}
  //       style={styles.modalContainer}
  //       visible={isBillerModal}
  //       transparent >
  //       <TouchableWithoutFeedback onPress={closeModal}>
  //         <View style={{flex:1, alignItems: "center"}}>
  //           <TouchableWithoutFeedback onPress={()=> console.log("")}>
  //             <View style={{marginTop:283, padding:10, borderWidth:.5, borderColor: Color.Standard, borderRadius: 3, shadowRadius: 5, width: width - 40, height: height/ 5, backgroundColor: "white"}}>
  //               <FlatList 
  //               keyExtractor={(item, index) => `${index}`}
  //               data={_.isEmpty(billersName)? getBillers.sort((a,b) => a.name.localeCompare(b.name)) || []: billersName.sort((a,b) => a.name.localeCompare(b.name)) || []}
  //               renderItem={this.renderItem}/>
  //             </View>
  //           </TouchableWithoutFeedback>
  //         </View>
  //       </TouchableWithoutFeedback>
  //     </Modal>
  //   )
  // }

  // renderItem = ({item, index}) => {
  //   return (
  //     <View key={`${index}`}>
  //       <TouchableOpacity style={{width:"100%"}} onPress={() => this._selectItem(item, index)}>
  //         <Text style={{fontFamily: "Roboto-Light", color: Color.Standard2}}> {item.name} </Text>
  //       </TouchableOpacity>
  //     </View>
  //   )
  // }

  // _selectItem = (parent, index) => {
  //   const {actions, billspayment: {setInputDetails, getFields}, closeModal} = this.props;
  //   const newInput = _.merge({}, setInputDetails);
  //   const params = _.merge({}, newInput.chooseBillers);
  //   params.biller = parent.name;
  //   params.id = parent.id;
  //   newInput.chooseBillers= params;
  //   actions.setInputDetails(newInput);
  //   actions.getFields(parent.id);
  //   closeModal();
  // }

  render() {
    const { billspayment: { getBillers, setInputDetails, getFields },
      categ, isCategoryModal, closeModal, categoriesArray } = this.props;

    return (
      <Modal
        ref={"categoriesModal"}
        visible={isCategoryModal}
        transparent
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <TouchableWithoutFeedback onPress={() => console.log("")}>
              <View style={{ padding: 10, borderRadius: Platform.OS === "ios" ? 10 : 0, shadowRadius: 5, width: width - 45, height: height / 2, backgroundColor: "white" }}>
                <Text style={{ marginTop: 10, fontSize: 16, }}>Choose a biller from <Text style={{ fontWeight: "bold" }}>{categ}</Text></Text>
                <View style={{ flex: 1 }}>

                  {_.isEmpty(categoriesArray) ? this._emptyCategory() : this._renderCategoryFlatlist()}
                </View>

              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center", alignItems: "center",
    borderRadius: 2, shadowRadius: 10, width: "98%", height: 120
  },
})

export default ModelScreen;
