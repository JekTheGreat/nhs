import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import * as ActionCreatorsWallet from "__src/modules/wallet/actions";
// import Main from "../components/Main";
import RenderHome from '../components/screens/home/RenderHomeScreen'

const mapStateToProps = ({ login, onlinestore, wallet }) => ({
	login, onlinestore, wallet,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ ...ActionCreators, ...ActionCreatorsWallet }, dispatch),
});

// export default connect(mapStateToProps, mapDispatchToProps)(Main);
export default connect(mapStateToProps, mapDispatchToProps)(RenderHome);
