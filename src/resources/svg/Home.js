import React from "react";
import Svg, {
	Circle,
	RadialGradient,
	Stop,
	Path,
	LinearGradient,
	Ellipse,
	G,
} from "react-native-svg";
import PropTypes from "prop-types";

const Home = ({ size, isActive, children }) => {

	if (isActive) {
		return homeActive(size);
	}

	return (
		<Svg width={size} height={size} viewBox="0 0 128 128">
			<Circle cx={64.56} cy={89.5} r={20} fill="#5f7382" />
			<Path
				d="M127.2 58.45L66.18 2.02c-.18-.16-.35-.33-.52-.47L63.99 0l-1.81 1.68L.8 58.67a2.497 2.497 0 103.4 3.66l8.13-7.57L23.52 128h80.96l11.21-73.43 8.1 7.55c1.01.94 2.59.88 3.53-.13s.89-2.6-.12-3.54zM100.26 123H27.74L16.91 51.03 63.99 6.67l47.1 44.37L100.26 123z"
				fill="#5f7382"
			/>
			{children}
		</Svg>
	);
};

const homeActive = (size) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 128 128">
			<RadialGradient
				id="prefix__a"
				cx={13.833}
				cy={59.8}
				r={93.411}
				gradientUnits="userSpaceOnUse"
			>
				<Stop offset={0} stopColor="#484848" />
				<Stop offset={0.256} stopColor="#424242" />
				<Stop offset={0.612} stopColor="#2f2f2f" />
				<Stop offset={1} stopColor="#141414" />
			</RadialGradient>
			<Path
				fill="url(#prefix__a)"
				d="M104.48 128l10.47-68.57H13.05L23.52 128z"
			/>
			<LinearGradient
				id="prefix__b"
				gradientUnits="userSpaceOnUse"
				x1={13.049}
				y1={93.716}
				x2={78.935}
				y2={93.716}
			>
				<Stop offset={0} stopColor="#fff" />
				<Stop offset={1} stopColor="#fff" stopOpacity={0} />
			</LinearGradient>
			<Path
				opacity={0.1}
				fill="url(#prefix__b)"
				d="M56.75 128l22.19-68.57H13.05L23.52 128z"
			/>
			<Ellipse
				cx={64.57}
				cy={89.5}
				rx={21.28}
				ry={21.27}
				fillRule="evenodd"
				clipRule="evenodd"
			/>
			<G fill="#fff">
				<Path d="M49.32 95.92c.1 0 .19.02.26.05.07.03.13.08.18.13.05.05.08.12.11.19a.852.852 0 010 .45c-.02.08-.05.14-.1.2s-.11.11-.18.14a.54.54 0 01-.27.06h-.57c-.03 0-.05.02-.05.05v.72h-.32v-.79c0-.11.02-.19.07-.24.05-.05.12-.07.22-.07h.66c.04 0 .08-.01.12-.02.03-.02.06-.04.08-.06.02-.03.03-.05.04-.09.01-.03.01-.07.01-.1 0-.07-.02-.14-.06-.19-.04-.05-.1-.08-.19-.08h-.95v-.35h.94zM51.2 95.92c.1 0 .19.02.26.05s.13.08.18.13c.05.05.08.12.1.19.02.07.03.15.03.23 0 .06-.01.13-.02.19a.51.51 0 01-.07.17c-.03.05-.07.1-.12.14-.05.04-.11.07-.18.09l.42.8h-.35l-.42-.77h-.47c-.03 0-.05.02-.05.05v.72h-.32v-.79c0-.11.02-.19.07-.24.05-.05.12-.07.22-.07h.71c.05 0 .08-.01.12-.02.03-.02.06-.04.08-.06.02-.03.03-.06.04-.09.01-.03.01-.07.01-.1a.28.28 0 00-.06-.18c-.04-.05-.1-.08-.19-.08h-1v-.35h1.01zM53.11 95.92c.27 0 .47.08.61.25.14.17.21.42.21.75s-.07.58-.21.75c-.14.16-.34.25-.61.25h-.25c-.27 0-.47-.08-.61-.25-.14-.16-.21-.41-.21-.75s.07-.59.21-.75c.14-.17.35-.25.61-.25h.25zm-.25.35c-.18 0-.3.05-.38.15-.08.1-.12.27-.12.5 0 .23.04.39.12.49.08.1.21.15.39.15h.25c.17 0 .3-.05.38-.15.08-.1.12-.27.12-.5 0-.23-.04-.39-.12-.5-.08-.1-.21-.15-.38-.15h-.26zM55.1 95.92c.27 0 .47.08.61.25.14.16.21.41.21.75s-.07.59-.21.75c-.14.16-.34.25-.61.25h-.64c-.1 0-.15-.05-.15-.16v-1.67c0-.11.05-.16.15-.16h.64zm-.47 1.62c0 .02.01.04.04.04h.44c.18 0 .3-.05.38-.15.08-.1.12-.27.12-.5 0-.23-.04-.39-.12-.5-.08-.1-.21-.15-.38-.15h-.44c-.02 0-.04.01-.04.04v1.22zM56.61 95.92v1.33c0 .1.02.18.07.23.05.05.12.08.23.08h.32c.1 0 .18-.03.23-.08.05-.05.07-.13.07-.23v-1.33h.31v1.36c0 .21-.05.37-.15.48-.1.11-.25.16-.44.16h-.38c-.39 0-.59-.21-.59-.64v-1.36h.33zM59.73 95.92v.35h-.7c-.18 0-.3.05-.38.15-.08.1-.12.27-.12.5 0 .23.04.39.12.5.08.1.21.15.39.15h.7v.35h-.7c-.27 0-.47-.08-.61-.25-.14-.16-.21-.41-.21-.75s.07-.59.21-.75c.14-.16.35-.25.61-.25h.69zM61.35 95.92v.35h-.53v1.65h-.32v-1.65h-.53v-.35h1.38zM63.04 95.92v.35h-.94c-.08 0-.14.02-.18.07-.04.05-.06.1-.06.17 0 .03 0 .06.01.09a.3.3 0 00.04.08c.02.02.05.04.08.05.03.01.08.02.13.02h.43c.12 0 .23.02.31.05.08.03.14.08.19.14.05.06.08.12.09.19s.03.14.03.21c0 .08-.01.16-.03.23-.02.07-.06.13-.1.18-.05.05-.11.09-.18.12-.07.03-.16.04-.27.04h-1.01v-.35h1.02c.09 0 .15-.02.19-.07a.28.28 0 00.06-.18c0-.03 0-.06-.01-.09s-.02-.06-.05-.08-.05-.04-.09-.06a.521.521 0 00-.14-.02h-.42c-.12 0-.22-.02-.3-.05a.42.42 0 01-.18-.13.663.663 0 01-.09-.19.852.852 0 010-.44.4.4 0 01.1-.18c.05-.05.1-.09.18-.12.07-.03.16-.04.26-.04h.93zM65.16 95.68a.421.421 0 01.34.15c.04.05.07.1.08.16.02.06.03.13.03.2 0 .11-.03.21-.08.29-.05.08-.14.15-.26.22l-.17.09.32.4.24-.35H66l-.39.57.4.5h-.36l-.21-.26c-.05.06-.09.1-.13.14-.04.03-.08.06-.12.08-.04.02-.08.03-.12.04-.04.01-.09.01-.13.01h-.31c-.06 0-.13-.01-.18-.03a.396.396 0 01-.15-.1c-.04-.05-.08-.1-.1-.17a.625.625 0 01-.04-.25c0-.07.01-.12.02-.18.01-.05.04-.1.08-.15.04-.05.08-.09.15-.14.06-.04.14-.09.23-.14l.08-.04-.09-.12a.724.724 0 01-.11-.19.693.693 0 01-.01-.43c.02-.06.05-.12.09-.16.04-.05.09-.08.14-.11.06-.03.12-.04.2-.04h.22zm-.23 1.94c.06 0 .12-.01.16-.04.05-.02.1-.07.16-.15l-.41-.51-.09.05c-.06.04-.12.07-.16.09-.04.03-.07.05-.1.08-.02.03-.04.05-.05.08-.01.03-.01.06-.01.09 0 .09.02.16.06.21.04.05.1.08.18.08h.26zm-.18-1.4c0 .05.01.1.03.14.02.04.05.08.08.12l.09.12.17-.09c.07-.04.12-.07.16-.12.03-.04.05-.1.05-.17 0-.06-.02-.12-.05-.17-.03-.05-.08-.07-.16-.07h-.16c-.07 0-.13.02-.16.07-.03.04-.05.1-.05.17zM68.43 95.92v.35h-.93c-.08 0-.14.02-.18.07-.04.05-.06.1-.06.17 0 .03 0 .06.01.09a.3.3 0 00.04.08c.02.02.05.04.08.05.03.01.08.02.13.02h.43c.12 0 .23.02.31.05.08.03.14.08.19.14s.08.12.09.19.03.14.03.21c0 .08-.01.16-.03.23-.02.07-.06.13-.1.18-.05.05-.11.09-.18.12s-.16.04-.27.04h-1.01v-.35H68c.09 0 .15-.02.19-.07a.28.28 0 00.06-.18c0-.03 0-.06-.01-.09s-.02-.06-.05-.08a.349.349 0 00-.09-.06.521.521 0 00-.14-.02h-.42c-.12 0-.22-.02-.3-.05-.08-.03-.14-.08-.18-.13s-.07-.12-.09-.19a.852.852 0 010-.44.4.4 0 01.1-.18c.05-.05.1-.09.18-.12.07-.03.16-.04.26-.04h.92zM70.38 95.92v.35h-.91c-.1 0-.17.02-.21.07a.28.28 0 00-.06.18c0 .16.09.24.28.24h.9v.32h-.9c-.18 0-.28.08-.28.24 0 .08.02.14.07.18.05.04.11.07.21.07h.92v.35h-.92c-.11 0-.2-.01-.28-.04a.68.68 0 01-.19-.11.452.452 0 01-.11-.17.78.78 0 01-.03-.22c0-.12.02-.21.07-.29.05-.08.11-.13.19-.17-.17-.08-.26-.23-.26-.45 0-.08.01-.15.03-.22.02-.07.06-.12.11-.17a.4.4 0 01.19-.11c.08-.03.17-.04.28-.04h.9zM71.78 95.92c.1 0 .19.02.26.05s.13.08.18.13c.05.05.08.12.1.19.02.07.03.15.03.23 0 .06-.01.13-.02.19a.51.51 0 01-.07.17c-.03.05-.07.1-.12.14-.05.04-.11.07-.18.09l.42.8h-.35l-.42-.77h-.47c-.03 0-.05.02-.05.05v.72h-.32v-.79c0-.11.02-.19.07-.24.05-.05.12-.07.22-.07h.71c.05 0 .08-.01.12-.02.03-.02.06-.04.08-.06.02-.03.03-.06.04-.09.01-.03.01-.07.01-.1a.28.28 0 00-.06-.18c-.04-.05-.1-.08-.19-.08h-1v-.35h1.01zM72.81 95.92l.55 1.61c.02.05.05.07.09.07.04 0 .07-.02.09-.07l.58-1.61h.35l-.64 1.77c-.03.09-.08.16-.14.2-.06.04-.14.06-.24.06-.09 0-.17-.02-.23-.06a.318.318 0 01-.15-.2l-.61-1.77h.35zM75.07 95.92v2h-.32v-2h.32zM76.96 95.92v.35h-.7c-.18 0-.3.05-.38.15-.08.1-.12.27-.12.5 0 .23.04.39.12.5.08.1.21.15.39.15h.7v.35h-.7c-.27 0-.47-.08-.61-.25-.14-.16-.21-.41-.21-.75s.07-.59.21-.75c.14-.16.35-.25.61-.25h.69zM78.8 95.92v.35h-.91c-.1 0-.17.02-.21.07a.28.28 0 00-.06.18c0 .16.09.24.28.24h.9v.32h-.9c-.18 0-.28.08-.28.24 0 .08.02.14.07.18.05.04.11.07.21.07h.92v.35h-.92c-.11 0-.2-.01-.28-.04a.68.68 0 01-.19-.11.452.452 0 01-.11-.17.78.78 0 01-.03-.22c0-.12.02-.21.07-.29.05-.08.11-.13.19-.17-.17-.08-.26-.23-.26-.45 0-.08.01-.15.03-.22.02-.07.06-.12.11-.17a.4.4 0 01.19-.11c.08-.03.17-.04.28-.04h.9zM80.62 95.92v.35h-.93c-.08 0-.14.02-.18.07-.04.05-.06.1-.06.17 0 .03 0 .06.01.09a.3.3 0 00.04.08c.02.02.05.04.08.05.03.01.08.02.13.02h.43c.12 0 .23.02.31.05.08.03.14.08.19.14s.08.12.09.19.03.14.03.21c0 .08-.01.16-.03.23-.02.07-.06.13-.1.18-.05.05-.11.09-.18.12s-.16.04-.27.04h-1.01v-.35h1.02c.09 0 .15-.02.19-.07a.28.28 0 00.06-.18c0-.03 0-.06-.01-.09s-.02-.06-.05-.08-.05-.04-.09-.06a.521.521 0 00-.14-.02h-.42c-.12 0-.22-.02-.3-.05-.08-.03-.14-.08-.18-.13s-.07-.12-.09-.19a.852.852 0 010-.44.4.4 0 01.1-.18c.05-.05.1-.09.18-.12.07-.03.16-.04.26-.04h.92z" />
			</G>
			<Path
				d="M48.26 88.81v3.84c0 .29.07.51.22.67.15.16.39.23.72.23h1.01c.32 0 .56-.08.71-.23.15-.16.23-.38.23-.67v-3.84h.98v3.92c0 .61-.15 1.07-.46 1.37-.31.31-.77.46-1.38.46H49.1c-1.22 0-1.83-.61-1.83-1.83v-3.92h.99zM54.43 94.57h-.99v-4.6c0-.37.11-.68.32-.91.21-.23.54-.35.98-.35.39 0 .69.1.9.29.2.19.37.45.48.78l1.66 3.67c.03.07.08.13.13.17.06.05.13.07.23.07.11 0 .19-.03.25-.09s.09-.14.09-.23v-4.55h1v4.59c0 .38-.11.69-.32.92-.22.23-.54.35-.98.35-.2 0-.37-.02-.52-.07-.15-.05-.28-.12-.39-.21-.11-.09-.2-.21-.28-.34-.08-.13-.15-.28-.2-.44l-1.66-3.67c-.07-.16-.19-.25-.35-.25-.11 0-.2.03-.26.09s-.09.14-.09.24v4.54zM61.83 88.81v5.75h-.99v-5.75h.99z"
				fill="#fff"
			/>
			<Path
				d="M67.6 88.81v1.01h-2.29c-.22 0-.41.02-.56.08-.15.05-.27.12-.36.21-.09.09-.15.19-.19.31-.04.12-.05.24-.05.38v.54h3.42v.95h-3.42v2.27h-.99V90.8c0-.29.04-.55.11-.8.08-.24.2-.45.37-.63.17-.18.39-.31.65-.41.27-.1.59-.15.96-.15h2.35z"
				fill="#f5bf19"
			/>
			<Path
				d="M69.77 88.81v5.75h-.99v-5.75h.99zM75.67 88.81v1.01h-2.84c-.3 0-.52.06-.66.2-.13.13-.2.31-.2.53 0 .45.29.68.87.68h2.79v.91h-2.82c-.58 0-.87.23-.87.7 0 .23.07.41.21.53.14.13.36.19.65.19h2.88v1.01H72.8c-.34 0-.62-.04-.86-.12s-.43-.19-.59-.33a1.31 1.31 0 01-.34-.5c-.07-.19-.11-.4-.11-.62 0-.33.07-.6.21-.82.14-.22.34-.39.61-.5-.53-.22-.8-.65-.8-1.3 0-.23.04-.44.11-.63s.19-.36.34-.5c.15-.14.35-.25.59-.32.24-.08.53-.11.86-.11h2.85zM79.44 88.81c.84 0 1.47.24 1.9.71.43.47.65 1.2.65 2.17s-.22 1.69-.65 2.16c-.43.47-1.07.71-1.9.71h-2c-.31 0-.47-.16-.47-.47v-4.81c0-.31.16-.47.47-.47h2zm-1.48 4.65c0 .07.04.1.11.1h1.37c.55 0 .95-.15 1.19-.44.25-.3.37-.77.37-1.43 0-.66-.12-1.13-.37-1.43-.24-.29-.64-.44-1.2-.44h-1.37c-.07 0-.11.03-.11.1v3.54z"
				fill="#fff"
			/>
			<G>
				<Path
					d="M64.57 67c-12.44 0-22.52 10.07-22.52 22.5S52.14 112 64.57 112s22.52-10.07 22.52-22.5S77.01 67 64.57 67zm0 42.53c-11.07 0-20.05-8.97-20.05-20.03s8.98-20.03 20.05-20.03 20.05 8.97 20.05 20.03-8.97 20.03-20.05 20.03z"
					fillRule="evenodd"
					clipRule="evenodd"
					fill="#f5bf19"
				/>
			</G>
			<G>
				<Path
					d="M59.14 84.05l1.75 1.75c.95-.93 2.25-1.51 3.69-1.51s2.74.58 3.69 1.51l1.75-1.75c-1.39-1.38-3.31-2.24-5.43-2.24s-4.06.86-5.45 2.24zm-3.49-3.49l1.75 1.75c1.84-1.83 4.38-2.96 7.18-2.96s5.34 1.13 7.18 2.96l1.75-1.75c-2.29-2.28-5.44-3.68-8.92-3.68s-6.65 1.4-8.94 3.68zm8.92-8.62c-4.85 0-9.24 1.96-12.42 5.13l1.75 1.75c2.73-2.72 6.5-4.41 10.67-4.41s7.94 1.68 10.67 4.41l1.75-1.75a17.536 17.536 0 00-12.42-5.13z"
					fillRule="evenodd"
					clipRule="evenodd"
					fill="#f5bf19"
				/>
			</G>
			<G>
				<Path
					d="M80.71 108.85c0 .66-.52 1.18-1.19 1.18-.67 0-1.2-.52-1.2-1.18 0-.65.53-1.16 1.2-1.16.67-.01 1.19.51 1.19 1.16zm-2.09 0c0 .52.38.93.91.93.51 0 .89-.41.89-.92 0-.52-.38-.94-.89-.94-.53 0-.91.42-.91.93zm.71.61h-.27v-1.16c.11-.02.26-.04.45-.04.22 0 .32.04.4.09.06.05.11.14.11.26 0 .13-.1.23-.24.27v.01c.11.04.18.13.21.28.04.18.06.25.09.29h-.29c-.04-.04-.06-.15-.09-.28-.02-.13-.09-.18-.24-.18h-.13v.46zm.01-.66h.13c.15 0 .27-.05.27-.17 0-.11-.08-.18-.25-.18-.07 0-.12.01-.15.01v.34z"
					fill="#fff"
				/>
			</G>
			<Path fill="#f4bf1a" d="M0 59.43L63.99 0 128 59.43" />
			<Path fill="#e4a515" d="M64 0l34.37 51.82-20.05 7.61H128z" />
		</Svg>
	);
};

Home.propTypes = {
	size: PropTypes.number,
	isActive: PropTypes.bool,
};

export default Home;
