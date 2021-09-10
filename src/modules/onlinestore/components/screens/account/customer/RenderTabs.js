/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, RefreshControl, ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import TxtInput from "__src/components/TxtInput";
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import { Colors } from 'react-native-paper';
import Processing from './tabScreens/Processing';
import ToShip from './tabScreens/ToShip';
import ToReceive from './tabScreens/ToReceive';
import Delivered from './tabScreens/Delivered';
import Resources from "__src/resources";
import { Spinner } from "native-base";
const { width, height } = Dimensions.get('screen');
const { Color, Res } = Resources;


class RenderTabs extends PureComponent {

    state = {
        onSearch: false,
        toSearch: "",
        data: [],
    }

    componentDidUpdate(prevProps) {
        const { onlinestore: { getPurchaseList } } = this.props;
        if (!_.isEqual(prevProps.onlinestore.getPurchaseList, getPurchaseList) && !_.isEmpty(getPurchaseList)) {
            let newData = [];
            _.map(getPurchaseList.data, parent => {
                _.filter(parent.items, child => {
                    if (parent.status === "Processing" && _.isEqual(this.state.toSearch.toUpperCase(), child.prod_name.toUpperCase()) && _.isNull(parent.cancel_reason)) {
                        newData.push(parent);
                    }
                    else if (parent.status === "To Ship" && _.isEqual(this.state.toSearch.toUpperCase(), child.prod_name.toUpperCase()) && _.isNull(parent.cancel_reason)) {
                        newData.push(parent);
                    }
                    else if (parent.status === "To Receive" && _.isEqual(this.state.toSearch.toUpperCase(), child.prod_name.toUpperCase()) && _.isNull(parent.cancel_reason)) {
                        newData.push(parent);
                    }
                    else if (parent.status === "Delivered" && _.isEqual(this.state.toSearch.toUpperCase(), child.prod_name.toUpperCase()) && _.isNull(parent.cancel_reason)) {
                        newData.push(parent);
                    }
                })
                if (_.isEqual(this.state.toSearch, parent.trackingno) && parent.status === "Processing" && _.isNull(parent.cancel_reason)) {
                    newData.push(parent);
                }
                else if (_.isEqual(this.state.toSearch, parent.trackingno) && parent.status === "To Ship" && _.isNull(parent.cancel_reason)) {
                    newData.push(parent);
                }
                else if (_.isEqual(this.state.toSearch, parent.trackingno) && parent.status === "To Receive" && _.isNull(parent.cancel_reason)) {
                    newData.push(parent);
                }
                else if (_.isEqual(this.state.toSearch, parent.trackingno) && parent.status === "Delivered" && _.isNull(parent.cancel_reason)) {
                    newData.push(parent);
                }
            })
            this.setState({ data: newData })
        }
    }



    renderTab = (tabName) => {
        switch (tabName) {
            case "Processing":
                return <Processing onSearch={this.state.data} toSearch={this.state.toSearch} onlinestore={this.props.onlinestore} actions={this.props.actions} login={this.props.login} />
            case "To Ship":
                return <ToShip onSearch={this.state.data} toSearch={this.state.toSearch} onlinestore={this.props.onlinestore} actions={this.props.actions} login={this.props.login} />
            case "To Receive":
                return <ToReceive onSearch={this.state.data} toSearch={this.state.toSearch} onlinestore={this.props.onlinestore} actions={this.props.actions} login={this.props.login} />
            case "Delivered":
                return <Delivered onSearch={this.state.data} toSearch={this.state.toSearch} onlinestore={this.props.onlinestore} actions={this.props.actions} login={this.props.login} />

            case "Return/Refund Pending":

                break;
            case "Return/Refund Approved":

                break;
            case "Return/Refund Declined":

                break;
            case "Dispute Pending":

                break;
            case "Dispute Approved":

                break;
            case "Dispute Declined":

                break;
        }

    }

