/*eslint-disable*/
import React from 'react';
import { StatusBar } from 'react-native';
import MarketPlaceMain from "./containers/main";
// import navigationOptions from "__src/components/navOpt";
import { createStackNavigator } from "react-navigation-stack";
import reducers from "./reducers";
import _ from 'lodash';
import Resource from "__src/resources";
const { Color, Res } = Resource;
export const marketplace = reducers;

export default createStackNavigator({
    MarketPlaceMain: {
        screen: MarketPlaceMain,
        navigationOptions: {
            headerShown: false,
        },
    },
})
