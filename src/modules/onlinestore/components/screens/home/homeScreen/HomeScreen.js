/* eslint-disable */
import React, { PureComponent } from 'react';
import { View, Text, ScrollView, Dimensions, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import ServiceItem from "./ServiceItem";
import PropTypes from 'prop-types';
import { Icon } from "react-native-elements";
import ModalCategories from "./ModalCategories";
import _ from "lodash";
import Resources from "__src/resources";
import styles from "../../../../styles.css"
import { Colors } from 'react-native-paper';

var { height, width } = Dimensions.get('window');
const { Color, Res } = Resources;
const formatData = (data, numColumns) => {
  const categoryArray = _.slice(data, 0, 7);
  categoryArray.push({ name: "More" });
  const numberOfFullRows = Math.floor(categoryArray.length / numColumns);
  let numberOfElementsLastRow = categoryArray.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    categoryArray.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return categoryArray;
};

const numColumns = 4;
let itemQuality = [];
const showLess = 3;
class HomeScreen extends PureComponent {
  scrollRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      openModal: false,
      showMore: false,
      activeButton: "Suggested",
      mostSearch: [],
      somethingNew: [],
      adsImage: [],
    };
    this.timer = 0;
  }
  componentDidMount = () => {
    // this.timer = setInterval(() => {
    //   this.setState(prev => ({ selectedIndex: prev.selectedIndex === this.state.adsImage.length - 1 ? 0 : prev.selectedIndex + 1 }),
    //     () => {
    //       this.scrollRef.current.scrollTo({
    //         animated: true,
    //         y: 0,
    //         x: width * this.state.selectedIndex
    //       })
    //     }
    //   )
    // }, 5000);
  }

  componentWillMount() {
    const { actions, onlinestore: { getAdsImages } } = this.props;
    let pics = [];
    // _.map(getAdsImages, data => {
    //   _.map(data.gallery, pic => {
    //     pics.push(pic.url);
    //   })
    // })
    this.setState({ adsImage: pics })
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  setSelectedIndex = event => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    const selectedIndex = Math.floor(contentOffset / viewSize);
    this.setState({ selectedIndex });
  }

  _renderItem = ({ item, index }) => {
    if (!_.isUndefined(item.name)) {
      return (
        <ServiceItem key={`idx${index}`}
          item={item.name}
          onPress={() => this.click(item.name, item)}
        />
      );
    }
  };

  click = (categoryName, item) => {
    const { openModal } = this.state;
    const { navigation, actions, login: { session }, onlinestore: { setInputDetails, setOnlineStoreScreen } } = this.props;
    let param = {}
    let newParam = {};
    if (_.isEqual(categoryName, "More")) {
      this.setState({ openModal: true });
    }
    else if (categoryName) {
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

  _previewProduct = (item, index) => {
    const { actions, onlinestore: { setOnlineStoreScreen, setInputDetails, setSelectedItems } } = this.props;
    delete setInputDetails.options;
    const selectedItem = _.merge({}, setSelectedItems);
    const newInput = _.merge({}, setInputDetails);
    let options = _.merge({}, newInput.options);
    const productOptions = _.has(item, 'options') ? Object.keys(item.options) : [];
    if (_.has(item, 'options')) {
      _.map(productOptions, itemOptions => {
        console.log("toPREVIEW:", itemOptions, item.options[itemOptions][0]);
        options[itemOptions] = item.options[itemOptions][0];
        newInput.options = options;
      })
      actions.setInputDetails(newInput);
    }
    selectedItem.previewProducts = item;
    actions.setSelectedItems(selectedItem);
    actions.setOnlineStoreScreen("previewproducts");
  }

  _renderProductList = ({ item, index }) => {
    const price = Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
    const b = item.price_range.split(/[.\-_]/);
    const c = b.map(Number);
    const minPrice = (c[0]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    const maxPrice = (c[1]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    const priceRange = _.isEqual(minPrice, maxPrice) ? maxPrice : `${minPrice} ~ ${maxPrice}`;
    return (
      <TouchableOpacity style={styles.homeRenderProductTouchableOpacity}
        onPress={() => this._previewProduct(item, index)} >
        <View style={styles.homeRenderProductMainView}>
          {/* <Image
            source={_.isEmpty(item.coverImg) ? null : { uri: item.coverImg }}
            style={styles.homeRenderProductImage} /> */}
          <View>
            <View style={styles.homeRenderProductSubView2}>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", }}>
                <Text style={styles.homeRenderProductTextName}> {item.name} </Text>
              </View>
            </View>
            <View style={{ justifyContent: "flex-end", alignItems: "flex-end", }}>
              <View style={{
                flexDirection: "row", backgroundColor: "#EEB91A", paddingHorizontal: 10, paddingVertical: 5,
                borderRadius: 15
              }}>
                <Icon type='font-awesome' name='star' size={9} color={Colors.white} />
                <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 9, color: "white", marginLeft: 3 }}>
                  {item.rate}</Text>
              </View>
            </View>
            <View style={styles.homeRenderProductSubView3}>
              <Text style={styles.homeRenderProductTextPrice}>₱ {_.isEmpty(item.variation) ? price : priceRange} </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _shuffle = () => {
    const { actions, onlinestore: { getMostSearch } } = this.props;
    this.setState({ mostSearch: _.shuffle(getMostSearch) });
  }

  _mostSearchTab = (item, index) => {
    const { actions, onlinestore: { setInputDetails } } = this.props;
    const newObject = _.merge({}, setInputDetails);
    newObject.mostSearchTab = item;
    actions.setInputDetails(newObject);
    actions.setOnlineStoreScreen("selectedCategory")
  }

  _renderMostSearch = ({ item, index }) => {
    const coverImg1 = _.isUndefined(item.product[0]) ? {} : item.product[0];
    const coverImg2 = _.isUndefined(item.product[1]) ? {} : item.product[1];
    const coverImg3 = _.isUndefined(item.product[2]) ? {} : item.product[2];
    return (
      <View key={index} style={{
        flex: 1, borderRadius: 8, borderWidth: .5, borderColor: Colors.grey300,
        backgroundColor: "white", marginHorizontal: 8, justifyContent: "center"
      }}>
        <TouchableOpacity onPress={() => this._mostSearchTab(item, index)} style={{ height: 140, alignItems: "center", }}>
          <View style={{ flexDirection: "row", width: "80%", justifyContent: "space-between" }}>
            {/* <Image
              style={{ height: 80, width: 50, marginTop: 10 }}
              resizeMode={'contain'}
              source={_.isEqual(coverImg1.coverImg, "") || _.isUndefined(coverImg1.coverImg) ? null : { uri: coverImg1.coverImg }}
            />
            <View style={{}}>
              <Image
                style={{ height: 40, width: 50, marginTop: 10 }}
                resizeMode={'contain'}
                source={_.isEqual(coverImg2.coverImg, "") || _.isUndefined(coverImg2.coverImg) ? null : { uri: coverImg2.coverImg }}
              />
              <Image
                style={{ height: 40, width: 50 }}
                resizeMode={'contain'}
                source={_.isEqual(coverImg3.coverImg, "") || _.isUndefined(coverImg3.coverImg) ? null : { uri: coverImg3.coverImg }}
              />
            </View> */}
          </View>
          <Text style={{ marginTop: 10, fontFamily: "Roboto", fontSize: 12, fontWeight: "bold", textAlign: "center" }}>{item.name}</Text>
          <Text style={{ fontFamily: "Roboto", fontSize: 12, textAlign: "center" }}>{`${item.product.length} Products`}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  closeModal = () => {
    this.setState({ openModal: false });
  }

  showMore = () => {
    const { actions, onlinestore: { setInputDetails } } = this.props;
    const param = _.merge({}, setInputDetails);
    param.showMore = !setInputDetails.showMore;
    actions.setInputDetails(param);
  }

  openSearch = () => {
    const { actions, onlinestore: { setOnlineStoreScreen } } = this.props;
    actions.setOnlineStoreScreen("searchScreen");
  }

  _selectItemQuality = (label) => {
    const { onlinestore: { getSomethingNew } } = this.props;
    const quality = _.filter(getSomethingNew.data, item => {
      if (_.isEqual(label, item.quality)) {
        return item;
      }
    })
    this.setState({ activeButton: label });
    this.setState({ somethingNew: quality });
  }

  _renderSomethingNew = ({ item, index }) => {
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
        {/* <Image
          source={_.isEmpty(item.coverImg) ? null : { uri: item.coverImg }}
          style={{ height: 120, width: 150, alignSelf: "center", resizeMode: "contain" }} /> */}
        <Text style={{ marginTop: 10, fontFamily: "Roboto", color: Color.Standard2, fontSize: 13, textAlign: "center" }}>{item.name}</Text>
        <View style={{ alignSelf: "center", marginTop: 10, bottom: 0, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, width: "100%" }}>
          <Text style={{ width: "80%", paddingRight: 5, fontFamily: 'Roboto-Light', fontWeight: "bold", fontSize: 14 }}>₱ {_.isEmpty(item.variation) ? price : priceRange} </Text>
          <View style={{ flexDirection: "row", backgroundColor: "#EEB91A", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 }}>
            <Icon type='font-awesome' name='star' size={9} color={Colors.white} />
            <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 9, color: "white", marginLeft: 3 }}>{item.rate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    let imageHeight = Math.round((width * 9) / 18);
    const { selectedIndex, showMore, adsImage, activeButton, mostSearch, somethingNew } = this.state;
    const { actions, navigation, onlinestore: { getProductList, getCategoryList, getMostSearch, getFilterCategoryList, setInputDetails, getAdsImages, getSomethingNew, setSelectedItems } } = this.props;
    const productArray = setInputDetails.showMore ? getProductList.data : _.slice(getProductList.data, 0, showLess);
    let data = []
    _.map(getProductList, parent => {
      _.map(parent, child => {
        data = _.concat(data, child.quality)
      })
    })
    itemQuality = _.uniq(data);
    itemQuality.unshift("Suggested");
    const mostSearchData = _.isEmpty(mostSearch) ? _.slice(getMostSearch, 0, showLess) : _.slice(mostSearch, 0, showLess);
    const somethingNewData = _.isEmpty(somethingNew) ? getSomethingNew.data : somethingNew;

    return (
      <ScrollView style={{ backgroundColor: Color.bg }}>
        <View style={{
          flex: 1, flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center",
          backgroundColor: "white", padding: 20, shadowOffset: { width: 1, height: 1, },
          shadowColor: Colors.grey400, shadowOpacity: 1,
        }}>
          <TouchableOpacity onPress={() => this.openSearch()} style={{
            borderWidth: 1, borderColor: Color.colorPrimary,
            flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: 10,
            width: width - 30, backgroundColor: Colors.white, shadowOffset: { width: 1, height: 1, }, shadowColor: "#F6C933", shadowOpacity: 1, borderRadius: 10
          }}>
            <Text style={{ paddingVertical: 10, paddingHorizontal: 10, color: Color.Standard, fontFamily: "Roboto" }}> Enter keywords to search </Text>
            <Icon type='font-awesome' name='search' size={15} color={Color.Standard} containerStyle={{ paddingRight: 10 }} />
          </TouchableOpacity>
        </View>

        {/* <View style={{ borderWidth: .5, borderColor: Colors.grey300, marginVertical: 15, marginHorizontal: 15, borderRadius: 15 }}>
          <ScrollView ref={this.scrollRef}
            pagingEnabled
            horizontal
            style={{ borderRadius: 15, }}
            onMomentumScrollEnd={this.setSelectedIndex} >
            {getAdsImages.map(image => (
              image.gallery.map(item => (
                <TouchableOpacity key={item.id} >
                  <Image
                    source={{ uri: item.url }}
                    resizeMode='stretch'
                    style={{
                      height: 190,
                      width: width, alignSelf: "center"
                    }}
                  />
                </TouchableOpacity>
              ))
            ))}
          </ScrollView>
          <View style={{
            position: "absolute", bottom: 20, height: 10, width: width - 25, display: "flex",
            flexDirection: "row", justifyContent: "center", alignItems: "center"
          }}>
            {getAdsImages.map(image => (
              image.gallery.map((item, i) => (
                <View key={item.id}
                  style={{ width: 6, height: 6, borderRadius: 3, marginHorizontal: 5, backgroundColor: Colors.white, opacity: i === selectedIndex ? 1 : 0.7 }} />
              ))
            ))}
          </View>
        </View> */}

        <View style={styles.homeView}>
          <FlatList
            data={formatData(getFilterCategoryList.category, numColumns)}
            renderItem={this._renderItem}
            numColumns={numColumns}
            keyExtractor={(item, index) => `idx ${index}`} />
        </View>

        <View style={styles.homeView}>
          <Text style={styles.homelatestProducts}>Latest Products</Text>
          <TouchableOpacity onPress={() => this.showMore()}>
            <Text style={styles.homeSeeMore}>{setInputDetails.showMore ? "Show Less" : "Show More"}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={productArray}
          renderItem={this._renderProductList}
          keyExtractor={(item, index) => `idx ${index}`} />

        <View style={styles.homeView}>
          <Text style={styles.homelatestProducts}>Most Search Items</Text>
          <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}
            onPress={this._shuffle} >
            <Text style={{ marginRight: 5, color: "#EEB91A", fontFamily: "Roboto-Light", fontWeight: "bold" }}>Change</Text>
            <Image source={Res.get("change_arrow")} style={{ height: 15, width: 15 }} />
          </TouchableOpacity>
        </View>

        <FlatList
          numColumns={3}
          data={mostSearchData}
          renderItem={this._renderMostSearch}
          keyExtractor={(item, index) => `idx ${index}`} />

        <View style={[styles.homeView, { marginTop: 10 }]}>
          <Text style={styles.homelatestProducts}>Discover Something New</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
          {
            _.map(itemQuality, (label, index) => {
              return <TouchableOpacity key={index} onPress={() => this._selectItemQuality(label)} style={[_.isEqual(activeButton, label) ? { backgroundColor: Color.colorPrimary } :
                { backgroundColor: "white" }, { borderRadius: 8, borderWidth: .5, borderColor: Colors.grey300, paddingHorizontal: 10, paddingVertical: 5 }]}>
                <Text style={[_.isEqual(activeButton, label) ? { color: "white", fontWeight: "bold" } : { color: "black" }, { fontFamily: "Roboto", fontSize: 13 }]}>{`${label} Items`}</Text>
              </TouchableOpacity>
            })
          }
        </View>
        <FlatList
          numColumns={2}
          data={somethingNewData}
          renderItem={this._renderSomethingNew}
          keyExtractor={(item, index) => `idx ${index}`} />

        <View style={{ height: 80 }}></View>
        <ModalCategories
          {...this.props}
          {...this.state}
          openModal={this.state.openModal}
          closeModal={this.closeModal}
        />

      </ScrollView>

    );
  }
}

HomeScreen.propTypes = {
  onlinestore: PropTypes.object,
  navigation: PropTypes.object,
};

export default HomeScreen;
