import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import _ from 'lodash';
import HTML from "react-native-render-html";
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

export default class ProductSpecifications extends React.PureComponent {

    state = {
        showMore: false,
    }

    _productImages = ({ item, index }) => {
        // return (
        //     <Image resizeMode="contain" style={{ flex: 1, flexDirection: "row", margin: 5, height: 100, width: 100 }} source={{ uri: item.url }} />
        // );
    }

    render() {
        const { productDetails } = this.props;
        const shipFrom = !_.isEmpty(productDetails.area) ? `${productDetails.area[0].region}, ${productDetails.area[0].city}` : "";
        return (
            <View style={{ marginVertical: 20, }}>
                <Text style={{ marginHorizontal: 15, fontWeight: "bold", fontSize: 16, fontFamily: "Roboto-Light" }}>Product Specifications</Text>
                <View style={{ height: 1, marginVertical: 15, backgroundColor: Colors.grey200 }} />
                <View style={{ marginHorizontal: 15 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: "35%", color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light" }}>Category</Text>
                        <Text style={{ width: "65%", color: Color.colorTextMP, fontSize: 14, fontFamily: "Roboto-Light" }}>{`${_.capitalize(productDetails.category)}`}</Text>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ width: "35%", color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light" }}>Brand</Text>
                        <Text style={{ color: Color.colorTextMP, fontSize: 14, fontFamily: "Roboto-Light" }}>{`${_.capitalize(productDetails.brand)}`}</Text>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ width: "35%", color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light" }}>Stock</Text>
                        <Text style={{ color: Color.colorTextMP, fontSize: 14, fontFamily: "Roboto-Light" }}>{`${productDetails.quantity}`}</Text>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ width: "35%", color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light" }}>Ship From</Text>
                        <Text style={{ color: Color.colorTextMP, fontSize: 14, fontFamily: "Roboto-Light" }}>{shipFrom}</Text>
                    </View>
                </View>
                { this.state.showMore ?
                    <View style={{ marginHorizontal: 15, marginTop: 15 }}>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: Color.Standard2, marginBottom: 15 }}>Product Description </Text>
                            <HTML
                                baseFontStyle={{ fontSize: 12, color: Colors.grey600, fontFamily: "Roboto-Light", }}
                                textSelectable={true} html={productDetails.desc}
                                renderers={{ img: (item, index) => <Image key={index} source={{ uri: item.src }} style={{ marginTop: 10, height: 150, width: "100%" }} /> }} />
                            {!_.isUndefined(productDetails.images) ?
                                <FlatList
                                    data={productDetails.images}
                                    numColumns={2}
                                    renderItem={this._productImages}
                                    keyExtractor={(item, index) => `idx${index}`} /> : ""}
                        </View>
                    </View> : null}
                <TouchableOpacity onPress={() => this.setState({ showMore: !this.state.showMore })} style={{ marginTop: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: Color.colorPrimaryMP, fontSize: 12, fontWeight: "bold", fontFamily: "Roboto-Light", marginRight: 5, }}>{this.state.showMore ? "Show Less" : "Show More"}</Text>
                    <Icon type='font-awesome' name={this.state.showMore ? 'chevron-up' : 'chevron-down'} color={Color.colorPrimaryMP} size={13} />
                </TouchableOpacity>
                <View style={{ height: 1, marginTop: 15, backgroundColor: Colors.grey200 }} />
            </View>
        )
    }
}