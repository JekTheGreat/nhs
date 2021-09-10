import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, Dimensions, FlatList, Alert, StyleSheet } from 'react-native';
import { HeaderBackButton } from "react-navigation-stack";
import _ from 'lodash';
import { Rating } from 'react-native-ratings';
import ReturnRefundScreens from './ReturnRefundScreens'
import { Tab, Tabs, ScrollableTab, Spinner } from 'native-base';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');
const myPurchasesList = ["All", "Return Pending", "Return Approved", "Return Declined",
    "Return Refund", "Return To Ship", "Return To Receive", "Return Delivered", "Dispute Pending", "Dispute Approved", "Dispute Declined"];

export default class ReturnRefund extends React.PureComponent {
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
                <Text style={{ textAlign: "center", justifyContent: "center", fontSize: 20, fontWeight: "bold", color: "black" }}>{`Returns & Refunds`}</Text>
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
        const { navigation, marketplace: { getReturnList } } = this.props;
        if (!_.isEmpty(getReturnList.data) && !_.isEqual(getReturnList, prevProps.marketplace.getReturnList)) {
            // if (_.isEmpty(this.state.data)) {
            // this.setState({ data: getReturnList.data })
            // }
            // else {
            //     this.setState({ data: this.state.data.concat(getReturnList.data), skip: this.state.skip + 5 })
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
        const { marketplace: { getReturnList } } = this.props
        if (name === name) {
            let product;
            if (name === "All") {
                product = _.filter(getReturnList.data, transItem => {
                    if (_.isEmpty(this.state.input)) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            } else if (name === "Return Pending") {
                product = _.filter(getReturnList.data, transItem => {
                    if (_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Return Pending".toUpperCase()) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Return Pending".toUpperCase() && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            } else if (name === "Return Approved") {
                product = _.filter(getReturnList.data, transItem => {
                    if (_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Return Approved".toUpperCase()) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Return Approved".toUpperCase() && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            } else if (name === "Return Declined") {
                product = _.filter(getReturnList.data, transItem => {
                    if (_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Return Declined".toUpperCase()) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Return Declined".toUpperCase() && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            } else if (name === "Return Refund") {
                product = _.filter(getReturnList.data, transItem => {
                    if (_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Return Refund".toUpperCase()) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Return Refund".toUpperCase() && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            } else if (name === "Return To Ship") {
                product = _.filter(getReturnList.data, transItem => {
                    if (_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Return To Ship".toUpperCase()) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Return To Ship".toUpperCase() && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            } else if (name === "Return To Receive") {
                product = _.filter(getReturnList.data, transItem => {
                    if (_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Return To Receive".toUpperCase()) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Return To Receive".toUpperCase() && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            }
            //  else if (name === "Return To Received") {
            //     product = _.filter(getReturnList.data, transItem => {
            //         if (_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Return To Received".toUpperCase()) {
            //             return transItem;
            //         } else if (!_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Return To Received".toUpperCase() && transItem.trackingno.includes(this.state.input)) {
            //             return transItem;
            //         }
            //     })
            // }
            else if (name === "Return Delivered") {
                product = _.filter(getReturnList.data, transItem => {
                    if (_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Return Delivered".toUpperCase()) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Return Delivered".toUpperCase() && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            } else if (name === "Dispute Pending") {
                product = _.filter(getReturnList.data, transItem => {
                    if (_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Dispute Pending".toUpperCase()) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Dispute Pending".toUpperCase() && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            } else if (name === "Dispute Approved") {
                product = _.filter(getReturnList.data, transItem => {
                    if (_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Dispute Approved".toUpperCase()) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Dispute Approved".toUpperCase() && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            } else if (name === "Dispute Declined") {
                product = _.filter(getReturnList.data, transItem => {
                    if (_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Dispute Declined".toUpperCase()) {
                        return transItem;
                    } else if (!_.isEmpty(this.state.input) && transItem.status.toString().toUpperCase().replace("-", " ") === "Dispute Declined".toUpperCase() && transItem.trackingno.includes(this.state.input)) {
                        return transItem;
                    }
                })
            }
            return <ReturnRefundScreens key={index} transactionList={product} tabLabel={name} ref={(e) => this.MPScreens = e} {...this.props} />;
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