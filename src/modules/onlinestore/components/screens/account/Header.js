import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Image, ImageBackground, } from 'react-native';
import { Icon, Avatar } from "react-native-elements";
import _ from "lodash";
import PropTypes from 'prop-types';
import Resources from "__src/resources";
const { Color, Res } = Resources;
var { width } = Dimensions.get('window');


export default class Header extends React.PureComponent {

    getResource = () => {
        const { login: { additionalDetails } } = this.props;

        if (!_.has(additionalDetails, "individual.firstName") || !_.has(additionalDetails, "type")) {
            return { photo: Res.get("user_icon"), firstName: "", lastName: "" };
        }

        const photo = additionalDetails.profilePhoto ?
            { uri: this.transformImage(additionalDetails.profilePhoto) } : Res.get("user_icon");
        const firstName = additionalDetails.individual.firstName.toUpperCase();
        const lastName = additionalDetails.individual.lastName.toUpperCase();
        const id = additionalDetails.metadata.accountNumber;

        return { photo, firstName, lastName, id };
    }

    getStatus = () => {
        const { login: { getKYCVerification } } = this.props;
        if (!_.has(getKYCVerification, "kyc1.status") || !_.has(getKYCVerification, "kyc2")) {
            return { color: Color.red, status: "Unverified" };
        }
        const color = getKYCVerification.kyc1.status === "accepted" ? Color.lightgreen : Color.red;
        const status = getKYCVerification.kyc1.status === "accepted" ? "Verified" : "Unverified";
        return { color, status };
    }

    level = () => {
        const { login: { additionalDetails } } = this.props;
        if (!_.has(additionalDetails, "levels") || _.isEmpty(additionalDetails.levels)) {
            return null;
        }
        if (additionalDetails.levels.length > 1) {
            return `- Level ${additionalDetails.levels[1]}`;
        }
        return `- Level ${additionalDetails.levels[0]}`;
    }

    render() {
        const { userSide, navigation, onlinestore: { getMyShop, setUserSide } } = this.props;
        const { photo, firstName, lastName, id } = this.getResource();
        const { color, status } = this.getStatus();
        const myShop = _.has(getMyShop, "name") ? getMyShop.name : {};
        const userNameRoleBase = setUserSide ? myShop : `${firstName} ${lastName}`;
        return (
            <View style={styles.container}>
                <Image style={styles.imagebackground} source={Res.get("background_dark")} resizeMode="stretch" />
                <View style={styles.body}>
                    <View style={styles.view3}>
                        <ImageBackground style={{ padding: 5 }} source={Res.get("profile_circle")}>
                            <Avatar
                                rounded
                                size={110}
                                source={photo} />
                        </ImageBackground>
                    </View>
                    <View style={styles.view1}>
                        <Text adjustsFontSizeToFit style={styles.name}>
                            {userNameRoleBase}
                        </Text>
                        <Text onPress={() => this.props.navigation.navigate("Processing")} adjustsFontSizeToFit style={styles.type}>
                            {userSide}
                        </Text>
                        <View style={styles.underline} />
                        <View style={styles.viewId}>
                            <Text adjustsFontSizeToFit numberOfLines={2} style={styles.idTxt}>{id}</Text>
                        </View>
                        <TouchableOpacity style={styles.status} onPress={() => navigation.navigate("Verification", { title: "Verification" })}>
                            <Text style={styles.statusTxt1}>Status</Text>
                            <Icon name='question-circle' type='font-awesome' color={Color.white} size={11} />
                            <Text style={[styles.statusTxt2, { color }]}>
                                {status} {this.level()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

Header.propTypes = {
    onlinestore: PropTypes.object,
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    container: { height: 150, width: width, flexShrink: 1, backgroundColor: Color.Header },
    body: { flexShrink: 1, width: "100%", flexDirection: "row", alignItems: "center", paddingVertical: 20 },
    view1: { flexDirection: "column", justifyContent: "flex-start", width: "60%" },
    view2: { position: "absolute", right: 10, bottom: 15 },
    view3: { width: "40%", alignItems: "center", justifyContent: "center" },
    qrImg: { width: 18, height: 18, alignSelf: "center" },
    qrTxt: { fontFamily: "Roboto-Light", fontSize: 9, color: Color.Standard, textAlign: "center" },
    imagebackground: { width: "100%", height: "100%", position: "absolute", },
    status: { flexDirection: "row", marginTop: 5 },
    statusTxt1: { fontFamily: "Roboto-Light", fontSize: 10, color: Color.white, marginRight: 2 },
    statusTxt2: { fontFamily: "Roboto-Light", fontSize: 10, marginLeft: 5 },
    idTxt: { fontFamily: "Roboto", fontSize: 20, color: Color.colorPrimary, fontWeight: "bold" },
    name: { fontFamily: "Roboto", fontSize: 14, color: Color.white },
    type: { fontFamily: "Roboto-Light", fontSize: 12, color: Color.colorPrimary },
    viewId: { flexDirection: "row", justifyContent: "space-between", paddingRight: 50 },
    underline: { backgroundColor: Color.white, height: 1, width: 50, alignSelf: "flex-start", marginVertical: 5 },
});