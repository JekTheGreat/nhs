import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import Button from "__src/components/Button";
import _ from 'lodash';
import ModalTermsCondition from './ModalTermsCondition'
import { Icon, CheckBox } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
var { height, width } = Dimensions.get('window');


export default class TermsCondition extends React.PureComponent {

    state = {
        isTermsShowing: false
    }

    _openTermsAndCondition = () => {
        this.setState({ isTermsShowing: true });
    }

    closeModal = () => {
        this.setState({ isTermsShowing: false });
    }

    render() {
        const { onCheck, isCheck, agreeInTermsModal } = this.props;
        return (
            <View style={{ paddingHorizontal: 15, paddingVertical: 15, borderWidth: 1, borderColor: Colors.grey200 }}>
                <Text style={{ marginBottom: 5, color: Color.Standard2, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 16 }}>Terms and Condition</Text>
                <View style={{ width: "95%", flexDirection: "row", alignItems: "center" }}>
                    <CheckBox
                        containerStyle={{ paddingHorizontal: 0, borderColor: "transparent", backgroundColor: "transparent" }}
                        checkedColor={Color.colorPrimaryMP}
                        checked={isCheck}
                        onPress={onCheck} />
                    <Text style={{ fontFamily: "Roboto-Light", fontSize: 14, }}> {`I agree with the `}
                        <Text onPress={() => this._openTermsAndCondition()}
                            style={{ color: Color.LightBlue, fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 14, }}>
                            Terms and Conditions and Cancellation Policy</Text>
                        {` that I have read.`}
                    </Text>
                </View>
                <ModalTermsCondition agreeInTermsModal={agreeInTermsModal} closeModal={this.closeModal} isTermsShowing={this.state.isTermsShowing} />
            </View>
        )
    }
}