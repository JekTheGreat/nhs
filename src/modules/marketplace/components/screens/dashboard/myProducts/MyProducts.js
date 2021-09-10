import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, Dimensions, FlatList, Alert, StyleSheet } from 'react-native';
import { HeaderBackButton } from "react-navigation-stack";
import _ from 'lodash';
import { Rating } from 'react-native-ratings';
import MyProductsScreens from './MyProductsScreens';
import { Tab, Tabs, ScrollableTab, Spinner, Container, Footer } from 'native-base';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');
const myProductsList = ["All", "Published", "Unpublished"];

export default class MyProducts extends React.PureComponent {
    state = { input: "", skip: 5, data: [] }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        console.log("PARAMS", params)
        return {
            headerLeft: <HeaderBackButton tintColor="black" onPress={() => navigation.goBack()} />,
            headerTitle: params.isSearching ?
                <View style={{
                    borderColor: Color.Standard, borderRadius: 5, borderWidth: 1, height: 35, width: 335, marginLeft: 30,
                    flexDirection: "row", backgroundColor: "white", justifyContent: "space-evenly", alignItems: "center"
                }}>
                    <TextInput
                        style={{ paddingHorizontal: 10, fontSize: 12, height: 35, width: 320, }}
                        placeholder="Search transactions."
                        value={navigation.getParam("text")}
                        inlineImageLeft='search_icon'
                        onChangeText={navigation.getParam("onchange")} />
                    <Icon onPress={navigation.getParam("search")} type='font-awesome' name='search' size={15} color={Color.Standard2} containerStyle={{ marginRight: 10, alignSelf: "center" }} />
                </View>
                :
                <Text style={{ textAlign: "center", justifyContent: "center", fontSize: 20, fontWeight: "bold", color: "black" }}>My Products</Text>
            ,
            headerRight: !params.isSearching &&
                <Icon onPress={navigation.getParam("activate_search")} type='font-awesome' name='search' size={20} color={Color.Standard2} containerStyle={{ marginRight: 10 }} />
        }
    }

    componentDidMount() {
        const { navigation, } = this.props;
        navigation.setParams({
            activate_search: this._activateSearch,
            search: this._onSearch,
            onchange: this._onChangeText,
        })
    }

    componentDidUpdate(prevProps) {
        const { navigation, marketplace: { getSellerProducts } } = this.props;
        if (!_.isEmpty(getSellerProducts.data) && !_.isEqual(getSellerProducts, prevProps.marketplace.getSellerProducts)) {
            // if (_.isEmpty(this.state.data)) {
            // this.setState({ data: getSellerProducts.data })
            // }
            // else {
            //     this.setState({ data: this.state.data.concat(getSellerProducts.data), skip: this.state.skip + 5 })
            // }
        }
    }

    _activateSearch = () => {
        const { navigation } = this.props;
        navigation.setParams({
            isSearching: true,
        })
    }

    _onChangeText = (value) => {
        const { navigation } = this.props;
        this.setState({ input: value })
        navigation.setParams({
            text: value,
        })
    }

    _onSearch = () => {
        const { navigation } = this.props;
        if (_.isEmpty(this.state.input)) {
            navigation.setParams({
                isSearching: false,
            })
        }
    }


    renderTab = (name, index) => {
        const { marketplace: { getSellerProducts } } = this.props
        if (name === name) {
            let product;
            if (name === "All") {
                product = _.filter(getSellerProducts.data, transItem => {
                    if (_.isEmpty(this.state.input)) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.name.toString().toUpperCase().includes(this.state.input.toString().toUpperCase())) {
                        return transItem;
                    }
                })
            } else if (name === "Published") {
                product = _.filter(getSellerProducts.data, transItem => {
                    if (_.isEmpty(this.state.input) && transItem.publish_status) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.publish_status && transItem.name.toString().toUpperCase().includes(this.state.input.toString().toUpperCase())) {
                        return transItem;
                    }
                })
            } else if (name === "Unpublished") {
                product = _.filter(getSellerProducts.data, transItem => {
                    if (_.isEmpty(this.state.input) && !transItem.publish_status) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && !transItem.publish_status && transItem.name.toString().toUpperCase().includes(this.state.input.toString().toUpperCase())) {
                        return transItem;
                    }
                })
            }
            return <MyProductsScreens key={index} transactionList={product} tabLabel={name} ref={(e) => this.MProdScreens = e} {...this.props} />;
        }
    }

    _onPress = () => {
        const { navigation, marketplace: { setInputDetails } } = this.props;
        delete setInputDetails.sellerProductDetails.name
        delete setInputDetails.sellerProductDetails.categ
        delete setInputDetails.sellerProductDetails.sub
        navigation.navigate("MyProductsAddEdit", { title: "Add New Products", isFrom: "add" });
    }

    render() {
        return (
            <Container>
                <Tabs
                    tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                    style={styles.TabsStyle}
                    locked
                    tabBarActiveTextColor={Color.colorPrimaryMP}
                    tabBarInactiveTextColor={Color.Standard2}>
                    {myProductsList.map((item, idx) => {
                        return (
                            <Tab key={`idx ${idx}`}
                                heading={`${item}`}
                                tabStyle={styles.tabStyle}
                                textStyle={styles.textStyle}
                                activeTextStyle={{ fontSize: 13, color: Color.colorPrimaryMP }}
                                activeTabStyle={{ backgroundColor: Color.white }}>
                                {this.renderTab(item, idx)}
                            </Tab>
                        );
                    })}
                </Tabs>
                <TouchableOpacity onPress={this._onPress}
                    style={{ justifyContent: "center", alignItems: "center", backgroundColor: Color.colorPrimaryMP, width: width, height: 40 }} >
                    <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>+ Add New Product</Text>
                </TouchableOpacity>
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    tabBarUnderlineStyle: { height: 1, backgroundColor: Color.colorPrimaryMP },
    tabStyle: { backgroundColor: Color.white, },
    TabsStyle: { backgroundColor: Color.white, alignItems: "center", justifyContent: "center" },
    textStyle: { color: Color.Standard2, fontSize: 13 },
});