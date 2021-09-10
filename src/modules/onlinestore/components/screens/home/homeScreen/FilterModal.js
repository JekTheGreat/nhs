/* eslint-disable */
import React from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, Modal, Dimensions, Alert } from "react-native";
import _ from "lodash";
import { Rating, AirbnbRating } from 'react-native-ratings';
import Dropdown from "__src/components/Dropdown";
import Button from "__src/components/Button";
import Resources from "__src/resources";
import { Icon, CheckBox } from "react-native-elements";
const { Color } = Resources;
const { width, height } = Dimensions.get('window');

class FilterModal extends React.PureComponent {

  componentWillMount() {
    const { onlinestore: { setInputDetails } } = this.props;
  }

  renderBase(type) {
    const { onlinestore: { setInputDetails } } = this.props;
    if (_.isEqual(type, "mainCategories")) {
      return (
        <View style={{
          flexDirection: "row", width: "95%", height: 40, alignItems: "center", alignSelf: "center", borderColor: Color.Standard,
          borderWidth: 0.6, borderRadius: 5, paddingHorizontal: 5, marginTop: 10
        }}>
          <Text style={{ flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingLeft: 5 }}>{_.has(setInputDetails, "category") ? setInputDetails.category
            : "Please select Category"}
          </Text>
          <Icon type='material' name='expand-more' color={"black"} size={27} />
        </View>
      );
    }

    if (_.isEqual(type, "subCategories")) {
      return (
        <View style={{
          flexDirection: "row", width: "95%", height: 40, alignItems: "center", alignSelf: "center", borderColor: Color.Standard,
          borderWidth: 0.6, borderRadius: 5, paddingHorizontal: 5, marginTop: 10
        }}>
          <Text style={{ flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingLeft: 5 }}>
            {!_.has(setInputDetails, "filterBy.categories.sub") ? "" :
              setInputDetails.filterBy.categories.sub.length !== 1 ? `${setInputDetails.filterBy.categories.sub[0]}` :
                `${setInputDetails.filterBy.categories.sub}`
            }
          </Text>
          <Icon type='material' name='expand-more' color={"black"} size={27} />
        </View>
      );
    }
  }

