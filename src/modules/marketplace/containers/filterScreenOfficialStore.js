import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from "../actions";
import * as ActionCreatorsWallet from "__src/modules/wallet/actions";
import FilterScreensOfficialStore from "../components/screens/store/renderScreens/FilterScreensOfficialStore";

const mapStateToProps = ({ login, marketplace, wallet }) => ({
    login, marketplace, wallet,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...ActionCreators, ...ActionCreatorsWallet }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterScreensOfficialStore);