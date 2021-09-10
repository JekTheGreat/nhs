/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import Button from "__src/components/Button";
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { CheckBox, Icon } from "react-native-elements";
import _ from "lodash";
import Resources from "__src/resources";
const { Color, Res } = Resources;
import { Colors } from 'react-native-paper';
var { height, width } = Dimensions.get('window');

class EmptyCartScreen extends PureComponent {


  componentWillUnmount() {
    const { actions, } = this.props;
    actions.setOnlineStoreScreen({});
  }

  _goMainScreen = () => {
    const { goToPage, navigation, actions, tabLabel, onlinestore: { setInputDetails, setOnlineStoreScreen } } = this.props;
    goToPage(0);
  }

  render() {
    return (
      <View style={{ marginHorizontal: 10, marginVertical: 10, backgroundColor: "white", height: "77%", justifyContent: "center", alignItems: "center" }}>
        <Image source={Res.get("shopping_bag")} resizeMode="contain" style={{ width: 150, height: 150 }} />
        <Text style={{ marginTop: 40, fontSize: 23, fontFamily: "Roboto", color: "black", fontWeight: "bold" }}>Your shopping cart is empty</Text>
        <Button onPress={() => this._goMainScreen()} style={{ marginTop: 50, justifyContent: "center", alignSelf: "center", width: 150 }}
          label="Go Shopping Now" />
      </View>
    );
  }
}

EmptyCartScreen.propTypes = {
  onlinestore: PropTypes.object,
  navigation: PropTypes.object,
};

export default EmptyCartScreen;