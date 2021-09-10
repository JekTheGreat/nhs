/* eslint-disable */
import React from "react";
import { View, Text, ScrollView, Image, TouchableWithoutFeedback, Modal, Dimensions } from "react-native";
import _ from "lodash";
import Resources from "__src/resources";
import Button from "__src/components/Button";
import { Colors } from "react-native-paper";
const { Color, Res } = Resources;
const { width, height } = Dimensions.get('window');
const SampleText = "Nullam putent singulis eos an, ius fugit civibus voluptua at. Quo eu accumsan petentium conclusionemque. Verterem dissentiet ex vis, vel autem expetenda eu. Te vix duis habeo quaeque, nobis commune accusata vix eu. Pro nemore copiosae ut. At eam eros nonumes evertitur. Vim ad possit perfecto, cu modo quot veniam his, cu falli doming suscipit cum. An vix elit modus oporteat, vivendum tacimates pri ex. Eum eu persius alienum. Per ubique accusam petentium ut, ea pri posse vitae eligendi. Nam ad ferri doming integre. Ad eam ipsum legimus posidonium, pro ex quot diceret reformidans, eu vim simul impetus. Ei quem inermis adolescens cum. Eam ne cibo ancillae reformidans, et sit facilis hendrerit. Ex est sanctus volumus, nec verear suscipit ad, sea inermis singulis inimicus ea. Ex nec virtute aliquid, mea legere semper ut. Soleat delenit qui id. Eum id modus vidisse dolorum. Ad alia ocurreret quaerendum nec, sonet placerat dissentiunt ea vix. Mundi mnesarchum quo id. Usu at sale malorum. Ea nullam lucilius legendos pro. Pri te dolore vocibus, intellegebat comprehensam mea ex. Et rationibus expetendis mediocritatem eos, vix te posse dicat tacimates, alterum intellegebat voluptatibus mei no. Eum cu vide euripidis moderatius. Ad cum veritus consequuntur, sadipscing cotidieque qui ne. Putant latine gubergren ea pri, no option debitis vim, ea duis fierent epicurei usu. Debet convenire vis ea, id mea reprimique instructior, vix alii adhuc incorrupte ut. Luptatum forensibus mei eu. Et summo debet dicunt mea, evertitur vulputate reformidans his id. Timeam commune ei vim, an sed alterum postulant gloriatur. Nam dictas aliquam recusabo ex, sit eu ignota inermis nominavi. Vix quod convenire posidonium te, mea affert nostro audiam ne, pri homero electram suscipiantur eu. Et quando eligendi mei, est nihil animal adipisci ne. Nec gloriatur tincidunt at. Et his timeam vidisse, zril temporibus te vix. Eum animal dolores et. Eos in autem feugait albucius, sea bonorum legimus vituperata at. Vis congue antiopam urbanitas no. Paulo invidunt eu his, vel ridens graeci accusata id. Primis possit his ne, eu duo oblique aliquam. Tincidunt definitiones per at. His dolor fabulas offendit ex, scripta placerat ei nam. Eos eu senserit scribentur reformidans. Sit suscipiantur definitionem ad, te sed decore fabulas omnesque, nonumes dolores adolescens nam ad. Brute audiam noluisse ad sit, ex copiosae facilisis persequeris eam. Mei nulla admodum expetendis te, veniam inermis ut sea. Ad eam nostrud delicata intellegam, labitur intellegam an vel, id probo appellantur mea. Cu vis prima accusamus deterruisset. Ea movet scaevola assentior ius."

class ModalTermsCondition extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    _iAgree = () => {
        const { agreeInTermsModal, closeModal } = this.props;
        agreeInTermsModal();
        closeModal();
    }

    render() {
        const { isTermsShowing, closeModal } = this.props;
        return (
            <Modal
                ref={"ModalTermsCondition"}
                visible={isTermsShowing}
                transparent
                onRequestClose={closeModal}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    <View style={{ height: "80%", width: "90%", backgroundColor: "black" }}>
                        <Text style={{ paddingLeft: 18, paddingTop: 18, fontFamily: "Roboto-Light", color: "white", fontSize: 18 }}>
                            Terms and Conditions
                                </Text>
                        <View style={{ marginTop: 10, backgroundColor: "white", paddingVertical: 10, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                            <Image
                                style={{ height: 50, width: 50 }}
                                source={Res.get("ups")} />
                            <View>
                                <Text style={{ fontFamily: "Roboto-Light", fontWeight: "bold", color: "black", fontSize: 18 }}>
                                    Unified Products and Services
                                            </Text>
                                <Text style={{ fontFamily: "Roboto-Light", fontWeight: "bold", color: "black", fontSize: 15 }}>
                                    Terms and Condition
                                            </Text>
                            </View>
                        </View>
                        <ScrollView style={{ paddingHorizontal: 15, backgroundColor: "white", alignSelf: "center", height: "65%", width: "100%" }}>
                            <Text style={{ justifyContent: "flex-start", fontFamily: "Roboto-Light", fontSize: 13 }}>
                                {SampleText}
                            </Text>
                        </ScrollView>
                        <View style={{ backgroundColor: Color.bg, height: 50 }}>
                            <Button onPress={() => this._iAgree()}
                                style={{ justifyContent: "center", alignSelf: "flex-end", width: "40%", marginVertical: 5, marginRight: 5 }}
                                label="I Agree" />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}


export default ModalTermsCondition;