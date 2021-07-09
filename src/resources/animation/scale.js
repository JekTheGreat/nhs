const getAnimation = ({controlVar}) => ({
	transform: [
		{
			scale: controlVar,
		},
		{
			translateY: controlVar.interpolate({
				inputRange: [0, 1],
				outputRange: [1000, 0],
			}),
		},
	],
});

export default getAnimation;
