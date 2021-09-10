/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import ImagePicker from "react-native-image-picker";
import { Icon } from 'react-native-elements';
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;
const { width, height } = Dimensions.get('screen');

class UploadPhoto extends PureComponent {
    state = { isTrue: [], imgArr: [] }

    componentDidUpdate(prevProps, prevState) {
        const { actions, navigation, login: { session }, marketplace: { uploadImage, setInputDetails, patchReturn } } = this.props;
        const { imgArr } = this.state;
        console.log("!@#123", !_.isEqual(prevProps.marketplace.uploadImage, uploadImage) && !_.isEmpty(uploadImage) && _.isEqual(Object.keys(setInputDetails.imagesToReturn).length, uploadImage.length))
        if (!_.isEqual(prevProps.marketplace.uploadImage, uploadImage) && !_.isEmpty(uploadImage) && _.isEqual(Object.keys(setInputDetails.imagesToReturn).length, uploadImage.length)) {
            let newErr = {};
            let params = {};
            let products = []
            _.map(Object.keys(setInputDetails.selectedProductToReturn), (items, index) => {
                let toItem = {}
                toItem.id = setInputDetails.selectedProductToReturn[items].id
                toItem.cancel_reason = setInputDetails.reasonsToReturn[items];
                toItem.quantity = setInputDetails.quantityToReturn[items];
                _.map(Object.values(uploadImage), data => {
                    _.map(Object.keys(data), key => {
                        if (key === items) {
                            toItem.images = data[key]
                        }
                    })
                })
                products.push(toItem)
            })
            params.action = "Return-Pending";
            params.items = products;
            console.log("products", params)
            actions.patchReturn(session, params)
        }


        if (!_.isEqual(prevProps.marketplace.patchReturn, patchReturn) && !_.isEmpty(patchReturn)) {
            if (patchReturn.status === 0) {
                Alert.alert("Error", patchReturn.result)
            } else {
                actions.getPurchaseList(session);
                navigation.goBack();
            }
            actions.reset_upload();
            delete patchReturn.status;
        }
    }

    componentWillMount() {
        const { actions, marketplace: { setInputDetails } } = this.props;
        const newInput = _.merge({}, setInputDetails)
        let toPass = _.merge({}, newInput.imagesToReturn)
        _.map(Object.keys(setInputDetails.selectedProductToReturn), id => {
            let imgArr = [];
            for (let i = 0; i < 4; i++) {
                imgArr.push("")
            }
            toPass[id] = imgArr;
        })
        newInput.imagesToReturn = toPass;
        actions.setInputDetails(newInput);
        actions.reset_upload();
    }

    onNext = () => {
        const { actions, login: { session }, marketplace: { setInputDetails, uploadImage } } = this.props;
        if (!_.isEmpty(this.state.isTrue) && Object.values(setInputDetails.imagesToReturn).length === Object.values(this.state.isTrue).length) {
            _.map(Object.values(setInputDetails.imagesToReturn), (items, index) => {
                const param = new FormData();
                _.map(items, passing => {
                    if (!_.isEmpty(passing)) {
                        param.append("file", passing);
                    }
                })
                actions.uploadImage(session, param, Object.keys(setInputDetails.imagesToReturn)[index], "mypurchases-return");
            })
        } else {
            Alert.alert("Notice", "Choose photo to upload first.")
        }
    }

