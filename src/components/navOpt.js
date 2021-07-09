import Resources from "__src/resources";
import _ from "lodash";
const {Color} = Resources;

const navigationOptions = ({navigation}) =>  ({
	title: _.has(navigation, "state.params.title") ?
		navigation.state.params.title : "",
	headerStyle: {
		backgroundColor: Color.Header,
	},
	headerTitleStyle: {
		color: "white",
		fontWeight: "normal",
		fontFamily: "Roboto",
	},
	headerTintColor: Color.white,
	headerBackTitle: " ",
	headerBackTitleVisible: false,
});

export default navigationOptions;
