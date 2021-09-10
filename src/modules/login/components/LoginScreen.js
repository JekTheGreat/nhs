import Resource from "__proj/src/resources";
import React, { PureComponent } from "react";
import { View, StatusBar, SafeAreaView } from "react-native";
import PropTypes from "prop-types";
import styles from "../styles.css";
import OTPForm from "./OTPForm";
import LoginForm from "./LoginForm";
import Welcome from "./Welcome";
import ChangePassword from "./ChangePassword";
import _ from "lodash";
const { Res, Color } = Resource;

class LoginScreen extends PureComponent {
	static navigationOptions = {
		headerShow: false,
	}
	constructor(props) {
		super(props);
		this.state = {
			isLoginScreen: true,
			loginAttemps: 0,
			visible: false,
			closed: false,
			visibleCP: false,
		};
	}

	componentDidMount() {
		const { login, register, actions, navigation, wallet: { walletSelected } } = this.props;
		const { isLoggedIn, session, currentAccount, is2FALogin, isFailed } = login;
		const { is2FAReg } = register;

		if (isLoggedIn && !is2FALogin) {
			console.log("REST");
			if (_.isEmpty(currentAccount.id)) {
				actions.getUserAccount(session.token);
			}

			if (session.token) {
				actions.getAdditionalDetails(session, navigation);
				actions.walletAdded(session.token, walletSelected);
				actions.getKYCVerification(session.token);
			}

			navigation.navigate(session.title || "Home", { title: session.title });
		}
	}

	componentDidUpdate(prevProps) {
		const { login, actions, navigation, register: {is2FAReg} } = this.props;
		const { session, isLoggedIn, additionalDetails, currentAccount, is2FALogin, logoutOtherDevices,
			simultaneousLoginMsg, blockAccess, inputLoginDetails, passwordExpired, ChangePasswordSuccess } = login;

		if ((!_.isEqual(prevProps.login.session, session) && !_.isEmpty(login) && !is2FALogin)) {
			if (_.isEmpty(currentAccount.id)) {
				actions.getUserAccount(session.token);
			}

			if (_.isEmpty(additionalDetails.individualId)) {
				actions.getAdditionalDetails(session, navigation);
				actions.getKYCVerification(session.token);
				actions.walletAdded(session.token);
			}
		}

		if (isLoggedIn && !is2FALogin && !is2FAReg && (!_.isEmpty(session))) {
			if (this.state.closed == true)
				this.setState({ visible: false });
			else
				this.setState({ visible: true });
		}

		if (!_.isEqual(prevProps.login.logoutOtherDevices, logoutOtherDevices) && logoutOtherDevices) {
			this.setState({ visible: false });
		}

		if (!_.isEqual(prevProps.login.isFailed, blockAccess) && !_.isEmpty(blockAccess) && !logoutOtherDevices) {
			this.setState({ visible: true });
		}

		if (!_.isEqual(prevProps.login.simultaneousLoginMsg, simultaneousLoginMsg) &&
			!_.isEmpty(simultaneousLoginMsg) && !logoutOtherDevices && !is2FALogin) {
			actions.getLoginHistories(inputLoginDetails.username);
			this.setState({ visible: true });
		}

		if (!_.isEqual(prevProps.login.passwordExpired, passwordExpired) && !_.isEmpty(passwordExpired)){
			this.setState({visibleCP: true});
		}

		if (!_.isEqual(prevProps.login.ChangePasswordSuccess, ChangePasswordSuccess) && ChangePasswordSuccess){
			this.setState({visibleCP: false});
		}

	}

	click = () => {
		const { actions, login, navigation } = this.props;
		const { session, isLoggedIn, currentAccount, additionalDetails } = login;


		if (!_.isEmpty(session)) {
			if (_.isEmpty(currentAccount.id)) {
				actions.getUserAccount(session.token);
			}

			if (_.isEmpty(additionalDetails.individualId)) {
				actions.getAdditionalDetails(session, navigation);
				actions.getKYCVerification(session.token);
				actions.walletAdded(session.token);
			}

			this.setState({ visible: false, closed: true });
			navigation.navigate(session.title || "Home", { title: session.title });

		} else {
			actions.login(login.inputLoginDetails, login.session.token);
			this.setState({ visible: false });
		}
	}

	close = () => {
		const { actions } = this.props;

		actions.reset2FALogin();
		actions.resetLogin();
		this.setState({ visible: false, closed: false });
	}

	forgotPassword = () => {
		const { actions, navigation } = this.props;

		this.setState({ visible: false, closed: true });
		actions.resetLogin();
		navigation.navigate("ForgotPassword", {});
	}

	renderContent = () => {
		const { login } = this.props;

		if (login.is2FALogin) {
			return this.renderOTPForm();
		} else
			return this.renderLoginForm();

	}

	renderLoginForm = () => (
		<LoginForm {...this.props} />
	);

	renderOTPForm = () => (
		<OTPForm {...this.props} />
	);

	renderChangPassword = () => (
		<ChangePassword
			visibleCP={this.state.visibleCP}
			onClose={() => { this.setState({ visibleCP: false }) }}
			{...this.props}
		/>
	);

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.container}>
					<StatusBar barStyle="dark-content" backgroundColor={Color.white} />
					<View style={styles.body}>
						{this.renderContent()}
						{this.renderChangPassword()}
					</View>
				</View>
				<Welcome
					visible={this.state.visible}
					onClose={this.close}
					onClickHome={this.click}
					onClickForgot={this.forgotPassword}
					{...this.props} />
			</SafeAreaView>
		);
	}
}

LoginScreen.propTypes = {
	actions: PropTypes.object,
	login: PropTypes.object,
	navigation: PropTypes.object,
	wallet: PropTypes.object,
};

export default LoginScreen;
