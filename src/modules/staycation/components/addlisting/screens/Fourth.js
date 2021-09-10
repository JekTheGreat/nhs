/* eslint-disable */
import React, {Component} from "react";
import {View, Text, ScrollView, TouchableOpacity, Alert, Modal, FlatList} from "react-native";
import styles from "../../../styles.css";
import {Icon} from "react-native-elements";
import TxtInput from "__src/components/TxtInput";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import _ from "lodash";
const {Color} = Resources;

class FourtScreen extends Component{
    constructor(props){
		super(props);
		this.state = {
      isShowing: true,
      error:{},
      error1:{},
		};
  }

  onNext = () => {
    const {actions, staycation:{setInputDetails}} = this.props;
    const getInput = _.isEmpty(setInputDetails.fourth) ? 
    {streetNo: null, streetName: null, city:null, states:null, country:null, zipCode:null } : setInputDetails.fourth;
    const error={};
    
      if(_.isEmpty(getInput.streetNo)){
        error.streetNo = "Street No. is required!";
      }
      if(_.isEmpty(getInput.streetName)){
        error.streetName = "Street Name is required!";
      }
      if(_.isEmpty(getInput.city)){
        error.city = "City is required!";
      }
      if(_.isEmpty(getInput.states)){
        error.states = "States is required!";
      }
      if(_.isEmpty(getInput.country)){
        error.country = "Country is required!";
      }
      if(_.isEmpty(getInput.zipCode)){
        error.zipCode = "ZipCode is required!";
      }
      this.setState({error});

    if(_.isEmpty(error)){
      actions.setStaycationScreen("fifth");
    }
	}

  fetchData(description) {
    const {actions, staycation: {setInputDetails}} = this.props;
    const newInput = _.merge({}, setInputDetails);
    if(_.isEmpty(description)){
      this.setState({isShowing:false});
    }
    else{
      this.setState({isShowing:true});
    }
    newInput.desc = description;
    actions.setInputDetails(newInput);
    actions.fetchLoc(description);
  }

  _selectItem = async(parent, index) => {
    const {staycation: {setInputDetails}, actions} = this.props;
    const newInput = _.merge({}, setInputDetails);
    const error1={};
    const error={};
    const params = {};

    
    this.setState({isShowing:false});
    newInput.desc = parent.description;
    params.geometry = parent.geometry.location;

    await _.map(parent.address, item => {
      if(item.type === "street_number"){
        params.streetNo=item.name;
      }
      else if(item.type === "route"){
        params.streetName=item.name;
      }
      else if(item.type === "locality"){
        params.city=item.name;
      }
      else if(item.type === "administrative_area_level_1"){
        params.states=item.name;
      }
      else if(item.type === "country"){
        params.country=item.name;
      }
      else if(item.type === "postal_code"){
        params.zipCode=item.name;
      }
    });
    newInput.fourth = params;
    actions.setInputDetails(newInput);
    
    if(_.isUndefined(params.streetNo && params.streetName &&  params.city &&  params.states &&  params.country &&  
      params.zipCode))
        {   
          error1.desc = "ERROR!";
        }
      this.setState({error1});

    if(_.isEmpty(error))
      {
        this.setState({error:" "});
      }
  }

  _renderItem = ({item, index}) =>{
    return (
      <View key={`${index}`} style={{borderColor: Color.Standard}}>
      <TouchableOpacity onPress={() =>this._selectItem(item, index)}>
        <Text> {item.description} </Text>
      </TouchableOpacity>
    </View>
    );
  }

  _itemSeparator = () =>{
    return(
      <View style={{height: .5, width: '100%', backgroundColor: Color.Standard}}/>
    );
  }

  _renderFlatlist = () => {
    const { staycation: {getLoc}} = this.props;
    console.log("GETLOC", getLoc);
    return(
      <View style={styles.marT10}>
      <FlatList
        data={getLoc}
        ItemSeparatorComponent={this._itemSeparator}
        extraData={this.state}
        keyExtractor={(item, index) => `idx${index}`}
        renderItem={this._renderItem} />
    </View>
    );
  }

  errorMessage =() => {
			return (
				<View style={{flex:5, flexDirection: "row", height:100 ,marginTop: 10, borderWidth:.7, borderColor: Color.red, backgroundColor:"mistyrose"}}>
					<View style={{flex:1, marginTop:20}}>
						<Icon name='close-o' type='evilicon' color={Color.red} size={30} />
					</View>

					<View style={{flex:5, flexDirection:"column"}}>
						<Text style={{marginTop: 10, fontFamily: "Roboto-Light", fontWeight:"bold", fontSize: 13}}> 
            It looks like you entered inaccurate address
						</Text>
						<Text style={{marginTop:5, fontFamily: "Roboto-Light", fontSize: 13}}> 
						Make sure the details you've added are specific as possible. If everything is correct, let us know.
            Try adding a street or house number
						</Text>
					</View>
				</View>
			);
	}

