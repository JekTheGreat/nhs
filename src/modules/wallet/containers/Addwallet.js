import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as ActionsCreators from "../actions";

import Addwallet from "../components/AddWallet";

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
)(Addwallet);

export default Ewallet;
