import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Dimensions, SafeAreaView, Alert } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import { Rating } from 'react-native-ratings';
import ToggleSwitch from 'toggle-switch-react-native';
import AddToAlbum from './AddToAlbum';
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class ViewCollection extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            albumName: this.props.navigation.getParam("title") === "Edit Album" ? this.props.navigation.getParam("album").name : "",
            error: "",
            isModalShowing: false,
        }
    }

    componentDidUpdate(prevProps) {
        const { actions, login: { session }, navigation, marketplace: { patchCollections, deleteCollections, patchCollectionsItem, saveCollections } } = this.props;
        if (!_.isEmpty(patchCollectionsItem) && !_.isEqual(patchCollectionsItem, prevProps.marketplace.patchCollectionsItem)) {
            if (patchCollectionsItem.status === 1) {
                actions.getCollections(session)
                navigation.goBack();
            } else {
                Alert.alert("Error", patchCollectionsItem.result)
            }
            delete patchCollectionsItem.status
        }
        if (!_.isEmpty(saveCollections) && !_.isEqual(saveCollections, prevProps.marketplace.saveCollections)) {
            if (saveCollections.status === 0) {
                Alert.alert("Error", saveCollections.result)
            } else {
                actions.getCollections(session)
                navigation.goBack();
            }
            delete saveCollections.status
        }
    }

    _cancel = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    _save = () => {
        const { actions, login: { session }, navigation, marketplace: { getCollections } } = this.props;
        if (_.isEmpty(this.state.albumName)) {
            this.setState({ error: "Album name is required." })
        }
        else {
            const collectionProduct = _.has(navigation, "state.params.album") ? _.map(navigation.getParam("album").product, prod => {
                return prod.id;
            }) : [];
            let param = {};
            param.name = this.state.albumName;
            param.product = collectionProduct;
            navigation.getParam("title") === "Edit Album" ?
                actions.patchCollectionsItem(session, navigation.getParam("album").id, param) : actions.saveCollections(session, param)
        }
    }

    _addEdit = () => {
        this.setState({ isModalShowing: true })
    }

    closeModal = () => {
        this.setState({ isModalShowing: false })
    }

    onSwitch = (id) => {
        const { actions, login: { session } } = this.props;
        actions.patchCollections(session, id)
    }

    onChangeText = (value) => {
        this.setState({ error: "", albumName: value })
    }

    _renderProd = ({ item, index }) => {
        const b = _.isString(item.price) ? item.price.split(/[.\-_]/) : [];
        const c = b.map(Number);
        const minPrice = !_.isEmpty(c) && (c[0]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const maxPrice = !_.isEmpty(c) && (c[1]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const priceRange = _.isEqual(minPrice, maxPrice) ? maxPrice : `${minPrice} - ${maxPrice}`;
        const price = _.isNumber(item.price) ? Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }) : priceRange;
        const rate = item.rate / 2;
        return (
            <View key={`indx ${index}`} style={{
                width: "48%", borderWidth: 1, borderColor: Color.Standard, borderRadius: 5,
                marginHorizontal: 5, marginTop: 15, paddingBottom: 10, height: 170
            }}>
                <Image source={{ uri: item.coverImg }} style={{ width: "100%", height: "50%", borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
                {!_.isNull(item.discount_percent) && !_.isEqual(item.discount, 0) &&
                    <View style={{ position: "absolute", top: -5, right: 0, }}>
                        <Image resizeMode='contain' source={Res.get("discount_banner")} style={{ height: 50, width: 30, borderTopRightRadius: 2 }} />
                        <View style={{ position: "absolute", top: 5, right: 5, }}>
                            <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 10, fontFamily: "Roboto-Light" }}>{Math.round(item.discount_percent)}%</Text>
                            <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 10, fontFamily: "Roboto-Light" }}>OFF</Text>
                        </View>
                    </View>}
                <Text style={{ marginTop: 5, height: 30, alignSelf: "center", textAlign: "center", fontSize: 12, fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                    {item.name}
                </Text>
                {!_.isNull(item.discount_percent) && !_.isEqual(item.discount, 0) ?
                    <View style={{ paddingHorizontal: 10, flexDirection: "row", }}>
                        <Text style={{ width: "50%", textAlign: "left", fontSize: 11, fontWeight: "bold", fontFamily: "Roboto-Light", color: "black" }}>
                            ₱ {Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
                        </Text>
                        <Text style={{
                            width: "50%", textAlign: "right", fontSize: 11, textDecorationLine: 'line-through',
                            textDecorationStyle: 'solid', fontFamily: "Roboto-Light", color: Color.Standard2
                        }}>
                            ₱ {Number(parseFloat(item.old_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}
                        </Text>
                    </View> :
                    <Text style={{ paddingLeft: 10, textAlign: "left", fontSize: 11, fontWeight: "bold", fontFamily: "Roboto-Light", color: "black" }}>
                        ₱ {price}</Text>
                }
                <View style={{ paddingHorizontal: 10, marginTop: 5, flexDirection: "row", justifyContent: "space-between" }}>
                    <Rating
                        style={{ alignSelf: "center" }}
                        startingValue={rate}
                        readonly={true}
                        imageSize={12}
                        ratingColor={Color.colorPrimaryMP} />
                    <Text style={{ alignSelf: "center", textAlign: "center", fontSize: 11, fontFamily: "Roboto-Light", color: Color.Standard2 }}>
                        {`${_.isArray(item.reviews) ? item.reviews.length : item.reviews} Reviews`}</Text>
                </View>
            </View>
        )
    }


    render() {
        const { navigation, marketplace: { getCollections } } = this.props;
        const collectionProduct = _.has(navigation, "state.params.album") ? navigation.getParam("album").product : [];
        if (navigation.getParam("title") === "Edit Album") {
            var isActive = navigation.getParam("album").active;
            _.map(getCollections, item => {
                if (item.id === navigation.getParam("album").id) {
                    isActive = item.active
                }
            })
        }
        console.log("collectionProduct", navigation)
        return (
            <View style={{ flex: 1, backgroundColor: "white" }} >
                {navigation.getParam("title") === "Edit Album" &&
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15, borderBottomWidth: 1, borderColor: Colors.grey300 }}>
                        <Text style={{ fontSize: 12, color: "black", fontFamily: "Roboto-Light" }}>Activate this album to make it visible.</Text>
                        <ToggleSwitch
                            isOn={isActive}
                            onColor={Color.colorPrimaryMP}
                            offColor={Color.Standard}
                            size={"small"}
                            onToggle={() => this.onSwitch(navigation.getParam("album").id)} />
                    </View>}

                <View style={{ padding: 15, borderBottomWidth: 1, borderColor: Colors.grey300 }}>
                    <Text style={{ fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light" }}>Album Name</Text>

                    <TextInput
                        style={[!_.isEmpty(this.state.error) ? { borderColor: "red" } : { borderColor: Color.Standard }, { paddingLeft: 10, borderRadius: 5, marginTop: 10, height: 35, borderWidth: 1, fontSize: 12, fontFamily: "Roboto-Light" }]}
                        onChangeText={value => this.onChangeText(value)}
                        value={this.state.albumName} />

                    {!_.isEmpty(this.state.error) &&
                        <Text style={{ fontSize: 12, color: "red", fontFamily: "Roboto-Light" }}>{this.state.error}</Text>}

                    <TouchableOpacity onPress={this._addEdit}
                        style={{ marginTop: 10, justifyContent: "center", alignItems: "center", backgroundColor: Color.colorPrimaryMP, width: "100%", height: 35, borderRadius: 5 }} >
                        <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>+ Add/Edit Products</Text>
                    </TouchableOpacity>
                </View>
                {!_.isEmpty(collectionProduct) ?
                    <FlatList
                        data={collectionProduct}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        style={{ paddingHorizontal: 10 }}
                        keyExtractor={(item, index) => `indx ${index}`}
                        renderItem={this._renderProd} />
                    :
                    <View style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }}>
                        <Image source={Res.get('no_products')} resizeMode='contain' style={{ width: 100, height: 100 }} />
                        <Text style={{ fontSize: 14, color: Color.Standard2 }}>No Products Found</Text>
                    </View>
                }

                <SafeAreaView style={{ flex: 1 }} />
                <View style={{ borderTopWidth: 1, borderColor: Colors.grey300, flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={this._cancel}
                        style={{ justifyContent: "center", alignItems: "center", width: "50%", height: 40 }} >
                        <Text style={{ textAlign: "center", fontSize: 12, color: Color.colorPrimaryMP }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._save}
                        style={{ justifyContent: "center", alignItems: "center", backgroundColor: Color.colorPrimaryMP, width: "50%", height: 40 }} >
                        <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>Save</Text>
                    </TouchableOpacity>
                </View>

                <AddToAlbum closeModal={this.closeModal} isModalShowing={this.state.isModalShowing} {...this.props} />
            </View>
        )
    }
}