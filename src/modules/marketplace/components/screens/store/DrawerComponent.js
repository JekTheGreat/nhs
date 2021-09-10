/* eslint-disable */
import React from "react";
import { ScrollView, View, Text, StyleSheet, StatusBar, TextInput, Dimensions, FlatList, TouchableOpacity } from "react-native";
import Stars2 from "__src/components/Stars2";
import Button from "__src/components/Button";
import Resource from "__src/resources";
import { Icon } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Colors } from 'react-native-paper';
import _ from 'lodash';
const { Color } = Resource;
const { width, height } = Dimensions.get('screen');
const FilterTags = ["Categories", "Sub Categories", "Brands", "Quality", "Ratings", "Price Range"];
const FilterTags2 = [{ name: "Categories" }, { name: "Sub Categories" }, { name: "Brands" }, { name: "Ratings" }, { name: "Price Range" }];
const qualityData = ["Brand New", "Second Hand"];
class DrawerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {},
            itemShowing: [],
            categories: {},
            sub: {},
            brand: {},
            quality: "",
            range_low: this.props.marketplace.isSearchInput ? this.props.marketplace.getFilterCategoryList.range[0] : 0,
            range_high: this.props.marketplace.isSearchInput ? this.props.marketplace.getFilterCategoryList.range[1] : 99999999,
            rate: 0,
        }
        this.baseState = this.state
    }



    clear = () => {
        const { actions, closeDrawer, login: { session }, marketplace: { isSearchInput, setInputDetails } } = this.props;
        const { range_low, range_high, rate } = this.state;
        let param = {};
        if (isSearchInput) {
            let rateArr = [];
            for (let counter = 0; counter <= rate; counter++) {
                rateArr.push(counter)
            }
            param.search = setInputDetails.categoryName;
            actions.postProductList(session, param);
        }
        this.setState(this.baseState);
        closeDrawer();
    }

    componentDidUpdate(prevProps) {
        const { closeDrawer, actions, navigation, login: { session }, marketplace: { postProductList, isFromCollectionScreen, setFilterScreen } } = this.props;
        if (!_.isEqual(prevProps.marketplace.postProductList, postProductList)) {
            if (navigation.state.routeName !== "FilterScreens") {
                actions.isFromCollectionScreen(false);
                navigation.navigate("FilterScreensCollections");
            }
            delete postProductList.status
            delete postProductList.total
        }
    }

    apply = () => {
        const { error, categories, sub, brand, quality, range_low, range_high, rate } = this.state;
        const { closeDrawer, actions, navigation, login: { session }, marketplace: { isSearchInput, getFilterCategoryList, setFilterScreen, getShopIdDetails, setInputDetails, isFromCollectionScreen } } = this.props;
        const err = _.merge({}, error);
        const number = new RegExp('^[0-9]+$');
        let rateArr = [];
        for (let counter = 0; counter <= rate; counter++) {
            rateArr.push(counter)
        }
        if (!_.isEmpty(range_low)) {
            delete err.min
            if (!range_low.match(number)) {
                err.min = "Invalid amount entered.";
            }
        }
        if (!_.isEmpty(range_high)) {
            delete err.max
            if (!range_high.match(number)) {
                err.max = "Invalid amount entered.";
            }
        }
        if (range_low > range_high) {
            err.min = "Amount entered is higher than maximum amount.";
            err.max = "Amount entered is lower than minimum amount.";
        } else if (isSearchInput && range_high > Number(getFilterCategoryList.range[1])) {
            err.max = "Amount entered is higher than the maximum amount required.";
        } else if ((_.isEmpty(range_low) && _.isEmpty(range_high)) || (range_low < range_high)) {
            delete err.min;
            delete err.max;
        }
        this.setState({ error: err });
        if (_.isEmpty(err)) {
            let param = {};
            if (navigation.state.routeName !== "FilterScreens") {
                param.shop_id = getShopIdDetails.id;
            } else {
                if (!isSearchInput) {
                    const filterCateg = _.merge({}, setInputDetails);
                    let categName = _.merge({}, filterCateg.categoryName)
                    if (!_.isEmpty(categories)) {
                        categName = `Category ${categories.name}`
                    }
                    else if (_.isEmpty(categories)) {
                        categName = "Filter"
                    }
                    filterCateg.categoryName = categName
                    actions.setInputDetails(filterCateg);
                } else {
                    param.search = setInputDetails.categoryName;
                    param.filter = true;
                }
            }
            !_.isEmpty(categories) && _.isEmpty(sub) ? param.categories = [{ name: categories.name }] :
                !_.isEmpty(sub) ? param.categories = [{ name: categories.name, sub: Object.values(sub) }] : null;
            !_.isEmpty(brand) ? param.brand = Object.values(brand) : null;
            param.range = `${range_low}-${range_high}`;
            param.rate = rateArr;
            !_.isEmpty(quality) ? param.quality = quality : null;
            actions.postProductList(session, param);
            closeDrawer();
        }
    }



    _onChangeText = (type, value) => {
        const { range_low, range_high } = this.state;
        const { marketplace: { isSearchInput, getFilterCategoryList } } = this.props;
        if (_.isEqual(type, "min")) {
            if (_.isEmpty(range_low)) {
                const data = isSearchInput ? getFilterCategoryList.range[0] : 0
                this.setState({ range_low: data })
            } else {
                this.setState({ range_low: value })
            }
        }
        else {
            if (_.isEmpty(range_high)) {
                const data = isSearchInput ? getFilterCategoryList.range[1] : 99999999
                this.setState({ range_high: data })
            } else {
                this.setState({ range_high: value })
            }
        }
    }

    onLeave = (type) => {
        const { error, range_low, range_high } = this.state;
        const err = _.merge({}, error);
        const number = new RegExp('^[0-9]+$');
        if (!_.isEmpty(range_low) && type === "min") {
            delete err[type]
            if (!range_low.match(number)) {
                err[type] = "Invalid amount entered.";
            }
        } else if (!_.isEmpty(range_high) && type === "max") {
            delete err[type]
            if (!range_high.match(number)) {
                err[type] = "Invalid amount entered.";
            }
        }
        else {
            if (_.isEmpty(range_low) || _.isEmpty(range_high)) {
                delete err[type];
            }
        }
        this.setState({ error: err });
    }

    _toRate = (value) => {
        if (this.state.rate === value) {
            this.setState({ rate: 0 })
        } else {
            this.setState({ rate: value })
        }
    }

    _onPress = (type, item, index) => {
        const { categories, sub, brand, quality } = this.state;
        let param = {};
        if (type === "Categories") {
            if (item.slug === categories.name) {
                this.setState({ categories: {}, sub: [] })
            } else {
                if (_.isEmpty(item.sub)) {
                    param.name = item.slug;
                } else {
                    param.name = item.slug;
                    param.sub = item.sub;
                }
                this.setState({ categories: param, sub: [] })
            }
        }

        else if (type === "Sub Categories") {
            let subArr = _.merge({}, sub);
            let spread = { ...subArr };
            let isSelected = !spread[index]
            if (isSelected) {
                spread[index] = item.name
            } else {
                delete spread[index];
            }
            this.setState({ sub: spread })
        }

        else if (type === "Brands") {
            let brandArr = _.merge({}, brand);
            let spread = { ...brandArr };
            let isSelected = !spread[index]
            if (isSelected) {
                spread[index] = item.name
            } else {
                delete spread[index];
            }
            this.setState({ brand: spread })
        }
        else if (type === "Quality") {
            console.log("asdfasdf", type, item, index)
            if (quality === item) {
                this.setState({ quality: "" })
            } else {
                this.setState({ quality: item })
            }
            // let qualArr = _.merge({}, quality);
            // let spread = { ...qualArr };
            // let isSelected = !spread[index]
            // if (isSelected) {
            //     spread[index] = item.name
            // } else {
            //     delete spread[index];
            // }
        }
    }

    _hideItem = (item, index) => {
        let selected = [...this.state.itemShowing];
        let value = !selected[index];
        if (value) {
            this.setState(previousState => {
                const itemShowing = [...previousState.itemShowing];
                itemShowing[index] = true;
                return { itemShowing };
            });
        }
        else {
            this.setState(previousState => {
                const itemShowing = [...previousState.itemShowing];
                delete itemShowing[index];
                return { itemShowing };
            });
        }
    }

    _renderFilterCategories = type => ({ item, index }) => {
        const { sub, brand, quality, categories } = this.state;
        const bgColor = type === "Categories" && categories.name === item.slug || type === "Sub Categories" && sub[index] === item.name ||
            type === "Brands" && brand[index] === item.name || type === "Quality" && quality === item ?
            { backgroundColor: Color.colorPrimaryMP } : { backgroundColor: "white" };
        const txtColor = type === "Categories" && categories.name === item.slug || type === "Sub Categories" && sub[index] === item.name ||
            type === "Brands" && brand[index] === item.name || type === "Quality" && quality === item ?
            { color: "white", fontWeight: "bold" } : { color: Color.Standard2, };
        return (
            !_.isEmpty(item) &&
            <TouchableOpacity key={`idx ${index}`} onPress={() => this._onPress(type, item, index)} style={[bgColor, {
                width: "45%", margin: 5, borderRadius: 5,
                borderWidth: 1, borderColor: Colors.grey400, paddingVertical: 5,
                justifyContent: "center", alignItems: "center"
            }]}>
                <Text style={[txtColor, { textAlign: "center", fontFamily: "Roboto-Light", fontSize: 12 }]}>{type === "Quality" ? `${item}` : `${item.name}`}</Text>
            </TouchableOpacity>
        )
    }

    _renderFilterTags = ({ item, index }) => {
        const { marketplace: { getFilterCategoryList, getCategoryList, setFilterData, isSearchInput } } = this.props;
        const { error, itemShowing, categories, range_low, range_high } = this.state;
        const minPrice = _.has(setFilterData, "priceRange.low") ? setFilterData.priceRange.low : "";
        const maxPrice = _.has(setFilterData, "priceRange.high") ? setFilterData.priceRange.high : "";
        const isShowing = (!_.isUndefined(itemShowing[index]) || !_.isEmpty(itemShowing[index])) ? true : false;
        let data;
        let dataCateg;
        let dataSearch;
        if (item === "Categories") {
            // data = !isShowing ? _.slice(getFilterCategoryList.category, 0, 4) : getFilterCategoryList.category;
            dataCateg = !isShowing ? _.slice(getCategoryList, 0, 4) : getCategoryList;
            dataSearch = !isShowing ? _.slice(getFilterCategoryList.category, 0, 4) : getFilterCategoryList.category;
            data = isSearchInput ? dataSearch : dataCateg;
        } else if (item === "Sub Categories") {
            data = (!isShowing && (!_.isEmpty(categories.sub) || !_.isUndefined(categories.sub))) ? _.slice(categories.sub, 0, 4) : categories.sub;
            // data = FilterTags2
        } else if (item === "Brands") {
            data = !isShowing ? _.slice(getFilterCategoryList.brand, 0, 4) : getFilterCategoryList.brand;
        }
        else if (item === "Quality") {
            data = isSearchInput ? getFilterCategoryList.quality : qualityData;
        }

        if (item === "Categories" || (item === "Sub Categories" && (!_.isEmpty(categories.sub) || !_.isUndefined(categories.sub))) ||
            item === "Brands" || item === "Quality") {
            // if (item === "Categories" || item === "Sub Categories" || item === "Brands") {
            return (
                <View key={`tags_id ${index}`}>

                    <Text style={[item === "Categories" ? {} : { marginTop: 15 }, { marginBottom: 5, paddingLeft: 10, color: "Color.Standard2", fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 14 }]}>
                        {`${item}`}
                    </Text>

                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        style={{ marginLeft: 10, }}
                        keyExtractor={(item, index) => `idx ${index}`}
                        contentContainerStyle={{ alignSelf: "center", alignItems: "center", justifyContent: "center" }}
                        renderItem={this._renderFilterCategories(item)} />

                    {(item !== "Quality" && data < 4 && !_.isEmpty(data)) &&
                        <TouchableOpacity onPress={() => this._hideItem(item, index)} style={{ marginTop: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ textAlign: "center", fontFamily: "Roboto-Light", marginRight: 5, fontSize: 14, color: Color.colorPrimaryMP }}>
                                {isShowing ? "Show Less" : "Show More"}
                            </Text>
                            <Icon type='font-awesome' name={isShowing ? 'chevron-up' : 'chevron-down'} color={Color.colorPrimaryMP} size={13} />
                        </TouchableOpacity>}
                </View>
            )
        }

        else if (item === "Ratings") {
            return (
                <View key={`tags_id ${index}`}>
                    <Text style={{ marginTop: 15, marginBottom: 10, paddingLeft: 10, color: "Color.Standard2", fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 14 }}>
                        {`${item}`}
                    </Text>
                    <Stars2
                        rates={this.state.rate}
                        color={Color.colorPrimaryMP}
                        size={40}
                        txtVote={false}
                        style={{ justifyContent: "center", alignItems: "center" }}
                        iconStyle={{ alignSelf: "center", marginHorizontal: 10 }}
                        toRate={(value) => this._toRate(value)} />
                </View>
            )
        }

        else if (item === "Price Range") {
            return (
                <View key={`tags_id ${index}`}>
                    <Text style={{ marginTop: 15, marginBottom: 10, paddingLeft: 10, color: "Color.Standard2", fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 14 }}>
                        {`${item}`}
                    </Text>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                        <TextInput
                            style={[error["min"] ? { borderColor: "red" } : { borderColor: Color.Standard }, { paddingLeft: 10, fontSize: 12, height: 35, width: "45%", borderRadius: 5, borderWidth: 1 }]}
                            placeholder={isSearchInput ? `${this.state.range_low}` : "Min"}
                            keyboardType={"number-pad"}
                            defaultValue={1}
                            onBlur={() => this.onLeave("min")}
                            value={range_low}
                            onChangeText={input => this._onChangeText("min", input)} />
                        <TextInput
                            style={[error["max"] ? { borderColor: "red" } : { borderColor: Color.Standard }, { paddingLeft: 10, fontSize: 12, height: 35, width: "45%", borderRadius: 5, borderWidth: 1 }]}
                            placeholder={isSearchInput ? `${this.state.range_high}` : "Max"}
                            keyboardType={"number-pad"}
                            defaultValue={range_high}
                            onBlur={() => this.onLeave("max")}
                            value={range_high}
                            onChangeText={input => this._onChangeText("max", input)} />
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly", }}>
                        <View style={{ width: "45%" }}>
                            {error["min"] && <Text style={{ color: Color.red, fontSize: 11, fontFamily: "Roboto-Light", marginTop: 4 }}>{error["min"]}</Text>}
                        </View>
                        <View style={{ width: "45%" }}>
                            {error["max"] && <Text style={{ color: Color.red, fontSize: 11, fontFamily: "Roboto-Light", marginTop: 4 }}>{error["max"]}</Text>}
                        </View>
                    </View>

                </View>
            )
        }
    }



    render() {
        const { navigation } = this.props
        console.log("STATE", this.state)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 10, justifyContent: 'space-around', alignItems: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
                    <FlatList
                        data={FilterTags}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `tags_id ${index}`}
                        renderItem={this._renderFilterTags} />
                </View>
                <View style={{ flexDirection: "row", bottom: 0, borderTopColor: Colors.grey300, borderTopWidth: 1 }}>
                    <Button onPress={this.clear}
                        style={{ width: "50%", borderRadius: 0, backgroundColor: Color.white, }}
                        labelStyle={{ color: Color.colorPrimaryMP }} label="Clear" />
                    <Button onPress={this.apply} style={{ borderRadius: 0, width: "50%" }}
                        label={"Apply"} />
                </View>
            </View>
        );
    }
}

export default DrawerComponent;
