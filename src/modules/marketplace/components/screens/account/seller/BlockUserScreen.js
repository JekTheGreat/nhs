import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, Alert, TextInput } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class BlockUserScreen extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const { actions, login: { session }, marketplace: { getBlockList, removeBlockUser } } = this.props;
        if (!_.isEmpty(removeBlockUser) && !_.isEqual(prevProps.marketplace.removeBlockUser, removeBlockUser)) {
            if (removeBlockUser.status === 1) {
                actions.getBlockList(session);
            } else {
                Alert.alert("ERROR", removeBlockUser.result);
            }
            delete removeBlockUser.status;
        }
    }

    removeBlock = (item) => {
        const { actions, login: { session } } = this.props;
        actions.removeBlockUser(session, item.id)
    }

    _renderBlockUsers = ({ item, index }) => {
        return (
            <View key={`blk_idx ${index}`}
                style={{
                    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                    borderBottomColor: Colors.grey300, borderBottomWidth: .5, paddingVertical: 15, paddingHorizontal: 15
                }}>
                <View style={{}}>
                    <Text style={{ fontSize: 14, color: "black" }}>{`${item.user}`}</Text>
                    <Text style={{ fontSize: 12, color: Color.Standard }}>
                        {`Blocked Date: ${item.date}`}
                    </Text>
                </View>

                <Icon onPress={() => this.removeBlock(item)} name='trash-o' type='font-awesome' color='red' size={15} />
            </View>
        )
    }

    render() {
        const { marketplace: { getBlockList } } = this.props;
        return (
            _.isEmpty(getBlockList.data) ?
                <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Color.bg }}>
                    <Icon type='font-awesome' name='envelope-open-o' size={45} color={Color.Standard} />
                    <Text style={{ marginTop: 10, fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2, }}>No Users Blocked.</Text>
                </ScrollView> :
                <View style={{ paddingVertical: 10, backgroundColor: "white", width: width, height: height }}>
                    <Text style={{ paddingHorizontal: 15, marginTop: 5, fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>
                        List of users that you have blocked from chats.
                </Text>
                    <FlatList
                        data={getBlockList.data}
                        contentContainerStyle={{ marginTop: 10 }}
                        keyExtractor={(item, index) => `blk_idx ${index}`}
                        renderItem={this._renderBlockUsers} />
                </View>
        )
    }
}