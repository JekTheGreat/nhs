/* eslint-disable */
import React, { PureComponent } from "react";
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Loading from "__src/components/Loading";
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

export default class MyPurchaseToReceive extends PureComponent {

    state = { isDisable: false }

    isDisable = (data) => {
        this.setState({ isDisable: data })
    }

    componentWillUnmount() {
        const { actions, marketplace: { setToReturnScreen, setInputDetails } } = this.props;
        const toDelete = _.merge({}, setInputDetails);
        let isCheck = _.merge({}, toDelete.selectedProductToReturn)
        let reasonToReturn = _.merge({}, toDelete.reasonsToReturn)
        let qtyToReturn = _.merge({}, toDelete.quantityToReturn)
        let imagesToReturn = _.merge({}, toDelete.imagesToReturn)
        isCheck = {}
        reasonToReturn = {}
        qtyToReturn = {}
        imagesToReturn = {}
        toDelete.selectedProductToReturn = isCheck;
        toDelete.reasonsToReturn = reasonToReturn;
        toDelete.quantityToReturn = qtyToReturn;
        toDelete.imagesToReturn = imagesToReturn;
        actions.setInputDetails(toDelete)
        actions.setToReturnScreen("chooseItem")
    }


    renderScreen = () => {
        const { marketplace: { setToReturnScreen } } = this.props;
        switch (setToReturnScreen) {
            case "uploadPhoto":
                return <UploadPhoto ref={(e) => this.UploadPhoto = e} {...this.props} />;
            case "chooseReason":
                return <ChooseReasons ref={(e) => this.ChooseReasons = e} {...this.props} />;
            case "chooseItem":
            default:
                return <ChooseItem ref={(e) => this.ChooseItem = e} isDisable={this.isDisable} {...this.props} />;
        }
    }

    position = () => {
        const { marketplace: { setToReturnScreen } } = this.props;
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
        const { marketplace: { setToReturnScreen } } = this.props;
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
        const { actions, navigation, marketplace: { setToReturnScreen, setInputDetails } } = this.props;
        switch (setToReturnScreen) {
            case "uploadPhoto":
                actions.setToReturnScreen("chooseReason")
                break;
            case "chooseReason":
                actions.setToReturnScreen("chooseItem")
                break;
            case "chooseItem":
                navigation.goBack();
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
                if (stepStatus === "current") {
                    labels[position] = "Choose Reason"
                    return <Icon type='font-awesome' name="bars" color={"white"} size={15} />;
                } else if (stepStatus === "finished") {
                    labels[position] = "Completed"
                    return <Icon type='font-awesome' name="check" color={"white"} size={15} />;
                } else {
                    return <Icon type='font-awesome' name="bars" color={Color.Standard} size={15} />;
                }
            case 0:
            default:
                if (stepStatus === "current") {
                    labels[position] = "Choose Item"
                    return <Icon type='font-awesome' name="shopping-bag" color={"white"} size={15} />;
                } else if (stepStatus === "finished") {
                    labels[position] = "Completed"
                    return <Icon type='font-awesome' name="check" color={"white"} size={15} />;
                } else {
                    return <Icon type='font-awesome' name="shopping-bag" color={Color.Standard} size={15} />;
                }
        }
    }

    render() {
        const { marketplace: { setToReturnScreen, transactionInProgress } } = this.props
        console.log("renderSTATE", this.state)
        return (
            <View style={{ borderRadius: 10, }}>
                <View style={{ backgroundColor: "#FFFAEC", paddingVertical: 15 }}>
                    <StepIndicator
                        stepCount={3}
                        labels={labels}
                        customStyles={customStyles}
                        renderStepIndicator={this.indicator}
                        currentPosition={this.position()}
                    />
                </View>

                {this.renderScreen()}

                <TouchableOpacity onPress={(!this.state.isDisable && !transactionInProgress) ? this.onNext : console.log("")}
                    activeOpacity={this.state.isDisable ? 1 : .5}
                    style={{ marginHorizontal: 15, marginVertical: 10, alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 3, paddingVertical: 5 }} >
                    {transactionInProgress ?
                        <Loading customStyle={{ height: 25 }} isLoading={transactionInProgress} size="small" color={"white"} /> :
                        <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>{setToReturnScreen === "uploadPhoto" ? "Submit" : "Next"}</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={!transactionInProgress && this.onBack}
                    style={{ marginHorizontal: 15, marginBottom: 10, alignItems: "center", backgroundColor: "white", borderWidth: 1, borderColor: Color.colorPrimaryMP, borderRadius: 3, paddingVertical: 5 }} >
                    {transactionInProgress ?
                        <Loading customStyle={{ height: 25 }} isLoading={transactionInProgress} size="small" color={Color.colorPrimaryMP} /> :
                        <Text style={{ textAlign: "center", fontSize: 12, color: Color.colorPrimaryMP }}>{setToReturnScreen === "chooseItem" ? "Cancel" : "Back"}</Text>
                    }
                </TouchableOpacity>

                <SafeAreaView style={{ flex: 1 }} />
            </View>
        );
    }
}