	render(){
    const {isShowing, error, error1} = this.state;
    const {staycation: {setInputDetails}} = this.props;
    const getInput = _.isEmpty(setInputDetails.fourth) ? 
    {streetNo: null, streetName: null, city:null, states:null, country:null, zipCode:null } : setInputDetails.fourth;
    const getDesc = _.isEmpty(setInputDetails.desc) ? null: setInputDetails.desc;
  	return (
  		<ScrollView style={styles.padH20}>
  			<View style={styles.marT30}>
  				<Text style={styles.labelText}>Where's your place located?</Text>
					<Text style={{fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2, marginTop: 10}}> 
                    Guests will only get your exact address once they've booked a reservation.
  				</Text>
                  <Text style={{marginTop: 20,}}>
                  First, let's narrow things down</Text>
                  <Text style={{marginTop: 5, color:Color.goldenrod, fontSize: 12, fontWeight:"bold"}}>
                  {`Note: `}
                    <Text style={{color:Color.Standard2, fontSize: 12}}>
                    Address must have street number or house number
                    </Text>
                  </Text>

				  <View style={[styles.marT20, {flexDirection: "row", justifyContent: "space-between"}]}>
						<Text style={{fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard2, fontWeight: "bold"}}>
          		Address:
  					</Text>
  				</View>
                <View style={styles.marT10}>
                  <TxtInput
									style={{backgroundColor: Color.white}}
									style3={error1.desc? {borderColor: Color.red}:{borderColor: Color.Standard}}
									round
									placeholder="Search Full Address"
									returnKeyType="search"
                  compName={error1.desc ? "Error" : "Search"}
                  value= {getDesc}
                  onChangeText= {(description)=> this.fetchData(description)}
									/>
              </View>
                {isShowing? this._renderFlatlist():null}
                {error1.desc?this.errorMessage():null}
									<Text style={{marginTop: 20,}}>
									First, let's narrow things down</Text>
  			    </View>

				<View style={{flex: 1, flexDirection:"row", marginTop:20}}>
                    <View style={{flex: 1, marginRight:5}}>
                        <Text>
                        Street No.</Text>
                        <TxtInput
                        style={{backgroundColor: Color.white, marginTop:10}}
                        style3={{borderColor: Color.Standard}}
                        round
                        err={error.streetNo}
                        compName={error.streetNo ? "Error" : ""}
                        value= {getInput.streetNo}
                        onChangeText= {(streetNo)=> this.setState({streetNo})}
                        />
                    </View>
                    <View style={{flex: 1, marginLeft:5}}>
                        <Text>
                        Street Address</Text>
                        <TxtInput
                        style={{backgroundColor: Color.white, marginTop:10}}
                        style3={{borderColor: Color.Standard}}
                        round
                        err={error.streetName}
                        compName={error.streetName ? "Error" : ""}
                        value= {getInput.streetName}
                        onChangeText= {(streetName)=> this.setState({streetName})}
                        />
                    </View>
                </View>


                <View style={{flex: 1, flexDirection:"row", marginTop:20}}>
                    <View style={{flex: 1, marginRight:5}}>
                        <Text>
                        City</Text>
                        <TxtInput
                        style={{backgroundColor: Color.white, marginTop:10}}
                        style3={{borderColor: Color.Standard}}
                        round
                        err={error.city}
                        compName={error.city ? "Error" : ""}
                        value= {getInput.city}
                        onChangeText= {(city)=> this.setState({city})}
                        />
                    </View>
                    <View style={{flex: 1, marginLeft:5}}>
                        <Text>
                        State</Text>
                        <TxtInput
                        style={{backgroundColor: Color.white, marginTop:10}}
                        style3={{borderColor: Color.Standard}}
                        round
                        err={error.states}
                        compName={error.states ? "Error" : ""}
                        value={getInput.states}
                        onChangeText= {(states)=> this.setState({states})}
                        />
                    </View>
                </View>

				<View style={{flex: 1, flexDirection:"row", marginTop:20}}>
                    <View style={{flex: 1, marginRight:5}}>
                        <Text>
                        Country</Text>
                        <TxtInput
                        style={{backgroundColor: Color.white, marginTop:10}}
                        style3={{borderColor: Color.Standard}}
                        round
                        err={error.country}
                        compName={error.country ? "Error" : ""}
                        value= {getInput.country}
                        onChangeText= {(country)=> this.setState({country})}
                        />
                    </View>
                    <View style={{flex: 1, marginLeft:5}}>
                        <Text>
                        ZIP Code</Text>
                        <TxtInput
                        style={{backgroundColor: Color.white, marginTop:10}}
                        style3={{borderColor: Color.Standard}}
                        round
                        err={error.zipCode}
                        compName={error.zipCode ? "Error" : ""}
                        value={getInput.zipCode}
                        onChangeText= {(zipCode)=> this.setState({zipCode})}
                        />
                    </View>
                </View>
  		</ScrollView>
  	);
	}
}

FourtScreen.propTypes = {
staycation: PropTypes.object,
};

export default FourtScreen;
