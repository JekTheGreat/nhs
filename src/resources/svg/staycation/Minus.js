import React from "react";
import Svg, {
	Path,
} from "react-native-svg";
import PropTypes from "prop-types";

const Minus = ({size}) => {
	
	return (
		<Svg width={size} height={size} viewBox="0 0 67 67" preserveAspectRatio="none">
			<Path
				d="M15 0a15 15 0 1015 15A15.017 15.017 0 0015 0zm7.212 16.154H7.788a1.154 1.154 0 010-2.308h14.424a1.154 1.154 0 110 2.308z"
				fill="#ffde43"
			/>
		</Svg>
	);
};

Minus.propTypes = {
	size: PropTypes.number,
};

export default Minus;
