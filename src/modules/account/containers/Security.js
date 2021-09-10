import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import Security from "../components/Security/Security";


const mapStateToProps = ({ profile, login, account }) => ({
	profile, login, account,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Security);
