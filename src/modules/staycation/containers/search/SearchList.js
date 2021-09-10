import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../../actions";
import SearchList from "../../components/user/search/SearchList";

const mapStateToProps = ({ staycation, login }) => ({
	staycation, login,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({...ActionCreators}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
