import React from 'react';
import { ScrollView, TouchableWithoutFeedback, View, Text, Image, Modal, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import _ from 'lodash';
import { Colors } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import moment from 'moment';

export default class MapsModal extends React.PureComponent {

    render() {
        const { openMap, closeMap } = this.props;
        return (
            <Modal
                visible={openMap}
                transparent
                onRequestClose={closeMap}>
                <TouchableWithoutFeedback onPress={closeMap}>
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "baseline", backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <TouchableWithoutFeedback>
                            <View style={{
                                padding: 10, borderTopEndRadius: 20, borderTopStartRadius: 20,
                                width: "100%", height: "90%", backgroundColor: "white"
                            }}>
                                <Text style={{ marginTop: 10, fontSize: 16, }}>Select a location of appointment.</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        )
    }
}