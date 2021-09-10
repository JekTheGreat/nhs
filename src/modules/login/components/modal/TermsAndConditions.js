import React, { PureComponent} from "react";
import { View, Text, ScrollView, Modal, TouchableOpacity } from "react-native";
import Button from "__src/components/Button";
import styles from "../../styles.css";
import Icon from "react-native-vector-icons/FontAwesome";
import Resources from "__src/resources";

const {Color} = Resources;

export default class TermsAndConditions extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { isVisibleT, onClose } = this.props;
        const { isTermsShowing, closeModal } = this.props;

        return (
            <Modal
                ref={"TermsAndConditionModal"}
                visible={isVisibleT}
                transparent
                animationType="fade"
                onRequestClose={closeModal}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "grey" }}>
                    <View style={{ top: 15, borderRadius: 30, width: "95%", height: "90%", backgroundColor: Color.white, paddingVertical: 10, paddingHorizontal: 15 }}>
                        <View style={{}}>
                            <TouchableOpacity onPress={onClose} style={{ position: "absolute", right: -20, top: -25, borderRadius: 30, backgroundColor: "red", padding: 10 }}>
                                <Icon onPress={onClose} type='font-awesome' name='times' color={"white"} size={15} />
                            </TouchableOpacity>
                        </View>

                        <Text style={{ textAlign: "center", marginVertical: 10, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 15, color: "black" }}>
                            TERMS AND CONDITIONS
                        </Text>
                        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
                            <Text style={{ textAlign: "center", marginVertical: 10, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 15, color: Color.black }}>
                                DEALERSHIP TERMS AND CONDITIONS
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                1. Any person who is at least eighteen (18) years of age or a corporation, partnership, or any other legal entity duly organized and existing under the law of the Republic of the Philippines, may apply for dealership by submitting a completely filled application form and availing the Unified Products and Services dealership package. Any person below the age of eighteen (18) years old may also apply for a dealership package provided that a duly accomplished and signed Parental Consent Form is submitted.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang sinumang tao na hindi bababa sa labing-walo (18) taong gulang o isang korporasyon, dealership, o anumang mga legal entity na inorganisa sa ilalim ng batas ng Republika ng Pilipinas, ay maaaring mag-apply para ng dealership sa pamamagitan ng pagsusumite ng kinumpletong application form at pagbili ng Unified Products and Services franchise package. Sinumang mas mababa sa labing-walong (18) taong gulang ay maari ring mag-apply para sa dealership sa kondisyon na makakapagsumite ito ng pirmado at kumpletong 'Parental Consent Form.'
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                2. The application shall be deemed as a mutually binding agreement between the Dealers and Unified Products and Services only upon receipt and due approval thereof by the Company. The sponsor designated in the submitted Application Form will be the incoming dealer’s permanent sponsor. Should the incoming dealer wish to transfer to another sponsor, he/she will need to observe a six (6) month cooling-off period which will commence on his/her last activity/transaction. The dealer is not allowed to perform any dealer activity/operations throughout this cooling-off period. For existing Unified Products and Services members, the cooling-off period is one (1) year from the last activity/transaction.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang application na ito ay ituturing na isang kasunduang may-bisa sa pagitan ng dealer at Unified Products and Services kapag ang application form ay tinanggap at inaprubahon ng Unified Products and Services. Ang sponsor na itinalaga sa isinumiteng Application Form ay ang permanenteng sponsor ng bagong dealer. Kung nais ng bagong dealer na lumipat sa ibang sponsor, kailangan ng dealer na sundin at obserbahan ang anim (6) na buwang 'Cooling-Off  period” na magsisimula sa kanyang huling aktibidad o transaksyon. Ang dealer ay hindi pinapayagan na magsagawa ng anumang aktibidadoperasyon/transaksyon sa kabuuan ng 'Cooling-Off  period”.  Para sa mga  miyembro  na  ng  Unified Products and Services ,  ang  'Cooling-Off period ay isang (1) taon mula so huling aktibidad/ transaksyon.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                3. It is understood that the dealership package is non-refundable and is personal in nature. It may only be assigned/transferred/sold to another person provided that the person is a member of the dealer family up to the 2nd degree of affinityconsanguinity. In the event of the dealer’s death, the law on succession applies.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang dealership package ay hindi maaring ma-refund at gagamitin lang sa personal na kalakaran ng dealer. Ito ay maaari lamang na italaga/ilipat/ibenta sa ibang tao sa kondisyon na ang taong iyon ay isang miyembro ng pamilya  dealer hanggang sa pangalawang antas ng pagkakamag-anak. Sa kaganapan ng kamatayan ng dealer, ang "succession' ayon sa umiiral na batas ang magiging batayan.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                4. Upon dealership approval, the new Unified Products and Services Dealer will have a FREE one (1)-year Personal Accident Insurance. The beneficiary designated in this form becomes the beneficiaryof the said insurance. Applicable fees apply on the renewal of the said insurance after the one (1) year FREE period. This will be automatically renewed and deducted from the dealers account every year unless otherwise terminated by the dealer in writing and submitted to Unified Products and Services.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Kapag naaprubahan ang bagong dealer, siya ay magkakaroon ng 1-year na FREE Pesonal Accident Insurance. Ang 'Beneficiary' na itinalaga sa form na ito ang magiging beneficiary ng nasabing insurance. Pagkatapos ng isang taon, ang kaukulang bayad para sa renewal ng insurance ay ipapataw. Ito ay awtomatikong ire-renew at ibabawas mula sa account ng dealer maliban kung i-terminate ng dealer ang insurance sa pamamagitan ng pagsulat sa Unified Products and Services.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                5. The designated beneficiary herein is non-revocable and non replaceable.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang itinalagang beneficiary ay hindi maaring palitan o tanggalin.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                6. The dealer is an independent business partner of Unified Products and Services. As such, no employee-employer relationship between the dealer and the Company is created by virtue of this dealership package, neither that may dealer claim to be the legal representative	of Company, nor bind Company in any agreement unless otherwise stipulated herein.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang dealer ay isang malayang kasosyo sa negosyo ng Unified Products and Services. Dahil dito, walang employee-employer na relasyon sa pagitan ng dealer at ang kompanya ang nilikha sa pamamagitan ng dealership package. Ang dealer ay hindi rin nagiging legal na kinatawan ng Unified Products and Services at walang kapangyarihan upang ibigkis ang Unified Products and Services sa anuman kasunduan, maliban sa nakasaad dito.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                7. Upon purchase of the dealer package, the dealer may sell to other interested buyers, in accordance with provision #3, who in turn become another independent dealer. As stated, a dealer is not an employee of the Company but is one who merely sponsors another customer to purchase the product package from Unified Products and Services.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Maaring  ibenta ng dealer sa ibang tao, na naayon sa provision #3, ang kanyang biniling dealership package. Ang bibili nito ay ituturing na isa pang dealer. Tulad ng naisaad, ang dealer ay hindi isang empleyado ng Unified Products and Services bagkus isa lamang siyang sponsor upang ang iba pang customer ay makabili ng produkto ng Unified Products and Services.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                8. The following fees shall apply to requests related to dealership accounts.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang mga sumusunod na fees ay mag-aapply sa dealership accounts.
                                {"\n"}a. Change of Account Name - PhP 1,000.00 per request.
                                {"\n"}b. Correction of Account Name - Php 1,000.00 per name (when the error is attributable to the dealer.)
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                9. The dealer will be entitled to Unified Products and Services' "Earning Program” as part of its marketing business and will be required to make a minimum product purchase thru auto quota. Thus, you will be required to have a minimum inventory that needs to maintain in order to sustain one's status as a dealer of Unified Products and Services.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang isang dealer may karapatan sa Unified Products and Services' "Earning Proqram" na bahagi ng kanyang negosyo bilang dealer. Mayroong minimum na imbentaryo ng produkto sa pamamagitan ng auto quota na kailangan ng dealer upang manatili ang kaniyang status bilang isang Unified Products and Services dealer.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                10. As a dealer, you may be eligible to sales bonuses, discounts, and privileges that may be granted by Unified Products and Services relative to your sales performance or successful delivery of products in accordance with the scheme established by the Company, provided that it was achieved in good faith, and the provisions of the Code of Conduct, and Company Policies were not violated.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang isang dealer ay may karapatan sa mga bonus, discount at anumang pribilehiyo na ibinibigay ng Unified Products and Services kaugnay sa sales at matagumpay na paghahatid ng mga produkto ng isang dealer na ayon sa mga pamamaraan na itinalaga ng Unified Products and Services, sa kondisyon na ito ay nakamit sa magandang loob at walang nilabag na patakaran sa kasunduang ito o sa Code of Conduct at iba pang Company policies.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                11. As Unified Products and Services' dealer, you are required to abide by the Company’s rules and regulations, and faithfully uphold the Code of Conduct and Ethical blacks, a copy of which will be sent by email. In the event that it is proven that you have violated any of the provisions of the Code of Conduct and Ethical blacks, It is understood that you shall render Unified Products and Services free and harmless from any all kinds of liability, seen or unforeseen, direct or indirect, that may arise therefrom.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Bilang Unified Products and Services dealer, ikaw ay kailangan sumunod sa mga patakaran at regulasyon ng Unified Products and Services, at matapat na manindigan sa Unified Products and Services Code of Conduct and Ethical blacks, na ipapadala sa inyong email address. Sa kaganapan na mapatunayan na ikaw ay lumabag sa alinman sa mga probisyon ng mga ito, ang Unified Products and Services ay walang magiging anumang pananagutan, na nakikita o hindi inaasahan, direkta o hindi direkta, na maaaring lumabas mula roon.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                12.	Cross-lining and cross-sponsoring are strictly prohibited.  Such can be a ground for termination   and cancellation of his/her dealer’s web tool account.  This is detailed in the Unified Products and Services Code of Conduct and Ethical blacks.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang Cross-Lining at Cross-Sponsoring ay mahigpit na ipinagbabawal.  Ito ay magiging basehan sa pag-kansela o pag-terminate ng dealership account. Ito ay nakadetalye sa Unified Products and Services Code of Conduct and Ethical blacks.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                13.  All dealers shall observe the rules and regulations pertaining to load wallet and e-cash selling as prescribed by the TELCOs, billers, bank and affiliates.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang lahat ng dealers ay kailangang sumunod at isagawa ang mga patakaran at regulasyon na nauukol so load wallet at e-cash selling no itinakda  ng mga TELCOs, billers at banks.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                14. As a dealer, you hereby agree to conform to all Anti Money-laundering (AML) regulations and 1. 'Know Your Customer” (KYC) procedures relevant to your operations and activities as a dealer, including the supplying of your customers' information, documentary requirements and other evidences as may be required by the Company and/or relevant regulatory agency. This is a condition precedent to your operations as a Unified Products and Services dealer.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Bilang isang dealer, ikaw ay sumasangayon sa Anti Money-Laundering (AML) regulations at sa "Know Your Customer” policies na kaakibat ng iyong operasyon bilang isang Unified Products and Services dealer. Kabilang dito ay ang pagbibigay ng lahat ng impormasyon, papeles at iba pang requirements na maaring hingin ng Unifies Products and Services o anumang government agency. Ito ay isang kondisyon alinsunod sa iyong pagiging Unified Products and Services dealer.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                15. For Unified Products and Services, the company and dealers are exercising dealer -company relationship. It is understood that a web tool for personal home-based business is used as provided by Unified Products and Services.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang Unified Products and Services at ang dealer ay mayroong "dealer-company relationship”. Nauunawaan ng dealer ang webtool o system na ibabahagi ng Unified Products and Services ay magagamit lamang sa paraan na itinakda ng Unified Products and Services at sa personal na kalakaran ng dealer.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                16. The Company reserves the right to modify and update its policies for its best interest and that of its dealers as well as the right to terminate the dealership on the grounds inimical to the interest of Unified Products and Services and its dealers.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang Unified Products and Services ay may karapatan na baguhin at i-update ang mga patakaran nito para sa kanyang interes at ng kanyang dealer. Ang Unified Products and Services may karapatan din na tapusin ang dealership sa mga batayan labag sa interes ng Unified Products and Services at ang kaniyang mga dealer.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                17.  It is understood that a prior written approval from the management of Unified Products and Services or any of its authorized representative must be secured before any form of advertisement in mainstream media is made, other than the Company's existing advertisement and marketing materials and postings on its official website and official social media pages.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Kailangan magbigay ng nasusulat na approval at pahintulot ang Unified Products and Services sa dealer bago ito  magsagawa ng anumang anyo ng advertisement sa mainstream media, maliban sa mga umiiral na advertisement, marketing materials o posting sa Unified Products and Services official website ang social media pages.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                18.  It is understood that all proprietary rights that may arise by virtue of this dealership agreement shall inure for the sole and exclusive benefit of Unified Products and Services.  As such, you hereby assign to the Company as its exclusive property, all the rights, title and interest to all copyrights, inventions, innovations and/or ideas developed or conceived solely by you or jointly with others at any time during the existence of this Agreement and which copyrights, inventions, innovations and/or ideas relate to the scope of or the performance of your duties and responsibilities as dealer of Unified Products and Services. Hence, you are sternly warned that making any misrepresentations, revisions, modifications, or alterations of the Company's trademark, brand, logos, marks, marketing plan, products, advertisement, marketing materials and other company provided marketing tools is strictly prohibited. Otherwise, it shall be deemed violation of the Company's rules, regulations and policies.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ito ay nauunawaan na lahat ng karapatan sa pagmamay-ari na maaring lumabas sa kasunduang ito ay mananatiling sa natatangi at ekslusibong benepisyo ng Unified Products and Services. Dahil dito, iyong itinatalaga sa Unified Products and Services ang lahat ng mgakarapatan, titulo at interes sa lahat ng mga copyright, imbensyon, makabagong-likha at/o mga ideya na binuo o conceived lamanq sa pamamagitan ng iyong sarili o kasama ng ibang tao sa anumang oras o panahon habang umiiral ang Kasunduang ito. Sinasaklaw rin nito ang mga copyright, imbensyon, makabagong-likha at/o mga ideya na nauugnay sa iyong mga tungkulin at responsibilidad bilang dealer ng Unified Products and Services. Samakatuwid ikaw ay binigyan ng mahigpit na babala laban sa anumang mga kasinungalingan, revisions, pagbabago o alterations sa trademark, tatak, mga logo, mga marka, mga plano sa marketing, mga produkto, advertisement, mga materyales sa marketing ng Kumpanya at iba pang ibinigay marketing tools. Ito ay mahigpit na ipinagbabawal ng Unified Products and Services. Kung hindi man, ituturing ito na paglabag sa patakaran at alituntunin ng Unified Products and Services.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                19. It is the dealer’s duty to keep abreast of the law. As a dealer of Unified Productsand Services, you shall diligently settle and comply with the designated government agency/local government unit all licenses, permits and other regulatory requirements, including all due taxes from the taxable sales bonuses earned from Unified Products and Services.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                lyong  tungkulin na alamin ang mga batas na sumasaklaw sa iyong kalakaran. Bilang isang dealer ng Unified Products and Services ay dapat mong tuparin at sundin ang mga namamahalang ahensyo o local governmentunit na naaayon sa kinaukulang lisensya, permit at iba pang regulasyong na kinakailangan, kabilang ang lahat ng angkop na buwis mula sa mga benta na kinita mula sa Unified Products and Services.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                20. By signing this form, the Dealer agrees to follow and adhere to the Terms and Conditions set forth herein.  </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>

                                Sa pamamagian ng pag-sign ng form na ito, sumasang-ayon ang Dealer na sundin ang sumusunod na mga tuntunin at kondisyong nakasaad dito.
                            </Text>


                            <Text style={{ textAlign: "center", marginVertical: 10, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 15, color: Color.black }}>
                                FRANCHISE TERMS AND CONDITIONS
                                </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                1. Any person who is at least eighteen (18) years of age or a corporation, partnership, or any other legal entity duly organized and existing under the law of the Republic of the Philippines, may apply for franchise by submitting a completely filled application form and availing of the Unified Products and Services franchise package. Any person below the age of eighteen (18) years old may also apply for a franchise package provided that a duly accomplished and signed Parental Consent Form is submitted.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang sinumang tao na hindi bababa sa labing-walo (18) taong gulang o isang korporasyon, partnership, o anumang mga legal entity na inorganisa sa ilalim ng batas ng Republika ng Pilipinas, ay maaaring mag-apply ng franchise sa pamamagitan ng pagsusumite ng kinumpletong application form at pagbili ng Unified Products and Services franchise package. Sinumang mas mababa sa labing-walong (18) taong gulang ay maari ring mag-apply ng franchise sa kondisyon na makakapagsumite ito ng pirmado at kumpletong 'Parental Consent Form.'
                                </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                2. The application shall be deemed as a mutually binding agreement between the Franchisees and Unified Products and Services only upon receipt and due approval thereof by the Company. The sponsor designated in the submitted Application Form will be the incoming franchisee’s permanent sponsor. Should the incoming franchisee wish to transfer to another sponsor, he/ she will need to observe a six (6) month cooling-off period which will commence on his/her last activity/transaction. The franchisee is not allowed to perform any franchisee activity/operations throughout this cooling-off period. For existing Unified Products and Services members, the cooling-off period is one (1) year from the last activity/transaction.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang application na ito ay ituturing na isang kasunduang may-bisa sa pagitan ng franchisee at Unified Products and Services kapag ang application form ay tinanggap at inaprubahan ng Unified Products and Services. Ang sponsor na itinalaga sa isinumiteng Application Form ay ang permanenteng sponsor ng bagong franchisee. Kung nais ng bagong franchisee na lumipat sa ibang sponsor, kailangan ng franchisee na sundin at obserbahan ang anim (6) na buwang 'Cooling-Off period” na magsisimula sa kanyang huling aktibidad o transaksyon. Ang franchisee ay hindi pinapayagan na magsagawa ng anumang aktibidad/operasyon/transaksyon sa kabuuan ng 'Cooling-Off period”. Para sa mga miyembro na ng Unified Products and Services, ang 'Cooling-Off period ay isang (1) taon mula so huling aktibidad/transaksyon.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                3. It is understood that the franchise package is non-refundable and is personal in nature. It may only be assigned/ transferred/sold to another person provided that the person is a member of the franchisee family up to the 2nd degree of affinity/consanguinity. In the event of the franchisee death, the law on succession applies.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang franchise package ay hindi maaring ma-refund at gagamitin lang sa personal na kalakaran ng franchisee. Ito ay maaari lamang na italaga/ilipat/ibenta sa ibang tao sa kondisyon na ang taong iyon ay isang miyembro ng pamilya ng franchisee hanggang sa pangalawang antas ng pagkakamag-anak. Sa kaganapan ng kamatayan ng franchisee, ang "succession' ayon sa umiiral na batas ang magiging batayan.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                4.The designated beneficiaryherein is non-revocable and non replaceable.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang itinalagang beneficiary ay hindi maaring palitan o tanggalin.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                5. The franchisee is an independent business partner of Unified Products and Services. As such, no employee-relationship between the franchisee and the Company is created by virtue of this franchise package, neither that may franchisee claim to be the legal representative of Company, nor bind Company in any agreement unless otherwise stipulated herein.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang franchisee ay isang malayang kasosyo sa negosyo ng Unified Products and Services. Dahil dito, walang employee-employer na relasyon sa pagitan ng franchisee at ang kompanya ang nilikha sa pamamagitan ng franchise package. Ang franchisee ay hindi rin nagiging legal na kinatawan ng Unified Products and Services at walang kapangyarihan upang ibigkis ang Unified Products and Services sa anuman kasunduan, maliban sa nakasaad dito.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                6. Upon purchase of the franchise package, the franchisee may sell to other interested buyers, in accordance with provision #3, who in turn become another independent  franchisee. As stated, a franchisee is not an employee of the Company but is one who merely sponsors another customer to purchase the product package from Unified Products and Services.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Maaring ibenta ng franchisee sa ibang tao, na naayon sa provision #3, ang kanyang biniling franchise package. Ang bibili nito ay ituturing na isa pang franchisee. Tulad ng naisaad, ang franchisee ay hindi isang empleyado ng Unified Products and Services bagkus isa lamang siyang sponsor upang ang iba pang customer ay makabili ng produkto ng Unified Products and Services.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                7. In the event that the franchisee intends to transfer the franchise ownership, he/she must notify the franchisor thru a written notice within thirty (30) days before the date of actual transfer. Franchisee must also provide the personal Information and contact number of the transferee and duly signed transfer/conveyance documents. Further, the franchisee will comply with all requirements and/or parameters set forth in the Franchise Agreement regarding transfer of franchise ownership.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Sa kaganapang nais ng franchisee na ibenta o ilipat ang kanyang franchise ownership sa iba, maaari lamang na abisuhan ng franchisee ang franchisor sa pamamagitan nang pagsulat sa loob ng tatlumpung (30) araw bago ang aktwal na paglipat. Kinakailangan din ng franchisee na magbigay ng personal na impormasyon at contact number ng transferee kasama ang mga dokumento na may kinalaman sa paglilipat ng franchise ownership. Dagdag pa rito ang pagsunod ng franchisee sa iba pang requirements na nakasaad sa Franchise Agreement tungkol sa paglipat ng franchise ownership.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                8. The franchisee will be entitled to Unified Products and Services "Earning Program” as part of its marketing business but you will not be required to make a minimum product purchase nor will you be required a minimum inventory that needs to be maintained in order to sustain one's status as a franchisee of Unified Products and Services'.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang isang franchisee may karapatan sa Unified Products and Services "Earning Proqram" na bahagi ng kanyang negosyo bilang franchisee. Walang minimum na imbentaryo ng produkto ang kailangan ng franchisee upang manatili ang kaniyang status bilang isang Unified Products and Services franchisee.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                9. As a franchisee, you may be eligible to sales bonuses, discounts, and privileges that may be granted by Unified Products and Services relative to your sales performance or successful delivery of products in accordance with the scheme established by the Company, provided that it was achieved in good faith, and the provisions of the Code of Conduct, and Company Policies were not violated.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang isang franchisee ay may karapatan sa mga bonus, discount at anu mang pribilehiyo na ibinibigay ng Unified Products and Services kaugnay sa sales at matagumpay na paghahatid ng mga produckto ng isang franchisee na ayon sa mga pamamaraan na itinalaga ng Unified Products and Services, sa kondisyon na ito ay nakamit sa magandang loob at walang nilabag na patakaran sa kasunduang ito o sa Code of Conduct at iba pang Company policies.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                10. As Unified Products and Services' franchisee, you are required to abide by the Company’s rules and regulations, and faithfully uphold the Code of Conduct and Ethical blacks, a copy of which will be sent by email. In the event that it is proven that you have violated any of the provisions of the Code of Conduct and Ethical blacks, It is understood that you shall render Unified Products and Services free and harmless from any all kinds of liability, seen or unforeseen, direct or indirect, that may arise therefrom.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Bilang Unified Products and Services franchisee, ikaw ay kailangan sumunod sa mga patakaran at regulasyon ng  Unified Products and Services, at matapat na manindigan sa Unified Products and Services Code of Conduct and Ethical blacks, na ipapadala sa inyong email address. Sa kaganapan na mapatunayan na ikaw ay lumabag sa alinman sa mga probisyon ng mga ito, ang Unified Products and Services ay walang magiging anumang pananagutan, na nakikita o hindi inaasahan, direkta o hindi direkta, na maaaring lumabas mula roon.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                11. Cross-lining and cross-sponsoring are strictly prohibited. Such can be a ground for termination and cancellation of his/her franchisee’s web tool account. This is detailed in the Unified Products and Services Code of Conduct and Ethical blacks.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang Cross-Lining at Cross-Sponsoring ay mahigpit na ipinagbabawal. Ito ay magiging basehan sa pag-kansela o pag-terminate ng franchise account. Ito ay nakadetalye sa Unified Products and Services Code of Conduct and Ethical blacks.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                12. All franchisees shall observe the rules and regulations pertaining to load wallet and e-cash selling as prescribed by the TELCOs, billers, bank and affiliates.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang lahat ng franchisees ay kailangang sumunod at isagawa ang mga patakaran at regulasyon na nauukol sa load wallet at e-cash selling no itinakda ng mga TELCOs, billers at banks.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                13. As a franchisee, you hereby agree to conform to all Anti Money-laundering (AML) regulations and 1. 'Know Your Customer” (KYC) procedures relevant to your operations and activities as a franchisee, including the supplying of your customers' information, documentary requirements and other evidences as may be required by the Company and/or relevant regulatory agency. This is a condition precedent to your operations as a Unified Products and Services franchisee.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Bilang isang franchisee, ikaw ay sumasangayon sa Anti Money-Laundering (AML)regulations at sa "Know Your Customer” policies na kaakibat ng iyong operasyon bilang isang Unified Products and Services franchisee. Kabilang dito ay ang pagbibigay ng lahat ng impormasyon, papeles at iba pang requirements na maaring hingin ng Unifies Products and Services o anumang government agency. Ito ay isang kondisyon alinsunod sa iyong pagiging Unified Products and Services franchisee.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                14. For Unified Products and Services, the company and franchisees are exercising franchisor-franchisee relationship. It is understood that a web tool for personal home-based business is used as provided by Unified Products and Services. (This personal home-based business is only applicable to Global and Pinoy packages franchisees.)
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang Unified Products and Services at ang franchisee ay mayroong "franchisor-franchisee relationship”. Nauunawaan ng franchisee na ang webtool o system na ibabahagi ng Unified Products and Services ay magagamit lamang sa paraan na itinakda ng Unified Products and Services at sa personal na kalakaran ng franchisee.(Naaangkop lamang ang personal home-based na negosyo para sa mga franchisee ng Global at Pinoy packages).
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                15. The Company reserves the right to modify and update its policies for its best interest and that of its franchisees as well as the right to terminate the franchise on the grounds inimical to the interest of Unified Products and Services and its franchisees.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ang Unified Products and Services ay may karapatan na baguhin at i-update  ang mga patakaran nito para sa kanyang interes at ng kanyang franchisees. Ang Unified Products and Services may karapatan din na tapusin ang franchise sa mga batayan labag sa interes ng Unified Products and Services at ang kaniyang mga franchisees.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                16. It is understood that a prior written approval from the management of Unified Products and Services or any of its authorized representative must be secured before any form of advertisement in mainstream media is made, other than the Company's existing advertisement and marketing materials and postings on its official website and official social media pages.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Kailangan magbigay ng nasusulat na approval at pahintulot ang Unified Products and Services sa franchisee bago ito magsagawa ng anumang anyo ng advertisement sa mainstream media, maliban sa mga umiiral na advertisement, marketing materials o posting sa Unified Products and Services official website ang social media pages.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                17. It is understood that all proprietary rights that may arise by virtue of this franchise agreement shall inure for the sole and exclusive benefit of Unified Products and Services.  As such, you hereby assign to the Company as its exclusive property, all the rights, title and interest to all copyrights, inventions, innovations and/or ideas developed or conceived solely by you or jointly with others at any time during the existence of this Agreement and which copyrights, inventions, innovations and/or ideas relate to the scope of or the performance of your duties and responsibilities as franchisee of Unified Products and Services. Hence, you are sternly warned that making any misrepresentations, revisions, modifications, or alterations of the Company's trademark, brand, logos, marks, marketing plan, products, advertisement, marketing materials and other company provided marketing tools, is strictly prohibited. Otherwise, it shall be deemed violation of the Company's rules, regulations and policies.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Ito ay nauunawaan na lahat ng karapatan sa pagmamay-ari na maaring lumabas sa kasunduang ito ay mananatiling sa natatangi at ekslusibong benepisyo ng Unified Products and Services. Dahil dito, iyong itinatalaga sa Unified Products and Services ang lahat ng mgakarapatan, titulo at interes sa lahat ng mga copyright, imbensyon, makabagong-likha at/o mga ideya na binuo o conceived lamanq sa pamamagitan ng iyong sarili o kasama ng ibang tao sa anumang oras o panahon habang umiiral ang Kasunduang ito. Sinasaklaw rin nito ang mga copyright, imbensyon, makabagong-likha at/o mga ideya na nauugnay sa iyong mga tungkulin at responsibilidad bilang franchisee ng Unified Products and Services. Samakatuwid ikaw ay binigyan ng mahigpit na babala laban sa anumang mga kasinungalingan, revisions, pagbabago o alterations sa trademark, tatak, mga logo, mga marka, mga plano sa marketing, mga produkto, advertisement, mga materyales sa marketing ng Kumpanya at iba pang ibinigay marketing tools. Ito ay mahigpit na ipinagbabawal ng Unified Products and Services. Kung hindi man, ituturing ito na paglabag sa patakaran at alituntunin ng Unified Products and Services.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                18. It is the franchisee’s duty to keep abreast of the law. As a franchisee of Unified Productsand Services, you shall diligently settle and comply with the designated government agency/local government unit all licenses, permits and other regulatory requirements, including all due taxes from the taxable sales earned from Unified Products and Services.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                lyong tungkulin na alamin ang mga batas na sumasaklaw sa iyong kalakaran. Bilang isang franchisee ng Unified Products and Services ay dapat mong tuparin at sundin ang mga namamahalang ahensyo o local governmentunit na naaayon sa kinaukulang lisensya, permit at iba pang regulasyong na kinakailangan, kabilang ang lahat ng angkop na buwis mula sa mga benta na kinita mula sa Unified Products and Services.
                            </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontWeight: "bold" }}>
                                19. By signing this form, the Franchisee agrees to follow and adhere to the Terms and Conditions set forth herein.
                            </Text>
                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", marginBottom: 5, color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                Sa pamamagian ng pag-sign ng form na ito, sumasang-ayon ang Franchisee na sundin ang sumusunod na mga tuntunin at kondisyong nakasaad dito.
                            </Text>

                            <Text style={{ textAlign: "center", marginVertical: 10, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 15, color: Color.black }}>
                                MONEY REMITTANCE SERVICES TERMS AND CONDITIONS
                                </Text>

                            <Text style={{ justifyContent: "flex-start", fontSize: 12, fontFamily: "Roboto-Light", color: Color.black, fontStyle: "italic", fontWeight: "100" }}>
                                By using this service, I agree to the following:
                            {'\n\u25CF'} I shall comply with all terms and regulations of GPRS-Unified Products and Services, Inc. (“Unified” for brevity).
                            {'\n\u25CF'} I shall comply and submit a copy of the front and back face of my valid government issued ID, submit a copy of my selfie with the same government issued ID which shall be subject for verification and confirmation of Unified, as well as video selfie and other documents, information or identification which Unified may require.
                            {'\n\u25CF'} I shall comply with the rules of Unified on the proper usage of names of transacting clients by ALWAYS indicating client supplied information on both sender and beneficiary.
                            {'\n\u25CF'} I shall act in good faith at all times and shall not utilize this remittance services in an unauthorized and/or fraudulent manner.
                            {'\n\u25CF'} I understand and acknowledge that all transactions shall be subject to existing laws, rules and regulations by government authorities including but not limited to the Bangko Sentral ng Pilipinas (BSP), Anti-Money Laundering Council (AMLC) and other regulatory agencies.
                            {'\n\u25CF'} I agree to indemnify Unified against any loss, damage, liability, costs and expenses whether legal or otherwise which Unified may incur by reason of these terms or my breach hereof. I further agree to pay Unified for any penalties, costs and expenses which Unified may impose in such regard.
                            {'\n\u25CF'} I hereby certify that all information is submitted in good faith, and are true and correct to the best of my knowledge pursuant to any laws and regulations applicable.
                            {'\n\u25CF'} I acknowledge that I have read, understood and accepted all these terms of Unified.
                            </Text>


                        </ScrollView>

                        <View style={{ paddingTop: 10, alignSelf: "center", alignItems: "center", width: "90%" }}>
                            <Button onPress={onClose} style={{ height: 35, width: "100%", backgroundColor: Color.colorPrimaryMP, borderRadius: 15 }}
                                labelStyle={{ fontSize: 12 }}
                                label="Close" />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}