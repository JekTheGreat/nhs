/* eslint-disable */
import React, { useRef } from 'react';
import { ScrollView, View, Text, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from "react-native-elements";
import { Colors } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import _ from "lodash";
import SliderEntry from "./SliderEntry";
import styles from "../../../../../styles.css";
import Resources from "__src/resources";
const { Color } = Resources;
// const { height, width } = Dimensions.get('window');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
var SLIDER_1_FIRST_ITEM = 1

class RecommendedProducts extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM
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
                options[itemOptions] = item.options[itemOptions][0];
                newInput.options = options;
            })
            actions.setInputDetails(newInput);
        }
        selectedItem.previewProducts = item;
        actions.setSelectedItems(selectedItem);
    }

    _recommendedItems = ({ item, index }) => {
        const { recommended } = this.props;
        const price = Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        const b = item.price_range.split(/[.\-_]/);
        const c = b.map(Number);
        const minPrice = (c[0]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const maxPrice = (c[1]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const priceRange = _.isEqual(minPrice, maxPrice) ? maxPrice : `${minPrice} ~ ${maxPrice}`;
        return (
            <View style={[recommended.length > 2 ? { width: width / 3 - 3 } : { width: "50%" }, { marginBottom: 10 }]}>
                <TouchableOpacity key={index} onPress={() => this._previewProduct(item, index)} style={{
                    borderRadius: 8, borderWidth: .5, borderColor: Colors.grey300, flexDirection: "row",
                    backgroundColor: "white", paddingVertical: 10, justifyContent: "space-between", width: "100%",
                }}>
                    <View style={{ alignItems: "center" }}>
                        <View style={[item.quality === "Brand New" ? { backgroundColor: Colors.blueA400 } :
                            { backgroundColor: Colors.yellow700 }, { paddingHorizontal: 10, marginRight: 5, alignSelf: "flex-end", paddingVertical: 5, borderRadius: 5 }]}>
                            <Text style={[styles.homeRenderProductTextQuality, { alignSelf: "center" }]}> {item.quality}</Text>
                        </View>
                        {/* <Image
                            source={_.isEmpty(item.coverImg) ? null : { uri: item.coverImg }}
                            resizeMode="stretch"
                            style={{ marginTop: 5, height: 120, width: "95%", alignSelf: "center" }} /> */}
                        <View style={{ marginTop: 10, height: 45, justifyContent: "center" }}>
                            <Text style={{ fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 13, textAlign: "center" }}>{item.name}</Text>
                        </View>

                        <View style={{ alignSelf: "center", marginTop: 10, flexDirection: "row", justifyContent: "space-between", flex: 1, }}>
                            <View style={[recommended.length > 2 ? { width: "60%" } : { width: "80%" }]}>
                                <Text style={[{ textAlign: "center", paddingRight: 5, fontFamily: 'Roboto-Light', fontWeight: "bold", fontSize: 11 }]}>₱ {_.isEmpty(item.variation) ? price : priceRange} </Text>
                            </View>
                            <View style={[recommended.length > 2 ? { width: "40%" } : { width: "20%" }, { alignItems: "center", justifyContent: "center" }]}>
                                <View style={[{ flexDirection: "row", backgroundColor: "#EEB91A", paddingHorizontal: 8, paddingVertical: 5, borderRadius: 15 }]}>
                                    <Icon type='font-awesome' name='star' size={9} color={Colors.white} />
                                    <Text style={{ fontFamily: "Roboto-Light", textAlign: "center", fontWeight: "bold", fontSize: 10, color: "white", marginLeft: 3 }}>{item.rate}</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>

        );
    }


    _renderItem = ({ item, index }, parallaxProps) => {
        return (
            <SliderEntry
                {...this.props}
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }


    render() {
        const { isShowMore, showMore, recommended, onlinestore: { setSelectedItems } } = this.props;
        const previewProducts = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
        const recommendedProductsArray = showMore ? recommended : _.slice(recommended, 0, 3);
        function wp(percentage) {
            const value = (percentage * viewportWidth) / 100;
            return Math.round(value);
        }
        const slideWidth = wp(75);
        const itemHorizontalMargin = wp(2);
        const itemWidth = slideWidth + itemHorizontalMargin * 2;
        return (
            <View>
                <View style={[styles.homeView, { marginTop: 5 }]}>
                    <Text style={styles.homelatestProducts}>Recommended For You</Text>
                    <TouchableOpacity onPress={isShowMore}>
                        <Text style={styles.homeSeeMore}>{showMore ? "Show Less" : "Show More"}</Text>
                    </TouchableOpacity>
                </View>
                {/* <FlatList
                    style={{ marginHorizontal: 5 }}
                    numColumns={3}
                    data={recommendedProductsArray}
                    renderItem={this._recommendedItems}
                    keyExtractor={(item, index) => `idx ${index}`} /> */}


                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={recommendedProductsArray}
                    renderItem={this._renderItem}
                    sliderWidth={viewportWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    containerCustomStyle={{ overflow: 'visible' }}
                    contentContainerCustomStyle={{ paddingVertical: 10 }}
                    // loop={true}
                    // loopClonesPerSide={2}
                    // autoplay={true}
                    // autoplayDelay={500}
                    // autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })} />
            </View>
        )
    }
}


export default RecommendedProducts;