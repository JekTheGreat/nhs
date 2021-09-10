import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, TextInput, Alert, TouchableWithoutFeedback, FlatList, Dimensions } from 'react-native';
import _ from 'lodash';
import { HeaderBackButton } from "react-navigation-stack";
import { Spinner } from 'native-base';
import Button from "__src/components/Button";
import RecentSearches from './searchcomponents/RecentSearches';
import SearchCategories from './searchcomponents/SearchCategories';
import { Icon, ListItem } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class SearchScreen extends React.PureComponent {

    _onBack = () => {
        const { actions, navigation, login: { session } } = this.props;
        navigation.goBack();
        actions.isFromSearchScreen(false);
        actions.isSearchInput(false);
    }

    componentWillMount() {
        const { actions, login: { session }, marketplace: { transactionInProgress, postProductList } } = this.props;
        actions.isFromSearchScreen(true);
        actions.getSearchHistory(session);
    }

    state = { input: "" }

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: <HeaderBackButton tintColor="black" onPress={navigation.getParam("back")} />,
            headerTitle: <View style={[navigation.getParam("error") ? { borderColor: "red" } : { borderColor: Color.Standard }, {
                borderRadius: 5, borderWidth: 1, height: 35, width: 310, marginLeft: 10,
                flexDirection: "row", backgroundColor: "white", justifyContent: "space-evenly", alignItems: "center"
            }]}>
                <TextInput
                    style={{ fontSize: 12, height: 35, width: 250, }}
                    placeholder="Type a product to be searched."
                    placeholderTextColor={navigation.getParam("error") ? { color: "red" } : { color: Color.Standard }}
                    value={navigation.getParam("text")}
                    inlineImageLeft='search_icon'
                    onChangeText={navigation.getParam("onchange")} />

                <TouchableOpacity onPress={navigation.getParam("search")}>
                    <Icon type='font-awesome' name='search' size={15} color={Color.Standard2} />
                </TouchableOpacity>
            </View>
        }
    }

    componentDidUpdate(prevProps) {
        const { actions, navigation, login: { session }, marketplace: { transactionInProgress, postProductList, deleteSearchHistory } } = this.props;
        if (!_.isEqual(prevProps.marketplace.postProductList, postProductList) && !_.isEmpty(postProductList)) {
            navigation.navigate("FilterScreens");
            actions.getSearchHistory(session);
            delete postProductList.total
            delete postProductList.status
        }
        if (!_.isEmpty(deleteSearchHistory) && !_.isEqual(deleteSearchHistory, prevProps.marketplace.deleteSearchHistory)) {
            if (deleteSearchHistory.status === 1) {
                actions.getSearchHistory(session);
            } else {
                Alert.alert("Error", deleteSearchHistory.result);
            }
            delete deleteSearchHistory.status
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.setParams({
            search: this._onSearch,
            back: this._onBack,
            onchange: this._onChangeText,
        })
        console.log("componentDidMount", navigation.getParam("error"))
    }

    _onChangeText = (value) => {
        const { navigation } = this.props;
        this.setState({ input: value })
        navigation.setParams({
            text: value,
            error: false,
        })
        console.log("VALUE", value)
    }

    _onSearch = () => {
        const { actions, navigation, marketplace: { setInputDetails, getSearchHistory, isFilterScreen, setFilterScreen }, login: { session } } = this.props;
        if (!_.isEmpty(this.state.input) && !_.isEmpty(getSearchHistory)) {
            const categName = _.merge({}, setInputDetails);
            let name = _.merge({}, categName.categoryName)
            name = !_.isEmpty(this.state.input) ? this.state.input : getSearchHistory[0];
            categName.categoryName = name;
            actions.setInputDetails(categName);
            let param = {};
            param.search = this.state.input;
            actions.postProductList(session, param);
            actions.isSearchInput(true);
            // if (isFilterScreen === true && setFilterScreen === "officialStore") {
            //     actions.setFilterScreen("collectionScreen");
            // } else {
            actions.setFilterScreen("categories");
            // }
        } else {
            navigation.setParams({
                error: true,
            })
        }
    }



    render() {
        const { marketplace: { transactionInProgress } } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: "white", }}>
                <RecentSearches {...this.props} />
                <SearchCategories {...this.props} />
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
            </View>
        )
    }
}