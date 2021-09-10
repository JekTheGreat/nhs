import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, Dimensions, FlatList, Alert, StyleSheet } from 'react-native';
import { HeaderBackButton } from "react-navigation-stack";
import _ from 'lodash';
import { Rating } from 'react-native-ratings';
import MyPurchasesScreens from './MyPurchasesScreens'
import { Tab, Tabs, ScrollableTab, Spinner } from 'native-base';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');
const myPurchasesList = ["All", "Processing", "To Ship", "To Receive", "Delivered", "Cancelled"];

export default class MyPurchase extends React.PureComponent {
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
                <Text style={{ textAlign: "center", justifyContent: "center", fontSize: 20, fontWeight: "bold", color: "black" }}>My Purchases</Text>
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
        const { navigation, marketplace: { getPurchaseList } } = this.props;
        if (!_.isEmpty(getPurchaseList.data) && !_.isEqual(getPurchaseList, prevProps.marketplace.getPurchaseList)) {
            // if (_.isEmpty(this.state.data)) {
            // this.setState({ data: getPurchaseList.data })
            // }
            // else {
            //     this.setState({ data: this.state.data.concat(getPurchaseList.data), skip: this.state.skip + 5 })
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
        const { marketplace: { getPurchaseList } } = this.props
        if (name === name) {
            let product;
            if (name === "All") {
                product = _.filter(getPurchaseList.data, transItem => {
                    if (_.isEmpty(this.state.input)) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            } else if (name === "Processing") {
                product = _.filter(getPurchaseList.data, transItem => {
                    if (_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase() === "Processing".toUpperCase()) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase() === "Processing".toUpperCase() && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            } else if (name === "To Ship") {
                product = _.filter(getPurchaseList.data, transItem => {
                    if (_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase() === "To Ship".toUpperCase()) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase() === "To Ship".toUpperCase() && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            } else if (name === "To Receive") {
                product = _.filter(getPurchaseList.data, transItem => {
                    if (_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase() === "To Receive".toUpperCase()) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase() === "To Receive".toUpperCase() && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            } else if (name === "Delivered") {
                product = _.filter(getPurchaseList.data, transItem => {
                    if (_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase() === "Delivered".toUpperCase()) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase() === "Delivered".toUpperCase() && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            } else if (name === "Cancelled") {
                product = _.filter(getPurchaseList.data, transItem => {
                    if (_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase() === "Cancelled".toUpperCase()) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase() === "Cancelled".toUpperCase() && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            }
            return <MyPurchasesScreens key={index} transactionList={product} tabLabel={name} ref={(e) => this.MPScreens = e} {...this.props} />;
        }
    }


    render() {
        return (
            <Tabs
                tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                style={styles.TabsStyle}
                renderTabBar={() => <ScrollableTab style={{ height: 40, }} />}
                locked
                tabContainerStyle={{ height: 30 }}
                tabBarActiveTextColor={Color.colorPrimaryMP}
                tabBarInactiveTextColor={Color.Standard2}>
                {myPurchasesList.map((item, idx) => {
                    return (
                        <Tab key={`idx ${idx}`}
                            heading={`${item}`}
                            tabStyle={styles.tabStyle}
                            textStyle={styles.textStyle}
                            activeTextStyle={{ fontSize: 12, color: Color.colorPrimaryMP }}
                            activeTabStyle={{ backgroundColor: Color.white }}>
                            {this.renderTab(item, idx)}
                        </Tab>
                    );
                })}
            </Tabs>
        )
    }
}


const styles = StyleSheet.create({
    tabBarUnderlineStyle: { height: 1, backgroundColor: Color.colorPrimaryMP },
    tabStyle: { backgroundColor: Color.white, },
    TabsStyle: { backgroundColor: Color.white, alignItems: "center", justifyContent: "center" },
    textStyle: { color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12 },
});