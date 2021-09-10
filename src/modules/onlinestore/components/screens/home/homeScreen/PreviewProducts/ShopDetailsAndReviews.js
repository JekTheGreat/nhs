/* eslint-disable */
import React from 'react';
import { View, Text, Image, Animated, FlatList } from 'react-native';
import { Colors } from 'react-native-paper';
import { Bar } from 'react-native-progress';
import _ from 'lodash';
import { Rating } from 'react-native-ratings';
import { Icon } from 'react-native-elements';
import ReviewsProducts from "./ReviewsProducts";
import Resources from "__src/resources";
const { Color, Res } = Resources;

class ShopDetailsAndReviews extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            aboutStoreList: ["Products", "Ratings", "Cancellation", "Ship Out Time"],
        }
    }

    _renderItem = ({ item, index }) => {
        let iconName;
        let iconLabel;
        switch (item) {
            case "Products":
                iconName = Res.get("store_products");
                iconLabel = "300"
                break;
            case "Ratings":
                iconName = Res.get("store_ratings")
                iconLabel = "4.6"
                break;
            case "Cancellation":
                iconName = Res.get("store_cancelled");
                iconLabel = "1%"
                break;
            case "Ship Out Time":
                iconName = Res.get("store_delivery_duration");
                iconLabel = "2 - 4 Days"
                break;
        }

        return (
            <View style={[index % 4 !== 0 && { borderLeftWidth: 1, borderLeftColor: Color.Standard }, { flex: 1, justifyContent: "center" }]}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Image resizeMode='contain' style={{ height: 15, width: 15 }} source={iconName} />
                    <Text style={{ marginLeft: 5, fontSize: 13, fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.colorPrimary }}>
                        {iconLabel}
                    </Text>
                </View>
                <Text style={{ textAlign: "center", marginTop: 5, fontSize: 13, fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                    {item}
                </Text>
            </View >
        )
    }

    _progressBar = ({ item, index }) => {
        const { onlinestore: { setSelectedItems } } = this.props;
        const selectedProduct = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
        const count = _.isUndefined(item) ? 0 : item;
        const bar = _.isEqual(count, 0) ? 0 : count / selectedProduct.reviews.length;
        return (
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 10, marginTop: 10 }}>
                <Bar
                    unfilledColor={Colors.grey200}
                    width={120}
                    height={19}
                    borderRadius={0}
                    progress={bar}
                    color={Color.colorPrimary} />
                <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", color: Color.Standard2, marginLeft: 5 }}>
                    {`(${count})`}
                </Text>
            </View>
        )
    }

    _userRatings = ({ item, index }) => {
        return (
            <View style={{ marginTop: 6 }}>
                < Rating
                    startingValue={item}
                    readonly={true}
                    imageSize={25}
                    ratingColor={Color.colorPrimary} />
            </View>
        )
    }

    render() {
        const { onlinestore: { setSelectedItems } } = this.props;
        const { aboutStoreList, reviewRange } = this.state;
        const selectedProduct = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
        const storeLogo = !_.isEmpty(selectedProduct.shop_id.logo) ? { uri: selectedProduct.shop_id.logo } : Res.get("store_name");
        const countRates = _.map(selectedProduct.reviews, (count) => {
            if (count.rate / 2 === 5) {
                return count.rate / 2;
            }
            else if (count.rate / 2 >= 4 && count.rate / 2 < 5) {
                return count.rate / 2;
            }
            else if (count.rate / 2 >= 3 && count.rate / 2 < 4) {
                return count.rate / 2;
            }
            else if (count.rate / 2 >= 2 && count.rate / 2 < 3) {
                return count.rate / 2;
            }
            else if (count.rate / 2 >= 1 && count.rate / 2 < 2) {
                return count.rate / 2;
            }
        })
        const filterrates = _.countBy(countRates, Math.round);
        const newArr = Object.assign([], filterrates)
        newArr.shift();
        let arrRatings = []
        for (let x = 5; x > 0; x--) {
            arrRatings.push(x)
        }
        while (newArr.length < 5) {
            newArr.push()
            newArr.length++;
        }
        return (
            <View style={{ backgroundColor: "white", marginHorizontal: 10, marginBottom: 10, borderRadius: 8, borderWidth: 1, borderColor: Colors.grey300 }}>
                <View style={{ marginHorizontal: 10, marginVertical: 20 }} >

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Image
                            style={{ height: 55, width: "40%" }}
                            resizeMode='stretch'
                            source={storeLogo} />
                        <View style={{ height: 40, width: "55%" }}>
                            <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", color: "black", fontWeight: "bold" }}>
                                {`${selectedProduct.shop_id.name}'s Store`}
                            </Text>
                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                <View>
                                    <Icon type='font-awesome' name='bookmark' size={15} color={Color.colorPrimary} />
                                </View>
                                <Text style={{ textAlign: "center", marginLeft: 5, fontSize: 13, fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                                    Verified Store
                                </Text>
                            </View>
                        </View>
                    </View>

                    <FlatList
                        style={{ marginVertical: 20 }}
                        numColumns={aboutStoreList.length}
                        data={aboutStoreList}
                        keyExtractor={(item, index) => index}
                        renderItem={this._renderItem} />

                    <View style={{ height: 1, backgroundColor: Color.Standard }} />

                    <View style={{ marginTop: 15, marginHorizontal: 5 }}>
                        <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", color: Color.Standard2, fontWeight: "bold" }}>
                            Rating and Reviews
                        </Text>
                        <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", color: Color.Standard2, marginTop: 10 }}>
                            {`Overall Rating based on ${selectedProduct.reviews.length} reviews`}
                        </Text>
                        <View style={{ justifyContent: "space-between", flexDirection: "row", marginTop: 10, marginBottom: 20 }}>
                            <FlatList
                                style={{ width: "25%" }}
                                data={arrRatings}
                                keyExtractor={(item, index) => `idx ${index}`}
                                renderItem={this._userRatings} />
                            <FlatList
                                data={newArr}
                                inverted
                                keyExtractor={(item, index) => `idx ${index}`}
                                renderItem={this._progressBar} />
                        </View>
                        <ReviewsProducts {...this.props} />
                    </View>

                </View>
            </View>
        )
    }
}

export default ShopDetailsAndReviews;