import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import * as ActionCreatorsWallet from "__src/modules/wallet/actions";
import MySales from "../components/screens/dashboard/mySales/MySales";

const mapStateToProps = ({ login, marketplace, wallet }) => ({
    login, marketplace, wallet,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...ActionCreators, ...ActionCreatorsWallet }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MySales);
