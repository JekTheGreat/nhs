import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import ChangeMobile from "../components/ChangeMobile/ChangeMobile";


const mapStateToProps = ({ profile, login, account }) => ({
	profile, login, account,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeMobile);
