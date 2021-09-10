/* eslint-disable*/
/* eslint-disable react/prefer-es6-class */
import React from "react";
import { ScrollView, Text, View, TextInput, Animated, Alert, Image, TouchableOpacity, Dimensions, SafeAreaView, StatusBar } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import { Icon } from 'react-native-elements';
import { Spinner } from 'native-base';
import Header from './Header';
import Navigations from './Navigations';
import TodoList from './TodoList';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class DashboardMain extends React.PureComponent {

    componentWillMount() {
        const { actions, login: { session } } = this.props;
        actions.getTodoList(session)
    }

    componentDidMount() {
        const { actions, login: { session } } = this.props;
        actions.getSellerReturns(session)
        actions.getMySales(session)
    }

    onBack = () => {
        this.Header.onBack();
    }

    render() {
        const { marketplace: { getFilterCategoryList, transactionInProgress } } = this.props
        return (
            <View style={{ flex: 1 }}>
                <Header ref={(e) => this.Header = e}  {...this.props} />
                <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "white" }} >
                    <Navigations  {...this.props} />
                    <TodoList  {...this.props} />
                </ScrollView>
            </View>
        );
    }
};
