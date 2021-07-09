import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import StoreScreen from "../components/StoreScreen";

const mapStateToProps = ({ profile, login, locator }) => ({
	profile, login, locator,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreScreen);
