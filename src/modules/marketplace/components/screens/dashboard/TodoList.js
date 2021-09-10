import React from 'react';
import { View, Text, TouchableOpacity, Image, Easing, FlatList } from 'react-native';
import _ from 'lodash';
import { Icon, ListItem } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const myPurchasesList = ["Order Received", "To Ship", "To Receive", "Delivered", "Return/Refund", "Disputes", "Cancelled"];

export default class TodoList extends React.PureComponent {

    click = (item, index) => {
        const { actions, navigation, changeUserSide, goToPage, login: { session }, marketplace: { countCart, setUserSide } } = this.props;

        if (item === "Order Received") {
            navigation.navigate("MySales", { isSearching: false, initPage: 1 });
        }
        else if (item === "To Ship") {
            navigation.navigate("MySales", { isSearching: false, initPage: 2 });
        }
        else if (item === "To Receive") {
            navigation.navigate("MySales", { isSearching: false, initPage: 3 });
        }
        else if (item === "Delivered") {
            navigation.navigate("MySales", { isSearching: false, initPage: 4 });
        }
        else if (item === "Return/Refund") {
            actions.getSellerReturns(session);
            navigation.navigate("ReturnsSeller", { isSearching: false });
        }
        else if (item === "Disputes") {
            actions.getSellerReturns(session);
            navigation.navigate("Disputes", { isSearching: false });
        }
        else if (item === "Cancelled") {
            navigation.navigate("MySales", { isSearching: false, initPage: 5 });
        }
    }

    _renderTodo = ({ item, index }) => {
        const { marketplace: { getTodoList } } = this.props;
        let pending;
        if (item === "Order Received") {
            pending = getTodoList.Processing;
        } else if (item === "To Ship") {
            pending = getTodoList["To Ship"];
        } else if (item === "To Receive") {
            pending = getTodoList["To Receive"];
        } else if (item === "Delivered") {
            pending = getTodoList.Delivered;
        } else if (item === "Return/Refund") {
            pending = getTodoList.Return;
        } else if (item === "Disputes") {
            pending = getTodoList.Dispute;
        } else if (item === "Cancelled") {
            pending = getTodoList.Cancelled;
        }
        return (
            <View>
                <ListItem onPress={() => this.click(item, index)}
                    titleStyle={{ color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light" }}
                    containerStyle={{ backgroundColor: Color.white, borderBottomColor: Colors.grey300, borderBottomWidth: .5 }}
                    key={`todo_rowid ${item}`} title={item}
                    chevron={<Icon name='chevron-right' type='evilicon' color={Color.Standard2} size={25} />}
                    rightElement={<Text style={{ color: Color.colorPrimaryMP, fontSize: 12 }}>{_.isUndefined(pending) ? 0 : pending}</Text>} />
            </View>
        )
    }

    render() {
        return (
            <View>
                <Text style={{ paddingHorizontal: 20, marginTop: 5, fontSize: 14, fontWeight: "bold", color: "black" }}>Todo List</Text>
                <Text style={{ paddingHorizontal: 20, marginTop: 5, fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>List you need to deal with.</Text>
                <FlatList
                    style={{ marginTop: 10 }}
                    ListFooterComponent={<View style={{ backgroundColor: "transparent" }} />}
                    data={myPurchasesList}
                    renderItem={this._renderTodo}
                    keyExtractor={(item, index) => `todo_rowid ${index}`} />
            </View>
        )
    }
}