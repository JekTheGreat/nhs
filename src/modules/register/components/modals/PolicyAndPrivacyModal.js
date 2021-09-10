/* eslint-disable */
import React from "react";
import { ScrollView, View, Text, TouchableOpacity, TouchableWithoutFeedback, Modal, Dimensions, Image } from "react-native";
import TxtInput from "__src/components/TxtInput";
import _ from "lodash";
import Button from "__src/components/Button";
import Dash from "react-native-dash";
import { Spinner } from "native-base";
import moment from "moment";
import Resources from "__src/resources";
import { Icon } from "react-native-elements";
import { Colors } from "react-native-paper";

const { Color, Res } = Resources;
const { width, height } = Dimensions.get('window');

class PolicyAndPrivacyModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    _agree = () => {
        const { closeModal, agreeTerms } = this.props;
        agreeTerms();
    }

    render() {
        const { isPoliciyShowing, closeModal } = this.props;
        return (
            <Modal
                ref={"PolicyAndPrivacyModal"}
                visible={isPoliciyShowing}
                transparent
                animationType="fade"
                onRequestClose={closeModal}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "grey" }}>
                    <View style={{ top: 15, borderRadius: 30, width: "95%", height: "90%", backgroundColor: Color.white, paddingVertical: 10, paddingHorizontal: 15 }}>
                        <View style={{}}>
                            <TouchableOpacity onPress={closeModal} style={{ position: "absolute", right: -20, top: -25, borderRadius: 30, backgroundColor: "red", padding: 10 }}>
                                <Icon onPress={closeModal} type='font-awesome' name='times' color={"white"} size={15} />
                            </TouchableOpacity>
                        </View>

                        <Text style={{ textAlign: "center", marginVertical: 10, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 15, color: "black" }}>
                            PRIVACY POLICY
                        </Text>
                        <ScrollView showsVerticalScrollIndicator={false} style={{}}>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black }}>
                                {"We at Unified commit to observe and respect your data privacy rights. \nWe uphold and recognize your rights as a data subject under the provisions of the Data Privacy Act of 2012 and its Implementing Rules and Regulations, and are cognizant of our obligation to ensure that all pieces of personal data in our processing systems are secured and protected. \nWhen you access this website and avail of our services and/or sign up as an accountholder, you acknowledge that you accept the practices and commit to comply with the policies outlined in this Privacy Policy."}
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                Information we collect
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black }}>
                                {"We automatically collect the following pieces of information when you use Unified: information sent to us by your computer, mobile phone or other access device, including, but not limited to your browser type, language preference, referring site, additional websites requested, the date and time of such request and Internet Protocol (IP) addresses. We also use cookies and web beacons to store information and to better understand your needs and requirements as a user. \nWhen you create your account with Unified, the following information may be collected from you: your name, date of birth, gender, nationality, address, and competent proof of your identity, i.e., government-issued identification cards like Unified Multi-Purpose Identification Card (UMID), passport, driver’s license and the like. \nWe also collect information about your transactions and activities. For purposes of authentication and fraud detection, we may collect information about you and your interactions with Unified; and evaluate your computer, mobile phone or other access device for any malicious software or activity. Also, by calling or communicating with us, you acknowledge that our communication may be overheard, monitored, or recorded without further notice or warning. \nWe may also collect information about you from third parties like the Credit Information Corporation; government agencies engaged in the processing of personal data like the Social Security System (SSS), Department of Foreign Affairs (DFA), the Land Transportation Office and similar agencies; as well as social media sites. We may undertake this collection in certain instances to compare information and verify with the mentioned third parties the information that you provided us. \nWhen you choose to associate your social media accounts with Unified, you acknowledge that that social media site is controlled by that site and that you authorize Unified to have access to your information stored in that site/s. \nYou may connect with Unified through your mobile device. The provisions of this Privacy Policy are applicable to all mobile access and use of mobile devices. \nWhen you access Unified using your mobile device, you may be sending and we may be receiving information on your location and your mobile device, which we may use to provide you with location-based services, such as advertising, search results, and other personalized content."}
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                How we use personal information
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black }}>
                                {"We use your personal information to provide you the services and support that you require or in relation to the transactions you have requested. We will also use your personal information, particularly your contact details, for official correspondences. Your personal information also helps us modify, analyze and improve our products and services. \nIn addition to providing you Unified services and customer support, we also use your personal information to process transactions and send notices about the same; resolve disputes and problems; and collect fees."}
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                Disclosing personal information
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black }}>
                                {"To fully provide you our services, we will share or disclose some of your personal information with other Unified users like buyers, sellers, merchants and card issuers. \nWe may share your name, account number, contact details, shipping and billing addresses. We may also provide details of held, failed or invalidated transactions, if any. For purposes of goods or items that must be returned or are subject of a dispute, we may provide a buyer with the seller’s address. \nFor purposes of sending you money where the sender enters your email address or phone number, we will disclose to said sender your registered name so he or she can verify that he or she is sending money to his or her intended recipient. \nTo enable third parties or merchants to accept or send payments from or to you using Unified, such third party or merchant may share information about you with us, such as your email address or mobile phone number, to notify you that a payment has been sent to you or when you try to make a payment to a merchant or third party. We use this information to make sure that you are a registered Unified customer and that Unified as a form of payment can be enabled, or to inform you of payment statuses. \nRest assured that we will not disclose your credit card or bank account details to anyone you have transacted with using Unified, or with the third parties that offer or use Unified, except with your express permission or if we are required to do so to comply with credit card rules, a subpoena, or other legal process. With your express consent, we will share some of your personal information with Unified’s sister companies to send you marketing communications; with our partner-banks for purposes of creating and offering you a credit card; \nYour express consent for disclosure may not be required when there are grounds to believe that the disclosure is necessary to prevent threats to life or health; for law enforcement purposes; or in fulfillment of legal and regulatory requirements and requests. \nWe do not engage in the business of selling members’ personal information to third parties."}
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                How you can update your personal information
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black }}>
                                {"Pursuant to your rights as a data subject under the Data Privacy Act of 2012, you can update your personal data anytime by accessing your account with us. Sharing your updated information is subject to the conditions mentioned above."}
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                How you can access your personal information
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black }}>
                                {"We also recognize that you have the right to gain reasonable access to your personal data. If you would like to view or access your personal data, please contact us. Please note that we may charge you administrative fee for retrieving your personal information records. \nYou undertake to treat your username, password and other credentials with utmost confidentiality and not make it available to unauthorized third parties. We will not assume any liability arising from any misuse of your username, password and other credentials."}
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                How we secure your personal information
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black }}>
                                {"We guarantee that we handle your personal information adhering to established security standards and procedures. We ensure that access to personal information is restricted. We maintain technology products and systems to prevent unauthorized computer access. We securely dispose of or delete your personal information when there is no longer business or legal reason to keep the same."}
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                What we require from you
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black }}>
                                {"We require you to employ a strong and unique alpha-numeric password as the same will serve as your key to your account and as such, must only be known to you. Do not share your password with anyone. Sharing your password with others means that you take responsibility for all actions taken in the name of your account and the consequences thereof. Losing control of your password means losing substantial control over your personal data and other information that you have submitted to us. You could also be held liable for legally binding actions taken on your behalf. Thus, if your password has been compromised, or if you have grounds to believe that your password has been compromised, you should immediately contact us and change your password. \nWe also require you to log off of your account and delete your browsing and search history and cookies before you log out of a shared device or computer."}
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                Minor
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black }}>
                                {"Availment of our products and services through this website is not intended for children, or those below eighteen (18) years of age or older but are incapable of taking care of themselves as defined under Philippine laws. If you are a child as defined earlier, you may use or avail of our services only with the involvement and consent of a parent or guardian."}
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                Changes to this Privacy Policy
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black }}>
                                {"We shall regularly review the sufficiency of this Privacy Policy. We reserve the right to modify and change the Privacy Policy at any time. Any changes to this policy shall be published accordingly. We encourage you to periodically review this policy to be informed of how we are using and protecting your personal information."}
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                Data Protection Officer
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black }}>
                                {"We have appointed our data protection officer for you to contact if you have any questions or concerns about our personal information policies or practices. You may get in touch with our data privacy officer via email address dpo@Unified.com.ph and landline number (02) 404-9863."}
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                PRIVACY NOTICE
                             </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                Pieces of information Unified collects                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black }}>
                                {"If you are merely browsing Unified website, Unified collects the same basic information that most websites collect from everybody, regardless of whether you are an accountholder or not. \nUnified collects the following pieces of information from its website visitors: browser type, language preference, referring site, additional websites requested, and the date and time of such request. Potentially personally identifying information like Internet Protocol (IP) addresses is likewise collected."}
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                Why does Unified collect these?
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black }}>
                                {"Unified collects these pieces of information to know how its visitors use and what topic or topics contained in its website catch their attention. Likewise, these data are collected for purposes of monitoring and ensuring the website’s security."}
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                Information from users and accountholders
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black }}>
                                {"If you avail of the services of Unified, we collect the following information from you: your transactions and activities, including your bank and/or credit card details. \nIf you opt to be an accountholder of Unified, you will be required to provide some basic information at the time of the creation of your account, i.e., name, date of birth, gender, nationality, address, and competent proof of your identity, i.e., government-issued identification cards like Unified Multi-Purpose Identification Card (UMID), passport, driver’s license and the like. \n“User Personal Information” is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Examples of the same are a user name and password, an email address, a real name, and a photograph. \n“User Personal Information” excludes aggregated, non-personally identifying information, which Unified may utilize to operate, improve and optimize its website and services."}
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                Why does Unified collect these pieces of user personal information?
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black }}>
                                {"Unified collects these pieces of information to assist you in creating your account and to provide you the services you requested. Unified uses your user personal information, more particularly your user name, to identify you on its website. Your email address will only be used by Unified to communicate with you, and only in relation to your account with Unified."}
                            </Text>

                        </ScrollView>

                        <View style={{ paddingTop: 10, alignSelf: "center", alignItems: "center", width: "90%" }}>
                            <Button onPress={this._agree} style={{ height: 35, width: "100%", backgroundColor: Color.colorPrimaryMP, borderRadius: 15 }}
                                labelStyle={{ fontSize: 12 }}
                                label="Agree" />
                            <Button onPress={closeModal}
                                style={{ marginTop: 5, height: 35, width: "100%", borderColor: Color.colorPrimaryMP, borderRadius: 15, borderWidth: 0.5, backgroundColor: Color.white, }}
                                labelStyle={{ color: Color.colorPrimaryMP, fontSize: 12 }} label="Cancel" />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}


export default PolicyAndPrivacyModal;