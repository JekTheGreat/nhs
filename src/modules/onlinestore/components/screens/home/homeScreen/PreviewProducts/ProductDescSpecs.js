/* eslint-disable */
import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from "react-native";
import HTML from "react-native-render-html";
import { Icon } from "react-native-elements";
import _ from "lodash";
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color } = Resources;

class ProductDescSpecs extends React.PureComponent {

    _productImages = ({ item, index }) => {
        // return (
        //     <Image resizeMode="contain" style={{ flex: 1, flexDirection: "row", margin: 5, height: 100, width: 100 }} source={{ uri: item.url }} />
        // );
    }
    render() {
        const { isProductDescShowing, showProductDesc, onlinestore: { setSelectedItems } } = this.props;
        const previewProducts = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
        return (
            <View>
                <View style={{
                    paddingLeft: 15, paddingRight: 10, backgroundColor: "white", marginLeft: 10, marginRight: 10, marginTop: 10,
                    borderRadius: 8, borderWidth: 1, borderColor: Colors.grey300
                }}>
                    <TouchableOpacity onPress={isProductDescShowing} style={{
                        justifyContent: "space-between",
                        alignItems: "center", flexDirection: "row", margin: 5,
                    }}>
                        <Text style={{ fontSize: 13, fontWeight: "bold", color: Color.Standard2 }}>Return & Warranty</Text>
                        <Icon type='evilicon' name={showProductDesc ? "chevron-down" : "chevron-up"} size={30} />
                    </TouchableOpacity>
                </View>
                {
                    showProductDesc ? <View style={{
                        paddingLeft: 15, paddingRight: 15, backgroundColor: "white", marginLeft: 10, marginRight: 10, marginTop: 10,
                        borderRadius: 8, borderWidth: 1, borderColor: Colors.grey300
                    }}>
                        <View style={{ backgroundColor: "white" }}>
                            <Text style={{ fontSize: 13, marginTop: 20, fontWeight: "bold", color: Color.Standard2, marginBottom: 15 }}>Product Description and Specification</Text>
                            <HTML
                                baseFontStyle={{ fontSize: 12, color: Colors.grey600, fontFamily: "Roboto-Light", }}
                                textSelectable={true} html={previewProducts.desc}
                                renderers={{
                                    img: (item, index) => <Image key={index} source={{ uri: item.src }} style={{ marginTop: 10, height: 150, width: "100%" }} />
                                }} />
                            <View style={{ flex: 1, flexDirection: "row", }}>
                                {
                                    (!_.isUndefined(previewProducts.images)) ?
                                        <FlatList
                                            data={previewProducts.images}
                                            numColumns={2}
                                            renderItem={this._productImages}
                                            keyExtractor={(item, index) => `idx${index}`} /> : ""
                                }
                            </View>
                            <View style={{ height: 20 }}></View>
                        </View>
                    </View> : null
                }
            </View>
        )
    }
}

export default ProductDescSpecs;