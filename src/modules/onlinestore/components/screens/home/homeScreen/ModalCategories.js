/* eslint-disable */
import React from "react";
import { View, Text, ScrollView, TextInput, TouchableWithoutFeedback, FlatList, Modal, Dimensions } from "react-native";
import _ from "lodash";
import { Rating, AirbnbRating } from 'react-native-ratings';
import Dropdown from "__src/components/Dropdown";
import Button from "__src/components/Button";
import ServiceItem from "./ServiceItem";
import Resources from "__src/resources";
import { Icon, CheckBox } from "react-native-elements";
const { Color } = Resources;
const { width, height } = Dimensions.get('window');
const formatData = (data, numColumns, getCategoryList) => {
  const categories = _.concat(data, getCategoryList);
  return categories;
};
const numColumns = 4;

class ModalCategories extends React.PureComponent {


  click = (categoryName, item) => {
    const { navigation, actions, login: { session }, onlinestore: { setInputDetails, setOnlineStoreScreen } } = this.props;
    let param = {};
    let newParam = {};
    if (categoryName) {
      const newInput = _.merge({}, setInputDetails);
      newInput.selectedCategory = item;
      if (!_.isEmpty(item.sub)) {
        const data = _.map(item.sub, sub => {
          return sub.name;
        })
        param.categories = { name: item.slug, sub: data };
      }
      else {
        param.categories = { name: item.slug };
      }
      newInput.filterBy = param;
      newParam.categories = [param.categories];
      actions.setInputDetails(newInput);
      actions.postProductList(newParam, session)
      actions.setOnlineStoreScreen("selectedCategory");
    }
  }

  _renderItem = ({ item, index }) => {
    if (!_.isUndefined(item.name)) {
      return (
        <ServiceItem key={`idx${index}`}
          item={item.name}
          black={true}
          onPress={() => this.click(item.name, item)}
        />
      );
    }
  };

  render() {
    const { openModal, closeModal, onlinestore: { setInputDetails, getFilterCategoryList, getCategoryList } } = this.props;
    return (
      <Modal
        ref={"modalCategories"}
        visible={openModal}
        transparent
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal} >
          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.3)' }}>
            <TouchableWithoutFeedback onPress={() => console.log("")}>
              <View style={{ width: width, height: height / 2, backgroundColor: "white" }}>
                <FlatList
                  contentContainerStyle={{ paddingBottom: 20 }}
                  data={formatData(getFilterCategoryList.category, numColumns, getCategoryList)}
                  renderItem={this._renderItem}
                  numColumns={numColumns}
                  keyExtractor={(item, index) => `idx ${index}`} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

export default ModalCategories;