    _selectImages = (item, stateItem, index) => {
        const { actions, marketplace: { setInputDetails }, login: { session } } = this.props;
        const newInput = _.merge({}, setInputDetails)
        let toPass = _.merge({}, newInput.imagesToReturn)

        ImagePicker.showImagePicker({ noData: true, mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log("didCancel", response.didCancel);
            }
            else if (response.error) {
                console.log("error", response.error);
            }
            else if (response.customButton) {
                console.log("customButton", response.customButton);
            }
            else {
                toPass[item.id][index] = { type: "image/jpeg", uri: response.uri, name: response.fileName }
                this.state.isTrue[item.id] = true;
                newInput.imagesToReturn = toPass;
                actions.setInputDetails(newInput);
            }
        });
    }

    removeImg = (item, index) => {
        const { marketplace: { setInputDetails } } = this.props;
        delete setInputDetails.imagesToReturn[item.id][index]
        this.forceUpdate();
    }

    _renderImageButtons = (mainItem) => ({ item, index }) => {
        return (
            _.isEmpty(item) ?
                <TouchableOpacity onPress={() => this._selectImages(mainItem, item, index)}
                    style={{
                        backgroundColor: "#FFD45317", borderRadius: 5, borderStyle: "dashed", borderWidth: 1, borderColor: Color.colorPrimaryMP,
                        paddingVertical: 10, paddingHorizontal: 15, justifyContent: "center", alignItems: "center", marginTop: 10
                    }}>
                    {/* <Image source={{ uri: item }} style={{ width: 15, height: 15 }} /> */}
                    <Icon type='font-awesome' name="plus" color={Color.colorPrimaryMP} size={15} />
                    <Text style={{ marginTop: 5, textAlign: "center", color: Color.colorPrimaryMP, fontSize: 12 }}>{`Upload\nPhoto`}</Text>
                </TouchableOpacity>
                :
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                    <Image source={{ uri: item.uri }} style={{ borderRadius: 5, width: 70, height: 70 }} />
                    <Icon onPress={() => this.removeImg(mainItem, index)} type='font-awesome' name="times-circle" color={Color.bg} size={15} containerStyle={{ position: "absolute", right: 3, top: 3 }} />
                </View>
        )
    }

    _productOptions = (items) => ({ item, index }) => {
        return (
            <View key={`idx ${index}`} style={{ marginTop: 5 }}>
                <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>
                    {`${item}: ${items.variation[item]}, `}
                </Text>
            </View>
        )
    }

    _renderItems = ({ item, index }) => {
        const { marketplace: { setSelectedTransaction, setInputDetails, getReasonList } } = this.props;
        const price = Number(parseFloat(item.total_price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
        const productCreated = moment(setSelectedTransaction.items.CreatedAt).format('MMM DD')
        const expectedDelivery = moment(setSelectedTransaction.items.CreatedAt).add(item.delivery_days, 'days').format('DD')
        const Estimated = `${productCreated} - ${expectedDelivery}`;
        return (
            <View key={`prod_idx ${index}`} style={{ paddingVertical: 10, borderBottomColor: Colors.grey300, borderBottomWidth: .5, }}>
                <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                    <Image source={{ uri: item.coverImg }} style={{ width: "20%", height: 60 }} resizeMode='stretch' />
                    <View style={{ width: "75%", }}>
                        <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{item.prod_name}</Text>
                        <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`Qty: ${item.quantity}`}</Text>
                        <Text style={{ textAlign: "right", fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>{`₱ ${price}`}</Text>
                    </View>

                </View>
                { !_.isNull(item.variation) &&
                    <FlatList
                        data={Object.keys(item.variation)}
                        listKey={(index) => `idx ${index}`}
                        style={{ flexDirection: 'row' }}
                        renderItem={this._productOptions(item)} />}

                <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: "black" }}>Estimated Arrival: </Text>
                    <Text style={{ fontSize: 12, fontFamily: "Roboto-Light", color: Color.colorPrimaryMP }}>
                        {Estimated}
                    </Text>
                </View>


                <FlatList
                    data={setInputDetails.imagesToReturn[item.id]}
                    keyExtractor={(item, index) => `img_idx ${index}`}
                    style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}
                    renderItem={this._renderImageButtons(item)} />

            </View>
        )
    }

    render() {
        const { actions, login: { session }, marketplace: { setInputDetails, uploadImage } } = this.props;
        return (
            <FlatList
                data={Object.values(setInputDetails.selectedProductToReturn)}
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 15 }}
                keyExtractor={(item, index) => `prod_idx ${index}`}
                renderItem={this._renderItems} />
        );
    }
}

UploadPhoto.propTypes = {
    marketplace: PropTypes.object,
    navigation: PropTypes.object,
};

export default UploadPhoto;