import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import * as ActionCreatorsWallet from "../../wallet/actions";
import MainScreen from "../components/MainScreen";

const mapStateToProps = ({ login, billspayment, wallet }) => ({
	login, billspayment, wallet,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ ...ActionCreators, ...ActionCreatorsWallet }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
