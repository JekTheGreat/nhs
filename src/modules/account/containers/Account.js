import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as ActionsCreators from "../actions";

import AccountScreen from "../components/AccountScreen";

const mapStateToProps = ({ login, account }) => ({
	login,
	account,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionsCreators, dispatch),
});

const Account = connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountScreen);

export default connect(mapStateToProps)(Account);
