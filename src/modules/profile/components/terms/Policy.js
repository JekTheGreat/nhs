/* eslint-disable max-len */
import React, {PureComponent} from "react";
import {View, Text, ScrollView} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import styles from "../../styles.css";
const {Color} = Resource;

export default class Policy extends PureComponent {
	_onBack() {
		const {goBack} = this.props.navigation;

		goBack();
	}
	render() {
		return (
			<View style={styles.flex1bg}>
				<ScrollView showsVerticalScrollIndicator={false} style={styles.paddingH10}>
					<Text style={styles.termsTitle}>UNIFIED PRIVACY POLICY</Text>
					<Text style={styles.termsTxt1}>
						We at <Text style={{color: Color.Standard2}}>GPRS-UNIFIED PRODUCTS AND SERVICES, INC. (“GPRS-UNIFIED”)</Text> commit to observe and respect your data privacy rights.
					</Text>
					<Text style={styles.termsTxt1}>
						We uphold and recognize your rights as a data subject under the provisions of the Data Privacy Act of 2012 and its Implementing Rules and Regulations, and are cognizant of our obligation to ensure that all pieces of personal data in our
						processing systems are secured and protected.
					</Text>
					<Text style={styles.termsTxt1}>
						When you access this website and sign up as a member, you acknowledge that you accept the practices and commit to comply with the policies outlined in this Privacy Policy.
					</Text>
					<Text style={styles.termsTxt2}>Information we collect </Text>
					<Text style={styles.termsTxt1}>
						Upon registration as a GPRS-UNIFIED member, information that may be collected from you may include your name, address, e-mail address, contact number, date of birth, and gender.
					</Text>
					<Text style={styles.termsTxt1}>
						Your browser type, language preference, referring site, additional websites requested, the date and time of such request and Internet Protocol (IP) addresses are likewise collected.
					</Text>
					<Text style={styles.termsTxt1}>
						You undertake to submit to us information that is accurate and complete and not misleading. You likewise undertake to keep the necessary information about you updated and to inform us if there are changes to the same. We reserve the right
						to require you to submit documentation to verify the information you provided.
					</Text>
					<Text style={styles.termsTxt2}>How we use personal information</Text>
					<Text style={styles.termsTxt1}>
						We use your personal information to provide you the services and support that you require or in relation to the transactions you have requested. We will also use your personal information, particularly your contact details, for official
						correspondences. Your personal information also helps us modify, analyze and improve our products and services.
					</Text>
					<Text style={styles.termsTxt2}>Disclosing personal information</Text>
					<Text style={styles.termsTxt1}>
						Subject to your express consent, the information we collect from you will be used, or shared with third parties (including related companies, third party service providers, and third party sellers), to compare information, and verify with
						third parties in order to ensure that the information is accurate; and to develop, improve or enhance our products and services.
					</Text>
					<Text style={styles.termsTxt1}>
						Your express consent for disclosure may not be required when there are grounds to believe that the disclosure is necessary to prevent threats to life or health; for law enforcement purposes; or in fulfillment of legal and regulatory
						requirements and requests.
					</Text>
					<Text style={styles.termsTxt1}>We do not engage in the business of selling members’ personal information to third parties.</Text>
					<Text style={styles.termsTxt2}>How you can update your personal information</Text>
					<Text style={styles.termsTxt1}>
						Pursuant to your rights as a data subject under the Data Privacy Act of 2012, you can update your personal data anytime by accessing your account with us. Sharing your updated information is subject to the conditions mentioned above.
					</Text>
					<Text style={styles.termsTxt2}>How you can access your personal information</Text>
					<Text style={styles.termsTxt1}>
						We also recognize that you have the right to gain reasonable access to your personal data. If you would like to view or access your personal data, please contact us. Please note that we may charge you administrative fee for retrieving
						your personal information records.
					</Text>
					<Text style={styles.termsTxt1}>
						You undertake to treat your username, password and other credentials with utmost confidentiality and not make it available to unauthorized third parties. We will not assume any liability arising from any misuse of your username, password
						and other credentials.
					</Text>
					<Text style={styles.termsTxt2}>How you can secure your personal information</Text>
					<Text style={styles.termsTxt1}>
						We guarantee that we handle your personal information adhering to established security standards and procedures. We ensure that access to personal information is restricted.
					</Text>
					<Text style={styles.termsTxt1}>
						We maintain technology products and systems to prevent unauthorized computer access. We securely dispose of or delete your personal information when there is no longer business or legal reason to keep the same.
					</Text>
					<Text style={styles.termsTxt2}>What we require from you</Text>
					<Text style={styles.termsTxt1}>
						We require you to employ a strong and unique alpha-numeric password as the same will serve as your key to your account and as such, must only be known to you. Do not share your password with anyone. Sharing your password with others means
						that you take responsibility for all actions taken in the name of your account and the consequences thereof. Losing control of your password means losing substantial control over your personal data and other information that you have
						submitted to us. You could also be held liable for legally binding actions taken on your behalf. Thus, if your password has been compromised, or if you have grounds to believe that your password has been compromised, you should
						immediately contact us and change your password.
					</Text>
					<Text style={styles.termsTxt1}>
						We also require you to log off of your account and delete your browsing and search history and cookies before you log out of a shared device or computer.
					</Text>
					<Text style={styles.termsTxt2}>Minor</Text>
					<Text style={styles.termsTxt1}>
						Availment of our products and services through this website is not intended for children, or those below eighteen (18) years of age or older but are incapable of taking care of themselves as defined under Philippine laws. If you are a
						child as defined earlier, you may use or avail of our services only with the involvement and consent of a parent or guardian.
					</Text>
					<Text style={styles.termsTxt2}>Changes to this Privacy Policy</Text>
					<Text style={styles.termsTxt1}>
						We shall regularly review the sufficiency of this Privacy Policy. We reserve the right to modify and change the Privacy Policy at any time. Any changes to this policy shall be published accordingly.
					</Text>
					<Text style={styles.termsTxt1}>
						We encourage you to periodically review this policy to be informed of how we are using and protecting your personal information.
					</Text>
					<Text style={styles.termsTxt2}>Data Privacy Officer</Text>
					<Text style={styles.termsTxt1}>
						We have appointed our data privacy officer for you to contact if you have any questions or concerns about our personal information policies or practices.
					</Text>
					<Text style={styles.termsTxt1}>You may get in touch with our data privacy officer via email address dpo@mygprs.ph and landline number 02-404-9863.</Text>
				</ScrollView>
			</View>
		);
	}
}

Policy.propTypes = {
	navigation: PropTypes.object,
};
