import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import * as ActionCreatorsProfile from "__src/modules/wallet/actions";
import * as ActionCreatorsLogin from "__src/modules/login/actions";

import Profile from "../components/profile/ProfileScreen";
const creator = { ...ActionCreators, ...ActionCreatorsProfile, ...ActionCreatorsLogin };

const mapStateToProps = ({ profile, login }) => ({
	profile, login,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(creator, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
