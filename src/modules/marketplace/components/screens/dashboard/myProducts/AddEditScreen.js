import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Alert, FlatList, RefreshControl, Dimensions, StyleSheet } from 'react-native';
import _ from 'lodash';
import Loading from "__src/components/Loading";
import Dropdown from "__src/components/Dropdown";
import { Tab, Tabs, ScrollableTab, Spinner } from 'native-base';
import { Icon, CheckBox, Tooltip } from "react-native-elements";
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import { Colors } from "react-native-paper";
import FirstScreen from './addedit/FirstScreen';
import SecondScreen from './addedit/SecondScreen';
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class AddEditScreen extends React.PureComponent {

    renderScreens = () => {
        const { navigation, marketplace: { setAddEditProductScreen } } = this.props;
        switch (setAddEditProductScreen) {
            case "second":
                return <SecondScreen ref={(e) => this.SecondScreen = e} {...this.props} />
            case "first":
            default:
                return <FirstScreen ref={(e) => this.FirstScreen = e} {...this.props} />
        }
    }

    onNext = () => {
        const { navigation, marketplace: { setAddEditProductScreen } } = this.props;
        switch (setAddEditProductScreen) {
            case "second":
                this.SecondScreen.onNext();
                break;
            case "first":
            default:
                this.FirstScreen.onNext();
                break;
        }
    }

    onBack = () => {
        const { actions, navigation, marketplace: { setAddEditProductScreen } } = this.props;
        switch (setAddEditProductScreen) {
            case "second":
                actions.setAddEditProductScreen("first");
                break;
            case "first":
            default:
                navigation.goBack();
                break;
        }
    }


    renderButtons = () => {
        const { marketplace: { setAddEditProductScreen } } = this.props;
        return (
            setAddEditProductScreen === "first" ?
                <View style={{ position: 'absolute', bottom: 0, width: width }}>
                    <TouchableOpacity onPress={this.onNext}
                        style={{ marginHorizontal: 15, marginBottom: 10, alignItems: "center", backgroundColor: Color.colorPrimaryMP, borderRadius: 3, paddingVertical: 5 }} >
                        <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onBack}
                        style={{ marginHorizontal: 15, marginBottom: 10, alignItems: "center", backgroundColor: "white", borderRadius: 3, borderWidth: 1, borderColor: Color.colorPrimaryMP, paddingVertical: 5 }} >
                        <Text style={{ textAlign: "center", fontSize: 12, color: Color.colorPrimaryMP }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={this.onBack}
                        style={{ justifyContent: "center", alignItems: "center", backgroundColor: "white", borderWidth: 1, borderColor: Color.colorPrimaryMP, height: 40, width: "50%" }} >
                        <Text style={{ textAlign: "center", fontSize: 12, color: Color.colorPrimaryMP }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onNext}
                        style={{ justifyContent: "center", alignItems: "center", backgroundColor: Color.colorPrimaryMP, height: 40, width: "50%" }} >
                        <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>Save and Publish</Text>
                    </TouchableOpacity>
                </View>
        )
    }

    render() {
        const { navigation, marketplace: { setSelectedTransaction, getReasonList, setAddEditProductScreen } } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                {this.renderScreens()}
                {this.renderButtons()}
            </View>
        )
    }

}
