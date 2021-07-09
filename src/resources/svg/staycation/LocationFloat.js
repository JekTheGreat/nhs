import React from "react";
import Svg, {
	Path,
	Defs,
	G,
} from "react-native-svg";
import PropTypes from "prop-types";

const LocationFloat = ({size}) => {
	
	return (
		<Svg width={size} height={size} viewBox="0 0 67 67" preserveAspectRatio="none">
			<Defs></Defs>
			<G transform="translate(-.003 -.003)" filter="url(#prefix__a)">
				<Path d="M34 6A28 28 0 116 34 28 28 0 0134 6z" fill="#fff" />
			</G>
			<Path
				d="M34.15 22a9.007 9.007 0 00-9.149 8.836 8.37 8.37 0 00.8 3.607c2.287 4.834 6.673 9.938 7.963 11.387a.521.521 0 00.772 0c1.289-1.449 5.675-6.552 7.963-11.387a8.366 8.366 0 00.8-3.607A9.008 9.008 0 0034.15 22zm0 13.425a4.679 4.679 0 01-4.752-4.59 4.755 4.755 0 019.5 0 4.678 4.678 0 01-4.748 4.59z"
				fill="#ffde43"
			/>
		</Svg>
	);
};

LocationFloat.propTypes = {
	size: PropTypes.number,
};

export default LocationFloat;
