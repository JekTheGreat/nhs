/* eslint-disable */
import React, {Component, PureComponent} from "react";
import {View, Text, ScrollView, TouchableOpacity, FlatList, Image, Alert, Modal,} from "react-native";
import styles from "../../../styles.css";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import {Icon} from "react-native-elements";
import _ from "lodash";
import ImagePicker from "react-native-image-crop-picker";
const {Color} = Resources;

class EighthScreen extends PureComponent{
    constructor(props){
    super(props);
    this.state = {
      previewImageUrl: {},
      previewImageShow: false,
      photo:[],
    }
  }

  onNext = () => {
    const {actions} = this.props;
    actions.setStaycationScreen("ninth");
  }

  handleChoosePhoto = () =>{
    const {actions, staycation: {setInputDetails}} = this.props;
    const imageContainer = _.merge({}, setInputDetails);
    const params = _.merge({}, imageContainer.eigth);
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 10
    }).then(response =>{
      params.photo= response;
      console.log("photos", params.photo);
      imageContainer.eigth = params;
      actions.setInputDetails(imageContainer);
    });
  }

  handlePressPhoto = (type, value) => {
    const {actions, staycation: {setInputDetails}} = this.props;
    const imageContainer = _.merge({}, setInputDetails);
    const params = _.merge({}, imageContainer.eigth);
    if(type==="spress") {
    this.setState({ previewImageShow: true })
    params.previewImageUrl=value.sourceURL; 
    imageContainer.eigth = params;
    actions.setInputDetails(imageContainer);
    console.log("PREVIEW: ", params.previewImageUrl);
    }

    else if (type==="lpress"){
      Alert.alert(
        'Alert',
        'Are you sure you want to delete?',
        [
          {text: 'No', onPress: ()=>  console.log("No"), style: 'cancel'},
          {text: 'Yes', onPress: ()=> {this.onItemDeleted(value)}}
        ],
        {cancelable:true}
      );
      } 
  }

  onItemDeleted = (index) => {
    const data = _.filter(this.state.photo, (i) => i.path !== index.path);

    this.setState({photo:data})
  }

  _renderItem = ({item, index}) => {
    console.log("ITEM: ", item);
    return (
    <View style={{flex:1, flexDirection:"row", marginRight:5}}>
      <TouchableOpacity
       style={{flex:1, marginTop:5, height:150, width:"75%"}}
       onPress={() => this.handlePressPhoto("spress", item)}
       onLongPress={() => this.handlePressPhoto("lpress", item)}>
        <Image
            key={`idx${index}`}
            source={{uri: item.sourceURL}}
            style={{flex:1, marginTop:2,}}
          />
      </TouchableOpacity>
    </View>
    )
  }

  handleHideModal = () => {
    this.setState({ previewImageShow: false })
  }
  
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  render(){
    
    const {staycation: {setInputDetails}}= this.props;
    const photo = _.has(setInputDetails, "eigth.photo") ? setInputDetails.eigth.photo : {};
    const sourceUrl = _.has(setInputDetails, "eigth.previewImageUrl") ? setInputDetails.eigth.previewImageUrl : {};
    const {previewImageUrl} = this.state;
    return (

<ScrollView style={styles.padH20}>
  <View style={styles.marT30}>
    <Text style={styles.labelText}>Add photos to your listing</Text>
    <Text style={{ marginTop: 10, fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard2,}}> 
      Photos help guests imagine staying in your place. You can start with one and add more after you publish.
    </Text>
    <Text style={{fontFamily: "Roboto-Light", fontSize: 13, fontWeight: "bold", color: Color.red, marginTop: 10}}> 
    {`* Maximum of 10 photos only (Ex: High Resolution & Standard Size)`}
    </Text>
    <TouchableOpacity
      style={{flex:1, height:150, justifyContent:"center", alignContent:"center", alignItems: "center", borderWidth:.7, borderColor: Color.LightBlue , backgroundColor: "whitesmoke", marginTop:20, borderRadius:10}}
      onPress={this.handleChoosePhoto}
      >
      <View style={{flex:2,}}>
      <View style={{flex:1, justifyContent:"center", alignSelf:"center", }}>
      <Icon name='cloud-upload' type='font-awesome' color={Color.LightBlue} size={50}/>
      </View>

      {/* <View style={{flex:1,}}> */}
      <Text style={{justifyContent:"center", alignSelf:"center", fontSize:15}}>Click this area to upload</Text>
      <Text style={{marginTop:10, justifyContent:"center", alignSelf:"center", fontSize:10}}>Support for a single or bulk upload.</Text>
      <Text style={{justifyContent:"center", alignSelf:"center", fontSize:10, marginBottom:15}}>Strictly prohibit from uploading company data or other band files.</Text>
      {/* </View>  */}
      </View>
    </TouchableOpacity>
    <FlatList
      ItemSeparatorComponent={this.FlatListItemSeparator}
      data={photo}
      extraData={this.state}
      numColumns={2}
      keyExtractor={(item, index) => `idx${index}`}
      renderItem={this._renderItem}
      />
    <View style={{flex: 1, justifyContent:"center",}}>
      <Modal 
      animation="slide"
      visible={this.state.previewImageShow} 
      transparent={false}
      >
        <View style={{flex: 1, justifyContent:"center", backgroundColor:Color.black}}>
          <View style={{alignItems:"center", backgroundColor:Color.black}}>
            <TouchableOpacity 
            style={{justifyContent:"center", alignItems:"center", height:230, width: "97%"}}
            onPress={this.handleHideModal}>
              <Image 
              source={{uri: sourceUrl}}
              style={{justifyContent:"center", alignItems:"center", height:230, width: "97%"}}/>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  </View>
</ScrollView>

    );
  }
}

EighthScreen.propTypes = {
  staycation: PropTypes.object,
};

export default EighthScreen;



