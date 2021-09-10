import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import * as ActionCreatorsRegister from "__src/modules/register/actions";
import * as ActionCreatorsWallet from "__src/modules/wallet/actions";
import LoginScreen from "../components/LoginScreen";

const mapStateToProps = ({ login, register, wallet }) => ({
	login,
	register,
	wallet,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...ActionCreators, ...ActionCreatorsRegister,
		...ActionCreatorsWallet
	}, dispatch),
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
