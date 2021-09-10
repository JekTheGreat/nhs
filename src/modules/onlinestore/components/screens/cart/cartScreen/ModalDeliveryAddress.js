/* eslint-disable */
import React from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Modal, Dimensions } from "react-native";
import TxtInput from "__src/components/TxtInput";
import _ from "lodash";
import Dash from "react-native-dash";
import Resources from "__src/resources";
import { Icon } from "react-native-elements";
import { Colors } from "react-native-paper";
import Tab1 from './EmptyCartScreen';
import Tab2 from './CartItems';
import Test from './Test';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
const { Color } = Resources;
const { width, height } = Dimensions.get('window');

class ModalDeliveryAddress extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { isModalShowing, closeModal } = this.props;
        return (
            <Modal
                ref={"ModalDeliveryAddress"}
                visible={isModalShowing}
                transparent
                onRequestClose={closeModal}>
                <View onPress={closeModal} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    {/* <View style={{ width: "80%", backgroundColor: "white" }}> */}
                    <Test {...this.props} />
                    {/* </View> */}
                </View>
            </Modal>
        )
    }
}


export default ModalDeliveryAddress;