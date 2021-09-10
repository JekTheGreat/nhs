/* eslint-disable */
import React, {Component} from "react";
import {View, Text, ScrollView, FlatList, TouchableOpacity} from "react-native";
import styles from "../../../styles.css";
import {CheckBox, Icon} from "react-native-elements";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import TxtInput from "__src/components/TxtInput";
import _ from "lodash";
const {Color} = Resources;

const ArrData = ["No", "Yes"];
class AA extends Component{
	constructor(props){
    super(props);
    this.array = [{
      newRules: "",
    },
    ],
		this.state = {
      selectedItem: {},
      error:{},
      text:"ADD",
      colorText: Color.white,
      arrayHolder: [],
		};
  }
  componentDidMount() {
		const {actions} = this.props;
	  actions.fetchRules();
  }
	onNext = () => {
		const {actions} = this.props;
    actions.setStaycationScreen("first");
	}

	checkItem = (item, index) => {
		// const selectedItem = {};
		// const value = !selectedItem[item];
		// if (value) {
  		// selectedItem[item] = true;
		// }
    // this.setState({selectedItem});
    
    // console.log("STATE: ", this.state.selectedItem);

    const {actions, staycation: {setInputDetails}}=this.props;
    const cbContainer = _.merge({}, setInputDetails);
    const params = _.merge({}, cbContainer.twelveth);
    const isChecked = {...params};
		const value = !isChecked[item];
		if (value) {
      isChecked[item] = true;
      }
    else{
      isChecked[item] = false;
      }

      cbContainer.twelveth=isChecked;
      actions.setInputDetails(cbContainer);
		this.setState({isChecked, error: {}});
      // console.log("INDEXMOTHERFUCKER: ", value);

      // console.log("STATE: ", {...params});
	}

	_renderItem = ({item, index}) => {
      const {staycation: {setInputDetails}} = this.props;
      const params = setInputDetails.twelveth;
      const selected = params[item]? true:false;
      // console.log("INDEX: ",item, index, params[item], selected);
		return (
    <CheckBox
          style={{marginTop:20}}
          containerStyle={styles.containerStyle}
          textStyle={styles.textStyle}
          title={item}
          checkedColor={Color.LightBlue}
          checked={selected}
          onPress={()=> this.checkItem(item)}
          />        
		);
      }
      _onDelete = (i) => {
            const array = [...this.array];
            _.pullAt(array, i);
            this.setState({
            arrayHolder: array
            })

            // console.log("DELEEETTTEEE: ", i);
      }

      _renderText = ({item, index}) => {

            return(
                  <View style={{flex:6, flexDirection:"row", marginTop:8}}>

                        {index===0? null:<View style={{flex:5, flexDirection:"row", justifyContent:"flex-start", }}>
                              <Text style={{textAlign:"center", fontFamily:"Roboto-Light", fontSize:13 , fontWeight:"bold"}}>
                              {_.isEmpty(item.newRules)? null: `${index}.`}
                              </Text>
                              <Text style={{textAlign:"center", fontFamily:"Roboto-Light", fontSize:13, marginLeft: 15}}>
                              {item.newRules}
                              </Text>
                        </View>}

                        {index===0? null:<TouchableOpacity  style={{flex:1, flexDirection:"row", justifyContent: "flex-end",}}
                         onPress={this._onDelete}>
                              <Icon name='trash-o' type='font-awesome' color={Color.red} size={15}/>
                              <Text style={{textAlign:"center", fontFamily:"Roboto-Light", fontSize:13, color: Color.red}}> Delete</Text>
                        </TouchableOpacity>}

                  </View>
            );
      }

    addRules = ({index}) => {
    const {actions, staycation: {setInputDetails}} = this.props;
    const inputRules = _.has(setInputDetails, "twelveth.inputRules")? setInputDetails.twelveth.inputRules: {};
		const newInput = _.merge({}, setInputDetails);
		const params = _.merge({}, newInput.twelveth);
    const count = params.counter;
    const error = {};

		if(_.isEmpty(inputRules)){
      error.rules = "Please input your rules!";
      this.setState({colorText: "#FF1B00"});
      }
      this.setState({error});
      if(_.isEmpty(error)){
        this.setState({colorText: Color.white});
        this.array.push({newRules : inputRules});
        this.setState({ arrayHolder: [...this.array]})
      }

      // console.log("INPUTTED RULES: ", index);
		// newInput.twelveth = params;
		// actions.setInputDetails(newInput);
      }

    _onChangeText = (value) => {
      const {actions, staycation: {setInputDetails}} = this.props;
      const newInput = _.merge({}, setInputDetails);
      const params = _.merge({}, newInput.twelveth);
      params.inputRules = value;
      newInput.twelveth = params;
      actions.setInputDetails(newInput);

      }

