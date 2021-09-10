/* eslint-disable */
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import { Rating } from 'react-native-ratings';
import Resources from "__src/resources";
const { Color } = Resources;

class ReviewsProducts extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            randomBG: [],
        }
    }
    componentWillMount() {
        const { onlinestore: { setSelectedItems } } = this.props;
        const { randomBG } = this.state;
        const selectedProduct = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
        for (let i = 0; i < selectedProduct.reviews.length; i++) {
            randomBG.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')')
        }
        this.setState({ randomBG: randomBG });
    }

    _reviews = ({ item, index }) => {
        const date = moment(item.UpdatedAt).fromNow();
        const rate = item.rate / 2;
        return (
            <View style={{ marginVertical: 5 }}>
                <View style={{ height: .5, backgroundColor: Color.Standard }} />
                <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
                    <View>
                        <Text style={{
                            paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20, fontFamily: "Roboto-Light",
                            backgroundColor: this.state.randomBG[index], color: "white", fontWeight: "bold", fontSize: 14,
                        }}>
                            {item.rater.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 5, }}>
                        <Text style={{ fontWeight: "bold", fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 13, }}>
                            {item.rater}
                        </Text>
                        <Rating
                            style={{ alignSelf: "flex-start", marginTop: 5 }}
                            startingValue={rate}
                            readonly={true}
                            imageSize={10}
                            ratingColor={Color.colorPrimary} />
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
        const { onlinestore: { setSelectedItems } } = this.props;
        const selectedProduct = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
        return (
            <View style={{}}>
                <FlatList
                    data={selectedProduct.reviews}
                    keyExtractor={(item, index) => { index }}
                    renderItem={this._reviews} />
            </View>

        )
    }

}

export default ReviewsProducts;