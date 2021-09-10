import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import * as ActionCreatorsHome from "__src/modules/home/actions";
import Profile from "../components/Main";

const mergeAction = {...ActionCreators, ...ActionCreatorsHome};

const mapStateToProps = ({ profile, login }) => ({
	profile, login,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(mergeAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
