import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../../actions";
import BookSuccess from "../../components/user/search/BookSuccess";

const mapStateToProps = ({ staycation, login, ticketing }) => ({
	staycation, login, ticketing,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({...ActionCreators}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookSuccess);
