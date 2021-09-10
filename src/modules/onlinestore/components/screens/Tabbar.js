/* eslint-disable */
import * as React from "react";
import { Text, Image,
	SafeAreaView, StyleSheet, Dimensions, View, Animated
} from "react-native";
import { connect } from "react-redux";
import * as shape from "d3-shape";
import Svg, {Path} from "react-native-svg";
import StaticTabbar, {height} from "./StaticTabbar";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Resources from "__src/resources";
import Icon from "react-native-elements";
import _ from 'lodash';
import REAnimated from "react-native-reanimated";
import * as Animatable from 'react-native-animatable';
import {HeaderBackButton} from "react-navigation-stack";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { clamp, onGestureEvent, timing, withSpring } from "react-native-redash";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../../actions";
const { Color, Res } = Resources;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const { width, height: DHeight } = Dimensions.get("window");
const tabWidth = width / 3;
const backgroundColor = "white";

const getPath = () => {
	const left = shape.line().x((d) => d.x).y((d) => d.y)([
		{ x: 0, y: 0 },
		{ x: width, y: 0 },
	]);
	const tab = shape.line().x((d) => d.x).y((d) => d.y).curve(shape.curveBasis)([
		{ x: width, y: 0 },
		{ x: width - 20, y: 0 },
		{ x: width + 10, y: 0 },
		{ x: width + 15, y: height / 1.37 },

		{ x: width + tabWidth - 15, y: height / 1.37 },
		{ x: width + tabWidth - 10, y: 0 },
		{ x: width + tabWidth + 20, y: 0 },
		{ x: width + tabWidth, y: 0 },
	]);
	const right = shape.line().x((d) => d.x).y((d) => d.y)([
		{ x: width, y: 0 },
		{ x: width * 2, y: 0 },
		{ x: width * 2, y: height },
		{ x: 0, y: height },
		{ x: 0, y: 0 },
	]);
	
	return `${left} ${tab} ${right}`;
};
const d = getPath();

const TABBAR_HEIGHT = getBottomSpace() + 20;
const MINIMIZED_PLAYER_HEIGHT = 42;
const SNAP_TOP = 0;
const SNAP_BOTTOM = DHeight - TABBAR_HEIGHT - MINIMIZED_PLAYER_HEIGHT;

const {
  Clock,
  Value,
  cond,
  useCode,
  set,
  block,
  not,
  clockRunning,
  interpolate,
  diffClamp,
  Extrapolate
} = REAnimated;

const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1
};

class Tabbar extends React.PureComponent {
	
	value = new Animated.Value(0);
	translationY = new Value(0);
	
  componentDidUpdate(prevProps){
		const {actions, navigation, onlinestore} = this.props;
		const prevIndex = prevProps.navigation.state.index;
		const currentIndex = navigation.state.index;
		
		if(!_.isEqual(prevProps.navigation.state.routes[prevIndex].routeName, navigation.state.routes[currentIndex].routeName)){
    const newInput = _.merge({}, onlinestore.setInputDetails);
		newInput.route = navigation.state.routes[currentIndex].routeName;
		console.log("OSSID: ", newInput);
		actions.setInputDetails(newInput);
		}
	}

  render() {
		const { value, translationY} = this;
  	const translateX = value.interpolate({
  		inputRange: [0, width],
  		outputRange: [-width, 0],
  		extrapolate: "clamp",
		});

		const velocityY = new Value(0);
		const offset = new Value(SNAP_TOP);

  	const state = new Value(State.UNDETERMINED);

		const translateBottomTab = interpolate(translationY, {
			inputRange: [SNAP_TOP, 50],
			outputRange: [50, 0],
			extrapolate: Extrapolate.CLAMP
		});
  	return (
				<View style={[styles.style]} >
					<View {...{ height, width, backgroundColor: Color.transparent }}>
						<View style={[StyleSheet.absoluteFill]}>
							<StaticTabbar {...this.props} value={value}/>
						</View>
					</View>
					<SafeAreaView style={styles.container} />
				</View>
  	);
  }
}

const styles = StyleSheet.create({
	container: { backgroundColor: Color.white },
	style: { backgroundColor: Color.white,
		position: 'absolute', left: 0, right: 0, bottom: 0 },
	playerSheet: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "cyan",
	},
});

const mapStateToProps = ({ onlinestore, login, wallet,  }) => ({
	onlinestore, login, wallet
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({...ActionCreators},  dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabbar);