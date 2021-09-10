import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as ActionsCreators from "../actions";

import ALDetails from "../components/history/Details";

const mapStateToProps = ({ login, addlegacy, wallet }) => ({
	login, wallet,
	addlegacy,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionsCreators, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ALDetails);
