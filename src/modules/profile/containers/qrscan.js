import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import * as ActionCreatorsProfile from "__src/modules/wallet/actions";

import QRScan from "../components/qr/QRScan";
const creator = { ...ActionCreators, ...ActionCreatorsProfile };

const mapStateToProps = ({ profile, login }) => ({
	profile, login,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(creator, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(QRScan);
