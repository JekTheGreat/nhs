import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Bar } from 'react-native-progress';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class ItemsOnSale extends React.PureComponent {

    _goToPreview = (item) => {
        const { navigation, actions, marketplace: { setSelectedItems }, login: { session } } = this.props;
        let newPreviewDetails = _.merge({}, setSelectedItems);
        newPreviewDetails.header = item.name;
        actions.setSelectedItems(newPreviewDetails);
        actions.postSelectedProducts(session, item.id, item.slug);
    }

    _renderSales = ({ item, index }) => {
        const bar = Math.round(item.sale_bar) / 100;
        return (
            <View style={{ alignItems: "center", justifyContent: "center", width: width / 2.3, paddingHorizontal: 5 }}>
                <TouchableOpacity onPress={() => this._goToPreview(item)}
                    style={{ marginTop: 5, backgroundColor: "white", borderRadius: 10 }}>
                    <Image source={{ uri: item.coverImg }} style={{ alignSelf: "center", width: "100%", height: 80, resizeMode: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                    {/* <View style={{ alignSelf: "center", marginTop: 10, backgroundColor: "pink", width: 110, height: 80 }} /> */}

                    <View style={{ position: "absolute", top: -5, right: 0, }}>
                        <Image resizeMode='contain' source={Res.get("discount_banner")} style={{ height: 50, width: 30, borderTopRightRadius: 5, }} />
                        <View style={{ position: "absolute", top: 5, right: 5, }}>
                            <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 10, fontFamily: "Roboto-Light" }}>{Math.round(item.discount_percent)}%</Text>
                            <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 10, fontFamily: "Roboto-Light" }}>OFF</Text>
                        </View>
                    </View>
                    <Text style={{ height: 30, alignSelf: "center", textAlign: "center", fontSize: 11, fontFamily: "Roboto-Light", color: Color.Standard2 }}>{item.name}</Text>
                    <View style={{ paddingHorizontal: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ width: "50%", textAlign: "center", fontSize: 11, fontWeight: "bold", fontFamily: "Roboto-Light", color: "black" }}>₱ {Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}</Text>
                        <Text style={{ width: "50%", textAlign: "center", fontSize: 10, textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                            ₱ {Number(parseFloat(item.old_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
                        </Text>
                    </View>
                    <Bar
                        unfilledColor={Colors.grey100}
                        width={150}
                        height={12}
                        style={{ alignSelf: "center", marginVertical: 10, }}
                        borderColor={Colors.grey100}
                        borderRadius={10}
                        progress={bar}
                        color={Color.colorPrimaryMP} />
                    <Text style={{ textAlign: "center", position: "absolute", alignSelf: "center", bottom: 10, fontSize: 10, fontFamily: "Roboto-Light", color: "black" }}>
                        {`${item.sale} SOLD`}
                    </Text>
                </TouchableOpacity>
            </View >
        )
    }

    render() {
        const { navigation, marketplace: { getSaleProducts } } = this.props;
        return (
            <View style={{ marginVertical: 5, backgroundColor: Color.colorPrimaryMP, paddingVertical: 10 }}>
                <View style={{ flexDirection: "row", paddingHorizontal: 15, justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", fontFamily: "Roboto", color: "white" }}>Items for Sale</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("ItemsOnSale")} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "white", fontWeight: "bold", marginRight: 5, textDecorationLine: "underline" }}>See All</Text>
                        {/* <Icon type='font-awesome' name="long-arrow-right" size={20} color={Color.colorPrimaryMP} /> */}
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={_.slice(getSaleProducts.data, 0, 10)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10, marginTop: 10 }}
                    keyExtractor={index => { index }}
                    renderItem={this._renderSales} />

            </View>
        )
    }
}