import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import EmailActivation from "../components/EmailVerificationScreen";

const mapStateToProps = ({ register, forgot }) => ({
	register, forgot,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailActivation);
