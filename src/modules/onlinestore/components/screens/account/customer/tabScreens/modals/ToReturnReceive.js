/* eslint-disable */
import React, { PureComponent } from "react";
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Button from "__src/components/Button";
import StepIndicator from "react-native-step-indicator";
import _ from 'lodash';
import { Icon } from "react-native-elements";
import ChooseItem from './ScreensToReceiveReturn/ChooseItem';
import ChooseReasons from './ScreensToReceiveReturn/ChooseReasons';
import UploadPhoto from './ScreensToReceiveReturn/UploadPhoto';
import { Colors } from 'react-native-paper';
import Resources from "__src/resources";
const { Color, Res } = Resources;
const labels = ["Choose Item", "Choose Reason", "Upload Photo"];
const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 35,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: Color.colorPrimary,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: Color.colorPrimary,
    stepStrokeUnFinishedColor: '#AFAFAF',
    separatorFinishedColor: Color.colorPrimary,
    separatorUnFinishedColor: '#AFAFAF',
    stepIndicatorFinishedColor: Color.colorPrimary,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: Color.colorPrimary,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: Color.colorPrimary,
    stepIndicatorLabelFinishedColor: Color.colorPrimary,
    stepIndicatorLabelUnFinishedColor: '#AFAFAF',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: Color.colorPrimary
}

export default class ToReturnReceive extends PureComponent {


    renderScreen = () => {
        const { onlinestore: { setToReturnScreen } } = this.props;
        switch (setToReturnScreen) {
            case "uploadPhoto":
                return <UploadPhoto ref={(e) => this.UploadPhoto = e} {...this.props} />;
            case "chooseReason":
                return <ChooseReasons ref={(e) => this.ChooseReasons = e} {...this.props} />;
            case "chooseItem":
            default:
                return <ChooseItem ref={(e) => this.ChooseItem = e} {...this.props} />;
        }
    }

    position = () => {
        const { onlinestore: { setToReturnScreen } } = this.props;
        switch (setToReturnScreen) {
            case "uploadPhoto":
                return 2;
            case "chooseReason":
                return 1;
            case "chooseItem":
            default:
                return 0;
        }
    }

    onNext = () => {
        const { onlinestore: { setToReturnScreen } } = this.props;
        switch (setToReturnScreen) {
            case "uploadPhoto":
                this.UploadPhoto.onNext();
                break;
            case "chooseReason":
                this.ChooseReasons.onNext();
                break;
            case "chooseItem":
            default:
                this.ChooseItem.onNext();
                break;
        }
    }

    onBack = () => {
        const { actions, closeModal, onlinestore: { setToReturnScreen, setInputDetails } } = this.props;
        switch (setToReturnScreen) {
            case "uploadPhoto":
                actions.setToReturnScreen("chooseReason");
                break;
            case "chooseReason":
                const toDeleteReason = _.merge({}, setInputDetails);
                let reasonToReturn = _.merge({}, toDeleteReason.reasonsToReturn)
                let qtyToReturn = _.merge({}, toDeleteReason.quantityToReturn)
                reasonToReturn = {}
                qtyToReturn = {}
                toDeleteReason.reasonsToReturn = reasonToReturn;
                toDeleteReason.quantityToReturn = qtyToReturn;
                actions.setInputDetails(toDeleteReason);
                actions.setToReturnScreen("chooseItem");
                break;
            case "chooseItem":
                const toDelete = _.merge({}, setInputDetails);
                let isCheck = _.merge({}, toDelete.selectedProductToReturn)
                isCheck = {}
                toDelete.selectedProductToReturn = isCheck;
                actions.setInputDetails(toDelete)
                closeModal();
                break;
        }
    }

    indicator = ({ position, stepStatus }) => {
        switch (position) {
            case 2:
                if (stepStatus === "finished" || stepStatus === "current") {
                    return <Icon type='font-awesome' name="upload" color={"white"} size={15} />;
                } else {
                    return <Icon type='font-awesome' name="upload" color={Color.Standard} size={15} />;
                }
            case 1:
                if (stepStatus === "finished" || stepStatus === "current") {
                    return <Icon type='font-awesome' name="bars" color={"white"} size={15} />;
                } else {
                    return <Icon type='font-awesome' name="bars" color={Color.Standard} size={15} />;
                }
            case 0:
            default:
                if (stepStatus === "finished" || stepStatus === "current") {
                    return <Icon type='font-awesome' name="shopping-bag" color={"white"} size={15} />;
                } else {
                    return <Icon type='font-awesome' name="shopping-bag" color={Color.Standard} size={15} />;
                }
        }
    }

    render() {
        const { selectedProduct, closeModal, onlinestore: { setToReturnScreen } } = this.props
        return (
            <View style={{ borderRadius: 10, }}>
                <View style={{ backgroundColor: "#FFFAEC", paddingVertical: 5 }}>
                    <StepIndicator
                        stepCount={3}
                        labels={labels}
                        customStyles={customStyles}
                        renderStepIndicator={this.indicator}
                        currentPosition={this.position()}
                    />
                </View>
                {this.renderScreen()}
                <View style={{
                    flexDirection: "row", justifyContent: "center", marginTop: 10, alignItems: "center",
                    bottom: 0, alignSelf: "center",
                }}>
                    <Button onPress={this.onBack}
                        style={{
                            width: "50%", borderColor: Color.colorPrimaryDark, borderWidth: 0.5, borderTopStartRadius: 0,
                            borderTopEndRadius: 0, backgroundColor: Colors.yellow600, borderBottomStartRadius: 7, borderBottomEndRadius: 0
                        }}
                        labelStyle={{ color: "white" }} label={setToReturnScreen === "chooseItem" ? "Cancel" : "Back"} />
                    <Button onPress={this.onNext} style={{
                        width: "50%", borderTopStartRadius: 0,
                        borderTopEndRadius: 0, borderBottomStartRadius: 0, borderBottomEndRadius: 7
                    }}
                        label={setToReturnScreen === "uploadPhoto" ? "Submit" : "Next"} />
                </View>
                <SafeAreaView style={{ flex: 1 }} />
            </View>
        );
    }
}