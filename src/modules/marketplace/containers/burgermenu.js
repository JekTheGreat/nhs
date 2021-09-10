import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { withNavigationFocus } from 'react-navigation';
import * as ActionCreators from "../actions";
import * as ActionCreatorsWallet from "__src/modules/wallet/actions";
import BurgerScreen from "../components/screens/store/renderScreens/BurgerScreen";

const mapStateToProps = ({ login, marketplace, wallet }) => ({
    login, marketplace, wallet,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...ActionCreators, ...ActionCreatorsWallet }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BurgerScreen);
