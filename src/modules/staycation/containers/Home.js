import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import HomeScreen from "../components/homepage/HomePage";
// import HomeScreen from "../components/searchlist/index";
// import HomeScreen from "../components/selected/SelectedHotelView";


const mapStateToProps = ({ home }) => ({
	...home,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
