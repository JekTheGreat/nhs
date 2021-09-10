import React from 'react';
import { Modal, View, Text, Image, FlatList } from 'react-native';
import _ from 'lodash';
import Button from "__src/components/Button";
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;


export default class ModalTransactionSuccess extends React.PureComponent {

    _renderItemList = ({ item, index }) => {
        const bground = index % 2 === 0 ? { borderColor: Colors.red100, backgroundColor: "seashell" } : { borderColor: "yellow", backgroundColor: "oldlace" };
        return (
            <View key={index} style={[bground, { marginBottom: 10, padding: 10, marginHorizontal: 10, borderRadius: 10, borderWidth: 1 }]} >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>
                        Product Name:
                    </Text>
                    <Text style={{ color: Color.Standard2, fontStyle: "italic", fontFamily: "Roboto-Light", fontSize: 13 }}>
                        {item.product}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>
                        Transaction No:
                    </Text>
                    <Text style={{ color: Color.Standard2, fontStyle: "italic", fontFamily: "Roboto-Light", fontSize: 13 }}>
                        {item.transNoCore}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold" }}>
                        Tracking No:
                    </Text>
                    <Text style={{ color: Color.Standard2, fontStyle: "italic", fontFamily: "Roboto-Light", fontSize: 13 }}>
                        {item.trackingNo}
                    </Text>
                </View>

            </View>
        )

    }

    _startAgain = () => {
        const { goToPage, closeTransactionCompleteModal, actions, navigation, login: { session }, onlinestore: { setInputDetails } } = this.props;
        actions.fetchCartList(session.token);
        actions.setOnlineStoreScreen('main');
        // navigation.navigate('Online Store');
        goToPage(0);
        actions.reset_data();
        closeTransactionCompleteModal();
    }

    render() {
        const { isTransactionCompleteModal, closeTransactionCompleteModal, onlinestore: { buyNowResponse } } = this.props;
        let ArrData = [];
        _.map(buyNowResponse.data, (transNo, index) => {
            _.filter(buyNowResponse.item, (item, i) => {
                let obj = {};
                obj.transNoCore = transNo.core;
                obj.product = item.prod_name;
                obj.trackingNo = item.trackingno;
                ArrData.push(obj)
            })
        })
        console.log("ARRDATA", ArrData)
        return (
            <Modal
                ref={"ModalTransactionSuccess"}
                visible={isTransactionCompleteModal}
                transparent
                onRequestClose={closeTransactionCompleteModal}>
                <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
                    <Image
                        style={{ height: "50%", width: "100%" }}
                        resizeMode='stretch'
                        source={Res.get("transaction_success")} />

                    <Text style={{ marginVertical: 10, alignSelf: "center", fontFamily: "Roboto-Light", fontSize: 32, color: Color.colorPrimary, fontWeight: "bold" }}>
                        Transaction Complete
                        </Text>

                    <FlatList
                        style={{ marginBottom: 10, }}
                        data={ArrData}
                        keyExtractor={index => { index }}
                        renderItem={this._renderItemList} />

                    <Button
                        onPress={() => this._startAgain()}
                        style={{ bottom: 10, marginTop: 10, justifyContent: "center", alignSelf: "center", width: "60%" }}
                        label="Continue" />
                </View>
            </Modal>
        )
    }

}