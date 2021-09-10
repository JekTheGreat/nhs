/* eslint-disable max-len */
// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, ScrollView} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import styles from "../../styles.css";

const {Color} = Resource;

export default class TermsCondition extends PureComponent {
	_onBack() {
		const {goBack} = this.props.navigation;

		goBack();
	}
	
	render() {
		return (
			<View style={styles.flex1bg}>
				<ScrollView showsVerticalScrollIndicator={false} style={styles.paddingH10}>
					<Text style={styles.termsTitle}>UNIFIED TERMS OF SERVICE</Text>
					<Text style={styles.termsTxt1}>
						<Text style={{color: Color.Standard2}}>Please read carefully the Terms of Service governing the use and access of the UNIFIED application and its services.</Text> By accessing, browsing, or using the application, you
						shall be deemed to have consented to all the terms and conditions herein. If you are not agreeable to any of the Terms herein, please do not access or use this application.
					</Text>
					<Text style={styles.termsTxt1}>Segments of this application which are secured by passwords are restricted to registered members only.</Text>
					<Text style={styles.termsTxt1}>
						<Text style={{color: Color.Standard2}}>If you are a minor (below 18 years old),</Text>you must first obtain consent from your parent(s) or legal guardian(s) their agreement to these Terms of Service and that they take
						responsibility for i) all your activities in this application; (ii) any and all charges from your use of any of the products and services; and (iii) your acceptance and compliance with these Terms of Service. If you do not have consent
						from your parent(s) or legal guardian(s), please do not access or use this application.
					</Text>

					<Text style={styles.termsTxt2}>Guidelines</Text>
					<Text style={styles.termsTxt1}>
						<Text style={{color: Color.Standard2}}>All members and customers agree to comply with the guidelines, policies, procedures, rules, regulations and instructions on the use and access of this application.</Text>This
						includes any amendments which may be employed from time to time. UNIFIED reserves the sole right to revise these guidelines, policies, procedures, rules, regulations and instructions at any time which will bind all members and customers
						once they are published on this application.
					</Text>
					<Text style={styles.termsTxt1}>All members and customers agree not to perform the following: </Text>

					<Text style={styles.termsTxt2}>Availability of Access</Text>
					<Text style={styles.termsTxt1}>
						<Text style={{color: Color.Standard2}}>UNIFIED</Text> may, from time to time and without giving any reason or prior notice, upgrade, modify, suspend or discontinue the provision of or remove, whether in whole or in part,
						any service in this application and shall not be liable if any such upgrade, modification, suspension or removal prevents you from accessing this application.
					</Text>

					<Text style={styles.termsTxt2}>Content Monitoring</Text>
					<Text style={styles.termsTxt1}>
						<Text style={{color: Color.Standard2}}>UNIFIED</Text> reserves the right to:
					</Text>

					<Text style={styles.termsTxt2}>Other Terms</Text>
					<Text style={styles.termsTxt1}>
						In addition to these Terms of Service, the use of specific aspects of this application may be subject to additional terms and conditions from our partners, contractors or sub-contractors, which will apply in full force and effect.
					</Text>

					<Text style={styles.termsTxt2}>Use of Services</Text>
					<Text style={styles.termsTxt1}>
						Use of this application is limited to members or customers that are of legal age and who have the legal capacity to enter into and form contracts under any applicable law. Members and customers who have breached or are in breach of the
						terms and conditions contained herein and members or customers who have been permanently or temporarily suspended from use of any of this application may not use the application.
					</Text>

					<Text style={styles.termsTxt2}>General Terms</Text>
					<Text style={styles.termsTxt1}>Members and customers agree:</Text>

					<Text style={styles.termsTxt2}>Prices</Text>
					<Text style={styles.termsTxt1}>
						All prices are subject to taxes, unless otherwise stated. <Text style={{color: Color.Standard2}}>UNIFIED</Text> reserves the right to amend the prices at any time with prior notice.
					</Text>
					<Text style={styles.termsTxt2}>Registered Members</Text>
					<Text style={styles.termsTxt3}>Username/Password </Text>
					<Text style={styles.termsTxt1}>
						This application is made available only upon registration as a member with UNIFIED and upon providing personal information, which includes but not limited to name, e-mail address, address, contact number, date of birth, gender, IP
						address, device information. We may at any time in our sole and absolute discretion, request that you update your personal information or forthwith invalidate the username and/or password without giving any reason or prior notice and
						shall not be liable or responsible for any losses suffered by or caused by you or arising out of or in connection with or by reason of such request or invalidation. Customers and members hereby agree to change their password from time to
						time and to keep the username and password confidential and shall be responsible for the security of their account and liable for any disclosure or use (whether such use is authorized/ intended or not) of the username and/or password. All
						customers and members should notify UNIFIED immediately if they have knowledge that or have reason for suspecting that the confidentiality of their username and/or password has been compromised or if there has been any unauthorized use of
						the username and/or password or if their personal information needs to be updated.
					</Text>
					<Text style={styles.termsTxt3}>Use/ Access of Application</Text>
					<Text style={styles.termsTxt1}>
						As a customers and registered members, you agree and acknowledge that any use of this application and any information, data, communication, material or content referable to you, your username and password shall be deemed to be, as the
						case may be:
					</Text>

					<Text style={styles.termsTxt2}>Intellectual property</Text>
					<Text style={styles.termsTxt3}>Username/Password </Text>
					<Text style={styles.termsTxt1}>
						UNIFIED and its Intellectual Property, including but not limited to copyright, patents, utility innovations, trademarks and service marks, geographical indications, domain names, layout design rights, registered designs, design rights,
						database rights, trade or business names, rights protecting trade secrets and confidential information, rights protecting goodwill and reputation, and all other similar or corresponding proprietary rights and all applications for the
						same, whether presently existing or created in the future, anywhere in the world, whether registered or not, and all benefits, privileges, rights to sue, recover damages and obtain relief or other remedies for any past, current or future
						infringement, misappropriation or violation of any of the foregoing rights, are owned, licensed to or controlled by UNIFIED. UNIFIED reserves the right to enforce its Intellectual Property to the fullest extent of the law.
					</Text>
					<Text style={styles.termsTxt3}>Restricted Use</Text>
					<Text style={styles.termsTxt1}>
						No part or parts of this application may be reproduced, reverse engineered, decompiled, disassembled, separated, altered, distributed, republished, displayed, broadcast, hyperlinked, mirrored, framed, transferred or transmitted in any
						manner or by any means or stored in an information retrieval system or installed on any servers, system or equipment without our prior written permission or that of UNIFIED.
					</Text>
					<Text style={styles.termsTxt3}>Trademarks</Text>
					<Text style={styles.termsTxt1}>
						The trademarks, which includes but are not limited to trade names, service marks, trademarks, designs, logos, emblems, slogans, signage, and indicia of origin of UNIFIED, including without limitation to marks “UPS”or “UNIFIED” and such as
						other trade names, service marks and trademarks, are registered and unregistered trademarks of UNIFIED. Nothing on this application and in these Terms of Service shall be construed as granting, by implication, estoppel, or otherwise, any
						license or right to use (including as a meta tag or as a “hot” link to any other application) any trademarks displayed on this application, without the written permission of UNIFIED or any other applicable trademark owner.
					</Text>

					<Text style={styles.termsTxt2}>Limitation of Responsibility and Liability</Text>
					<Text style={styles.termsTxt3}>No Representations or Warranties</Text>
					<Text style={styles.termsTxt1}>
						In no event will UNIFIED be liable to you or any third party claiming through you (whether based in contract, tort, strict liability or other theory) for indirect, incidental, special, consequential or exemplary damages arising out of or
						relating to the access or use of, or the inability to access or use, the service or any portion thereof, including but not limited to the loss of use of the service, inaccurate results, loss of profits, business interruption, or damages
						stemming from loss or corruption of data or data being rendered inaccurate, the cost of recovering any data, the cost of substitute services or claims by third parties for any damage to computers, software, modems, telephones or other
						property, even if UNIFIED has been advised of the possibility of such damages. UNIFIED’s liability to you or any third party claiming through you for any cause whatsoever, and regardless of the form of the action, is limited to the amount
						paid, if any, by you to UNIFIED for the service prior to the initial action giving rise to liability.
					</Text>
					<Text style={styles.termsTxt1}>Without prejudice to the generality of the foregoing, the Application does not warrant:</Text>
					<Text style={styles.termsTxt3}>Exclusion of Liability</Text>
					<Text style={styles.termsTxt1}>
						UNIFIED, its officers, directors, employees or agents shall not be liable to you for any losses, suits, actions of whatever cause (regardless of the form of action) arising directly or indirectly from:
					</Text>
					<Text style={styles.termsTxt3}>Risks</Text>
					<Text style={styles.termsTxt1}>
						UNIFIED shall not be liable for any misunderstanding, error, damage, expense, loss resulting from your use of the Application.
					</Text>

					<Text style={styles.termsTxt2}>Hyperlinks and Alerts</Text>
					<Text style={styles.termsTxt3}>Hyperlinks</Text>
					<Text style={styles.termsTxt1}>
						For the convenience of customers, guests or members, UNIFIED may include hyperlinks to other applications or content on the internet that are owned or operated by third parties. Such linked applications or content are not under the
						control of UNIFIED and as such is not liable for any errors, omissions, delays, defamation, libel, slander, falsehood, obscenity, pornography, profanity, inaccuracy or any other objectionable material contained in the contents, or the
						consequences of accessing, any linked application. Any hyperlinks to any other applications or content are not an endorsement or verification of such applications or content and customers, guests and members agree that their access to or
						use of such linked applications or content is entirely at their own risk.
					</Text>
					<Text style={styles.termsTxt3}>Promotions</Text>
					<Text style={styles.termsTxt1}>
						UNIFIED may attach banners, java applets and/or such other materials to this application for purposes of promoting our or our Third Party Vendors’ products and/or services. For the avoidance of doubt, customers, guests and members shall
						not be entitled to receive any payment, fee and/or commission in respect of any such promotional materials.
					</Text>
					<Text style={styles.termsTxt3}>Consent to Email Communication</Text>
					<Text style={styles.termsTxt1}>
						Customers and members agree to give full, free, and unequivocal consent and authority to the collection, processing and use by UNIFIED of any information they provide (including personal information) for the purposes of sending
						informational and promotional e-mails and any and all communications, notices, updates and other information to you,. Your agreement to the provisions of this clause shall constitute your consent for the purpose of the provisions of any
						spam control laws (whether in Philippines or elsewhere). You may subsequently opt out of receiving promotional e-mails by clicking on the appropriate hyperlink in any promotional e-mail.
					</Text>
					<Text style={styles.termsTxt3}>Consent to Disclosure to Government Agencies</Text>
					<Text style={styles.termsTxt1}>
						UNIFIED may, from time to time, be required by government agencies to disclose certain information in connection with any audit or investigation. Customers, guest and members acknowledge and understand that UNIFIED is not required to
						contest any demand made by an (government) authority for such information.
					</Text>
					<Text style={styles.termsTxt2}>Termination</Text>
					<Text style={styles.termsTxt3}>Termination by UNIFIED</Text>
					<Text style={styles.termsTxt1}>
						In its sole and absolute discretion, UNIFIED may with immediate effect and upon giving notice, terminate the use and access of customers or members to this application. UNIFIED may bar access to the application (or any part thereof) for
						any reason whatsoever, including a breach of any of these Terms of Service or where if UNIFIED believes that such customer or members have violated or acted inconsistently with any terms or conditions set out herein, or if it is deemed by
						UNIFIED or by any regulatory authority, that it is not suitable to continue providing access to this application.
					</Text>
					<Text style={styles.termsTxt3}>Notices from UNIFIED</Text>
					<Text style={styles.termsTxt1}>All notices or other communications are given to customers or members if:</Text>
					<Text style={styles.termsTxt3}>Notices from Customers or Members</Text>
					<Text style={styles.termsTxt1}>
						Customers or members may only give notice to UNIFIED in writing sent to our designated address or e-mail address, and UNIFIED shall be deemed to have received such notice only upon receipt. While UNIFIED endeavors to respond promptly to
						notices from customers, guest or members, UNIFIED does not guarantee that response will be provided in a prompt manner.
					</Text>
					<Text style={styles.termsTxt3}>Other Modes</Text>
					<Text style={styles.termsTxt1}>
						Notwithstanding the two (2) immediately preceding clauses, UNIFIED may from time to time designate other acceptable modes of giving notices (including but not limited to e-mail or other forms of electronic communication) and the time or
						event by which such notice shall be deemed given.
					</Text>

					<Text style={styles.termsTxt2}>General Terms of Service</Text>
					<Text style={styles.termsTxt3}>Cumulative Rights and Remedies</Text>
					<Text style={styles.termsTxt1}>
						Unless otherwise provided under these terms, the provisions herein and UNIFIED’s rights and remedies under these terms are cumulative and are without prejudice and in addition to any rights or remedies we may have in law or in equity, and
						no exercise by UNIFIED of any one right or remedy under these terms, or at law or in equity, shall (save to the extent, if any, provided expressly in these Terms of Use or at law or in equity) operate so as to hinder or prevent our
						exercise of any other such right or remedy as at law or in equity.
					</Text>
					<Text style={styles.termsTxt3}>No waiver</Text>
					<Text style={styles.termsTxt1}>
						Failure of the Application to enforce any and all of its rights under these terms shall not constitute a waiver of such rights, and such failure shall not affect the right to enforce these terms. The Application shall be entitled still to
						make use of its rights and remedies provided herein in any other situation or circumstance where a breach of terms occurs.
					</Text>
					<Text style={styles.termsTxt3}>Severability</Text>
					<Text style={styles.termsTxt1}>
						Should any provision under these terms be declared illegal, invalid or unenforceable in any respect by a competent authority or jurisdiction, the legality and validity of the remaining provisions under these terms shall not be affected or
						impaired, and shall be continue as if the illegal, invalid or unenforceable provision/s was removed from these terms.
					</Text>
					<Text style={styles.termsTxt3}>Rights of Third Parties</Text>
					<Text style={styles.termsTxt1}>
						A person or entity who is not a party to these terms shall have no right under any legislation in any jurisdiction to enforce any term of these terms, regardless of whether such person or entity has been identified by name, as a member of
						a class or as answering a particular description. For the avoidance of doubt, nothing in this clause shall affect the rights of any permitted assignee or transferee of these terms.
					</Text>
					<Text style={styles.termsTxt3}>Governing Law</Text>
					<Text style={styles.termsTxt1}>
						Use of this application and these terms shall be governed by and construed in accordance with Philippine laws and customers, guests and members hereby submit to the exclusive jurisdiction of the Philippine Courts. Except as provided in
						the preceding sentence, any dispute, controversy, or claim arising out of or relating to this terms and conditions, or the breach, termination or invalidity thereof shall be settled through arbitration under Republic Act 9285 or the
						Alternative Dispute Resolution Act of 2004.
					</Text>
					<Text style={styles.termsTxt3}>Injunctive Relief</Text>
					<Text style={styles.termsTxt1}>
						UNIFIED may seek immediate injunctive relief if it makes a good faith determination that a breach or non-performance is such that a temporary restraining order or other immediate injunctive relief is the only appropriate or adequate
						remedy.
					</Text>
					<Text style={styles.termsTxt3}>Amendments</Text>
					<Text style={styles.termsTxt1}>
						UNIFIED may, by notice through this application or by such other method of notification as we may designate (which may include notification by way of e-mail), vary the terms and conditions of these terms, such variation to take effect on
						the date UNIFIED specifies through the above means. If customers, guests or members use this application after such date, they are deemed to have accepted such variation. If they do not accept the variation, they must stop accessing or
						using this application and terminate these terms. UNIFIED’s right to vary these terms in the manner aforesaid may be exercised without the consent of any person or entity who is not a party to these terms.
					</Text>
					<Text style={styles.termsTxt3}>Correction of Errors</Text>
					<Text style={styles.termsTxt1}>
						Any typographical, clerical or other error or omission in any acceptance, invoice or other document on UNIFIED’s part shall be subject to correction without any liability on UNIFIED’s part.
					</Text>
					<Text style={styles.termsTxt3}>Currency</Text>
					<Text style={styles.termsTxt1}>Money references under these terms shall be in Philippines Peso (PhP), unless otherwise specified.</Text>
					<Text style={styles.termsTxt3}>Language</Text>
					<Text style={styles.termsTxt1}>
						In the event that these terms are executed or translated in any language other than English (“Foreign Language Version”), the English language version of these terms shall govern and shall take precedence over the Foreign Language
						Version.{" "}
					</Text>
					<Text style={styles.termsTxt3}>Entire Agreement</Text>
					<Text style={styles.termsTxt1}>
						These terms shall constitute the entire agreement between UNIFIED and its customers and members relating to the subject matter hereof and supersedes and replaces in full all prior understandings, communications and agreements with respect
						to the subject matter hereof.
					</Text>
					<Text style={styles.termsTxt3}>Binding and Conclusive</Text>
					<Text style={styles.termsTxt1}>
						Customers and members acknowledge and agree that any records (including records of any telephone conversations relating to the use of this application, if any) maintained by UNIFIED or its service providers relating to or in connection
						with the use and access of this application shall be binding and conclusive for all purposes whatsoever and shall be conclusive evidence of any information and/or data transmitted between UNIFIED and its customers, guests and members.
						Customers, guests and members hereby agree that all such records are admissible in evidence and that they shall not challenge or dispute the admissibility, reliability, accuracy or the authenticity of such records merely on the basis that
						such records are in electronic form or are the output of a computer system, and they hereby waive any of their rights, if any, to so object.
					</Text>
					<Text style={styles.termsTxt3}>Sub-Contracting and Delegation</Text>
					<Text style={styles.termsTxt1}>
						UNIFIED reserves the right to delegate or sub-contract the performance of any of its functions in connection with this application and reserves the right to use any service providers, subcontractors and/or agents on such terms as it deems
						appropriate.
					</Text>
					<Text style={styles.termsTxt3}>Assignment</Text>
					<Text style={styles.termsTxt1}>
						Customers and members may not assign their rights under these terms without prior written consent of UNIFIED. UNIFIED may assign its rights under these terms to any third party.
					</Text>
					<Text style={styles.termsTxt3}>Force Majeure</Text>
					<Text style={styles.termsTxt1}>
						UNIFIED shall not be liable for non-performance, error, interruption or delay in the performance of its obligations under these terms (or any part thereof) or for any inaccuracy, unreliability or unsuitability of this application’s
						contents if this is due, in whole or in part, directly or indirectly to an event or failure which is beyond UNIFIED’s reasonable control.
					</Text>
				</ScrollView>
			</View>
		);
	}
}

TermsCondition.propTypes = {
	navigation: PropTypes.object,
};
