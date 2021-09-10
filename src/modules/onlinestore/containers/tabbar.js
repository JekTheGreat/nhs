import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ActionCreators from "__src/modules/onlinestore/actions";
import TabBar from "../components/TabBar";

const mapStateToProps = ({ onlinestore }) => ({
    onlinestore,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...ActionCreators }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);
