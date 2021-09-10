import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Bar } from 'react-native-progress';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');


export default class SeeAllItemsOnSale extends React.PureComponent {

    _goToPreview = (item) => {
        const { navigation, actions, marketplace: { setSelectedItems }, login: { session } } = this.props;
        let newPreviewDetails = _.merge({}, setSelectedItems);
        newPreviewDetails.header = item.name;
        actions.setSelectedItems(newPreviewDetails);
        actions.postSelectedProducts(session, item.id, item.slug);
    }

    _renderAllItemsOnSale = ({ item, index }) => {
        const bar = Math.round(item.sale_bar) / 100;

        return (
            <View key={`id ${index}`} style={{ width: width / 2.1, marginTop: 10 }}>
                <TouchableOpacity onPress={() => this._goToPreview(item)} style={{
                    alignSelf: "center", borderWidth: .5, shadowOffset: { width: 1, height: 1, },
                    shadowColor: Colors.grey400, shadowOpacity: 1, borderColor: Colors.grey400, height: 170, width: "95%",
                    borderRadius: 10
                }}>
                    {/* <Image source={{ uri: item.coverImg }} style={{ width: "100%", height: "50%", borderTopLeftRadius: 5, borderTopRightRadius: 5 }} /> */}
                    <View style={{ backgroundColor: "pink", width: "100%", height: "50%", borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />

                    <View style={{ position: "absolute", top: -5, right: 0, }}>
                        <Image resizeMode='contain' source={Res.get("discount_banner")} style={{ height: 50, width: 30, borderTopRightRadius: 2 }} />
                        <View style={{ position: "absolute", top: 5, right: 5, }}>
                            <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 10, fontFamily: "Roboto-Light" }}>{Math.round(item.discount_percent)}%</Text>
                            <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 10, fontFamily: "Roboto-Light" }}>OFF</Text>
                        </View>
                    </View>
                    <Text style={{ marginTop: 5, height: 30, alignSelf: "center", textAlign: "center", fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                        {item.name}
                    </Text>
                    <View style={{ paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ width: "60%", textAlign: "center", fontSize: 12, fontWeight: "bold", fontFamily: "Roboto-Light", color: "black" }}>₱ {Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}</Text>
                        <Text style={{ width: "40%", textAlign: "center", fontSize: 10, textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                            ₱ {Number(parseFloat(item.old_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
                        </Text>
                    </View>
                    <Bar
                        unfilledColor={Colors.grey300}
                        width={150}
                        height={12}
                        style={{ alignSelf: "center", marginTop: 5 }}
                        borderColor={Colors.grey300}
                        borderRadius={10}
                        progress={bar}
                        color={Color.colorPrimaryMP} />
                    <Text style={{ textAlign: "center", position: "absolute", alignSelf: "center", bottom: 15, fontSize: 10, fontFamily: "Roboto-Light", color: "black" }}>
                        {`${item.sale} SOLD`}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { navigation, marketplace: { getSaleProducts } } = this.props;
        return (
            <ScrollView>
                <View style={{ backgroundColor: "white", padding: 10, width: width, height: height }}>
                    <View style={{ width: "100%", height: "100%" }}>
                        <FlatList
                            data={getSaleProducts.data}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => `id ${item.id}`}
                            renderItem={this._renderAllItemsOnSale} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}