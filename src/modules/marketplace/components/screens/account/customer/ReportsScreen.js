import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, Dimensions, FlatList, Alert, ActivityIndicator } from 'react-native';
import { HeaderBackButton } from "react-navigation-stack";
import _ from 'lodash';
import { Rating } from 'react-native-ratings';
import { Spinner } from 'native-base';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class ReportsScreen extends React.PureComponent {
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
                <Text style={{ textAlign: "center", justifyContent: "center", fontSize: 20, fontWeight: "bold", color: "black" }}>Reports</Text>
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
        const { navigation, marketplace: { getReports } } = this.props;
        if (!_.isEmpty(getReports.data) && !_.isEqual(getReports, prevProps.marketplace.getReports)) {
            // if (_.isEmpty(this.state.data)) {
            //     this.setState({ data: getReports.data })
            // }
            // else {
            //     this.setState({ data: this.state.data.concat(getReports.data), skip: this.state.skip + 5 })
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
        const { navigation, marketplace: { getReports, getSellerReports, setUserSide } } = this.props;
        let newArr = [];
        if (_.isEmpty(this.state.input)) {
            navigation.setParams({
                isSearching: false,
            })
            this.setState({ data: [] });
        } else {
            if (setUserSide) {
                _.filter(getSellerReports.data, toFilter => {
                    if (toFilter.trackingno.includes(this.state.input)) {
                        newArr.push(toFilter)
                        this.setState({ data: newArr });
                    }
                })
            } else {
                _.filter(getReports.data, toFilter => {
                    if (toFilter.trackingno.includes(this.state.input)) {
                        newArr.push(toFilter)
                        this.setState({ data: newArr });
                    }
                })
            }
        }
    }


    _viewReport = (item) => {
        const { navigation, actions, marketplace: { setSelectedReports } } = this.props;
        let selectedReport = _.merge({}, setSelectedReports);
        selectedReport = item;
        actions.setSelectedReports(selectedReport);
        navigation.navigate("GenRepScreen")
    }

    _renderTransactions = ({ item, index }) => {
        const sumTotal = _.sum([item.total_price, item.ship_fee]);
        const total = Number(parseFloat(sumTotal).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        return (
            <View style={{ paddingHorizontal: 15, paddingVertical: 10, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }} >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", fontWeight: "bold", color: "black" }}>Transaction Number</Text>
                    <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", fontWeight: "bold", color: Color.colorPrimaryMP }}>{item.trackingno}</Text>
                </View>
                <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", color: "black" }}>Date Debited</Text>
                    <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", color: "black" }}>{item.date_purchased}</Text>
                </View>
                <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", color: "black" }}>Merchant Name</Text>
                    <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", color: "black" }}>{item.shop_person}</Text>
                </View>
                <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", color: "black" }}>Shop Name</Text>
                    <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", color: "black" }}>{item.shop_name}</Text>
                </View>
                <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", color: "black" }}>Total Amount (Shipping Fee included.) </Text>
                    <Text style={{ fontSize: 13, fontFamily: "Roboto-Light", color: "black" }}>₱ {total}</Text>
                </View>
                <TouchableOpacity onPress={() => this._viewReport(item)}
                    style={{ marginTop: 10, width: "35%", justifyContent: "flex-start", alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 5, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 13, color: "white" }}>View Report</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // _renderFooter = () => {
    //     const { actions, marketplace: { loadMoreList } } = this.props;
    //     return (
    //         loadMoreList &&
    //         <View style={{ marginVertical: 5, alignItems: "center", justifyContent: "center" }}>
    //             <Spinner
    //                 color={"black"}
    //                 size="small"
    //                 animating={loadMoreList} />
    //         </View>
    //     )
    // }

    // handleLoadMore = () => {
    //     const { actions, login: { session }, marketplace: { getReports } } = this.props;
    //     if (getReports.total >= this.state.data.length) {
    //         actions.getReports(session, this.state.skip);
    //     }
    // }

    render() {
        const { actions, marketplace: { getReports, getSellerReports, setUserSide } } = this.props;
        console.log("state", this.state.data)
        const customerRerports = _.isEmpty(this.state.data) && _.isEmpty(this.state.input) ? getReports.data : this.state.data;
        const sellerReports = _.isEmpty(this.state.data) && _.isEmpty(this.state.input) ? getSellerReports.data : this.state.data;
        return (
            (!_.isEmpty(getReports.data) || !_.isEmpty(getSellerReports.data)) ?
                <View style={{ paddingVertical: 10, backgroundColor: "white", width: "100%", height: "100%" }}>
                    <FlatList
                        data={setUserSide ? sellerReports : customerRerports}
                        keyExtractor={(item, index) => `trans_idx ${index}`}
                        renderItem={this._renderTransactions}
                    // onEndReached={this.handleLoadMore}
                    // onEndReachedThreshold={1}
                    // ListFooterComponent={this._renderFooter} 
                    />
                </View> :
                <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Color.bg }}>
                    <Icon type='font-awesome' name='envelope-open-o' size={45} color={Color.Standard} />
                    <Text style={{ marginTop: 10, fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2, }}>No Data.</Text>
                </ScrollView>
        )
    }
}