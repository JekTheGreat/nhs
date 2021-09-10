/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ParallaxImage } from 'react-native-snap-carousel';
import { Colors } from 'react-native-paper';
import { Icon } from "react-native-elements";
import Resources from "__src/resources";
const { Color } = Resources;
const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const slideHeight = viewportHeight * 0.50;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
const itemWidth = slideWidth + itemHorizontalMargin * 2;
const entryBorderRadius = 8;

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image() {
        const { data: { coverImg }, even, parallax, parallaxProps } = this.props;
        const amp = _.isUndefined(coverImg) ? {} : coverImg;
        return parallax ? (
            <ParallaxImage
                source={{ uri: amp }}
                containerStyle={[{
                    flex: 1, marginBottom: IS_IOS ? 0 : -1, backgroundColor: 'white',
                    borderTopLeftRadius: entryBorderRadius, borderTopRightRadius: entryBorderRadius
                },]}
                style={{
                    ...StyleSheet.absoluteFillObject, resizeMode: 'cover', borderRadius: IS_IOS ? entryBorderRadius : 0,
                    borderTopLeftRadius: entryBorderRadius, borderTopRightRadius: entryBorderRadius
                }}
                parallaxFactor={0.35}
                showSpinner={true}
                spinnerColor={'rgba(0, 0, 0, 0.25)'}
                {...parallaxProps} />
        ) : (
                <Image
                    source={{ uri: amp }}
                    style={{
                        ...StyleSheet.absoluteFillObject, resizeMode: 'cover', borderRadius: IS_IOS ? entryBorderRadius : 0,
                        borderTopLeftRadius: entryBorderRadius, borderTopRightRadius: entryBorderRadius
                    }} />
            );
    }

    _previewProduct = (item) => {
        const { actions, onlinestore: { setInputDetails, setSelectedItems } } = this.props;
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

    render() {
        const { data: { name, quality, coverImg, rate, price, price_range, variation }, even, data } = this.props;
        const presyo = Number(parseFloat(price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        const b = price_range.split(/[.\-_]/);
        const c = b.map(Number);
        const minPrice = (c[0]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const maxPrice = (c[1]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const priceRange = _.isEqual(minPrice, maxPrice) ? maxPrice : `${minPrice} ~ ${maxPrice}`;
        const uppercaseTitle = name ? (
            <Text style={[{ color: Color.Standard2, fontSize: 13, fontFamily: "Roboto-Light", alignSelf: "center", letterSpacing: 0.5 },]} numberOfLines={2} >
                {name.toUpperCase()}
            </Text>
        ) : false;

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{ width: itemWidth, height: slideHeight, paddingHorizontal: itemHorizontalMargin, paddingBottom: 18 }}
                onPress={() => this._previewProduct(data)} >

                <View style={{
                    position: 'absolute', top: 0, left: itemHorizontalMargin, right: itemHorizontalMargin, bottom: 18,
                    shadowColor: "black", shadowOpacity: 0.25, shadowOffset: { width: 0, height: 10 }, shadowRadius: 10,
                    borderRadius: entryBorderRadius
                }} />
                <View style={{ backgroundColor: "white", paddingRight: 10, paddingTop: 10 }}>
                    <View style={[quality === "Brand New" ? { backgroundColor: Colors.blueA400 } :
                        { backgroundColor: Colors.yellow700 }, { paddingHorizontal: 10, marginRight: 5, alignSelf: "flex-end", paddingVertical: 5, borderRadius: 5 }]}>
                        <Text style={{ fontFamily: 'Roboto-Light', fontSize: 9, color: "white", fontWeight: "bold", alignSelf: "center" }}> {quality}</Text>
                    </View>
                </View>

                <View style={[{
                    flex: 1, marginBottom: IS_IOS ? 0 : -1, backgroundColor: 'white', borderTopLeftRadius: entryBorderRadius,
                    borderTopRightRadius: entryBorderRadius
                }]}>
                    {/* {this.image} */}
                    <View style={[{
                        position: 'absolute', ottom: 0, left: 0, right: 0, height: entryBorderRadius,
                        backgroundColor: 'white'
                    }]} />
                </View>
                <View style={[{
                    justifyContent: 'center', paddingTop: 20 - entryBorderRadius, paddingBottom: 20,
                    paddingHorizontal: 16, backgroundColor: 'white', borderBottomLeftRadius: entryBorderRadius,
                    borderBottomRightRadius: entryBorderRadius
                }]}>
                    {uppercaseTitle}
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text
                            style={[{ marginTop: 6, color: "gray", fontSize: 12, fontStyle: 'italic' }]}
                            numberOfLines={2} >
                            ₱ {_.isEmpty(variation) ? presyo : priceRange}
                        </Text>
                        <View style={[{ marginTop: 6, alignItems: "center", flexDirection: "row", backgroundColor: "#EEB91A", paddingHorizontal: 8, paddingVertical: 5, borderRadius: 15 }]}>
                            <Icon type='font-awesome' name='star' size={9} color={Colors.white} />
                            <Text style={{ fontFamily: "Roboto-Light", textAlign: "center", fontWeight: "bold", fontSize: 10, color: "white", marginLeft: 3 }}>{rate / 2}</Text>
                        </View>
                    </View>
                </View>
            </ TouchableOpacity>
        );
    }
}
