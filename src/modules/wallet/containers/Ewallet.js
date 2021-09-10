import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as ActionsCreators from "../actions";

import EwalletScreen from "../components/WalletContent";

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

const Ewallet = connect(
	mapStateToProps,
	mapDispatchToProps
)(EwalletScreen);

export default Ewallet;
