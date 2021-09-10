import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import QRCode from "../components/qr/QRCode";

const mapStateToProps = ({ profile, login }) => ({
	profile, login,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(QRCode);