    renderTabs = () => {
        const { listData, initialPage } = this.props;
        if (!_.isEmpty(listData)) {
            return (
                <Tabs
                    initialPage={initialPage}
                    renderTabBar={listData.length > 4 ? () => <ScrollableTab /> : null}
                    tabBarUnderlineStyle={{ height: 1, backgroundColor: Color.colorPrimary }}
                    style={{ backgroundColor: Color.white, alignItems: "center", justifyContent: "center" }}
                    tabBarActiveTextColor={Color.colorPrimary}
                    tabBarInactiveTextColor={Color.Standard2}>
                    {_.map(listData, (tabName, ind) => {
                        return (
                            <Tab key={ind}
                                heading={`${tabName}`}
                                locked
                                tabStyle={{ backgroundColor: Color.white }}
                                textStyle={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 11 }}
                                activeTextStyle={{ fontSize: 13, color: Color.colorPrimary }}
                                activeTabStyle={{ backgroundColor: Color.white }}>
                                {this.renderTab(tabName)}
                            </Tab>
                        );
                    })}
                </Tabs>
            )
        }
    }

    _searchItem = (value) => {
        this.setState({ toSearch: value })
    }

    _onSearch = () => {
        const { onlinestore: { getPurchaseList } } = this.props;
        let newData = [];
        if (!_.isEmpty(this.state.toSearch)) {
            _.map(getPurchaseList.data, parent => {
                switch (parent.status) {
                    case "Processing":
                        _.filter(parent.items, child => {
                            if (_.isEqual(this.state.toSearch.toUpperCase(), child.prod_name.toUpperCase()) && _.isNull(parent.cancel_reason)) {
                                newData.push(parent);
                            }
                        })
                        if (_.isEqual(this.state.toSearch, parent.trackingno) && _.isNull(parent.cancel_reason)) {
                            newData.push(parent);
                        }
                        break;
                    case "To Ship":
                        _.filter(parent.items, child => {
                            if (_.isEqual(this.state.toSearch.toUpperCase(), child.prod_name.toUpperCase()) && _.isNull(parent.cancel_reason)) {
                                newData.push(parent);
                            }
                        })
                        if (_.isEqual(this.state.toSearch, parent.trackingno) && _.isNull(parent.cancel_reason)) {
                            newData.push(parent);
                        }
                        break;
                    case "To Receive":
                        _.filter(parent.items, child => {
                            if (_.isEqual(this.state.toSearch.toUpperCase(), child.prod_name.toUpperCase()) && _.isNull(parent.cancel_reason)) {
                                newData.push(parent);
                            }
                        })
                        if (_.isEqual(this.state.toSearch, parent.trackingno) && _.isNull(parent.cancel_reason)) {
                            newData.push(parent);
                        }
                        break;
                    case "Delivered":
                        _.filter(parent.items, child => {
                            if (_.isEqual(this.state.toSearch.toUpperCase(), child.prod_name.toUpperCase()) && _.isNull(parent.cancel_reason)) {
                                newData.push(parent);
                            }
                        })
                        if (_.isEqual(this.state.toSearch, parent.trackingno) && _.isNull(parent.cancel_reason)) {
                            newData.push(parent);
                        }
                        break;

                    default:
                        break;
                }
            })
        } else {
            this.setState({ onSearch: false })
        }
        this.setState({ data: newData });
    }

    refresh = () => {
        const { actions, onlinestore: { getPurchaseList }, login: { session } } = this.props;
        actions.fetchPurchaseList(session);
    }

    render() {
        const { label, onlinestore: { transactionInProgress } } = this.props;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: "white" }}
                refreshControl={<RefreshControl refreshing={transactionInProgress} onRefresh={this.refresh} />}>

                {!this.state.onSearch ?
                    <View style={{ paddingHorizontal: 15, marginVertical: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontFamily: "Roboto-Light", fontSize: 17, fontWeight: "bold" }}>
                            {label}
                        </Text>
                        <Icon
                            onPress={() => this.setState({ onSearch: true })}
                            type='FontAwesome5'
                            name='search' size={20}
                            color={this.state.onSearch ? Color.Standard2 : Color.colorPrimary}
                            solid />
                    </View> :
                    <TxtInput
                        style={{
                            marginTop: 3, alignSelf: "center",
                            shadowColor: Colors.grey300, shadowOpacity: 1, borderRadius: 5,
                            shadowOffset: { width: 1, height: 1, }
                        }}
                        style3={{ backgroundColor: Colors.grey50, borderColor: Color.colorPrimary, borderRadius: 5, width: "95%" }}
                        round
                        compName='Search2'
                        onChangeText={(value) => this._searchItem(value)}
                        onSearch={() => this._onSearch()}
                        placeholder="Search an item"
                        returnKeyType="search"

                        value={this.state.toSearch} />
                }
                {this.renderTabs()}
                {transactionInProgress && !_.isEmpty(this.state.toSearch) ?
                    <View style={{
                        position: "absolute",
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.2)', width: width, height: height
                    }}>
                        <Spinner
                            color={"black"}
                            size="small"
                            animating={transactionInProgress} />
                    </View> : null}
            </ScrollView>

        );
    }
}

RenderTabs.propTypes = {
    onlinestore: PropTypes.object,
    navigation: PropTypes.object,
};

export default RenderTabs;
