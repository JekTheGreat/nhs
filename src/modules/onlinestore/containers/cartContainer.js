import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "__src/modules/onlinestore/actions";
import * as ActionCreatorsWallet from "__src/modules/wallet/actions";
import RenderCartScreen from "../components/screens/cart/RenderCartScreen";

const mapStateToProps = ({ login, onlinestore, wallet }) => ({
    login, onlinestore, wallet,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...ActionCreators, ...ActionCreatorsWallet }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RenderCartScreen);
