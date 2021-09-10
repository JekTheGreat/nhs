import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import UserScreen from "../components/user/UserScreen";

const mapStateToProps = ({ staycation, login, ticketing }) => ({
	staycation, login, ticketing
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({...ActionCreators}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
