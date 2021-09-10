import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Alert, StyleSheet, Dimensions, FlatList, RefreshControl } from 'react-native';
import _ from 'lodash';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import ToggleSwitch from 'toggle-switch-react-native';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
import itemsOnSale from '../../../../containers/itemsOnSale';
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class MyCollectionsListScreen extends React.PureComponent {

    state = {
        isRefreshing: false,
    }

    componentDidUpdate(prevProps) {
        const { actions, login: { session }, marketplace: { patchCollections, deleteCollections, transactionInProgress } } = this.props;
        if (!_.isEqual(prevProps.marketplace.transactionInProgress, transactionInProgress) && (transactionInProgress === false)) {
            this.setState({ isRefreshing: false });
        }
        if (!_.isEmpty(patchCollections) && !_.isEqual(patchCollections, prevProps.marketplace.patchCollections)) {
            if (patchCollections.status === 1) {
                actions.getCollections(session)
            } else {
                Alert.alert("Error", patchCollections.result)
            }
            delete patchCollections.status
        }
        if (!_.isEmpty(deleteCollections) && !_.isEqual(deleteCollections, prevProps.marketplace.deleteCollections)) {
            if (deleteCollections.status === 1) {
                actions.getCollections(session)
            } else {
                Alert.alert("Error", deleteCollections.result)
            }
            delete deleteCollections.status
        }
    }

    onSwitch = (id) => {
        const { actions, login: { session } } = this.props;
        actions.patchCollections(session, id)
    }

    deleteButton = (id) => {
        const { actions, login: { session } } = this.props;
        actions.deleteCollections(session, id)
    }

    view = (item) => {
        const { actions, navigation, login: { session } } = this.props;
        navigation.navigate("ViewCollection", { title: "Edit Album", album: item })
    }

    rightSwipe = (hasDelete, item) => {
        return (<View>
            {hasDelete && <TouchableOpacity onPress={() => this.deleteButton(item.id)} style={styles.delete}>
                <Text style={styles.swipeTxt}>Delete</Text>
            </TouchableOpacity>}
            <TouchableOpacity onPress={() => this.view(item)} style={[hasDelete ? { height: 35 } : { height: 70 }, styles.view]}>
                <Text style={styles.swipeTxt}>View</Text>
            </TouchableOpacity>
        </View>
        )
    }

    renderCustomCollection = hasDelete => ({ item, index }) => {
        return (
            <Swipeable key={`indx ${index}`} overshootRight={false} renderRightActions={() => this.rightSwipe(hasDelete, item)} >
                <View style={styles.container}>
                    <View style={styles.dataContainer}>
                        <Image source={Res.get('product_collections')} style={styles.imgStyle} />
                        <Text style={styles.txtName}>
                            {`${item.name}`}
                        </Text>
                    </View>
                    <View style={styles.switchContainer}>
                        <ToggleSwitch
                            isOn={item.active}
                            onColor={Color.colorPrimaryMP}
                            offColor={Color.Standard}
                            size={"small"}
                            onToggle={() => this.onSwitch(item.id)} />
                    </View>
                </View>
            </Swipeable>
        )
    }

    refresh = () => {
        const { actions, login: { session } } = this.props;
        actions.getCollections(session);
        this.setState({ isRefreshing: true });
    }

    render() {
        const { marketplace: { getCollections } } = this.props;
        return (
            <ScrollView refreshControl={<RefreshControl refreshing={this.state.isRefreshing && !_.isEmpty(getCollections)} onRefresh={this.refresh} />} >
                <Text style={{ paddingVertical: 10, paddingHorizontal: 15, fontSize: 12, color: "black", fontFamily: "Roboto-Light" }}>
                    Manage or add album
                </Text>
                <FlatList
                    data={_.filter(getCollections, item => {
                        if (item.name.toLowerCase() !== "On Sale".toLowerCase() && item.name.toLowerCase() !== "New Arrival".toLowerCase()) {
                            return item
                        }
                    })}
                    keyExtractor={(item, index) => `indx ${index}`}
                    renderItem={this.renderCustomCollection(true)} />

                <View style={{ paddingVertical: 10, paddingHorizontal: 15, borderTopWidth: .5, borderBottomWidth: .5, borderColor: Colors.grey300 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "black", fontFamily: "Roboto-Light" }}>
                        Automatic Categories
                    </Text>
                    <Text style={{ fontSize: 12, color: "black", fontFamily: "Roboto-Light" }}>
                        These are the basic categories provided by the Unified Mall Centre.
                    </Text>
                </View>

                <FlatList
                    data={_.filter(getCollections, item => {
                        if (item.name.toLowerCase() === "On Sale".toLowerCase() || item.name.toLowerCase() === "New Arrival".toLowerCase()) {
                            return item
                        }
                    })}
                    style={{ backgroundColor: "red" }}
                    keyExtractor={(item, index) => `indx ${index}`}
                    renderItem={this.renderCustomCollection(false)} />
            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "red",
        height: 70,
        width: width,
        paddingHorizontal: 15,
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: .5,
        borderBottomWidth: .5,
        borderColor: Colors.grey300
    },
    dataContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    imgStyle: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    txtName: {
        fontSize: 12,
        color: "black",
        fontWeight: "bold",
        fontFamily: "Roboto-Light"
    },
    swipeTxt: {
        fontSize: 12,
        color: "white",
    },
    delete: {
        backgroundColor: "red",
        height: 35,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    view: {
        backgroundColor: Color.colorPrimaryMP,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    switchContainer: {
        width: 50,
        justifyContent: "center",
        alignItems: "center",
    },

});