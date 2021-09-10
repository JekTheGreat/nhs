/* eslint-disable */
import React from "react";
import { StyleSheet, Text, Dimensions, View,
	TouchableOpacity, FlatList, ScrollView} from "react-native";
import PropTypes from "prop-types";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { clamp, onGestureEvent, timing, withSpring } from "react-native-redash";
import { getBottomSpace } from "react-native-iphone-x-helper";
import ServiceItem from "./ServiceItem";
import Button from "__src/components/Button";
import Resources from "__src/resources";
const {Color, Res} = Resources;
const {height} = Dimensions.get("window");
const TABBAR_HEIGHT = getBottomSpace() + 100;
const MINIMIZED_PLAYER_HEIGHT = 42;
const SNAP_TOP = 120;
const SNAP_BOTTOM = height;
const config = {
  damping: 20,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1
};
const {
  Clock,
  Value,
  cond,
  useCode,
  set,
	block,
	eq,
	not,
  clockRunning,
  interpolate,
  Extrapolate,
} = Animated;

const formatData = (data, numColumns) => {
	const numberOfFullRows = Math.floor(data.length / numColumns);
	let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);

	while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
		data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
		numberOfElementsLastRow++;
	}

	return data;
};
const numColumns = 4;

const EditService = ({goUp, goDown, offset, translationY, velocityY, state, home: {favoriteService}}) => {
  // const translationY = new Value(0);
  // const velocityY = new Value(0);
  // const state = new Value(State.UNDETERMINED);
  // const offset = new Value(SNAP_BOTTOM);
  // const goUp: Animated.Value<0 | 1> = new Value(0);
  // const goDown: Animated.Value<0 | 1> = new Value(0);  

  const gestureHandler = onGestureEvent({
    state,
    translationY,
    velocityY
  });
  const translateY = withSpring({
    value: clamp(translationY, 0, SNAP_BOTTOM),
    velocity: velocityY,
    offset,
    state,
    snapPoints: [SNAP_TOP, SNAP_BOTTOM],
    config
  });
  // const translateBottomTab = interpolate(translateY, {
  //   inputRange: [SNAP_TOP, SNAP_BOTTOM],
  //   outputRange: [TABBAR_HEIGHT, 0],
  //   extrapolate: Extrapolate.CLAMP
  // });

  const opacity = interpolate(translateY, {
    inputRange: [SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });
  const opacity2 = interpolate(translateY, {
    inputRange: [
      SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT * 2,
      SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT
    ],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });
  const testGesture = (e) => {

    if(e.nativeEvent.oldState === State.ACTIVE){
      console.log("e", e);
      console.log("offset", offset);
      console.log("translationY", translationY);
      console.log("translateY", translateY);
    }
  }

  const renderItem = ({item, index}) => (
		<ServiceItem
			key={`idx${index}`}
      item={item}
      bg={{backgroundColor: Color.StatusBar, padding: 12}}
      size="25"/>
  );
  
  const clock = new Clock();
  useCode(
    block([
      cond(goUp, [
        set(
          offset,
          timing({
            clock,
            from: offset,
            to: SNAP_TOP
          })
        ),
        cond(not(clockRunning(clock)), [set(goUp, 0)])
      ]),
      cond(goDown, [
        set(
          offset,
          timing({
            clock,
            from: offset,
            to: SNAP_BOTTOM
          })
        ),
        cond(not(clockRunning(clock)), [set(goDown, 0)])
      ])
    ]),
    []
  );

	return (
		<PanGestureHandler {...gestureHandler}>
			<Animated.View style={[styles.playerSheet, {
				transform: [{ translateY}] }]} >
        <TouchableOpacity onPress={() => {
          goDown.setValue(1);
          goUp.setValue(0);
        }} style={styles.view1}>
          <View style={styles.line1}/>
          <View style={styles.line2}/>
        </TouchableOpacity>

        <View style={styles.view2}>
						<Text style={styles.label}>Your Favourites</Text>
            <Button label="Edit" 
              style={styles.btnEdit}
              labelStyle={{color: Color.colorPrimary}}/>
					</View>


        <ScrollView showsVerticalScrollIndicator={false}>
					<FlatList
						data={formatData(favoriteService, numColumns)}
						renderItem={renderItem}
						numColumns={numColumns}
						keyExtractor={(item, index) => `idx ${index}`} />

          <View style={styles.view3}>
						<Text style={styles.label}>Other Services</Text>
					</View>

          <FlatList
						data={formatData(favoriteService, numColumns)}
						renderItem={renderItem}
						numColumns={numColumns}
						keyExtractor={(item, index) => `idx ${index}`} />
        </ScrollView>
			</Animated.View>

		</PanGestureHandler>
	);
}

EditService.propTypes = {
	goUp: PropTypes.oneOfType([ PropTypes.node, PropTypes.func, PropTypes.object, PropTypes.elementType ]),
	goDown: PropTypes.oneOfType([ PropTypes.node, PropTypes.func, PropTypes.object, PropTypes.elementType ]),
	offset: PropTypes.oneOfType([ PropTypes.node, PropTypes.func, PropTypes.object, PropTypes.elementType ]),
};

EditService.defaultProps = {
	goUp:  Animated.Value,
	goDown:  Animated.Value,
	offset:  Animated.Value,
}


const styles = StyleSheet.create({
	playerSheet: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "white",
  },
  imgUpdate: {width: 60, height: 25},
  view1: {position: "absolute", top: 10, alignSelf: "center", alignItems: "center"},
  line1: {height: 3, width: 35, backgroundColor: Color.gray06, borderRadius: 5},
  line2: {height: 3, width: 25, backgroundColor: Color.gray06, borderRadius: 5, marginTop: 3},
  view2: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20, paddingHorizontal: 20},
  view3: {flexDirection: "row",  paddingHorizontal: 20, marginTop: 20},
  label: {fontFamily: "Roboto-Light", fontSize: 15, fontWeight: "500", color: Color.black},
  btnEdit: {width: 70, height: 30, backgroundColor: "white", borderWidth: 1, borderColor: Color.colorPrimary},
});

export default EditService;
