/* eslint-disable */
import React, { PureComponent } from 'react';
import { ScrollView, View, Text, Modal, Dimensions } from 'react-native';
import { Colors } from 'react-native-paper';
import TxtInput from "__src/components/TxtInput";
import Resources from "__src/resources";
import _ from 'lodash';

var { height, width } = Dimensions.get('window');
const { Color, Res } = Resources;

class SearchScreen extends PureComponent {
  state = {
    error: ""
  }

  _searchProduct = (value) => {
    const { actions, onlinestore: { setInputDetails } } = this.props;
    let newInput = _.merge({}, setInputDetails);
    newInput.searchBy = value;
    actions.setInputDetails(newInput);
  }

  _onSearch = () => {
    const { actions, onlinestore: { setInputDetails }, login: { session } } = this.props;
    let inputDetails = _.merge({}, setInputDetails);
    let param = {};
    if (_.isEmpty(setInputDetails.searchBy)) {
      this.setState({ error: "Please enter keyword to search" })
    } else {
      inputDetails.isFilterBySearch = true;
      param.search = setInputDetails.searchBy;
      actions.searchProduct(param, session);
      actions.setInputDetails(inputDetails);
      actions.setOnlineStoreScreen("selectedCategory");
    }
  }

  render() {
    const { onlinestore: { setInputDetails } } = this.props;
    const search = _.has(setInputDetails, "searchBy") ? setInputDetails.searchBy : "";
    console.log("state", this.state)
    return (
      <ScrollView style={{ backgroundColor: Color.bg }}>
        <View style={{
          flex: 1, flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center",
          backgroundColor: "white", padding: 20, shadowOffset: { width: 1, height: 1, },
          shadowColor: Colors.grey400, shadowOpacity: 1,
        }}>
          <TxtInput
            style={{
              width: width - 30, backgroundColor: Colors.white, shadowOffset: { width: 1, height: 1, },
              shadowColor: Colors.grey300, shadowOpacity: 1, borderRadius: 10
            }}
            style3={{ borderColor: "#F6C933", borderRadius: 10 }}
            round
            err={this.state.error || ""}
            onChangeText={(value) => this._searchProduct(value)}
            placeholder="Enter keywords to search"
            returnKeyType="search"
            compName={"Search2"}
            onSearch={() => this._onSearch()}
            value={search} />
        </View>
      </ScrollView>
    );
  }
}

export default SearchScreen;