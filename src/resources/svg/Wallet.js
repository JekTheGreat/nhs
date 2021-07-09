import React from "react";
import Svg, {
	Circle,
	Stop,
	Path,
	LinearGradient,
} from "react-native-svg";
import PropTypes from "prop-types";

const Wallet = ({size, isActive}) => {

	if (isActive){
		return WalletActive(size);
	}
	
	return (
		<Svg width={size} height={size} viewBox="0 0 128 128">
			<Path
				d="M110.11 97.02V121c0 1.1-.9 2-2 2H6.96c-1.1 0-2-.9-2-2V46.83c0-1.1.9-2 2-2h101.15c1.1 0 2 .9 2 2v23.98h4.96V44.83c0-2.75-2.25-5-5-5H5c-2.75 0-5 2.25-5 5V123c0 2.75 2.25 5 5 5h105.08c2.75 0 5-2.25 5-5V97.02h-4.97z"
				fill="#5f7382"
			/>
			<Path
				d="M120.21 74.82c.9 0 1.67.76 1.67 1.67v14.87c0 .9-.76 1.67-1.67 1.67H91.18c-.9 0-1.67-.76-1.67-1.67V76.48c0-.9.76-1.67 1.67-1.67h29.03m0-3.99H91.18c-3.12 0-5.67 2.55-5.67 5.67v14.87c0 3.12 2.55 5.67 5.67 5.67h29.03c3.12 0 5.67-2.55 5.67-5.67V76.48c0-3.11-2.55-5.66-5.67-5.66z"
				fill="#5f7382"
			/>
			<Circle cx={98.61} cy={83.92} r={6.02} fill="#5f7382" />
			<Path
				d="M88.59 24.84l1.03 5.33H61.04l27.55-5.33m3.17-4.68l-72.5 14.01h75.21l-2.71-14.01zM65.28 5.45l5.57 9.87-35.07 6.78 29.5-16.65M66.8 0L12.42 30.69l64.65-12.5L66.8 0z"
				fill="#5f7382"
			/>
		</Svg>
	);
};

const WalletActive = (size) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 128 128">
			<LinearGradient
				id="prefix__a"
				gradientUnits="userSpaceOnUse"
				x1={25.104}
				y1={140.094}
				x2={89.973}
				y2={27.739}
			>
				<Stop offset={0} stopColor="#b87040" />
				<Stop offset={0.6} stopColor="#955935" />
			</LinearGradient>
			<Path
				d="M115.08 65.5v-20c0-3.12-2.55-5.67-5.67-5.67H5.67C2.55 39.83 0 42.38 0 45.5v76.84c0 3.12 2.55 5.67 5.67 5.67h103.75c3.12 0 5.67-2.55 5.67-5.67V65.5z"
				fill="url(#prefix__a)"
			/>
			<Path
				d="M120.21 97.02H91.18c-3.12 0-5.67-2.55-5.67-5.67V76.48c0-.92.23-1.78.62-2.55-1.84.94-3.12 2.85-3.12 5.05v14.87c0 3.12 2.55 5.67 5.67 5.67h29.03c2.2 0 4.11-1.27 5.05-3.12-.77.39-1.63.62-2.55.62z"
				fill="#814e2f"
			/>
			<Path
				d="M120.21 70.82H91.18c-3.12 0-5.67 2.55-5.67 5.67v14.87c0 3.12 2.55 5.67 5.67 5.67h29.03c3.12 0 5.67-2.55 5.67-5.67V76.48c0-3.11-2.55-5.66-5.67-5.66z"
				fill="#c07139"
			/>
			<LinearGradient
				id="prefix__b"
				gradientUnits="userSpaceOnUse"
				x1={102.868}
				y1={88.173}
				x2={94.356}
				y2={79.66}
			>
				<Stop offset={0} stopColor="#fccb62" />
				<Stop offset={0.213} stopColor="#fed787" />
				<Stop offset={0.394} stopColor="#ffdf9f" />
				<Stop offset={0.505} stopColor="#ffe2a8" />
				<Stop offset={0.614} stopColor="#ffdf9f" />
				<Stop offset={0.791} stopColor="#fed787" />
				<Stop offset={1} stopColor="#fccb62" />
			</LinearGradient>
			<Circle cx={98.61} cy={83.92} r={6.02} fill="url(#prefix__b)" />
			<Path fill="#a6dbc7" d="M94.47 34.17l-2.71-14.01-72.5 14.01z" />
			<Path fill="#759475" d="M66.8 0L12.42 30.69l64.65-12.5z" />
		</Svg>
	);
};

Wallet.propTypes = {
	size: PropTypes.number,
	isActive: PropTypes.bool,
};

export default Wallet;
