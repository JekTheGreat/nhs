import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import * as ActionCreatorsHome from "__src/modules/home/actions";
import * as ActionCreatorsWalet from "__src/modules/wallet/actions";
import Switch from "../components/switch/SwitchScreen";

const mergeAction = { ...ActionCreators, ...ActionCreatorsHome, ...ActionCreatorsWalet };

const mapStateToProps = ({ profile, login, wallet, register }) => ({
	profile, login, wallet, register,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(mergeAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Switch);
