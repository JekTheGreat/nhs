import React from "react";
import Svg, {
	Path,
} from "react-native-svg";
import PropTypes from "prop-types";

const Oneway = ({width, height}) => {
	
	return (
		<Svg  width={width} height={height} viewBox="0 0 285 383">
			<Path
				data-name="Union 35"
				d="M254.857 372.058L245.955 383l-8.455-10.942L228.6 383l-8.454-10.942L211.243 383l-8.454-10.942L193.888 383l-8.454-10.942-8.9 10.942-8.455-10.942-8.9 10.942-8.454-10.942L141.82 383l-8.454-10.942-8.9 10.942-8.454-10.942-8.9 10.942-8.455-10.942-8.9 10.942-8.455-10.942L72.4 383l-8.454-10.942-8.9 10.942-8.454-10.942-8.9 10.942-8.454-10.942-8.9 10.942-8.455-10.942-9.818 10.258L0 372.058V18A18 18 0 0118 0h249a18 18 0 0118 18v354.056l-2.056 10.258-9.819-10.258h-.914l-8.9 10.944z"
				fill="#fff"
			/>
		</Svg>
	);
};

Oneway.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
};

export default Oneway;
