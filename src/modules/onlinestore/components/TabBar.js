/* eslint-disable */
import * as React from "react";
import { SafeAreaView, StyleSheet, Dimensions, View, Animated } from "react-native";
import StaticTabbar, { height } from "./StaticTabbar";
import Resources from "__src/resources";
import REAnimated from "react-native-reanimated";
const { Color } = Resources;
const { width } = Dimensions.get("window");

const {
    Value,
} = REAnimated;

export default class Tabbar extends React.PureComponent {

    value = new Animated.Value(0);
    translationY = new Value(0);

    render() {
        const { value } = this;
        return (
            <View style={[styles.style]} >
                <View {...{ height, width, backgroundColor: Color.white }}>
                    <View style={[StyleSheet.absoluteFill]}>
                        <StaticTabbar {...this.props} value={value} />
                    </View>
                </View>
                <SafeAreaView style={styles.container} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { backgroundColor: Color.white },
    style: {
        backgroundColor: Color.transparent,
        position: 'absolute', left: 0, right: 0, bottom: 0
    },
    playerSheet: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "cyan",
    },
});
