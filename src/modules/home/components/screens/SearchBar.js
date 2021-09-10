/* eslint-disable */
import React from "react";
import {View, TouchableOpacity, TextInput, Image, Text, Animated} from "react-native";
import {Icon} from "react-native-elements";
// import * as Animatable from "react-native-animatable";
import styles from "../../styles.css";
import Resource from "__src/resources";
import PropTypes from "prop-types";
const {Res, Color} = Resource;

class SearchBar extends React.Component{
  // onPress={() => this.click("QRCode")}
  state = {
  	search: "",
  	searchBarFocused: false,
  };
  
  componentWillMount(){
  	this.adjustQR = new Animated.Value(1);
  	this.adjustCancel = new Animated.Value(0);
  }
  
  onFocus = () => {
  	Animated.parallel([
  		Animated.spring(this.adjustQR, {
  			toValue: 0,
  			duration: 300,
  		}),
  		Animated.spring(this.adjustCancel, {
  			toValue: 1,
  			duration: 300,
  		}),
  	]).start();

  	this.setState({ searchBarFocused: true }, () => {
  		this.props.onFocus(this.state.searchBarFocused);
  	});
  }

  onBlur = () => {

  	Animated.parallel([
  		Animated.spring(this.adjustQR, {
  			toValue: 1,
  			duration: 300,
  		}),
  		Animated.spring(this.adjustCancel, {
  			toValue: 0,
  			duration: 300,
  		}),
  	]).start();

  	this.setState({ searchBarFocused: false }, () => {
  		this.props.onFocus(this.state.searchBarFocused);
  	});
  }
  
  render(){
		const {onPress} = this.props;
  	const {searchBarFocused} = this.state;
  	const style = searchBarFocused ? {width: 100} : null;
  	const zindex = searchBarFocused ? {zIndex: 100} : null;
  	const animatedQR = {
  		transform: [{ scale: this.adjustQR}],
  	};
    
  	// const animatedCancel = {
  	// 	transform: [{ scale: this.adjustCancel}],
  	// };
    
  	// console.log("TEST", this.adjustCancel, this.adjustQR);

  	return (
  		<View >
  			<View style={[styles.viewSearch, zindex]}>
  				<View style={styles.flexGrow1}>
  					<View accessible style={[styles.views_bi3]}>
  						<TextInput
  							autoCorrect={false}
  							autoCapitalize="none"
  							// onBlur={this.onBlur}
  							// onFocus={this.onFocus}
  							placeholder={"Enter keywords to search..."}
  							style={[styles.textfields]}
  							value={""} />
  						<Icon size={18} name="search" color={Color.Standard2}/>
  					</View>
  				</View>

					<TouchableOpacity activeOpacity={0.7} onPress={onPress}>
  						<Image  style={[styles.qrImg]} source={Res.get("qr_regcode")} resizeMode={"contain"} resizeMethod={"resize"}/>
					</TouchableOpacity>

  				{/* {this.adjustQR._value === 0 ? <Animated.Text style={[{color: "red"}, animatedCancel]}>Cancel</Animated.Text> :
  					<TouchableOpacity activeOpacity={0.7} onPress={onPress}>
  						<Animated.Image  style={[styles.qrImg, animatedQR]} source={Res.get("qr_regcode")} resizeMode={"contain"} resizeMethod={"resize"}/>
  					</TouchableOpacity>} */}
            
  				{/* {this.adjustCancel._value === 0 ? null :
  					} */}
  				
  			</View>
  		</View>

  	);
  }
}

SearchBar.propTypes = {
	onFocus: PropTypes.func,
};

SearchBar.defaultProps = {
	onFocus: null,
};

export default SearchBar;
