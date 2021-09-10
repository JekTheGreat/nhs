import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');
const formatData = (data, rows) => {
    let categArray = data;
    const len = _.isEmpty(data) ? 0 : data.length;
    const roundedRows = Math.ceil(len / rows)
    const fullRows = roundedRows * rows;
    const elementsOfRows = fullRows - 1
    for (let x = len; x <= elementsOfRows; x++) {
        categArray.push({ name: "", empty: true })
    }
    return categArray;
}

export default class Categories extends React.PureComponent {

    state = {
        activeIndexCateg: 0,
    }

    componentDidUpdate(prevProps) {
        const { actions, navigation, marketplace: { transactionInProgress, setInputDetails, postProductList } } = this.props;
        if (setInputDetails.route === "MarketPlace" && navigation.state.routeName === "MarketPlaceMain" && !_.isEqual(prevProps.marketplace.postProductList, postProductList) && !_.isEmpty(postProductList)) {
            navigation.navigate("FilterScreens");
            delete postProductList.status
            delete postProductList.total
        }
    }

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

        // navigation.navigate("FilterScreens");

        // actions.setFilterScreen("categories");
    }

    _renderCategories = ({ item, index }) => {
        const img = _.isNull(item.url) ? { uri: "https://unified.ph/static/images/UPS_Logo.png" } : { uri: item.url };
        return (
            <View key={`categories_ids ${index}`} style={{ width: width / 4, backgroundColor: "white" }}>
                {
                    _.isEqual(item.name, "") ? <View></View> :
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => this._onPress(item)} style={{
                                height: 60, width: 60, backgroundColor: "white", alignItems: "center", justifyContent: "center",
                                borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2, },
                                shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginTop: 10
                            }}>
                                <Image source={img} resizeMode='contain' style={{ height: 35, width: 35 }} />
                            </TouchableOpacity>
                            <Text style={{ textAlign: "center", marginTop: 5, fontSize: 11, fontFamily: "Roboto-Light", fontWeight: "bold" }}>{item.name}</Text>
                        </View>
                }
            </View>
        )
    }

    _indicator = ({ item, index }) => {
        return (
            <View key={`indicator ${index}`} style={[index === this.state.activeIndexCateg ? { backgroundColor: Color.colorPrimaryMP } : { backgroundColor: Colors.yellow300 },
            { height: 5, width: 10, margin: 1, justifyContent: "center", alignSelf: "center" }]} />
        )
    }


    render() {
        const { actions, marketplace: { setOnlineStoreScreen, getAdsImages, getCategoryList, getFilterCategoryList } } = this.props
        // const arrData = _.has(getFilterCategoryList, "category") ? getFilterCategoryList.category : [];
        const arrData = !_.isEmpty(getCategoryList) ? getCategoryList : [];
        let onScrollEnd = (e) => {
            let contentOffset = e.nativeEvent.contentOffset;
            let viewSize = e.nativeEvent.layoutMeasurement;
            let pageNum = Math.floor(contentOffset.x / viewSize.width);
            this.setState({ activeIndexCateg: pageNum })
        }
        let indicator = []
        for (let i = 0; i <= Math.round(arrData.length / 4) - 1; i++) {
            indicator.push(i)
        }
        return (
            <View style={{ height: 150, width: "100%", backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                <FlatList
                    data={formatData(arrData, 4)}
                    style={{ height: 100, }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onMomentumScrollEnd={onScrollEnd}
                    keyExtractor={(index) => { `categories_ids ${index}` }}
                    renderItem={this._renderCategories} />

                <FlatList
                    data={indicator}
                    style={{ height: 10 }}
                    horizontal
                    keyExtractor={index => { `indicator ${index}` }}
                    renderItem={this._indicator} />
            </View>
        )
    }
}