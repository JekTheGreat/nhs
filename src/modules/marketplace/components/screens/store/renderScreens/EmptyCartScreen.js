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

  _goMainScreen = () => {
    const { navigation } = this.props;
    navigation.navigate("MarketPlaceMain");
  }

  render() {
    return (
      <View style={{ backgroundColor: "white", height: "100%", justifyContent: "center", alignItems: "center" }}>
        <Image source={Res.get("shopping_bag")} resizeMode="contain" style={{ width: 150, height: 150 }} />
        <Text style={{ marginTop: 40, fontSize: 23, fontFamily: "Roboto", color: "black", fontWeight: "bold" }}>Your shopping cart is empty</Text>
        <Button onPress={() => this._goMainScreen()} style={{ marginTop: 50, justifyContent: "center", alignSelf: "center", width: 150 }}
          label="Go Shopping Now" />
      </View>
    );
  }
}


export default EmptyCartScreen;