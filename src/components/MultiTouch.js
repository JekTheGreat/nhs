import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";

class MultiTouch extends React.PureComponent{

  onStartShouldSetResponder = (evt) => {
  	if (evt.nativeEvent.touches.length === 2){
  		return true;
  	}
    
  	return false;
  }

  onResponderRelease = () => {
  	this.props.onPress();
  }

  render(){
  	return (
  		<View onStartShouldSetResponder={this.onStartShouldSetResponder}
  			onResponderRelease={this.onResponderRelease} >
  			{this.props.children}
  		</View>
  	);
  }
}

MultiTouch.propTypes = {
	onPress: PropTypes.func,
	children: PropTypes.element,
};

MultiTouch.defaulProps = {
	onPress: () => null,
	children: PropTypes.element,
};


export default MultiTouch;
