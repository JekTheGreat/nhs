import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import * as ActionWallet from "__src/modules/wallet/actions";
import * as ActionAccount from "__src/modules/account/actions";

import ELoading from "../components/Load.index";

const mapStateToProps = ({ account, login, wallet, loading }) => ({
	account, login, wallet, loading,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ ...ActionCreators, ...ActionWallet, ...ActionAccount }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ELoading);