	render(){ 
            const {actions, staycation: {setInputDetails, getRules}} = this.props;
            const inputRules = _.has(setInputDetails, "twelveth.inputRules")? setInputDetails.twelveth.inputRules: {};
            const {error, colorText} = this.state;
            // console.log("RULESSS", getRules);
  	return (
  		<ScrollView style={styles.padH20}>
  			<View style={styles.marT30}>
  				<Text style={styles.labelText}>Set your house rules for your guests</Text>
					<Text style={{fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard, marginTop: 10}}> 
					Guest must agree to your house rules before they book.
  				</Text>

            <View style={{flex: 1, flexDirection:"row", marginTop:20}}>
              <View style={{flex: 1, marginRight:5}}>
                    <Text style={{fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard}}> 
                    {`Suitable for children\n(2-12 years)`}
                    </Text>
              </View>

              <View style={{flex: 1, marginLeft:5}}>
                    <FlatList
                        style={{alignSelf:"flex-end"}}
                        data={ArrData}
                        extraData={this.state}
                        keyExtractor={(item, index) => `idx${index}`}
                        renderItem={this._renderItem}
                        horizontal={true}
                    />
              </View>
            </View>

            <View style={{flex: 1, flexDirection:"row", marginTop:5}}>
              <View style={{flex: 1, marginRight:5}}>
                    <Text style={{fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard}}> 
                    {`Suitable for infants\n(Under 2 years)`}
                    </Text>
              </View>

              <View style={{flex: 1, marginLeft:5}}>
                    <FlatList
                        style={{alignSelf:"flex-end"}}
                        data={ArrData}
                        extraData={this.state}
                        keyExtractor={(item, index) => `idx${index}`}
                        renderItem={this._renderItem}
                        horizontal={true}
                    />
              </View>
            </View>

            <View style={{flex: 1, flexDirection:"row", marginTop:5}}>
              <View style={{flex: 1, marginRight:5}}>
                    <Text style={{fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard, marginTop:10}}> 
                    Suitable for pets
                    </Text>
              </View>

              <View style={{flex: 1, marginLeft:5}}>
                    <FlatList
                        style={{alignSelf:"flex-end"}}
                        data={ArrData}
                        extraData={this.state}
                        keyExtractor={(item, index) => `idx${index}`}
                        renderItem={this._renderItem}
                        horizontal={true}
                    />
              </View>
            </View>

            <View style={{flex: 1, flexDirection:"row", marginTop:5}}>
              <View style={{flex: 1, marginRight:5}}>
                    <Text style={{fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard, marginTop:10}}> 
                    Smoking allowed
                    </Text>
              </View>

              <View style={{flex: 1, marginLeft:5}}>
                    <FlatList
                        style={{alignSelf:"flex-end"}}
                        data={ArrData}
                        extraData={this.state}
                        keyExtractor={(item, index) => `idx${index}`}
                        renderItem={this._renderItem}
                        horizontal={true}
                    />
              </View>
            </View>

            <View style={{flex: 1, flexDirection:"row", marginTop:5}}>
              <View style={{flex: 1, marginRight:5}}>
                    <Text style={{fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard, marginTop:10}}> 
                    Events or parties allowed
                    </Text>
              </View>

              <View style={{flex: 1, marginLeft:5}}>
                    <FlatList
                        style={{alignSelf:"flex-end"}}
                        data={ArrData}
                        extraData={this.state}
                        keyExtractor={(item, index) => `idx${index}`}
                        renderItem={this._renderItem}
                        horizontal={true}
                    />
              </View>
            </View>
          <Text style={[styles.labelText2, {marginTop:30}]}>Additional rules</Text>

          <View style={{flex: 4, flexDirection:"row", marginTop:5}}>
              <View style={{flex: 3}}>
                  <TxtInput
                    style={{backgroundColor: Color.white, marginTop:10}}
                    style3={{borderColor: Color.Standard}}
                    round
                    err={this.state.error.rules}
                    compName={error.desc ? "Error" : ""}
                    value={inputRules}
                    onChangeText={this._onChangeText}
                    />
              </View>

              <View style={{flex: 1}}>
                  <TouchableOpacity activeOpacity={.7} style={{marginTop:10, width: 75, height: 38, borderRadius: 1, borderWidth: 0.7, backgroundColor: Color.LightBlue, shadowRadius: 0.7, shadowOpacity: 0.4,
                        borderColor: Color.Standard, alignItems: "center", justifyContent: "center", elevation: 1, shadowOffset: {width: 1, height: 1}}} 
                        onPress={(index) =>this.addRules(`id2${index}`)} >
                        <Text style={{color: colorText, fontSize: 14, fontFamily: "Roboto-Light"}}>+ {this.state.text}</Text>
                  </TouchableOpacity>
              </View>
            </View>
            
            <View>
                  <FlatList
                  data={this.state.arrayHolder}
                  ItemSeparatorComponent={this._itemSeparator}
                  extraData={this.state}
                  keyExtractor={(item, index) => `idx${index}`}
                  renderItem={this._renderText} />
            </View>
           </View>
  		</ScrollView>
  	);
	}
}

AA.propTypes = {
	staycation: PropTypes.object,
};

export default AA;
