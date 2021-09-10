import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import * as ActionWallet from "__src/modules/wallet/actions";

import Ticketing from "../components/TicketingScreen";

const mapStateToProps = ({ login, wallet, ticketing }) => ({
	login, wallet, ticketing,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ ...ActionCreators, ...ActionWallet }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ticketing);
