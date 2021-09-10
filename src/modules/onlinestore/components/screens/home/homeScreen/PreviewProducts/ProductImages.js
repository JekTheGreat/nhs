/* eslint-disable */
import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import _ from "lodash";
import styles from "../../../../../styles.css";
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color } = Resources;

class ProductImages extends React.PureComponent {

    openSearch = () => {
        const { actions } = this.props;
        actions.setOnlineStoreScreen("searchScreen");
    }

    _onPress = (item, index) => {
        const { changeImage } = this.props;
        changeImage(item, index);
    }

    _renderItem = ({ item, index }) => {
        const { imageURL } = this.props;
        return (
            <View key={index} style={styles.previewProductsFlatlistView}>
                <TouchableOpacity onPress={() => this._onPress(item.url)}
                    style={[item.url === imageURL ? { borderColor: "#F6C933", borderWidth: 1 } : { borderColor: Colors.grey200 },
                    styles.previewProductsFlatlistTouchableOpacity]}>
                    {/* <Image
                        style={styles.previewProductsFlatlistImage}
                        source={{ uri: item.url }} /> */}
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const { imageURL, onlinestore: { setSelectedItems } } = this.props;
        const previewProducts = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
        return (
            <View style={styles.previewProductsMainView}>
                <View style={[previewProducts.quality === "Brand New" ? { backgroundColor: Colors.blueA400 } :
                    { backgroundColor: Colors.yellow700 }, styles.homeRenderProductSubView1]}>
                    <Text style={styles.homeRenderProductTextQuality}> {previewProducts.quality}</Text>
                </View>
                <TouchableOpacity onPress={() => this.openSearch()} style={{
                    position: "absolute", top: 10, right: 15, alignSelf: "flex-end", height: 30, width: 30,
                    backgroundColor: Colors.yellow700, borderRadius: 20, justifyContent: "center", alignItems: "center"
                }}>
                    <Icon type='font-awesome' name='search' size={15} color={"white"} containerStyle={{ padding: 2 }} />
                </TouchableOpacity>
                <Image
                    resizeMode='cover'
                    style={styles.previewProductsImage}
                    source={{ uri: imageURL }}
                />
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.previewProductsFlatlist}
                    data={previewProducts.images}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => `idx ${index}`} />
            </View>
        );
    }
}
export default ProductImages;