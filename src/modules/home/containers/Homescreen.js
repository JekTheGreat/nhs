import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import * as ActionCreatorsWallet from "__src/modules/wallet/actions";
import * as ActionCreatorsLogin from "__src/modules/login/actions";
import * as ActionCreatorsOnlineStore from "__src/modules/onlinestore/actions";

import HomeScreen from "../components/Home";

const mapStateToProps = ({ home, login, wallet, profile, onlinestore }) => ({
	home, login, wallet, profile, onlinestore,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...ActionCreators,
		...ActionCreatorsWallet, ...ActionCreatorsLogin, ...ActionCreatorsOnlineStore
	}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
