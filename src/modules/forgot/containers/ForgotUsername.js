import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import ForgotUsername from "../components/ForgotUsername";

const mapStateToProps = ({ forgot }) => ({
	forgot,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionCreators, dispatch),
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotUsername);
