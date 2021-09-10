/* eslint-disable import/namespace */
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import * as ActionCreatorsWallet from "../../wallet/actions";

import Remittance from "../components/RemitTab";

const mapStateToProps = ({ login, wallet, remittance }) => ({
	login, wallet, remittance,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({...ActionCreators, ...ActionCreatorsWallet}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Remittance);
