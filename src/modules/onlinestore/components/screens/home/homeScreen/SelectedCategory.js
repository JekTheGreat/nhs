/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import Button from "__src/components/Button";
import PropTypes from 'prop-types';
import { CheckBox, Icon } from "react-native-elements";
import _ from "lodash";
import FilterModal from './FilterModal';
import Resources from "__src/resources";
const { Color, Res } = Resources;
import { Colors } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
var { height, width } = Dimensions.get('window');
const sampleBanner = "https://storage.googleapis.com/v3onlinestore-bucket-main-01/0d882cda-ec2d-47e7-bd3f-1b52d6f159c3.png";
class SelectedCategory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalPress: false,
      items: [],
      filteredItems: [],
    };
  }

  componentWillUnmount() {
    const { actions, onlinestore: { setInputDetails } } = this.props;
    delete setInputDetails.category;
    delete setInputDetails.mostSearchTab;
    const newInput = _.merge({}, setInputDetails);
    let param = _.merge({}, newInput.filterBy)
    param = {}
    newInput.filterBy = param
    newInput.isFilterBySearch = false;
    newInput.searchBy = ""
    actions.setInputDetails(newInput);
  }

  openSearch = () => {
    const { actions, onlinestore: { setOnlineStoreScreen } } = this.props;
    actions.setOnlineStoreScreen("searchScreen");
  }

  _modalPress = () => {
    const { modalPress } = this.state;
    this.setState({ modalPress: !modalPress });
  }

  closeModal = () => {
    this.setState({ modalPress: false });
  }

  _previewProduct = (item, index) => {
    const { actions, onlinestore: { setOnlineStoreScreen, setInputDetails, setSelectedItems } } = this.props;
    const newInput = _.merge({}, setInputDetails.previewProducts);
    newInput.previewProducts = item;
    actions.setSelectedItems(newInput);
    actions.setOnlineStoreScreen("previewproducts");
  }

  _renderItems = ({ item, index }) => {
    const { onlinestore: { setInputDetails } } = this.props;
    const price = Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
    const b = item.price_range.split(/[.\-_]/);
    const c = b.map(Number);
    const minPrice = (c[0]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    const maxPrice = (c[1]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    const priceRange = _.isEqual(minPrice, maxPrice) ? maxPrice : `${minPrice} ~ ${maxPrice}`;
    return (
      <TouchableOpacity key={index} onPress={() => this._previewProduct(item, index)} style={{
        marginTop: 15, borderRadius: 8, borderWidth: .5, borderColor: Colors.grey300,
        backgroundColor: "white", marginHorizontal: 8, paddingVertical: 10, width: width / 2 - 15, justifyContent: "space-between",
      }}>
        <Image
          source={_.isEmpty(item.coverImg) ? null : { uri: item.coverImg }}
          resizeMode="contain"
          style={{ height: 120, width: 150, alignSelf: "center" }} />
        <Text style={{ marginTop: 10, fontFamily: "Roboto", color: Color.Standard2, fontSize: 13, textAlign: "center" }}>{item.name}</Text>
        <Text style={{ marginLeft: 10, marginTop: 10, fontFamily: 'Roboto-Light', fontWeight: "bold", fontSize: 14 }}>₱ {_.isEmpty(item.variation) ? price : priceRange} </Text>
        <View style={{
          flexDirection: "row", backgroundColor: "#EEB91A", width: 50, justifyContent: "flex-end", alignSelf: "flex-end",
          paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, marginRight: 5
        }}>
          <Icon type='font-awesome' name='star' size={9} color={Colors.white} />
          <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 9, color: "white", marginLeft: 3 }}>{item.rate}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _subCategories = ({ item, index }) => {
    return (
      <View key={index} style={{
        marginTop: 10, borderRadius: 8, borderWidth: .5, borderColor: Colors.grey300,
        backgroundColor: "white", marginHorizontal: 8, justifyContent: "center"
      }}>
        <TouchableOpacity onPress={() => console.log("MOST SEARCH: ", item)} style={{ height: 140, width: 120, alignItems: "center" }}>
          {/* <Image 
            style= {{height: 80, width: 50, marginTop: 10}}
            resizeMode = {'contain'}
            source={_.isEqual(coverImg1.coverImg, "") || _.isUndefined(coverImg1.coverImg)? null:{uri: coverImg1.coverImg}} /> */}
          <Text style={{ marginTop: 10, fontFamily: "Roboto", fontSize: 13, color: Color.Standard2, fontWeight: "bold", textAlign: "center" }}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  }


  renderBySearch = () => {
    const { onlinestore: { searchedProducts, setInputDetails } } = this.props;
    return !_.isEmpty(searchedProducts) ?
      <View>
        <Text style={{ marginTop: 15, marginLeft: 10, fontSize: 18, fontWeight: "bold", fontFamily: "Roboto" }}>{`Search Result form "${setInputDetails.searchBy}"`}</Text>
        <FlatList
          numColumns={2}
          data={searchedProducts.data}
          renderItem={this._renderItems}
          keyExtractor={(item, index) => `idx ${index}`} />
      </View> : null
  }

  renderByCategorySearch = () => {
    const { onlinestore: { getProductList, setInputDetails, postProductList, searchedProducts } } = this.props;
    const data = _.isUndefined(setInputDetails.mostSearchTab) ? postProductList.data : setInputDetails.mostSearchTab.product;
    return (
      <View>
        <Image
          source={{ uri: sampleBanner }}
          resizeMode='stretch'
          style={{
            height: 190, borderWidth: .5, borderColor: Colors.grey300, marginVertical: 25, marginHorizontal: 15, borderRadius: 15,
            width: width - 25, alignSelf: "center"
          }} />

        {
          !_.isUndefined(setInputDetails.mostSearchTab) ? null : !_.has(setInputDetails, "filterBy.categories.sub") ?
            null : <View>
              <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: "bold", fontFamily: "Roboto" }}>Sub Categories</Text>
              <FlatList
                numColumns={3}
                data={setInputDetails.filterBy.categories.sub}
                renderItem={this._subCategories}
                keyExtractor={(item, index) => `idx ${index}`} />
            </View>
        }

        {
          !_.isUndefined(setInputDetails.mostSearchTab) ? <Text style={{ marginTop: 15, marginLeft: 10, fontSize: 18, fontWeight: "bold", fontFamily: "Roboto" }}>Most Search Item
         <Text style={{ fontSize: 18, fontWeight: "bold", fontFamily: "Roboto", color: Color.colorPrimary }}>{` "${setInputDetails.mostSearchTab.name}"`}</Text> </Text> :
            _.isEmpty(postProductList.data) ? null : <Text style={{ marginTop: 15, marginLeft: 10, fontSize: 18, fontWeight: "bold", fontFamily: "Roboto" }}>Recommended Items</Text>
        }

        <FlatList
          numColumns={2}
          data={data}
          renderItem={this._renderItems}
          keyExtractor={(item, index) => `idx ${index}`} />
      </View>
    )
  }

  render() {
    const { modalPress, items, filteredItems } = this.state;
    const { onlinestore: { setInputDetails } } = this.props;
    return (
      <ScrollView style={{ backgroundColor: Color.bg }}>
        <View style={{
          flex: 1, flexDirection: "row", justifyContent: "space-between",
          backgroundColor: "white", padding: 20, shadowOffset: { width: 1, height: 1, },
          shadowColor: Colors.grey400, shadowOpacity: 1, width: width
        }}>
          <TouchableOpacity onPress={() => this.openSearch()} style={{
            borderWidth: 1, borderColor: Color.colorPrimary,
            alignSelf: "flex-start", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: 10,
            width: width - 110, backgroundColor: Colors.white, shadowOffset: { width: 1, height: 1, }, shadowColor: "#F6C933", shadowOpacity: 1, borderRadius: 10
          }}>
            <Text style={{ paddingVertical: 10, paddingHorizontal: 10, color: Color.Standard, fontFamily: "Roboto" }}> {setInputDetails.isFilterBySearch ? setInputDetails.searchBy : "Enter keywords to search"} </Text>
            <Icon type='font-awesome' name='search' size={15} color={Color.Standard} containerStyle={{ paddingRight: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._modalPress()} style={{ flexDirection: "row", alignSelf: "flex-end", alignItems: "center", justifyContent: "center", width: 50, }}>
            <Icon type='font-awesome' name='bars' size={23} color={"#E4A406"} />
            <Text style={{ paddingVertical: 10, fontSize: 15, color: "#E4A406", fontFamily: "Roboto" }}> Filter </Text>
          </TouchableOpacity>
        </View>

        {setInputDetails.isFilterBySearch ? this.renderBySearch() : this.renderByCategorySearch()}

        {/* <Image
          source={{ uri: sampleBanner }}
          resizeMode='stretch'
          style={{
            height: 190, borderWidth: .5, borderColor: Colors.grey300, marginVertical: 25, marginHorizontal: 15, borderRadius: 15,
            width: width - 25, alignSelf: "center"
          }} />

        {
          !_.isUndefined(setInputDetails.mostSearchTab) ? null : !_.has(setInputDetails, "filterBy.categories.sub") ?
            null : <View>
              <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: "bold", fontFamily: "Roboto" }}>Sub Categories</Text>
              <FlatList
                numColumns={3}
                data={setInputDetails.filterBy.categories.sub}
                renderItem={this._subCategories}
                keyExtractor={(item, index) => `idx ${index}`} />
            </View>
        }

        {
          !_.isUndefined(setInputDetails.mostSearchTab) ? <Text style={{ marginTop: 15, marginLeft: 10, fontSize: 18, fontWeight: "bold", fontFamily: "Roboto" }}>Most Search Item
         <Text style={{ fontSize: 18, fontWeight: "bold", fontFamily: "Roboto", color: Color.colorPrimary }}>{` "${setInputDetails.mostSearchTab.name}"`}</Text> </Text> :
            _.isEmpty(postProductList.data) ? null : <Text style={{ marginTop: 15, marginLeft: 10, fontSize: 18, fontWeight: "bold", fontFamily: "Roboto" }}>Recommended Items</Text>
        }

        <FlatList
          numColumns={2}
          data={arrData}
          renderItem={this._renderItems}
          keyExtractor={(item, index) => `idx ${index}`} /> */}


        <FilterModal
          {...this.props} {...this.state}
          openModal={modalPress}
          closeModal={this.closeModal} />
      </ScrollView>
    );
  }
}

SelectedCategory.propTypes = {
  onlinestore: PropTypes.object,
  navigation: PropTypes.object,
};

export default SelectedCategory;