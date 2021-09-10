import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as ActionsCreators from "../actions";

import Conversion from "../components/Conversion";

const mapStateToProps = ({ login, account, wallet, accountNumber, services }) => ({
	login,
	account,
	wallet,
	accountNumber,
	services,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionsCreators, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Conversion);
