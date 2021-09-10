import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, Alert, FlatList, RefreshControl, Dimensions, StyleSheet } from 'react-native';
import _ from 'lodash';
import Loading from "__src/components/Loading";
import Dropdown from "__src/components/Dropdown";
import { Tab, Tabs, ScrollableTab, Spinner } from 'native-base';
import { Icon, CheckBox, Tooltip } from "react-native-elements";
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class FirstScreen extends React.PureComponent {
    state = {
        prodName: "",
        error: {},
    }

    onNext = () => {
        const { actions, navigation, marketplace: { setSelectedTransaction, getReasonList, setInputDetails } } = this.props;
        const product = _.has(setInputDetails, "sellerProductDetails.name") ? setInputDetails.sellerProductDetails.name : ""
        const subCategData = _.has(setInputDetails, "sellerProductDetails.categ.sub") ? setInputDetails.sellerProductDetails.categ.sub : []
        let err = _.merge({}, this.state.error);
        if (navigation.getParam("isFrom") === "edit") {
            delete setInputDetails.sellerProductDetails.categ
            delete setInputDetails.sellerProductDetails.sub
            actions.setAddEditProductScreen("second");
        } else {
            if (_.isEmpty(product)) {
                err.prodName = "Product Name is required.";
            }
            if (!_.isEmpty(product) && product.length < 10) {
                err.prodName = "Product Name should be atleast 10 characters."
            }
            if (!_.has(setInputDetails, "sellerProductDetails.categ.name")) {
                err.categ = "Category name is required.";
            }
            if (!_.has(setInputDetails, "sellerProductDetails.sub") && !_.isEmpty(subCategData)) {
                err.sub = "Sub Category is required.";
            }
            if (_.isEmpty(err)) {
                actions.setAddEditProductScreen("second");
            }
            this.setState({ error: err });
        }

    }

    renderBase(type) {
        const { navigation, marketplace: { setInputDetails } } = this.props;
        let editCategs
        if (navigation.getParam("isFrom") === "edit") {
            editCategs = setInputDetails.sellerReview.category.split('.');
        }
        const subCategData = _.has(setInputDetails, "sellerProductDetails.categ.sub") ? setInputDetails.sellerProductDetails.categ.sub : []
        if (_.isEqual(type, "mainCategories")) {
            return (
                <View style={[_.has(this.state.error, "categ") ? { borderColor: "red" } : { borderColor: Color.Standard },
                {
                    marginHorizontal: 15, flexDirection: "row", width: "99%", height: 35, alignItems: "center", alignSelf: "center",
                    borderWidth: 0.6, borderRadius: 5, paddingHorizontal: 5
                }]}>
                    {navigation.getParam("isFrom") === "add" ?

                        <Text style={[_.has(setInputDetails, "sellerProductDetails.categ.name") ? { color: "black" } :
                            _.has(this.state.error, "categ") ? { color: "red" } : { color: Color.Standard2 },
                        { flex: 1, fontFamily: "Roboto-Light", fontSize: 12, paddingLeft: 5 }]}>
                            {_.has(setInputDetails, "sellerProductDetails.categ.name") ? setInputDetails.sellerProductDetails.categ.name
                                : "Please select Category"}
                        </Text>

                        :

                        <Text style={{ flex: 1, color: Color.Standard, fontFamily: "Roboto-Light", fontSize: 12, paddingLeft: 5 }}>
                            {editCategs[0]}
                        </Text>
                    }

                    <Icon type='material' name='expand-more' color={_.has(this.state.error, "categ") ? "red" : "black"} size={20} />
                </View>
            );
        }

        if (_.isEqual(type, "subCategories")) {
            return (
                <View style={[_.has(this.state.error, "sub") ? { borderColor: "red" } : { borderColor: Color.Standard },
                {
                    marginHorizontal: 15, flexDirection: "row", width: "99%", height: 35, alignItems: "center", alignSelf: "center",
                    borderWidth: 0.6, borderRadius: 5, paddingHorizontal: 5,
                }]}>
                    {navigation.getParam("isFrom") === "add" ?

                        <Text style={[_.has(setInputDetails, "sellerProductDetails.sub") ? { color: "black" } :
                            _.has(this.state.error, "sub") ? { color: "red" } : { color: Color.Standard2 },
                        { flex: 1, fontFamily: "Roboto-Light", fontSize: 12, paddingLeft: 5 }]}>
                            {_.has(setInputDetails, "sellerProductDetails.sub") ? `${setInputDetails.sellerProductDetails.sub}` :
                                (_.isEmpty(subCategData) && _.has(setInputDetails, "sellerProductDetails.categ.name")) ? "N/A" : "Please select Sub Category"}
                        </Text>

                        :

                        <Text style={{ flex: 1, color: Color.Standard, fontFamily: "Roboto-Light", fontSize: 12, paddingLeft: 5 }}>
                            {_.isUndefined(editCategs[1]) ? "N/A" : editCategs[1]}
                        </Text>
                    }

                    <Icon type='material' name='expand-more' color={_.has(this.state.error, "sub") ? "red" : "black"} size={20} />
                </View>
            );
        }
    }

    renderRow(type, rowData, rowID, highlighted) {
        const { marketplace: { setInputDetails } } = this.props;
        if (_.isEqual(type, "mainCategories")) {
            return (
                <View style={[{ paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white" },
                highlighted && { backgroundColor: Color.highlight }]}>
                    <Text style={[{ margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center" },
                        highlighted]}>
                        {`${rowData.name}`}
                    </Text>
                </View>
            );
        }
        else if (!_.isEmpty(rowData) && _.isEqual(type, "subCategories")) {
            return (
                <View style={[{ paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white" },
                highlighted && { backgroundColor: Color.highlight }]}>
                    <Text style={[{ margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center" },
                        highlighted]}>
                        {`${rowData.name}`}
                    </Text>
                </View>
            );
        }
    }

    onChange = (type) => (value) => {
        const { actions, marketplace: { setInputDetails } } = this.props;
        const newInput = _.merge({}, setInputDetails);
        let params = _.merge({}, newInput.sellerProductDetails);
        delete this.state.error.categ
        delete this.state.error.sub
        switch (type) {
            case "mainCategories":
                delete params.sub;
                params.categ = value;
                break;
            case "subCategories":
                params.sub = value.name;
                break;
        }
        newInput.sellerProductDetails = params;
        actions.setInputDetails(newInput);
    }

    _onChangeText = (value) => {
        const { actions, marketplace: { setInputDetails } } = this.props;
        delete this.state.error.prodName;
        const newInput = _.merge({}, setInputDetails);
        let params = _.merge({}, newInput.sellerProductDetails);
        params.name = value;
        newInput.sellerProductDetails = params;
        actions.setInputDetails(newInput);
    }

    render() {
        const { navigation, marketplace: { setSelectedTransaction, getCategoryList, setInputDetails } } = this.props;
        const product = _.has(setInputDetails, "sellerProductDetails.name") ? setInputDetails.sellerProductDetails.name : ""
        const subCategData = _.has(setInputDetails, "sellerProductDetails.categ.sub") ? setInputDetails.sellerProductDetails.categ.sub : []
        const subCategName = _.has(setInputDetails, "sellerProductDetails.sub") ? setInputDetails.sellerProductDetails.sub : ""
        let editCategs
        if (navigation.getParam("isFrom") === "edit") {
            editCategs = setInputDetails.sellerReview.category.split('.');
        }
        console.log("nav", navigation.getParam("isFrom") === "edit")
        return (
            <View style={{ paddingVertical: 15 }}>
                <Text style={{ paddingHorizontal: 15, fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2 }}>Please input your product name and select categories.</Text>
                <View style={{ marginVertical: 10, padding: 15, borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.grey300 }}>
                    <Text style={{ marginBottom: 5, fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2 }}>Product Name</Text>
                    <TextInput
                        style={[_.has(this.state.error, "prodName") ? { borderColor: "red", color: "red" } : { borderColor: Color.Standard2 },
                        { paddingHorizontal: 10, fontSize: 12, fontFamily: "Roboto-Light", height: 35, borderWidth: .5, borderRadius: 5 }]}
                        placeholder="Enter product name."
                        placeholderTextColor={_.has(this.state.error, "prodName") ? "red" : Color.Standard2}
                        value={product}
                        editable={navigation.getParam("isFrom") === "add"}
                        onChangeText={(value) => this._onChangeText(value)} />

                    {(_.has(this.state.error, "prodName") && !_.isEmpty(product) && product.length < 10) &&
                        <Text style={{ marginTop: 5, fontSize: 10, fontFamily: "Roboto-Light", color: "red" }}>{this.state.error.prodName}</Text>}

                    <Text style={{ marginTop: 10, marginBottom: 5, fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2 }}>Category</Text>
                    <Dropdown
                        animated={true}
                        showsVerticalScrollIndicator={true}
                        renderBase={this.renderBase.bind(this, "mainCategories")}
                        dropdownStyle={{ height: 175 }}
                        options={getCategoryList}
                        disabled={navigation.getParam("isFrom") === "edit"}
                        renderButtonText={this.onChange("mainCategories")}
                        renderRow={this.renderRow.bind(this, "mainCategories")}
                        renderSeparator={null} />

                    <Text style={{ marginTop: 10, marginBottom: 5, fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2 }}>Sub Category</Text>
                    <Dropdown
                        animated={true}
                        showsVerticalScrollIndicator={true}
                        renderBase={this.renderBase.bind(this, "subCategories")}
                        dropdownStyle={{ height: 175 }}
                        disabled={_.isEmpty(subCategData) || navigation.getParam("isFrom") === "edit"}
                        options={subCategData}
                        renderButtonText={this.onChange("subCategories")}
                        renderRow={this.renderRow.bind(this, "subCategories")}
                        renderSeparator={null} />
                </View>

                {navigation.getParam("isFrom") === "edit" ?
                    <View style={{ paddingHorizontal: 15, }}>
                        <Text style={{ marginBottom: 5, fontSize: 14, fontWeight: "bold" }}>Selected Categories</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: Color.colorPrimaryMP }}>
                            {`${editCategs[0]} > ${_.isUndefined(editCategs[1]) ? "" : editCategs[1]}`}
                        </Text>
                    </View> :
                    _.has(setInputDetails, "sellerProductDetails.categ.name") &&
                    <View style={{ paddingHorizontal: 15, }}>
                        <Text style={{ marginBottom: 5, fontSize: 14, fontWeight: "bold" }}>Selected Categories</Text>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: Color.colorPrimaryMP }}>
                            {`${setInputDetails.sellerProductDetails.categ.name} > ${subCategName}`}
                        </Text>
                    </View>
                }

            </View>

        )
    }

}
