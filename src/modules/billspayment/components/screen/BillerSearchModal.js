import React from "react";
import {View, Text, Modal, StyleSheet, Dimensions, FlatList} from "react-native";
import Resources from "__src/resources";
const { Color, Res } = Resources;
const SCREEN_WIDTH = Dimensions.get('window').width;

class BillerSearchModal extends React.PureComponent{

  renderFlatlistBillers = ({item, index}) => {
    return (
      <View key={`${index}`}>
        <TouchableOpacity style={styles.width100} 
          onPress={() => this._selectItem(item, index)}>
          <Text style={styles.billerName}> {item.name} </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render(){
    return (
      <Modal 
        ref={"billerSearchModal"}
        style={styles.modalStyle}
        position="top"
        backdrop={false}
        animationDuration={0}
        backButtonClose={false}
        isOpen={this.state.isBillerModal} >
        {_.isEmpty(billersName) && _.isEmpty(newBiller)? this._emptyCategory() :
          <FlatList 
            scrollEnabled={true}
            keyExtractor={(item, index) => `${index}`}
            data={_.isEmpty(billersName)? newBiller.sort((a,b) => a.name.localeCompare(b.name)) || []
            : billersName.sort((a,b) => a.name.localeCompare(b.name)) || []}
            renderItem={this.renderFlatlistBillers} />}
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalStyle: {padding: 10, height: 200, borderWidth: .5, marginTop: 140, 
    width: SCREEN_WIDTH - 40, borderColor: Color.Standard },
  width100: {width:"100%"},
  billerName: {fontFamily: "Roboto-Light", color: Color.Standard2},
})

export default BillerSearchModal;