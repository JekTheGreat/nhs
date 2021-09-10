import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, FlatList, Dimensions } from 'react-native';
import _ from 'lodash';
import { HeaderBackButton } from "react-navigation-stack";
import Button from "__src/components/Button";
import { Icon, ListItem } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class SearchScreen extends React.PureComponent {

    state = {
        sampleArr: ["astrus", "lebron", "mambas", "jordan", "test", "pokemon"],
    }


    _clearSearchHistory = () => {
        const { actions, navigation, marketplace: { setInputDetails }, login: { session } } = this.props;
        actions.deleteSearchHistory(session);
        // delete this.state.sampleArr;
        // this.forceUpdate()
        // console.log("CLEAR ALL SEARCH")
    }

    _deleteItem = (item) => {
        const { actions, navigation, marketplace: { setInputDetails }, login: { session } } = this.props;
        actions.deleteSearchHistory(session, item);
        // const { sampleArr } = this.state;
        // delete sampleArr[index];
        // this.forceUpdate()
        // console.log("DELETE", this.state.sampleArr[index])
    }




    click = (item) => {
        const { actions, navigation, marketplace: { setInputDetails }, login: { session } } = this.props;
        const categName = _.merge({}, setInputDetails);
        let name = _.merge({}, categName.categoryName)
        name = item;
        let param = {};
        param.search = item;
        categName.categoryName = name;
        actions.postProductList(session, param);
        actions.setInputDetails(categName);
        actions.getFilterCategoryList(session, item)
        actions.isSearchInput(true);
        actions.setFilterScreen("categories");
    }

    renderRow = ({ item, index }) => {
        return (
            !_.isEmpty(item) &&
            <ListItem onPress={() => this.click(item)}
                titleStyle={{ color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light" }}
                containerStyle={{ backgroundColor: Color.white, borderBottomColor: Colors.grey300, borderBottomWidth: .5 }}
                key={`item_id ${index}`} title={item}
                rightIcon={<Icon onPress={() => this._deleteItem(item)} name='times' type='font-awesome' color={Color.colorPrimaryMP} size={15} />} />
        );
    }

    render() {
        const { marketplace: { getSearchHistory } } = this.props
        return (
            !_.isEmpty(getSearchHistory) &&
            <View style={{ backgroundColor: "white", height: "55%" }}>
                <FlatList
                    ListFooterComponent={<View style={{ backgroundColor: "transparent" }} />}
                    data={getSearchHistory}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => `item_id ${index}`} />
                <TouchableOpacity onPress={() => this._clearSearchHistory()}
                    style={{ justifyContent: "center", alignItems: "center", height: 30, width: "100%", backgroundColor: Color.colorPrimaryMP }}>
                    <Text style={{ color: "white" }}>Clear Search History</Text>
                </TouchableOpacity>
            </View>
        )
    }
}