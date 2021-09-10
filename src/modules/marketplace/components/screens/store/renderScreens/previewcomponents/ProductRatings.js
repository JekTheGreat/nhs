import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import _ from 'lodash';
import { Rating } from 'react-native-ratings';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import moment from 'moment';
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class ProductRatings extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            randomBG: [],
            seeMore: false,
        }
    }

    componentWillMount() {
        const { productDetails } = this.props;
        const { randomBG } = this.state;
        for (let i = 0; i < productDetails.reviews.length; i++) {
            randomBG.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')')
        }
        this.setState({ randomBG: randomBG });
    }

    _reviews = ({ item, index }) => {
        const { productDetails } = this.props;
        const date = moment(item.UpdatedAt).fromNow();
        const rate = item.rate / 2;
        return (
            <View key={`rev ${index}`} style={{ marginVertical: 10 }}>
                <View style={{ height: 1, backgroundColor: Colors.grey200 }} />
                <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
                    <View>
                        <Text style={{
                            paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20, fontFamily: "Roboto-Light",
                            backgroundColor: this.state.randomBG[index], color: "white", fontWeight: "bold", fontSize: 14,
                        }}>
                            {item.rater.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 10, }}>
                        <Text style={{ fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 13, }}>
                            {item.rater}
                        </Text>
                        <Rating
                            style={{ alignSelf: "flex-start", marginTop: 5 }}
                            startingValue={rate}
                            readonly={true}
                            imageSize={10}
                            ratingColor={Color.colorPrimaryMP} />
                    </View>
                    <View style={{ marginLeft: 5, }}>
                        <Text style={{ fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 12, }}>
                            {date}
                        </Text>
                    </View>
                </View>

                <Text style={{ marginTop: 5, fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 12, }}>
                    {item.comment}
                </Text>
            </View>

        )
    }

    render() {
        const { productDetails, marketplace: { setSelectedItems, } } = this.props;
        const revData = !this.state.seeMore ? _.slice(productDetails.reviews, 0, 3) : productDetails.reviews;
        const rate = productDetails.rate / 2;
        return (
            <View style={{ marginHorizontal: 15, }}>
                <Text style={{ fontFamily: "Roboto-Light", fontSize: 16, color: "black", fontWeight: "bold", }}>Product Ratings</Text>
                <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginRight: 15 }}>
                        <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: Color.colorPrimaryMP, fontWeight: "bold", marginRight: 5 }}> {rate} </Text>
                        <Rating
                            style={{ alignSelf: "center" }}
                            startingValue={rate}
                            readonly={true}
                            imageSize={15}
                            ratingColor={Color.colorPrimaryMP} />
                        <Text style={{ fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard2, marginLeft: 10 }}> {`|     ${productDetails.reviews.length} Ratings`} </Text>
                    </View>
                </View>
                <FlatList
                    data={revData}
                    style={{ marginTop: 15 }}
                    keyExtractor={(item, index) => { `rev ${index}` }}
                    renderItem={this._reviews} />

                <View style={{ height: 1, marginTop: 10, backgroundColor: Colors.grey200 }} />

                <TouchableOpacity onPress={() => this.setState({ seeMore: !this.state.seeMore })} style={{ marginTop: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: Color.colorPrimaryMP, fontWeight: "bold", fontSize: 12, fontFamily: "Roboto-Light", marginRight: 5, }}>{this.state.seeMore ? "Show Less" : "Show More"}</Text>
                    <Icon type='font-awesome' name={this.state.seeMore ? 'chevron-up' : 'chevron-down'} color={Color.colorPrimaryMP} size={13} />
                </TouchableOpacity>
            </View>
        )
    }
}
