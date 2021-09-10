import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../../actions";
import GuestDetail from "../../components/user/search/guest/GuestDetail";

const mapStateToProps = ({ staycation, login, ticketing }) => ({
	staycation, login, ticketing,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({...ActionCreators}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GuestDetail);