  renderRow(type, rowData, rowID, highlighted) {
    const { onlinestore: { setInputDetails } } = this.props;
    if (_.isEqual(type, "mainCategories")) {
      return (
        <View style={[{ paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white" },
        highlighted && { backgroundColor: Color.highlight }]}>
          <Text style={[{ margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center" },
            highlighted]}>
            {`${rowData.name}`}
          </Text>
        </View>
      );
    }
    else if (!_.isEmpty(rowData) && _.isEqual(type, "subCategories")) {
      return (
        <View style={[{ paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white" },
        highlighted && { backgroundColor: Color.highlight }]}>
          <Text style={[{ margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center" },
            highlighted]}>
            {`${rowData.name}`}
          </Text>
        </View>
      );
    }
  }


  onChange = (type) => (value) => {
    const { actions, onlinestore: { setInputDetails } } = this.props;
    const newInput = _.merge({}, setInputDetails);
    let params = _.merge({}, newInput.filterBy.categories);
    switch (type) {
      case "mainCategories":
        delete params.sub;
        params.name = value.slug;
        newInput.category = value.name;
        break;

      case "subCategories":
        params.sub = [value.name];
        break;
    }
    newInput.filterBy.categories = params;
    actions.setInputDetails(newInput);
  }

  onSelection = (item) => {
    const { actions, onlinestore: { setInputDetails } } = this.props;
    const newInput = _.merge({}, setInputDetails);
    let params = _.merge({}, newInput.brandCB);
    let selectedItem = { ...params };
    let value = !selectedItem[item.name];
    if (value) {
      selectedItem[item.name] = true;
    } else {
      delete selectedItem[item.name];
    }
    newInput.brandCB = selectedItem;
    actions.setInputDetails(newInput);
  }

  _brand = ({ item, index }) => {
    const { onlinestore: { setInputDetails } } = this.props;
    const params = setInputDetails.brandCB;
    const selected = params[item.name] ? true : false;
    return (
      <ScrollView style={{ flex: 1, }}>
        <CheckBox
          containerStyle={{ padding: 0, borderColor: "transparent", backgroundColor: "transparent", marginLeft: 5, }}
          textStyle={{ color: 'black', fontFamily: "Roboto-Light", fontSize: 14, fontWeight: '100', textAlign: "left" }}
          title={item.name}
          key={index}
          checkedColor={Color.colorPrimary}
          checked={selected}
          onPress={() => this.onSelection(item)} />
      </ScrollView>
    );
  }

  ratingCompleted(rating) {
    const { actions, onlinestore: { setInputDetails } } = this.props;
    const newInput = _.merge({}, setInputDetails);
    const param = _.merge({}, newInput.filterBy);
    param.rate = [rating];
    newInput.filterBy = param;
    actions.setInputDetails(newInput);
  }

  _apply = () => {
    const { closeModal, actions, onlinestore: { setInputDetails, getMostSearch }, login: { session } } = this.props;
    let param = {};
    const mostSearch = _.filter(getMostSearch, data => {
      if (setInputDetails.category === data.name) {
        return data.product;
      }
    })
    const newInput = _.merge({}, setInputDetails);
    let mostSearchTab = _.merge({}, newInput.mostSearchTab);
    if ((!_.isUndefined(setInputDetails.filterBy.priceRange)) && (setInputDetails.filterBy.priceRange.low > setInputDetails.filterBy.priceRange.high)) {
      Alert.alert("Minimum Amount should not be higher than Maximum Amount");
    }
    else if ((_.isUndefined(setInputDetails.filterBy.priceRange)) || (_.isUndefined(setInputDetails.filterBy.priceRange.low)) && (!_.isUndefined(setInputDetails.filterBy.priceRange.high) && setInputDetails.filterBy.priceRange.high !== 0) ||
      (_.isUndefined(setInputDetails.filterBy.priceRange.high)) && (!_.isUndefined(setInputDetails.filterBy.priceRange.low) && setInputDetails.filterBy.priceRange.low !== 0)) {
      Alert.alert("You should input amount for both Minimum and Maximum price");
    }
    else {
      if (!_.isUndefined(setInputDetails.mostSearchTab)) {
        mostSearchTab = mostSearch[0];
        newInput.mostSearchTab = mostSearchTab;
        actions.setInputDetails(newInput);
        closeModal();
      }
      else {
        newInput.isFilterBySearch = false;
        actions.setInputDetails(newInput);
        param.categories = [setInputDetails.filterBy.categories];
        param.brand = Object.keys(setInputDetails.brandCB);
        param.rate = setInputDetails.filterBy.rate;
        param.priceRange = setInputDetails.filterBy.priceRange;
        actions.postProductList(param, session)
        delete setInputDetails.mostSearchTab;
        closeModal();
      }
    }
  }

  _onChangeText = (type, price) => {
    const { actions, onlinestore: { setInputDetails } } = this.props;
    const newInput = _.merge({}, setInputDetails);
    const param = _.merge({}, newInput.filterBy.priceRange);
    if (_.isEqual(type, "min")) {
      param.low = Number(price);
      newInput.filterBy.priceRange = param
    }
    else {
      param.high = Number(price);
      newInput.filterBy.priceRange = param
    }
    actions.setInputDetails(newInput);

  }

  render() {
    const { openModal, closeModal, onlinestore: { setInputDetails, getMostSearch, getFilterCategoryList, getCategoryList } } = this.props;
    let disable = {};
    let holderSub = [];
    const combineCateg = _.concat(getFilterCategoryList.category, getCategoryList);
    const mainCateg = _.has(setInputDetails, "category") ? setInputDetails.category : {};
    const filterCateg = _.filter(combineCateg, categ => {
      if (_.isEqual(categ.name, mainCateg)) {
        return categ;
      }
    })

    const filterMostSearch = _.filter(getMostSearch, categ => {
      if (_.isEqual(categ.name, mainCateg)) {
        return categ;
      }
    })
    const data = _.isUndefined(setInputDetails.mostSearchTab) ? filterCateg : filterMostSearch;
    const categData = _.isUndefined(setInputDetails.mostSearchTab) ? combineCateg : getMostSearch;
    _.map(data, item => {
      holderSub = item.sub;
    })
    _.map(holderSub, parent => {
      disable = parent;
    })
    const minPrice = _.has(setInputDetails, "filterBy.priceRange.low") ? setInputDetails.filterBy.priceRange.low : "";
    const maxPrice = _.has(setInputDetails, "filterBy.priceRange.high") ? setInputDetails.filterBy.priceRange.high : "";
    const rating = _.has(setInputDetails, "filterBy.rate") ? setInputDetails.filterBy.rate : 0;
    return (
      <Modal
        ref={"filterModal"}
        visible={openModal}
        transparent
        onRequestClose={closeModal}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <ScrollView style={{ borderRadius: 10, shadowRadius: 5, width: width - 60, height: height - 130, backgroundColor: "white" }}>
            <View style={{ height: "90%", paddingHorizontal: 15 }}>

              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ marginTop: 20, color: "black", fontWeight: "bold", fontFamily: "Roboto", fontSize: 20 }}>Filters</Text>
                <Text onPress={closeModal} style={{ color: "black", fontWeight: "bold", fontFamily: "Arial", fontSize: 15 }}>x</Text>
              </View>

              <View>
                <Text style={{ marginTop: 15, paddingLeft: 5, color: Color.Standard2, fontWeight: "bold", fontFamily: "Roboto", fontSize: 16 }}>Main Categories</Text>
                <Dropdown
                  animated={true}
                  showsVerticalScrollIndicator={true}
                  renderBase={this.renderBase.bind(this, "mainCategories")}
                  dropdownStyle={{ height: 175 }}
                  options={categData}
                  renderButtonText={this.onChange("mainCategories")}
                  renderRow={this.renderRow.bind(this, "mainCategories")}
                  renderSeparator={null} />
              </View>
              <View style={{ marginVertical: 20, height: 1, width: "100%", backgroundColor: "#D8D8D8" }} />

              <View>
                <Text style={{ paddingLeft: 5, color: Color.Standard2, fontWeight: "bold", fontFamily: "Roboto", fontSize: 16 }}>Sub Categories</Text>
                <Dropdown
                  animated={true}
                  showsVerticalScrollIndicator={true}
                  renderBase={this.renderBase.bind(this, "subCategories")}
                  dropdownStyle={{ height: 175 }}
                  disabled={_.isEmpty(disable)}
                  options={holderSub}
                  renderButtonText={this.onChange("subCategories")}
                  renderRow={this.renderRow.bind(this, "subCategories")}
                  renderSeparator={null} />
              </View>
              <View style={{ marginVertical: 20, height: 1, width: "100%", backgroundColor: "#D8D8D8" }} />

              <View>
                <Text style={{ paddingLeft: 5, color: Color.Standard2, fontWeight: "bold", fontFamily: "Roboto", fontSize: 16 }}>Brands</Text>
                <View style={{ height: 140, marginTop: 10 }}>
                  <FlatList
                    contentContainerStyle={{}}
                    scrollEnabled={true}
                    data={getFilterCategoryList.brand}
                    numColumns={2}
                    keyExtractor={(item, index) => `idx ${index}`}
                    renderItem={this._brand} />
                </View>
              </View>
              <View style={{ marginVertical: 20, height: 1, width: "100%", backgroundColor: "#D8D8D8" }} />

              <View>
                <Text style={{ paddingLeft: 5, color: Color.Standard2, fontWeight: "bold", fontFamily: "Roboto", fontSize: 16 }}>Price</Text>
                <View style={{ marginTop: 10, flexDirection: "row", alignSelf: "center", justifyContent: "space-between", alignItems: "center" }}>
                  <TextInput
                    style={{ height: 40, paddingLeft: 10, width: "40%", borderRadius: 10, borderColor: Color.Standard, borderWidth: 1 }}
                    placeholder="Min"
                    keyboardType={"number-pad"}
                    defaultValue={minPrice.toString()}
                    onChangeText={input => this._onChangeText("min", input)}
                  />
                  <View style={{ height: 1, width: "10%", marginHorizontal: 10, backgroundColor: "#D8D8D8" }} />

                  <TextInput
                    style={{ height: 40, paddingLeft: 10, width: "40%", borderRadius: 10, borderColor: Color.Standard, borderWidth: 1 }}
                    placeholder="Max"
                    keyboardType={"number-pad"}
                    defaultValue={maxPrice.toString()}
                    onChangeText={input => this._onChangeText("max", input)}
                  />
                </View>
              </View>
              <View style={{ marginVertical: 20, height: 1, width: "100%", backgroundColor: "#D8D8D8" }} />

              <View>
                <Text style={{ paddingLeft: 5, color: Color.Standard2, fontWeight: "bold", fontFamily: "Roboto", fontSize: 16 }}>Ratings</Text>
                <AirbnbRating
                  starStyle={{ marginTop: 10 }}
                  count={5}
                  defaultRating={rating}
                  showRating={false}
                  size={45}
                  onFinishRating={(rating) => this.ratingCompleted(rating)}
                />
              </View>

            </View>

            <View style={{ borderBottomStartRadius: 10, borderBottomEndRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, height: 80, backgroundColor: "#F1F1F1" }}>
              <Button onPress={this._apply} style={{ marginTop: 18, justifyContent: "center", alignSelf: "center", width: "80%" }}
                label="Apply" />
            </View>
          </ScrollView>
        </View>
      </Modal>
    )
  }
}


export default FilterModal;