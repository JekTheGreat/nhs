import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, FlatList, Dimensions } from 'react-native';
import _ from 'lodash';
import { HeaderBackButton } from "react-navigation-stack";
import Button from "__src/components/Button";
import { Icon, ListItem } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class SearchCategories extends React.PureComponent {


    _onPress = (item) => {
        const { actions, navigation, marketplace: { setInputDetails }, login: { session } } = this.props;
        const categName = _.merge({}, setInputDetails);
        let name = _.merge({}, categName.categoryName)
        name = item.name;
        let param = {};
        if (!_.isEmpty(item.sub)) {
            const data = _.map(item.sub, sub => {
                return sub.name;
            })
            param.categories = [{ name: item.slug, sub: data }];
        }
        else {
            param.categories = [{ name: item.slug }];
        }
        categName.categoryName = `Category ${name}`;
        actions.postProductList(session, param);
        actions.setInputDetails(categName);
        actions.isSearchInput(false);
        actions.setFilterScreen("categories");
    }


    _renderCategs = ({ item, index }) => {
        const img = _.isNull(item.url) ? { uri: "https://unified.ph/static/images/UPS_Logo.png" } : { uri: item.url };
        return (
            !_.isEmpty(item.name) &&
            <TouchableOpacity key={`item_id ${index}`}
                onPress={() => this._onPress(item)}
                style={{
                    marginVertical: 10, width: "50%", justifyContent: "space-between", alignItems: "center",
                    backgroundColor: "white",
                }}>
                <View style={{ flexDirection: "row", alignSelf: "flex-start", alignItems: "center", justifyContent: "center" }}>
                    <View style={{
                        height: 40, width: 40, backgroundColor: "white", alignItems: "center", justifyContent: "center",
                        borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2, },
                        shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                    }}>
                        <Image source={img} resizeMode='contain' style={{ height: 30, width: 30 }} />
                    </View>
                    <Text style={{ marginLeft: 10, width: "70%", fontSize: 12, fontFamily: "Roboto-Light" }}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { marketplace: { getFilterCategoryList, getCategoryList } } = this.props;
        return (
            <View style={{ height: "50%" }}>
                <Text style={{ paddingHorizontal: 15, paddingVertical: 10, fontSize: 14, fontWeight: "bold", fontFamily: "Roboto", color: "black" }}>Categories</Text>
                <View style={{ backgroundColor: Colors.grey200, height: 1 }} />
                <FlatList
                    // data={getFilterCategoryList.category}
                    data={getCategoryList}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    style={{ paddingHorizontal: 15 }}
                    renderItem={this._renderCategs}
                    keyExtractor={(item, index) => `item_id ${index}`} />

                <View style={{ marginTop: 10, height: 20 }} />
            </View>
        )
    }
}