import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Image, ImageBackground, } from 'react-native';
import { Icon, Avatar } from "react-native-elements";
import LinearGradient from 'react-native-linear-gradient';
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

    render() {
        const { userRole, marketplace: { getMyShop, setUserSide } } = this.props;
        const { photo, firstName, lastName, id } = this.getResource();
        const myShop = _.has(getMyShop, "name") ? getMyShop.name : {};
        const userNameRoleBase = setUserSide ? myShop : `${firstName} ${lastName}`;
        return (
            <LinearGradient colors={["#414141", "#2F2F2F", "#141414"]} style={styles.body} >
                <View style={styles.view3}>
                    <ImageBackground style={{ padding: 5 }} source={Res.get("profile_circle")}>
                        <Avatar
                            rounded
                            size={70}
                            source={photo} />
                    </ImageBackground>
                </View>
                <View style={styles.view1}>
                    <Text adjustsFontSizeToFit style={styles.name}>
                        {userNameRoleBase}
                    </Text>
                    <Text onPress={() => this.props.navigation.navigate("Processing")} adjustsFontSizeToFit style={styles.type}>
                        {userRole}
                    </Text>
                </View>
            </LinearGradient>
        )
    }
}

Header.propTypes = {
    marketplace: PropTypes.object,
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    body: { width: "100%", flexDirection: "row", alignItems: "center", paddingBottom: 20 },
    view1: { flexDirection: "column", justifyContent: "flex-start", width: "60%", color: "white" },
    view3: { width: "30%", alignItems: "center", justifyContent: "center" },
    name: { fontFamily: "Roboto", fontSize: 16, color: Color.white },
    type: { fontFamily: "Roboto-Light", fontSize: 14, color: Color.colorPrimaryMP },
});