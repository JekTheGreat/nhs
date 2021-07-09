/* eslint-disable */
import React, { PureComponent } from "react";
import {
	View,
	Text,
	Animated,
	TouchableOpacity,
	Easing,
	Image,
	I18nManager,
	PanResponder,
} from "react-native";

const styles = {
	button: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	containerButton: {
		flexDirection: "row",
		flex: 1,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	animated: {
		borderWidth: 0,
		position: "absolute",
	},
};
import Resources from "__src/resources";
const {Res, Color} = Resources;

export default class SwitchSelector extends PureComponent {
	constructor (props) {
		super(props);
		this.state = {
			selected: this.props.initial ? this.props.initial : 0,
		};
		this.animatedValue = new Animated.Value(
			this.props.initial ?
				I18nManager.isRTL ?
					-(this.props.initial / this.props.options.length) :
					this.props.initial / this.props.options.length :
				0
		);
	}

	componentDidMount () {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: this.shouldSetResponder,
			onMoveShouldSetPanResponder: this.shouldSetResponder,
			onPanResponderRelease: this.responderEnd,
			onPanResponderTerminate: this.responderEnd,
		});
	}

	// static getDerivedStateFromProps(props, state){
	// 	this.toggleItem(props.value);
	// }

  shouldSetResponder = (evt, gestureState) => {
  	return (
  		evt.nativeEvent.touches.length === 1 &&
      !(Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5)
  	);
  };

  responderEnd = (evt, gestureState) => {
  	const swipeDirection = this._getSwipeDirection(gestureState);

  	if (
  		swipeDirection === "RIGHT" &&
      this.state.selected < this.props.options.length - 1
  	) {
  		this.toggleItem(this.state.selected + 1);
  	} else if (swipeDirection === "LEFT" && this.state.selected > 0) {
  		this.toggleItem(this.state.selected - 1);
  	}
  };

  _getSwipeDirection (gestureState) {
  	const { dx, dy, vx } = gestureState;
  	// 0.1 velocity

  	if (Math.abs(vx) > 0.1 && Math.abs(dy) < 80) {
  		return dx > 0 ? "RIGHT" : "LEFT";
  	}
  	
  	return null;
  }

  getBgColor () {
  	const { selected } = this.state;
  	const { options, buttonColor } = this.props;

  	
  	return options[selected].activeColor || buttonColor;
  }

  animate = (value, last) => {
  	this.animatedValue.setValue(last);
  	Animated.timing(this.animatedValue, {
  		toValue: value,
  		duration: this.props.animationDuration,
  		easing: Easing.cubic,
  		useNativeDriver: true,
  	}).start();
  };

  toggleItem = (index) => {
  	const { options, returnObject, onPress } = this.props;

  	if (options.length <= 1) {
  		return;
  	}
  	this.animate(
  		I18nManager.isRTL ?
  			-(index / options.length) :
  			index / options.length,
  		I18nManager.isRTL ?
  			-(this.state.selected / options.length) :
  			this.state.selected / options.length
  	);
  	if (onPress) {
  		onPress(returnObject ? options[index] : options[index].value);
  	} else {
  		console.log("Call onPress with value: ", options[index].value);
  	}
  	this.setState({ selected: index });
  };

  render () {
  	const {
  		style,
  		textStyle,
  		selectedTextStyle,
  		imageStyle,
  		textColor,
  		selectedColor,
  		fontSize,
  		backgroundColor,
  		borderColor,
  		borderRadius,
  		hasPadding,
  		valuePadding,
  		height,
  		bold,
  	} = this.props;

  	const options = this.props.options.map((element, index) => (
  		<View
  			key={index}
  			style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
  			<TouchableOpacity
  				style={styles.button}
  				onPress={() => this.toggleItem(index)}>
  				{typeof element.customIcon === "function" ?
  					element.customIcon(this.state.selected == index) :
  					element.customIcon}
  				{element.imageIcon &&
            <Image
            	source={element.imageIcon}
            	style={[
            		{
            			height: 20,
                  width: 20,
                  backgroundColor: "red"
            			// tintColor: this.state.selected == index ?
            			// 	selectedColor :
            			// 	textColor,
            		},
            		imageStyle,
            	]}
            />}
  				<Text
  					style={[
  						{
  							fontSize,
  							fontWeight: bold ? "bold" : "normal",
  							textAlign: "center",
  							color: this.state.selected == index ? selectedColor : textColor,
  							backgroundColor: "transparent",
  						},
  						this.state.selected == index ? selectedTextStyle : textStyle,
  					]}>
  					{element.label}
  				</Text>
  			</TouchableOpacity>
  		</View>
    ));
    
    const options2 = (
  		<View
  			style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
  			<TouchableOpacity
					activeOpacity={0.7}
  				style={styles.button}
  				onPress={() => this.toggleItem(0)}>
            <Image
            	source={Res.get(this.state.selected === 0 ? "qr_scan_active" : "qr_scan_nonactive")}
            	style={[
            		{
            			height: 40,
                  width: 40,
            		},
            		imageStyle,
            	]}
            />

         
  			
  			</TouchableOpacity>
        <Text
  					style={[
  						{
                flex: 1,
                position: "absolute",
                bottom: -18,
                fontSize: 10,
                fontWeight: "bold",
								color: "white",
								fontFamily: "Roboto-Light",
  						},
  					]}>
  					QR Scan
  				</Text>
  		</View>
    );
    
    const options3 = (
  		<View
  			style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
  			<TouchableOpacity
					activeOpacity={0.7}
  				style={styles.button}
  				onPress={() => this.toggleItem(1)}>
            <Image
            	source={Res.get(this.state.selected === 1 ? "camera_active" : "camera_nonactive")}
            	style={[
            		{
            			height: 40,
                  width: 40,
            		},
            		imageStyle,
            	]}
            />
  			
  			</TouchableOpacity>
        <Text
  					style={[
  						{
                flex: 1,
                position: "absolute",
                bottom: -18,
                fontSize: 10,
                fontWeight: "bold",
								color: "white",
								fontFamily: "Roboto-Light",
  						},
  					]}>
  					Camera
  				</Text>
  		</View>
  	);

  	return (
  		<View style={[{ flexDirection: "row" }, style]}>
  			<View {...this._panResponder.panHandlers} style={{ flex: 1}}>
  				<View
  					style={{
  						borderRadius,
  						backgroundColor,
  						height,
  					}}
  					onLayout={(event) => {
  						const { width } = event.nativeEvent.layout;

  						this.setState({
  							sliderWidth: width - (hasPadding ? valuePadding : 0),
  						});
  					}}>
  					<View
  						style={{
  							flex: 1,
  							flexDirection: "row",
  							borderColor: borderColor || "#c9c9c9",
  							borderRadius,
  							borderWidth: hasPadding ? 1 : 0,
  						}}>
  						{!!this.state.sliderWidth &&
                <Animated.View
                	style={[
                		{
                			height: hasPadding ? height - 4 : height,
                			backgroundColor: this.getBgColor(),
                			width: this.state.sliderWidth /
                        this.props.options.length -
                        (hasPadding ? valuePadding : 0),
                			transform: [
                				{
                					translateX: this.animatedValue.interpolate({
                						inputRange: [0, 1],
                						outputRange: [
                							hasPadding ? valuePadding : 0,
                							this.state.sliderWidth -
                              (hasPadding ? valuePadding : 0),
                						],
                					}),
                				},
                			],
                			borderRadius,
                			marginTop:  0,
                		},
                		styles.animated,
                	]}
                />}
              {options2}
              {options3}
  					</View>
  				</View>
  			</View>
  		</View>
  	);
  }
}

SwitchSelector.defaultProps = {
	style: {},
	textStyle: {},
	selectedTextStyle: {},
	imageStyle: {},
	textColor: "#000000",
	selectedColor: "#FFFFFF",
	fontSize: 14,
	backgroundColor: "#FFFFFF",
	borderColor: "#C9C9C9",
	borderRadius: 50,
	hasPadding: false,
	valuePadding: 1,
	height: 30,
	bold: false,
	buttonColor: "#BCD635",
	returnObject: false,
	animationDuration: 100,
};
