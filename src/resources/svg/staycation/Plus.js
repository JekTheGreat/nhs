import React from "react";
import Svg, {
	Path,
} from "react-native-svg";
import PropTypes from "prop-types";

const Plus = ({size}) => {
	
	return (
		<Svg width={size} height={size} viewBox="0 0 67 67" preserveAspectRatio="none">
			<Path
				d="M15 0a15 15 0 1015 15A15.017 15.017 0 0015 0zm7.212 16.154h-6.058V22.5a1.154 1.154 0 11-2.308 0v-6.346H7.788a1.154 1.154 0 010-2.308h6.058V8.077a1.154 1.154 0 112.308 0v5.769h6.058a1.154 1.154 0 110 2.308z"
				fill="#ffde43"
			/>
		</Svg>
	);
};

Plus.propTypes = {
	size: PropTypes.number,
};

export default Plus;
