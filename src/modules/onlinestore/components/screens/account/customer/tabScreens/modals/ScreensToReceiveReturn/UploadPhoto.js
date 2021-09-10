/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import ImagePicker from "react-native-image-picker";
import { Icon } from 'react-native-elements';
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;
let toDisplay = {};
let params = [];
class UploadPhoto extends PureComponent {

    state = {
        imagesArr: {},
    }

    onNext = () => {

    }

    _selectImages = (item) => {
        const { actions, onlinestore: { setInputDetails }, login: { session } } = this.props;
        // const { imagesArr } = this.state;
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
                console.log("success", response);
                if (_.isUndefined(toDisplay[item.id])) {
                    toDisplay[item.id] = [response.fileName]
                    params[item.id] = [{ type: "image/jpeg", uri: response.uri, name: response.fileName }]

                } else {
                    toDisplay[item.id].push(response.fileName)
                    params[item.id].push({ type: "image/jpeg", uri: response.uri, name: response.fileName })
                }
                console.log("QWEASDZXC:", toDisplay, params)
            }
        });
    }

    _renderItems = ({ item, index }) => {
        const { onlinestore: { setInputDetails, getReasonsToCancel } } = this.props;
        const datePurchased = moment(item.date_purchased).format('MMMM DD');
        console.log("_renderItems:", toDisplay, params)

        return (
            <View key={`${index}`} style={{ marginHorizontal: 20, marginBottom: 15, }}>
                <View style={{ marginVertical: 5, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            resizeMode='contain'
                            source={{ uri: item.coverImg }}
                            style={{ height: 50, width: 50, }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontWeight: "bold", fontFamily: 'Roboto-Light', fontSize: 13, }}> {item.prod_name} </Text>
                            <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2 }}>Date Purchased:
                             <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: Color.LightBlue }}> {datePurchased}</Text>
                            </Text>
                            <Text style={{ marginTop: 5, fontFamily: 'Roboto-Light', fontStyle: "italic", fontSize: 13 }}>₱ {Number(parseFloat(item.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })} </Text>
                        </View>
                    </View>
                    <Text style={{ fontFamily: 'Roboto-Light', fontWeight: "bold", fontSize: 13 }}>x{setInputDetails.quantityToReturn[item.id]} </Text>
                </View>
                <View style={{ backgroundColor: Color.bg, borderRadius: 5, borderStyle: "dashed", borderWidth: 1, borderColor: Color.Standard2, height: 35, width: "100%" }} >
                    <TouchableOpacity onPress={() => this._selectImages(item)} style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                        <Icon type='font-awesome' name="upload" color={Color.colorPrimary} size={20} containerStyle={{ paddingTop: 8 }} />
                        <Text style={{ paddingTop: 5, fontFamily: 'Roboto-Light', fontSize: 12 }}>Browse your gallery and upload photos.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { onSearch, selectedProduct, toSearch, onlinestore: { setInputDetails } } = this.props;
        let products = [];
        _.filter(Object.keys(setInputDetails.selectedProductToReturn), toComp => {
            _.filter(selectedProduct.items, (item) => {
                if (_.isEqual(item.id, Number(toComp))) {
                    products.push(item);
                }
            })
        })
        console.log("render:", toDisplay, params)
        return (
            <FlatList
                data={products}
                showsVerticalScrollIndicator={false}
                style={[products.length < 2 ? {} : { height: 265, marginTop: 5 }]}
                ItemSeparatorComponent={() => <View style={{ height: .5, backgroundColor: Color.Standard }} />}
                keyExtractor={(item, index) => { `${index}` }}
                renderItem={this._renderItems} />
        );
    }
}

UploadPhoto.propTypes = {
    onlinestore: PropTypes.object,
    navigation: PropTypes.object,
};

export default UploadPhoto;