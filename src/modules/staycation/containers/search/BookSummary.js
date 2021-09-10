import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../../actions";
import BookSummary from "../../components/user/search/BookSummary";

const mapStateToProps = ({ staycation, login }) => ({
	staycation, login,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({...ActionCreators}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookSummary);
