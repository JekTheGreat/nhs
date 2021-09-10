import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import ChangeTransactionPin from "../components/ChangeTransactionPin/ChangeTransactionPin";


const mapStateToProps = ({ profile, login, account }) => ({
	profile, login, account,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeTransactionPin);
