import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as ActionsCreators from "../actions";

import AddLegacyScreen from "../components/index";

const mapStateToProps = ({ login, addlegacy, wallet }) => ({
	login, wallet,
	addlegacy,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionsCreators, dispatch),
});

const AddLegacy = connect(
	mapStateToProps,
	mapDispatchToProps
)(AddLegacyScreen);

export default connect(mapStateToProps)(AddLegacy);
