import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import * as ActionCreatorsProfile from "../../profile/actions";
import * as ActionCreatorsLogin from "../../login/actions";
import RegisterVerification from "../components/verification/AccountVerification";

const mapStateToProps = ({ register, profile, login }) => ({
	register, profile, login,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({...ActionCreators,
		...ActionCreatorsProfile, ...ActionCreatorsLogin}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterVerification);
