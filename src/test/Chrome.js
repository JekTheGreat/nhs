/* eslint-disable react/display-name */
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { TAB_COLUMNS, TAB_SIZE, TAB_SIZE2, tabs } from "./Tab";
import SortableTab from "./SortableTab";

const { Value } = Animated;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1c1d1e",
	},
});
export default () => {
	const offsets = tabs.map((_, index) => ({
		x: new Value(Math.floor(index / TAB_COLUMNS) > 0 ?
			(index - 4) * TAB_SIZE : index * TAB_SIZE),
		y: new Value(Math.floor(index / TAB_COLUMNS) * TAB_SIZE),
	}));
	
	return (
		<View style={styles.container}>
			{tabs.map((tab, index) => (
				<SortableTab key={tab.id} {...{ tab, index, offsets }} />
			))}
		</View>
	);
};
