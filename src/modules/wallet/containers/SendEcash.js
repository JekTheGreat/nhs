import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as ActionsCreators from "../actions";

import SendEcash from "../components/transfer/index";

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

const Send = connect(
	mapStateToProps,
	mapDispatchToProps
)(SendEcash);

export default Send;
