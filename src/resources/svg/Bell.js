/* eslint-disable react/display-name */
import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

export default ({size}) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 20 22">
			<G
				stroke={active ? Colors.primary : Colors.border}
				strokeWidth={2}
				fill={active ? Colors.primary : "none"}
				fillRule="evenodd"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<Path d="M16 7A6 6 0 104 7c0 7-3 9-3 9h18s-3-2-3-9M11.73 20a2 2 0 01-3.46 0" />
			</G>
		</Svg>
	);
};
