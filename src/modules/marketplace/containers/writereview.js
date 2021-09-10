import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import * as ActionCreatorsWallet from "__src/modules/wallet/actions";
import WriteReview from "../components/screens/account/customer/WriteReview";

const mapStateToProps = ({ login, marketplace, wallet }) => ({
    login, marketplace, wallet,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...ActionCreators, ...ActionCreatorsWallet }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WriteReview);
