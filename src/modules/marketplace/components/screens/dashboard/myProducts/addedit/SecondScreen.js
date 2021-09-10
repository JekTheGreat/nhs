import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Alert, FlatList, RefreshControl, Dimensions, StyleSheet } from 'react-native';
import _ from 'lodash';
import Loading from "__src/components/Loading";
import Dropdown from "__src/components/Dropdown";
import { Tab, Tabs, ScrollableTab, Spinner } from 'native-base';
import { Icon, CheckBox, Tooltip } from "react-native-elements";
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import BasicInfo from './seconscreencomp/BasicInfo';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class SecondScreen extends React.PureComponent {

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
                console.log("pakyu")
            }
            this.setState({ error: err });
        }
    }

    renderAdd = () => {
        return (
            <View style={{}}>
                <BasicInfo error={this.state.error} {...this.props} />
            </View>
        )
    }

    renderEdit = () => {
        return (
            <View style={{}}>
                <Text>PAKYU</Text>
            </View>
        )
    }

    render() {
        const { navigation, marketplace: { setSelectedTransaction, getReasonList, transactionInProgress } } = this.props;
        console.log("nav", navigation.getParam("isFrom"))
        return (
            navigation.getParam("isFrom") === "add" ? this.renderAdd() : this.renderEdit()
        )
    }

}
