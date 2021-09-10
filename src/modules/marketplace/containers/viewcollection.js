import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import * as ActionCreatorsWallet from "__src/modules/wallet/actions";
import ViewCollection from "../components/screens/dashboard/myCollections/ViewCollection";

const mapStateToProps = ({ login, marketplace, wallet }) => ({
    login, marketplace, wallet,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...ActionCreators, ...ActionCreatorsWallet }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewCollection);
