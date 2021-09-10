/* eslint-disable*/
/* eslint-disable react/prefer-es6-class */
import React from "react";
import { StyleSheet, Text, View, TextInput, Animated, Alert, Image, TouchableOpacity, Dimensions, SafeAreaView, StatusBar } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import { Icon } from 'react-native-elements';
import { Spinner } from 'native-base';
import Header from './Header';
import DrawerComponent from './DrawerComponent';
import Home from './renderScreens/Home';
import TopProducts from './renderScreens/SeeAllTopProducts';
import FilterScreens from './renderScreens/FilterScreens';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

class RenderStore extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const { actions, navigation, tabLabel, marketplace: { setSelectedItems, postSelectedProducts, countCart, setInputDetails, removeFromFavorites, addToFavorites }, login: { session } } = this.props;
        if (setInputDetails.route === "MarketPlace" && !_.isEmpty(postSelectedProducts) && !_.isEqual(prevProps.marketplace.postSelectedProducts, postSelectedProducts)) {
            if (postSelectedProducts.status === 0) {
                Alert.alert("Error", postSelectedProducts.result);
            } else {
                actions.getFavorites(session)
                navigation.navigate("PreviewProducts", { header: setSelectedItems.header, countCart: countCart });
            }
            delete postSelectedProducts.total
            delete postSelectedProducts.status
            console.log("postSelectedProducts", postSelectedProducts)
        }
    }


    renderScreen = () => {
        const { marketplace: { setOnlineStoreScreen } } = this.props;
        switch (setOnlineStoreScreen) {
            case "topProducts":
                return <TopProducts ref={(e) => this.TopProducts = e} {...this.props} />;
            // case "filterScreen":
            //     return <FilterScreens ref={(e) => this.FilterScreens = e} {...this.props} />;
            case "home":
            default:
                return <Home ref={(e) => this.Home = e} {...this.props} />
        }
    }


    onBack = () => {
        this.Header.onBack();
    }


    render() {
        const { goToPage, marketplace: { getFilterCategoryList, transactionInProgress } } = this.props
        return (
            <View style={{ flex: 1 }}>
                <Header ref={(e) => this.Header = e} isFilterScreen={false} {...this.props} />
                {this.renderScreen()}
                {transactionInProgress &&
                    <View style={{
                        position: "absolute",
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.2)', width: width, height: height
                    }}>
                        <Spinner
                            color={"black"}
                            size="small"
                            animating={transactionInProgress} />
                    </View>}
                <SafeAreaView style={{ flex: 1 }} />
            </View>
        );
    }
};

export default RenderStore;