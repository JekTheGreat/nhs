import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../../actions";
import ChooseDate from "../../components/user/search/guest/ChooseDate";

const mapStateToProps = ({ staycation, login, ticketing }) => ({
	staycation, login, ticketing,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({...ActionCreators}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDate);
