import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as ActionsCreators from "../actions";
import * as ActionsCreatorsLogin from "../../login/actions";
import EcashtoEcash from "../components/transfer/EcashtoEcash";

const mapStateToProps = ({ login, account, wallet, accountNumber, profile }) => ({
	login,
	account,
	wallet,
	accountNumber,
	profile,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({...ActionsCreators, ...ActionsCreatorsLogin}, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EcashtoEcash);
