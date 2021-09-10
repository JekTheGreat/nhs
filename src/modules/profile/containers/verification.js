import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import * as ActionCreatorsLogin from "../../login/actions";
import * as ActionCreatorsHome from "__src/modules/home/actions";
import * as ActionCreatorsWallet from "__src/modules/wallet/actions";

import Verification from "../components/verification/AccountVerification";

const mapStateToProps = ({ profile, login }) => ({
	profile, login,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...ActionCreators, ...ActionCreatorsLogin,
		...ActionCreatorsHome, ...ActionCreatorsWallet
	}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
