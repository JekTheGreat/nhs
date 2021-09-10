import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, SafeAreaView, Dimensions, TextInput, Modal, FlatList } from 'react-native';
import _ from 'lodash';
import { Icon, CheckBox } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');
export default class AddToAlbum extends React.PureComponent {

    state = { isInputShowing: false, prodName: "", isChecked: false, CBData: [] }

    onBack = () => {
        const { closeModal } = this.props;
        closeModal();
    }

    _onPress = () => {
        if (!_.isEmpty(this.state.prodName)) {

        } else {
            this.setState({ isInputShowing: !this.state.isInputShowing })
        }
    }
    _confirm = () => {
        const { navigation, closeModal } = this.props;
        const album = _.merge({}, navigation.getParam("album"))
        let selectedProducts = _.merge({}, album.product);
        selectedProducts = Object.values(this.state.CBData);
        album.product = selectedProducts;
        navigation.setParams({ album: album })
        closeModal()
    }

    onChangeText = (value) => {
        this.setState({ prodName: value })
    }

    onCheck = (item) => {
        const { CBData } = this.state;
        let selected = { ...CBData };
        let value = !selected[item.id];
        if (value) {
            selected[item.id] = item;
        }
        else {
            delete selected[item.id];
        }
        this.setState({ CBData: selected })
    }

    _renderProd = ({ item, index }) => {
        const { CBData } = this.state;
        const b = _.isString(item.price) ? item.price.split(/[.\-_]/) : [];
        const c = b.map(Number);
        const minPrice = !_.isEmpty(c) && (c[0]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const maxPrice = !_.isEmpty(c) && (c[1]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const priceRange = _.isEqual(minPrice, maxPrice) ? maxPrice : `${minPrice} - ${maxPrice}`;
        const price = _.isNumber(item.price) ? Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }) : priceRange;
        const rate = item.rate / 2;
        const isSelected = CBData.hasOwnProperty(`${item.id}`) ? true : false;
        return (
            <View key={`indx ${index}`} style={{
                width: "48%", borderWidth: 1, borderColor: Color.Standard, borderRadius: 5,
                marginHorizontal: 5, marginTop: 15, paddingBottom: 10, height: 170
            }}>
                <Image source={{ uri: item.coverImg }} style={{ width: "100%", height: "50%", borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
                <CheckBox
                    containerStyle={{ position: 'absolute', padding: 0 }}
                    checkedColor={Color.colorPrimaryMP}
                    checked={isSelected}
                    iconType='font-awesome'
                    checkedIcon='check-square'
                    size={23}
                    onPress={() => this.onCheck(item)} />

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
                        {`${item.reviews.length} Reviews`}</Text>
                </View>
            </View>
        )
    }

    render() {
        const { navigation, isModalShowing, closeModal, marketplace: { getSellerProducts } } = this.props;
        const data = _.isEmpty(this.state.prodName) ? getSellerProducts.data : _.filter(getSellerProducts.data, prods => {
            if (prods.name.toLowerCase().includes(this.state.prodName.toLowerCase())) {
                return prods;
            }
        })
        return (
            <Modal
                style={{}}
                animationType="none"
                transparent={false}
                visible={isModalShowing}>
                <View style={{ flex: 1, width: width, height: height }}>
                    <View style={{ height: 55, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: Color.colorPrimaryMP }}>
                        <TouchableOpacity onPress={() => this.onBack()} style={{ position: "absolute", left: 18 }}>
                            <Image style={{ width: 18, height: 18, }} source={Res.get("back")} resizeMode="contain" />
                        </TouchableOpacity>
                        {this.state.isInputShowing ?
                            <TextInput
                                style={[{
                                    borderColor: Color.Standard, backgroundColor: "white", paddingLeft: 10,
                                    borderRadius: 5, height: 35, width: "75%", borderWidth: 1, fontSize: 12,
                                    fontFamily: "Roboto-Light"
                                }]}
                                placeholder="Search by product name"
                                onChangeText={value => this.onChangeText(value)}
                                value={this.state.prodName} /> :
                            <Text style={{ textAlign: "center", fontSize: 17, color: "black", fontWeight: "bold" }}>Add to Album</Text>}

                        <TouchableOpacity onPress={() => this._onPress()} style={{ position: "absolute", right: 15, alignItems: "center" }}>
                            <Icon type='font-awesome' name='search' size={15} color={Color.Standard2} containerStyle={{ alignSelf: "center" }} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={data}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        style={{ paddingHorizontal: 10 }}
                        keyExtractor={(item, index) => `indx ${index}`}
                        renderItem={this._renderProd} />

                    <SafeAreaView style={{ flex: 1 }} />
                    <View style={{
                        paddingHorizontal: 15, paddingVertical: 10, borderTopWidth: 1, borderColor: Colors.grey300,
                        flexDirection: "row", alignItems: "center", justifyContent: "space-between"
                    }}>
                        <Text style={{ textAlign: "center", fontSize: 12, color: "black" }}>Selected Item/s</Text>
                        <Text style={{ textAlign: "center", fontSize: 12, color: Color.colorPrimaryMP }}>
                            {`(${Object.keys(this.state.CBData).length} Item/s)`}
                        </Text>
                    </View>
                    <View style={{ borderTopWidth: 1, borderColor: Colors.grey300, flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={this.onBack}
                            style={{ justifyContent: "center", alignItems: "center", width: "50%", height: 40 }} >
                            <Text style={{ textAlign: "center", fontSize: 12, color: Color.colorPrimaryMP }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._confirm}
                            style={{ justifyContent: "center", alignItems: "center", backgroundColor: Color.colorPrimaryMP, width: "50%", height: 40 }} >
                            <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}