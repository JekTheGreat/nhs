import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import Explore from "./Explore";
import Listing from "./Listing";


export default createSharedElementStackNavigator(
	{
		Explore,
		Listing,
	},
	{
		mode: "modal",
		headerMode: "none",
		defaultNavigationOptions: {
			cardStyleInterpolator: ({ current: { progress } }) => {
				const opacity = progress.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 1],
					extrapolate: "clamp",
				});
				
				return { cardStyle: { opacity } };
			},
			// gestureEnabled: false,
			cardStyle: {
				backgroundColor: "transparent",
			},
		},
	}
);
